import { useTranslation } from "react-i18next";

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  FontSizes,
  IDocumentCardStyles,
  IDocumentCardTitleStyles,
  useTheme,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { IFeaturedProject } from "pages/filemenu/home";

type StaredProjectsProps = {
  project: IFeaturedProject;
};

export default function StaredProjects(props: StaredProjectsProps) {
  const { id, name, methodology, owner, createdAt } = props.project;

  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "home" });

  // const actions = GetCardActions();
  const date = new Date(createdAt).toLocaleDateString();

  // STYLES
  const cardStyles: IDocumentCardStyles = {
    root: {
      display: "inline-block",
      margin: "20px 20px 20px 0",
      width: 10,
    },
  };

  const cardTitleStyles: IDocumentCardTitleStyles = {
    root: {
      fontSize: FontSizes.mediumPlus,
      height: 20,
      paddingBottom: 2,
    },
  };

  return (
    <DocumentCard styles={cardStyles} >
      <a href={`/workplace/${id}`}>
      <DocumentCardTitle title={name} styles={cardTitleStyles} />
      <DocumentCardTitle title={methodology} showAsSecondaryTitle />

      <DocumentCardActivity
        activity={`${t("starprojects-createdAt")} ${date}`}
        people={[{ name: owner, profileImageSrc: "" }]}
      />
      </a>
      {/* <DocumentCardActions actions={actions} /> */}
    </DocumentCard>
  );
}

const GetCardActions = () => {
  const [isFavorite, { toggle: toggleIsFavorite }] = useBoolean(true);
  const { palette } = useTheme();

  const handleOnClick = () => {
    toggleIsFavorite();
    // update in database

  };

  const starIconProps = {
    iconName: "FavoriteStarFill",
    styles: {
      root: {
        color: isFavorite ? palette.yellowDark : palette.accent,
      },
    },
  };

  const notificationsIconProps = {
    iconName: "FavoriteStarFill",
    styles: {
      root: {
        color: isFavorite ? palette.yellowDark : palette.accent,
      },
    },
  };

  const documentCardActions = [
    {
      iconProps: starIconProps,
      onClick: handleOnClick,
      ariaLabel: "unstar",
    },
    {
      iconProps: { iconName: "Ringer" },
      onClick: () => {},
      ariaLabel: "notifications action",
    },
  ];

  return documentCardActions;
};
