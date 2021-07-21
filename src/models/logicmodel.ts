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

    vertex: LogicmodelVertex[];
    edges: LogicmodelEdge[];

    constructor(vertex: LogicmodelVertex[], edges: LogicmodelEdge[]) {
        this.vertex = vertex;
        this.edges = edges;
    };

    findNode(id: string) {
        return this.vertex.find(v => v.id === id);
    }

    findChildrenId(parentId: string): string[] {
        return this.edges.filter(e => e.from === parentId).map(e => e.to);
    }

    getNodeLevel(id: string) {
        const level = 3 - id.split("").filter(c => c === "0").length
        return level;
    }

    generateId(parentId: string, level: number, num: number): string {
        console.log(parentId);
        console.log(level);
        console.log(num);
        return parentId.slice(0, level + 1).concat((num + 1).toString()).padEnd(4, "0");
    }

    generateParentId(id: string, level: number): string {
        return id.slice(0, level).padEnd(4, "0");
    }

    addNode(parentId: string) {
        const parentNode = this.findNode(parentId)!;

        const newNode = {
            id: this.generateId(parentId, parentNode.level, this.findChildrenId(parentId).length),
            text: "",
            level: parentNode.level + 1
        } as LogicmodelVertex

        // Add to graph
        this.vertex.push(newNode);
        this.edges.push({ from: parentNode.id, to: newNode.id } as LogicmodelEdge);

        return this
    }

    deleteNode(nodeId: string) {
        const node = this.findNode(nodeId);

        if (node) {
            // Remove from graph
            this.vertex = this.vertex.filter(v => v.id !== nodeId);
            this.edges = this.edges.filter(e => e.from !== nodeId && e.to !== nodeId);

            // Update children ids
            const parentId = this.generateParentId(nodeId, node.level);
            const children = this.findChildrenId(parentId).sort();

            // Updating vertex and edges
            for (let i = 0; i < children.length; i++) {
                const oldId = children[i];

                const childNode = this.findNode(oldId);
                if (childNode) {
                    const newId = this.generateId(parentId, this.getNodeLevel(parentId), i);
                    childNode.id = newId;

                    this.edges = this.edges.map(e => ({
                        to: e.to === oldId ? newId : e.to,
                        from: e.from === oldId ? newId : e.from
                    } as LogicmodelEdge));
                }
            }
        }

        return this;
    }

    buildTree() {
        let tree: LogicmodelTree = { node: this.findNode("1000")!, children: [] };

        return this.buildTreeRec(tree);
    }

    private buildTreeRec(tree: LogicmodelTree) {

        const childVertex = this.edges.filter(edge => edge.from === tree.node.id).map(edge => this.findNode(edge.to)!);

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
