import { ECanadianSector, EGermanSector } from "./sector";
import IUser from "./user";

export interface IProjectInfo<TSector> {
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
  sector: TSector; //remove from here
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

export type Form = {
  name: string;
  structure: object
}

export default interface IProject {
  info: IProjectInfo<ECanadianSector | EGermanSector>;
  // sector: ECanadianSector | EGermanSector;
  methodology: string;
  forms: Form[];
}




