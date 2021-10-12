import { DocumentCard, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    useTheme,
    FontSizes,
    IDocumentCardTitleStyles,
    DocumentCardActivity,
    DocumentCardActions,
    IIconProps
} from '@fluentui/react';

type StaredProjectsProps = {
    projectName : string,
    methodology: string
}

export default function StaredProjects(props : StaredProjectsProps) {

    // STYLES
    const { palette } = useTheme();

    const cardStyles: IDocumentCardStyles = {
        root: { 
            display: 'inline-block', 
            margin: "20px 20px 20px 0", 
            width: 10
        },

      };

    const cardTitleStyles: IDocumentCardTitleStyles = {
        root: {
            fontSize: FontSizes.mediumPlus,
            height: 20,
            paddingBottom: 2
        }
    }

    const starIconProps: IIconProps = {
        iconName: 'FavoriteStarFill',
        styles: {
            root: {
                color: palette.yellowDark,
            }
        }
    };

    const documentCardActions = [
        {
          iconProps: starIconProps,
          onClick: () => {},
          ariaLabel: 'unstar',
        },
        {
          iconProps: { iconName: 'Pin' },
          onClick: () => {},
          ariaLabel: 'pin action',
        },
        {
          iconProps: { iconName: 'Ringer' },
          onClick: () => {},
          ariaLabel: 'notifications action',
        },
      ];

    return (
      <DocumentCard
        styles={cardStyles}
        onClickHref="/workplace"
      >
        {/* <DocumentCardLogo {...logoProps} /> */}

        <DocumentCardTitle title={props.projectName} styles={cardTitleStyles}/>
        <DocumentCardTitle title={props.methodology} showAsSecondaryTitle/>

        <DocumentCardActivity
            activity="Created Feb 23, 2016"
            people={[{ name: 'Annie Lindqvist', profileImageSrc: '', initials: 'RK'  }]}
            />
        <DocumentCardActions actions={documentCardActions} views={432} />
      </DocumentCard>
    )
}
