import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectProject } from 'store/slices/projectslice';
import ActivitiesMatrixGraph from 'models/canadian/actvitiesmatrix';
import LogicmodelGraph from 'models/canadian/logicmodel';
import ActivityMatrixTextFieldInput from "components/inputs/activitytext"
import { FontSizes, IGroup, mergeStyleSets, useTheme } from '@fluentui/react';

export type NodeInfo = {
  id: string;
  name: string;
  level: number;
  description: string;
}

export default function ActivitiesMatrixForm() {

  const project = useSelector(selectProject);
  const logicModelGraph = project.methodology.instruments.logicModel as LogicmodelGraph;
  const activities = project.methodology.instruments.activitiesMatrix as ActivitiesMatrixGraph;

  const inmediates = logicModelGraph.getAllInmediateOutcomesIds();

  const groups: IGroup[] = [];
  const initialItems: NodeInfo[] = [];

  inmediates.forEach(id => {
    const { node, outputs } = logicModelGraph.getInmediateTree(id);

    // Push Inmediate Outcome
    initialItems.push({
      id: node.id,
      name: "Inmediate Outcome",
      level: 0,
      description: node.text
    } as NodeInfo);
    let children: IGroup[] = [];

    // Push Outputs & Activities
    outputs.forEach(output => {
      // Push Output
      initialItems.push({
        id: output.id,
        name: "Output",
        level: 1,
        description: output.text
      } as NodeInfo)

      // Push Activities
      activities.findActivitiesByOutput(output.id).forEach(activity => {
        initialItems.push({
          id: output.id + activity.id,
          name: "Activity",
          level: 2,
          description: activity.text
        } as NodeInfo)
      })
    })
  })

  const [items, setItems] = React.useState(initialItems);
  const [activitiesMatrix, setActivitiesMatrix] = React.useState(activities);

  const handleAddActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];
    setActivitiesMatrix(activitiesMatrix.addActivityToOutput(outputId))
  }

  const handleDeleteActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];
    setActivitiesMatrix(activitiesMatrix.deleteActivity(outputId, activityId))
  }

  return <ActivityMatrixTextFieldInput
    rowItems={items}
    handleAddActivity={handleAddActivity}
    handleDeleteActivity={handleDeleteActivity}
  />
}


