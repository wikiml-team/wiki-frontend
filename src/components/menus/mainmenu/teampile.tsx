import React from "react";

import {
  Facepile,
  IButtonProps,
  IFacepilePersona,
  IFacepileStyles,
  OverflowButtonType,
  PersonaInitialsColor,
  PersonaSize,
} from "@fluentui/react";

export default function TeamPile() {

  // Data
  const faces: IFacepilePersona[] = [
    {
      personaName: "Gabriela Rodríguez",
      initialsColor: PersonaInitialsColor.gray,
    },
    {
      personaName: "Amaury Díaz",
      initialsColor: PersonaInitialsColor.gold,
    },
    {
      personaName: "Iliana Hernandez",
      initialsColor: PersonaInitialsColor.lightGreen,
    },
    {
      personaName: "Laura Rodríguez",
      initialsColor: PersonaInitialsColor.warmGray,
    },
    {
      personaName: "Lili Masters",
      initialsColor: PersonaInitialsColor.blue,
    },
    {
      personaName: "Susana Naranjo",
      initialsColor: PersonaInitialsColor.green,
    },
    {
      personaName: "Lupe Dantes",
      initialsColor: PersonaInitialsColor.darkBlue,
    },
    {
      personaName: "Karen Ganter",
      initialsColor: PersonaInitialsColor.lightGreen,
    },
    {
      personaName: "Josephine Filipie",
      initialsColor: PersonaInitialsColor.purple,
    },
    {
      personaName: "Daniel Hertys",
      initialsColor: PersonaInitialsColor.orange,
    },
  ];

  // STYLES
  const overflowButtonProps: IButtonProps = {
    ariaLabel: "More users",
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
      alert("overflow icon clicked"),
  };

  const addButtonProps = () => ({
    ariaLabel: "Add a new person",
    href: "/",
  });

  const FacePileStyles: Partial<IFacepileStyles> = {
    root: {
      position: "absolute",
      top: 38,
      right: 8,
      zIndex: 10,
    },
    itemButton: {
      margin: "0 -2px 0 -2px",
    },
  };

  return (
    <Facepile
      personas={faces}
      personaSize={PersonaSize.size24}
      maxDisplayablePersonas={4}
      overflowButtonProps={overflowButtonProps}
      overflowButtonType={OverflowButtonType.descriptive}
      addButtonProps={addButtonProps()}
      ariaDescription="To move through the items use left and right arrow keys."
      styles={FacePileStyles}
    />
  );
}
