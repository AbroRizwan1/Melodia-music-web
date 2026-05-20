// src/features/auth/useRegister.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "./AuthApi";
import { validateRegister } from "./AuthValidation";

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPass, setShowPass] = useState(false);

  const [errors, setErrors] = useState({});

  const [popup, setPopup] = useState({
    type: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validateRegister(form);

    if (Object.keys(errs).length) {
      setErrors(errs);

      return;
    }

    setErrors({});

    try {
      const response = await registerUser(form);

      setPopup({
        type: "success",
        message: response.data.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

      return response.data;
    } catch (err) {
      setPopup({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  }

  return {
    form,
    setForm,
    showPass,
    setShowPass,
    errors,
    popup,
    navigate,
    handleSubmit,
  };
}
