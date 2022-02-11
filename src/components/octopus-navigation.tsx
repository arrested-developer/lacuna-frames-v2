import { useState, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useTheme, useInterval } from "../hooks";

import "./octopus-navigation.scss";
import octopus from "../images/octopus-large.jpeg";

enum PageName {
  about = "about",
  contact = "contact",
  quote = "quote",
  gallery = "gallery",
}

const pages = Object.values(PageName);

console.log("render");

const OctopusNavigation: FunctionComponent<{
  pageTitle: string;
  isBlinkLinkButtons?: boolean;
  hideOctopus?: boolean;
}> = ({ pageTitle, isBlinkLinkButtons, hideOctopus }) => {
  const [blinking, setBlinking] = useState<PageName | null>(null);
  useInterval(
    () => {
      // Your custom logic here
      const current = pages.indexOf(blinking as PageName);
      setBlinking(pages[current + 1]);
    },
    // Delay in milliseconds or null to stop it
    isBlinkLinkButtons ? 500 : null
  );
  const [linkText, setLinkText] = useState("");
  const { theme } = useTheme();
  return (
    <div className={`theme--${theme}`}>
      <header className="navigation-header">
        <Link to="/">
          <h1 className="navigation-header__site-title">Lacuna</h1>
        </Link>
      </header>
      {!hideOctopus && (
        <div className="navigation-octopus">
          <div className="navigation-octopus__image">
            <span className="navigation-octopus__image-wrapper">
              <img src={octopus} alt="navigation" />
              <Link
                to="/contact"
                onMouseOver={() => setLinkText("Contact")}
                onMouseOut={() => setLinkText("")}
              >
                <div
                  className={`navigation-octopus__link-dot navigation-octopus__link-dot--contact${
                    blinking === PageName.contact
                      ? " navigation-octopus__link-dot--blink"
                      : ""
                  }`}
                />
              </Link>
              <Link
                to="/about"
                onMouseOver={() => setLinkText("About")}
                onMouseOut={() => setLinkText("")}
              >
                <div
                  className={`navigation-octopus__link-dot navigation-octopus__link-dot--about${
                    blinking === PageName.about
                      ? " navigation-octopus__link-dot--blink"
                      : ""
                  }`}
                />
              </Link>
              <a
                href="https://www.instagram.com/lacunaframes/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={() => setLinkText("Gallery")}
                onFocus={() => setLinkText("Gallery")}
                onMouseOut={() => setLinkText("")}
                onBlur={() => setLinkText("")}
              >
                <div
                  className={`navigation-octopus__link-dot navigation-octopus__link-dot--gallery${
                    blinking === PageName.gallery
                      ? " navigation-octopus__link-dot--blink"
                      : ""
                  }`}
                />
              </a>
              <Link
                to="/quote"
                onMouseOver={() => setLinkText("Quote")}
                onMouseOut={() => setLinkText("")}
              >
                <div
                  className={`navigation-octopus__link-dot navigation-octopus__link-dot--quote${
                    blinking === PageName.quote
                      ? " navigation-octopus__link-dot--blink"
                      : ""
                  }`}
                />
              </Link>
            </span>
          </div>
        </div>
      )}
      <div className="navigation-footer">
        <h2 className="navigation-footer__page-title">
          {linkText || pageTitle}
        </h2>
      </div>
    </div>
  );
};

export default OctopusNavigation;
