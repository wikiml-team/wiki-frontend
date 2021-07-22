import ActivitiesMatrixGraph from "./canadian/actvitiesmatrix";
import LogicmodelGraph from "./canadian/logicmodel";
import { IProjectInfo } from "./generalinfo";
import Instruments from "./instrument";
import { ECanadianSector } from "./sector";

export default interface IMethodology {
    name: string;
    instruments: Instruments;
}

export class CanadianMethodology implements IMethodology {
    name: string;
    instruments: Instruments;

    constructor(generalInfo: IProjectInfo<ECanadianSector>, logicModel: LogicmodelGraph, activitiesMatrix: ActivitiesMatrixGraph) {
        this.name = "Canadian Methodology";
        this.instruments = {
            ["generalInfo"]: generalInfo,
            ["logicModel"]: logicModel,
            ["activitiesMatrix"]: activitiesMatrix
        }
    }
}

export interface IGermanMethodology extends IMethodology {
    name: "German Methodology";

}

export interface IBreadForWorldMethodology extends IMethodology {
    name: "Bread For The World";

}




