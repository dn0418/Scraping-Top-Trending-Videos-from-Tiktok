import { useState } from "react";
import logoImage from "../../../assets/logo.png";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../../custom/GoogleButton";
import { useFormik } from "formik";
import Validations from "../../../lib/validation";
import AuthService from "../../../services/auth.service";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Validations.registerValidation,
    onSubmit: (values) => {
      toast.promise(AuthService.register(values), {
        loading: "Registering your account...",
        success: (data) => {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          return "Registered your account.";
        },
        error: (err) => {
          return (
            <div className="flex gap-2 p-1 flex-col">
              <div className="text-red-500 font-semibold test-sm">
                Error occured, While registering your account
              </div>
              <div>{err.response.data.error}</div>
            </div>
          );
        },
      });
    },
  });
  document.title = "Login | AI Agent";
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="shadow-xl rounded-lg gap-7 p-10 flex flex-col items-center bg-white"
    >
      <img src={logoImage} className="object-contain w-[4rem]" />
      <div className="text-xl font-medium">Welcome</div>
      <div className="text-center text-sm">
        Log in to AI Agent to continue to your dashboard.
      </div>
      <div className="flex flex-col gap-4 w-full">
        <TextField
          id="outlined-basic"
          label="Fullname"
          className="w-full"
          variant="outlined"
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          className="w-full"
          variant="outlined"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id="outlined-basic"
          label="Email address"
          className="w-full"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl className="w-full" variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText
            error={formik.touched.password && Boolean(formik.errors.password)}
            disabled={
              formik.touched.password && Boolean(formik.errors.password)
            }
          >
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl className="w-full" variant="outlined">
          <InputLabel
            htmlFor="outlined-password"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          >
            Confirm
          </InputLabel>
          <OutlinedInput
            id="outlined-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            disabled={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          >
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <button
          type="submit"
          className="bg-[#8314dd] text-white rounded-sm w-full py-4"
        >
          Continue
        </button>
        <div className="flex text-sm items-center gap-2">
          <div>Already have an account?</div>
          <Link to="/auth/login" className="text-[rgb(0,123,173)] font-bold">
            Log in
          </Link>
        </div>
        <div className="flex items-center mb-2 gap-5">
          <hr className="border-gray-300 w-full" />
          <span className="text-xs font-medium">OR</span>
          <hr className="border-gray-300 w-full" />
        </div>
        <GoogleButton />
      </div>
    </form>
  );
};

export default RegisterForm;
