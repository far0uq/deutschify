import rerouting_icon from "../../assets/icons/rerouting-icon.png";
import "./ResetPasswordSuccess.css";

function ResetPasswordSuccess() {
  return (
    <div className="reset-password-success d-flex flex-column align-items-center">
        <img src={rerouting_icon}></img>
        <h3>Re-routing you to Login.</h3>
    </div>
  );
}

export default ResetPasswordSuccess;
