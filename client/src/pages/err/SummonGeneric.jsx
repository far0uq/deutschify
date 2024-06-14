import { useState, useEffect } from "react";
import { handleGenerateQuestion } from "../../apis/questionAPI";

function SummonGeneric() {
  const [questionData, setQuestionData] = useState([]);
  useEffect(() => {
    const fetchMCQ = async () => {
      const data = await handleGenerateQuestion("mcq");
      setQuestionData(data);
      console.log(data);
    };
    fetchMCQ();
  }, []);
  return (
    <div>
      <p style={{ color: "white" }}>{questionData.result}</p>
    </div>
  );
}

export default SummonGeneric;
