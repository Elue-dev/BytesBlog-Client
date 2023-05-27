import Button from "@/components/button";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfile({ setShowPopup, showPopup }: Props) {
  return (
    <>
      <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold sm:w-full">
        Profile Details
      </h1>
      {showPopup && (
        <AiOutlineCloseCircle
          color="#8791A7"
          onClick={() => setShowPopup(false)}
          className="absolute right-2 top-3 mb-4 block cursor-pointer text-3xl"
        />
      )}
      <p className="font-semibold text-grayNeutral">Photo</p>
      <div className="flex items-center justify-start gap-2">
        <img
          src="https://media.licdn.com/dms/image/C4D03AQEJs8pt7dfmwA/profile-displayphoto-shrink_200_200/0/1656258962473?e=1688601600&v=beta&t=UudLiADbwrewUUl5diZf7p8TjFsmzXT0QCu01fmNJw8"
          alt=""
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="leading-6">
          <p
            className="cursor-pointer font-semibold text-primaryColor underline"
            onClick={() => setShowPopup(true)}
          >
            Replace Photo
          </p>
          <p className="text-grayNeutral">JPG and PNG are recommended</p>
        </div>
      </div>

      <div className="pt-6">
        <h1 className="font-semibold text-grayNeutral">Name</h1>
        <input
          type="text"
          value={"Seun Akingboye"}
          className="w-full border-b-2 border-grayLight outline-none"
        />
        <p className="text-grayNeutral">
          This will appear on your posts and profile.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-2 shadow sm:shadow-lg">
        <div className="p-3">
          <h2 className="text-xl font-semibold">Bio</h2>
          <p className="pt-2 leading-6 text-grayNeutral">
            This will be shown when others view your profile
          </p>
          <textarea
            className="mt-8 w-full rounded-lg border border-gray-400 p-1 text-stone-700 outline-none"
            cols={30}
            rows={3}
          ></textarea>
          <p className="text-right leading-3 text-grayNeutral">0/200 words</p>
        </div>

        <div className="flex items-center justify-start rounded-sm pt-6">
          <Button
            className="w-1/2 bg-primaryColorLighter text-primaryColor"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </Button>
          <Button className="w-1/2 bg-primaryColor text-white">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
