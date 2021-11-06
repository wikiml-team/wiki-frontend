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

export interface GetProjects_projects_intermediateOutcomes {
  __typename: "IntermediateOutcome";
  id: string;
}

export interface GetProjects_projects {
  __typename: "Project";
  id: string;
  shortName: string | null;
  largeName: string | null;
  intermediateOutcomes: GetProjects_projects_intermediateOutcomes[];
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
