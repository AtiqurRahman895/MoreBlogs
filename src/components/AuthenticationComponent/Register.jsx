import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import googleSVG from "../../assets/google.svg";
import useHostImage from "../../Hooks/useHostImage";
import { FaRegUserCircle } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, loginWithGoogle, creatUser, updateUserProfile } =
    useContext(AuthContext);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState();

  const hostImage=useHostImage()

  const handleImageChange=(e)=>{
      const file=e.target.files[0]
      hostImage(file,setImage)
  }
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

  const handlePasswordInputChanges = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,20}$/;
    if (!regex.test(e.target.value)) {
      e.target.classList.add("invalid");
      setPasswordError(true);
    } else {
      e.target.classList.remove("invalid");
      setPasswordError(false);
    }
  };

  const CreatUserOnSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = image;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (passwordError) {
      e.target.password.focus();
      return;
    }else if (!photoURL) {
      toast.warning(
        "You must upload a profile image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!"
      );
      return;
    }

    creatUser(email, password)
      .then((userCredential) => {
        toast.success("Your Registration successfull!");
        setUser(userCredential.user);
        e.target.reset();
        updateUserProfile(name, photoURL)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message ? error.message : error.code);
          });
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };
  return (
    <section>
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-lg">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <form onSubmit={CreatUserOnSubmit} className="card-body p-0">
            <div className="form-control ">
              <label htmlFor="name" className="label">
                <span className="">Name</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-ghost input-bordered"
                minLength={3}
                required
              />
            </div>

            <div className="form-control flex flex-col items-center mt-3">
                  <label htmlFor="image" className="label relative flex flex-col text-center w-fit">
                      <div className="">
                          {image?
                              <div className="bg-white max-w-12 xs:max-w-20 aspect-square rounded-full overflow-hidden">
                                  <img src={image?image:""} alt="" className="" />
                              </div>
                              :
                              <FaRegUserCircle className={`text-5xl xs:text-7xl`} />
                          }
                          
                          <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} className="file-input absolute opacity-0 scale-0"/>
                      </div>
                      <span className="">{image?"1 Image File Chosen":"Choose your Photo"}</span>
                  </label>
              </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-ghost input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="">Password</span>
              </label>

              <input
                onChange={handlePasswordInputChanges}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input input-ghost input-bordered"
                value={password}
                required
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-ghost btn-circle btn-sm absolute right-4 top-[2.8rem]"
              >
                {showPassword ? (
                  <IoIosEye className="text-[20px]" />
                ) : (
                  <IoIosEyeOff className="text-[20px]" />
                )}
              </button>

              {passwordError && (
                <label htmlFor="password" className="label">
                  <p className="-alt text-red-500">
                    Password must Be 6 to 20 characters long, Include at least
                    one digit (0-9), one lowercase letter (a-z), one uppercase
                    letter (A-Z) and one special character (@#$%^&*!)
                  </p>
                </label>
              )}
            </div>

            <div className="mt-6">
              <button className="formSubmitBtn">Submit</button>
            </div>

            <span className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="link link-hover text-custom-primary hover:font-bold "
              >
                {" "}
                <b>Login now</b>{" "}
              </Link>
            </span>
          </form>

          <h3 className="text-center text-custom-half-primary">or</h3>
          <button
            onClick={handleGoogleLoginBtn}
            className="btn btn-ghost border text-white rounded-none"
          >
            <img src={googleSVG} alt="" className="w-[1rem]" /> Login with
            Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
