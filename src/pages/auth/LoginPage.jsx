import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@services/rootApi";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isError, isSuccess }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(formData) {
    console.log({ formData });
    login(formData);
  }

  console.log({ email: getValues("email") });

  useEffect(() => {
    if (isError && error?.data?.message) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess && data?.message) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/verify-otp", {
        state: {
          email: getValues("email"),
        },
      });
    }
  }, [isSuccess, data.message, isError, error, dispatch, navigate, getValues]);

  console.log({ data, isLoading, error, errors });

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />

        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <Button variant="contained" className="mt-4" type="submit">
          <span
            className="mr-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            {isLoading && <CircularProgress size="14px" />}
          </span>
          Sign In
        </Button>

        {isError && (
          <Alert severity="error" className="mt-2">
            {error?.data?.message}
          </Alert>
        )}
      </form>
      <p className="text-dark-100 mt-4 text-center">
        New on our platform?{" "}
        <Link className="text-primary" to="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
