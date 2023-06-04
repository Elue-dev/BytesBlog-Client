import { InputProps } from "@/types/ui";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, className, onInput, value, onChange }, ref) => {
    const inputClasses = `rounded bg-transparent border border-lightGray outline-none focus:border-primaryColor transition ease-in text-lightText	duration-300 ${className}`;

    return (
      <input
        type={type}
        name={name}
        ref={ref}
        className={className ? inputClasses : "border"}
        onInput={onInput}
        value={value}
        onChange={onChange}
      ></input>
    );
  }
);

export default Input;
