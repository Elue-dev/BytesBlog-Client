import { StepOneprops } from "@/types";
import plusIcon from "@/assets/plusIcon.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ChangeEvent, useRef } from "react";
import { Editor } from "primereact/editor";
import styles from "./step.one.module.scss";
import Button from "@/components/button";

export default function StepOne({
  values,
  image,
  content,
  setContent,
  setImage,
  imagePreview,
  setImagePreview,
  handleInputChange,
  nextStep,
}: StepOneprops) {
  const imageUploadRef = useRef<any | undefined>();
  const { title } = values;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  const handleNextStep = () => {
    // if (!title) {
    //   return alert("title required");
    // }
    // if (!content) {
    //   return alert("content required");
    // }
    // if (!image) {
    //   return alert("image required");
    // }
    console.log({ image });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    nextStep && nextStep();
  };

  return (
    <>
      <section className="container max-w-lg p-0 pt-12 sm:pt-20">
        <div className="flex items-center justify-start gap-2">
          <img src={plusIcon} alt="title" className="h-4" />
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            className={`${styles.title} outline-none`}
          />
        </div>

        <form className="pt-8">
          <input
            type="file"
            ref={imageUploadRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
          <div className="" onClick={() => imageUploadRef.current.click()}>
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="blog image"
                  className="h-52 w-full object-cover"
                />
              </>
            ) : (
              <div className="flex cursor-pointer items-center justify-start gap-2">
                <img src={plusIcon} alt="title" className="h-6" />
                <p className="text-xl font-semibold text-grayLight">
                  Add Image
                </p>
              </div>
            )}
          </div>
        </form>

        <div className="card pt-8">
          <Editor
            value={content}
            placeholder={"Write your story....."}
            onTextChange={(e) => setContent(e.htmlValue!)}
            style={{ height: "280px" }}
          />
        </div>

        <div className="flex items-center justify-between rounded-sm pt-6">
          {imagePreview ? (
            <Button
              className="flex h-12 w-32 items-center justify-center whitespace-nowrap bg-primaryColorLighter text-primaryColor"
              onClick={() => imageUploadRef.current.click()}
            >
              Change Image
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            className="flex h-12 w-28 items-center justify-center bg-primaryColor text-white hover:bg-primaryColorHover"
            onClick={handleNextStep}
          >
            Next
          </Button>
        </div>
      </section>
      <div className="footer mt-10 h-20 w-full bg-primaryColorLight"></div>
    </>
  );
}
