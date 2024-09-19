import { FormItemProps, Input, InputProps } from "antd";
import React from "react";
import "./FloatingLabelInput.style.scss";
import { Split } from "../../../../../types/functions/generic.type";

interface FloatingLabelInput
  extends Omit<InputProps, "name">,
    Omit<FormItemProps<any>, "children" | Split<InputProps>> {
  label: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInput> = ({
  label,
  ...passProps
}) => {
  return (
    <div className="floating-label-input-wrap">
      <Input type="text" placeholder=" " {...passProps} />
      <label className={`label-line`}>{label}</label>
    </div>
  );
};

export default FloatingLabelInput;
