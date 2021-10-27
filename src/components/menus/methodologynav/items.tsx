import { useTranslation } from "react-i18next"

import { INavLinkGroup } from "@fluentui/react"
import tabsConfiguration from "pages/forms/canadian/tabsconfiguration"
import { useHistory } from "react-router"

export const GetItems = () => {

    const { t } = useTranslation("menuheaders", { keyPrefix: "methodology" })
    const t_forms = useTranslation(["forms", "licitations", "tutorials"]).t

    const history = useHistory()
    const { pathname } = history.location

    const data = [{
            key: 'project',
            ns: 'forms'
        },
        {
            key: 'licitations',
            ns: 'licitations'
        },
        {
            key: 'methodology',
            ns: 'tutorials'
        }
    ]

    const menuSet = data.map(pair => {

        const index = [{
            key: `${pair.key}_index`,
            name: t('index'),
            url: '/methodology'
        }]
        const links = tabsConfiguration.findByName(pair.key).childtabs?.map(tab => {
            return {
                key: tab.name,
                name: t_forms(`${pair.ns}:${tab.name}.header`),
                url: `${pathname}/${tab.name}`,
            }
        }) || []

        return {
            name: t(pair.ns),
            links: index.concat(links),
            isExpanded: true
        } as INavLinkGroup
    })


    return [
        {
            links: menuSet
        }
    ] as INavLinkGroup[]

}