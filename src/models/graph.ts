import { toNumber } from "lodash";
import { ActivityVertex } from "models/canadian/actvitiesmatrix";
import { LogicmodelVertex } from "models/canadian/logicmodel";

export type Tree<T extends Vertex | LogicmodelVertex | ActivityVertex> = {
    node: T;
    children: Tree<T>[];
}

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

    getChildrenCount(parentId: string): number {
        return this.edges.filter(e => e.from === parentId).length;
    }

    findChildrenIds(parentId: string): string[] {
        return this.edges.filter(e => e.from === parentId).map(e => e.to);
    }

    generateId(parentId: string, level: number, num: number): string {
        return parentId.slice(0, level + 1).concat((num + 1).toString()).padEnd(4, "0");
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

        const childrenVertexes = this.edges.filter(edge => edge.from === tree.node.id).map(
            edge => this.findNode(edge.to)!
            ).sort((a: T, b: T) => this.compareIds(a.id, b.id));

        tree.children = childrenVertexes.map(child => ({ node: child, children: [] } as Tree<T>));

        tree.children.forEach(child => {
            this.buildTreeRec(child);
        })

        return tree;
    }

    compareIds(id1: string, id2: string) : number {
        for (var i = 0; i < id1.length; i++) {
            const r = toNumber(id1.charAt(i)) - toNumber(id2.charAt(i))
            
            if (r === 0) continue;

            return r;
        }
        return 0
    }
}