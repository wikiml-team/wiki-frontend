import { ITheme } from "@fluentui/react";
import IProject from "./project";

export default interface IState {
  language: string;
  theme: ITheme;
  helpTooltips: boolean;
  currentProject: IProject;
  // authenticated: boolean;
  // notifications: Notification[];
  // navigation: JSX.Element;
}
