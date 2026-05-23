import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthApi";
import { validateLogin } from "./AuthValidation";
import { userContext } from "../../ContextApi/UserContext";

export function useLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const [popup, setPopup] = useState({
    type: "",
    message: "",
  });

  const { user, loading, FetchCurrentUser } = useContext(userContext);

  if (!user) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validateLogin(form);

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});

    try {
      const response = await loginUser(form);

      setPopup({
        type: "success",
        message: response.data.message,
      });

      await FetchCurrentUser(); // 🔥 important step
    } catch (err) {
      setPopup({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  }

  useEffect(() => {
    FetchCurrentUser();
  }, []);

  return {
    form,
    setForm,
    showPass,
    setShowPass,
    errors,
    popup,
    navigate,
    setPopup,
    handleSubmit,
  };
}
