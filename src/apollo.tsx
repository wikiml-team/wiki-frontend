import { gql, useQuery } from '@apollo/client'

export default function Apollo() {

    const METHODOLOGIES = gql`
    query GetMethodologies {
      methodologies {
        id
        name
      }
    }`;
  
    const {loading, error, data} = useQuery(METHODOLOGIES);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.methodologies.map(({ id , name } : any) =>  (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
        )
    )
}
