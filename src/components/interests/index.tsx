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
import { ClipLoader } from "react-spinners";
import { useTheme } from "@/context/useTheme";
import { useNavigate } from "react-router-dom";
import { SET_ACTIVE_USER } from "@/redux/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function Interests({
  interests,
  initialValues,
  setInterests,
  previousStep,
  values,
  setValues,
}: InterestsProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useTheme()!;
  const { revealModal } = useModal()!;
  const { revealAlert } = useAlert()!;
  const { firstName, lastName, mail, avatar, isGoogle, clearCredentials } =
    useGoogleAuth()!;
  const { firstname, lastname, email, password } = values;

  const setUserInterest = (int: string) => {
    if (interests.includes(int)) {
      setInterests(interests.filter((cat) => cat !== int));
    } else {
      setInterests([...interests, int]);
    }
  };

  const createUserAccount = async () => {
    if (interests.length < 4)
      return revealAlert("Interests must be at least 4", "error");

    const credentials = isGoogle
      ? {
          firstname: firstName,
          lastname: lastName,
          email: mail,
          avatar: avatar,
          password: Date.now().toString(),
          interests,
          withGoogle: true,
        }
      : { firstname, lastname, email, password, interests, withGoogle: false };

    try {
      setLoading(true);
      const response = await httpRequest.post(
        `${SERVER_URL}/auth/signup`,
        credentials
      );
      if (response) {
        dispatch(SET_ACTIVE_USER(response.data.user));
        setLoading(false);
        revealModal(
          `Welcome, ${
            firstname || firstName
          }! Your account has been successfully created.`,
          "/",
          "success"
        );
        clearCredentials();
        setValues(initialValues);
        setInterests([]);
      }
    } catch (error: any) {
      setLoading(false);
      if (
        error.response.data.message ===
        "Account has already been signed up with google, sign in instead"
      ) {
        revealAlert(
          error.response.data.message ||
            "Something went wrong, Please try again",
          "error"
        );
        navigate("/auth/sign-in");
      } else {
        revealAlert(
          error.response.data.message ||
            "Something went wrong, Please try again",
          "error"
        );
      }
    }
  };

  const handleNavigate = () => {
    previousStep && previousStep();
    isGoogle && clearCredentials();
  };

  return (
    <section className={`${mode === "dark" && "bg-zinc-950"}`}>
      <div className="flex h-screen items-center justify-center">
        <div
          className={`mx-4 my-8 w-full max-w-md rounded-lg ${
            mode === "dark" ? "g-zinc-950" : "bg-white"
          }  p-0 sm:p-5 sm:shadow-lg`}
        >
          <div
            onClick={handleNavigate}
            className="flex cursor-pointer items-center justify-start gap-1 pb-2"
          >
            <IoChevronBackCircleOutline className="text-2xl" />
            <span>Back</span>
          </div>

          <h1
            className={`pt-3 text-center text-3xl font-semibold ${
              mode === "light" ? "text-blackNeutral" : "text-lightGraySec"
            } `}
          >
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
              <ClipLoader loading={loading} size={25} color={"#fff"} />
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
    </section>
  );
}
