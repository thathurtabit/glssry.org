import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { CategoryRowsLinks } from "~/components/molecules/category-rows-links/category-rows-links";
import { Intro } from "~/components/molecules/intro/intro";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { PostShort } from "~/components/molecules/post-short/post-short";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadLatestPosts } from "~/hooks/post/read-latest-posts.hook";
import { useReadRandomCategoryPostCount } from "~/hooks/post/read-random-category-post-count";
import { useReadRandomPost } from "~/hooks/post/read-random-post.hook";
import { appDescription, appStrapline, appTitle } from "~/settings/constants";

export default function Home() {
  const { latestPostsData, latestPostsDataIsFetching } = useReadLatestPosts();
  const { randomPostData, randomPostDataIsFetching } = useReadRandomPost();
  const { randomCategoryPostCountData, randomCategoryPostCountIsFetching } =
    useReadRandomCategoryPostCount({});
  return (
    <>
      <SharedHead
        title={`${appTitle}.org - ${appStrapline}`}
        description={appDescription}
      />
      <PageMain justifyContent="start">
        <PageMainIndent className="w-full max-w">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-24 w-full justify-center items-center">
            <Intro />
            <PostShort
              isLoading={randomPostDataIsFetching}
              postData={randomPostData}
              className="md:max-w-md"
            />
            <div className="flex flex-col items-start mb-10 md:mb-0 md:justify-self-end md:max-w-md w-full">
              <SectionSubtitle className="mb-0">
                Random categories
              </SectionSubtitle>
              <CategoryRowsLinks
                isLoading={randomCategoryPostCountIsFetching}
                categoryData={randomCategoryPostCountData}
                itemsCount={10}
              />
            </div>
            <div className="md:max-w-md">
              <SectionSubtitle className="mb-0">Latest posts</SectionSubtitle>
              <PostRowsLinks
                isLoading={latestPostsDataIsFetching}
                postsData={latestPostsData}
                itemsCount={10}
              />
            </div>
          </section>
        </PageMainIndent>
      </PageMain>
    </>
  );
}
