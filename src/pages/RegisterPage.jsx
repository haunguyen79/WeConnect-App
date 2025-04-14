import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { control } = useForm();
  return (
    <div className="bg-dark-200 flex justify-center items-center h-screen">
      <div className="bg-white w-[450px] h-fit px-8 py-10">
        <img src="/weconnect-logo.png" className="mx-auto mb-6" />
        <form className="flex flex-col gap-4">
          <FormField
            name="fullName"
            label="Full Name"
            control={control}
            Component={TextInput}
          />

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
          <Button variant="contained" className="mt-4">Sign Up</Button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
