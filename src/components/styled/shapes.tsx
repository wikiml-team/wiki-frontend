import classnames from "classnames";

import { mergeStyleSets } from "@fluentui/react";

import styled from "styled-components";

interface CircleProps {
  ariaLabel?: string;
  size: string;
  color: string;
  border: string;
  className?: string;
  onClick?: () => void;
}

const StyledCircle = styled.div`
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
`;

export function Circle(props: CircleProps) {
  const classes = mergeStyleSets({
    circleprops: {
      height: props.size,
      width: props.size,
      backgroundColor: props.color,
      border: "4px solid " + props.border,
    },
  });

  return (
    <StyledCircle
      onClick={props.onClick}
      className={classnames(props.className, classes.circleprops)}
    />
  );
}
