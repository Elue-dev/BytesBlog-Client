import { StepTwoProps } from "@/types";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { postCategories } from "./data";
import Button from "@/components/button";
import { useModal } from "../../../context/useModal";
import { useAlert } from "../../../context/useAlert";
import { useEffect } from "react";

export default function StepTwo({
  values,
  setValues,
  initialValues,
  names,
  setNames,
  categories,
  setCategories,
  handleInputChange,
  previousStep,
}: StepTwoProps) {
  const { readTime } = values;
  const context = useModal();
  const alertContext = useAlert();

  const manageArray = () => {
    const name: string[] = [];
    categories.map((cat: any) => name.push(cat.name));
    setNames(name);
  };

  useEffect(() => {
    manageArray();
  }, [categories]);

  if (!context) return null;
  if (!alertContext) return null;
  const { revealModal } = context;
  const { revealAlert } = alertContext;

  const publishPost = () => {
    const convertReadTime = parseInt(readTime);

    if (isNaN(convertReadTime))
      return revealAlert("Read time must be a number eg 1, 2, 3", "error");

    if (categories.length === 0)
      return revealAlert(
        "Please select at least one category for this post",
        "error"
      );

    revealModal(
      `Your post has been published successfully`,
      "/blog",
      "success"
    );
    setValues(initialValues);
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
              type="text"
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
            <p className="pb-6 text-grayNeutral">
              Select the category/categories that best describe this post.{" "}
              <span className="font-semibold">Maximum of 3.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {names.map((name, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border-2 border-borderPrimary bg-primaryColorLight p-1 font-semibold text-blackNeutral"
                >
                  {name}
                </div>
              ))}
            </div>
            <MultiSelect
              value={categories}
              onChange={(e) => setCategories(e.value)}
              onBlur={manageArray}
              options={postCategories}
              optionLabel="name"
              placeholder="Select Categories"
              maxSelectedLabels={3}
              selectAll={false}
              selectionLimit={3}
              showSelectAll={false}
              className="custom-multiselect md:w-20rem mt-5 w-full"
            />
          </div>
        </div>

        <div className="px-normal flex flex-col items-end justify-end pt-8 sm:px-16">
          <Button
            className="flex h-12 w-28 items-center justify-center bg-primaryColor text-white hover:bg-primaryColorHover"
            onClick={publishPost}
          >
            Publish
          </Button>
        </div>
      </section>
      <div className="footer mt-10 h-20 w-full bg-primaryColorLight"></div>
    </>
  );
}
