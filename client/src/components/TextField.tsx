import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";

type TextFieldProps = {
  multiline?: boolean;
  size?: "small" | "medium";
  label: string;
  type?: string;
} & FieldAttributes<{}>;
export const FormikTextField: React.FC<TextFieldProps> = ({
  size,
  multiline,
  type,
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      // variant="outlined"
      margin="normal"
      multiline={multiline}
      size={size}
      fullWidth
      {...field}
      helperText={errorText}
      label={label}
      error={!!errorText}
      type={type}
    />
  );
};
