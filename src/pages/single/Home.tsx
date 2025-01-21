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
        <Section id="works"></Section>
        <Section id="bio"></Section>
        <Section id="contact"></Section>
      </Col>
    </Layout>
  );
}
