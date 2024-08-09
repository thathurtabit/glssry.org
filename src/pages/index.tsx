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
import { appDescription, appDomain, appStrapline } from "~/settings/constants";
import type { IHomePageProperties } from "~/types/page.types";
import { api } from "~/utils/api";

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
  const latestPostsData: IHomePageProperties["latestPostsData"] =
    await prisma.post.findMany();
  const randomPostData: IHomePageProperties["randomPostData"] = await {};
  const randomCategoryPostCountData: IHomePageProperties["randomCategoryPostCountData"] =
    [];
  return {
    props: {
      latestPostsData,
      randomPostData: {},
      randomCategoryPostCountData: [],
    },
  };
};
