import { FC, MouseEventHandler } from "react";
import { useTheme } from "../../hooks";

import "./button.scss";

const Button: FC<{
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ disabled, onClick, children, ...props }) => {
  const { theme } = useTheme();
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`theme--${theme} lacuna-button${
        disabled ? " lacuna-button--disabled" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
