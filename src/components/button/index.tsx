import { ButtonProps } from "@/types";

export default function Button({ children, className, type }: ButtonProps) {
  console.log(className);

  const buttonClasses = `p-3 mr-2 rounded-3xl ${className}`;
  return (
    <button
      type={type ? type : "button"}
      className={className ? buttonClasses : "bg-primaryColor"}
    >
      {children}
    </button>
  );
}
