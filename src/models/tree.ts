import { toNumber } from "lodash";
import { ActivityVertex } from "models/canadian/actvitiesmatrix";
import { LogicmodelVertex } from "models/canadian/logicmodel";

export type Vertex = {
    id: string;
}

export type Edge = {
    from: string;
    to: string;
}

interface IGraph<T> {
    vertex: T[];
    edges: Edge[];
}

export type Tree<T extends Vertex | LogicmodelVertex | ActivityVertex> = {
    node: T;
    children: Tree<T>[];
}

export class Graph<T extends Vertex | LogicmodelVertex | ActivityVertex> implements IGraph<T> {

    vertex: T[];
    edges: Edge[];

    constructor(vertex: T[], edges: Edge[]) {
        this.vertex = vertex;
        this.edges = edges;
    };

    findNode(id: string): T {
        return this.vertex.find(v => v.id === id) || {} as T;
    }

    getNodeLevel(id: string): number {
        return 3 - id.split("").filter(c => c === "0").length;
    }

    findChildrenIds(parentId: string): string[] {
        return this.edges.filter(e => e.from === parentId).map(e => e.to);
    }

    generateId(parentId: string, level: number, num: number): string {
        return parentId.slice(0, level + 1).concat((num + 1).toString()).padEnd(4, "0");
    }

    generateSiblingId(siblingId: string, num?: number) {
        // Get level
        const level = this.getNodeLevel(siblingId);

        // Generate new id
        let id = siblingId.slice(0, level);
        const order = num ? num : toNumber(siblingId[level]) + 1;
        id += order.toString();
        id = id.padEnd(4, "0");
        return { id: id.toString(), level: level, order };
    }

    findAllDescendants(id: string) {
        const level = this.getNodeLevel(id);
        const commonRoot = id.substr(0, level + 1);

        return this.vertex.filter(v => v.id.substr(0, level + 1) === commonRoot);
    }

    buildTree(): Tree<T> {
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
