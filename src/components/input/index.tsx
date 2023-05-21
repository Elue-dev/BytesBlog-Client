import { InputProps } from "@/types";

export default function Input({
  type,
  name,
  ref,
  className,
  value,
  onChange,
}: InputProps) {
  const inputClasses = `rounded border border-lightGray outline-none focus:border-primaryColor transition ease-in text-lightText	 duration-300 ${className}`;
  return (
    <input
      type={type}
      name={name}
      ref={ref}
      className={className ? inputClasses : "border"}
      value={value}
      onChange={onChange}
    ></input>
  );
}
