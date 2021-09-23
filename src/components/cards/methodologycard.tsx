import { DocumentCard, 
    DocumentCardActivity, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit
} from '@fluentui/react'
import canadian from "./logos/canadian.png"
import german from "./logos/german.png"
import autralian from "./logos/australian.png"


type MethodologyCardProps = {
    name : string
}

const pic_dict = {
  "canadian" : canadian,
  "german" : german,
  "australian": autralian
}

export default function MethodologyCard(props : MethodologyCardProps) {

    const cardStyles: IDocumentCardStyles = {
        root: { 
            display: 'inline-block', 
            margin: "20px 20px 20px 0", 
            width: 250 
        },
      };

    return (
    <>
      <DocumentCard
        onClickHref="/workplace"
        styles={cardStyles}
      >
        <DocumentCardImage 
          height={90} 
          imageFit={ImageFit.cover} 
          imageSrc={pic_dict["canadian"]} 
        />
        <DocumentCardDetails>
          <DocumentCardTitle title={props.name} showAsSecondaryTitle />
        </DocumentCardDetails>
      </DocumentCard>
      </>
    )
}
