import { Form, Input } from "antd";
import type { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  // AntD customization
  size?: "large" | "middle" | "small";
  className?: string;
  style?: CSSProperties;
};

const BZInput = ({
  name,
  label,
  type = "text",
  disabled = false,
  placeholder,
  size = "large",
  className,
  style,
}: TInputProps) => {
  const { control } = useFormContext(); // gets control from FormProvider

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
          className={`${!label ? "!mb-0" : ""}`} // remove margin if no label
        >
          <Input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            size={size}
            className={className}
            style={{
              ...style,
            //   border: "none", // Removes the border
            //   outline: "none", // Optionally remove focus outline
            }}
            placeholder={placeholder || (label ? `Enter your ${label}` : "")}
          />
        </Form.Item>
      )}
    />
  );
};

export default BZInput;
