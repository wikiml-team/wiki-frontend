import { Panel, IPanelStyles } from "@fluentui/react";

type SidePanelProps = {
  headerText: string;
  content: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
};

export default function SidePanel(props: SidePanelProps) {
  // Panel Styles
  const PanelStyles: Partial<IPanelStyles> = {
    root: {
      marginTop: 70,
    },
    content: {
      paddingTop: 50,
    },
  };

  return (
    <Panel
      headerText={props.headerText}
      isBlocking={false}
      isOpen={props.isOpen}
      onDismiss={props.handleClose}
      closeButtonAriaLabel="Close"
      styles={PanelStyles}
    >
      {props.content}
    </Panel>
  );
}
