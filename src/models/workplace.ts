import { ReactNode } from "react"

// Workplace Configuration
type FormRender = {
  tab: string;
  page: ReactNode;
  tools: ReactNode;
}

type FormRenderDictionary = {
  [key: string]: FormRender
}

export default interface IWorkplaceConfiguration {
  tabsSchema: TabSchema,
  latestMenuTab: string,
  configuration: FormRenderDictionary
}

// Forms
export interface IForm {
  key: string;
  name: string;
  description?: string;
  public?: boolean
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

  findByName(name: string): Tab {
    return this.tabs.find(tab => tab.name === name) || {} as Tab
  }

  findChildByName(name: string): Tab {
    for (let tab of this.tabs) {
      if (tab.childtabs) {
        const tabFound = tab.childtabs.find(childTab => childTab.name === name) || {} as Tab
        if (tabFound) return tabFound;
      }
    }

    return {} as Tab;
  }

  findForms() : IForm[] {
    const forms = this.findByKey("key2").childtabs?.map((c, i) => {
      return ({ key: `key${i}`, name: c.name, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."} as IForm)})
   
    return forms || [] as IForm[]
  }

  // getInitialConfiguration() : FormRenderDictionary {
  //   this.tabs.map()
  // } 
};