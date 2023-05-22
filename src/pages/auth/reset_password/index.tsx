import { RPValues } from "@/types";
import Button from "@/components/button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import Input from "@/components/input";
import { ChangeEvent, useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useModal } from "@/components/context/useModal";

const initialValues: RPValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPassword() {
  const [credentials, setCredentials] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [cpVisible, setCPVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [caseCondition, setCaseCondition] = useState(false);
  const context = useModal();

  const { password, confirmPassword } = credentials;

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

  if (!context) return null;
  const { revealModal } = context;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const proceed = () => {
    setValidationErrors([]);
    const errors = [];
    if (!password.trim()) {
      errors.push("password");
    }
    if (!confirmPassword.trim()) {
      errors.push("confirmPassword");
    }
    setValidationErrors(errors);

    if (errors.length === 0) {
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }
      revealModal("Password successfully reset", "success", "/auth/sign-in");
    }
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
              className="pt-8 text-center sm:pt-4"
            />
          </Link>
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Reset Password
          </h1>
          <section>
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
                className={`${
                  validationErrors.includes("confirmPassword")
                    ? "border-rose-500"
                    : ""
                } w-full p-2.5`}
                value={confirmPassword}
                onChange={handleInputChange}
                onInput={() => handleFocus("confirmPassword")}
              />
              <span className="form-text">Confirm New Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <div onClick={() => setCPVisible(!cpVisible)}>
                  {cpVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </div>
              </span>
            </div>

            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColor text-lg font-semibold uppercase text-white"
              onClick={proceed}
            >
              Reset Password
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
