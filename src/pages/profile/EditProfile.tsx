import Button from "@/components/button";
import { getUserInitials } from "@/helpers/user.initials";
import { RootState } from "@/redux/store";
import { EditProfProps } from "@/types/general";
import { User } from "@/types/user";
import { ChangeEvent, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@/context/useAlert";
import styles from "./profile.module.scss";
import { useTheme } from "@/context/useTheme";
import { httpRequest } from "@/lib";
import { SERVER_URL, CLOUD_NAME, UPLOAD_PRESET } from "@/utils/variables";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "@/redux/slices/auth.slice";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProfile({
  setShowSidebar,
  showSidebar,
}: EditProfProps) {
  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  let initials;
  if (currentUser) {
    initials = getUserInitials(currentUser.firstName, currentUser.lastName);
  }

  const [bio, setBio] = useState(currentUser?.bio);
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const alertContext = useAlert();
  const themeContext = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const imageUploadRef = useRef<any | undefined>();

  const { revealAlert } = alertContext!;
  const { mode } = themeContext!;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !["image/png", "image/jpeg"].includes(file.type))
      return revealAlert("Only JPG and PNG images are acceptable", "error");

    setImage(file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  let imageUrl: string;
  const uploadAvatarToCloud = async () => {
    const img = new FormData();
    if (image) img.append("file", image);
    img.append("cloud_name", CLOUD_NAME);
    img.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "post", body: img }
    );
    const imageData = await response.json();
    imageUrl = imageData?.url?.toString();
    setImage("");
    setImagePreview(undefined);
  };

  const updateUserProfile = async () => {
    if (!firstName || !lastName) {
      return revealAlert("First Name and Last Name are both required", "error");
    }
    if (
      firstName === currentUser?.firstName &&
      lastName === currentUser?.lastName &&
      bio === currentUser?.bio &&
      !image
    )
      return revealAlert(
        "You have not made any changes to your profile",
        "error"
      );
    try {
      setLoading(true);
      image && (await uploadAvatarToCloud());

      const credentials = {
        firstName: firstName || currentUser?.firstName,
        lastName: lastName || currentUser?.lastName,
        avatar: imageUrl || currentUser?.avatar,
        bio: bio || currentUser?.bio,
      };

      const authHeaders = {
        headers: { authorization: `Bearer ${currentUser?.token}` },
      };

      const response = await httpRequest.put(
        `${SERVER_URL}/users`,
        credentials,
        authHeaders
      );
      if (response) {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["likes"]);
        queryClient.invalidateQueries(["bookmarks"]);
        queryClient.invalidateQueries(["comments"]);
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
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="image"
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div
                className={styles["user__initials"]}
                style={{
                  background: mode === "dark" ? "#f0f0f0" : "#000",
                  color: mode === "dark" ? "#000" : "#f0f0f0",
                }}
              >
                {initials}
              </div>
            )}
          </>
        ) : (
          <>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="image"
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <a href={currentUser?.avatar}>
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.firstName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              </a>
            )}
          </>
        )}

        <div className="leading-6">
          <p
            className="cursor-pointer font-semibold text-primaryColor underline"
            onClick={() => imageUploadRef.current.click()}
          >
            Replace Photo
          </p>
          <input
            type="file"
            ref={imageUploadRef}
            accept="image/*"
            className="hidden bg-transparent"
            onChange={(e) => handleImageChange(e)}
          />
          <p className="text-grayNeutral">JPG and PNG are acceptable</p>
        </div>
      </div>

      <div className="pt-6">
        <h1 className="font-semibold text-grayNeutral">Names</h1>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full border-b-2 border-grayLight bg-transparent outline-none"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full border-b-2 border-grayLight bg-transparent outline-none"
        />
        <p className="text-grayNeutral">
          This will appear on your posts and profile.
        </p>
      </div>

      <div
        className={`my-8 w-full max-w-md rounded-lg ${
          mode === "dark"
            ? "border-stone-100 bg-dark100 sm:p-2"
            : "bg-white sm:p-5 sm:shadow-lg"
        } p-0`}
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
            rows={6}
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
              className="w-1/2 bg-primaryColorHover text-white"
            >
              <ClipLoader loading={loading} size={20} color={"#fff"} />
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
