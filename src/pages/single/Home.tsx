import { useContext } from "react";
import { Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { GeneralContext } from "../../contexts/GeneralContext";
import Section from "../../components/sections/Section";
import HomeSecContent from "../../components/sections/Home.section";
import WorksSecContent from "../../components/sections/Works.section";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "react-bootstrap-icons";
import ContactSec from "../../components/sections/Contact.section";
import BioSec from "../../components/sections/Bio.section";

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
        </Section>{" "}
        <Section id="bio">
          <Section.Layout title="Bio" body={<BioSec />} />
        </Section>
        <Section id="works">
          <Section.Layout
            title="Works"
            subtitle={
              <Link to={"/workss"}>
                View full selection <ArrowUpRight />
              </Link>
            }
            body={<WorksSecContent />}
          />
        </Section>
        <Section id="contact">
          <Section.Layout title="Contact" body={<ContactSec />} />
        </Section>
      </Col>
    </Layout>
  );
}
