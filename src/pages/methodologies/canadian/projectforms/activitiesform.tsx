import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toNumber } from 'lodash';

import { selectProject } from 'store/slices/projectslice';
import ActivitiesMatrixGraph from 'models/canadian/actvitiesmatrix';
import ActivityMatrixTextFieldInput from "components/inputs/activitytext"

export default function ActivitiesMatrixForm() {

  // LOGIC
  const project = useSelector(selectProject);
  const logicModelActivitiesMatrix = project.methodology.instruments.logicActivitiesModel as ActivitiesMatrixGraph;

  const initialItems = logicModelActivitiesMatrix.buidOutputsActivityList();

  const [items, setItems] = useState(initialItems);
  const [activitiesMatrix, setActivitiesMatrix] = useState(logicModelActivitiesMatrix);

  const handleAddActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];

    setActivitiesMatrix(activitiesMatrix.addActivityToOutput(outputId, activityId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  const handleDeleteActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = (toNumber(itemId[4]) + 1).toString();

    setActivitiesMatrix(activitiesMatrix.deleteActivity(outputId, activityId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  return <ActivityMatrixTextFieldInput
    rowItems={items}
    handleAddActivity={handleAddActivity}
    handleDeleteActivity={handleDeleteActivity}
  />
}


