import { is3d, isImage, isVideo, MediaRef } from "../utils/helpers";
import Image from "./media/Image";
import Model from "./media/Model";
import Video from "./media/Video";

interface MediaProps {
  media: MediaRef;
  className?: string;
}

export default function MediaComponent({ media, className }: MediaProps) {
  // Early return if no media is provided
  if (!media) return null;

  return (
    <div className={className}>
      {isImage(media) && <Image imageref={media} className={className} />}
      {isVideo(media) && <Video videoref={media} />}
      {is3d(media) && <Model threedref={media} controls />}
      {!isImage(media) && !isVideo(media) && !is3d(media) && (
        <p>Unsupported media type.</p>
      )}

      {(media.description as string) && (
        <span className="media-description">{media.description as string}</span>
      )}
    </div>
  );
}
