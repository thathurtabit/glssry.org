import type { FC } from "react";

import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { PostEntryForm } from "~/components/organisms/post-entry-form/post-entry-form";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";

export const CreatePost: FC = () => (
  <AccountPageWrapper>
    <SharedHead title="Create Post" />
    <PageStructure title="Create post" width="full" justifyContent="start">
      <PostEntryForm mode="create" />
    </PageStructure>
  </AccountPageWrapper>
);

export default CreatePost;
