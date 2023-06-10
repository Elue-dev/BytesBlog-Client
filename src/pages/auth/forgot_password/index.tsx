import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import Input from "@/components/input";
import { useState } from "react";
import { validateEmail } from "@/utils/utils";
import backIcon from "@/assets/backIcon.svg";
import { useModal } from "@/context/useModal";
import { useAlert } from "@/context/useAlert";
import { SERVER_URL } from "@/utils/variables";
import { httpRequest } from "@/lib";
import { ClipLoader } from "react-spinners";
import { useTheme } from "@/context/useTheme";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const modalContext = useModal();
  const alertContext = useAlert();
  const themeContext = useTheme();

  const { revealModal } = modalContext!;
  const { revealAlert, closeAlert } = alertContext!;
  const { mode } = themeContext!;

  const sendResetEmail = async () => {
    closeAlert();
    setValidationErrors([]);
    const errors = [];
    if (!email.trim()) errors.push("email");
    setValidationErrors(errors);
    const credentials = { email };

    const emailFormatValid = validateEmail(email);
    if (errors.length === 0 && emailFormatValid) {
      try {
        setLoading(true);
        const response = await httpRequest.post(
          `${SERVER_URL}/auth/forgot-password`,
          credentials
        );
        console.log(response);
        if (response) {
          setLoading(false);
          setEmail("");
          response.data.withGoogle
            ? revealModal(
                "You registered this account with google, Proceed create a password",
                "/auth/sign-in",
                "warning"
              )
            : revealModal(response.data.message, "/auth/sign-in", "warning");
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

  const handleFocus = (field: string) => {
    const updatedErrors = validationErrors.filter((err) => err !== field);
    setValidationErrors(updatedErrors);
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
          <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center justify-start gap-1 pb-2"
          >
            {mode === "light" ? (
              <img src={backIcon} alt="Back Icon" />
            ) : (
              <IoChevronBackCircleOutline className="text-2xl text-white" />
            )}

            <span>Back</span>
          </div>
          <h1
            className={`pt-3 text-center text-3xl font-semibold ${
              mode === "light" ? "text-blackNeutral" : "text-lightGraySec"
            } `}
          >
            Forgot Password
          </h1>

          <p
            className={`text-md mb-4 mt-1 text-center ${
              mode === "dark" ? "text-zinc-400" : "text-gray-700"
            } `}
          >
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
              <span
                className={`${
                  mode === "light" ? "bg-white" : "bg-zinc-900"
                }  form-text`}
              >
                Email Address
              </span>
            </div>
          </div>
          {loading ? (
            <Button className="mt-14 w-full rounded-lg bg-primaryColorHover p-3 text-white">
              <ClipLoader loading={loading} size={25} color={"#fff"} />
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
    </section>
  );
}
