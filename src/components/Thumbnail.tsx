import React from "react";
import {
  isImage,
  isVideo,
  is3d,
  MediaRef,
  getRitasColor,
} from "../utils/helpers";
import Image from "./media/Image";
import Video from "./media/Video";
import Model from "./media/Model";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";

interface ThumbnailProps {
  media: MediaRef[] | undefined;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ media }) => {
  if (!media || media.length === 0) {
    // No media case
    return (
      <div
        className="rounded"
        style={{
          backgroundColor: getRitasColor(),
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    );
  }

  const image = isImage(media[0]) && media[0];
  const video = isVideo(media[0]) && media[0];
  const threed = is3d(media[0]) && media[0];

  return (
    <div className="img-fluid rounded" style={{ height: "100%" }}>
      {image && <Image imageref={image} />}
      {video && <Video videoref={video} playerProps={{ light: true }} />}
      {threed &&
        (threed.poster ? (
          <Image
            imageref={threed.poster as ImageRefSchema}
            className="img-fluid"
          />
        ) : (
          <Model threedref={threed} />
        ))}
    </div>
  );
};

export default Thumbnail;
