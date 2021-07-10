import { ReactNode } from "react"

// Workplace Configuration
type FormRender = {
  formtab: string;
  render: ReactNode;
  tools: ReactNode;
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
  findkey(tabs: tabSchema[], key: string): tabSchema {
    return tabs.find(tab => tab.key === key) || {} as tabSchema
  },

  findChildkey(tabs: tabSchema[], key: string, childkey: string): tabSchema {
    const parenttab = tabs.find(tab => tab.key === key) || {} as tabSchema
    let child;

    if (parenttab.childtabs) {
      child = parenttab.childtabs.find(tab => tab.key === childkey)
    }
    return child || {} as tabSchema
  }
};