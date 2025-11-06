import { api } from "~/utils/api";

export const useNewPostEmail = () => {
  const { mutate, mutateAsync, error, isError, isPending } =
    api.email.newPostEmailNotification.useMutation();

  return {
    newPostEmailMutation: mutate,
    newPostEmailMutationAsync: mutateAsync,
    newPostEmailIsPending: isPending,
    newPostEmailError: error,
    newPostEmailHasError: isError,
  };
};
