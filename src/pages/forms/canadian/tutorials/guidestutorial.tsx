import { useTranslation } from "react-i18next";

import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  ITextStyles,
  Link,
  SelectionMode,
  Text,
} from "@fluentui/react";

interface IDocumnet {
  key: string;
  name: string;
  fileType: string;
  link?: string;
}

const type_dict: { [id: string]: string } = {
  word: "WordDocument",
  excel: "ExcelDocument",
  pdf: "PDF",
  other: "TextDocument",
};

const guides: IDocumnet[] = [
  {
    key: "key1",
    name: "Declaración de Política de Gestión Basada en Resultados 2008",
    fileType: "word",
  },
  {
    key: "key2",
    name: "Gestión basada en los resultados para la programación de la asistencia internacional: Una guía práctica",
    fileType: "other",
    link: "https://www.international.gc.ca/world-monde/funding-financement/results_based_management-gestion_axee_resultats-guide.aspx?lang=eng",
  },
  {
    key: "key3",
    name: "Resultados de la asistencia internacional - Guía para la presentación de informes para los asociados",
    fileType: "word",
  },
  {
    key: "key4",
    name: "Lista de control 1.1: Cómo evaluar y/o revisar un modelo lógico",
    fileType: "word",
  },
  {
    key: "key5",
    name: "Lista de control 2.1: Cómo evaluar y/o revisar un marco de medición del desempeño",
    fileType: "pdf",
  },
  {
    key: "key6",
    name: "Lista de control 5.1: Revisión de los informes de resultados de los encargados de la implementación de Asuntos Globales de Canadá",
    fileType: "pdf",
  },
  {
    key: "key7",
    name: "Hoja de consejos 2.1: Cadenas de resultados y definiciones",
    fileType: "excel",
  },
  {
    key: "key8",
    name: "Hoja de consejos 2.2: Estructura sintáctica de las declaraciones de resultados, productos y actividades",
    fileType: "excel",
  },
  {
    key: "key9",
    name: "Hoja de consejos 2.3: Preguntas y enfoques para la clarificación y el refinamiento de la Teoría del Cambio",
    fileType: "excel",
  },
];

export default function GuidesTutorials() {
  // LOGIC
  const { t } = useTranslation("guides");

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "icon",
      fieldName: "icon",
      minWidth: 20,
      maxWidth: 20,
      onRender: (item: IDocumnet) => iconRender(item),
    },
    {
      key: "column2",
      name: "name",
      fieldName: "name",
      minWidth: 100,
      flexGrow: 1,
      isMultiline: true,
      data: "string",
      isPadded: true,
      onRender: (item: IDocumnet) => linkRender(item),
    },
  ];

  const iconRender = (doc: IDocumnet) => {
    return <IconButton iconProps={{ iconName: type_dict[doc.fileType] }} />;
  };

  const linkRender = (doc: IDocumnet) => {
    const textStyles: ITextStyles = {
      root: {
        lineHeight: "32px",
      },
    };

    return (
      <Text variant="medium" styles={textStyles}>
        <Link href={doc.link} target="_blank">
          {t(doc.name)}
        </Link>
      </Text>
    );
  };

  return (
    <DetailsList
      items={guides}
      columns={columns}
      selectionMode={SelectionMode.none}
      isHeaderVisible={false}
      layoutMode={DetailsListLayoutMode.fixedColumns}
    />
  );
}
