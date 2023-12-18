import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { Post } from "~/components/molecules/post/post";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { api } from "~/utils/api";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

export default function PostViewPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id, trpcState } = props;

  console.log({ trpcState });

  const postQuery = api.post.readPost.useQuery({ id });
  if (postQuery.status !== "success") {
    // Won't happen since we're using `fallback: "blocking"`
    return <>Loading...</>;
  }

  const { data } = postQuery;

  if (!data) {
    return <InfoPanel title="Post not found" type="info" />;
  }

  return <Post {...data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
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
    paths: posts.map(({ id, versions }) => {
      const { fileUnder, slug } = versions.at(0) ?? {};
      console.log({ id, fileUnder, slug });
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
  const id = context.params?.post.at(0);

  console.log({ context: context.params });

  if (!id) {
    throw new Error("No id provided");
  }

  await helpers.post.readPost.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
