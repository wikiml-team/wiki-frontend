import { IconButton, useTheme } from "@fluentui/react";

export default function AddButton() {
  const { palette } = useTheme();

  return (
    <IconButton
      iconProps={{ iconName: "CircleAddition" }}
      styles={{ root: { color: palette.black } }}
      onClick={() => alert("Add an instrument")}
    />
  );
}
