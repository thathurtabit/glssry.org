import { Fragment, useContext } from "react";

import { type NextPage } from "next";

import { Button } from "~/components/atoms/button/button";
import { IconError } from "~/components/icons/error/error";
import { PageStructure } from "~/components/molecules/page-structure/page-structure";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { AccountPageWrapper } from "~/components/templates/account-page-wrapper/account-page-wrapper";
import { useDeleteUser } from "~/hooks/account/delete-user.hook";
import { useIsAuthenticated } from "~/hooks/auth/is-authenticated.hook";

import {
  setCloseModal,
  setModal,
} from "../../context/actions/page/page.actions";
import { GlssryDispatchContext } from "../../context/context/context";

const Nuke: NextPage = () => {
  const dispatch = useContext(GlssryDispatchContext);
  const isAuthenticated = useIsAuthenticated();
  const { deleteUser } = useDeleteUser({});

  const handleDeleteAccount = () => {
    dispatch(
      setModal({
        type: "small",
        title: "Delete account details",
        background: "dark",
        content: (
          <p>
            OK, last chance to change your mind. Are you sure you want to remove
            your account details?
          </p>
        ),
        footer: {
          confirm: {
            text: "Delete account details",
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
      <SharedHead title="Nuke" />
      <PageStructure title="Nuke" width="narrow">
        {isAuthenticated ? (
          <Fragment>
            <p>
              Click the button below to{" "}
              <strong>delete your account details</strong>
            </p>
            <p>
              <strong>NOTE</strong> - the posts you&apos;ve created will remain
              as these do not hold personal information.
            </p>
            <Button
              className="mt-4"
              type="button"
              variant="danger"
              onClick={handleDeleteAccount}
            >
              <IconError size={15} /> Delete account details
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
