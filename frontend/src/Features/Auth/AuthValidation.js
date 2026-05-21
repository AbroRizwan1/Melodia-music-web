// login validation
export function validateLogin(form) {
  const errors = {};

  if (!form.email.includes("@")) {
    errors.email = "Valid email required";
  }

  if (form.password.length < 6) {
    errors.password = "Password too short";
  }

  return errors;
}

// register validation
export function validateRegister(form) {
  const errors = {};

  if (!form.username?.trim()) {
    errors.username = "Name required";
  }

  if (!form.email.includes("@")) {
    errors.email = "Valid email required";
  }

  if (form.password.length < 6) {
    errors.password = "Password too short";
  }

  return errors;
}

// logout validation
