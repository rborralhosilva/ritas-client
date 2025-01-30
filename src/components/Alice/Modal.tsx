import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import styled, { keyframes } from "styled-components";

export default function VideoWindow({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [ready, setReady] = useState(false);
  if (!show) return;

  const handleClose = () => {
    setShow(false);
    setReady(false);
  };

  return (
    <>
      <Modal
        show={show}
        keyboard={false}
        animation={false}
        backdrop={false}
        size="xl"
        centered
        contentClassName={"bg-transparent border-0"}
      >
        <Button
          className="position-fixed top-0 end-0 z-3 m-3 px-1 py-0"
          aria-label="Close"
          onClick={handleClose}
          variant="rita"
        >
          <i className="bi bi-x fs-1 p-0 lh-sm" />
        </Button>

        <Modal.Body className="w-100">
          {!ready && (
            <p className="position-absolute top-50 start-50 translate-middle text-light">
              Loading...
            </p>
          )}
          <ReactPlayer
            url={"https://vimeo.com/75845109"}
            controls
            onReady={() => setReady(true)}
            width={"100%"}
          />
        </Modal.Body>
      </Modal>

      <CircleBackDrop />
    </>
  );
}

const expandCircle = keyframes`
  from {
    background-size: 0% 0%;
  }
  to {
    background-size: 300% 300%; 
  }
`;

const CircleBackDrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300dvw;
  height: 300dvh;
  overflow: hidden;

  background-image: radial-gradient(circle, black 50%, transparent 50%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0% 0%; /* Start with no circle visible */
  animation: ${expandCircle} 1s ease-out forwards;

  z-index: 4;
`;
