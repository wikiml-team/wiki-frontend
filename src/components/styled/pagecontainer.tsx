import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { animated } from "react-spring";

import styled from "styled-components";

const Container = styled.div`
  padding: 20px 5% 50px 5%;
`;

type PagecontainerProps = {
  className?: string;
  styles?: any;
  scrollHeight: string | number | undefined;
};

const PageContainer: React.FunctionComponent<PagecontainerProps> = (props) => {
  const { className, styles, scrollHeight, children } = props;

  return (
    <animated.div style={styles}>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={100}
        autoHeightMax={scrollHeight}
      >
        <Container className={className}>{children}</Container>
      </Scrollbars>
    </animated.div>
  );
};

export default PageContainer;
