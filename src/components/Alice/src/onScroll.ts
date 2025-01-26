import { ModelViewerElement } from "@google/model-viewer";

export default function onScroll(modelViewer: ModelViewerElement | null) {
  let hasLogged = false; // Flag to ensure 'bang' is logged only once
  if (!modelViewer) return;

  const onStart = () => {
    modelViewer.animationName = "Plane.003_final.001Action.003";
    modelViewer.currentTime = 0;
  };

  const onStop = () => {
    modelViewer.animationName = "rotation";
  };

  window.addEventListener("scroll", () => {
    // Get the current scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // Get the viewport height in pixels (100dvh is 100% of the viewport height)
    const viewportHeight = window.innerHeight;
    const breakpoint = viewportHeight / 100;

    // Check if the scroll position is equal to or greater than 100dvh and 'bang' hasn't been logged yet
    if (scrollTop >= breakpoint && !hasLogged) {
      document.getElementById("model")?.classList.add("blur");
      hasLogged = true; // Set the flag to true after logging
      onStart();
    } else if (scrollTop < breakpoint && hasLogged) {
      document.getElementById("model")?.classList.remove("blur");
      hasLogged = false; // Reset the flag to false
      onStop();
    }
  });
}
