import type { FC } from "react";
import React, { useContext } from "react";
import { Button } from "~/components/atoms/button/button";
import { HorizontalRule } from "~/components/atoms/horizontal-rule/horizontal-rule";
import { IconInfo } from "~/components/icons/info/info";
import { IconPlus } from "~/components/icons/plus/plus";
import { setModal } from "~/context/actions/page/page.actions";
import { GlssryDispatchContext } from "~/context/context/context";
import { contributeModalData } from "~/data/modals/contribute.data";
import { postRowNoItemsStyles } from "~/styles/shared";

export const NoPostFound: FC = () => {
  const dispatch = useContext(GlssryDispatchContext);

  const handleContributeClick = () => {
    dispatch(setModal(contributeModalData));
  };

  return (
    <section className="flex-col gap-4 inline-flex">
      <p className={postRowNoItemsStyles}>
        <IconInfo /> No posts found
      </p>
      <HorizontalRule />
      <Button size="small" onClick={handleContributeClick}>
        Create a post <IconPlus size={20} />
      </Button>
    </section>
  );
};
