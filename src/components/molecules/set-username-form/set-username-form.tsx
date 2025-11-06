import type { FC, FormEvent } from "react";
import { useState, Fragment } from "react";

import { FormInput } from "~/components/atoms/form-input/form-input";
import { InfoPanel } from "~/components/atoms/info-panel/info-panel";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";
import { PleaseSignIn } from "~/components/atoms/please-sign-in/please-sign-in";
import { useReadUser } from "~/hooks/account/read-user.hook";
import { useUsernameMutation } from "~/hooks/account/username-mutation.hook";
import { useValidateUsername } from "~/hooks/account/validate-username.hook";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";

import { sanitizeUsername } from "../../../utils/sanitize-username";

export const SetUsernameForm: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const getUserData = useReadUser();
  const userData = isAuthenticated ? getUserData : null;
  const { username, hasPersonalizedUsername } = userData ?? {};
  const [updatedUsername, setUpdatedUsername] = useState<string>("");
  const [readyToSaveUsername, setReadyToSaveUsername] =
    useState<boolean>(false);

  const {
    runIsUsernameValid,
    validateUsernameError,
    doesUsernameExistLoading,
  } = useValidateUsername(updatedUsername);

  const { mutateUsernameAsync, mutateUsernameLoading, mutateUsernameError } =
    useUsernameMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (async () => {
      const isUsernameValid = await runIsUsernameValid();
      setReadyToSaveUsername(isUsernameValid);
      if (readyToSaveUsername) {
        const usernameMutationResult = await mutateUsernameAsync({
          username: updatedUsername,
        });
        if (usernameMutationResult.username === updatedUsername) {
          setUpdatedUsername("");
          setReadyToSaveUsername(false);
        }
      }
    })().catch((error) => {
       
      console.error(error);
    });
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const cleanedValue = sanitizeUsername(value);
    setUpdatedUsername(cleanedValue);
    setReadyToSaveUsername(false);
  };

  if (!isAuthenticated) {
    return <PleaseSignIn />;
  }

  const isFormResponseLoading =
    doesUsernameExistLoading || mutateUsernameLoading;

  const readyToSave = readyToSaveUsername;

  return (
    <Fragment>
      <PageIntro textList={["Set a username to make your account unique."]} />
      {readyToSave && (
        <InfoPanel type="info" title="Username available!">
          Good news! The username &ldquo;
          {/*
           */}
          <strong>{updatedUsername}</strong>&rdquo; is available!
        </InfoPanel>
      )}
      {mutateUsernameError && (
        <InfoPanel type="error" title="Can't update update">
          Oh no! There was a problem updating your username. Please try again
          later.
        </InfoPanel>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="set-username"
          label={`${hasPersonalizedUsername ? "Set" : "Create"} username`}
          description="Username must be between 5 and 20 characters"
          type="text"
          value={updatedUsername}
          placeholder={`${hasPersonalizedUsername ? "Set" : "Create"} username`}
          minLength={5}
          maxLength={20}
          hasError={Boolean(validateUsernameError)}
          errorText={validateUsernameError ?? ""}
          submitButtonData={{
            loading: isFormResponseLoading,
            children: readyToSave ? "Save" : "Check availability",
          }}
          onChange={handleInputChange}
        />
      </form>
      <p className="mb-4">
        <strong>Current username:</strong> &ldquo;
        {/*
         */}
        <span>{username}</span>
        {/*
         */}
        &rdquo;
      </p>
    </Fragment>
  );
};
