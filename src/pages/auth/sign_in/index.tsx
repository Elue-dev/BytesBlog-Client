import Button from "@/components/button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/input";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from "react";
import { validateEmail } from "@/utils/utils";
import { useAlert } from "@/context/useAlert";
import { SIValues } from "@/types/auth";
import { SERVER_URL } from "@/utils/variables";
import { httpRequest } from "@/lib/index";
import { SET_ACTIVE_USER } from "@/redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { useTheme } from "@/context/useTheme";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const initialValues: SIValues = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [credentials, setCredentials] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capsLockIsOn, setCapsLockIsOn] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const alertContext = useAlert();
  const themeContext = useTheme();
  const dispatch = useDispatch();

  const { revealAlert } = alertContext!;
  const { mode } = themeContext!;

  const { email, password } = credentials;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const signinUser = async () => {
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

        if (response) {
          setLoading(false);
          dispatch(SET_ACTIVE_USER(response.data.user));
          setCredentials(initialValues);
          navigate("/");
        }
      } catch (error: any) {
        revealAlert(
          error.response.data.message ||
            "Something went wrong, Please try again",
          "error"
        );
        setLoading(false);
        console.log(error);
      }
    } else {
      if (errors.length === 0 && !emailFormatValid)
        return revealAlert("Please enter a valid email format", "error");
    }
  };

  const googleLogin = async () => {
    const userCredentials: any = await signInWithPopup(auth, provider);
    const email = userCredentials.user.email;

    const credentials = { email };

    try {
      const response = await httpRequest.post(
        `${SERVER_URL}/auth/login/google`,
        credentials
      );
      if (response) {
        dispatch(SET_ACTIVE_USER(response.data.user));
        setCredentials(initialValues);
        navigate("/");
      }
    } catch (error: any) {
      console.log({ error });
      revealAlert(
        error.response.data.message || "Something went wrong",
        "error"
      );
      console.log(error);
    }
  };

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
  };

  const checkCapsLockState: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const keyboardEvent = event as KeyboardEvent<HTMLInputElement>;
    handleFocus("password");
    if (
      keyboardEvent.getModifierState &&
      keyboardEvent.getModifierState("CapsLock")
    ) {
      setCapsLockIsOn(true);
    } else {
      setCapsLockIsOn(false);
    }
  };

  return (
    <section className={`${mode === "dark" && "bg-zinc-900"}`}>
      <div className="flex h-screen items-center justify-center">
        <div
          className={`mx-4 my-8 w-full max-w-md rounded-lg ${
            mode === "dark" ? "bg-zinc-900" : "bg-white"
          }  p-0 sm:p-5 sm:shadow-lg`}
        >
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
            <span onClick={googleLogin} className="font-normal text-black">
              Continue With Google
            </span>
          </Button>
          <span className="mb-4 block text-center">Or</span>
          <section>
            <div className="relative pt-8">
              <Input
                type="text"
                name="email"
                className={`${
                  validationErrors.includes("email") ? "border-rose-500" : ""
                } w-full bg-transparent p-2.5`}
                value={email}
                onChange={handleInputChange}
                onInput={() => handleFocus("email")}
              />
              <span
                className={`${
                  mode === "light" ? "bg-white" : "bg-zinc-900"
                }  form-text`}
              >
                Email Address
              </span>
            </div>

            <div className="relative pt-8">
              {capsLockIsOn && (
                <p className="mb-3 font-semibold text-yellow-500">
                  Caps Lock is on
                </p>
              )}
              <Input
                type={visible ? "text" : "password"}
                name="password"
                className={`${
                  validationErrors.includes("password") ? "border-rose-500" : ""
                } w-full bg-transparent p-2.5`}
                value={password}
                onChange={handleInputChange}
                onKeyDown={checkCapsLockState}
              />
              <span
                className={`${
                  mode === "light" ? "bg-white" : "bg-zinc-900"
                }  form-text`}
              >
                Password
              </span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setVisible(!visible)}>
                  {visible ? (
                    <RiEyeLine
                      color={`${mode === "light" ? "#333" : "#f0f0f0"}`}
                    />
                  ) : (
                    <RiEyeOffLine
                      color={`${mode === "light" ? "#333" : "#f0f0f0"}`}
                    />
                  )}
                </div>
              </span>
            </div>

            <Link to="/auth/forgot-password">
              <p
                className={`pt-1 text-right  ${
                  mode === "light" ? "text-zinc-600" : "text-gray-300"
                } `}
              >
                Forgot Password?
              </p>
            </Link>

            {loading ? (
              <Button
                type="button"
                className="mt-5 w-full rounded-lg bg-primaryColorHover p-3 text-lg font-semibold text-white"
              >
                <ClipLoader loading={loading} size={25} color={"#fff"} />
              </Button>
            ) : (
              <Button
                type="button"
                className="mt-5 w-full rounded-lg bg-primaryColor p-3 text-lg font-semibold text-white hover:bg-primaryColorHover"
                onClick={signinUser}
              >
                Sign In
              </Button>
            )}

            <p
              className={`mb-3 mt-4 text-right ${
                mode === "light" ? "text-blackNeutral" : "text-gray-300"
              } `}
            >
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
