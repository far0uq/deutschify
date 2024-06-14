import { useState } from "react";
import "./UpdatePasswordForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function UpdatePasswordForm({ setUpdatePasswordFormOpen }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/user/update-password`,
        { email, newPassword }
      );
      if (response.status === 200) {
        toast.success("Password updated successfully");
        setUpdatePasswordFormOpen(false);
      } else {
        toast.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      toast.error("Error updating password:", error);
    }
  };

  const handleCloseForm = () => {
    setUpdatePasswordFormOpen(false);
  };

  return (
    <div className="update-form">
      <form onSubmit={handleUpdatePassword}>
        <input
          type="text"
          placeholder="Apna Email Likhain"
          className="update-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Naya Password Likhain"
          className="update-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Naya Password Confirm Karain"
          className="update-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="update-form-class">
          <button type="submit" className="update-button">
            Tabdeel karein
          </button>
          <button
            type="button"
            onClick={handleCloseForm}
            className="update-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

UpdatePasswordForm.propTypes = {
  setUpdatePasswordFormOpen: PropTypes.func.isRequired,
};
