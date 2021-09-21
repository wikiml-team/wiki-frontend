import { useQuery } from '@apollo/client';
import { GET_METHODOLOGIES } from 'apollo/methodologies';
import React from 'react'

// New: list methodologies

export default function NewPage() {

    const {loading, error, data} = useQuery(GET_METHODOLOGIES);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <>New</>
    // return data.methodologies.map(({ id , name } : any) =>  (
    //     <div key={id}>
    //       <p>
    //         {id}: {name}
    //       </p>
    //     </div>
    //     )
    // )
}
