import "./FITBForm.css";
import { getHalf } from "../../utils/StringUtils.js";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setAnswer } from "../../state/answerStore.js";

export default function FITBForm({ question }) {
  const dispatch = useDispatch();
  const [answerValue, setAnswerValue] = useState("");

  console.log("IN FITB FORM:\t", question);

  const handleInputChange = (event) => {
    setAnswerValue(event.target.value);
    dispatch(setAnswer(event.target.value));
  };

  return (
    <>
      <div className="third-quiz-panel-main d-flex flex-column mt-3">
        <div className="test-panel-ques">Fill in the blanks</div>
        <form className="third-quiz-form mt-2">
          <p>
            {getHalf(question.Question, 0)}
            <input
              type="text"
              value={answerValue}
              onChange={handleInputChange}
            />
            {getHalf(question.Question, 1)}
          </p>
        </form>
      </div>
    </>
  );
}

FITBForm.propTypes = {
  question: PropTypes.object.isRequired,
};
