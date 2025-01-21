import { useContext, useEffect, useRef } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

export default function Header({
  setHeaderHeight,
}: {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { preferences } = useContext(GeneralContext);
  const artists_name = preferences
    ? preferences.artists_name
    : "Rita Borralho Silva";
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  // Measure content height when it is rendered
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.clientHeight;
      if (height) setHeaderHeight(height);
    }
  }, [setHeaderHeight, isMobile]);

  return (
    <header ref={headerRef}>
      {/* metadata */}
      <Helmet>
        <title>{preferences?.artists_name || "Rita  Borralho Silva"}</title>
        <meta name="author" content={preferences?.artists_name} />

        {/* Favicons and Icons for Different Platforms */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />

        {/* Optional: Web App Manifest for Android */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Helmet>
      {/* navbar */}
      <div className="m-3 position-fixed start-0 top-0 z-3">
        <Row>
          <Col>
            <span
              className="fs-3 fw-bolder text-wrap d-block"
              style={{ width: 100, lineHeight: 1 }}
            >
              {artists_name}
            </span>
          </Col>
        </Row>
      </div>

      <div className="position-fixed end-0 top-50 translate-middle-y m-2">
        <ListGroup>
          <ListGroupItem>
            <Link to="/">Home</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="bio">Bio</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="works">Works</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="contact">Contact</Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    </header>
  );
}
