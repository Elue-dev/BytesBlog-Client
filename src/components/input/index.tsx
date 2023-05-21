import { InputProps } from "@/types";

export default function Input({ type, className }: InputProps) {
  const inputClasses = `rounded border border-lightGray outline-none focus:border-primaryColor transition ease-in	 duration-300 ${className}`;
  return (
    <input type={type} className={className ? inputClasses : "border"}></input>
  );
}
