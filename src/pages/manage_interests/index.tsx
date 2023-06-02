import { userInterests } from "@/components/interests/data";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "@/components/button";
import { useModal } from "../../context/useModal";
import { useAlert } from "../../context/useAlert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ManageInterests() {
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const modalContext = useModal();
  const alertContext = useAlert();

  const currentUserInterests = [
    "Technology",
    "Programming",
    "Writing",
    "Religion",
    "Business",
    "UI/UX",
    "Lifestyle",
    "Culture",
    "Science",
  ];

  useEffect(() => {
    const filteredUserInterests = userInterests.filter((interest) =>
      currentUserInterests.includes(interest)
    );
    setInterests(filteredUserInterests);
  }, []);

  if (!modalContext) return null;
  if (!alertContext) return null;
  const { revealModal } = modalContext;
  const { revealAlert, closeAlert } = alertContext;

  const setUserInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((cat) => cat !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const updateInterests = () => {
    closeAlert();
    if (interests.length < 5)
      return revealAlert("Interests must be at least 5", "error");

    revealModal(
      `Your interests have been updated successfully`,
      "/blog",
      "success"
    );
    setInterests([]);
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
        <h1 className="pt-3 text-center text-3xl font-semibold text-blackNeutral">
          Manage Your Interests
        </h1>
        <p className="text-md mb-4 mt-1 text-center text-gray-700">
          This would determine the blog posts you would see
        </p>
        <div className="flex flex-wrap gap-7 pt-6">
          {userInterests?.map((interest: string, idx: number) => (
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

        <Button
          className="mt-14 w-full rounded-lg bg-primaryColor p-3 text-white hover:bg-primaryColorHover"
          onClick={updateInterests}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
