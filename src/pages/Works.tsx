import { Outlet, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap"; // Add Container and Row
import Layout from "../components/layout/Layout";
import { Work } from "../../types/Work";
import WorkCard from "../components/WorkCard";

export default function Works({ data }: { data: Work[] | null }) {
  const { slug } = useParams();

  if (!data) return null;

  return (
    <>
      {slug ? (
        <Outlet />
      ) : (
        <Layout title={"Works"}>
          <Container>
            <Row>
              {data.map(
                (item, i) =>
                  item.general.published && (
                    <Col key={i} xs={12} md={6} lg={4}>
                      <WorkCard work={item} />
                    </Col>
                  )
              )}
            </Row>
          </Container>
        </Layout>
      )}
    </>
  );
}
