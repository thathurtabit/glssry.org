import { api } from "~/utils/api";

export const useNewPostEmail = () => {
  const { mutate, mutateAsync, error, isError, isLoading } =
    api.email.newPostEmailNotification.useMutation();

  return {
    newPostEmailMutation: mutate,
    newPostEmailMutationAsync: mutateAsync,
    newPostEmailIsLoading: isLoading,
    newPostEmailError: error,
    newPostEmailHasError: isError,
  };
};
