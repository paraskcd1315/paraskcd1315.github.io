import type { VideoFrameProps } from "./VideoFrame.types";

const EMBED_BASE = "https://www.youtube-nocookie.com/embed";

export default function VideoFrame({ id, title }: Readonly<VideoFrameProps>) {
  return (
    <div className="watch-frame">
      <iframe
        src={`${EMBED_BASE}/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
