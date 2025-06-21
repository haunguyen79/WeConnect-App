import FormField from "@components/FormField";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const { control, handleSubmit } = useForm();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using the useVerifyOTPMutation hook to handle OTP verification
  const [verifyOTP, { data, isLoading, error, isError, isSuccess }] =
    useVerifyOTPMutation();

  console.log({ location });

  function onSubmit(formData) {
    console.log(formData);
    verifyOTP({ otp: formData.otp, email: location?.state?.email });
  }

  console.log({ data });

  useEffect(() => {
    if (isError && error?.data?.message) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(login(data));
      navigate("/");
    }
  }, [isSuccess, data, isError, error, dispatch, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification 💬
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="otp"
          label="Type your 6 digit security code"
          control={control}
          Component={OTPInput}
        />
        <Button variant="contained" className="mt-4" type="submit">
          <span
            className="mr-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            {isLoading && <CircularProgress size="14px" />}
          </span>
          Verify my account
        </Button>
      </form>
      <p className="text-dark-100 mt-4 text-center">
        Didn't get the code?{" "}
        <Link className="text-primary" to="/login">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OTPVerifyPage;
