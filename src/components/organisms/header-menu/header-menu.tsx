import type { FC } from "react";
import FocusTrap from "focus-trap-react";
import React, { Fragment, useContext } from "react";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { EURLS } from "~/settings/constants";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { SignInOrOutButton } from "~/components/atoms/sign-in-button/sign-in-button";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";
import { HorizontalRule } from "~/components/atoms/horizontal-rule/horizontal-rule";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { useReadAllPendingPosts } from "~/hooks/post/read-all-pending-posts.hook";
import { BadgeCount } from "~/components/atoms/badge-count/badge-count";
import { setCloseModal } from "~/context/actions/page/page.actions";
import { IconCancel } from "~/components/icons/cancel/cancel";
import { IconMenu } from "~/components/icons/menu/menu";

export const HeaderMenu: FC = () => {
  const { page } = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const isEditor = useIsEditor();
  const { pendingPostsData } = useReadAllPendingPosts();
  const { isMenuOpen } = page;
  const menuStyles = isMenuOpen
    ? "w-full md:w-1/3 md:max-w-[300px] p-10"
    : "w-0";

  const pendingPostsCount = pendingPostsData?.length;

  const handleMenuClose = () => {
    dispatch(setCloseModal());
  };

  return (
    <nav
      className={`bg-copy fixed right-0 top-0 bottom-0 text-copy-inverse transition-all z-[100] ${menuStyles}`}
    >
      {isMenuOpen ? (
        <FocusTrap>
          <div className="flex flex-col h-full">
            <button
              type="button"
              className="absolute top-5 right-5 hover:bg-copy-dark rounded-full p-1 transition-colors"
              title="Close menu"
              onClick={handleMenuClose}
            >
              <IconCancel size={20} />
            </button>
            <SectionSubtitle>
              <IconMenu title="Menu" onClick={handleMenuClose} />
            </SectionSubtitle>
            <ul className="flex flex-col gap-2">
              <LinkText inverse href={EURLS.Home}>
                Home
              </LinkText>
              <LinkText inverse href={EURLS.CreatePost}>
                Create
              </LinkText>
              <LinkText inverse href={EURLS.SetUsername}>
                Username
              </LinkText>
            </ul>
            {isEditor ? (
              <Fragment>
                <HorizontalRule />
                <ul className="flex flex-col gap-2 mb-auto">
                  <LinkText
                    inverse
                    href={EURLS.PostPending}
                    className="relative"
                  >
                    Pending Posts{" "}
                    {pendingPostsCount ? (
                      <BadgeCount
                        count={pendingPostsCount}
                        className="absolute right-0"
                      />
                    ) : null}
                  </LinkText>
                  <LinkText inverse href={EURLS.EditPost}>
                    Edit
                  </LinkText>
                </ul>
              </Fragment>
            ) : null}
            <SignInOrOutButton allowSignOut />
          </div>
        </FocusTrap>
      ) : null}
    </nav>
  );
};
