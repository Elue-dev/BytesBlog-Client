import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import Input from "@/components/input";
import { useState } from "react";
import { validateEmail } from "@/utils/utils";
import { useModal } from "../../../context/useModal";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const context = useModal();
  if (!context) return null;
  const { revealModal } = context;

  const sendResetEmail = () => {
    setValidationErrors([]);
    const errors = [];
    if (!email.trim()) {
      errors.push("email");
    }
    setValidationErrors(errors);
    if (errors.length === 0) {
      if (!validateEmail(email)) {
        return alert("Please enter a valid email format");
      }
      revealModal(
        `A link has been sent to ${email}. Kindly open the link to reset your password.`,
        "warning",
        "/auth/reset-password"
      );
    }
  };

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
        <div
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center justify-start gap-1 pb-2"
        >
          <IoChevronBackCircleOutline className="text-2xl" />
          <span>Back</span>
        </div>
        <h1 className="pt-6 text-center text-3xl font-semibold text-blackNeutral">
          Forgot Password
        </h1>
        <p className="text-md mb-4 mt-1 text-center text-gray-700">
          Kindly enter the email address you registered with
        </p>
        <div className="pt-6">
          <div className="relative pt-8">
            <Input
              type="text"
              className={`${
                validationErrors.includes("email") ? "border-rose-500" : ""
              } w-full p-2.5`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={() => handleFocus("email")}
            />
            <span className="form-text">Email Address</span>
          </div>
        </div>

        <Button
          className="mt-14 w-full rounded-lg bg-primaryColor uppercase text-white"
          onClick={sendResetEmail}
        >
          Send Password Reset Link
        </Button>
      </div>
    </div>
  );
}
