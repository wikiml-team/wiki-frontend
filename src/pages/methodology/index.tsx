import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { GetMethodologyById, GetMethodologyByIdVariables } from "types";
import { GET_METHODOLOGY_BY_ID } from "apollo/methodologies/methodology";
import QueryStateIndicator from "apollo/indicator";

export default function MethodologyInfo() {
  const { methodologyId } = useParams<{methodologyId: string}>();

  // Get data
  const { data, loading, error } = useQuery<
    GetMethodologyById,
    GetMethodologyByIdVariables
  >(GET_METHODOLOGY_BY_ID, {
    variables: { id: methodologyId },
  });

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

  return <div>Methodology name: {data.methodology?.name}</div>;
}
