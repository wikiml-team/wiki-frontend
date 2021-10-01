import { CommandBarButton, 
        IButtonProps, 
        IContextualMenuItemStyles, 
        useTheme, 
        concatStyleSets,
        FontSizes } from "@fluentui/react";

export function CustomBarButton(props: IButtonProps) {

    const { palette } = useTheme();

    const itemStyles: IContextualMenuItemStyles = {
        root: {
            backgroundColor: palette.themePrimary,
            fontSize: FontSizes.medium,
            padding: "10px 10px",
            borderRightColor: "5px solid red" 
        },
        rootHovered: {
            backgroundColor: palette.themeDark
        },
        rootPressed: {
            backgroundColor: palette.themeDarker
        },
        icon: {
            color: palette.white,
            fontSize: FontSizes.small,
        },
        iconHovered: {
            color: palette.white
        },
        iconPressed: {
            color: palette.white
        },
        label: {
            color: palette.white
        },
        labelHovered: {
            color: palette.white
        },
    };

    return <CommandBarButton {...props} styles={concatStyleSets(props.styles, itemStyles)} />;

};