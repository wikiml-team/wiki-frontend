import { LogicmodelVertex } from "models/logicmodel"

export type Edge = {
    from: string;
    to: string;
}

export type Tree<T extends LogicmodelVertex> = {
    node: T;
    children: Tree<T>[];
}

export class Graph<T extends LogicmodelVertex> {

    vertex: T[];
    edges: Edge[];

    constructor(vertex: T[], edges: Edge[]) {
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
        return 3 - id.split("").filter(c => c === "0").length;
    }

    generateId(parentId: string, level: number, num: number): string {
        return parentId.slice(0, level + 1).concat((num + 1).toString()).padEnd(4, "0");
    }

    generateParentId(id: string, level: number): string {
        return id.slice(0, level).padEnd(4, "0");
    }

    addNode(parentId: string): Graph<T> {
        const parentNode = this.findNode(parentId)!;

        const newNode = {
            id: this.generateId(parentId, parentNode.level, this.findChildrenId(parentId).length),
            text: "",
            level: parentNode.level + 1
        } as T

        // Add to graph
        this.vertex.push(newNode);
        this.edges.push({ from: parentNode.id, to: newNode.id } as Edge);

        return this
    }

    deleteNode(nodeId: string): Graph<T> {
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
                    } as Edge));
                }
            }
        }

        return this;
    }

    buildTree() {
        let tree: Tree<T> = { node: this.findNode("1000")!, children: [] };

        return this.buildTreeRec(tree);
    }

    private buildTreeRec(tree: Tree<T>) {

        const childVertex = this.edges.filter(edge => edge.from === tree.node.id).map(edge => this.findNode(edge.to)!);

        tree.children = childVertex.map(child => ({ node: child, children: [] } as Tree<T>));

        tree.children.forEach(child => {
            this.buildTreeRec(child);
        })

        return tree;
    }
}
