import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { Intro } from "~/components/molecules/intro/intro";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { PostShort } from "~/components/molecules/post-short/post-short";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadLatestPosts } from "~/hooks/post/read-latest-posts.hook";
import { useReadRandomPost } from "~/hooks/post/read-random-post.hook";
import { appDescription, appStrapline, appTitle } from "~/settings/constants";

export default function Home() {
  const { latestPostsData, latestPostsDataIsFetching } = useReadLatestPosts();
  const { randomPostData, randomPostDataIsFetching } = useReadRandomPost();
  return (
    <>
      <SharedHead
        title={`${appTitle}.org - ${appStrapline}`}
        description={appDescription}
      />
      <PageMain justifyContent="start">
        <Intro />
        <section className="flex flex-col md:flex-row gap-5 md:gap-10 w-full justify-center">
          <PostShort
            isLoading={randomPostDataIsFetching}
            postData={randomPostData}
            className="md:max-w-md"
          />
          <div className="md:max-w-md">
            <SectionSubtitle className="mb-0">Latest posts</SectionSubtitle>
            <PostRowsLinks
              isLoading={latestPostsDataIsFetching}
              postsData={latestPostsData}
            />
          </div>
        </section>
      </PageMain>
    </>
  );
}
