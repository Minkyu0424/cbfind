import { type InputHTMLAttributes, forwardRef } from "react";
import { INPUT_STYLE } from "../../constants/styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  styleType: "login" | "upload";
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", styleType, ...props }, ref) => {
    const inputStyles = INPUT_STYLE[styleType](className);
    return <input ref={ref} className={inputStyles} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
