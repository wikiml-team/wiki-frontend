import IUser from "./user";

export default interface IProject {
  name: string;
  shortname: string;
  methodology: string;
  status: "pendant" | "aproved";
  wikicode: string;
  organization: string;
  duration: string;
  country: string;
  program: string;
  sector: Sector;
  doner: string;
  leader: IUser;
  team: IUser[];
  currency: string;
  budget: string;
  budgetItems: string;
  budgetAct: string;
  description: string;
}

export enum Sector {
  "Agriculture and Nutrition",
  "Economical Growth",
  "Human Rights",
  "Human Development",
  "Energy",
  "Infrastructure",
  "Enviroment",
  "Migration & Refuge",
  "Information & Comunication Technology",
}
