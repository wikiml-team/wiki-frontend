
import { DocumentCard, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit
} from '@fluentui/react'
import canadian from "./logos/canadian.png"
import german from "./logos/german.png"
import autralian from "./logos/australian.png"
import React from 'react'


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

    const cardStyles: IDocumentCardStyles = {
        root: { 
            display: 'inline-block', 
            margin: "20px 20px 20px 0", 
            width: 250 
        },
      };

  return (
    <React.Fragment>
      <DocumentCard
          onClickHref={href}
          onClick={onClick}
          styles={cardStyles}
        >
          <DocumentCardImage 
            height={90} 
            imageFit={ImageFit.cover} 
            imageSrc={pic_dict["canadian"]} 
          />
          <DocumentCardDetails>
            <DocumentCardTitle title={name} showAsSecondaryTitle />
          </DocumentCardDetails>
      </DocumentCard>
    </React.Fragment>
  )
}
