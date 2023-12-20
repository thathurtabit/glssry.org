import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { tagKeys, type TNativeTag } from "~/schemas/post/post.schema";
import { Fragment } from "react";
import superjson from "superjson";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { Post } from "~/components/molecules/post/post";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { api } from "~/utils/api";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { getPascalCaseFromKebabCase } from "~/utils/get-pascal-case-from-kebab-case";
import { PageMain } from "~/components/molecules/page-main/page-main";
import type { TagName } from "@prisma/client";

export default function PostViewPage({
  slug,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isCategoryPage = Boolean(category) && !slug;
  const pascalCaseCategory = getPascalCaseFromKebabCase(category ?? "");

  const { data: postData, isFetching: postIsLoading } =
    api.post.readPost.useQuery(
      { slug: slug ?? "" },
      {
        enabled: Boolean(slug),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  const { data: categoryPostsData, isFetching: categoryPostsAreLoading } =
    api.post.readAllPostsInCategory.useQuery(
      { category: pascalCaseCategory as TNativeTag },
      {
        enabled: isCategoryPage,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  if (postIsLoading) {
    // Won't happen since we're using `fallback: "blocking"`
    return <LoadingSpinner />;
  }

  // CATEGORY PAGE
  if (isCategoryPage) {
    return categoryPostsData ? (
      <Fragment>
        <SharedHead
          title={`Filed under: ${category}`}
          description={`These are the latest posted filed under ${category}.`}
        />
        <PageMain justifyContent="start" className="container items-start">
          <SectionTitle>{pascalCaseCategory}</SectionTitle>
          <PostRowsLinks
            isLoading={categoryPostsAreLoading}
            postsData={categoryPostsData}
          />
        </PageMain>
      </Fragment>
    ) : (
      <InfoPanel
        title={`No posts filed under: "${pascalCaseCategory}"`}
        type="info"
      />
    );
  }

  const postDataLatestVersion = postData?.versions.at(-1);

  if (!postData || !postDataLatestVersion) {
    return <InfoPanel title="Post not found" type="info" />;
  }

  const { title, body } = postDataLatestVersion;

  return (
    <Fragment>
      <SharedHead title={title} description={body} />
      <article className="container">
        <Post {...postData} />
      </article>
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
      slug: true,
      versions: {
        select: {
          fileUnder: true,
          slug: true,
          relatedPostId1: true,
          relatedPostId2: true,
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
  return {
    paths: posts.map(({ slug, versions }) => {
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
      db,
    },
    transformer: superjson, // Optional - adds superjson serialization
  });

  const fileUnder = context.params?.post.at(0);
  const uniqueSlug = context.params?.post.at(1);

  if (uniqueSlug) {
    await helpers.post.readPost.prefetch({ slug: uniqueSlug });
  }

  if (!uniqueSlug && fileUnder) {
    if (tagKeys.includes(getPascalCaseFromKebabCase(fileUnder) as TagName)) {
      await helpers.post.readAllPostsInCategory.prefetch({
        category: getPascalCaseFromKebabCase(fileUnder) as TNativeTag,
      });
    }
  }

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug: uniqueSlug ?? "", // We can fallback to "" since 'undefined' is not allowed and is still falsy
      category: fileUnder,
    },
    revalidate: 1,
  };
}
