import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 150px;
  margin: 180px 20px 0 20px;    
  padding: 20px 5% 50px 5%;
`;

type PagecontainerProps = {
  className?: string;
}
export const PageContainer: React.FunctionComponent<PagecontainerProps> = (
  props
) => <Container className={props.className}>{props.children}</Container>;
