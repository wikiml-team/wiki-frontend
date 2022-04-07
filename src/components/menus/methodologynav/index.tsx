import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Scrollbars from "react-custom-scrollbars";

import {
  ActionButton,
  FontSizes,
  IButtonStyles,
  IIconProps,
  INavLink,
  INavStyles,
  Nav,
  useTheme,
} from "@fluentui/react";

import { GetItems } from "./items";

export default function MethodologyMenu() {
  // LOGIC
  const { t } = useTranslation("basics");

  const history = useHistory();
  const { form } = useParams<any>();

  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    setSelectedKey(form || "index");
  }, [form]);

  const handleNavOnClick = (
    ev?: React.MouseEvent<HTMLElement>,
    item?: INavLink
  ) => {
    if (ev) ev.preventDefault();

    if (item) {
      setSelectedKey(item.key || "index");
      history.push(item.url);
    }
  };

  const handleOnReturn = () => {
    history.push("/");
  };

  // STYLES
  const { palette } = useTheme();

  // Action Button Return
  const buttonStyles: IButtonStyles = {
    root: {
      marginTop: 20,
      marginBottom: 20,
      width: "100%",
    },
    textContainer: {
      width: "100%",
      textAlign: "left",
    },
  };

  const iconProps: Partial<IIconProps> = {
    iconName: "NavigateBack",
    styles: {
      root: {
        paddingLeft: 7,
        marginRight: 10,
        fontSize: FontSizes.mediumPlus,
      },
    },
  };

  // Main navigation
  const navStyles: Partial<INavStyles> = {
    root: {
      height: "inherit",
      boxSizing: "border-box",
      border: "none",
      overflowY: "auto",
      color: palette.white!,
    },
    link: {
      paddingLeft: 10,
      fontSize: FontSizes.medium,
      // color: palette.white!,

      // '.ms-Nav-compositeLink:hover &': {
      //     backgroundColor: palette.themePrimary,
      //     color: palette.white
      // },

      // '.is-selected &': {
      //     backgroundColor: palette.themeDarkAlt
      // }
    },
    linkText: {
      // color: palette.white!
      paddingLeft: 30,
    },
    groupContent: {
      marginBottom: 2,
    },
    chevronIcon: {
      marginLeft: 8,
    },
    chevronButton: {
      width: 30,
      // marginLeft: 10
    },
  };

  // DATA
  const _nav = GetItems();

  return (
    <React.Fragment>
      {/* close */}
      <ActionButton
        iconProps={iconProps}
        styles={buttonStyles}
        onClick={handleOnReturn}
      >
        {t("return")}
      </ActionButton>

      {/* Project */}
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={100}
        autoHeightMax="calc(100vh - 75px)"
      >
        <Nav
          selectedKey={selectedKey}
          ariaLabel="Methodology menu"
          styles={navStyles}
          groups={_nav}
          onLinkClick={handleNavOnClick}
        />
      </Scrollbars>
    </React.Fragment>
  );
}
