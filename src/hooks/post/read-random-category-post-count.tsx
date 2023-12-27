import { api } from "~/utils/api";

interface IUseReadRandomCategoryPostCount {
  maxCount?: number;
}

export const useReadRandomCategoryPostCount = ({
  maxCount = 10,
}: IUseReadRandomCategoryPostCount) => {
  const { data, isFetching, error, isError } =
    api.post.readRandomCategoryPostCount.useQuery({ maxCount });

  return {
    randomCategoryPostCountData: data,
    randomCategoryPostCountIsFetching: isFetching,
    randomCategoryPostCountHasError: isError,
    randomCategoryPostCountError: error,
  };
};
