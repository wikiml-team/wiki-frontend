
import { DocumentCard, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit,
    mergeStyleSets,
} from '@fluentui/react'

import canadian from "./logos/canadian.png"
import german from "./logos/german.png"
import autralian from "./logos/australian.png"
import { useState } from 'react'

type MethodologyCardProps = {
    name : string,
    href?: string,
    onClick?: () => void,
    contentToDisplay?: JSX.Element
}

const pic_dict = {
  "canadian" : canadian,
  "german" : german,
  "australian": autralian
}

export default function MethodologyCard(props : MethodologyCardProps) {

  // LOGIC
  const { name, href, onClick, contentToDisplay } = props;

  const [displayContent, setDisplayContent] = useState(false);

  const handleOnMouseEnter = () => setDisplayContent(contentToDisplay? true: false);

  const handleOnMouseLeave = () => setDisplayContent(false);
  
  // STYLES
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


  return (
      <DocumentCard
          onClickHref={href}
          onClick={onClick?? (() => null)}
          styles={cardStyles}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
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

          {displayContent && contentToDisplay}
      </DocumentCard>
  )
}


