  export interface MeasureUnit {
    __typename: "MeasureUnit";
    id: string;
    name: string;
    description: string;
  }


export default class MeasurerUnitClass {
    listMeasurerUnit: MeasureUnit[];
    MeasurerUnit: MeasureUnit;

    constructor() {
        this.listMeasurerUnit = [];
        this.MeasurerUnit = new Object() as MeasureUnit;
    }

    setListMeasurerUnit(listMeasurerUnit: MeasureUnit[]): void {
        this.listMeasurerUnit = listMeasurerUnit;
    }
    
}