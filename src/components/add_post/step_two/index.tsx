import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { postCategories } from "./data";
import Button from "@/components/button";
import { useModal } from "@/context/useModal";
import { useAlert } from "@/context/useAlert";
import { useCallback, useEffect, useState } from "react";
import { Post, StepTwoProps } from "@/types/posts";
import { CLOUD_NAME, UPLOAD_PRESET } from "@/utils/variables";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "@/lib";
import { User } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

export default function StepTwo({
  values,
  setValues,
  content,
  image,
  imagePreview,
  initialValues,
  catNames,
  setCatNames,
  categories,
  setCategories,
  handleInputChange,
  previousStep,
}: StepTwoProps) {
  const [loading, setLoading] = useState(false);
  const state = useLocation().state;

  const currentUser: User | null = useSelector<RootState, User | null>(
    (state) => state.auth.user
  );
  const { readTime, title } = values;
  const { revealModal } = useModal()!;
  const { revealAlert, setDone } = useAlert()!;

  const manageArray = useCallback(() => {
    const cNames: string[] = [];
    categories.map((cat: any) => cNames.push(cat.name));
    setCatNames(cNames);
  }, [categories, setCatNames]);

  useEffect(() => {
    manageArray();
  }, [categories, manageArray]);

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
  };

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${currentUser?.token}` },
  };

  const mutation = useMutation(
    (newPost: Post) => {
      return httpRequest.post("/posts", newPost, authHeaders);
    },
    {
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  const editMutation = useMutation(
    (editedPost: Post) => {
      return httpRequest.put(`/posts/${state.slug}`, editedPost, authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries([`posts-${state.id}`]);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  const publishPost = async () => {
    const convertReadTime = parseInt(readTime);

    if (isNaN(convertReadTime))
      return revealAlert("Read time must be a number eg 1, 2, 3", "error");

    if (convertReadTime === 0 || convertReadTime < 1)
      return revealAlert("Read time must be 1 and above", "error");

    if (categories.length === 0)
      return revealAlert(
        "Please select at least one category for this post",
        "error"
      );

    try {
      setLoading(true);
      await uploadAvatarToCloud();

      const postData = {
        title,
        content,
        image: imageUrl,
        categories: catNames,
        readTime: parseInt(readTime),
      };
      const response = await mutation.mutateAsync(postData);
      if (response) {
        setLoading(false);
        revealModal(
          `Your post has been published successfully`,
          "/blog",
          "success"
        );
      }
      setValues(initialValues);
    } catch (error: any) {
      setLoading(false);
      return revealAlert(error.response.data.message, "error");
    }
  };

  const editPost = async () => {
    const convertReadTime = parseInt(readTime);

    !imagePreview?.includes("cloudinary") && (await uploadAvatarToCloud());

    if (isNaN(convertReadTime))
      return revealAlert("Read time must be a number eg 1, 2, 3", "error");

    if (convertReadTime === 0 || convertReadTime < 1)
      return revealAlert("Read time must be 1 and above", "error");

    try {
      setLoading(true);
      await uploadAvatarToCloud();
      const postData = {
        title,
        content,
        image: imageUrl,
        categories: state.categories,
        readTime: parseInt(readTime),
      };
      const response = await editMutation.mutateAsync(postData);
      if (response) setDone(false);
      revealModal(
        `Your post has been updated successfully`,
        `/blog/post/${state.slug}/${state.id}`,
        "success"
      );
      setValues(initialValues);
    } catch (error: any) {
      setLoading(false);
      return revealAlert(error.response.data.message, "error");
    }
  };

  return (
    <>
      <section className="container pt-12">
        <button>
          <div
            onClick={previousStep}
            className="flex cursor-pointer items-center justify-start gap-1 pb-10"
          >
            <IoChevronBackCircleOutline className="text-2xl" />
            <span>Back</span>
          </div>
        </button>

        <div className="px-normal sm:px-16">
          <div className="rounded-lg bg-white px-2 py-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-semibold text-blackNeutral">
              Reding Duration
            </h2>
            <p className="pb-6 text-grayNeutral">
              Please state the estimated time it might take to read this post
              (minutes).
            </p>
            <input
              type="number"
              value={readTime}
              name="readTime"
              onChange={handleInputChange}
              placeholder="e.g 3, 4, 5"
              className="w-full rounded-lg border-2 p-2 text-blackNeutral outline-none hover:border-extraLightGreen hover:hoverShadow focus:border-extraLightGreen focus:hoverShadow"
            />
          </div>
        </div>

        <div className="px-normal sm:px-16">
          <div className="mt-8 rounded-lg bg-white p-0 px-2 py-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-semibold text-blackNeutral">
              Category
            </h2>
            {state ? (
              <p className="pb-4 pt-2 text-grayNeutral">
                Categories cannot be changed
              </p>
            ) : (
              <p className="pb-6 text-grayNeutral">
                Select the category/categories that best describe this post.{" "}
                <span className="font-semibold">Maximum of 3.</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {state ? (
                <>
                  {state.categories.map((cat: string, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
                    >
                      {cat}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {catNames.map((catName, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutralSec"
                    >
                      {catName}
                    </div>
                  ))}
                </>
              )}
            </div>
            <MultiSelect
              value={categories}
              onChange={(e) => setCategories(e.value)}
              onBlur={manageArray}
              disabled={state ? true : false}
              options={postCategories}
              optionLabel="name"
              placeholder={
                state ? state.categories.join(",") : "Select Categories"
              }
              maxSelectedLabels={3}
              selectAll={false}
              selectionLimit={3}
              showSelectAll={false}
              className="custom-multiselect md:w-20rem mt-5 w-full"
            />
          </div>
        </div>

        {loading ? (
          <div className="px-normal flex flex-col items-end justify-end pt-8 sm:px-16">
            <Button
              type="button"
              className="flex h-12 w-28 items-center justify-center rounded-lg bg-primaryColorHover text-white"
            >
              <ClipLoader loading={loading} size={20} color={"#fff"} />
            </Button>
          </div>
        ) : (
          <div className="px-normal flex flex-col items-end justify-end pt-8 sm:px-16">
            <Button
              className="flex h-12 w-28 items-center justify-center bg-primaryColor text-white hover:bg-primaryColorHover"
              onClick={state ? editPost : publishPost}
            >
              {state ? "Edit Post" : "  Publish"}
            </Button>
          </div>
        )}
      </section>
      <div className="footer mt-10 h-20 w-full bg-primaryColorLight"></div>
    </>
  );
}
