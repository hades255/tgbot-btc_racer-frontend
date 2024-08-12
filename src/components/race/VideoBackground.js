import React, { useEffect, useRef } from "react";

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
    }
  }, []);

  return (
    <div
      className="absolute flex justify-center top-0 -z-10 w-full"
      style={{ mixBlendMode: "color-dodge" }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
      >
        <source src="/videos/bet-animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
