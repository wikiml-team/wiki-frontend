import React from 'react'
import { ICommandBarItemProps, useTheme, CommandBar, ICommandBarStyles } from '@fluentui/react';

import { FormTabs } from 'pages/methodologies/canadian/maintabs';
import { useTranslation } from 'react-i18next';
import { CustomBarButton, CustomOverflowButton, overflowProps, AddButton } from './custombuttons';

type FormsTabsProps = {
    tabs?: FormTabs[];
    addbutton?: boolean;
}

export default function FormsTabs(props: FormsTabsProps) {

    const { tabs, addbutton } = props;

    // STYLES
    const { palette } = useTheme();

    const comandBarStyles: ICommandBarStyles = {
        root: {
            height: 34,
            padding: 0,
            zIndex: 100,
            backgroundColor: palette.neutralLight,
        },
    };

    // LOGIC
    const { t } = useTranslation("pages");

    const items: ICommandBarItemProps[] = tabs ? tabs.map((tab) => {
        return {
            key: tab.key,
            text: t(tab.name),
            iconProps: { iconName: tab.icon },
            href: tab.url
        } as ICommandBarItemProps;
    }) : [];

    return <React.Fragment>
        <CommandBar 
            items={items} 
            buttonAs={CustomBarButton} 
            styles={comandBarStyles} 
            overflowButtonAs={CustomOverflowButton} 
            overflowButtonProps={overflowProps(palette)} />
        {addbutton && <AddButton />}
    </React.Fragment>
}
