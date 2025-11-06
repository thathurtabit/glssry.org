import type { FC, MouseEvent } from "react";
import React, { useContext, useId } from "react";

import { IconShare } from "~/components/icons/share/share";

import { setNewNotification } from "~/context/actions/notifications/notifications.actions";
import { GlssryDispatchContext } from "~/context/context/context";

import type { IShare } from "./share.types";
import { Button } from "../button/button";

export const Share: FC<IShare> = ({ title, text, onInteraction }) => {
  const successUUID = useId();
  const errorUUID = useId();
  const dispatch = useContext(GlssryDispatchContext);

  const handleShare = async (event: MouseEvent<HTMLButtonElement>) => {
    const currentHref = globalThis.location.href;
    const shareData: ShareData = {
      title,
      text,
      url: currentHref,
    };

    onInteraction?.(event);
    if (navigator?.share) {
      try {
        await navigator.share(shareData);
        dispatch(
          setNewNotification({
            uuid: successUUID,
            title: "Post shared",
            type: "success",
            message: `"${title}" was shared successfully`,
          })
        );
      } catch (error) {
        setNewNotification({
          uuid: errorUUID,
          title: "Failed to share",
          type: "success",
          message: `"${title}" was not shared due to an error`,
        });

         
        console.error(error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentHref);
        dispatch(
          setNewNotification({
            uuid: successUUID,
            title: "Link copied",
            type: "success",
            message: `"${title}" link was copied successfully`,
          })
        );
      } catch (error) {
        setNewNotification({
          uuid: errorUUID,
          title: "Failed to copy link",
          type: "success",
          message: `"${title}" link was not copied due to an error`,
        });

         
        console.error(error);
      }
    }
  };

  return (
    <Button
      variant="secondary"
      title={`Share "${title}"`}
      onClick={handleShare}
    >
      <IconShare />
    </Button>
  );
};
