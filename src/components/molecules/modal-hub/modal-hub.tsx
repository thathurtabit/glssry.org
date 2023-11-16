import type { FC, KeyboardEvent } from "react";
import FocusTrap from "focus-trap-react";
import { useContext, useState, useEffect } from "react";
import { setCloseModal } from "~/context/actions/page/page.actions";
import {
  GlssryDispatchContext,
  GlssryStateContext,
} from "~/context/context/context";
import { Button } from "~/components/atoms/button/button";
import { IconCancel } from "~/components/icons/cancel/cancel";
import { IconConfirm } from "~/components/icons/confirm/confirm";
import { ContentWellHeader } from "../content-well-header/content-well-header";

export const ModalHub: FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const state = useContext(GlssryStateContext);
  const dispatch = useContext(GlssryDispatchContext);

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
  } = cancel ?? {};
  const {
    onClick: passedConfirmOnClick,
    text: confirmText = "Yep",
    loading: confirmLoading = false,
    icon: confirmIcon = <IconConfirm size={type === "small" ? 20 : 23} />,
    variant: confirmVariant = "primary",
  } = confirm ?? {};

  const handleCloseModal = () => {
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
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [type]);

  const getHeaderBackgroundClasses = () => {
    switch (background) {
      case "dark": {
        return "bg-background-light text-copy";
      }

      default: {
        return "bg-background-inverse-dark";
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
        return "max-w-4xl";
      }

      default: {
        return "max-w-2xl";
      }
    }
  };

  const getCloseButtonClasses = () => {
    switch (background) {
      case "dark": {
        return "hover:bg-background text-copy";
      }

      default: {
        return "hover:bg-background-inverse text-copy";
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
            {showDialog && (
              <dialog
                open
                data-cy="modal"
                className="relative w-full overflow-hidden rounded-md bg-primary p-0 bg-clip-padding"
              >
                <header
                  data-cy="modal-header"
                  className={`relative px-5 py-0 text-center font-semibold ${headerBackgroundClasses}`}
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
                    {cancel && (
                      <Button
                        variant={cancelVariant}
                        loading={cancelLoading}
                        size={type === "small" ? "small" : "medium"}
                        onClick={onCancel}
                      >
                        {cancelIcon && (
                          <span className="pr-0">{cancelIcon}</span>
                        )}
                        {cancelText}
                      </Button>
                    )}
                    {confirm && (
                      <Button
                        variant={confirmVariant}
                        size={type === "small" ? "small" : "medium"}
                        loading={confirmLoading}
                        onClick={onConfirm}
                      >
                        {confirmIcon && (
                          <span className="pr-1">{confirmIcon}</span>
                        )}
                        {confirmText}
                      </Button>
                    )}
                  </footer>
                )}
              </dialog>
            )}
          </div>
        </section>
      </FocusTrap>
    )
  );
};
