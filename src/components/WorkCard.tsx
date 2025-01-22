import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Work } from "../../types/Work";
import Thumbnail from "./Thumbnail"; // Import the Thumbnail component
import { getRitasColor } from "../utils/helpers";
import { Link } from "react-router-dom";

interface CardProps {
  work: Work;
  onClick?: () => void;
}

const WorkCard: React.FC<CardProps> = ({ work }) => {
  const { general, dimensions, year, media, medium } = work;
  const { title } = general;
  const [mouveOver, setMouseOver] = useState<boolean>(false);

  return (
    <div
      className="rounded work-card flex-shrink-0 d-flex flex-column justify-content-between position-relative"
      style={{
        cursor: "pointer",
        width: "300px",
        transition: "all 0.3s ease", // Optional transition effect
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {/* Overlay that appears on hover */}
      {mouveOver && (
        <div
          className="rounded top-0 start-0 h-100 w-100 overlay d-flex flex-column justify-content-center align-items-center"
          style={{
            position: "absolute",
            backgroundColor: getRitasColor(),
            transition: "opacity 0.3s ease", // Optional transition effect
            zIndex: 1, // Ensure it's above content
          }}
        >
          <Link to={`/works/${work.id}`}>
            <p>show</p>
          </Link>
        </div>
      )}

      <Row className="gap-3 p-2 h-75">
        <Col xs={12}>
          {/* Use the Thumbnail component */}
          <Thumbnail media={media} />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <p className="fw-bold">{title}</p>
          {dimensions && (
            <p className="text-center">
              {year && (
                <>
                  <span>{year}</span>
                  <br />
                </>
              )}
              {medium && (
                <>
                  <span>{medium} </span>
                  <br />
                </>
              )}
              {dimensions && (
                <span style={{ fontSize: "0.8em" }}>{dimensions} cm</span>
              )}
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WorkCard;
