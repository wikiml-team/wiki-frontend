import { toNumber } from "lodash";
import { Graph, Edge } from "../tree";
import LogicmodelGraph, { LogicmodelVertex, edgesExample, vertexExample } from "./logicmodel"

export type ActivityVertex = {
    outputId: string;
    id: string;
    text: string;
}

export default class LogicModelActivitiesMatrix extends LogicmodelGraph {

    activities: ActivityVertex[];

    constructor(vertex: LogicmodelVertex[], edges: Edge[], activities: ActivityVertex[]) {
        super(vertex, edges);
        this.activities = activities;
    }

    findActivitiesByOutput(outputId: string) {
        return this.activities.filter(a => a.outputId === outputId);
    }

    addActivityToOutput(outputId: string): LogicModelActivitiesMatrix {
        const activities = this.findActivitiesByOutput(outputId);

        const newActivity = {
            outputId: outputId,
            id: activities.length.toString(),
            text: "",
        } as ActivityVertex

        // Add to graph
        this.activities.push(newActivity);
        return this
    }

    deleteActivity(outputId: string, id: string): LogicModelActivitiesMatrix {
        console.log("outputId: ", outputId)
        console.log("id: ", id)
        console.log("activities: ", this.activities)

        // Delete from activities
        this.activities = this.activities.filter(a => !(a.id === id && a.outputId === outputId));

        console.log("activities: ", this.activities)

        // Update children ids
        const childrenActivities = this.activities.filter(a => a.outputId === outputId).sort();

        for (let i = 0; i < childrenActivities.length; i++) {
            childrenActivities[i].id = i.toString();
        }

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
                name: "Inmediate Outcome",
                level: 0,
                description: node.text
            } as NodeInfo);

            // Push Outputs & Activities
            outputs.forEach(output => {
                // Push Output
                items.push({
                    id: output.id,
                    name: "Output",
                    level: 1,
                    description: output.text
                } as NodeInfo)

                // Push Activities
                this.findActivitiesByOutput(output.id).forEach(activity => {
                    items.push({
                        id: output.id + activity.id,
                        name: "Activity",
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

// Examples
const actvitiesExamples: ActivityVertex[] = [
    {
        outputId: "1111",
        id: "1",
        text: ""
    },
    {
        outputId: "1111",
        id: "2",
        text: ""
    },
    {
        outputId: "1111",
        id: "3",
        text: ""
    },
    {
        outputId: "1121",
        id: "1",
        text: ""
    },
    {
        outputId: "1121",
        id: "2",
        text: ""
    },
    {
        outputId: "1211",
        id: "1",
        text: ""
    },
    {
        outputId: "1211",
        id: "2",
        text: ""
    },
    {
        outputId: "1211",
        id: "3",
        text: ""
    },
]