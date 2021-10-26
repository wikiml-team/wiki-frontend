import { useTranslation } from "react-i18next";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Text } from "@fluentui/react";

interface ISector {
  key: string
  name: string
  description?: string
}

const sectors : ISector[] = [
  {
      key: "key1",
      name: "agriculture",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key2",
      name: "economic",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key3",
      name: "rights",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key4",
      name: "development",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key5",
      name: "energy",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key6",
      name: "infrastructure",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key7",
      name: "environment",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key8",
      name: "migration",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  },
  {
      key: "key9",
      name: "tecnology",
      description: "lorem ipsum dolore ap salir, tori de salg fre wons te dienr."
  }
]

export default function SectorsTutorials() {

  // LOGIC
  const { t } = useTranslation("tutorials", { keyPrefix: "sectors"});

  const columns: IColumn[] = [
    {
        key: 'column1',
        name: t('sector-title'),
        fieldName: 'sector',
        flexGrow: 1,
        minWidth: 100,
        maxWidth: 350,
        data: 'string',
        isMultiline: true, 
        isCollapsible: true,
        isResizable: true,
        onRender: (item: ISector) => sectorRender(item)
    },
    {
        key: 'column2',
        name: t('description-title'),
        fieldName: 'description',
        minWidth: 100,
        flexGrow: 5,
        isMultiline: true, 
        data: 'string',
        onRender: (item: ISector) => descriptionRender(item),
        isPadded: true,
      },
  ]

  const sectorRender = (sector: ISector) => {
    return (
      <Text variant="medium">
       {t(sector.name)}
    </Text>
    )
  }

  const descriptionRender = (sector: ISector) => {
    return (
      <Text variant="medium">
       {sector.description || ""}
      </Text>
    )
  }

  return <DetailsList
            items={sectors}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
        />
}
