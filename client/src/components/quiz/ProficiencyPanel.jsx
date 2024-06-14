import PropTypes from "prop-types";
import "./ProficiencyPanel.css";
import { useState } from "react";
import proficiency_beginner_icon from "../../assets/icons/proficiency-beginner-icon-min.png";
import proficiency_intermediate_icon from "../../assets/icons/proficiency-intermediate-icon-min.png";
import proficiency_advance_icon from "../../assets/icons/proficiency-advance-icon-min.png";

export default function ProficiencyPanel({
  setProficiencyPanelOpen,
  setTestFormOpen,
}) {
  const [activeProficiency, setActiveProficiencyButton] = useState(null);

  return (
    <>
      <div className="proficiency-main d-flex flex-column align-items-center">
        <div className="proficiency-main-sub">
          <p>Apni sathah ka intekhaab karein</p>
          <div
            className={`proficiency-level-container d-flex justify-content-between ${
              activeProficiency === 0 ? "active-proficiency-panel" : ""
            }`}
            onClick={() => setActiveProficiencyButton(0)}
          >
            <div className="proficiency-image">
              <img src={proficiency_beginner_icon} alt="" loading="eager" />
            </div>
            <h2>Shuruati</h2>
          </div>

          <div
            className={`proficiency-level-container d-flex justify-content-between ${
              activeProficiency === 1 ? "active-proficiency-panel" : ""
            }`}
            onClick={() => setActiveProficiencyButton(1)}
          >
            <div className="proficiency-image">
              <img src={proficiency_intermediate_icon} alt="" loading="eager" />
            </div>
            <h2>Darmiyani</h2>
          </div>

          <div
            className={`proficiency-level-container d-flex justify-content-between ${
              activeProficiency === 2 ? "active-proficiency-panel" : ""
            }`}
            onClick={() => setActiveProficiencyButton(2)}
          >
            <div className="proficiency-image">
              <img src={proficiency_advance_icon} alt="" loading="eager" />
            </div>
            <h2>Pur Amli</h2>
          </div>
        </div>
        <div className="proficiency-level-selected">
          <button
            onClick={() => {
              setProficiencyPanelOpen(false);
              setTestFormOpen(true);
            }}
          >
            Agay Barhein
          </button>
          <button
            className="mt-2"
            onClick={() => setProficiencyPanelOpen(false)}
          >
            Cancel Karein
          </button>
        </div>
      </div>
    </>
  );
}

ProficiencyPanel.propTypes = {
  setProficiencyPanelOpen: PropTypes.func.isRequired,
  setTestFormOpen: PropTypes.func.isRequired,
};
