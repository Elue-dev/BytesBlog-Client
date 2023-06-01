import StepOne from "@/components/add_post/step_one";
import StepTwo from "@/components/add_post/step_two";
import { AddBPost } from "@/types/posts";
import { useState, ChangeEvent } from "react";

const initialValues: AddBPost = {
  title: "",
  readTime: "",
};

export default function AddPost() {
  const [pageStep, setPageStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [names, setNames] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const nextStep = () => {
    setPageStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    if (pageStep === 1) return;
    setPageStep((currentStep) => currentStep - 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  switch (pageStep) {
    case 1:
      return (
        <StepOne
          values={values}
          image={image}
          content={content}
          setContent={setContent}
          setImage={setImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleInputChange={handleInputChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <StepTwo
          values={values}
          setValues={setValues}
          initialValues={initialValues}
          names={names}
          setNames={setNames}
          categories={categories}
          setCategories={setCategories}
          handleInputChange={handleInputChange}
          previousStep={previousStep}
        />
      );
    default:
      return null;
  }
}
