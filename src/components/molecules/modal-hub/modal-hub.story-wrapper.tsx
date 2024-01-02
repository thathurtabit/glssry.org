import type { FC } from "react";

import { useContext } from "react";

import { Button } from "~/components/atoms/button/button";
import { setModal } from "~/context/actions/page/page.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import type { IModalData } from "~/context/types/state/page-state.types";

import { ModalHub } from "./modal-hub";

export const ModalHubStoryWrapper: FC<IModalData> = ({ ...modalData }) => {
  const dispatch = useContext(GlssryDispatchContext);

  const handleToggleModal = () => {
    dispatch(setModal(modalData));
  };

  return (
    <>
      <Button onClick={handleToggleModal}>Toggle modal</Button>
      <ModalHub />
    </>
  );
};
