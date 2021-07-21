import { Graph, Edge } from "./tree";

export type LogicmodelVertex = {
    id: string;
    text: string;
    level: number;
}

// Examples
const vertexExample: LogicmodelVertex[] = [
    {
        id: "1000",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nulla vel nisi convallis scelerisque sed quis sapien. Morbi gravida ipsum enim, at tempus mauris interdum nec. Suspendisse sit amet quam dapibus, tincidunt eros vitae, varius nunc. Phasellus luctus nisl eu sem pretium, sit amet fringilla odio convallis.",
        level: 0,
    },
    {
        id: "1100",
        text: "",
        level: 1,
    },
    {
        id: "1110",
        text: "",
        level: 2,
    },
    {
        id: "1111",
        text: "",
        level: 3,
    },
    {
        id: "1120",
        text: "",
        level: 2,
    },
    {
        id: "1121",
        text: "",
        level: 3,
    },
    {
        id: "1200",
        text: "",
        level: 1,
    },
    {
        id: "1210",
        text: "",
        level: 2,
    },
    {
        id: "1211",
        text: "",
        level: 3,
    },
    {
        id: "1220",
        text: "",
        level: 2,
    },
    {
        id: "1221",
        text: "",
        level: 3,
    },
];

const edgesExample: Edge[] = [
    // Edges from 1
    { from: "1000", to: "1100" },
    { from: "1000", to: "1200" },

    // Edges from 1.1
    { from: "1100", to: "1110" },
    { from: "1100", to: "1120" },

    // Edges from 1.1.1
    { from: "1110", to: "1111" },
    // Edges from 1.1.2
    { from: "1120", to: "1121" },

    // Edges from 1.2
    { from: "1200", to: "1210" },
    { from: "1200", to: "1220" },

    // Edges from 1.2.1
    { from: "1210", to: "1211" },
    // Edges from 1.2.2
    { from: "1220", to: "1221" },
];

export const logicmodelGraphExample = new Graph(vertexExample, edgesExample)
