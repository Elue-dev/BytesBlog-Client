import plusIcon from "@/assets/plusIcon.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Editor } from "primereact/editor";
import styles from "./step.one.module.scss";
import Button from "@/components/button";
import { useAlert } from "@/context/useAlert";
import { StepOneprops } from "@/types/posts";
import { useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function StepOne({
  values,
  setValues,
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
  const state = useLocation().state;

  const { title } = values;
  const { revealAlert } = useAlert()!;
  const queryString = useLocation().search;
  const [showAlert, setShowAlert] = useState(false);
  const queryParams = new URLSearchParams(queryString);
  const action = queryParams.get("action");
  const { done, setDone } = useAlert()!;
  const { pathname } = useLocation();

  useEffect(() => {
    if (!content && action === "edit") setShowAlert(true);

    switch (action) {
      case "new":
        break;
      case "edit":
        if (!done) {
          setValues({
            title: state.title,
            readTime: state.readTime,
          });
          setImage(state.image);
          setImagePreview(state.image);
          setContent(state.content || "");
          setDone(true);
        }

        break;
      default:
        "";
    }
  }, [
    action,
    state,
    content,
    setImage,
    setContent,
    setImagePreview,
    setValues,
    revealAlert,
    done,
    setDone,
  ]);

  useEffect(() => {
    setDone(false);
  }, [pathname, setDone]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !["image/png", "image/jpeg"].includes(file.type))
      return revealAlert("Only JPG and PNG images are acceptable", "error");
    setImage(file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  const handleNextStep = () => {
    const fields: { [key: string]: string | File | undefined } = {
      title,
      image,
      content,
    };

    const missingFields: string[] = [];

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const value = fields[field];
        if (
          (typeof value === "string" && value.trim().length === 0) ||
          value === undefined ||
          (value instanceof File && !value.name.trim().length)
        ) {
          missingFields.push(field);
        }
      }
    }

    if (missingFields.length > 0) {
      return revealAlert(
        `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
        "error"
      );
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    nextStep && nextStep();
  };

  return (
    <>
      {showAlert && (
        <p className="text-center font-semibold text-red-500">
          If post content fails to show, click on 'Next' button and return back
        </p>
      )}
      <section className="container max-w-lg p-0 pt-12 sm:pt-20">
        <div className="flex items-center justify-start gap-2">
          <img src={plusIcon} alt="title" className="h-6" />
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            className={`${styles.title} bg-transparent outline-none`}
          />
        </div>

        <form className="pt-8">
          <input
            type="file"
            ref={imageUploadRef}
            accept="image/*"
            className="hidden bg-transparent"
            onChange={(e) => handleImageChange(e)}
          />
          <div onClick={() => imageUploadRef.current.click()}>
            {imagePreview ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="mb-2 text-2xl font-semibold text-grayLight">
                    Image
                  </h2>
                  <span className="cursor-pointer text-base text-gray-500">
                    Tap to change image
                  </span>
                </div>
                <img
                  src={imagePreview}
                  alt="blog image"
                  className="h-52 w-full rounded-lg object-cover"
                />
              </>
            ) : (
              <div className="flex cursor-pointer items-center justify-start gap-2">
                <img src={plusIcon} alt="title" className="h-6" />
                <p className="text-2xl font-semibold text-grayLight">
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
            style={{
              height: "280px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          />
        </div>

        <div className="flex items-center justify-end rounded-sm pt-6">
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
