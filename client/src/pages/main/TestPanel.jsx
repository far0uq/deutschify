import ProficiencyPanel from "../../components/quiz/ProficiencyPanel.jsx";
import "./TestPanel.css";
import { useState, useEffect } from "react";
import ParentTestForm from "../../components/quiz/ParentTestForm.jsx";

function TestPanel() {
  const [ProficiencyPanelOpen, setProficiencyPanelOpen] = useState(false);
  const [TestFormOpen, setTestFormOpen] = useState(false);
  const [ProficiencyLevel, setProficiencyLevel] = useState("");

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
    <div className="test-panel d-flex flex-row">
      <div className="col-8 d-flex flex-column">
        <section className="test-panel-element flex-grow-1 past-performance">
          <h5>Past Performances</h5>
          <div className="performance-chart">bar graph yahan</div>
        </section>
        <section className="test-panel-element flex-grow-1 proficiency-level">
          <div className="d-flex justify-content-around">
            <h5 className="col-6">Mojoodah maharath ke sathah</h5>
            <h1 className="col-3">{ProficiencyLevel}</h1>
          </div>
        </section>
      </div>
      <aside className="test-panel-element col-4 take-a-test">
        <h5>Ek imtehaan lein</h5>
        <div className="d-flex flex-column">
          <button className="test-panel-button">Mojoodah maharath par</button>
          <button
            className="test-panel-button"
            onClick={() => setProficiencyPanelOpen(true)}
          >
            Sathah muntakhib karein
          </button>
        </div>
      </aside>

      {/* Choose Proficiency */}
      {ProficiencyPanelOpen && (
        <ProficiencyPanel
          setProficiencyPanelOpen={setProficiencyPanelOpen}
          setTestFormOpen={setTestFormOpen}
        />
      )}
      {ProficiencyPanelOpen && <div className="overlay"></div>}

      {/* Quiz Panel */}
      {TestFormOpen && <ParentTestForm setTestFormOpen={setTestFormOpen} />}
      {TestFormOpen && <div className="overlay"></div>}
    </div>
  );
}

export default TestPanel;
