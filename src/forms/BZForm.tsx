/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import type { ReactNode } from "react";
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
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submit = async (data: FieldValues) => {
    await onSubmit(data);
    methods.reset();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          layout="vertical"
          action=""
          onFinish={methods.handleSubmit(submit)}
        >
          {children}
        </Form>
      </FormProvider>
    </div>
  );
};

export default BZForm;
