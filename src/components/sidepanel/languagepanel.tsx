import { Dropdown, Stack } from "@fluentui/react";

export default function LanguagePanel() {
  return (
    <Stack gap={25}>
      <Dropdown
        placeholder="Select a Language"
        label="Language for Data"
        options={[
          { key: "German", text: "German" },
          { key: "Spanish", text: "Spanish" },
          { key: "English", text: "English" },
          { key: "Italian", text: "Italian" },
          { key: "French", text: "French" },
          { key: "Portuguese", text: "Portuguese" },
          { key: "Chinise", text: "Chinise" },
          { key: "Russian", text: "Russian" },
        ]}
      />

      <Dropdown
        placeholder="Select a Language"
        label="Language for User Interface"
        options={[
          { key: "German", text: "German" },
          { key: "Spanish", text: "Spanish" },
          { key: "English", text: "English" },
          { key: "Italian", text: "Italian" },
          { key: "French", text: "French" },
          { key: "Portuguese", text: "Portuguese" },
          { key: "Chinise", text: "Chinise" },
          { key: "Russian", text: "Russian" },
        ]}
      />
    </Stack>
  );
}
