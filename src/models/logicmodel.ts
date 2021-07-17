// changeToClass review Scheema or Schema
export type LogicGraph = {
    vertex: LogicmodelVertex[];
    edges: LogicmodelEdge[];
}

export type LogicmodelVertex = {
    id: string;
    text: string;
    level: number;
}

export type LogicmodelEdge = {
    from: string;
    to: string;
}

export type LogicmodelTree = {
    node: LogicmodelVertex;
    children: LogicmodelTree[];
}

export class LogicmodelGraph {

    graph: LogicGraph = { vertex: [], edges: [] }

    constructor(vertex: LogicmodelVertex[], edges: LogicmodelEdge[]) {
        this.graph.vertex = vertex;
        this.graph.edges = edges;
    };

    findNode(id: string) {
        return this.graph.vertex.find(v => v.id === id);
    }

    findChildren(parentId: string) {
        return this.graph.edges.filter(e => e.from === parentId).map(e => e.to);
    }

    generateId(parentId: string, level: number, num: number): string {
        let newId = parentId.slice(0, level + 1);

        newId.concat((num + 1).toString()).padEnd(4, "0");

        return newId;
    }

    addNode(parentId: string) {
        const parentNode = this.findNode(parentId)!;

        const newNode = {
            id: this.generateId(parentId, parentNode.level, this.findChildren(parentId).length),
            text: "",
            level: parentNode.level + 1
        } as LogicmodelVertex

        // Add to graph
        this.graph.vertex.push(newNode);
        this.graph.edges.push({ from: parentNode.id, to: newNode.id } as LogicmodelEdge);

        return this
    }

    removeNode(nodeId: string) {
        // Remove from graph
        this.graph.vertex = this.graph.vertex.filter(v => v.id !== nodeId);
        this.graph.edges = this.graph.edges.filter(e => e.from !== nodeId || e.to !== nodeId);

        return this
    }

    buildTree() {
        let tree: LogicmodelTree = { node: this.findNode("1000")!, children: [] };

        return this.buildTreeRec(tree);
    }

    private buildTreeRec(tree: LogicmodelTree) {

        const childVertex = this.graph.edges.filter(edge => edge.from === tree.node.id).map(edge => this.findNode(edge.to)!);

        tree.children = childVertex.map(child => ({ node: child, children: [] } as LogicmodelTree));

        tree.children.forEach(child => {
            this.buildTreeRec(child);
        })

        return tree;
    }
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

const edgesExample: LogicmodelEdge[] = [
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

export const logicmodelGraphExample = new LogicmodelGraph(vertexExample, edgesExample)
