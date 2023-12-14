import { useContext, useEffect } from "react";
import { setCloseModal } from "~/context/actions/page/page.actions";
import { GlssryDispatchContext } from "~/context/context/context";

export const useKeyboardEvents = () => {
  const dispatch = useContext(GlssryDispatchContext);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed");
        dispatch(setCloseModal());
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);
};
