import { toNumber } from "lodash";
import { Edge } from "../tree";
import LogicmodelGraph, { LogicmodelVertex } from "./logicmodel"

export type ActivityVertex = {
    outputId: string;
    id: string;
    text: string;
}

export default class LogicModelActivitiesMatrix extends LogicmodelGraph {

    activities: ActivityVertex[];

    constructor(vertex: LogicmodelVertex[], edges: Edge[], activities: ActivityVertex[]) {
        super(vertex, edges);
        this.activities = activities.sort((a, b) => toNumber(a.id) - toNumber(b.id));
    }

    findActivitiesByOutput(outputId: string) {
        return this.activities.filter(a => a.outputId === outputId);
    }

    addActivityToOutput(outputId: string, id: string): LogicModelActivitiesMatrix {
        // Update siblingsIds below
        let i = toNumber(id)
        this.activities.filter(a => a.outputId === outputId && toNumber(a.id) >= i).sort().forEach((sibling, key) => {
            sibling.id = (i + key + 1).toString();
        })

        // Create nwe activity
        const newActivity = {
            outputId: outputId,
            id: id,
            text: "",
        } as ActivityVertex

        // Add to graph
        this.activities.push(newActivity);
        this.activities = this.activities.sort((a, b) => toNumber(a.id) - toNumber(b.id));
        return this
    }

    deleteActivity(outputId: string, id: string): LogicModelActivitiesMatrix {
        // Delete from activities
        this.activities = this.activities.filter(a => !(a.id === id && a.outputId === outputId));

        // Update children ids
        this.activities.filter(a => a.outputId === outputId).sort().forEach((child, key) => {
            child.id = key.toString();
        });

        return this;
    }

    buidOutputsActivityList() {
        // get all Inmediate Outcomes Ids
        const inmediatesIds = this.vertex.filter(v => v.level === 2).sort((a, b) => toNumber(a.id) - toNumber(b.id)).map(v => v.id);
        const items: NodeInfo[] = [];

        inmediatesIds.forEach(id => {
            const { node, outputs } = this.getInmediateTree(id);

            // Push Inmediate Outcome
            items.push({
                id: node.id,
                name: "inmediate-outcomes",
                level: 0,
                description: node.text
            } as NodeInfo);

            // Push Outputs & Activities
            outputs.forEach(output => {
                // Push Output
                items.push({
                    id: output.id,
                    name: "outputs",
                    level: 1,
                    description: output.text
                } as NodeInfo)

                // Push Activities
                this.findActivitiesByOutput(output.id).forEach(activity => {
                    items.push({
                        id: output.id + activity.id,
                        name: "activity",
                        level: 2,
                        description: activity.text
                    } as NodeInfo)
                })
            })
        })

        return items;
    }
}

export type NodeInfo = {
    id: string;
    name: string;
    level: number;
    description: string;
}