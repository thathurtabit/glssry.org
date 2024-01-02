import type { ChangeEvent, FC } from "react";

import React, { Fragment, useState } from "react";

import { summaryMaxCharacterCount } from "~/settings/constants";
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

import type { IFormTextarea } from "./form-textarea.types";
import { ModalInfoButton } from "../modal-info-button/modal-info-button";

export const minInputWidth = "w-48";
export const maxInputWidth = "w-96";

export const FormTextarea: FC<IFormTextarea> = ({
  id,
  label,
  description,
  hasError,
  errorText,
  width = "full",
  inverse,
  inputSize = "default",
  rows = 10,
  maxCharacterCount = summaryMaxCharacterCount,
  required,
  modalData,
  ...inputProperties
}) => {
  const {
    value: valueFromProperties,
    onChange,
    ...otherInputProperties
  } = inputProperties;
  const value = valueFromProperties ? String(valueFromProperties) : "";

  const [characterCount, setCharacterCount] = useState<number>(
    value?.length ?? 0
  );
  const inputSizeClasses = getSizeClasses(inputSize);
  const isCharacterCountExceedingMaxCount = characterCount > maxCharacterCount;
  const hasTextAreaError = isCharacterCountExceedingMaxCount || hasError;
  const inputCoreClasses = getInputCoreClasses(inverse, hasTextAreaError);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    const characterCount = [...value].length;
    setCharacterCount(characterCount);

    if (onChange) {
      onChange(event);
    }
  };

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
        <textarea
          id={id}
          rows={rows}
          className={`shadow-inner ${inputSizeClasses} ${inputCoreClasses}
          } ${width === "small" ? minInputWidth : maxInputWidth}`}
          value={value}
          onChange={handleOnChange}
          {...otherInputProperties}
        />
      </div>
      <p
        className={`inline my-3 text-xs max-w-sm ${
          isCharacterCountExceedingMaxCount ? "text-error" : ""
        }`}
      >
        Character count: {characterCount}/{maxCharacterCount}
      </p>
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
