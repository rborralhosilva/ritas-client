import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import Layout from "../../components/layout/Layout";
import { Col } from "react-bootstrap";
import HomeSection from "../../components/sections/Home.section";
import BioSection from "../../components/sections/Bio.section";
import ContactSection from "../../components/sections/Contact.section";
import WorksSection from "../../components/sections/Works.section";
// import { Col, ListGroup, Row } from "react-bootstrap";
// import { UrlSchema } from "@jakubkanna/labguy-front-schema";
// import { Link } from "react-router-dom";
// import Background from "../../components/Background";
// import Layout from "../../components/layout/Layout";

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
        <HomeSection />
        <WorksSection />
        <BioSection />
        <ContactSection />
      </Col>
    </Layout>
  );
}
