import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
`;

interface PagecontainerProps {
  className?: string;
  role?: string;
}
export const PageContainer: React.FunctionComponent<PagecontainerProps> = (
  props
) => <Container className={props.className}>{props.children}</Container>;
