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
  sector: TSector;
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