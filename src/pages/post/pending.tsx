import type { TTRPCReadPost } from "~/types/prisma.types";
import { useContext, type FC, Fragment } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadAllPendingPosts } from "~/hooks/post/read-all-pending-posts.hook";
import { IconInfo } from "~/components/icons/info/info";
import { useIsEditor } from "~/hooks/auth/is-editor.hook";
import { GlssryDispatchContext } from "~/context/context/context";
import { setModal } from "~/context/actions/page/page.actions";
import { Post } from "~/components/molecules/post/post";
import { IconEdit } from "~/components/icons/edit/edit";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PostRowsButtons } from "~/components/molecules/post-rows-buttons/post-rows-buttons";
import { usePublishPost } from "~/hooks/post/publish-post.hook";

export const ListPendingPosts: FC = () => {
  const { pendingPostsData, pendingPostsDataIsFetching } =
    useReadAllPendingPosts();
  const isEditor = useIsEditor();
  const dispatch = useContext(GlssryDispatchContext);
  const { publishPostMutation, publishPostMutationIsLoading } =
    usePublishPost();

  const handleViewPost = (postData: NonNullable<TTRPCReadPost>) => {
    const lastVersion = postData.versions.at(-1);
    if (!lastVersion) {
      return;
    }

    const { id: postVersionId, slug } = lastVersion;
    dispatch(
      setModal({
        title: postData.title,
        type: "medium",
        content: <Post postData={postData} showRelatedPosts={false} />,
        footer: {
          confirm: {
            text: "Approve",
            loading: publishPostMutationIsLoading,
            onClick() {
              publishPostMutation({ postId: postVersionId });
            },
          },
          cancel: {
            text: "Edit",
            icon: <IconEdit />,
            href: `/post/edit#${slug}`,
          },
        },
      })
    );
  };

  return (
    <AccountPageWrapper>
      <SharedHead title="Pending Posts" />
      <PageStructure
        title="Pending posts"
        width="narrow"
        justifyContent="start"
      >
        {pendingPostsData?.length ? (
          <Fragment>
            <PageIntro textList={["Click on a post title to view details"]} />
            <PostRowsButtons
              isLoading={pendingPostsDataIsFetching}
              postsData={pendingPostsData}
              onClickCallback={handleViewPost}
            />
          </Fragment>
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
