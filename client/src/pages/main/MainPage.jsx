import DashboardPanel from "./DashboardPanel";
import AccountPanel from "./AccountPanel";
import LearningPanel from "./LearningPanel";
import TestPanel from "./TestPanel";
import TranslatePanel from "./TranslatePanel";

import { useState } from "react";

import "../../styles/generic/panelBorder.css";
import SmartMenu from "../../components/generic/SmartMenu";

function MainPage() {
  const [currentPanel, setCurrentPanel] = useState(0);

  return (
    <div>
      <SmartMenu setCurrentPanel={setCurrentPanel} />
      <div className="d-flex justify-content-center">
        {currentPanel === 0 && <DashboardPanel className="panelBorder" />}
        {currentPanel === 1 && <AccountPanel className="panelBorder" />}
        {currentPanel === 2 && <LearningPanel className="panelBorder" />}
        {currentPanel === 3 && <TestPanel className="panelBorder" />}
        {currentPanel === 4 && <TranslatePanel className="panelBorder" />}=
      </div>
    </div>
  );
}

export default MainPage;
