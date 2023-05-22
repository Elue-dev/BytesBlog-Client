import { ModalProps } from "@/types";
import Button from "../button";
import { useModal } from "../context/useModal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Modal({ message }: ModalProps) {
  const navigate = useNavigate();
  const context = useModal();
  if (!context) return null;
  const { showModal, modalIcon, route, closeModal } = context;

  const closeModalAndNavigate = () => {
    closeModal();
    navigate(route);
  };

  return (
    <div>
      {showModal ? (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center p-4 sm:p-8"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="relative mx-auto w-full max-w-lg rounded-lg bg-white px-4 py-10 text-center shadow-xl">
            <div
              className={`mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full ${
                modalIcon === "success" && `border border-brightGreen`
              }`}
            >
              {modalIcon === "success" ? (
                <AiOutlineCheckCircle className="h-20 w-20 p-1 text-primaryColor" />
              ) : (
                <IoWarningOutline className="h-20 w-20 p-1 text-primaryColor" />
              )}
            </div>
            <div className="mt-3">
              <p className="text-xl text-blackNeutralSec">{message}</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
              <Button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primaryColorLighter px-4 py-2 text-lg font-semibold uppercase text-primaryColor shadow-sm"
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
