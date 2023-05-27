import Button from "../button";
// import bytesLogo from "@/assets/bytesLogo.svg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] bg-primaryColorLight text-center">
      <div className="sm:p-auto absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform p-2 sm:w-auto">
        {/* <Link to="/" className="flex items-center justify-center">
          <img src={bytesLogo} alt="BytesBlog Logo" className="h-14" />
        </Link> */}

        <p className="mt-2 text-2xl font-normal text-lightGray sm:text-3xl">
          The page you are requesting for is not available
        </p>
        <div className="flex flex-col gap-4 pt-10 sm:flex-row">
          <Button
            className="w-full border-2 border-primaryColor bg-primaryColor p-3 text-2xl font-normal uppercase text-white hover:bg-primaryColorHover sm:w-1/2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            className="w-full border-2 border-primaryColor bg-primaryColorLight p-3 text-2xl font-normal uppercase text-primaryColor sm:w-1/2"
            onClick={() => navigate("/auth/create-account")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
