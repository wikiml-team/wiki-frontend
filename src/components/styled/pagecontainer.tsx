import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
`;

interface PagecontainerProps {
  className?: string;
}
export const PageContainer: React.FunctionComponent<PagecontainerProps> = (
  props
) => <Container className={props.className}>{props.children}</Container>;
