import { useState, useEffect, useCallback, useMemo } from "react";
import type { SomeZodObject } from "zod";

type IFormState = Record<string, unknown>;

interface IUseFormValidationInputTypes {
  currentFormState: IFormState;
  currentFormSchema: SomeZodObject;
  initialPerformLiveValidation?: boolean;
}

interface IValidationState<TFormState> {
  hasError: boolean;
  errorData?: { [P in keyof TFormState]?: string };
}

interface IUseFormValidationReturnTypes<TFormStateTypes> {
  /** This will live check to see if form fields have values set */
  allFieldsHaveValues: boolean;
  /** This is used so the user can explicitly choose when to initially validate the form section, and when progress to the next section */
  getIsFormDataValid: () => boolean;
  /** This is the error state for the form section, uses generics to type return data */
  errorState: IValidationState<TFormStateTypes>;
}

export const useFormValidation = <
  TFormStateTypes extends Record<string, unknown>,
>({
  currentFormState,
  currentFormSchema,
  initialPerformLiveValidation = false,
}: IUseFormValidationInputTypes): IUseFormValidationReturnTypes<TFormStateTypes> => {
  type TFormState = { [P in keyof TFormStateTypes]?: string };
  type TValidationState = IValidationState<TFormState>;

  const defaultValidationState = useMemo<TValidationState>(
    () => ({ hasError: false, errorData: {} }),
    []
  );

  const [errorState, setErrorState] = useState<TValidationState>(
    defaultValidationState
  );
  const [performLiveValidation, setPerformLiveValidation] = useState(
    initialPerformLiveValidation
  );

  const schemaFieldsLength = Object.keys(currentFormSchema.shape).length;

  const validateForm = useCallback((): boolean => {
    const zodValidationResult = currentFormSchema.safeParse(currentFormState);

    if (zodValidationResult.success) {
      setErrorState(defaultValidationState);
      setPerformLiveValidation(true); // We still need to validate this as the user can edit at any time
      return true;
    }

    const errors = Object.fromEntries(
      zodValidationResult.error.issues.map(({ path, message }) => [
        path.at(0) ?? "",
        message,
      ])
    );

    setErrorState({
      hasError: true,
      errorData: errors as { [P in keyof TFormState]?: string },
    });

    // This should allow live validation for the user after the initial explicit 'click' for validation
    if (!performLiveValidation) {
      setPerformLiveValidation(true);
    }

    return false;
  }, [
    currentFormSchema,
    currentFormState,
    performLiveValidation,
    defaultValidationState,
  ]);

  const getIsFormDataValid = (): boolean => validateForm();

  // After the initial explicit click by the user for form     validation, we can perform live validation to give instant feedback to the user
  useEffect(() => {
    if (performLiveValidation) {
      validateForm();
    }
  }, [
    currentFormState,
    schemaFieldsLength,
    performLiveValidation,
    validateForm,
  ]);

  // NOTE: empty fields '' will pass a check for string fields, so we need to check for a minimum of 1 character, etc.
  const allFieldsHaveValues = Object.values(currentFormState).every(
    (value) => value !== null || ""
  );

  return { allFieldsHaveValues, getIsFormDataValid, errorState };
};
