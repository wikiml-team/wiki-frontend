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

// tabSchema
export type tabSchema = {
  key: string;
  name: string;
  icon: string;
  render?: JSX.Element;
  addtabs?: boolean;
  childtabs?: tabSchema[];
  onClick?: Function;
};

export const tabSchemaOperations = {
  findkey(tabs: tabSchema[], key: string) {
    return tabs.find(tab => tab.key === key)
  },

  findChildkey(tabs: tabSchema[], key: string, childkey: string) {
    const parenttab = tabs.find(tab => tab.key === key) || {} as tabSchema
    return parenttab.childtabs ? parenttab.childtabs.find(tab => tab.key == childkey) : undefined
  }
};