import Button from "../button";
import { useModal } from "../../context/useModal";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

export default function Modal() {
  const navigate = useNavigate();
  const context = useModal();
  if (!context) return null;
  const { showModal, modalIcon, route, closeModal, message } = context;

  const closeModalAndNavigate = () => {
    closeModal();
    route !== "" && navigate(route);
  };

  return (
    <div>
      {showModal ? (
        <div
          className="fixed inset-0 z-10 flex cursor-pointer items-center justify-center p-4 sm:p-8"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeModalAndNavigate}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="relative mx-auto w-full max-w-lg rounded-lg bg-white px-4 py-10 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-brightGreen">
              {modalIcon === "success" ? (
                <BsCheckCircle color="#169639" className="text-4xl font-bold" />
              ) : (
                <RiErrorWarningLine
                  color="#169639"
                  className="text-4xl font-bold"
                />
              )}
            </div>
            <div className="mt-3">
              <p className="text-xl text-blackNeutralSec">{message}</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
              <Button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primaryColorLighter p-3 px-4 py-2 text-lg font-semibold uppercase text-primaryColor shadow-sm"
                onClick={closeModalAndNavigate}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
