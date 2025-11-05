import type { FC, KeyboardEvent } from "react";

import { useContext, useState, useEffect } from "react";

import FocusTrap from "focus-trap-react";

import { Button } from "~/components/atoms/button/button";
import { Link } from "~/components/atoms/link/link";
import { IconCancel } from "~/components/icons/cancel/cancel";
import { IconConfirm } from "~/components/icons/confirm/confirm";
import { setCloseModal } from "~/context/actions/page/page.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";

import { ContentWellHeader } from "../content-well-header/content-well-header";

export const ModalHub: FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const state = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);
  const transitionDelay = 10;

  const {
    content,
    type,
    preTitle,
    title,
    footer,
    background = "dark",
  } = state.page.modal;
  const { cancel, confirm } = footer ?? {};
  const {
    onClick: passedCancelOnClick,
    text: cancelText = "Nope",
    loading: cancelLoading = false,
    icon: cancelIcon = <IconCancel size={type === "small" ? 19 : 21} />,
    variant: cancelVariant = "secondary",
    href: cancelHref,
  } = cancel ?? {};
  const {
    onClick: passedConfirmOnClick,
    text: confirmText = "Yep",
    loading: confirmLoading = false,
    icon: confirmIcon = <IconConfirm size={type === "small" ? 20 : 23} />,
    variant: confirmVariant = "primary",
    href: confirmHref,
  } = confirm ?? {};

  const handleCloseModal = () => {
    setShowDialog(false);
    dispatch(setCloseModal());
  };

  const onCancel = () => {
    passedCancelOnClick?.();
    handleCloseModal();
  };

  const onConfirm = () => {
    handleCloseModal();
    passedConfirmOnClick?.();
  };

  useEffect(() => {
    if (type === null) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowDialog(true);
    }, transitionDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [type]);

  const getHeaderBackgroundClasses = () => {
    switch (background) {
      case "dark": {
        return "bg-background-inverse-dark";
      }

      default: {
        return "bg-background-light text-copy";
      }
    }
  };

  const getBackgroundClasses = () => {
    switch (background) {
      case "dark": {
        return "bg-background-light text-copy";
      }

      default: {
        return "bg-background-inverse";
      }
    }
  };

  const getFooterBackgroundClasses = () => {
    switch (background) {
      case "dark": {
        return "bg-background-light";
      }

      default: {
        return "bg-background-inverse";
      }
    }
  };

  const getModalClasses = () => {
    switch (type) {
      case "small": {
        return "max-w-sm";
      }

      case "large": {
        return "max-w-6xl";
      }

      default: {
        return "max-w-4xl";
      }
    }
  };

  const getCloseButtonClasses = () => {
    switch (background) {
      case "dark": {
        return "hover:bg-background hover:text-copy text-copy";
      }

      default: {
        return "hover:bg-background-inverse text-copy-inverse";
      }
    }
  };

  const modalClasses = getModalClasses();
  const headerBackgroundClasses = getHeaderBackgroundClasses();
  const backgroundClasses = getBackgroundClasses();
  const footerBackgroundClasses = getFooterBackgroundClasses();
  const closeButtonClasses = `absolute right-2 top-[20px] flex h-6 w-6 p-1 -translate-y-1/2 flex-col items-center justify-center rounded-full transition-colors ${getCloseButtonClasses()}}`;

  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      dispatch(setCloseModal());
    }
  };

  return (
    type !== null && (
      <FocusTrap>
        <section
          data-cy="modal-bg"
          className="fixed bottom-0 left-0 right-0 top-0 z-modal grid place-items-center bg-black bg-opacity-50 backdrop-blur-xl"
          role="button"
          tabIndex={0}
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
        >
          <div
            className={`relative grid w-full cursor-auto place-items-center shadow-lg bg-clip-padding ${modalClasses}`}
            tabIndex={0}
            role="button"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <dialog
              open
              data-cy="modal"
              className={`relative w-full overflow-auto max-h-screen rounded-t-md bg-primary p-0 bg-clip-padding z-50 transition-all duration-300 ${
                showDialog
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <header
                data-cy="modal-header"
                className={`relative px-5 py-0 text-center rounded-t-lg font-semibold ${headerBackgroundClasses}`}
              >
                {title && (
                  <ContentWellHeader
                    span={preTitle ?? undefined}
                    text={title}
                  />
                )}
                <button
                  type="button"
                  title="Close modal"
                  className={closeButtonClasses}
                  onClick={handleCloseModal}
                >
                  <IconCancel size={20} />
                </button>
              </header>
              <div
                className={`modal-content p-8 font-medium ${backgroundClasses}`}
              >
                {content}
              </div>
              {footer && (
                <footer
                  data-cy="modal-footer"
                  className={`flex justify-end gap-4 p-2 ${footerBackgroundClasses}`}
                >
                  {cancel ? (
                    cancelHref ? (
                      <Link
                        variant={cancelVariant}
                        href={cancelHref}
                        size="small"
                        onClick={onCancel}
                      >
                        {cancelIcon && (
                          <span className="pr-0">{cancelIcon}</span>
                        )}
                        {cancelText}
                      </Link>
                    ) : (
                      <Button
                        variant={cancelVariant}
                        loading={cancelLoading}
                        size="small"
                        onClick={onCancel}
                      >
                        {cancelIcon && (
                          <span className="pr-0">{cancelIcon}</span>
                        )}
                        {cancelText}
                      </Button>
                    )
                  ) : null}
                  {confirm ? (
                    confirmHref ? (
                      <Link
                        variant={confirmVariant}
                        size="small"
                        href={confirmHref}
                        onClick={onConfirm}
                      >
                        {confirmIcon && (
                          <span className="pr-1">{confirmIcon}</span>
                        )}
                        {confirmText}
                      </Link>
                    ) : (
                      <Button
                        variant={confirmVariant}
                        size="small"
                        loading={confirmLoading}
                        onClick={onConfirm}
                      >
                        {confirmIcon && (
                          <span className="pr-1">{confirmIcon}</span>
                        )}
                        {confirmText}
                      </Button>
                    )
                  ) : null}
                </footer>
              )}
            </dialog>
          </div>
        </section>
      </FocusTrap>
    )
  );
};
