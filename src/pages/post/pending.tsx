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

export const ListPendingPosts: FC = () => {
  const { pendingPostsData, pendingPostsDataIsFetching } =
    useReadAllPendingPosts();
  const isEditor = useIsEditor();
  const dispatch = useContext(GlssryDispatchContext);

  const handleViewPost = (postData: NonNullable<TTRPCReadPost>) => {
    dispatch(
      setModal({
        title: postData.title,
        type: "medium",
        content: <Post {...postData} />,
        footer: {
          confirm: {
            text: "Approve",
            onClick() {
              console.log("Approve");
            },
          },
          cancel: {
            text: "Edit",
            icon: <IconEdit />,
            onClick() {
              console.log("Edit");
            },
          },
        },
      })
    );
  };

  return (
    <AccountPageWrapper>
      <SharedHead title="Pending Posts" />
      <PageStructure title="Pending posts" width="full" justifyContent="start">
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