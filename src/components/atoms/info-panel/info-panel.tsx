import { infoPanelHeading, infoPanelWrapper } from "~/styles/shared";

import type { IInfoPanel } from "./info-panel.types";
import type { FCC } from "../../../types/react.types";
import { InfoIcon } from "../info-panel-icon/info-panel-icon";

export const InfoPanel: FCC<IInfoPanel> = ({ title, type = "info", children }) => (
  <section
    role="alert"
    className={`${infoPanelWrapper} bg-black/5 text-left text-copy`}
  >
    <h3 className={`${infoPanelHeading}`}>
      <InfoIcon type={type} className="mr-2" />
      {title}
    </h3>
    {children}
  </section>
);
