import React from "react";
import { useDispatch } from "react-redux";
import { verifyOTP, resendOTP } from "../features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(verifyOTP({ email, otp: values.otp }))
      .unwrap()
      .then(() => {
        toast.success("Email verified successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "OTP verification failed");
      })
      .finally(() => setSubmitting(false));
  };

  const handleResendOTP = () => {
    dispatch(resendOTP(email))
      .unwrap()
      .then(() => toast.success("OTP resent!"))
      .catch(() => toast.error("Failed to resend OTP"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>
        <p className="text-sm text-center text-gray-600 mb-4">Please enter the 6-digit OTP sent to your email</p>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">OTP</label>
                <Field
                  name="otp"
                  type="text"
                  placeholder="123456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="otp" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-center text-sm mt-3 text-gray-600">
                Didn’t receive the OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Resend OTP
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOtp;
