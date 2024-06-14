import React, { useState } from "react";
import "./AccountPanel.css";
import UpdateUsernameForm from "./UpdateUsernameForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function AccountPanel() {
  const [updateUsernameFormOpen, setUpdateUsernameFormOpen] = useState(false);
  const [updatePasswordFormOpen, setUpdatePasswordFormOpen] = useState(false);

  const openUpdateUsernameForm = () => {
    setUpdateUsernameFormOpen(true);
  };

  const openUpdatePasswordForm = () => {
    setUpdatePasswordFormOpen(true);
  };

  return (
    <div className="account-panel-container">
      <div className="sub-account-panel">
        <h5>Saarif naam ko tabdeel karein</h5>
        <p>Apne account ka naam badal dein. Aap sirf har 30 din baad ye kar sakte hain</p>
        <button onClick={openUpdateUsernameForm} className="account-panel-button">
          Saarif naam ko tabdeel karein
        </button>

        <h5>Password Tasdeeq Tartibaat</h5>
        <p>Apna password ya email tabdeel karain</p>
        <button onClick={openUpdatePasswordForm} className="account-panel-button">
          Password tabdeel karein
        </button>

        <h5>Account ko hata dein</h5>
        <p>Apna account aur uss se jurhi hui tamam maloomaath ko hata dein</p>
        <p style={{ color: "#F29D38" }}>Aap tabdeel nahi karsaktein!</p>
        <div className="d-flex flex-container">
          <button className="account-panel-button">Account ko mita dein</button>
        </div>
      </div>

      {/* Update Username Form */}
      {updateUsernameFormOpen && (
        <div className="overlay">
          <UpdateUsernameForm setUpdateUsernameFormOpen={setUpdateUsernameFormOpen} />
        </div>
      )}

      {/* Update Password Form */}
      {updatePasswordFormOpen && (
        <div className="overlay">
          <UpdatePasswordForm setUpdatePasswordFormOpen={setUpdatePasswordFormOpen} />
        </div>
      )}
    </div>
  );
}
