import { useState } from "react";
import { RotatingPage, Section } from "../components/rotating-page";
import OctopusNavigation from "../components/octopus-navigation";
import { InfoModal } from "../components/form";

import lacunaMap from "../images/lacuna-map.jpeg";

const Contact = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <>
      <OctopusNavigation pageTitle="Contact" />
      <InfoModal isOpen={isMapOpen} close={() => setIsMapOpen(false)}>
        <img src={lacunaMap} alt="map to Lacuna Frames" />
      </InfoModal>
      <RotatingPage>
        <Section title="Collections">
          <p key="collect-one">
            We’ll let you know once your frames are in production and provide
            you with an accurate completion date
          </p>
          <p key="collect-two">Our opening times are Monday to Thursday 10-5</p>
        </Section>
        <Section title="Deliveries">
          <p key="deliveries-one">
            We offer a mail service for those outside of Glasgow
            <br />
            <br />
            Local delivery service coming soon
          </p>
        </Section>
        <Section title="Talk">
          <p key="talk-one">
            Looking for something different?
            <br />
            <br />
            <a href="mailto:felix@lacunaframes.com">
              felix
              <br />
              @lacunaframes.com
            </a>
            <br />
            <br />
            <a href="tel:+447530386628">07530 386628</a>
          </p>
        </Section>
        <Section title="Visit">
          <p key="visit-one">
            In studio consultations are always the best way for us to design
            your frames
          </p>
          <p key="visit-two">
            Let us know when you would like to book a visit
            <br />
            <br />
            <button className="button-link" onClick={() => setIsMapOpen(true)}>
              Map
            </button>
          </p>
        </Section>
      </RotatingPage>
    </>
  );
};

export default Contact;
