import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadLatestPosts } from "~/hooks/post/read-latest-posts.hook";
import { appDescription, appTitle } from "~/settings/constants";

export default function Home() {
  const { latestPostsData, latestPostsDataIsFetching } = useReadLatestPosts();
  return (
    <>
      <SharedHead title={`Welcome to ${appTitle}`} />
      <PageMain justifyContent="start">
        <PageMainIndent>
          <PageIntro textList={["Welcome", appDescription]} />
          <h2 className="font-sub-heading">Latest posts</h2>
          <PostRowsLinks
            isLoading={latestPostsDataIsFetching}
            postsData={latestPostsData}
          />
        </PageMainIndent>
      </PageMain>
    </>
  );
}
