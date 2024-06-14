import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { handleRegister, handleLogin } from "../../apis/userAPI";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

import "../../styles/auth/authButton.css";
import "../../styles/auth/authInput.css";
import "../../styles/auth/authElement.css";
import "../../styles/auth/authText.css";
import "./TotalAuth.css";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/generic/darkOverlay.css";

export default function TotalAuth() {
  const navigate = useNavigate();
  const [forgotPasswordFormOpen, setForgotPasswordFormOpen] = useState(false);
  const triggerSuccessToast = () => {
    toast.success("Email bhej de gaye!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setForgotPasswordFormOpen(false);
  };

  // Register Formik
  const formikRegister = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      re_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Email format ghalat hai"
        )
        .required("Ye ek zaroori sharth hai"),
      username: Yup.string().required("Ye ek zaroori sharth hai"),
      password: Yup.string()
        .min(7, "Password kam az kam 8 haroof ka hona chahiye")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Password format ghalat hai"
        )
        .required("Password ek zaroori sharth hai"),
      re_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Dono passwords milna zaroori hai")
        .min(7, "Password kam az kam 8 haroof ka hona chahiye")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Password format ghalat hai"
        )
        .required("Password ek zaroori sharth hai"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Registration ke darkhuwast bhej de gaye hai");
      const resp = await handleRegister(values);
      console.log("🚀 ~ onSubmit: ~ resp:", resp);

      if (resp === true) {
        toast.success("Registration Kamyaab!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      } else {
        toast.error(resp);
      }
    },
  });

  // Login Formik
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Email format ghalat hai"
        )
        .required("Ye ek zaroori sharth hai"),
      password: Yup.string()
        .min(7, "Password kam az kam 8 haroof ka hona chahiye")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Password ka format ghalat hai"
        )
        .required("Password ek zaroori sharth hai"),
    }),
    onSubmit: async (values) => {
      const resp = await handleLogin(values);
      console.log("🚀 ~ file: TotalAuth.jsx:109 ~ onSubmit: ~ resp:", resp);

      if (resp === true) {
        console.log("Login Kamyaab");
        toast.success("Login Kamyaab!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("auth", true);
        navigate("/");
      } else {
        toast.error(resp);
      }
    },
  });

  return (
    <>
      <div className="d-flex flex-row total-auth-forms">
        {/* Register */}
        <div className="auth-form">
          <h3 className="auth-text">Register karein</h3>
          <form
            onSubmit={formikRegister.handleSubmit}
            className="d-flex flex-column"
          >
            <input
              type="email"
              placeholder="email"
              name="email"
              className="auth-input auth-element"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.email}
            />
            {formikRegister.errors.email && formikRegister.touched.email && (
              <p className="field-error">{formikRegister.errors.email}</p>
            )}
            <input
              type="name"
              placeholder="Saarif naam"
              name="username"
              className="auth-input auth-element"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.username}
            />
            {formikRegister.errors.username &&
              formikRegister.touched.username && (
                <p className="field-error">{formikRegister.errors.username}</p>
              )}
            <input
              type="password"
              placeholder="password"
              name="password"
              className="auth-input auth-element"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.password}
            />
            {formikRegister.errors.password &&
              formikRegister.touched.password && (
                <p className="field-error">{formikRegister.errors.password}</p>
              )}
            <input
              type="password"
              placeholder="password dobara likhein"
              name="re_password"
              className="auth-input auth-element"
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              value={formikRegister.values.re_password}
            />
            {formikRegister.errors.re_password &&
              formikRegister.touched.re_password && (
                <p className="field-error">
                  {formikRegister.errors.re_password}
                </p>
              )}
            <input
              type="submit"
              value="Register karein"
              className="auth-submit-btn auth-element"
            />
          </form>
        </div>

        {/* Login */}
        <div className="auth-form">
          <h3 className="auth-text">Login</h3>
          <a
            className="auth-text auth-link"
            onClick={() => setForgotPasswordFormOpen(true)}
          >
            Password bhool gaye?
          </a>
          <form
            onSubmit={formikLogin.handleSubmit}
            className="d-flex flex-column"
          >
            <input
              type="text"
              placeholder="email"
              className="auth-input auth-element"
              name="email"
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
              onChange={formikLogin.handleChange}
            />
            {formikLogin.errors.email && formikLogin.touched.email && (
              <p className="field-error">{formikLogin.errors.email}</p>
            )}
            <input
              type="password"
              placeholder="password"
              className="auth-input auth-element"
              name="password"
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.password}
              onChange={formikLogin.handleChange}
            />
            {formikLogin.errors.password && formikLogin.touched.password && (
              <p className="field-error">{formikLogin.errors.password}</p>
            )}
            <input
              type="submit"
              value="Log in karein"
              className="auth-submit-btn auth-element"
            />
          </form>
        </div>
      </div>

      {/* Forgot Password Form */}
      {forgotPasswordFormOpen && (
        <ForgotPasswordForm
          setForgotPasswordFormOpen={setForgotPasswordFormOpen}
          triggerSuccessToast={triggerSuccessToast}
        />
      )}
      {forgotPasswordFormOpen && <div className="overlay"></div>}
    </>
  );
}
