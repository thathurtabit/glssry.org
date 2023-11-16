import type { FCC } from "../../../types/react.types";
import type { IInfoPanel } from "./info-panel.types";
import { InfoIcon } from "../info-panel-icon/info-panel-icon";

export const InfoPanel: FCC<IInfoPanel> = ({
  title,
  type = "info",
  children,
}) => (
  <section
    role="alert"
    className="mb-5 max-w-md rounded-md bg-black/5 p-3 text-left"
  >
    <h3 className="mb-2 flex items-center text-base font-semibold">
      <InfoIcon type={type} className="mr-2" />
      {title}
    </h3>
    {children}
  </section>
);
