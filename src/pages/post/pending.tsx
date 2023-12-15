import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { EURLS } from "~/settings/constants";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { useReadAllPendingPosts } from "~/hooks/post/read-all-pending-posts.hook";
import { IconInfo } from "~/components/icons/info/info";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";

export const ListPendingPosts: FC = () => {
  const { pendingPostsData, pendingPostsDataIsFetching } =
    useReadAllPendingPosts();
  const isEditor = useIsEditor();
  return (
    <AccountPageWrapper>
      <SharedHead title="Pending Posts" />
      <PageStructure title="Pending posts" width="full" justifyContent="start">
        {pendingPostsData?.length ? (
          <ul>
            {pendingPostsData.map(({ id, title }) => (
              <li key={id} className="mb-4">
                <LinkText href={`${EURLS.EditPost}#${id}`}>{title}</LinkText>
              </li>
            ))}
          </ul>
        ) : pendingPostsDataIsFetching ? (
          <LoadingSpinner />
        ) : (
          <p className="flex gap-2 items-center">
            <IconInfo />{" "}
            {isEditor ? "No pending posts found" : "You are not an editor."}
          </p>
        )}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default ListPendingPosts;
