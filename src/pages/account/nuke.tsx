import { type NextPage } from "next";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";
import { Fragment, useContext } from "react";
import { GlssryDispatchContext } from "../../context/context/context";
import { Button } from "~/components/atoms/button/button";
import { IconError } from "~/components/icons/error/error";
import {
  setCloseModal,
  setModal,
} from "../../context/actions/page/page.actions";
import { useDeleteUser } from "~/hooks/account/delete-user.hook";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { PageIntro } from "~/components/atoms/page-intro/page-intro";

const Nuke: NextPage = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const isAuthenticated = useIsAuthenticated();
  const { deleteUser } = useDeleteUser({});

  const handleDeleteAccount = () => {
    dispatch(
      setModal({
        type: "small",
        title: "Delete my account",
        background: "dark",
        content: (
          <p>
            OK, last chance to change your mind. Are you sure you want to delete
            your account? Your data will be lost, like tears in rain.
          </p>
        ),
        footer: {
          confirm: {
            text: "Delete my account",
            variant: "danger",
            icon: <IconError size={15} />,
            onClick: () => deleteUser(),
          },
          cancel: {
            text: "Close",
            onClick: () => dispatch(setCloseModal()),
          },
        },
      })
    );
  };

  return (
    <AccountPageWrapper>
      <PageStructure title="Nuke" width="narrow">
        <PageIntro
          textList={[
            "Want to delete your account and all your data?",
            "That's cool, we understand...",
          ]}
        />
        {isAuthenticated ? (
          <Fragment>
            <p>
              Click the button below to <strong>delete your account</strong> and
              all your data.
            </p>
            <Button
              className="mt-4"
              type="button"
              variant="danger"
              onClick={handleDeleteAccount}
            >
              <IconError size={15} /> Delete my account
            </Button>
          </Fragment>
        ) : (
          <p className="text-copy">
            But you&apos;ll need to <strong>log in first.</strong>
          </p>
        )}
      </PageStructure>
    </AccountPageWrapper>
  );
};

export default Nuke;
