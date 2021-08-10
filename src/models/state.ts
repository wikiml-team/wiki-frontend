import { ITheme } from "@fluentui/react";
import IProject from "./project";

import IWorkplaceConfiguration from "./workplace";

export default interface IState {
  language: string;
  theme: ITheme;
  helpTooltips: boolean;
  project: IProject;
  workplace: IWorkplaceConfiguration;
  // authenticated: boolean;
  // notifications: Notification[];
  // navigation: JSX.Element;
}
