import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesFromUnAuth() {
  const auth = localStorage.getItem("auth");
  return <>{auth ? <Outlet /> : <Navigate to="/accounts/login" />}</>;
}

export default ProtectedRoutesFromUnAuth;
