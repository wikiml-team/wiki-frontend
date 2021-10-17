import { useTranslation } from "react-i18next";
import { DetailsList, IColumn, SelectionMode, Text } from "@fluentui/react";

interface ISector {
  key: string;
  name: string;
}

const sectors : ISector[] = [
  {
      key: "key1",
      name: "agriculture",
  },
  {
      key: "key2",
      name: "economic",
  },
  {
      key: "key3",
      name: "rights",
  },
  {
      key: "key4",
      name: "development",
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
  const { t } = useTranslation("tutorials.sectors");

  const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'sector',
        fieldName: 'sector',
        minWidth: 100,
        data: 'string',
        onRender: (item: ISector) => sectorRender(item)
    },
  ]

  const sectorRender = (sector: ISector) => {
    return (
      <Text variant="medium">
       {t(sector.name)}
    </Text>
    )
  }

  return <DetailsList
            items={sectors}
            columns={columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
        />
}
