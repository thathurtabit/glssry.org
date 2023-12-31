import type { FC } from "react";

import { Fragment } from "react";

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

import type { IFormSelect } from "./form-select.types";
import { ModalInfoButton } from "../modal-info-button/modal-info-button";

export const minInputWidth = "w-48";
export const maxInputWidth = "w-72";

export const FormSelect: FC<IFormSelect> = ({
  id,
  label,
  description,
  hasError,
  errorText,
  width = "full",
  prefix,
  inverse,
  inputSize = "default",
  optionList,
  required,
  modalData,
  ...selectProperties
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
        {label} {required && <span className="text-error">*</span>}
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
        <select
          id={id}
          className={`shadow-inner ${inputSizeClasses} ${
            prefix ? "rounded-l-none" : ""
          } ${inputCoreClasses} ${
            width === "small" ? minInputWidth : maxInputWidth
          }`}
          {...selectProperties}
        >
          {optionList.map((tag, index) => {
            const isFirstOption = index === 0;
            return (
              <option
                key={tag}
                disabled={isFirstOption}
                value={isFirstOption ? "" : tag}
              >
                {tag}
              </option>
            );
          })}
        </select>
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
