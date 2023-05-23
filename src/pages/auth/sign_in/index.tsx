import { SIValues } from "@/types";
import Button from "@/components/button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import Input from "@/components/input";
import { ChangeEvent, useState } from "react";
import { validateEmail } from "@/utils/utils";

const initialValues: SIValues = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [credentials, setCredentials] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const { email, password } = credentials;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const proceed = () => {
    setValidationErrors([]);
    const errors = [];
    if (!email.trim()) {
      errors.push("email");
    }
    if (!password.trim()) {
      errors.push("password");
    }
    setValidationErrors(errors);

    if (errors.length === 0) {
      if (!validateEmail(email)) {
        return alert("Please enter a valid email format");
      }
    }
    navigate("/");
  };

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
  };

  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className=" mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
          <Link to="/" className="mb-3 flex items-center justify-center pt-8">
            <img
              src={bytesLogo}
              alt="BytesBlog Logo"
              className="pt-8 sm:pt-4"
            />
          </Link>
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Welcome back
          </h1>
          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-lightGray bg-white">
            <FcGoogle className="text-2xl" />
            <span className="font-normal">Continue With Google</span>
          </Button>
          <span className="mb-4 block text-center">Or</span>
          <section>
            <div className="relative pt-8">
              <Input
                type="text"
                name="email"
                className={`${
                  validationErrors.includes("email") ? "border-rose-500" : ""
                } w-full p-2.5`}
                value={email}
                onChange={handleInputChange}
                onInput={() => handleFocus("email")}
              />
              <span className="form-text">Email Address</span>
            </div>

            <div className="relative pt-8">
              <Input
                type={visible ? "text" : "password"}
                name="password"
                className={`${
                  validationErrors.includes("password") ? "border-rose-500" : ""
                } w-full p-2.5`}
                value={password}
                onChange={handleInputChange}
                onInput={() => handleFocus("password")}
              />
              <span className="form-text">Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setVisible(!visible)}>
                  {visible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </div>
              </span>
            </div>

            <Link to="/auth/forgot-password">
              <p className="pt-1 text-right text-zinc-600">Forgot Password?</p>
            </Link>

            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColor text-lg font-semibold text-white"
              onClick={proceed}
            >
              Sign In
            </Button>

            <p className="mb-3 mt-4 text-right text-blackNeutral">
              Don't have a Bytes account?{" "}
              <Link
                to="/auth/create-account"
                className="font-semibold underline"
              >
                Sign Up
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
