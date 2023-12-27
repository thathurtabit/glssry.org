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
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { getPascalCaseFromKebabCase } from "~/utils/get-pascal-case-from-kebab-case";
import { PageMain } from "~/components/molecules/page-main/page-main";
import type { TagName } from "@prisma/client";
import { Breadcrumbs } from "~/components/organisms/breadcrumbs/breadcrumbs";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { useReadPost } from "~/hooks/post/read-post.hook";
import { useReadAllPostsInCategory } from "~/hooks/post/read-all-posts-in-category.hook";

export default function PostViewPage({
  slug,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isCategoryPage = Boolean(category) && !slug;
  const pascalCaseCategory = getPascalCaseFromKebabCase(category ?? "");

  const { postData, postDataIsFetching } = useReadPost({ slug });
  const { categoryPostsData, categoryPostsDataIsFetching } =
    useReadAllPostsInCategory({ category: pascalCaseCategory as TNativeTag });

  if (postDataIsFetching) {
    // Won't happen since we're using `fallback: "blocking"`
    return <LoadingSpinner />;
  }

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
      <InfoPanel
        title={`No posts filed under: "${pascalCaseCategory}"`}
        type="info"
      />
    );
  }

  const postDataLatestVersion = postData?.versions.at(-1);

  if (!postData || !postDataLatestVersion || !category) {
    return <InfoPanel title="Post not found" type="info" />;
  }

  const { title, body } = postDataLatestVersion;

  return (
    <Fragment>
      <SharedHead title={title} description={body} />
      <Breadcrumbs items={[category, slug]} />
      <PageMain justifyContent="center" className="items-start">
        <Post postData={postData} />
      </PageMain>
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
      const { fileUnder, relatedPostId1, relatedPostId2 } =
        versions.at(0) ?? {};

      return {
        params: {
          post: [
            getKebabCaseFromSentenceCase(fileUnder ?? ""),
            getKebabCaseFromSentenceCase(slug ?? ""),
            relatedPostId1 ?? "",
            relatedPostId2 ?? "",
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
  const relatedPostId1 = context.params?.post.at(2);
  const relatedPostId2 = context.params?.post.at(3);

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

  if (relatedPostId1) {
    await helpers.post.readPost.prefetch({ slug: relatedPostId1 });
  }

  if (relatedPostId2) {
    await helpers.post.readPost.prefetch({ slug: relatedPostId2 });
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
