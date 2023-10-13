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
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import AuthService from "../../../services/auth.service";
import Validations from "../../../lib/validation";
// import validations from "../../../lib/validation";

const LoginForm = () => {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Validations.loginValidation,
    onSubmit: (values) => {
      toast.promise(AuthService.login(values), {
        loading: "Logging in...",
        success: (data) => {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          return "Logged in";
        },
        error: (err) => {
          console.log(err.response.data.error);
          return (
            <div className="flex gap-2 p-1 flex-col">
              <div className="text-red-500 font-semibold test-sm">
                Error occured, While logging in
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            htmlFor="outlined-adornment-password"
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
        <div className="flex justify-start  mt-1 w-full">
          <Link
            to="/forgot"
            className="text-sm text-[rgb(0,123,173)] font-bold"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <button
          type="submit"
          className="bg-[#8314dd] text-white rounded-sm w-full py-4"
        >
          Continue
        </button>
        <div className="flex text-sm items-center gap-2">
          <div>Don't have an account?</div>
          <Link to="/auth/register" className="text-[rgb(0,123,173)] font-bold">
            Sign up
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

export default LoginForm;
