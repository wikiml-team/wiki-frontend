import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { ILinkStyles, 
        Link, 
        Text, 
        FontSizes, 
        mergeStyleSets, 
        DetailsList, 
        SelectionMode, 
        IColumn,
        Checkbox } from '@fluentui/react'

import { selectWorkplaceConfig } from 'store/slices/workplaceslice'
import { IForm } from 'models/workplace'

export default function Privacy() {
    
    const { t } = useTranslation("settings", { keyPrefix: "privacy-page"})
    const t1 = useTranslation('forms').t

    const { tabsSchema } = useSelector(selectWorkplaceConfig);
    const forms : IForm[] = tabsSchema.findForms()

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: t("table-forms"),
            fieldName: 'forms',
            minWidth: 100,
            maxWidth: 300,
            data: 'string',
            onRender: (item: IForm) => formRender(item)
        },
        {
            key: 'column2',
            name: t("table-privacy"),
            fieldName: 'Private',
            minWidth: 100,
            data: 'string',
            onRender: (item: IForm) => checkboxRender(item)
        },
    ]

    // STYLES
    const classes = mergeStyleSets({
        title: {
            marginBottom: 20,
            display: 'block',
        },
        subtitle: {
            margin: "30px 0 5px 0",
            display: 'block',
        },
    });

    const linkStyles : ILinkStyles = {
        root: {
            fontSize: FontSizes.smallPlus
        }
    }

    const formRender = (form: IForm) => {
        return (
          <Text variant="medium">
           {t1(`${form.name}.header`)}
          </Text>
        )
    }

    const checkboxRender = (from: IForm) => {
        return (
            <Checkbox />
        )
    }

    return (
        <React.Fragment>
            <Text variant='xLarge' className={classes.title}>{t("header")}</Text>
            
            {/* Welcome */}
            <Text variant='large' className={classes.subtitle}>{t("welcome-subtitle")}</Text>
            <Text variant='medium' block >{t("welcome-description")}</Text>
            <Link href="" styles={linkStyles}>{t("commitment-to-privacy-link")}</Link>

            {/* Set Privacy */}
            <Text variant='large' className={classes.subtitle}>{t("management-subtitle")}</Text>
            <Text variant='medium' block >{t("management-description")}</Text>
            <DetailsList
            items={forms}
            columns={columns}
            selectionMode={SelectionMode.none}
        />
        </React.Fragment>
    )
}
