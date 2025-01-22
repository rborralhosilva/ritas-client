import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";

export default function ContactSec() {
  const { data } = useFetchData<ProfileSchema>("profile/1");

  if (!data) return null;

  const { contact } = data;

  return (
    <div>
      {contact?.map((c, i) => (
        <Container
          key={i}
          className="fs-1 d-flex flex-column align-items-center"
        >
          <Row>
            <Col>{c.email}</Col>
          </Row>
          <Row>
            <Col>
              {c.socialmedia?.map((sm, i) => (
                <Container key={i}>
                  <Link
                    to={sm.profileUrl || "#"}
                    target="_blank"
                    style={{ display: "flex", gap: "0.25rem" }}
                    className="d-flex align-items-center"
                  >
                    <i
                      className={
                        "bi " + "bi-" + sm.platform?.toLocaleLowerCase() || ""
                      }
                    ></i>
                    {sm.username}
                  </Link>
                </Container>
              ))}
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}
