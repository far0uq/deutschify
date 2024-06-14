import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import TotalAuth from "./pages/auth/TotalAuth";
import ProtectedRoutesFromUnAuth from "./utils/ProtectedRoutesFromUnAuth";
import ProtectedRoutesFromAuth from "./utils/ProtectedRoutesFromAuth";
import MainPage from "./pages/main/MainPage";
import ErrorPage from "./pages/err/ErrorPage";

import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Routes accessible only to authenticated users */}
        <Route element={<ProtectedRoutesFromAuth />}>
          <Route path="/accounts/login" element={<TotalAuth />} />
        </Route>

        {/* Routes accessible only to non-authenticated users */}
        <Route element={<ProtectedRoutesFromUnAuth />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
