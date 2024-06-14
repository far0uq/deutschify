import "./DashboardPanel.css";
import default_account_picture from "../../assets/icons/default-account-picture.png";
import "../../styles/generic/button.css";

import { useEffect, useState } from "react";

function DashboardPanel() {
  const username = localStorage.getItem("username");
  const [profiency_level, setProficiencyLevel] = useState("");
  useEffect(() => {
    const experience = localStorage.getItem("proficiency_level");
    if (experience < 10000) {
      setProficiencyLevel("A1");
    } else if (experience < 20000) {
      setProficiencyLevel("A2");
    } else if (experience < 30000) {
      setProficiencyLevel("B1");
    } else if (experience < 40000) {
      setProficiencyLevel("B2");
    } else if (experience < 50000) {
      setProficiencyLevel("C1");
    } else if (experience < 60000) {
      setProficiencyLevel("C2");
    }
  }, []);

  return (
    <div className="panel-border dashboard-panel d-flex flex-column align-items-center">
      <section className="dashboard-row d-flex  justify-content-between container row">
        <div className="dashboard-tile d-flex">
          <div>
            <h5>Seekhnay ka waqt</h5>
            <select>
              <option>Pichlay haftay</option>
              <option>Pichlay Maheenay</option>
            </select>
          </div>
          <div></div>
        </div>
        <div className="dashboard-tile">
          <div className="d-flex">
            <img src={default_account_picture} />
            <div className="profile-header">
              <h5>{username}</h5>
              <p>April 2023 se shamil hai</p>
            </div>
          </div>
          <hr />
          <h5>{profiency_level}</h5>
        </div>
      </section>

      <section className="dashboard-row d-flex justify-content-between container row">
        <div className="dashboard-tile">
          <h5>Agla Goal</h5>
          <div className="void-section"></div>
        </div>
        <div className="dashboard-tile ">
          <h5>Warm-Up Karain</h5>
          <div className="void-section"></div>
          <input
            type="button"
            value="Imtihaan Lein!"
            className="btn quiz-btn mt-3"
          />
        </div>
        <div className="dashboard-tile">
          <h5>Aapke Alarm</h5>
          <div className="void-section"></div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPanel;
