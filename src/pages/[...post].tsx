import { Fragment } from "react";

import type { TagName } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import superjson from "superjson";

import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { NoPostFound } from "~/components/molecules/no-post-found/no-post-found";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { Post } from "~/components/molecules/post/post";

import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";

import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { useReadAllPostsInCategory } from "~/hooks/post/read-all-posts-in-category.hook";
import { tagKeys, type TNativeTag } from "~/schemas/post/post.schema";
import { appRouter } from "~/server/api/root";
import { database } from "~/server/database";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getPascalCaseFromKebabCase } from "~/utils/get-pascal-case-from-kebab-case";
import { getPascalCaseWithUnderscores } from "~/utils/get-pascal-case-with-underscores";

export default function PostViewPage({
  slug,
  category,
  postData,
  randomisedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isCategoryPage = Boolean(category) && !slug;
  const pascalCaseCategory = getPascalCaseFromKebabCase(category ?? "", " ");
  const pascalCaseWithUnderscoreCategory =
    getPascalCaseWithUnderscores(pascalCaseCategory);

  const { categoryPostsData, categoryPostsDataIsFetching } =
    useReadAllPostsInCategory({
      category: pascalCaseWithUnderscoreCategory as TNativeTag,
    });

  // CATEGORY PAGE
  if (isCategoryPage && category) {
    return categoryPostsData ? (
      <Fragment>
        <SharedHead
          title={`Filed under: ${category}`}
          description={`These are the latest posted filed under ${category}.`}
        />
        <Breadcrumbs items={[category]} />
        <PageMain justifyContent="start">
          <PageMainIndent className="max-w-2xl">
            <SectionTitle>{pascalCaseCategory}</SectionTitle>
            <PostRowsLinks
              isLoading={categoryPostsDataIsFetching}
              postsData={categoryPostsData}
            />
          </PageMainIndent>
        </PageMain>
      </Fragment>
    ) : (
      <Fragment>
        <SharedHead
          title={`Filed under: ${category}`}
          description={`These are the latest posted filed under ${category}.`}
        />
        <Breadcrumbs items={[category]} />
        <PageMain justifyContent="start">
          <PageMainIndent className="max-w-2xl">
            <SectionTitle>{pascalCaseCategory}</SectionTitle>
            <NoPostFound />
          </PageMainIndent>
        </PageMain>
      </Fragment>
    );
  }

  const postDataLatestVersion = postData?.versions.at(-1);

  if (!postData || !postDataLatestVersion || !category) {
    return (
      <Fragment>
        <Breadcrumbs items={[slug]} />
        <PageMain justifyContent="center" className="items-start">
          <InfoPanel title="Post not found" type="info" />
        </PageMain>
      </Fragment>
    );
  }

  const { title, body } = postDataLatestVersion;

  return (
    <Fragment>
      <SharedHead title={title} description={body} />
      <Breadcrumbs items={[category, slug]} />
      <PageMain justifyContent="center" className="items-start">
        <Post postData={postData} randomisedPosts={randomisedPosts} />
      </PageMain>
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await database.post.findMany({
    select: {
      id: true,
      slug: true,
      versions: {
        select: {
          fileUnder: true,
          slug: true,
          published: true,
        },
        take: 1,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          published: true,
        },
      },
    },
  });

  const publishedPostsOnly = posts.filter(({ versions }) => {
    const latestVersion = versions.at(-1);
    return Boolean(latestVersion?.published);
  });

  return {
    paths: publishedPostsOnly.map(({ slug, versions }) => {
      const { fileUnder } = versions.at(0) ?? {};

      return {
        params: {
          post: [
            getKebabCaseFromSentenceCase(fileUnder ?? ""),
            getKebabCaseFromSentenceCase(slug ?? ""),
          ],
        },
      };
    }),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ post: string[] }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      db: database,
    },
    transformer: superjson, // Optional - adds superjson serialization
  });

  const fileUnder = context.params?.post.at(0);
  const uniqueSlug = context.params?.post.at(1);

  let postData;
  let randomisedPosts;

  if (uniqueSlug) {
    postData = await helpers.post.readPost.fetch({ slug: uniqueSlug });

    randomisedPosts = await helpers.post.readRandomPosts.fetch({
      maxCount: 2,
    });
  }

  if (
    !uniqueSlug &&
    fileUnder &&
    tagKeys.includes(getPascalCaseFromKebabCase(fileUnder) as TagName)
  ) {
    await helpers.post.readAllPostsInCategory.prefetch({
      category: getPascalCaseFromKebabCase(fileUnder) as TNativeTag,
    });
  }

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug: uniqueSlug ?? "", // We can fallback to "" since 'undefined' is not allowed and is still falsy
      category: fileUnder,
      postData,
      randomisedPosts,
    },
    revalidate: 1,
  };
}
