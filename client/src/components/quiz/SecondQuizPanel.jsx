import React from 'react'
import "./SecondQuizPanel.css";
import next_arrow_icon from "../../assets/icons/next-arrow-icon.png";
import prev_arrow_icon from "../../assets/icons/prev-arrow-icon.png";

export default function SecondQuizPanel() {
  return (
    <>

    <div className="second-quiz-panel-main">
    <div className="quiz-panel-next">
    <img src={next_arrow_icon}  alt="Error" />
    <br></br>Agla
    </div>
    <div className="quiz-panel-prev">
    <img src={prev_arrow_icon} alt="Error" />
    <br></br> Pichla
    </div>

    <h3 className="second-quiz-heading">Match</h3>
    <h2 className="second-quiz-subheading">00.00</h2>

    <div className="second-quiz-questions-block">
        <div className="second-quiz-questions">
            <button className="second-quiz-buttons">Button 1</button>
            <button className="second-quiz-buttons">Button 2</button>
            <button className="second-quiz-buttons">Button 3</button>
            <button className="second-quiz-buttons">Button 4</button>
            <button className="second-quiz-buttons">Button 5</button>
        </div>
        <div className="second-quiz-questions">
            <button className="second-quiz-buttons">Button 6</button>
            <button className="second-quiz-buttons">Button 7</button>
            <button className="second-quiz-buttons">Button 8</button>
            <button className="second-quiz-buttons">Button 9</button>
            <button className="second-quiz-buttons">Button 10</button>
        </div>
        <div className="second-quiz-questions">
            <button className="second-quiz-buttons">Button 11</button>
            <button className="second-quiz-buttons">Button 12</button>
        </div>
</div>
</div>
    </>
  )
}
