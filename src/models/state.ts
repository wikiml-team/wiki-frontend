import { ITheme } from "@fluentui/react";
import IProject from "./project";

export type WorkplaceConfiguration = {
  PivotTab: string,
  PageTab: string,
}

export default interface IState {
  language: string;
  theme: ITheme;
  helpTooltips: boolean;
  project: IProject;
  workplace: WorkplaceConfiguration;
  // authenticated: boolean;
  // notifications: Notification[];
  // navigation: JSX.Element;
}
