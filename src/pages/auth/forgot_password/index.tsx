import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import Input from "@/components/input";
import { useState } from "react";
import { validateEmail } from "@/utils/utils";
import backIcon from "@/assets/backIcon.svg";
import { useModal } from "../../../context/useModal";
import { useAlert } from "../../../context/useAlert";
import { SERVER_URL } from "@/utils/variables";
import { httpRequest } from "@/lib";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const modalContext = useModal();
  const alertContext = useAlert();
  if (!modalContext) return null;
  if (!alertContext) return null;
  const { revealModal } = modalContext;
  const { revealAlert, closeAlert } = alertContext;

  const sendResetEmail = async () => {
    closeAlert();
    setValidationErrors([]);
    const errors = [];
    if (!email.trim()) errors.push("email");
    setValidationErrors(errors);

    const emailFormatValid = validateEmail(email);
    if (errors.length === 0 && emailFormatValid) {
      try {
        setLoading(true);
        const response = await httpRequest.post(
          `${SERVER_URL}/auth/forgot-password`,
          {
            email,
          }
        );
        console.log(response);
        if (response) {
          setLoading(false);
          revealModal(
            `A link has been sent to ${email}. Kindly open the link to reset your password.`,
            "/auth/reset-password",
            "warning"
          );
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
    <div className="flex h-screen items-center justify-center">
      <div className="mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
        <div
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center justify-start gap-1 pb-2"
        >
          <img src={backIcon} alt="Back Icon" />
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
        {loading ? (
          <Button className="mt-14 w-full rounded-lg bg-primaryColorHover p-3 text-white">
            Processing...
          </Button>
        ) : (
          <Button
            className="mt-14 w-full rounded-lg bg-primaryColor p-3 text-white hover:bg-primaryColorHover"
            onClick={sendResetEmail}
          >
            Send Password Reset Link
          </Button>
        )}
      </div>
    </div>
  );
}
