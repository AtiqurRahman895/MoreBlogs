// import React from 'react';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import googleSVG from "../../assets/google.svg";
// import PropTypes from 'prop-types';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const { loginWithGoogle, loginUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailInputChanges = (e) => {
    setemail(e.target.value);
    setEmailValid(e.target.checkValidity());
  };

  const handleGoogleLoginBtn = () => {
    loginWithGoogle()
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/");
        toast.success(
          `Login successful! Welcome, ${userCredential.user.displayName}!`
        );
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };

  const handleLogin = (e, email, password) => {
    e.preventDefault();

    loginUser(email||e.target.email.value, password||e.target.password.value)
      .then((userCredential) => {
        setUser(userCredential.user);
        e.target.reset();
        navigate("/");
        toast.success(
          `Login successful! Welcome, ${userCredential.user.displayName}!`
        );
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };
  
  return (
    <section>
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-sm">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="">Email</span>
              </label>
              <input
                onChange={handleEmailInputChanges}
                type="email"
                name="email"
                id="email"
                className="input input-ghost input-bordered border-white"
                value={email}
                required
              />
            </div>

            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input input-ghost input-bordered border-white"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-ghost btn-circle btn-sm  absolute right-4 top-[2.8rem]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoIosEye className="text-[20px]" />
                ) : (
                  <IoIosEyeOff className="text-[20px]" />
                )}
              </button>

              <Link
                to={"/forgot-password"}
                state={{ email }}
                className="-alt link link-hover hover:scale-100 hover:font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-6 space-y-2">
              <button className="formSubmitBtn">Login</button>
              <button
                onClick={()=>handleLogin("atiqemon98@gmail.com","1aA@1a")}
                className="formSubmitBtn"
              >
                Quick Access For Recruiter
              </button>
            </div>
            <span className="text-center mt-2">
              Do not have an account?{" "}
              <Link
                to={"/register"}
                className="link link-hover text-white hover:font-bold "
              >
                {" "}
                <b>Register now</b>{" "}
              </Link>
            </span>
          </form>

          <h3 className="text-center text-white">or</h3>
          <button
            onClick={handleGoogleLoginBtn}
            className="btn btn-ghost rounded-none"
          >
            <img src={googleSVG} alt="" className="w-[1rem]" />
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

// Login.propTypes = {

// };

export default Login;
