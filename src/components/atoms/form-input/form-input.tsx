import type { FC } from "react";
import type { IFormInput } from "./form-input.types";
import { Fragment } from "react";
import { Button } from "../button/button";
import {
  errorMessageClasses,
  getInputCoreClasses,
  getSizeClasses,
  inputDescriptionClasses,
  inputLabelClasses,
  inputSizeWrapperDefaultClasses,
  inputSizeWrapperSmallClasses,
  inputWrapperClasses,
} from "~/styles/shared";
import { ModalInfoButton } from "../modal-info-button/modal-info-button";

export const minInputWidth = "w-48";
export const maxInputWidth = "w-72";

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
  required,
  modalData,
  ...inputProperties
}) => {
  const inputSizeClasses = getSizeClasses(inputSize);
  const inputCoreClasses = getInputCoreClasses(inverse, hasError);

  return (
    <div
      className={`${
        inputSize === "small"
          ? inputSizeWrapperSmallClasses
          : inputSizeWrapperDefaultClasses
      } ${inputWrapperClasses}`}
    >
      <label
        htmlFor={id}
        className={`${description ? "" : "mb-1"} ${
          inverse ? "text-copy-inverse" : ""
        } ${inputLabelClasses}`}
      >
        {label} {required && <span className="text-error">*</span>}{" "}
        <ModalInfoButton modalData={modalData} />
      </label>
      {description && (
        <p className={inputDescriptionClasses}>
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
          className={`shadow-inner ${inputSizeClasses} ${
            prefix ? "rounded-l-none" : ""
          } ${inputCoreClasses} ${
            isTypeAheadOpen ? "rounded-bl-none rounded-br-none" : ""
          } ${submitButtonData ? "rounded-br-none rounded-tr-none" : ""} ${
            width === "small" ? minInputWidth : maxInputWidth
          }`}
          {...inputProperties}
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
