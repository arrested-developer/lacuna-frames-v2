import { ChangeEventHandler, FC } from "react";
import { useTheme } from "../../hooks";

import "./radio.scss";

const Checkbox: FC<{
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, checked, onChange, disabled, children }) => {
  const { theme } = useTheme();
  return (
    <label
      className={`theme--${theme} lacuna-radio${
        disabled ? " lacuna-radio--disabled" : ""
      }${checked ? " lacuna-radio--selected" : ""}`}
    >
      <span className={`checkmark`} />
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  );
};

export default Checkbox;
