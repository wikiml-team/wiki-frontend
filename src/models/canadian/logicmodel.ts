import { Graph, Edge } from "../tree";

export type LogicmodelVertex = {
    id: string;
    text: string;
    level: number;
}

export default class LogicmodelGraph extends Graph<LogicmodelVertex> {

    setNodeText(id: string, char: string): LogicmodelGraph {
        const node = this.vertex.find(v => v.id === id);

        if (node) {
            node.text += char;
        }

        return this;
    }

    getNodeLevel(id: string): number {
        return 3 - id.split("").filter(c => c === "0").length;
    }

    getInmediateTree(id: string) {
        const outputs = this.edges.filter(e => e.from === id).map(e => this.findNode(e.to));

        return { node: this.findNode(id), outputs: outputs };
    }

    generateParentId(id: string, level: number): string {
        return id.slice(0, level).padEnd(4, "0");
    }

    addNode(parentId: string): LogicmodelGraph {
        const parentNode = this.findNode(parentId)!;

        const newNode = {
            id: this.generateId(parentId, parentNode.level, this.findChildrenId(parentId).length),
            text: "",
            level: parentNode.level + 1
        } as LogicmodelVertex

        // Add to graph
        this.vertex.push(newNode);
        this.edges.push({ from: parentNode.id, to: newNode.id } as Edge);

        return this
    }

    deleteNode(nodeId: string): LogicmodelGraph {
        const node = this.findNode(nodeId);

        if (node) {
            // Remove from graph
            this.vertex = this.vertex.filter(v => v.id !== nodeId);
            this.edges = this.edges.filter(e => e.from !== nodeId && e.to !== nodeId);

            // Update children ids
            const parentId = this.generateParentId(nodeId, node.level);
            const children = this.findChildrenId(parentId).sort();
            console.log("children ", children)

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
                    } as Edge));
                }
            }
        }
        return this;
    }
}

// Examples
export const vertexExample: LogicmodelVertex[] = [
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
        text: "Lorem ipsum dolor sit amet. Et quaerat repellat ut deserunt excepturi in voluptatem error. Id quam quasi eos enim dolorum est omnis perspiciatis et accusantium eius id debitis voluptate non itaque dolor et voluptatem quos.",
        level: 3,
    },
    {
        id: "1120",
        text: "Aut consequuntur obcaecati aut soluta saepe ad doloribus praesentium. Et veniam impedit nam quidem aspernatur ea suscipit deserunt.",
        level: 2,
    },
    {
        id: "1121",
        text: "Sed dolorum sunt ea magnam nostrum qui voluptatibus vero sit corporis galisum et cumque eius non enim inventore. ",
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
        text: "Ut illo voluptatibus aut unde exercitationem ex quam tempore ex quibusdam saepe aut nostrum esse cum alias laboriosam sed corporis mollitia. ",
        level: 3,
    },
    {
        id: "1220",
        text: "Et veniam impedit nam quidem aspernatur ea suscipit deserunt.",
        level: 2,
    },
    {
        id: "1221",
        text: "Ea amet soluta et veniam placeat est dolorum galisum et dolores vero non dolorem ducimus. Est earum itaque qui incidunt eum inventore voluptas id nesciunt dolorem.",
        level: 3,
    },
];

export const edgesExample: Edge[] = [
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
