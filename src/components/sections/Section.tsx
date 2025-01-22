import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface SectionProps {
  id: string;
  children?: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
  return <section id={id}>{children}</section>;
}

interface SectionLayoutProps {
  title: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
  subtitle?: React.ReactNode;
}

function Layout({ title, subtitle, body, footer }: SectionLayoutProps) {
  return (
    <Container
      className="d-flex flex-column py-5 gap-3"
      style={{ height: "100%" }}
    >
      <Row>
        <Col className="d-flex flex-column justify-content-center text-center">
          <h1 className="display-1">{title}</h1>
          {subtitle}
        </Col>
      </Row>
      <Row className="flex-grow-1 ">
        <Col className="h-100 d-flex justify-content-center align-items-center">
          {body}
        </Col>
      </Row>
      {footer && (
        <Row>
          <Col>{footer}</Col>
        </Row>
      )}
    </Container>
  );
}

// Attach the Layout subcomponent to Section
Section.Layout = Layout;

export default Section;
