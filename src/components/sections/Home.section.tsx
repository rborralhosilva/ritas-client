import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import Model from "../media/Model";
import { is3d } from "../../utils/helpers";

export default function HomeSecContent() {
  const { preferences } = useContext(GeneralContext);
  if (!preferences) return null;

  const threed =
    is3d(preferences.homepage_media) && preferences?.homepage_media;

  if (!threed) return;

  return <Model threedref={threed} />;
}
