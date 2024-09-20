import { Form, Select, SelectProps, Typography } from "antd";
import { FormItemProps } from "antd/es/form";
import React from "react";
import { Split } from "../../../types/functions/generic.type";
import { cn } from "../../../utils/helper/class.helper";
// import './app-select.style.scss'
interface ISelectProps
  extends SelectProps,
    Omit<FormItemProps<any>, "children" | Split<SelectProps>> {
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelBorderInput?: boolean;
  prefixIcon?: React.ReactNode;
  floatingLabel?: boolean;
  classFormItem?: string;
  useCopyable?: boolean;
  valueCopyable?: string;
  hiddenLabel?: boolean;
}
const AppSelect: React.FC<ISelectProps> = ({
  name,
  label,
  size = "large",
  rules,
  classFormItem,
  options,
  disabled,
  initialValue,
  prefixIcon,
  className,
  floatingLabel = false,
  ...passProps
}) => {
  const valueFormItem = Form.useWatch(name);

  return (
    <div className="app-select-wrap relative">
      <Form.Item
        initialValue={initialValue}
        label={
          <Typography.Text
            className={cn(
              "text-[1.4rem] leading-[20px] tracking-[0.28px] text-black"
            )}
          >
            {label}
          </Typography.Text>
        }
        className={cn("form-select relative", classFormItem)}
        name={name}
        rules={rules}
        colon={false}
        messageVariables={{
          label: `${label}`,
        }}
      >
        {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
        <Select
          className={cn(
            "app-select rounded-[6px]",
            disabled
              ? "app-select-disabled border-input-disable-border bg-input-disable-background"
              : "bg-white",
            floatingLabel && "select-line",
            className
          )}
          size={size}
          options={options}
          disabled={disabled}
          showSearch
          {...passProps}
        />
      </Form.Item>
      {floatingLabel && (
        <label
          className={cn(
            "label-line",
            valueFormItem && "floating",
            disabled && "label-line-disabled"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default AppSelect;
