import IUser from "./user";

export default interface IProject {
  name: string;
  shortname: string;
  description: string;
  methodology: string;
  status: "pending" | "approved";
  wikicode: string;
  organization: string;
  intermediary: string;
  duration: number;
  country: string;
  program: string;
  sector: Sector;
  donorcode: string;
  leader: IUser;
  team: IUser[];
  currency: string;
  budget: number;
  budgetItems: number;
  budgetAct: number;
  budgetFinanced: number;
  solicitedBudget: number;
  donor: string;
  approvedBudget: number;
  approvedDate: Date | string;
  initialDate: Date | string;
  finalDate: Date | string;
  contribution: number;
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
