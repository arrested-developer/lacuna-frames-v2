/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export type GenericResponse = { [key: string]: unknown };

export type FormData = { [key: string]: unknown };

export type SubmitFunction<T extends GenericResponse> = (
  formJSON: string
) => Promise<T>;

export type ValidationResult = {
  allOk: boolean;
  fields: {
    [key: string]: {
      isValid: boolean;
      message?: string;
    };
  };
};

export interface ValidationSchema {
  [key: string]: (value: any) => { isValid: boolean; message?: string };
}
export interface FormHelpers<T extends GenericResponse, U extends FormData> {
  formValues: U;
  setFormValue: (key: string, value: unknown) => void;
  handleFormInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (event: React.FormEvent) => Promise<T>;
  isFormError: boolean;
  formErrorMessage: string;
  isFormSuccess: boolean;
  validation: ValidationResult;
  validateForm: () => Promise<ValidationResult>;
}

const doValidate = async (
  formValues: FormData,
  schema: ValidationSchema,
  field?: string
): Promise<ValidationResult> => {
  const keysToValidate = field ? [field] : Object.keys(schema);
  const result: ValidationResult = { fields: {}, allOk: true };
  for (const key of keysToValidate) {
    const { isValid, message } = await schema[key](formValues[key]);
    result.fields[key] = { isValid, message };
    if (result.allOk && !isValid) {
      result.allOk = false;
    }
  }
  return result;
};

export const useForm = <T extends GenericResponse, U extends FormData>(
  initialFormState: U,
  onSubmit: SubmitFunction<T>,
  validationSchema: ValidationSchema
): FormHelpers<T, U> => {
  const [formValues, setFormValues] = useState({ ...initialFormState });
  const [isFormError, setIsFormError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [validation, setValidation] = useState({ allOk: false, fields: {} });

  const setFormValue = (key: string, value: unknown): void => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent): Promise<T> => {
    event.preventDefault();
    setIsFormError(false);
    setIsFormSuccess(false);
    setFormErrorMessage("");
    try {
      const formJSON = JSON.stringify(formValues);
      const response = await onSubmit(formJSON);
      setIsFormSuccess(true);
      setFormValues({ ...initialFormState });
      return response;
    } catch (err: any) {
      console.error(err);
      setFormErrorMessage(
        err?.message || err?.msg || "There was an error submitting your form"
      );
      setIsFormError(true);
      return {} as T;
    }
  };

  const validateForm = async (name?: string): Promise<ValidationResult> => {
    const result = await doValidate(formValues, validationSchema, name);
    setValidation(result);
    return result;
  };

  const handleFormInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setFormValues({ ...formValues, [name]: value });
  };

  return {
    formValues,
    setFormValue,
    handleFormInput,
    handleFormSubmit,
    isFormError,
    formErrorMessage,
    isFormSuccess,
    validation,
    validateForm,
  };
};
