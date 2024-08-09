import { PrismaClient } from "@prisma/client";
import type { GetStaticPropsResult } from "next";

import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import { CategoryRowsLinks } from "~/components/molecules/category-rows-links/category-rows-links";
import { Intro } from "~/components/molecules/intro/intro";
import { PageMain } from "~/components/molecules/page-main/page-main";
import { PageMainIndent } from "~/components/molecules/page-main-indent/page-main-indent";
import { PostRowsLinks } from "~/components/molecules/post-rows-links/post-rows-links";
import { PostShort } from "~/components/molecules/post-short/post-short";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { tagKeys } from "~/schemas/post/post.schema";
import { appDescription, appDomain, appStrapline } from "~/settings/constants";
import type { IHomePageProperties } from "~/types/page.types";
import { getShuffledArray } from "~/utils/get-shuffled-array";

export default function Home({
  latestPostsData,
  randomPostData,
  randomCategoryPostCountData,
}: IHomePageProperties) {
  return (
    <>
      <SharedHead
        title={`${appDomain} - ${appStrapline}`}
        description={`${appDomain} ${appDescription}`}
      />
      <PageMain justifyContent="start">
        <PageMainIndent className="max-w-screen-2xl">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-24 w-full justify-center items-center">
            <Intro />
            <PostShort postData={randomPostData} className="md:max-w-md" />
            <div className="flex flex-col items-start mb-10 md:mb-0 md:justify-self-end md:max-w-md w-full">
              <SectionSubtitle className="mb-0">
                Random categories
              </SectionSubtitle>
              <CategoryRowsLinks
                categoryData={randomCategoryPostCountData}
                itemsCount={10}
              />
            </div>
            <div className="md:max-w-md">
              <SectionSubtitle className="mb-0">Latest posts</SectionSubtitle>
              <PostRowsLinks postsData={latestPostsData} itemsCount={10} />
            </div>
          </section>
        </PageMainIndent>
      </PageMain>
    </>
  );
}

// This function gets called at build time
export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IHomePageProperties>
> => {
  const prisma = new PrismaClient();
  const allPublishedPostsData = await prisma.post.findMany({
    where: {
      versions: {
        some: {
          published: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      author: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      id: true,
      title: true,
      versions: {
        select: {
          author: true,
          id: true,
          title: true,
          fileUnder: true,
          acronym: true,
          abbreviation: true,
          slug: true,
          tags: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  const latestPostsData: IHomePageProperties["latestPostsData"] =
    allPublishedPostsData.slice(0, 10);

  const allPostsWithAuthor = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      versions: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
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

  const categoryPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      versions: {
        select: {
          fileUnder: true,
          published: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  const initialEmptyCategoriesMap = new Map(
    tagKeys.map((tagKey) => [tagKey, 0])
  );

  // eslint-disable-next-line unicorn/no-array-reduce -- Reduce might be the best way to do this
  const postsInCategories = categoryPosts.reduce((accumulator, post) => {
    const lastVersion = post.versions.at(-1);

    if (!lastVersion) {
      return accumulator;
    }

    const { fileUnder } = lastVersion;

    const currentCount = accumulator.get(fileUnder);

    if (currentCount === undefined) {
      return accumulator;
    }

    accumulator.set(fileUnder, currentCount + 1);

    return accumulator;
  }, initialEmptyCategoriesMap);

  const randomCategoryPostCountData = getShuffledArray([
    ...postsInCategories.entries(),
  ]).slice(0, 10);

  const randomPostData: IHomePageProperties["randomPostData"] =
    getShuffledArray(allPostsWithAuthor).at(0);

  return {
    props: {
      latestPostsData,
      randomPostData,
      randomCategoryPostCountData,
    },
    revalidate: 24 * 60 * 60, // 24 hours
  };
};
