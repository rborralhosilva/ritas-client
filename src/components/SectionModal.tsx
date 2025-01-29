import { Modal } from "react-bootstrap";
import Bio from "../pages/single/Bio";
import Works from "../pages/Works";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SectionModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState<string | null>(location.hash);

  useEffect(() => {
    setPath(location.hash); // Update path when location.hash changes
  }, [location.hash]);

  if (!path) return;

  const getModalContent = (path: string) => {
    switch (path) {
      case "#bio":
        return <Bio />;
      case "#works":
        return <Works />;
      default:
        return null;
    }
  };

  return (
    <Modal
      show={!!path}
      size="xl"
      onHide={() => navigate("/")}
      contentClassName="shadow-sm"
    >
      <Modal.Body>{getModalContent(path)}</Modal.Body>
    </Modal>
  );
}
