import { useTranslation } from "react-i18next";
import { DetailsList, IColumn, SelectionMode, Text } from "@fluentui/react";
import { useSelector } from "react-redux";
import { selectWorkplaceConfig } from "store/slices/workplaceslice";

interface IForm {
  key: string;
  name: string
}

export default function FormsTutorials() {
  // LOGIC
  const { t } = useTranslation("pages");

  const { tabsSchema } = useSelector(selectWorkplaceConfig);

  const forms : IForm[] = tabsSchema.findByKey("key2").childtabs?.map((c, i) => {
    return ({ key: `key${i}`, name: c.name} as IForm)}) || [] as IForm[]

  const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'forms',
        fieldName: 'forms',
        minWidth: 100,
        data: 'string',
        onRender: (item: IForm) => formRender(item)
    },
  ]

  const formRender = (form: IForm) => {
    return (
      <Text variant="medium">
       {t(form.name)}
    </Text>
    )
  }

  return <DetailsList
            items={forms}
            columns={columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
        />
}
