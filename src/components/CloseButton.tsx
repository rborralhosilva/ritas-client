import { Button } from "react-bootstrap";

export default function CloseButton({
  handleClose = () => {
    console.log("Close click");
  },
  variant = "rita-dark",
  className = "m-3 px-1 py-0",
}) {
  return (
    <Button
      className={className}
      aria-label="Close"
      onClick={handleClose}
      variant={variant}
    >
      <i className="bi bi-x-lg fs-1 p-0 lh-sm" />
    </Button>
  );
}
