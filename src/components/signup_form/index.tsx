import { CAProps } from "@/types";
import Button from "../button";
import bytesLogo from "@/assets/bytesLogo.svg";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Input from "../input";

export default function SignUpForm({
  values,
  handleInputChange,
  nextStep,
  setValues,
}: CAProps) {
  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className=" mx-4 my-8 w-full max-w-md rounded-lg bg-white p-0 sm:p-5 sm:shadow-lg">
          <Link to="/" className="mb-3 flex items-center justify-center pt-4">
            <img src={bytesLogo} alt="BytesBlog Logo" />
          </Link>
          <h1 className="mb-3 flex items-center justify-center text-3xl font-medium">
            Create Account
          </h1>
          <Button className="mb-4 mt-6 flex w-full items-center justify-center gap-4 rounded-lg border border-lightGray bg-white">
            <span className="font-normal">Continue With Google</span>
            <FcGoogle />
          </Button>
          <span className="mb-4 block text-center">Or</span>
          <form action="">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full sm:w-1/2">
                <Input type="text" className="w-full p-2" />
                <span className="absolute bottom-8 left-2 bg-white px-1 text-blackNeutral">
                  First Name
                </span>
              </div>
              <div className="relative w-full pt-3 sm:w-1/2 sm:pt-0">
                <Input type="text" className="w-full p-2" />
                <span className="absolute bottom-8 left-2 bg-white px-1 text-blackNeutral">
                  Last Name
                </span>
              </div>
            </div>

            <div className="relative pt-8">
              <Input type="text" className="w-full p-2" />
              <span className="absolute bottom-8 left-2 bg-white px-1 text-blackNeutral">
                Email Address
              </span>
            </div>
            <div className="relative pt-8">
              <Input type="text" className="w-full p-2" />
              <span className="absolute bottom-8 left-2 bg-white px-1 text-blackNeutral">
                Password
              </span>
            </div>

            <div className="relative pt-8">
              <Input type="text" className="w-full p-2" />
              <span className="absolute bottom-8 left-2 bg-white px-1 text-blackNeutral">
                Confirm Password
              </span>
            </div>

            <Button
              type="submit"
              className="mt-5 w-full rounded-lg bg-primaryColor font-semibold uppercase text-white"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
