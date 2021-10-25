import { toNumber } from "lodash";
import INodeInfo from "models/nodeinfo";
import { Edge } from "../graph";
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
    
    addActivityToOutput(outputId: string, id: string) : ActivityVertex {
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

        return newActivity
    }

    // true if it deletes one activity
    deleteActivity(outputId: string, id: string): boolean {
        // Count len
        const len = this.activities.length

        // Delete from activities
        this.activities = this.activities.filter(a => !(a.id === id && a.outputId === outputId));

        // Update siblings ids
        this.activities.filter(a => a.outputId === outputId).sort().forEach((child, key) => {
            child.id = key.toString();
        });

        return len === this.activities.length +1;
    }

    buildOutputsActivityList() {
        // get all Inmediate Outcomes Ids
        const inmediatesIds = this.vertex.filter(v => v.level === 2).sort((a, b) => toNumber(a.id) - toNumber(b.id)).map(v => v.id);
        const items: IActivityInfo[] = [];

        inmediatesIds.forEach(id => {
            const { node, outputs } = this.getInmediateTree(id);

            // Push Inmediate Outcome
            items.push({
                id: node.id,
                name: "inmediate-outcomes",
                level: 0,
                description: node.text
            } as IActivityInfo);

            // Push Outputs & Activities
            outputs.forEach(output => {
                // Push Output
                items.push({
                    id: output.id,
                    name: "outputs",
                    level: 1,
                    description: output.text
                } as IActivityInfo)

                // Push Activities
                const siblings = this.findActivitiesByOutput(output.id);
                siblings.forEach(activity => {
                    items.push({
                        id: output.id + activity.id,
                        name: "activity",
                        level: 2,
                        description: activity.text,
                        hasSiblings: siblings.length > 1
                    } as IActivityInfo)
                })
            })
        })

        return items;
    }
}

export interface IActivityInfo extends INodeInfo {
    id: string;
    name: string;
    level: number;
    description: string;
    hasSiblings?: boolean;
}