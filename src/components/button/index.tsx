import { ButtonProps } from "@/types";

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  const buttonClasses = `p-3 mr-2 rounded-3xl font-semibold  ${className}`;
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
