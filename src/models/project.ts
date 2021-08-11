import IInstrument from "./instrument";
import IMethodology from "./methodologies";

export default interface IProject {
  methodology: IMethodology;
  extraForms?: IInstrument[];
}




