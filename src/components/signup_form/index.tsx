import Button from "../button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFillCheckSquareFill } from "react-icons/bs";
import Input from "../input";
import { KeyboardEvent, useEffect, useState } from "react";
import { validateEmail } from "@/utils/utils";
import { useAlert } from "@/context/useAlert";
import { useGoogleAuth } from "@/context/useGoogleAuth";
import { CAProps } from "@/types/auth";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { useTheme } from "@/context/useTheme";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function SignUpForm({
  values,
  handleInputChange,
  nextStep,
}: CAProps) {
  const { firstname, lastname, email, password, confirmPassword } = values;

  const [visible, setVisible] = useState(false);
  const [cpVisible, setCPVisible] = useState(false);
  const [capsLockIsOn, setCapsLockIsOn] = useState(false);
  const [capsLockIsOnSec, setCapsLockIsOnSec] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [caseCondition, setCaseCondition] = useState(false);
  const [passwordCheckPassed, setPasswordCheckPassed] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setCaseCondition(true);
    } else {
      setCaseCondition(false);
    }
    if (password.length > 7) {
      setLengthCondition(true);
    } else {
      setLengthCondition(false);
    }

    if (password.match(/([0-9])/)) {
      setNumberCondition(true);
    } else {
      setNumberCondition(false);
    }

    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setCharCondition(true);
    } else {
      setCharCondition(false);
    }

    if (caseCondition && numberCondition && charCondition && lengthCondition) {
      setPasswordCheckPassed(true);
    } else {
      setPasswordCheckPassed(false);
    }
  }, [
    password,
    caseCondition,
    numberCondition,
    charCondition,
    lengthCondition,
    passwordCheckPassed,
  ]);

  const alertContext = useAlert();
  const themeContext = useTheme();
  const googleAuthContext = useGoogleAuth();

  const { mode } = themeContext!;
  const { revealAlert } = alertContext!;
  const { updateCredentials } = googleAuthContext!;

  const proceed = () => {
    setValidationErrors([]);
    const errors = [];
    !firstname.trim() && errors.push("firstname");
    !lastname.trim() && errors.push("lastname");
    !email.trim() && errors.push("email");
    !password.trim() && errors.push("password");
    !confirmPassword.trim() && errors.push("confirmPassword");
    setValidationErrors(errors);

    if (errors.length === 0) {
      if (!validateEmail(email))
        return revealAlert("Please enter a valid email format", "error");

      if (password !== confirmPassword)
        return revealAlert("Passwords do not match", "error");

      if (!passwordCheckPassed)
        return revealAlert(
          "Your password has not met the necessary strength requirements",
          "error"
        );

      if (firstname && !/^[A-Za-z0-9\s]+$/.test(firstname))
        return revealAlert("First Name contains unwanted characters", "error");

      if (lastname && !/^[A-Za-z0-9\s]+$/.test(lastname))
        return revealAlert("Last Name contains unwanted characters", "error");
      nextStep && nextStep();
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredentials: UserCredential | null = await signInWithPopup(
        auth,
        provider
      );
      console.log(userCredentials);

      if (userCredentials && userCredentials.user) {
        const lastName = userCredentials.user.displayName!.split(" ")[0];
        const firstName = userCredentials.user.displayName!.split(" ")[1];
        const email = userCredentials.user!.email || "";
        const avatar = userCredentials.user!.photoURL || "";

        updateCredentials(firstName, lastName, email, avatar);
        nextStep && nextStep();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
  };

  const checkCapsLockState: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const keyboardEvent = event as KeyboardEvent<HTMLInputElement>;
    if (
      keyboardEvent.getModifierState &&
      keyboardEvent.getModifierState("CapsLock")
    ) {
      setCapsLockIsOn(true);
    } else {
      setCapsLockIsOn(false);
    }
  };

  const checkCapsLockStateSec: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const keyboardEvent = event as KeyboardEvent<HTMLInputElement>;
    if (
      keyboardEvent.getModifierState &&
      keyboardEvent.getModifierState("CapsLock")
    ) {
      setCapsLockIsOnSec(true);
    } else {
      setCapsLockIsOnSec(false);
    }
  };
  return (
    <section className={`${mode === "dark" && "bg-zinc-900"}`}>
      <div className="flex h-screen items-center justify-center">
        <div
          className={`mx-4 my-8 w-full max-w-md rounded-lg ${
            mode === "dark"
              ? "border border-neutral-950 bg-zinc-900"
              : "bg-white"
          }  p-0 sm:p-5 sm:shadow-lg`}
        >
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Create Account
          </h1>

          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-lightGray bg-white p-3 hover:bg-grayLight">
            <FcGoogle className="text-2xl" />
            <span onClick={signInWithGoogle} className="font-normal text-black">
              Continue With Google
            </span>
          </Button>

          <span className="mb-4 block text-center">Or</span>
          <section>
            <div className="flex gap-4">
              <div className="relative  sm:w-1/2">
                <Input
                  type="text"
                  className={`${
                    validationErrors.includes("firstname")
                      ? "border-rose-500"
                      : ""
                  } w-full p-2.5`}
                  value={firstname}
                  name="firstname"
                  onChange={handleInputChange}
                  onInput={() => handleFocus("firstname")}
                />
                <span
                  className={`${
                    mode === "light" ? "bg-white" : "bg-zinc-900"
                  }  form-text`}
                >
                  First Name
                </span>
              </div>

              <div className="relative w-1/2 sm:pt-0">
                <Input
                  type="text"
                  name="lastname"
                  className={`${
                    validationErrors.includes("lastname")
                      ? "border-rose-500"
                      : ""
                  } w-full p-2.5`}
                  value={lastname}
                  onChange={handleInputChange}
                  onInput={() => handleFocus("lastname")}
                />
                <span
                  className={`${
                    mode === "light" ? "bg-white" : "bg-zinc-900"
                  }  form-text`}
                >
                  Last Name
                </span>
              </div>
            </div>

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
                  validationErrors.includes("password") ||
                  (!passwordCheckPassed && password)
                    ? "border-rose-500"
                    : ""
                } w-full p-2.5`}
                value={password}
                onChange={handleInputChange}
                onInput={() => handleFocus("password")}
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
                      color={`${mode === "light" ? "#333" : "#fff"}`}
                    />
                  ) : (
                    <RiEyeOffLine
                      color={`${mode === "light" ? "#333" : "#fff"}`}
                    />
                  )}
                </div>
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 transition duration-200 ease-in-out">
              <span
                className={`${
                  caseCondition ? "checker-style" : "bg-lightGraySec p-1"
                }`}
              >
                {caseCondition && <BsFillCheckSquareFill />}
                <span className="text-dark">Upper & Lower case letter </span>
              </span>
              <span
                className={`${
                  lengthCondition
                    ? "checker-style"
                    : "rounded-sm bg-lightGraySec p-1"
                }`}
              >
                {lengthCondition && <BsFillCheckSquareFill />}
                <span className="text-dark">8 characters long</span>
              </span>

              <span
                className={`${
                  numberCondition ? "checker-style" : "bg-lightGraySec p-1"
                }`}
              >
                {numberCondition && <BsFillCheckSquareFill />}
                <span className="text-dark">Number</span>
              </span>

              <span
                className={`${
                  charCondition ? "checker-style" : "bg-lightGraySec p-1"
                }`}
              >
                {charCondition && <BsFillCheckSquareFill />}
                <span className="text-stone-600">Special character</span>
              </span>
            </div>

            <div className="relative pt-8">
              {capsLockIsOnSec && (
                <p className="mb-3 font-semibold text-yellow-500">
                  Caps Lock is on
                </p>
              )}
              <Input
                type={cpVisible ? "text" : "password"}
                name="confirmPassword"
                className={`${
                  validationErrors.includes("confirmPassword")
                    ? "border-rose-500"
                    : ""
                } w-full p-2.5`}
                value={confirmPassword}
                onChange={handleInputChange}
                onInput={() => handleFocus("confirmPassword")}
                onKeyDown={checkCapsLockStateSec}
              />
              <span
                className={`${
                  mode === "light" ? "bg-white" : "bg-zinc-900"
                }  form-text`}
              >
                Confirm Password
              </span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setCPVisible(!cpVisible)}>
                  {cpVisible ? (
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

            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColor p-3 text-lg font-semibold text-white hover:bg-primaryColorHover"
              onClick={proceed}
            >
              Continue
            </Button>

            <p
              className={`mb-3 mt-4 text-right ${
                mode === "light" ? "text-blackNeutral" : "text-gray-300"
              } `}
            >
              Already have a Bytes account?{" "}
              <Link to="/auth/sign-in" className="font-semibold underline">
                Sign In
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
