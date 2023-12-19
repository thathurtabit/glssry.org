import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
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

export default function PostViewPage({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const postQuery = api.post.readPost.useQuery(
    { slug },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  if (postQuery.status !== "success") {
    // Won't happen since we're using `fallback: "blocking"`
    return <LoadingSpinner />;
  }

  const { data } = postQuery;
  const latestVersion = data?.versions.at(-1);

  if (!data || !latestVersion) {
    return <InfoPanel title="Post not found" type="info" />;
  }

  const { title, body } = latestVersion;

  return (
    <Fragment>
      <SharedHead title={title} description={body} />
      <article className="container">
        <Post {...data} />
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
  const uniqueSlug = context.params?.post.at(1);

  if (!uniqueSlug) {
    throw new Error("No uniqueSlug provided");
  }

  await helpers.post.readPost.prefetch({ slug: uniqueSlug });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug: uniqueSlug,
    },
    revalidate: 1,
  };
}
