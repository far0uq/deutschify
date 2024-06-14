import { useState } from "react";
import { toast } from "react-toastify";
import "./UpdateUsernameForm.css";
import axios from "axios";
import PropTypes from "prop-types";

export default function UpdateUsernameForm({ setUpdateUsernameFormOpen }) {
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/user/update-username`,
        { email, newUsername }
      );
      if (response.status === 200) {
        toast.success("Username updated successfully");
        setUpdateUsernameFormOpen(false);
      } else {
        toast.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      toast.error("Error updating username:", error);
    }
  };

  const handleCloseForm = () => {
    setUpdateUsernameFormOpen(false);
  };

  return (
    <div className="update-form">
      <form onSubmit={handleUpdateUsername}>
        <input
          type="text"
          placeholder="Email Likhain"
          className="update-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Naya Username Likhain"
          className="update-input"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Naya User Confirm Karain"
          className="update-input"
        />
        <div className="update-form-class">
          <button className="update-button">Tabdeel Karein</button>
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

UpdateUsernameForm.propTypes = {
  setUpdateUsernameFormOpen: PropTypes.func.isRequired,
};
