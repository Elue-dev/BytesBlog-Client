import StepOne from "@/components/add_post/step_one";
import StepTwo from "@/components/add_post/step_two";
import { useState, ChangeEvent } from "react";

const initialValues: { title: string; readTime: string } = {
  title: "",
  readTime: "",
};

export default function AddPost() {
  const [pageStep, setPageStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [catNames, setCatNames] = useState<string[]>([]);
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
          setValues={setValues}
          initialValues={initialValues}
          image={image}
          content={content}
          setContent={setContent}
          setImage={setImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleInputChange={handleInputChange}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      );
    case 2:
      return (
        <StepTwo
          values={values}
          setValues={setValues}
          image={image}
          imagePreview={imagePreview}
          content={content}
          initialValues={initialValues}
          catNames={catNames}
          setCatNames={setCatNames}
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
