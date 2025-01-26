import "@google/model-viewer";
import "@google/model-viewer-effects";
import { useEffect, useRef } from "react";
import { ModelViewerElement } from "@google/model-viewer";
import onLoad from "./src/onLoad";
import onScroll from "./src/onScroll";
import onProgress from "./src/onProgress";

// Import assets explicitly
import model from "/alice/ritaspillow_bezier-animation-test.gltf";
import poster from "/alice/alice_10.jpg";
import arPrompt from "/alice/ar_hand_prompt.png";
import "./src/styles.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export const Alice = ({
  onClick = () => alert("click"),
}: {
  onClick?: () => void;
}) => {
  const aliceRef = useRef(null);

  useEffect(() => {
    const modelViewer = document.getElementById("alice") as ModelViewerElement;
    onLoad(modelViewer);
    onScroll(modelViewer);
    onProgress(modelViewer);
  }, []);

  const tooltip = <Tooltip id="tooltip">Play video</Tooltip>;

  return (
    <div id="model" ref={aliceRef}>
      <model-viewer
        src={model}
        ar
        animation-name="rotation"
        autoplay
        ar-modes="webxr scene-viewer quick-look"
        tone-mapping="neutral"
        poster={poster}
        id="alice"
        camera-orbit="0deg 45deg 4m"
        animation-crossfade-duration="1000"
        environment-image="neutral"
      >
        <OverlayTrigger overlay={tooltip}>
          <Button
            className="Hotspot"
            id="Hotspot"
            slot="hotspot-1"
            data-surface="1 0 56 41 64 0.492 0.425 0.083"
            data-visibility-attribute="visible"
            onClick={onClick}
          ></Button>
        </OverlayTrigger>

        <effect-composer render-mode="quality">
          <outline-effect color="cyan"></outline-effect>
          <color-grade-effect blend-mode="darken"></color-grade-effect>
        </effect-composer>

        <div className="progress-bar hide" slot="progress-bar">
          <span className="progress-value">0%</span>
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>
        <div id="ar-prompt">
          <img src={arPrompt} />
        </div>
      </model-viewer>
    </div>
  );
};
