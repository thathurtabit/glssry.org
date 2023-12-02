import type { FC } from "react";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { PostEntryForm } from "~/components/organisms/post-entry-form/post-entry-form";

export const CreatePost: FC = () => (
  <AccountPageWrapper>
    <PageStructure title="Create post" width="narrow">
      <PostEntryForm mode="create" />
    </PageStructure>
  </AccountPageWrapper>
);

export default CreatePost;
