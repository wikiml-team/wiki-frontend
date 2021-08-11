import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Link } from "react-router-dom";
import { MethodologiesNames } from "types";

const Main = () => {
  const { data, loading, error } = useQuery<MethodologiesNames>(gql`
    query MethodologiesNames {
      methodologies {
        id
        name
      }
    }
  `);

  return (
    <React.Fragment>
      <Link to='/workplace'>Workplace</Link>
      <h2>Create</h2>
      {loading && <p>loading methodologies...</p>}
      {error && <p>error loading methodologies: {error.message}</p>}
      {data && (
        <ul>
          {data.methodologies.map((m) => (
            <li key={m.id}>{m.name}</li>
          ))}
        </ul>
      )}
      <h2>Recently open</h2>
    </React.Fragment>
  );
};

export default Main;
