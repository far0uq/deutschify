import MCQForm from "./MCQForm.jsx";
import FITBForm from "./FITBForm.jsx";

import { useSelector, useDispatch } from "react-redux";
import next_arrow_icon from "../../assets/icons/next-arrow-icon.png";
import prev_arrow_icon from "../../assets/icons/prev-arrow-icon.png";
import { handleFetchGeneratedQuestion } from "../../apis/questionAPI";
import { setAnswer } from "../../state/answerStore.js";
import "./ParentTestForm.css";
import ResultPage from "./ResultPage.jsx";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ParentTestForm({ setTestFormOpen }) {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.answer);
  const [questionType, setQuestionType] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState(null);
  const [scoreCount, setScoreCount] = useState(0);

  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
    console.log("DONE");
  };

  // const prevQuestion = () => {
  //   setQuestionNumber(questionNumber - 1);
  // };

  useEffect(() => {
    // Generate a random number 0 or 1
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      setQuestionType("fitb");
    } else {
      setQuestionType("mcq");
    }
  }, [questionNumber]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        let response = "";
        response = await handleFetchGeneratedQuestion(questionType);
        dispatch(setAnswer(""));
        setQuestion(response);
      } catch (error) {
        console.error("Error calling Python function:", error);
      }
    };
    fetchQuestion();
  }, [questionType, questionNumber]);

  const calculateAnswer = () => {
    if (questionType === "mcq") {
      if (answer === question.CorrectOption) {
        console.log("Answer", answer);
        console.log("correct Option", question.CorrectOption);
        setScoreCount(scoreCount + 1);
      }
    } else if (questionType === "fitb") {
      if (answer === question.Answer) {
        setScoreCount(scoreCount + 1);
      }
    }
    console.log("Reached");
    nextQuestion();
  };

  let form;
  if (question) {
    if (questionType === "mcq") {
      form = <MCQForm question={question} />;
    } else {
      form = <FITBForm question={question} />;
    }
  } else {
    form = (
      <p className="mt-5" style={{ color: "white" }}>
        Loading...
      </p>
    );
  }

  return (
    <div className="parent-test-form">
      {questionNumber < 11 ? (
        <div className="d-flex flex-column align-items-center">
          <section>
            <div
              className="test-panel-next test-panel-arrow"
              onClick={calculateAnswer}
            >
              <img src={next_arrow_icon} alt="Next" />
              <br /> Agla
            </div>
            <div className="progress-count">{questionNumber} of 10</div>
            <div className="test-panel-prev test-panel-arrow">
              <img src={prev_arrow_icon} alt="Previous" />
              <br /> Pichla
            </div>
          </section>
          {form}
        </div>
      ) : (
        <ResultPage scoreCount={scoreCount} setTestFormOpen={setTestFormOpen} />
      )}
    </div>
  );
}

export default ParentTestForm;

ParentTestForm.propTypes = {
  setTestFormOpen: PropTypes.func.isRequired,
};
