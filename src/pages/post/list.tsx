import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadAllPosts } from "~/hooks/post/read-all-posts.hook";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { EURLS } from "~/settings/constants";
import { LinkText } from "~/components/atoms/link-text/link-text";

export const ListAllPosts: FC = () => {
  const { postsData, postsDataIsFetching } = useReadAllPosts();
  return (
    <AccountPageWrapper>
      <SharedHead title="List All Posts" />
      <PageStructure title="List all posts" width="full" justifyContent="start">
        {postsDataIsFetching ? <LoadingSpinner /> : null}
        {postsData ? (
          <ul>
            {postsData.map(({ id, slug, title }) => (
              <li key={id} className="mb-4">
                <LinkText href={`${EURLS.EditPost}#${slug}`}>{title}</LinkText>
              </li>
            ))}
          </ul>
        ) : null}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default ListAllPosts;
