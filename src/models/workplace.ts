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
export type Tab = {
  key: string;
  name: string;
  icon: string;
  render?: JSX.Element;
  addtabs?: boolean;
  childtabs?: Tab[];
  onClick?: Function;
};

export class TabSchema {

  tabs: Tab[];

  constructor(tabs: Tab[]) {
    this.tabs = tabs
  }

  findByKey(key: string): Tab {
    return this.tabs.find(tab => tab.key === key) || {} as Tab
  }

  findChildByKey(key: string, childkey: string): Tab {
    const parenttab = this.tabs.find(tab => tab.key === key) || {} as Tab
    let child;

    if (parenttab.childtabs) {
      child = parenttab.childtabs.find(tab => tab.key === childkey)
    }
    return child || {} as Tab
  }
};