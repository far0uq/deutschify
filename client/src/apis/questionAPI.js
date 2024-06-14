import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;
const MCQ_QUERY = import.meta.env.VITE_MCQ_QUERY;
const FITB_QUERY = import.meta.env.VITE_FITB_QUERY;

export async function handleGenerateQuestion(questionType) {
  let query;
  if (questionType === "mcq") {
    query = MCQ_QUERY;
  } else if (questionType === "fitb") {
    query = FITB_QUERY;
  }
  console.log("QUERY:\t", MCQ_QUERY);
  const response = await axios.post(`${API_URL}/question/question-generate`, {
    query,
  });

  return response.data;
}

export async function handleFetchGeneratedQuestion(questionType) {
  console.log("QUESTION TYPE:\t", questionType);
  const response = await axios.post(`${API_URL}/question/question-fetch`, {
    questionType,
  });
  return response.data.questionData;
}
