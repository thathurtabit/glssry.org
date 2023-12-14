import type { FC } from "react";
import FocusTrap from "focus-trap-react";
import Link from "next/link";
import React, { useContext } from "react";

import { GlssryStateContext } from "~/context/context/context";
import { EURLS } from "~/settings/constants";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { SignInOrOutButton } from "~/components/atoms/sign-in-button/sign-in-button";

export const HeaderMenu: FC = () => {
  const { page } = useContext(GlssryStateContext);
  const { isMenuOpen } = page;
  const menuStyles = isMenuOpen ? "w-1/3 max-w-[300px] p-10" : "w-0";

  return (
    <nav
      className={`bg-copy fixed right-0 top-0 bottom-0 text-copy-inverse transition-all z-50 ${menuStyles}`}
    >
      {isMenuOpen ? (
        <FocusTrap>
          <div className="flex flex-col h-full">
            <SectionSubtitle>Menu</SectionSubtitle>
            <ul className="flex flex-col gap-2 mb-auto">
              <Link href={EURLS.Home}>Home</Link>
              <Link href={EURLS.CreatePost}>Create</Link>
              <Link href={EURLS.EditPost}>Edit</Link>
            </ul>
            <SignInOrOutButton allowSignOut />
          </div>
        </FocusTrap>
      ) : null}
    </nav>
  );
};
