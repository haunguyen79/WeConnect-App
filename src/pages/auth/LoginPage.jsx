import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { control } = useForm();
  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4">
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
        />

        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
        />
        <Button variant="contained" className="mt-4">
          Sign In
        </Button>
      </form>
      <p className="text-dark-100 mt-4 text-center">
        New on our platform?{" "}
        <Link className="text-primary" to="/login">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
