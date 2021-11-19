import { useSpring, animated } from "react-spring";

import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardImage,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardStyles,
  ImageFit,
  Overlay,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import GetCardColor from "themes/cardtheme";
import canadian from "./logos/canadian.png";
import german from "./logos/german.png";
import autralian from "./logos/australian.png";

type MethodologyCardProps = {
  name: string;
  href?: string;
  onClick?: () => void;
  contentToDisplay?: JSX.Element;
  addCard?: boolean;
};

const pic_dict = {
  canadian: canadian,
  german: german,
  australian: autralian,
};

export default function MethodologyCard(props: MethodologyCardProps) {
  const { name, href, onClick, contentToDisplay, addCard } = props;

  // LOGIC
  const [displayContent, { toggle: toggleDisplayContent }] = useBoolean(false);

  const handleOnMouseEnter = () => contentToDisplay && toggleDisplayContent();
  const handleOnMouseLeave = () => contentToDisplay && toggleDisplayContent();

  // STYLES
  const previewProps: IDocumentCardPreviewProps = {
    previewImages: [
      {
        width: 250,
        height: 90,
      },
    ],
    styles: {
      root: {
        background: GetCardColor(),
        backgroundColor: "rgb(254, 163, 170)",
      },
    },
  };

  const cardStyles: IDocumentCardStyles = {
    root: {
      display: "inline-block",
      width: 250,
    },
  };

  // animations
  const fadeStyles = useSpring({
    opacity: displayContent ? 0.25 : 1,
  });

  const mountStyles = useSpring({
    opacity: displayContent ? 1 : 0,
  });

  return (
    <DocumentCard
      onClickHref={href}
      onClick={onClick ?? (() => null)}
      styles={cardStyles}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <animated.div style={fadeStyles}>
        {addCard ? (
          <DocumentCardPreview {...previewProps} />
        ) : (
          <DocumentCardImage
            height={90}
            imageFit={ImageFit.cover}
            imageSrc={pic_dict["canadian"]}
          />
        )}
        <DocumentCardDetails>
          <DocumentCardTitle title={name} showAsSecondaryTitle />
        </DocumentCardDetails>
      </animated.div>

      <animated.div style={mountStyles}>
        <Overlay>{contentToDisplay}</Overlay>
      </animated.div>
    </DocumentCard>
  );
}
