import React, { FunctionComponent } from "react";

import styled from "styled-components";

export const Centered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
`;

const Recipient = styled.div`
  display: inline-block;
  text-align: left;
  height: 100%;
`;

interface CenteredHorizontalProps {
  className?: string;
}
export const CenteredHorizontal: FunctionComponent<CenteredHorizontalProps> = (
  props
) => (
  <Container className={props.className}>
    <Recipient>{props.children}</Recipient>
  </Container>
);
