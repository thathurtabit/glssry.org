import { type NextPage } from "next";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { AccountPageWrapper } from "~/components/organisms/account-page-wrapper/account-page-wrapper";

const Deauthorised: NextPage = () => (
  <AccountPageWrapper>
    <PageStructure title="Deauthorised" width="narrow">
      <p className="text-copy">
        Hey, well, I guess it&apos;s not you, it&apos;s us. You&apos;ve chosen
        to de-authorise your account, and we&apos;ve taken this very
        personally. 😭
      </p>
    </PageStructure>
  </AccountPageWrapper>
);

export default Deauthorised;
