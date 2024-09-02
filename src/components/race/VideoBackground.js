import React from "react";

const VideoBackground = ({ show }) => {
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   if (show && videoRef.current) {
  //     videoRef.current.play();
  //   }
  // }, [show]);

  return (
    show && (
      <>
        <img
          src="flyingrocket.gif"
          alt=""
          className={`absolute flex justify-center top-0 -z-10 w-full`}
          style={{ mixBlendMode: "color-dodge" }}
        />
      </>
    )
  );
};

export default VideoBackground;

/**

    <div
      className={`absolute flex justify-center top-0 -z-10 w-full ${
        show ? "block" : "hidden"
      }`}
      style={{ mixBlendMode: "color-dodge" }}
    >
      <video ref={videoRef} autoPlay muted>
        <source src="/videos/bet-animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div> 


 */
