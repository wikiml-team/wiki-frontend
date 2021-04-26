export default interface IDocument {
  name: string;
  type: "pdf" | "doc" | "docx" | "ppt" | "pptx" | undefined;
}
