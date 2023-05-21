import Interests from "@/components/interests";
import SignUpForm from "@/components/signup_form";
import { CAValues } from "@/types";
import { useState, ChangeEvent } from "react";

const initialValues: CAValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function CreateAccount() {
  const [pageStep, setPageStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [interests, setInterests] = useState<string[]>([]);

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
        <SignUpForm
          values={values}
          handleInputChange={handleInputChange}
          nextStep={nextStep}
        />
      );
      break;
    case 2:
      return (
        <Interests
          values={values}
          setValues={setValues}
          initialValues={initialValues}
          interests={interests}
          setInterests={setInterests}
          previousStep={previousStep}
        />
      );
      break;
    default:
      return null;
  }
}
