import Button from "@/components/button";
import { getUserInitials } from "@/helpers/user.initials";
import { RootState } from "@/redux/store";
import { EditProfProps } from "@/types/general";
import { User } from "@/types/user";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@/context/useAlert";
import styles from "./profile.module.scss";
import { useTheme } from "@/context/useTheme";
import { httpRequest } from "@/lib";
import { SERVER_URL } from "@/utils/variables";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "@/redux/slices/auth.slice";
import { ClipLoader } from "react-spinners";

export default function EditProfile({
  setShowSidebar,
  showSidebar,
}: EditProfProps) {
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  let initials;
  console.log(currentUser);

  if (currentUser) {
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);
  }

  const [usernames, setUsernames] = useState(
    `${currentUser?.firstName} ${currentUser?.lastName}`
  );
  const [bio, setBio] = useState(currentUser?.bio);
  const [loading, setLoading] = useState(false);
  const alertContext = useAlert();
  const themeContext = useTheme();
  const dispatch = useDispatch();

  if (!alertContext) return null;
  if (!themeContext) return null;
  const { revealAlert, closeAlert } = alertContext;
  const { mode } = themeContext;

  const updateUserProfile = async () => {
    closeAlert();

    const credentials = {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      avatar: currentUser?.avatar,
      bio: bio || currentUser?.bio,
    };

    try {
      setLoading(true);
      const response = await httpRequest.put(
        `${SERVER_URL}/users/${currentUser?.id}`,
        credentials
      );
      if (response) {
        dispatch(REMOVE_ACTIVE_USER());
        dispatch(SET_ACTIVE_USER(response.data.updatedUser));
        setLoading(false);
        setShowSidebar(false);
        revealAlert("Profile updated", "success");
      }
    } catch (error: any) {
      revealAlert(error.response.data.message, "error");
      setLoading(false);
    }
  };

  return (
    <section className={styles["prof__edit"]}>
      <h1 className="mb-6 mt-8 bg-primaryColorLight p-3 text-center text-xl font-semibold text-black sm:w-full">
        Profile Details
      </h1>
      {showSidebar && (
        <AiOutlineCloseCircle
          color="#8791A7"
          onClick={() => setShowSidebar(false)}
          className="absolute right-2 top-3 mb-4 block cursor-pointer text-3xl"
        />
      )}
      <p className="font-semibold text-grayNeutral">Photo</p>
      <div className="flex items-center justify-start gap-2">
        {currentUser?.avatar === "" ? (
          <>
            <div className={styles["user__initials"]}>{initials}</div>
          </>
        ) : (
          <>
            <a href={currentUser?.avatar}>
              <img
                src={currentUser?.avatar}
                alt={currentUser?.firstName}
                className="h-14 w-14 rounded-full object-cover"
              />
            </a>
          </>
        )}

        <div className="leading-6">
          <p
            className="cursor-pointer font-semibold text-primaryColor underline"
            onClick={() => setShowSidebar(true)}
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
          value={usernames}
          onChange={(e) => setUsernames(e.target.value)}
          className="w-full border-b-2 border-grayLight bg-transparent outline-none"
        />
        <p className="text-grayNeutral">
          This will appear on your posts and profile.
        </p>
      </div>

      <div
        className={`my-8 w-full max-w-md rounded-lg ${
          mode === "dark" ? "border-stone-100 bg-black" : "bg-white sm:p-5"
        } p-0 sm:shadow-lg`}
      >
        <div className="p-1">
          <h2 className="text-xl font-semibold">Bio</h2>
          <p className="pt-2 leading-6 text-grayNeutral">
            This will be shown when others view your profile
          </p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`mt-8 w-full rounded-lg border border-gray-400 bg-transparent p-1 ${
              mode === "dark" ? "text-white" : "text-stone-700"
            }  leading-6 outline-none`}
          ></textarea>
          <p className="text-right leading-3 text-grayNeutral">0/200 words</p>
        </div>

        <div className="flex items-center justify-start rounded-sm pt-6">
          <Button
            className="w-1/2 bg-primaryColorLighter text-primaryColor"
            onClick={() => setShowSidebar(false)}
          >
            Cancel
          </Button>
          {loading ? (
            <Button
              type="button"
              className="mt-5 w-full rounded-lg bg-primaryColorHover p-3 text-lg font-semibold text-white"
            >
              <ClipLoader loading={loading} size={25} color={"#fff"} />
            </Button>
          ) : (
            <Button
              className="w-1/2 bg-primaryColor text-white hover:bg-primaryColorHover"
              onClick={updateUserProfile}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
