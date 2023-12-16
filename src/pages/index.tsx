import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { useReadLatestPosts } from "~/hooks/post/read-latest-posts.hook";
import { appDescription, appTitle } from "~/settings/constants";

export default function Home() {
  const { latestPostsData, latestPostsDataIsFetching } = useReadLatestPosts();
  return (
    <>
      <SharedHead title={`Welcome to ${appTitle}`} />
      <main className=" flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-heading tracking-tight text-white sm:text-[5rem]">
            {appTitle}
          </h1>
          <p className="text-copy">{appDescription}</p>
          <PostRowsLinks
            isLoading={latestPostsDataIsFetching}
            postsData={latestPostsData}
          />
        </div>
      </main>
    </>
  );
}
