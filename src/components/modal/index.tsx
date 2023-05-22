import { ModalProps } from "@/types";
import Button from "../button";
import { useModal } from "../context/useModal";

export default function Modal({ message }: ModalProps) {
  const context = useModal();
  if (!context) return null;
  const { showModal, closeModal } = context;

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
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primaryColorLighter">
              <svg
                className="h-6 w-6 text-primaryColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="mt-3">
              <p className="text-xl text-blackNeutralSec">{message}</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
              <Button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primaryColorLighter px-4 py-2 text-sm font-semibold text-primaryColor shadow-sm"
                onClick={closeModal}
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
