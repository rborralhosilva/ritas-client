import { ModelViewerElement } from "@google/model-viewer";
import video from "/alice/Alice_RitaBorralhoSilva.mp4";

export default function onLoad(modelViewer: ModelViewerElement | null) {
  if (!modelViewer) return;
  modelViewer.addEventListener("load", async () => {
    // basic material setup

    const ritasColor = "#b9d1db";
    const { materials } = modelViewer.model || {};

    if (!materials) return;
    modelViewer.timeScale = 0.15;

    materials[0].pbrMetallicRoughness.setBaseColorFactor(ritasColor);
    materials[0].pbrMetallicRoughness.setRoughnessFactor(0.6);

    // set video texture
    const videoTexture = modelViewer.createVideoTexture(video);

    const material = materials[1];

    const { baseColorTexture } = material.pbrMetallicRoughness;
    baseColorTexture.setTexture(videoTexture);

    // material.setEmissiveFactor(1);
    // material.setEmissiveStrength(1);
  });
}
