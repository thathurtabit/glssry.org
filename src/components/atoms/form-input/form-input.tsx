import type { FC } from "react";
import type { IFormInput } from "./form-input.types";
import { Fragment } from "react";
import { Button } from "../button/button";

export const minInputWidth = "w-48";
export const maxInputWidth = "w-72";
export const inputSizeWrapperDefaultClasses = "text-base";
export const inputSizeWrapperSmallClasses = "text-sm";
export const inputSizeDefaultClasses = "rounded-xs p-3";
export const inputSizeSmallClasses = "rounded-xs p-1";

export const FormInput: FC<IFormInput> = ({
  id,
  label,
  description,
  hasError,
  errorText,
  width = "full",
  prefix,
  submitButtonData,
  inverse,
  isTypeAheadOpen = false,
  Icon,
  inputSize = "default",
  ...inputProperties
}) => {
  const errorMessageClasses =
    "mt-1 mb-0 inline py-1 text-xs font-medium text-error";

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return inputSizeSmallClasses;
      default:
        return inputSizeDefaultClasses;
    }
  };

  const getInputCoreClasses = (inverse = false, hasError: boolean) => {
    if (inverse) {
      return hasError
        ? "bg-background-inverse text-error border-l-4 border-l-error"
        : "bg-background-inverse text-copy-inverse-light border-l-2 border-background-light";
    }

    return hasError
      ? "bg-background-light text-error border-l-4 border-l-error"
      : "bg-background-light text-copy-dark border-l-2 border-background-inverse-dark";
  };

  const inputSizeClasses = getSizeClasses(inputSize);
  const inputCoreClasses = getInputCoreClasses(inverse, hasError);
  return (
    <div
      className={`${
        inputSize === "small"
          ? inputSizeWrapperSmallClasses
          : inputSizeWrapperDefaultClasses
      } mb-4 flex w-full flex-col`}
    >
      <label
        htmlFor={id}
        className={`${description ? "" : "mb-1"} font-medium ${
          inverse ? "text-copy-inverse" : ""
        }`}
      >
        {label}
      </label>
      {description && (
        <p className="line mb-3 max-w-sm">
          <small>{description}</small>
        </p>
      )}
      <div className="relative flex">
        {prefix && (
          <span className="bg-white/90 rounded-l-lg px-3.5 text-sm flex items-center text-copy-inverse font-semibold">
            {prefix}
          </span>
        )}
        <input
          id={id}
          {...inputProperties}
          className={`shadow-inner ${inputSizeClasses}  ${
            prefix ? "rounded-l-none" : ""
          } ${inputCoreClasses}
          } ${isTypeAheadOpen ? "rounded-bl-none rounded-br-none" : ""} ${
            submitButtonData ? "rounded-br-none rounded-tr-none" : ""
          } ${width === "small" ? minInputWidth : maxInputWidth}`}
        />
        {submitButtonData && (
          <Button
            className={`rounded-bl-none rounded-tl-none border-0 ${submitButtonData.className}`}
            type={submitButtonData.type ?? "submit"}
            {...submitButtonData}
          >
            {submitButtonData.children ?? "Submit"}
          </Button>
        )}
        {Icon && <Icon />}
      </div>
      {hasError &&
        (Array.isArray(errorText) ? (
          <Fragment>
            {[...new Set(errorText)].map((error) => (
              <p key={error} className={errorMessageClasses}>
                {error}
              </p>
            ))}
          </Fragment>
        ) : (
          <p className={errorMessageClasses}>{errorText}</p>
        ))}
    </div>
  );
};
