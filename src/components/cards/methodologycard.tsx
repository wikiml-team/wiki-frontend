import { DocumentCard, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit
} from '@fluentui/react'

type MethodologyCardProps = {
    name : string
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
      <DocumentCard
        styles={cardStyles}
        onClickHref="#/workplace"
      >
        <DocumentCardImage 
          height={150} 
          imageFit={ImageFit.cover} 
          imageSrc="../../../public/australian.png" 
        />
        <DocumentCardDetails>
          <DocumentCardTitle title={props.name} />
        </DocumentCardDetails>
        {/* <DocumentCardActivity activity="Modified March 13, 2018" people={people.slice(0, 3)} /> */}
      </DocumentCard>
    )
}
