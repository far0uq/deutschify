import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutesFromAuth() {
  const auth = localStorage.getItem("auth");
  return <>{!auth ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedRoutesFromAuth;
