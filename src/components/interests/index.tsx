import { useState } from "react";
import { userInterests } from "./data";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "../button";
import { useModal } from "@/context/useModal";
import { useAlert } from "@/context/useAlert";
import { useGoogleAuth } from "@/context/useGoogleAuth";
import { InterestsProps } from "@/types/auth";
import { httpRequest } from "../../lib/index";
import { SERVER_URL } from "@/utils/variables";

export default function Interests({
  interests,
  initialValues,
  setInterests,
  previousStep,
  values,
  setValues,
}: InterestsProps) {
  const [loading, setLoading] = useState(false);
  const modalContext = useModal();
  const alertContext = useAlert();
  const googleAuthContext = useGoogleAuth();
  if (!modalContext) return null;
  if (!alertContext) return null;
  if (!googleAuthContext) return null;
  const { revealModal } = modalContext;
  const { revealAlert, closeAlert } = alertContext;
  const { firstName, lastName, mail, avatar, isGoogle, clearCredentials } =
    googleAuthContext;
  const { firstname, lastname, email, password } = values;

  console.log({ firstName, lastName, mail, avatar, isGoogle });

  const setUserInterest = (int: string) => {
    if (interests.includes(int)) {
      setInterests(interests.filter((cat) => cat !== int));
    } else {
      setInterests([...interests, int]);
    }
  };

  const createUserAccount = async () => {
    closeAlert();
    if (interests.length < 5)
      return revealAlert("Interests must be at least 5", "error");

    const credentials = isGoogle
      ? {
          firstname: firstName,
          lastname: lastName,
          email: mail,
          avatar: avatar,
          password: Date.now().toString(),
          interests,
        }
      : { firstname, lastname, email, password, interests };

    try {
      setLoading(true);
      const response = await httpRequest.post(
        `${SERVER_URL}/auth/signup`,
        credentials
      );
      console.log(response);
      if (response) {
        setLoading(false);
        revealModal(
          `Welcome, ${
            firstname || firstName
          }! Your account has been successfully created. Please sign in`,
          "/auth/sign-in",
          "success"
        );
        clearCredentials();
        setValues(initialValues);
        setInterests([]);
      }
    } catch (error: any) {
      revealAlert(
        error.response.data.message || "Something went wrong, Please try again",
        "error"
      );
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
        <div
          onClick={previousStep}
          className="flex cursor-pointer items-center justify-start gap-1 pb-2"
        >
          <IoChevronBackCircleOutline className="text-2xl" />
          <span>Back</span>
        </div>
        <h1 className="pt-3 text-center text-3xl font-semibold text-blackNeutral">
          Select Your Interests
        </h1>
        <p className="text-md mb-4 mt-1 text-center text-gray-700">
          This would determine the blog posts you would see
        </p>
        <div className="flex flex-wrap gap-7 pt-6">
          {userInterests.map((interest: string, idx: number) => (
            <div key={idx}>
              <div onClick={() => setUserInterest(interest)}>
                <span
                  className={`${
                    interests.includes(interest)
                      ? "border-1 border border-primaryColor p-2 font-bold text-primaryColor"
                      : "border border-lighterGray p-2 text-lighterGray"
                  } cursor-pointer rounded-2xl transition duration-500 ease-in-out`}
                >
                  {interest}
                </span>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <Button className="mt-14 w-full rounded-lg bg-primaryColorHover p-3 text-white">
            Processing...
          </Button>
        ) : (
          <Button
            className="mt-14 w-full rounded-lg bg-primaryColor p-3 text-white hover:bg-primaryColorHover"
            onClick={createUserAccount}
          >
            Create Account
          </Button>
        )}
      </div>
    </div>
  );
}
