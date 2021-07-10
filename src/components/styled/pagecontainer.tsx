import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

const Container = styled.div`
  padding: 20px 5% 50px 5%;
`;

type PagecontainerProps = {
  className?: string;
  spring: any;
}
export const PageContainer: React.FunctionComponent<PagecontainerProps> = (props) => {

  const { className, spring } = props;

  return <Container className={className} ><animated.div style={spring}>{props.children}</animated.div></Container>
};




