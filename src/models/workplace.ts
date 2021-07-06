import { ReactNode } from "react";

export type StringDictionary = {
    [index: string]: string;
};

export default interface IWorkplaceConfiguration {
    latestMenuTab: string,
    latestForm: string,
    tabsConfigurations: Map<string, string>,
}