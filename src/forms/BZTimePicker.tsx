import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import type { CSSProperties } from "react";

type TDatePickerProps = {
  name: string;
  label?: string;
  style?: CSSProperties;
  className?: string;
};

const BZTimePicker = ({ name, label, style, className }: TDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <DatePicker
              size="large"
              style={{
                width: "100%",
                borderRadius: "17px", // Matches BZInput's border radius
                borderColor: "#d49256", // Matching border color of BZInput
                ...style,
              }}
              className={className}
              {...field}
              placeholder={`Select ${label}`}
            />
            <small style={{ color: "red" }}>
              {error ? error.message : null}
            </small>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BZTimePicker;
