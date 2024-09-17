import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputProps,
  Typography,
} from "antd";
import { FormItemProps } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import _ from "lodash";
import React, { CSSProperties, memo, useMemo } from "react";
import "./AppInput.style.scss";
import { Split } from "../../../types/functions/generic.type";
import { cn } from "../../../utils/helper/class.helper";
interface IInputProps
  extends Omit<InputProps, "name" | "pattern">,
    Omit<FormItemProps<any>, "children" | Split<InputProps>> {
  labelPosition?: "top" | "bottom" | "left" | "right";
  iconLabel?: JSX.Element;
  containerClassName?: string;
  labelBorderInput?: boolean;
  name?: FormItemProps["name"];
  floatingLabel?: boolean;
  pattern?: RegExp;
  styleFormItem?: CSSProperties;
  useCopyable?: boolean;
  valueCopyable?: string;
  typeInput?: "input" | "number" | "textarea" | "date-picker" | "password";
  formatter?: any;
  parser?: any;
  format?: string;
  normalize?: FormItemProps["normalize"];
}

const AppInput: React.FC<IInputProps> = ({
  label,
  name,
  size = "large",
  rules,
  className,
  disabled,
  containerClassName,
  floatingLabel = false,
  initialValue,
  styleFormItem,
  getValueFromEvent,
  hidden,
  useCopyable = false,
  valueCopyable = "",
  typeInput = "input",
  normalize,
  ...passProps
}) => {
  const customTextCopyable = useMemo(() => {
    if (valueCopyable) return valueCopyable;
    if (_.isArray(name)) return name.join(".");
    return name;
  }, [name, valueCopyable]);
  const TypeComponent: Record<
    "input" | "number" | "textarea" | "date-picker" | "password",
    any
  > = {
    input: Input,
    number: InputNumber,
    textarea: TextArea,
    "date-picker": DatePicker,
    password: Input.Password,
  };
  const ComponentText = TypeComponent[typeInput];

  return (
    <Form.Item
      initialValue={initialValue}
      name={name}
      hidden={hidden}
      style={styleFormItem}
      className={cn("relative", containerClassName)}
      label={
        !floatingLabel && label ? (
          <Typography.Text
            copyable={
              useCopyable
                ? {
                    text: customTextCopyable,
                    tooltips: ["Copy path", "Copied path"],
                  }
                : false
            }
            className={cn(
              "text-[1.4rem] leading-[20px] tracking-[0.28px] text-black"
            )}
          >
            {label}
          </Typography.Text>
        ) : null
      }
      rules={rules}
      messageVariables={{
        label: `${label}`,
      }}
      getValueFromEvent={getValueFromEvent}
      normalize={normalize}
    >
      <ComponentText
        {...passProps}
        size={size}
        disabled={disabled}
        className={cn(
          "app-input w-full border-input-border first-letter:rounded-[6px] hover:border-input-border-hover",
          size === "large" && "text-field-app-share",
          disabled
            ? "border-input-disable-border bg-input-disable-background hover:border-input-disable-border"
            : "bg-white",
          className
        )}
        pattern={passProps.pattern?.toString()} // Convert the pattern to a string
      />
    </Form.Item>
  );
};

export default memo(AppInput);
