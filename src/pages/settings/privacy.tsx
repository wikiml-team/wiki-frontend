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
        Checkbox} from '@fluentui/react'

import { selectWorkplaceConfig } from 'store/slices/workplaceslice'
import { IForm } from 'models/workplace'

export default function Privacy() {
    
    const { t } = useTranslation()
    const t_path = "settings-commands:privacy-page"

    const { tabsSchema } = useSelector(selectWorkplaceConfig);
    const forms : IForm[] = tabsSchema.findForms()

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: t(`${t_path}:table-forms`),
            fieldName: 'forms',
            minWidth: 100,
            maxWidth: 300,
            data: 'string',
            onRender: (item: IForm) => formRender(item)
        },
        {
            key: 'column2',
            name: t(`${t_path}:table-privacy`),
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
            margin: "20px 0 5px 0",
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
           {t(`pages:${form.name}`)}
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
            <Text variant='xLarge' className={classes.title}>{t(`${t_path}:title`)}</Text>
            
            <Text variant='large' className={classes.subtitle}>{t(`${t_path}:welcome-subtitle`)}</Text>
            <Text variant='medium' block >{t(`${t_path}:description`)}</Text>
            <Link href="" styles={linkStyles}>{t(`${t_path}:commitment-to-privacy-link`)}</Link>

            <Text variant='large' className={classes.subtitle}>{t(`${t_path}:management-subtitle`)}</Text>
            
            <DetailsList
            items={forms}
            columns={columns}
            selectionMode={SelectionMode.none}
            // isHeaderVisible={false}
        />
        </React.Fragment>
    )
}
