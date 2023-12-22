import { HorizontalRule } from "~/components/atoms/hr/hr";
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
        <p className="text-copy">{appDescription}</p>
        <HorizontalRule />
        <h2 className="font-sub-heading">Latest posts</h2>
        <PostRowsLinks
          isLoading={latestPostsDataIsFetching}
          postsData={latestPostsData}
        />
      </PageMain>
    </>
  );
}
