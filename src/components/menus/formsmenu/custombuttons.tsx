import React from 'react'
import {
    useTheme,
    CommandBarButton,
    IconButton,
    IContextualMenuItemStyles,
    IButtonProps,
    concatStyleSets,
    FontSizes,
    IPalette,
    FontWeights
} from '@fluentui/react';

export function CustomBarButton(props: IButtonProps) {

    const { palette } = useTheme();

    const itemStyles: Partial<IContextualMenuItemStyles> = {
        root: {
            height: "inherit",
            backgroundColor: palette.neutralLight,
            fontSize: FontSizes.small,
        },
        rootHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
        },
        rootPressed: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
        },
        rootExpanded: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
        },
        rootExpandedHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
        },
        icon: {
            color: palette.black,
            fontSize: FontSizes.small
        },
        iconHovered: {
            color: palette.black,
        },
        iconPressed: {
            color: palette.black,
        }
    };

    return <CommandBarButton {...props} styles={concatStyleSets(props.styles, itemStyles)} />;

};

export function CustomOverflowButton(props: IButtonProps) {

    const { palette } = useTheme();

    const itemStyles: Partial<IContextualMenuItemStyles> = {
        root: {
            height: "inherit",
            backgroundColor: palette.neutralLight,
            fontSize: FontSizes.small,
        },
        rootHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
        },
        rootPressed: {
            backgroundColor: palette.neutralTertiaryAlt,
            color: palette.black,
        },
        rootExpanded: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
        },
        rootExpandedHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
        },
        icon: {
            color: palette.black,
            fontSize: FontSizes.medium
        },
        iconHovered: {
            color: palette.black,
        }
    };

    return <CommandBarButton {...props} styles={concatStyleSets(props.styles, itemStyles)} />;

};

// Overflow Button Props
export const overflowProps = (palette: IPalette) => {
    return {
        ariaLabel: "More forms",
        menuProps: {
            styles: {
                subComponentStyles: {
                    menuItem: {
                        icon: { color: palette.black }
                    }
                }
            },
            items: []
        }
    } as Partial<IButtonProps>;
};

// Add Button
export function AddButton() {
    const { palette } = useTheme();

    return (
        <IconButton
            iconProps={{ iconName: "CircleAddition" }}
            styles={{ root: { color: palette.black } }}
            onClick={() => alert("Add an instrument")}
        />
    );
}