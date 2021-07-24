import { Graph, Edge } from "../tree";
import { LogicmodelVertex, edgesExample, vertexExample } from "./logicmodel"

export type ActivityVertex = {
    outputId: string;
    id: string;
    text: string;
}

export default class ActivitiesMatrixGraph {

    activities: ActivityVertex[];

    constructor(activities: ActivityVertex[]) {
        this.activities = activities;
    }

    findActivitiesByOutput(outputId: string) {
        return this.activities.filter(a => a.outputId === outputId);
    }

    addActivityToOutput(outputId: string): ActivitiesMatrixGraph {
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

    deleteActivity(outputId: string, id: string): ActivitiesMatrixGraph {
        // Delete from activities
        this.activities = this.activities.filter(a => {
            return !(a.id === id && a.outputId === outputId)
        });

        // Update children ids
        const childrenActivities = this.activities.filter(a => a.outputId === outputId).sort();

        for (let i = 0; i < childrenActivities.length; i++) {
            childrenActivities[i].id = i.toString();
        }

        return this;
    }
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

export const actmatrixGraphExample = new ActivitiesMatrixGraph(actvitiesExamples);