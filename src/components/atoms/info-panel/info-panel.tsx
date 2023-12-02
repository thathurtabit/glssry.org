import type { FCC } from "../../../types/react.types";
import type { IInfoPanel } from "./info-panel.types";
import { InfoIcon } from "../info-panel-icon/info-panel-icon";
import { infoPanelHeading, infoPanelWrapper } from "~/styles/shared";

export const InfoPanel: FCC<IInfoPanel> = ({ title, type = "info", children }) => (
  <section role="alert" className={`${infoPanelWrapper} bg-black/5 text-left`}>
    <h3 className={`${infoPanelHeading} text-white`}>
      <InfoIcon type={type} className="mr-2" />
      {title}
    </h3>
    {children}
  </section>
);
