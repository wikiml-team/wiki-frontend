import { createSlice } from "@reduxjs/toolkit";

import IState from "models/state";
import { IProjectInfo } from "models/project";
import { ECanadianSector } from "models/sector";
import IProject from "models/project";
import { LogicmodelVertex } from "models/canadian/logicmodel";
import LogicModelActivitiesMatrix, { ActivityVertex } from "models/canadian/actvitiesmatrix";
import { Edge } from "models/tree";
import Stakeholders, { categories } from "models/canadian/stakeholders";

// Examples - Set initial in blank
const initialProjectInfoState: IProjectInfo<ECanadianSector> = {
    name: "Large Project Name Test",
    shortname: "Short Project Name",
    description: "Lorem ipsum dolre description asedore son lisiu tredo.",
    methodology: "Canadian Test",
    status: "pending",
    wikicode: "X54S0",
    organization: "Organization Test",
    intermediary: "Intermediary Organization Test",
    duration: 34,
    country: "Country Test",
    program: "Program Test",
    sector: ECanadianSector.Energy,
    donorcode: "2F8HT",
    leader: { name: "Leader Test", email: "test@gmail.com" },
    team: [
        { name: "team1", email: "team-test@gmal.com" },
        { name: "team2", email: "team-test@gmal.com" },
    ],
    currency: "Euro",
    budget: 200.00,
    budgetItems: 22.00,
    budgetAct: 33.00,
    budgetFinanced: 150.00,
    solicitedBudget: 44.00,
    approvedBudget: 44.00,
    approvedDate: new Date(),
    finalDate: new Date(),
    initialDate: new Date(),
    donor: "Donor Test",
    contribution: 1000.00,
};

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

const edgesExample: Edge[] = [
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

const actvitiesExamples: ActivityVertex[] = [
    {
        outputId: "1111",
        id: "0",
        text: ""
    },
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
        outputId: "1121",
        id: "0",
        text: ""
    },
    {
        outputId: "1121",
        id: "1",
        text: ""
    },
    {
        outputId: "1211",
        id: "0",
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
]

const actmatrixGraphExample = new LogicModelActivitiesMatrix(vertexExample, edgesExample, actvitiesExamples);

const stakeholders = new Stakeholders([
    {
        id: 0,
        name: "Stakeholder1 Ben",
        category: categories.beneficiary,
        main: true,
        orderInGroup: 0
    },
    {
        id: 1,
        name: "Stakeholder2 Ben",
        category: categories.beneficiary,
        main: false,
        orderInGroup: 1
    },
    {
        id: 2,
        name: "Stakeholder3 Ben",
        category: categories.beneficiary,
        main: false,
        orderInGroup: 2
    },
    {
        id: 3,
        name: "Stakeholder4 Don",
        category: categories.donor,
        main: true,
        orderInGroup: 0
    },
    {
        id: 4,
        name: "Stakeholder5 Imp",
        category: categories.implementer,
        main: true,
        orderInGroup: 0
    },
    {
        id: 5,
        name: "Stakeholder6 Int",
        category: categories.intermediary,
        main: true,
        orderInGroup: 0
    },
    {
        id: 6,
        name: "Stakeholder7 Int",
        category: categories.intermediary,
        main: false,
        orderInGroup: 1
    },
    {
        id: 7,
        name: "Stakeholder8 Other",
        category: categories.other,
        main: false,
        orderInGroup: 0
    },
])

const initialState: IProject = {
    info: initialProjectInfoState,
    methodology: "canadian",
    forms: [
        { name: "logicModelActivities", structure: actmatrixGraphExample },
        { name: "stakeholders", structure: stakeholders },
    ],
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setCurrentProject: (state, action) => {
            state = action.payload;
        },
    },
});

export const selectProject = (state: IState) => state.project;
export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
