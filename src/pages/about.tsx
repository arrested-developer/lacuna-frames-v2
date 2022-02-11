import { RotatingPage, Section } from "../components/rotating-page";
import OctopusNavigation from "../components/octopus-navigation";

const About = () => {
  return (
    <>
      <nav>
        <OctopusNavigation pageTitle="About" />
      </nav>
      <main>
        <RotatingPage>
          <Section title="How">
            <p key="how-one">
              Our frames are made by skilled artists, by hand, in our Govan
              workshop
            </p>
            <p key="how-two">
              We use conservation grade materials so that your artwork is
              protected
            </p>
            <p key="how-three">
              All of our paint finishes are hand mixed by our expert colour
              mixer to ensure a truly bespoke finish
            </p>
            <p key="how-four">
              All of our frames are built from FSC certified woods and waste
              material is recycled
            </p>
          </Section>
          <Section title="Why">
            <p key="why-one">
              We knew that the city was missing a bespoke framing service that
              reflected the needs of contemporary works and artists
            </p>
            <p key="why-two">
              We believe that framing doesn&apos;t have to be boring and that
              bespoke doesn&apos;t need to break the bank
            </p>
          </Section>
          <Section title="who">
            <p key="who-one">
              Lacuna Frames was established by Felix in 2019
              <br />
              <br />
              We are now powered by a team of skilled Glasgow based artists
            </p>
          </Section>
          <Section title="what">
            <p key="what-one">
              We serve anyone! We specialise in crafting bespoke picture frames
              for original artworks to a conservation standard
            </p>
            <p key="what-two">
              We serve anyone, including buyers, collectors, artists and
              galleries
            </p>
            <p key="what-three">
              We don&apos;t just frame prints, we love framing objects, canvases
              and textiles too
            </p>
          </Section>
        </RotatingPage>
      </main>
    </>
  );
};

export default About;
