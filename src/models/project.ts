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
  solicitedBudget: number;
  // Esto no debería estar aquí sino cogerlo de bd cuando haga falta supongo
  donor: string;
  approvedBudget: number;
  approvedDate: Date;
  initialDate: Date;
  finalDate: Date;
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
