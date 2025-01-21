import { useContext } from "react";
import { Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { GeneralContext } from "../../contexts/GeneralContext";
import Section from "../../components/sections/Section";
import HomeSecContent from "../../components/sections/Home.section";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);

  if (!preferences) return null;

  // const {
  //   homepage_heading,
  //   homepage_subheading,
  //   homepage_media,
  //   homepage_urls,
  // } = preferences;

  return (
    <Layout>
      <Col>
        <Section id="home">
          <HomeSecContent />
        </Section>
        <Section id="works">
          <Section.Layout
            title="Works"
            body={<p>This is the body content of the section.</p>}
          />
        </Section>
        <Section id="bio">
          <Section.Layout
            title="Bio"
            body={<p>This is the body content of the section.</p>}
          />
        </Section>
        <Section id="contact">
          <Section.Layout
            title="Contact"
            body={<p>This is the body content of the section.</p>}
          />
        </Section>
      </Col>
    </Layout>
  );
}
