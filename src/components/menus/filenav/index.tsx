import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import {
  ActionButton,
  FontSizes,
  IButtonStyles,
  IIconProps,
  INavLink,
  INavStyles,
  ISeparatorStyles,
  mergeStyleSets,
  Nav,
  Separator,
  useTheme,
} from "@fluentui/react";

import { GetFooterItems, GetPrimaryItems, GetSecondaryItems } from "./items";

export default function FileMenu() {
  // LOGIC
  const { t } = useTranslation("basics");

  const history = useHistory();

  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const path = history.location.pathname.split("/");
    const key =
      path[path.length - 1] === ""
        ? "key_home"
        : `key_${path[path.length - 1]}`;
    setSelectedKey(key);
  }, [history]);

  const handleNavOnClick = (
    ev?: React.MouseEvent<HTMLElement>,
    item?: INavLink
  ) => {
    if (ev) ev.preventDefault();

    if (item) {
      setSelectedKey(item.key || "key_home");
      history.push(item.url);
    }
  };

  const handleOnReturn = () => {
    history.push("/workplace/1");
  };

  // STYLES
  const { palette } = useTheme();

  const classes = mergeStyleSets({
    footer: {
      a: {
        paddingLeft: 36!,
      },
    },
  });

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
      paddingLeft: 10,
    },
    groupContent: {
      marginBottom: 2,
    },
  };

  // Separator
  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      "::before": {
        margin: "0px 10px",
        height: 0.4,
        background: palette.neutralTertiaryAlt,
      },
    },
  };

  // NAVs
  const nav = GetPrimaryItems();

  const nav_methodologies = GetSecondaryItems();

  const footer_nav = GetFooterItems();

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
      <Nav
        selectedKey={selectedKey}
        ariaLabel="File menu"
        styles={navStyles}
        groups={nav}
        onLinkClick={handleNavOnClick}
      />

      {/* Separator */}
      <Separator styles={separatorStyles} />

      {/* Methodologies */}
      <Nav
        selectedKey={selectedKey}
        ariaLabel="File menu"
        styles={navStyles}
        groups={nav_methodologies}
        onLinkClick={handleNavOnClick}
      />

      {/* Separator */}
      <Separator styles={separatorStyles} />

      {/* footer */}
      <Nav
        selectedKey={selectedKey}
        ariaLabel="File menu"
        styles={navStyles}
        groups={footer_nav}
        className={classes.footer}
        onLinkClick={handleNavOnClick}
      />
    </React.Fragment>
  );
}
