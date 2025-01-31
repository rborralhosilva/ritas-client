import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseButton from "./CloseButton";

export default function SectionModal({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash === path) {
      setHash(location.hash);
    } else {
      setHash(null);
    }
  }, [location.hash, path]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal
      show={!!hash}
      size="xl"
      onHide={handleClose}
      contentClassName="shadow-sm"
      animation={false}
    >
      <Modal.Header className="d-flex justify-content-end p-0 m-0 border-0">
        <CloseButton
          handleClose={handleClose}
          variant="rita-dark"
          className="m-2 px-1 py-0"
        />
      </Modal.Header>
      <Modal.Body className="mt-0 pt-0">{children}</Modal.Body>
    </Modal>
  );
}
