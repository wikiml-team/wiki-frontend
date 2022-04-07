
export interface LotItem {
  id : number;
  lot_number : number;
  created_at : Date;
  updated_at : Date;
  project_budget_id : number;
}

export interface LotList {
  LotList: LotItem[];
}

export interface LotVars {
  id: number;
}

