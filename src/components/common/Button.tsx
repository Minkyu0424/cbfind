import { forwardRef, type ButtonHTMLAttributes } from "react";
import { BUTTON_STYLE } from "../../constants/styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: "login" | "signup";
  text: string;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", styleType, text, onClick }, ref) => {
    const inputStyles = BUTTON_STYLE[styleType](className);

    return (
      <button ref={ref} className={inputStyles} onClick={onClick}>
        {text}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
