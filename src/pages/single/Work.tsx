import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import { Work as WorkSchema } from "../../../types/Work";
import MediaComponent from "../../components/Media";
import Layout from "../../components/layout/Layout";
import NotFoundPage from "../404";

export default function Work() {
  const { slug } = useParams();
  const { data } = useFetchData<WorkSchema>(`works/${slug}`);

  if (!data) return <NotFoundPage />;

  const { general, dimensions, medium, year, media, urls } = data;

  if (!general.published) return "This page is private.";

  return (
    <Layout title={general.title}>
      <Col>
        <Container className="d-flex flex-column align-items-center text-center gap-4 mh-100 overflow-auto">
          {/* Display Dimensions and Year */}
          <div className="w-100 d-flex flex-column align-items-center">
            <Row className="w-100">
              <Col xs={12}>
                <p id="Details">
                  {dimensions && <span>{dimensions} (cm), </span>}
                  {medium && <span>{medium}, </span>}
                  {year && <span>{year}</span>}
                  {urls && (
                    <>
                      <br />
                      {urls.map((url, index) => (
                        <span key={index}>
                          <a href={url.url} target="_blank">
                            {url.title}
                          </a>
                          {index < urls.length - 1 && <span> | </span>}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </Col>
            </Row>
          </div>
          {/* Text */}
          <Row>
            <Col>
              <p id="description">{data.description}</p>
            </Col>
          </Row>
          {/* Display Images */}
          <div className="w-100 d-flex flex-column align-items-center">
            <Row className="gap-3 w-100 justify-content-center">
              {media && media.length > 0 ? (
                media.map((item) => (
                  <Col xs={12} key={item?.etag} className="p-0">
                    <MediaComponent media={item} />
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          </div>

          {/* Footer Section */}
          <div className="w-100 d-flex flex-column align-items-center">
            <Row className="w-100">
              <Col>
                <Link to={"/#works"}>All Works</Link>
              </Col>
            </Row>
          </div>
        </Container>
      </Col>
    </Layout>
  );
}
