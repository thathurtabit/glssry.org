import type { FC } from "react";
import React, { useContext } from "react";

import { IconInfo } from "~/components/icons/info/info";
import { setModal } from "~/context/actions/page/page.actions";
import { GlssryDispatchContext } from "~/context/context/context";

import type { IModalInfoButton } from "./modal-info-button.types";

export const ModalInfoButton: FC<IModalInfoButton> = ({
  modalData,
  className,
}) => {
  const dispatch = useContext(GlssryDispatchContext);

  if (!modalData) {
    return null;
  }

  const handleModalInfoClick = () => {
    dispatch(setModal(modalData));
  };

  return (
    <button type="button" className={className} onClick={handleModalInfoClick}>
      <IconInfo />
    </button>
  );
};
