import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectProject } from 'store/slices/projectslice';
import ActivitiesMatrixGraph from 'models/canadian/actvitiesmatrix';
import LogicmodelGraph from 'models/canadian/logicmodel';
import ActivityMatrixTextFieldInput from "components/inputs/activitytext"
import { FontSizes, IGroup, mergeStyleSets, useTheme } from '@fluentui/react';

export default function ActivitiesMatrixForm() {

  const project = useSelector(selectProject);
  const logicModelActivitiesMatrix = project.methodology.instruments.logicModelActivities as ActivitiesMatrixGraph;

  const initialItems = logicModelActivitiesMatrix.buidOutputsActivityList();

  const [items, setItems] = useState(initialItems);
  const [activitiesMatrix, setActivitiesMatrix] = useState(logicModelActivitiesMatrix);

  const handleAddActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];

    setActivitiesMatrix(activitiesMatrix.addActivityToOutput(outputId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  const handleDeleteActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];

    setActivitiesMatrix(activitiesMatrix.deleteActivity(outputId, activityId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  return <ActivityMatrixTextFieldInput
    rowItems={items}
    handleAddActivity={handleAddActivity}
    handleDeleteActivity={handleDeleteActivity}
  />
}


