import React, { ReactElement, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useRotate, useTheme } from "../hooks";

import "./rotating-page.scss";

export interface FrameSection {
  title: string;
  content: ReactElement[];
}

export const Section: React.FC<{
  title: string;
  children: ReactElement[] | ReactElement;
  className?: string;
  sectionZoomStyle?: { transform: string };
}> = ({ title, children, className, sectionZoomStyle }) => {
  const iterableChildren: ReactElement[] = Array.isArray(children)
    ? children
    : [children];
  return (
    <section
      id={title.toLowerCase()}
      key={`section-${title.toLowerCase()}`}
      className={className}
    >
      <div className="zoom-container" style={sectionZoomStyle}>
        <h1 className="screen-reader">{title}</h1>
        <ContentSelector section={title}>{iterableChildren}</ContentSelector>
      </div>
    </section>
  );
};

export const ContentSelector: React.FC<{
  section: string;
  children: ReactElement[];
}> = ({ section, children }): ReactElement => {
  const [selectedElement, setSelectedElement] = useState(0);
  const lastChildIndex = children.length - 1;
  const incrementElement = () => {
    setSelectedElement(Math.min(selectedElement + 1, lastChildIndex));
  };
  const decrementElement = () => {
    setSelectedElement(Math.max(selectedElement - 1, 0));
  };
  const handlers = useSwipeable({
    onSwipedLeft: incrementElement,
    onSwipedRight: decrementElement,
  });
  return (
    <div
      className="paragraph-selector__container"
      {...handlers}
      style={{ touchAction: "pan-y" }}
    >
      {children.map((element, idx) => {
        return (
          <div
            className={`paragraph-selector__content${
              idx < selectedElement ? " paragraph-selector__content--left" : ""
            }${
              idx > selectedElement ? " paragraph-selector__content--right" : ""
            }`}
            key={`section-${section}-para-${idx}`}
          >
            {element}
          </div>
        );
      })}
      <nav className="paragraph-selector__controls" role="presentation">
        {selectedElement > 0 && (
          <button
            className="paragraph-selector__prev"
            onClick={decrementElement}
          >
            &lt;
          </button>
        )}
        {selectedElement < children.length - 1 && (
          <button
            className="paragraph-selector__next"
            onClick={incrementElement}
          >
            &gt;
          </button>
        )}
      </nav>
    </div>
  );
};

export const RotatingPage: React.FC<{
  isScrollDisabled?: boolean;
  isLinksDisabled?: boolean;
  overrideRotation?: number;
}> = ({ isScrollDisabled, isLinksDisabled, overrideRotation, children }) => {
  const { rotation, zoomFactor, setRotation } = useRotate(!!isScrollDisabled);
  const { theme } = useTheme();
  useEffect(() => {
    setRotation(overrideRotation ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideRotation]);

  const spinContainerRotateStyle = { transform: `rotate(-${rotation}deg)` };
  const sectionZoomStyle = { transform: `scale(${zoomFactor})` };
  const isSectionVisible: { [key: string]: boolean } = {
    one: rotation < 45 || rotation >= 315,
    two: rotation >= 45 && rotation < 135,
    three: rotation >= 135 && rotation < 225,
    four: rotation >= 225 && rotation < 315,
  };
  const makeSectionClasses = (sectionIndex: number): string => {
    let sectionNumber: string;
    switch (sectionIndex) {
      case 3:
        sectionNumber = "four";
        break;
      case 2:
        sectionNumber = "three";
        break;
      case 1:
        sectionNumber = "two";
        break;
      default:
        sectionNumber = "one";
    }
    const classes = `section section--${sectionNumber}`;
    if (!isSectionVisible[sectionNumber]) {
      return "section screen-reader";
    }
    return classes;
  };
  const styledChildren = React.Children.map(children, (child, idx) => {
    return React.cloneElement(child as ReactElement, {
      className: makeSectionClasses(idx),
      sectionZoomStyle,
    });
  });
  return (
    <div
      className={`scroll-height-container ${
        isScrollDisabled ? "scroll-height-container--no-scroll " : ""
      }theme--${theme}`}
    >
      <div className="spin-container" style={spinContainerRotateStyle}>
        <nav className="nav-frame">
          {React.Children.map(children, (child, idx) => {
            const { title } = (child as JSX.Element).props;
            return (
              <div
                className="nav-frame__link"
                key={`nav-link-${title.toLowerCase()}`}
              >
                {isLinksDisabled ? (
                  <span>{title}</span>
                ) : (
                  <a
                    href={`#${title.toLowerCase()}`}
                    onClick={() => setRotation(idx * 90)}
                  >
                    {title}
                  </a>
                )}
              </div>
            );
          })}
        </nav>
        {styledChildren}
      </div>
    </div>
  );
};
