import { Form, Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { type ReactNode, type CSSProperties } from "react";

type TSelectOption = {
  label: string;
  value: string;
};

type TBZSelect = {
  options: TSelectOption[];
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  defaultValue?: string;
  allowClear?: boolean;
  mode?: "multiple" | "tags"; // for multi-select or tag input
};

const BZSelect = ({
  options,
  name,
  label,
  disabled,
  placeholder,
  icon,
  className,
  style,
  defaultValue,
  allowClear = true,
  mode,
}: TBZSelect) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="flex gap-2 items-center pb-1 font-medium text-sm">
          {icon}
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item
              label={label}
              validateStatus={error ? "error" : ""}
              help={error?.message}
              className={`${!label ? "!mb-0" : ""} !m-0`} // kill ALL margins
            >
              <Select
                {...field}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                placeholder={placeholder || "Select"}
                options={options}
                allowClear={allowClear}
                mode={mode}
                className={`[&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!rounded-[17px] [&_.ant-select-selector]:!border-[#d49256] ${
                  className || ""
                }`}
                style={style}
              />
            </Form.Item>

            {error && (
              <small className="text-red-500 text-xs mt-1">
                {error.message}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};

export default BZSelect;
