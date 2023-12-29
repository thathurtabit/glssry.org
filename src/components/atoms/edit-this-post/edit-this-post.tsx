import type { FC } from "react";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";
import { LinkText } from "../link-text/link-text";
import { IconEdit } from "~/components/icons/edit/edit";
import { EURLS } from "~/settings/constants";
import { usePathname } from "next/navigation";

export const EditThisPost: FC = () => {
  const isEditor = useIsEditor();
  const pathname = usePathname();

  if (!isEditor) {
    return null;
  }

  const splitPathname = pathname.split("/");
  const slug = splitPathname.at(-1);

  return (
    <section className="border-t-[1px] border-divider py-3 my-5">
      <LinkText href={`${EURLS.EditPost}#${slug}`} className="text-sm">
        Edit this post <IconEdit size={15} />
      </LinkText>
    </section>
  );
};
