import { useContext } from "react";
import { Col } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import { GeneralContext } from "../../contexts/GeneralContext";
import Section from "../../components/sections/Section";
import WorksSecContent from "../../components/sections/Works.section";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "react-bootstrap-icons";
import ContactSec from "../../components/sections/Contact.section";
import BioSec from "../../components/sections/Bio.section";
import { Alice } from "@jakubkanna/components";

export default function Homepage() {
  const { preferences } = useContext(GeneralContext);

  if (!preferences) return null;

  return (
    <Layout>
      <Col>
        <Section id="home">
          <Alice />
        </Section>{" "}
        <div id="sections">
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
        </div>
      </Col>
    </Layout>
  );
}
