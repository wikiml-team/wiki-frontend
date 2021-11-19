import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Panel } from "@fluentui/react";

type ContextualHelpPanelProps = {
  isOpen: boolean;
  onDismiss: () => void;
};

const ContextualHelpPanel: FunctionComponent<ContextualHelpPanelProps> = (
  props
) => {
  const { isOpen, onDismiss } = props;
  const { t } = useTranslation("forms", { keyPrefix: "contextual-help" });

  return (
    <Panel
      closeButtonAriaLabel="Close"
      headerText={t("header")}
      isOpen={isOpen}
      isHiddenOnDismiss={true}
      isLightDismiss={true}
      isBlocking={false}
      isFooterAtBottom={true}
      onDismiss={onDismiss}
    >
      {props.children}
    </Panel>
  );
};

export default ContextualHelpPanel;
