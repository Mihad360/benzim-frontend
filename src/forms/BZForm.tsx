/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const BZForm = ({
  onSubmit,
  children,
  resolver,
  defaultValues,
}: TFormProps) => {
  const methods = useForm({
    resolver,
  });

  // ✅ IMPORTANT: reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const submit = async (data: FieldValues) => {
    await onSubmit(data);
    // ❌ do NOT reset after submit for edit profile
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default BZForm;
