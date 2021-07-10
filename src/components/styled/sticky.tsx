import React from 'react'
import styled from 'styled-components';

const Fixed = styled.div.attrs(props => ({ direction: "top" || "bottom" }))`
  position: fixed;
  width: 100%;
  z-index: 1;
  ${props => props.direction === "top" ? "top : 0" : "bottom : 0"} 
`;

type StickyProps = {
    direction: "top" | "bottom";
}

export const Sticky: React.FunctionComponent<StickyProps> = (props) => {
    return (
        <Fixed direction={props.direction}>{props.children}</Fixed>
    )
}