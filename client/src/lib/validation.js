import * as yup from "yup";

const loginValidation = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const registerValidation = yup.object({
  fullname: yup.string("Enter your fullname").required("Fullname is required"),
  username: yup.string("Enter your username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Confirm your password")
    .required("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Validations = {
  loginValidation,
  registerValidation,
};

export default Validations;
