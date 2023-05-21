import { CAProps } from "@/types";
import Button from "../button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye } from "react-icons/hi";
import Input from "../input";

export default function SignUpForm({
  values,
  handleInputChange,
  nextStep,
  setValues,
}: CAProps) {
  console.log(values);
  console.log(handleInputChange);
  console.log(nextStep);
  console.log(setValues);

  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className=" mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
          <Link to="/" className="mb-3 flex items-center justify-center pt-8">
            <img src={bytesLogo} alt="BytesBlog Logo" />
          </Link>
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Create Account
          </h1>
          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-lightGray bg-white">
            <FcGoogle className="text-2xl" />
            <span className="font-normal">Continue With Google</span>
          </Button>
          <span className="mb-4 block text-center">Or</span>
          <form action="">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full sm:w-1/2">
                <Input type="text" className="w-full p-2.5" />
                <span className="form-text">First Name</span>
              </div>

              <div className="relative w-full pt-3 sm:w-1/2 sm:pt-0">
                <Input type="text" className="w-full p-2.5" />
                <span className="form-text">Last Name</span>
              </div>
            </div>

            <div className="relative pt-8">
              <Input type="text" className="w-full p-2.5" />
              <span className="form-text">Email Address</span>
            </div>

            <div className="relative pt-8">
              <Input type="text" className="w-full p-2.5" />
              <span className="form-text">Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <HiOutlineEye />
              </span>
            </div>

            <div className="relative pt-8">
              <Input type="text" className="w-full p-2.5" />
              <span className="form-text">Confirm Password</span>
              <span className="absolute bottom-3 right-2 cursor-pointer text-2xl text-gray-600">
                <HiOutlineEye />
              </span>
            </div>

            <Button
              type="submit"
              className="mt-5 w-full rounded-lg bg-primaryColor font-semibold uppercase text-white"
              onClick={nextStep}
            >
              Continue
            </Button>

            <p className="mb-3 mt-4 text-right text-blackNeutral">
              Already have a Bytes account?{" "}
              <Link to="/sign-in" className="font-semibold underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
