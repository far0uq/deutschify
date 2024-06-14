import "./MCQForm.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../state/answerStore.js";
import PropTypes from "prop-types";

export default function MCQForm({ question }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => () => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (selectedOption) {
      dispatch(setAnswer(selectedOption));
    }
  }, [selectedOption, dispatch]);

  return (
    <div>
      <div className="mcq-form-sub-main d-flex flex-column align-items-center justify-content-center">
        <div className="test-panel-ques">{question.Question}</div>
        <div className="mcq-form-button-container d-flex">
          <button
            className={`mcq-form-buttons ${
              selectedOption === "A"
                ? "selected-option"
                : "mcq-form-buttons-hoverable"
            }`}
            onClick={handleOptionClick("A")}
          >
            {question.OptionA}
          </button>
          <button
            className={`mcq-form-buttons ${
              selectedOption === "B"
                ? "selected-option"
                : "mcq-form-buttons-hoverable"
            }`}
            onClick={handleOptionClick("B")}
          >
            {question.OptionB}
          </button>
        </div>
        <div className="mcq-form-button-container d-flex">
          <button
            className={`mcq-form-buttons ${
              selectedOption === "C"
                ? "selected-option"
                : "mcq-form-buttons-hoverable"
            }`}
            onClick={handleOptionClick("C")}
          >
            {question.OptionC}
          </button>
          <button
            className={`mcq-form-buttons ${
              selectedOption === "D"
                ? "selected-option"
                : "mcq-form-buttons-hoverable"
            }`}
            onClick={handleOptionClick("D")}
          >
            {question.OptionD}
          </button>
        </div>
      </div>
    </div>
  );
}

MCQForm.propTypes = {
  question: PropTypes.shape({
    Question: PropTypes.string.isRequired,
    OptionA: PropTypes.string.isRequired,
    OptionB: PropTypes.string.isRequired,
    OptionC: PropTypes.string.isRequired,
    OptionD: PropTypes.string.isRequired,
  }).isRequired,
};
