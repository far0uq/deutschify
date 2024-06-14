import { useEffect } from "react";
import "./ResultPage.css";
import PropTypes from "prop-types";
import { toast, Flip } from "react-toastify";
import { handleUpdateProficiencyLevel } from "../../apis/userAPI";

function ResultPage({ scoreCount, setTestFormOpen }) {
  useEffect(() => {
    async function fetchAndSetProficiencyLevel() {
      const values = {
        email: localStorage.getItem("email"),
        proficiencyPoints: scoreCount * 500,
      };

      try {
        const resp = await handleUpdateProficiencyLevel(values);
        console.log(resp);
        toast.success("Proficiency level updated successfully!", {
          position: "top-right",
          autoClose: 1879,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      } catch (error) {
        console.error("Error updating proficiency level:", error);
        toast.error("Failed to update proficiency level.");
      }
    }

    fetchAndSetProficiencyLevel();
  }, [scoreCount]);

  return (
    <div className="scoreboard d-flex flex-column">
      <section className="score-details d-flex flex-column align-items-center">
        <h2>{scoreCount * 500} points</h2>
        <p>Your Score</p>
        <div className="question-details">
          {scoreCount}/10 Questions Correct
        </div>
      </section>
      <button className="take-another-button mt-3">Take Another Quiz</button>
      <button
        className="back-to-test-button mt-3"
        onClick={() => setTestFormOpen(false)}
      >
        Go back to Test Panel
      </button>
    </div>
  );
}

ResultPage.propTypes = {
  scoreCount: PropTypes.number.isRequired,
  setTestFormOpen: PropTypes.func.isRequired,
};

export default ResultPage;
