import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem } from "./Menu";

export default function MenuMobile({
  activeSection,
  items,
}: {
  activeSection: string;
  items: MenuItem[];
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(true);
  const handleClose = () => {
    navigate("/");
    setShow(false);
  };

  return (
    <>
      <div
        className="position-fixed z-3 top-0 end-0 m-3 fs-1"
        onClick={handleClick}
      >
        <i className="bi bi-list"></i>
      </div>
      <Modal
        show={show}
        fullscreen
        backdrop={false}
        contentClassName="bg-transparent"
      >
        <Modal.Header className="d-flex justify-content-end p-0 m-0 border-0">
          <Button
            className="m-2 px-1 py-0"
            aria-label="Close"
            onClick={handleClose}
            variant="rita-dark"
          >
            <i className="bi bi-x fs-1 p-0 lh-sm" />
          </Button>
        </Modal.Header>
        <Modal.Body
          className="d-grid gap-2 p-4"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            height: "calc(100vh - 60px)",
          }}
        >
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={item.to}
              style={
                index === 0 && items.length % 2 !== 0
                  ? { gridColumn: "1 / span 2" }
                  : {}
              }
              className={`btn btn-lg rounded-4 d-flex shadow-sm ${
                activeSection === item.id ? "btn-active" : "btn-menu"
              }`}
              onClick={handleClose}
              target={item.blank ? "_blank" : ""}
            >
              {item.label}
            </Link>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
