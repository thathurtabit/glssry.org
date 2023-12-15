import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { PostEntryForm } from "~/components/organisms/post-entry-form/post-entry-form";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useURLHash } from "~/hooks/page/use-url-hash.hook";
import { useReadPost } from "~/hooks/post/read-post.hook";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { getPostFormatFromTRPC } from "~/utils/get-post-format-from-trpc";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";

export const EditPost: FC = () => {
  const hash = useURLHash();

  const { postData, postDataIsFetching, postDataHasError } = useReadPost({
    id: hash ?? "",
  });

  const postDataFromTRPC = postData ? getPostFormatFromTRPC(postData) : null;

  return (
    <AccountPageWrapper>
      <SharedHead title="Edit Post" />
      <PageStructure title="Edit post" width="full">
        {postDataIsFetching ? <LoadingSpinner /> : null}
        {postDataHasError ? (
          <InfoPanel title="Post not found" type="info" />
        ) : null}
        {postData ? (
          <PostEntryForm
            mode="edit"
            postData={postDataFromTRPC}
            postId={hash ?? undefined}
          />
        ) : null}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default EditPost;
