import { FunctionComponent } from "react";
import styled from "styled-components";

// export const Centered = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

const Container = styled.div`
  text-align: center;
  width: 100%;
`;

const Recipient = styled.div`
  display: inline-block;
  text-align: left;
  height: 100%;
`;

interface CenteredProps {
  className?: string;
}
export const CenteredHorizontal: FunctionComponent<CenteredProps> = (
  props
) => (
  <Container className={props.className}>
    <Recipient>{props.children}</Recipient>
  </Container>
);

const ContainerText = styled.div`
position: relative;`

const Recipient2 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


export const Centered: FunctionComponent<CenteredProps> = (
  props
) => (
  <Container className={props.className}>
    <Recipient2>{props.children}</Recipient2>
  </Container>
);

export const CenteredText: FunctionComponent<CenteredProps> = (
  props
) => (
  <ContainerText className={props.className}>
    <Recipient2>{props.children}</Recipient2>
  </ContainerText>
);

