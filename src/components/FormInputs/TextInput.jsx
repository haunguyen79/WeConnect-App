import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({ name, value, onChange, type = "text" }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default TextInput;
