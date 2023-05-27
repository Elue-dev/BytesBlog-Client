import { ButtonProps } from "@/types";

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  const buttonClasses = `mr-2 rounded-3xl font-semibold transition duration-200 ease-in-out  ${className}`;
  return (
    <button
      type={type ? type : "button"}
      className={className ? buttonClasses : "bg-primaryColor"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
