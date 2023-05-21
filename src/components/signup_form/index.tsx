import { CAProps } from "@/types";
import Button from "../button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { BsFillCheckSquareFill } from "react-icons/bs";
import Input from "../input";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "@/utils/utils";

export default function SignUpForm({
  values,
  handleInputChange,
  nextStep,
}: CAProps) {
  const { firstname, lastname, email, password, confirmPassword } = values;
  const [visible, setVisible] = useState(false);
  const [cpVisible, setCPVisible] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [caseCondition, setCaseCondition] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const passwordRef = useRef<any | undefined>();
  const cPasswordRef = useRef<any | undefined>();

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
  }, [password]);

  const proceed = () => {
    setValidationErrors([]);
    const errors = [];
    if (!firstname.trim()) {
      errors.push("firstname");
    }
    if (!lastname.trim()) {
      errors.push("lastname");
    }
    if (!email.trim()) {
      errors.push("email");
    }
    if (!password.trim()) {
      errors.push("password");
    }
    if (!confirmPassword.trim()) {
      errors.push("confirmPassword");
    }
    setValidationErrors(errors);

    if (errors.length === 0) {
      if (!validateEmail(email)) {
        return alert("Please enter a valid email format");
      }
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }
      nextStep && nextStep();
    }
  };

  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className=" mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
          <Link to="/" className="mb-3 flex items-center justify-center pt-8">
            <img src={bytesLogo} alt="BytesBlog Logo" />
          </Link>
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Create Account
          </h1>
          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-lightGray bg-white">
            <FcGoogle className="text-2xl" />
            <span className="font-normal">Continue With Google</span>
          </Button>
          <span className="mb-4 block text-center">Or</span>
          <section>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full sm:w-1/2">
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
                />
                <span className="form-text">First Name</span>
              </div>

              <div className="relative w-full pt-3 sm:w-1/2 sm:pt-0">
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
                />
                <span className="form-text">Last Name</span>
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
              />
              <span className="form-text">Email Address</span>
            </div>

            <div className="relative pt-8">
              <Input
                type={visible ? "text" : "password"}
                name="password"
                ref={passwordRef}
                className={`${
                  validationErrors.includes("password") ? "border-rose-500" : ""
                } w-full p-2.5`}
                value={password}
                onChange={handleInputChange}
              />
              <span className="form-text">Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setVisible(!visible)}>
                  {visible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </div>
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 transition duration-200 ease-in-out">
              <span
                className={`${
                  caseCondition ? "checker-style" : "bg-lightGraySec p-2"
                }`}
              >
                {caseCondition && <BsFillCheckSquareFill />}
                <span>Upper & Lower case letter </span>
              </span>
              <span
                className={`${
                  lengthCondition
                    ? "checker-style"
                    : "rounded-sm bg-lightGraySec p-2"
                }`}
              >
                {lengthCondition && <BsFillCheckSquareFill />}
                <span>8 characters long</span>
              </span>
              <span
                className={`${
                  numberCondition ? "checker-style" : "bg-lightGraySec p-2"
                }`}
              >
                {numberCondition && <BsFillCheckSquareFill />}
                <span>Number</span>
              </span>

              <span
                className={`${
                  charCondition ? "checker-style" : "bg-lightGraySec p-2"
                }`}
              >
                {charCondition && <BsFillCheckSquareFill />}
                <span>Special character</span>
              </span>
            </div>

            <div className="relative pt-8">
              <Input
                type={cpVisible ? "text" : "password"}
                name="confirmPassword"
                ref={cPasswordRef}
                className={`${
                  validationErrors.includes("confirmPassword")
                    ? "border-rose-500"
                    : ""
                } w-full p-2.5`}
                value={confirmPassword}
                onChange={handleInputChange}
              />
              <span className="form-text">Confirm Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setCPVisible(!cpVisible)}>
                  {cpVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </div>
              </span>
            </div>

            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColor font-semibold uppercase text-white"
              onClick={proceed}
            >
              Continue
            </Button>

            <p className="mb-3 mt-4 text-right text-blackNeutral">
              Already have a Bytes account?{" "}
              <Link to="/sign-in" className="font-semibold underline">
                Sign In
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
