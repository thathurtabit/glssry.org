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
import { tagKeys, type TNativeTag } from "~/schemas/post/post.schema";
import { appRouter } from "~/server/api/root";
import { database } from "~/server/database";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { getPascalCaseFromKebabCase } from "~/utils/get-pascal-case-from-kebab-case";

export default function PostViewPage({
  slug,
  category,
  categoryPostsData,
  postData,
  randomisedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isCategoryPage = Boolean(category) && !slug;
  const pascalCaseCategory = getPascalCaseFromKebabCase(category ?? "", " ");

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
            <PostRowsLinks postsData={categoryPostsData ?? undefined} />
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
        <Post
          postData={postData!}
          randomisedPosts={randomisedPosts ?? undefined}
        />
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
  let categoryPostsData;

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
    categoryPostsData = await helpers.post.readAllPostsInCategory.fetch({
      category: getPascalCaseFromKebabCase(fileUnder) as TNativeTag,
    });
  }
  // Next requires that props returned from getStaticProps are JSON-serializable
  // (no `Date` objects, `undefined`, etc.). Convert possible Dates to ISO
  // strings by serializing via JSON.stringify/parse. We keep `null` for absent
  // values.
  const serialize = <T,>(v: T | undefined | null): T | null =>
    v == null ? null : (JSON.parse(JSON.stringify(v)) as T);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug: uniqueSlug ?? "", // fallback to empty string instead of undefined
      category: fileUnder,
      categoryPostsData: serialize(categoryPostsData),
      postData: serialize(postData),
      randomisedPosts: serialize(randomisedPosts),
    },
    revalidate: 1,
  };
}
