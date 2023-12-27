import type { IModalData } from "~/context/types/state/page-state.types";
import { Fragment } from "react";
import { IconPlus } from "~/components/icons/plus/plus";
import { EURLS, appTitle } from "~/settings/constants";

export const contributeModalData: IModalData = {
  title: "Contribute",
  type: "small",
  content: (
    <Fragment>
      <p>
        Want to contribute to <strong>{appTitle}</strong>? You can!
      </p>
      <p>
        You just need an account (it only takes a few seconds to sign up) then
        you&apos;re free to post!
      </p>
    </Fragment>
  ),
  footer: {
    confirm: {
      text: "Contribute",
      href: EURLS.CreatePost,
      icon: <IconPlus />,
    },
  },
};
