import { InterestsProps } from "@/types";
import { userInterests } from "./data";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "../button";

export default function Interests({
  interests,
  setInterests,
  previousStep,
}: InterestsProps) {
  console.log(interests);

  const setUserInterest = (int: string) => {
    if (interests.includes(int)) {
      setInterests(interests.filter((cat) => cat !== int));
    } else {
      setInterests([...interests, int]);
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
        <p className="mb-4 mt-1 text-center text-sm">
          This would determine the blog posts you would see
        </p>
        <div className="flex flex-wrap gap-7 pt-6">
          {userInterests.map((interest: string, idx: number) => (
            <div key={idx}>
              <div onClick={() => setUserInterest(interest)}>
                <span
                  className={`${
                    interests.includes(interest)
                      ? "border-2 border-primaryColor p-2 text-primaryColor transition duration-500 ease-in-out"
                      : "border border-lighterGray p-2 text-lighterGray transition duration-500 ease-in-out"
                  } cursor-pointer rounded-2xl`}
                >
                  {interest}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-14 w-full rounded-lg bg-primaryColor uppercase text-white">
          Create Account
        </Button>
      </div>
    </div>
  );
}
