import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"

import { ICommandBarItemProps } from "@fluentui/react"

export const GetItems = () => {

    const { t } = useTranslation("menuheaders", { keyPrefix: "settings" })
    const t_basics = useTranslation('basics').t
    const history = useHistory();
  
    return [
      {
        key: "home",
        iconProps: { iconName: "WebComponents" },
        iconOnly: true,
        onClick: () => history.push("/"),
        ariaLabel: "home"
      },
      {
        key: "return",
        iconProps: { iconName: "NavigateBack" },
        text: t_basics("return"),
        onClick: () => history.goBack(),
        ariaLabel: "return"
      },
      {
        key: "profile",
        iconProps: { iconName: "Contact" },
        text: t('profile'),
        onClick: () => history.push("/settings/profile")
      },
      {
        key: "privacy",
        iconProps: { iconName: "Fingerprint" },
        text: t('privacy'),
        onClick: () => history.push("/settings/privacy")
      },
      {
        key: "security",
        iconProps: { iconName: "Lock" },
        text: t('security'),
        onClick: () => history.push("/settings/security")
      },
      {
        key: "team",
        iconProps: { iconName: "Teamwork" },
        text: t('team'),
        onClick: () => history.push("/settings/team")
      },
    ] as ICommandBarItemProps[]
}