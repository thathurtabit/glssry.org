import Link from "next/link";
import { useContext, type FC } from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconAccount } from "~/components/icons/account/account";
import { IconMenu } from "~/components/icons/menu/menu";
import { setMenuOpen } from "~/context/actions/page/page.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { EURLS, appTitle } from "~/settings/constants";
import { HeaderMenu } from "../header-menu/header-menu";

export const HeaderStrip: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useContext(GlssryDispatchContext);
  const { page } = useContext(GlssryStateContext);
  const { isMenuOpen } = page;
  const handleMenuToggle = () => {
    dispatch(setMenuOpen(!isMenuOpen));
  };

  const sharedButtonClasses = "p-1 rounded-full transition-colors";
  const hoverClasses = "hover:bg-copy-light/10";

  return (
    <section className="fixed top-0 bg-background left-0 right-0 flex justify-between py-3 px-5 text-white items-center border-b-[1px] border-white/10 z-40">
      <LinkText href={EURLS.Home} className="font-heading text-lg">
        {appTitle}
      </LinkText>
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
      <HeaderMenu />
    </section>
  );
};
