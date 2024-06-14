import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
import getpass
from langchain_community.document_loaders import PyPDFLoader
from transformers import AutoTokenizer
from langchain.text_splitter import CharacterTextSplitter
import nltk

nltk.download("punkt")
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_openai.llms import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_community.vectorstores import Chroma

import sys

dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")

# Load environment variables from the .env file
load_dotenv(dotenv_path)
model = os.getenv("MODEL")
os.environ["OPENAI_API_KEY"] = model

pdf_file_path = os.getenv("FILE")
loader = PyPDFLoader(pdf_file_path)
pdf_pages = loader.load_and_split()

documents = []
metadatas = []

for i, document in enumerate(pdf_pages):
    documents.append(document.page_content)
    document.metadata["page_no"] = "page_{}".format(i)
    metadatas.append(document.metadata)

text_splitter = CharacterTextSplitter(
    separator=" ", chunk_size=2000, chunk_overlap=150, length_function=len
)
text_chunks = text_splitter.create_documents(documents, metadatas=metadatas)

metadatas = [chunk.metadata for chunk in text_chunks]

model_name = "sentence-transformers/all-MiniLM-L6-v2"

embedding_llm = SentenceTransformerEmbeddings(model_name=model_name)

save_to_dir = "/content/pdf-chroma_db"
vector_db = Chroma.from_documents(
    text_chunks, embedding_llm, persist_directory=save_to_dir
)
llms = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=1)
qna_template = "\n".join(
    [
        "Dobara salam, Roman Urdu mein jawab dein. Yeh hai aapka sawal aur uska jawab:",
        "### CONTEXT (Maqam)",
        "{context}",
        "",
        "### SAWAL (Question)",
        "{question}",
        "",
        "### JAWAB (Answer) : ",
    ]
)
qna_prompt = PromptTemplate(
    template=qna_template, input_variables=["context", "question"]
)

stuff_chain = load_qa_chain(llms, chain_type="stuff", prompt=qna_prompt)


def get_answer(question):
    print("QUESTION:\t", question)
    similar_documents = vector_db.similarity_search(question, k=5)
    answer = stuff_chain(
        {"input_documents": similar_documents, "question": question},
        return_only_outputs=True,
    )

    return answer["output_text"]


# Handle function call
query = sys.argv[1]
result = get_answer(query)
print(result)
