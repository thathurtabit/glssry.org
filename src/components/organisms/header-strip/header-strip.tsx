import Link from "next/link";
import { useContext, type FC, Fragment } from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { IconAccount } from "~/components/icons/account/account";
import { IconMenu } from "~/components/icons/menu/menu";
import { setMenuOpen, setModal } from "~/context/actions/page/page.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { EURLS, appTitle } from "~/settings/constants";
import { HeaderMenu } from "../header-menu/header-menu";
import { OmniSearch } from "../omni-search/omni-search";
import { IconPlus } from "~/components/icons/plus/plus";

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

  const handleContributeClick = () => {
    dispatch(
      setModal({
        title: "Contribute",
        type: "small",
        content: (
          <Fragment>
            <p>
              Want to contribute to <strong>{appTitle}</strong>? You can!
            </p>
            <p>
              You just need an account (it only takes a few seconds to sign up)
              then you&apos;re free to post!
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
      })
    );
  };

  return (
    <section className="fixed top-0 bg-background left-0 right-0 flex justify-between h-header px-5 text-white items-center border-b-[1px] border-divider z-40">
      <LinkText href={EURLS.Home} className="font-heading text-lg">
        {appTitle}
      </LinkText>
      <OmniSearch />
      <div className="flex gap-5">
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
