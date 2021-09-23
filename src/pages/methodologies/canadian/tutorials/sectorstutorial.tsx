import { useTranslation } from "react-i18next";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react";

interface ISector {
  key: string;
  name: string;
}

const sectors : ISector[] = [
  {
      key: "key1",
      name: "agriculture-nutrition",
  },
  {
      key: "key2",
      name: "economic-growth",
  },
  {
      key: "key3",
      name: "human-rights",
  },
  {
      key: "key4",
      name: "human-development",
  },
  {
      key: "key5",
      name: "energy",
  },
  {
      key: "key6",
      name: "infrastructure",
  },
  {
      key: "key7",
      name: "environment",
  },
  {
      key: "key8",
      name: "migration",
  },
  {
      key: "key9",
      name: "tecnology",
  }
]

export default function SectorsTutorials() {

  // LOGIC
  const { t } = useTranslation("sectors");

  const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'sector',
        fieldName: 'sector',
        minWidth: 100,
        data: 'string',
        onRender: (item: ISector) => t(item.name)
    },

]
  return <DetailsList
            items={sectors}
            columns={columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
            // layoutMode={DetailsListLayoutMode.fixedColumns}
        />
}
