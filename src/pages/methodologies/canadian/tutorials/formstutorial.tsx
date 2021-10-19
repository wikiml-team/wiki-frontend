import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { DetailsList, 
        IColumn, 
        ITextStyles, 
        SelectionMode, 
        Text, 
        FontWeights} from "@fluentui/react";

import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import { IForm } from "models/workplace";

export default function FormsTutorials() {
  // LOGIC
  const { t } = useTranslation("tutorials", { keyPrefix: "forms"});
  const tforms = useTranslation("forms").t;

  const { tabsSchema } = useSelector(selectWorkplaceConfig);

  const forms : IForm[] = tabsSchema.findForms()

  const columns: IColumn[] = [
    {
        key: 'column1',
        name: t(`form-table-header`),
        fieldName: 'form',
        minWidth: 100,
        maxWidth: 200,
        isMultiline: true,
        data: 'string',
        onRender: (item: IForm) => formRender(item)
    },
    {
      key: 'column2',
      fieldName: 'description',
      name: t(`description-table-header`),
      minWidth: 100,
      isMultiline: true,
      data: 'string',
      onRender: (item: IForm) => descriptionRender(item)
    },
  ]

  const formRender = (form: IForm) => {

    const handleOnClick = (item : React.MouseEvent<HTMLElement, MouseEvent>) => {

    }

    const textStyles : ITextStyles = {
      root: {
        fontWeight: FontWeights.semibold
      }
    }
    return (
        <Text variant="medium" styles={textStyles} onClick={(item) => handleOnClick(item)}>
          {tforms(`${form.name}.header`)}
        </Text>
    )
  }

  const descriptionRender = (form: IForm) => {
    return (
      <Text variant="medium">
       {t(form.description || "")}
      </Text>
    )
  }



  return <DetailsList
            items={forms}
            columns={columns}
            selectionMode={SelectionMode.none}
            // isHeaderVisible={false}
        />
}
