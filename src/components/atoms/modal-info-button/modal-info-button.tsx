import type { FC } from "react";
import React, { useContext } from "react";
import type { IModalInfoButton } from "./modal-info-button.types";
import { IconInfo } from "~/components/icons/info/info";
import { GlssryDispatchContext } from "~/context/context/context";
import { setModal } from "~/context/actions/page/page.actions";

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
