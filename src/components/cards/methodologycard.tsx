import { useSpring, animated } from 'react-spring'

import { DocumentCard, 
    DocumentCardDetails, 
    DocumentCardImage, 
    DocumentCardTitle, 
    IDocumentCardStyles, 
    ImageFit,
} from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';

import canadian from "./logos/canadian.png"
import german from "./logos/german.png"
import autralian from "./logos/australian.png"

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

  const [displayContent, {toggle: toggleDisplayContent}] = useBoolean(false);

  const handleOnMouseEnter = () => contentToDisplay && toggleDisplayContent();

  const handleOnMouseLeave = () => contentToDisplay && toggleDisplayContent();
  
  // STYLES
  const cardStyles: IDocumentCardStyles = {
      root: { 
          display: 'inline-block', 
          margin: "20px 20px 20px 0", 
          width: 250 
      },
  };

  const fadeStyles = useSpring({
    opacity: displayContent ? 0.25 : 1
  });

  const mountStyles = useSpring({
    opacity: displayContent ? 1 : 0
  });

  return (
      <DocumentCard
          onClickHref={href}
          onClick={onClick?? (() => null)}
          styles={cardStyles}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <animated.div style={fadeStyles}>
            <DocumentCardImage 
              height={90} 
              imageFit={ImageFit.cover} 
              imageSrc={pic_dict["canadian"]} 
              />
            <DocumentCardDetails>
              <DocumentCardTitle title={name} showAsSecondaryTitle />
            </DocumentCardDetails>
          </animated.div>

          <animated.div style={mountStyles}>
            {contentToDisplay}
          </animated.div>
      </DocumentCard>
  )
}


