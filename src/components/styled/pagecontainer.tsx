import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { Scrollbars } from "react-custom-scrollbars";

const Container = styled.div`
  padding: 20px 5% 50px 5%;
`;

type PagecontainerProps = {
  className?: string;
  spring: any;
  scrollHeight: string | number | undefined;
}
export const PageContainer: React.FunctionComponent<PagecontainerProps> = (props) => {

  const { className, spring, scrollHeight } = props;

  return <animated.div style={spring}>
    <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax={scrollHeight} >
      <Container className={className} >
        {props.children}
      </Container>
    </Scrollbars>
  </animated.div>
};




