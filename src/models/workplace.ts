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
export type tab = {
  key: string;
  name: string;
  icon: string;
  render?: JSX.Element;
  addtabs?: boolean;
  childtabs?: tab[];
  onClick?: Function;
};

export class TabScheema {

  tabs: tab[];

  constructor(tabs: tab[]) {
    this.tabs = tabs
  }

  findByKey(key: string): tab {
    return this.tabs.find(tab => tab.key === key) || {} as tab
  }

  findChildByKey(key: string, childkey: string): tab {
    const parenttab = this.tabs.find(tab => tab.key === key) || {} as tab
    let child;

    if (parenttab.childtabs) {
      child = parenttab.childtabs.find(tab => tab.key === childkey)
    }
    return child || {} as tab
  }
};