import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPasswordForm({
  setForgotPasswordFormOpen,
  triggerSuccessToast,
}) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z]+\.com$/,
          "Invalid Email Format"
        )
        .required("This is a required field"),
    }),
    onSubmit: () => {
      triggerSuccessToast();
    },
  });

  return (
    <div>
      <div className="forgot-password-form">
        <h3 className="auth-text">Password bhool gaye?</h3>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
          <input
            type="email"
            name="email"
            placeholder="email"
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
            value="Password dobara hasil karein"
            className="auth-submit-btn auth-element"
          />
          <input
            type="button"
            value="Mansookh karein"
            className="auth-cancel-btn auth-element"
            onClick={() => setForgotPasswordFormOpen(false)}
          />
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;

ForgotPasswordForm.propTypes = {
  setForgotPasswordFormOpen: PropTypes.func,
  triggerSuccessToast: PropTypes.func.isRequired,
};
