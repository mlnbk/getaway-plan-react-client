import React, { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';

interface FormProperties {
  defaultValues?: any;
  children: ReactNode;
  onSubmit: any;
}

const Form: FC<FormProperties> = ({ defaultValues, children, onSubmit }) => {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid max-w-md mx-auto mt-8 mb-0 gap-2"
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...child.props,
                  register,
                  key: child.props.name,
                })
              : child;
          })
        : children}
    </form>
  );
};

export default Form;
