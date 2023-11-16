import type { FC } from "react";
import type { IModalData } from "~/context/types/state/page-state.types";
import { useContext } from "react";
import { ModalHub } from "./modal-hub";
import { GlssryDispatchContext } from "~/context/context/context";
import { setModal } from "~/context/actions/page/page.actions";
import { Button } from "~/components/atoms/button/button";

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
