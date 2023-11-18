import type { FC } from "react";
import type { IFormInput } from "./form-input.types";
import { Fragment } from "react";
import { Button } from "../button/button";

export const minInputWidth = "w-32";
export const maxInputWidth = "w-60";
export const inputSizeWrapperDefaultClasses = "text-base";
export const inputSizeWrapperSmallClasses = "text-sm";
export const inputSizeDefaultClasses = "rounded-md p-3";
export const inputSizeSmallClasses = "rounded-sm p-1";

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
  isTypeaheadOpen = false,
  Icon,
  inputSize = "default",
  ...inputProperties
}) => {
  const errorMessageClasses = "mt-1 mb-0 inline py-1 text-xs font-medium text-error";
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
          className={`border-0 ${
            inputSize === "small"
              ? inputSizeSmallClasses
              : inputSizeDefaultClasses
          } shadow-inner ${prefix && "rounded-l-none"} ${
            hasError && "rounded-l-none border-l-4 border-error"
          } ${isTypeaheadOpen && "rounded-bl-none rounded-br-none"} ${
            submitButtonData ? "rounded-br-none rounded-tr-none" : ""
          } ${
            inverse ? "bg-black text-copy" : "bg-off-white text-copy-inverse"
          } ${width === "small" ? minInputWidth : maxInputWidth}`}
        />
        {submitButtonData && (
          <Button
            className={`rounded-bl-none rounded-tl-none ${submitButtonData.className}`}
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
