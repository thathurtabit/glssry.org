import { useContext, type FC } from "react";

import Link from "next/link";

import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconAccount } from "~/components/icons/account/account";
import { IconMenu } from "~/components/icons/menu/menu";
import { IconPlus } from "~/components/icons/plus/plus";
import { setMenuOpen, setModal } from "~/context/actions/page/page.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { contributeModalData } from "~/data/modals/contribute.data";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { useReadAllPendingPosts } from "~/hooks/post/read-all-pending-posts.hook";
import { EURLS, appTitle } from "~/settings/constants";

import { HeaderMenu } from "../header-menu/header-menu";
import { OmniSearch } from "../omni-search/omni-search";

export const HeaderStrip: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useContext(GlssryDispatchContext);
  const { page } = useContext(GlssryStateContext);
  const { pendingPostsData } = useReadAllPendingPosts();
  const { isMenuOpen } = page;
  const handleMenuToggle = () => {
    dispatch(setMenuOpen(!isMenuOpen));
  };

  const sharedButtonClasses = "p-1 rounded-full transition-colors";
  const hoverClasses = "hover:bg-copy-light/10";

  const handleContributeClick = () => {
    dispatch(setModal(contributeModalData));
  };

  const pendingPostsCount = pendingPostsData?.length;

  return (
    <section className="fixed top-0 bg-background left-0 right-0 flex justify-between h-header px-5 text-white items-center border-b border-divider z-40">
      <LinkText href={EURLS.Home} className="font-heading text-lg">
        {appTitle}
      </LinkText>
      <OmniSearch />
      <div className="flex gap-5">
        {pendingPostsCount ? (
          <Link
            href={EURLS.PostPending}
            title={`${pendingPostsCount} pending posts`}
            className={`${hoverClasses} ${sharedButtonClasses} w-7 h-7 flex items-center justify-center`}
          >
            <span className="text-sm">{pendingPostsCount}</span>
          </Link>
        ) : null}
        <button
          type="button"
          title="Contribute"
          className={`${hoverClasses} ${sharedButtonClasses}`}
          onClick={handleContributeClick}
        >
          <IconPlus size={20} />
        </button>
        {isAuthenticated ? (
          <button
            type="button"
            title="Toggle menu"
            className={`${hoverClasses} ${sharedButtonClasses}`}
            onClick={handleMenuToggle}
          >
            <IconMenu size={20} />
          </button>
        ) : (
          <Link
            title="Sign in"
            href={EURLS.SignIn}
            className={`${hoverClasses} ${sharedButtonClasses}`}
          >
            <IconAccount size={20} />
          </Link>
        )}
      </div>
      <HeaderMenu />
    </section>
  );
};
