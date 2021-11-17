/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMethodologies
// ====================================================

export interface GetMethodologies_methodologies {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetMethodologies {
  /**
   * returns list of all methodologies
   */
  methodologies: GetMethodologies_methodologies[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMethodologyById
// ====================================================

export interface GetMethodologyById_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetMethodologyById {
  /**
   * returns the methodology with the given id
   */
  methodology: GetMethodologyById_methodology | null;
}

export interface GetMethodologyByIdVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMethodologyByName
// ====================================================

export interface GetMethodologyByName_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetMethodologyByName {
  /**
   * returns the methodology with the given id
   */
  methodology: GetMethodologyByName_methodology | null;
}

export interface GetMethodologyByNameVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjects
// ====================================================

export interface GetProjects_projects_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetProjects_projects_intermediateOutcomes {
  __typename: "IntermediateOutcome";
  id: string;
}

export interface GetProjects_projects_projectPermissions {
  __typename: "ProjectPermission";
  id: string;
  userId: number;
}

export interface GetProjects_projects_ultimateOutcome {
  __typename: "UltimateOutcome";
  id: string;
  description: string | null;
  what: string | null;
  where: string | null;
}

export interface GetProjects_projects {
  __typename: "Project";
  id: string;
  shortName: string | null;
  largeName: string | null;
  description: string | null;
  languageId: number;
  programId: number | null;
  projectStatusId: number;
  public: boolean | null;
  sectorId: number;
  currencyCode: string | null;
  durationPlan: number | null;
  methodology: GetProjects_projects_methodology;
  intermediateOutcomes: GetProjects_projects_intermediateOutcomes[];
  projectPermissions: GetProjects_projects_projectPermissions[];
  solicitedBudget: number | null;
  ultimateOutcome: GetProjects_projects_ultimateOutcome | null;
  wikimlCode: string | null;
  createdAt: any;
}

export interface GetProjects {
  /**
   * returns the list of the projects
   */
  projects: GetProjects_projects[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjectById
// ====================================================

export interface GetProjectById_project_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetProjectById_project_intermediateOutcomes {
  __typename: "IntermediateOutcome";
  id: string;
}

export interface GetProjectById_project_projectPermissions {
  __typename: "ProjectPermission";
  id: string;
  userId: number;
}

export interface GetProjectById_project_ultimateOutcome {
  __typename: "UltimateOutcome";
  id: string;
  description: string | null;
  what: string | null;
  where: string | null;
}

export interface GetProjectById_project {
  __typename: "Project";
  id: string;
  shortName: string | null;
  largeName: string | null;
  methodology: GetProjectById_project_methodology;
  description: string | null;
  languageId: number;
  programId: number | null;
  projectStatusId: number;
  public: boolean | null;
  sectorId: number;
  currencyCode: string | null;
  durationPlan: number | null;
  intermediateOutcomes: GetProjectById_project_intermediateOutcomes[];
  projectPermissions: GetProjectById_project_projectPermissions[];
  solicitedBudget: number | null;
  ultimateOutcome: GetProjectById_project_ultimateOutcome | null;
  wikimlCode: string | null;
  createdAt: any;
}

export interface GetProjectById {
  /**
   * returns the project with the given id
   */
  project: GetProjectById_project | null;
}

export interface GetProjectByIdVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
