import { Graph, Edge } from "models/graph";

type BudgetVertex = {
    id: string
    text: string
    level: number
    columns: string[]
    price: number
    subtotal?: boolean
}

export default class BudgetGraph extends Graph<BudgetVertex> {

    generateId(parentId: string, num: number): string {
        return parentId + '.' + num;
    }
    
    addNode(parentId: string): BudgetGraph {
        const parentNode = this.findNode(parentId)!;

        const newNode = {
            id: this.generateId(parentId, this.getChildrenCount(parentId)),
            text: "",
            level: parentNode.level + 1
        } as BudgetVertex

        // Add to graph
        this.vertex.push(newNode);
        this.edges.push({ from: parentNode.id, to: newNode.id } as Edge);

        return this
    }
}