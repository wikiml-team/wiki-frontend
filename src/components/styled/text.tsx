import { ITextStyles, Text } from "@fluentui/react";

export const Title: React.FunctionComponent = (props) => {
  const styles: ITextStyles = {
    root: {
      marginBottom: 20,
    },
  };

  return (
    <Text variant="xLarge" block styles={styles}>
      {props.children}
    </Text>
  );
};

export const Subtitle: React.FunctionComponent = (props) => {
  return (
    <Text variant="medium" block>
      {props.children}
    </Text>
  );
};
