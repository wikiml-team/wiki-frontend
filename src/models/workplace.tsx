import { ReactNode } from "react"

// Workplace Configuration
type FormRender = {
  formtab: string;
  render: ReactNode;
}

type FormRenderDictionary = {
  [key: string]: FormRender
}

export default interface IWorkplaceConfiguration {
  latestMenuTab: string,
  latestFormTab: string,
  configuration: FormRenderDictionary
}

// PivotTabs
export type PivotTabs = {
  key: string;
  name: string;
  icon: string;
  render?: JSX.Element;
  addtabs?: boolean;
  childtabs?: PivotTabs[];
  onClick?: Function;
};