import React from "react";
import styled from "styled-components";

import { mergeStyleSets } from "@fluentui/react/lib/Styling";

const classes = mergeStyleSets({
  circle: {
    selectors: {
      ":hover": {
        cursor: "pointer",
      },
    },
  },
});

interface CircleProps {
  size: string;
  color: string;
  border: string;
  onClick?: () => void;
}

export function Circle(props: CircleProps) {
  const StyledCircle = styled.div`
    height: ${props.size};
    width: ${props.size}..
    background-color: ${props.color};
    border: 4px solid ${props.border};
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  `;

  return <StyledCircle onClick={props.onClick} className={classes.circle} />;
}
