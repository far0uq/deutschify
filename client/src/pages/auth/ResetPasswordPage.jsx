import { useFormik } from "formik";
import * as Yup from "yup";

import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const formik = useFormik({
    initialValues: {
      password: "",
      re_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
      re_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(7, "Password need to be minimum 8 characters")
        .matches(
          /^(?=.+\d)(?=.+[_@.])[A-Za-z0-9_@.]+$/,
          "Invalid Password Format"
        )
        .required("Password is a required field"),
    }),
    onSubmit: () => {},
  });

  return (
    <div className="reset-password-panel">
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
        <input
          type="password"
          name="password"
          placeholder="naya password"
          className="auth-input auth-element"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="field-error">{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="re_password"
          placeholder="naya password dobara likhein"
          className="auth-input auth-element"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="field-error">{formik.errors.email}</p>
        )}
        <input
          type="submit"
          value="Password dobara set karein"
          className="auth-submit-btn auth-element"
        />
      </form>
    </div>
  );
}

export default ResetPasswordPage;
