import "./SmartMenu.css";
import menu_book_inactive from "../../assets/icons/menu-book-inactive.png";
import menu_book_active from "../../assets/icons/menu-book-active.png";
import menu_dashboard_inactive from "../../assets/icons/menu-dashboard-inactive.png";
import menu_dashboard_active from "../../assets/icons/menu-dashboard-active.png";
import menu_test_inactive from "../../assets/icons/menu-test-inactive.png";
import menu_test_active from "../../assets/icons/menu-test-active.png";
import menu_user_inactive from "../../assets/icons/menu-user-inactive.png";
import menu_user_active from "../../assets/icons/menu-user-active.png";
import menu_logout_inactive from "../../assets/icons/menu-logout-inactive.png";
import menu_logout_active from "../../assets/icons/menu-logout-active.png";
import deutschify_logo from "../../assets/icons/deutschify_logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../apis/userAPI";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

function SmartMenu({ setCurrentPanel }) {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [activeDashboard, setActiveDashboard] = useState(
    menu_dashboard_inactive
  );
  const [activeTest, setActiveTest] = useState(menu_test_inactive);
  const [activeLearning, setActiveLearning] = useState(menu_book_inactive);
  const [activeSettings, setActiveSettings] = useState(menu_user_inactive);
  const [activeLogout, setActiveLogout] = useState(menu_logout_inactive);

  const [minimized, setMinimized] = useState(false);
  const handleUserLogout = async () => {
    const resp = await handleLogout();
    if (resp === true) {
      toast.success("Aap ko logout kia ja raha hai!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.removeItem("auth");
      navigate("/accounts/login");
    } else {
      toast.error(resp);
    }
  };

  return (
    <div
      className="smart-menu d-flex flex-column align-items-center"
      style={{ width: minimized && "4%" }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        onClick={() => setMinimized(!minimized)}
        style={{
          backgroundColor: !minimized && "#FF2E00",
        }}
      >
        {/* If Minimized, adjust contents accordingly*/}
        {minimized ? (
          <h5>
            D<br />F
          </h5>
        ) : (
          <img
            src={deutschify_logo}
            alt="deutschify_logo"
            className="deutschify_logo"
          />
        )}
      </div>

      <ul>
        <li onClick={() => setCurrentPanel(0)}>
          <img
            src={activeDashboard}
            alt="menu-dashboard-inactive"
            className="menu-icon"
            onMouseEnter={() => setActiveDashboard(menu_dashboard_active)}
            onMouseLeave={() => setActiveDashboard(menu_dashboard_inactive)}
          />
          {!minimized && <span>Dashboard</span>}
        </li>
        <li onClick={() => setCurrentPanel(2)}>
          <img
            src={activeLearning}
            alt="menu-book-inactive"
            className="menu-icon"
            onMouseEnter={() => setActiveLearning(menu_book_active)}
            onMouseLeave={() => setActiveLearning(menu_book_inactive)}
          />
          {!minimized && <span>Asbaaq</span>}
        </li>
        <li onClick={() => setCurrentPanel(3)}>
          <img
            src={activeTest}
            alt="menu-test-inactive"
            className="menu-icon"
            onMouseEnter={() => setActiveTest(menu_test_active)}
            onMouseLeave={() => setActiveTest(menu_test_inactive)}
          />
          {!minimized && <span>Imtehaan</span>}
        </li>
        <li onClick={() => setCurrentPanel(1)}>
          <img
            src={activeSettings}
            alt="menu-user-inactive"
            className="menu-icon"
            onMouseEnter={() => setActiveSettings(menu_user_active)}
            onMouseLeave={() => setActiveSettings(menu_user_inactive)}
          />
          {!minimized && <span>{username}</span>}
        </li>
        <li onClick={() => handleUserLogout()}>
          <img
            src={activeLogout}
            alt="menu-logout-inactive"
            className="menu-icon"
            onMouseEnter={() => setActiveLogout(menu_logout_active)}
            onMouseLeave={() => setActiveLogout(menu_logout_inactive)}
          />
          {!minimized && <span>Logout</span>}
        </li>
      </ul>
    </div>
  );
}

export default SmartMenu;

SmartMenu.propTypes = {
  setCurrentPanel: PropTypes.func,
};
