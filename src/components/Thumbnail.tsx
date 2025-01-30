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
        className="thumbnail rounded w-100 h-100"
        style={{
          backgroundColor: getRitasColor(),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      ></div>
    );
  }

  const image = isImage(media[0]) && media[0];
  const video = isVideo(media[0]) && media[0];
  const threed = is3d(media[0]) && media[0];

  return (
    <div className="rounded h-100 w-100">
      {image && (
        <Image
          imageref={image}
          className="rounded object-fit-cover w-100 h-100"
        />
      )}
      {video && <Video videoref={video} playerProps={{ light: true }} />}
      {threed &&
        (threed.poster ? (
          <Image
            imageref={threed.poster as ImageRefSchema}
            className="rounded object-fit-cover w-100 h-100"
          />
        ) : (
          <Model threedref={threed} />
        ))}
    </div>
  );
};

export default Thumbnail;
