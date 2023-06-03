import Button from "@/components/button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import eyeOpen from "@/assets/eyeOpen.svg";
import eyeClosed from "@/assets/eyeClosed.svg";
import Input from "@/components/input";
import { ChangeEvent, useState } from "react";
import { validateEmail } from "@/utils/utils";
import { useAlert } from "../../../context/useAlert";
import { SIValues } from "@/types/auth";
import { SERVER_URL } from "@/utils/variables";
import { httpRequest } from "../../../lib/index";

const initialValues: SIValues = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [credentials, setCredentials] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const alertContext = useAlert();
  if (!alertContext) return null;
  const { revealAlert, closeAlert } = alertContext;

  const { email, password } = credentials;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const signinUser = async () => {
    closeAlert();
    setValidationErrors([]);
    const errors = [];
    if (!email.trim()) errors.push("email");
    if (!password.trim()) errors.push("password");
    setValidationErrors(errors);

    const emailFormatValid = validateEmail(email);
    if (errors.length === 0 && emailFormatValid) {
      const credentials = { email, password };

      try {
        setLoading(true);
        const response = await httpRequest.post(
          `${SERVER_URL}/auth/login`,
          credentials
        );
        console.log(response);
        if (response) {
          setLoading(false);
          setCredentials(initialValues);
          navigate("/");
        }
      } catch (error: any) {
        revealAlert(error.response.data.message, "error");
        setLoading(false);
        console.log(error);
      }
    } else {
      if (errors.length === 0 && !emailFormatValid)
        return revealAlert("Please enter a valid email format", "error");
    }
  };

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
  };

  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className="mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
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
          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-lightGray bg-white p-3 hover:bg-grayLight">
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
                  {visible ? (
                    <img src={eyeClosed} alt="" />
                  ) : (
                    <img src={eyeOpen} alt="" />
                  )}
                </div>
              </span>
            </div>

            <Link to="/auth/forgot-password">
              <p className="pt-1 text-right text-zinc-600">Forgot Password?</p>
            </Link>

            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColor p-3 text-lg font-semibold text-white hover:bg-primaryColorHover"
              onClick={signinUser}
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
