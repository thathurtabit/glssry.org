import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { PostEntryForm } from "~/components/organisms/post-entry-form/post-entry-form";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";

export const EditPost: FC = () => (
  <AccountPageWrapper>
    <SharedHead title="Edit Post" />
    <PageStructure title="Edit post" width="full">
      <PostEntryForm mode="edit" />
    </PageStructure>
  </AccountPageWrapper>
);

export default EditPost;
