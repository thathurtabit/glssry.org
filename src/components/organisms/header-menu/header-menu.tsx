import type { FC } from "react";
import FocusTrap from "focus-trap-react";
import React, { Fragment, useContext } from "react";
import { GlssryStateContext } from "~/context/context/context";
import { EURLS } from "~/settings/constants";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { SignInOrOutButton } from "~/components/atoms/sign-in-button/sign-in-button";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";
import { HorizontalRule } from "~/components/atoms/hr/hr";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { useReadAllPendingPosts } from "~/hooks/post/read-all-pending-posts.hook";
import { BadgeCount } from "~/components/atoms/badge-count/badge-count";

export const HeaderMenu: FC = () => {
  const { page } = useContext(GlssryStateContext);
  const isEditor = useIsEditor();
  const { pendingPostsData } = useReadAllPendingPosts();
  const { isMenuOpen } = page;
  const menuStyles = isMenuOpen ? "w-1/3 max-w-[300px] p-10" : "w-0";

  const pendingPostsCount = pendingPostsData?.length;

  return (
    <nav
      className={`bg-copy fixed right-0 top-0 bottom-0 text-copy-inverse transition-all z-50 ${menuStyles}`}
    >
      {isMenuOpen ? (
        <FocusTrap>
          <div className="flex flex-col h-full">
            <SectionSubtitle>Menu</SectionSubtitle>
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
