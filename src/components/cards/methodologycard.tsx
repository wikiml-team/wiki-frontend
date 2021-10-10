
import { DocumentCard, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit,
    PrimaryButton,
    mergeStyleSets,
    DefaultButton,
    Stack,
    IButtonStyles,
    useTheme
} from '@fluentui/react'

import canadian from "./logos/canadian.png"
import german from "./logos/german.png"
import autralian from "./logos/australian.png"
import styled from 'styled-components'
import { useState } from 'react'
import { Centered, CenteredHorizontal } from 'components/styled/centered'

type MethodologyCardProps = {
    name : string,
    href?: string,
    onClick?: () => void
}

const pic_dict = {
  "canadian" : canadian,
  "german" : german,
  "australian": autralian
}

export default function MethodologyCard(props : MethodologyCardProps) {

  const { name, href, onClick } = props;
  const { palette } = useTheme()

  const [displayContent, setDisplayContent] = useState(false)
  
  const classes = mergeStyleSets({
      cardContent: {
        opacity: displayContent? "35%" : "inherit"
      }
  })

  const cardStyles: IDocumentCardStyles = {
      root: { 
          display: 'inline-block', 
          margin: "20px 20px 20px 0", 
          width: 250 
      },
  };

  const buttonStyles : IButtonStyles = {
    root: {
      backgroundColor: palette.themeDark
    }
  }


  return (
      <DocumentCard
          onClickHref={href}
          onClick={onClick}
          styles={cardStyles}
          onMouseEnter={() => setDisplayContent(true)}
          onMouseLeave={() => setDisplayContent(false)}
        >
          <div className={classes.cardContent}>
            <DocumentCardImage 
              height={90} 
              imageFit={ImageFit.cover} 
              imageSrc={pic_dict["canadian"]} 
              />
            <DocumentCardDetails>
              <DocumentCardTitle title={name} showAsSecondaryTitle />
            </DocumentCardDetails>
          </div>

          {displayContent && (<DisplayOver>
            <Centered>

              <Stack horizontal tokens={{childrenGap: 10}}>
                <PrimaryButton
                  text="Read"
                  onClick={()=> {}} 
                  styles={buttonStyles}
                  />
                <PrimaryButton 
                  text="Edit" 
                  onClick={()=> {}} 
                  />
              </Stack>
            </Centered>
          </DisplayOver>)}
      </DocumentCard>
  )
}

const DisplayOver = styled.div({
  height: "100%",
  left: "0",
  position: "absolute",
  top: "0",
  width: "100%",
  zIndex: 2,
  transition: "background-color 350ms ease",
  backgroundColor: "transparent",
  padding: "20px 20px",
  boxSizing: "border-box",
});
