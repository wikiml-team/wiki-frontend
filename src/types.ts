/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLanguages
// ====================================================

export interface GetLanguages_languages {
  __typename: "Language";
  id: string;
  name: string | null;
  code: string | null;
}

export interface GetLanguages {
  /**
   * return s the list of all supported languages
   */
  languages: GetLanguages_languages[];
}

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
// GraphQL query operation: GetPrograms
// ====================================================

export interface GetPrograms_programs {
  __typename: "Program";
  id: string;
  name: string | null;
}

export interface GetPrograms {
  /**
   * returns the list of the programs
   */
  programs: GetPrograms_programs[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProgramById
// ====================================================

export interface GetProgramById_program {
  __typename: "Program";
  id: string;
  name: string | null;
}

export interface GetProgramById {
  /**
   * returns the program with the given id
   */
  program: GetProgramById_program | null;
}

export interface GetProgramByIdVariables {
  id: string;
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

export interface GetProjects_projects_projectPermissions {
  __typename: "ProjectPermission";
  id: string;
  userId: number;
}

export interface GetProjects_projects {
  __typename: "Project";
  id: string;
  shortName: string | null;
  largeName: string | null;
  description: string | null;
  languageId: number;
  projectStatusId: number;
  public: boolean | null;
  methodology: GetProjects_projects_methodology;
  projectPermissions: GetProjects_projects_projectPermissions[];
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

export interface GetProjectById_project_projectStatus {
  __typename: "ProjectStatus";
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
  projectStatus: GetProjectById_project_projectStatus;
  public: boolean | null;
  sectorId: number;
  currencyCode: string | null;
  durationPlan: number | null;
  intermediateOutcomes: GetProjectById_project_intermediateOutcomes[];
  projectPermissions: GetProjectById_project_projectPermissions[];
  solicitedBudget: number | null;
  ultimateOutcome: GetProjectById_project_ultimateOutcome;
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

// ====================================================
// GraphQL query operation: GetProjectStatusById
// ====================================================

export interface GetProjectStatusById_projectStatus {
  __typename: "ProjectStatus";
  id: string;
  name: string | null;
}

export interface GetProjectStatusById {
  /**
   * returns the project status with the given id
   */
  projectStatus: GetProjectStatusById_projectStatus | null;
}

export interface GetProjectStatusByIdVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSectors
// ====================================================

export interface GetSectors_sectors_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetSectors_sectors {
  __typename: "Sector";
  id: string;
  name: string | null;
  description: string | null;
  methodology: GetSectors_sectors_methodology;
  projectSample: string | null;
}

export interface GetSectors {
  /**
   * returns the list of the sectors
   */
  sectors: GetSectors_sectors[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSectorById
// ====================================================

export interface GetSectorById_sector_methodology {
  __typename: "Methodology";
  id: string;
  name: string | null;
}

export interface GetSectorById_sector {
  __typename: "Sector";
  id: string;
  name: string | null;
  description: string | null;
  methodology: GetSectorById_sector_methodology;
  projectSample: string | null;
}

export interface GetSectorById {
  /**
   * returns the sector with the given id
   */
  sector: GetSectorById_sector | null;
}

export interface GetSectorByIdVariables {
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
