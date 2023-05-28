import { StepTwoProps } from "@/types";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { postCategories } from "./data";
import Button from "@/components/button";

export default function StepTwo({
  values,
  setValues,
  initialValues,
  categories,
  setCategories,
  previousStep,
}: StepTwoProps) {
  console.log({
    values,
    setValues,
    initialValues,
    categories,
    setCategories,
    previousStep,
  });

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
          <div className="rounded-lg bg-white p-0 sm:p-8 sm:shadow-lg">
            <h2 className="text-2xl font-semibold text-blackNeutral">
              Reding Duration
            </h2>
            <p className="pb-6 text-grayNeutral">
              Please state the estimated time it might take to read this post
              (minutes).
            </p>
            <input
              type="text"
              placeholder="e.g 3, 4, 5"
              className="w-full rounded-sm border-2 p-2 text-blackNeutral outline-none"
            />
          </div>
        </div>

        <div className="px-normal sm:px-16">
          <div className="mt-8 rounded-lg bg-white p-0 sm:p-8 sm:shadow-lg">
            <h2 className="text-2xl font-semibold text-blackNeutral">
              Category
            </h2>
            <p className="pb-6 text-grayNeutral">
              Select the category/categories that best describe this post.{" "}
              <span className="font-semibold">Maximum of 3.</span>
            </p>
            <MultiSelect
              value={categories}
              onChange={(e) => setCategories(e.value)}
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
          <Button className="flex h-10 w-24 items-center justify-center bg-primaryColor text-white hover:bg-primaryColorHover">
            Publish
          </Button>
        </div>
      </section>
      <div className="footer mt-10 h-20 w-full bg-primaryColorLight"></div>
    </>
  );
}
