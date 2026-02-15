"use client"

// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import Hls from "hls.js";
// import "video.js/dist/video-js.css";
// import toast from "react-hot-toast";
// import { getHlsConfig } from "@/service/hlsService";

// function VideoPlayer({ src }) {
//   console.log("HLS src:", src);
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     //for init

//     playerRef.current = videojs(videoRef.current, {
//       controls: true,
//       autoplay: true,
//       muted: true,
      // preload: "auto",
      // download: true,
//     });

//     if (Hls.isSupported()) {
//       const hls = new Hls(getHlsConfig())
//       hls.loadSource(src);
//       hls.attachMedia(videoRef.current);
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         videoRef.current.play();
//         hlsRef.current = hls;
//       });
//     } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
//       videoRef.current.src = src;
//       videoRef.current.addEventListener("canplay", () => {
//         videoRef.current.play();
//       });
//     } else {
//       console.log("video format not supportted");
//       toast.error("Video format not supporteds");
//     }
//   }, [src]);

  // return (
  //   <div>
  //     <div data-vjs-player>
  //       <video
  //         ref={videoRef}
  //         style={{
  //           width: "100%",
  //           height: "500px",
  //         }}
  //         className="video-js vjs-control-bar"
  //       ></video>
  //     </div>
  //   </div>
  // );
// }

// export default VideoPlayer;



import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video-js.css";
import toast from "react-hot-toast";
import { getHlsConfig } from "@/service/hlsService";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (!src || !videoRef.current) return;

    // 1. Initialize Video.js
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      muted: true,
      preload: "auto",
      download: true,
    });
    playerRef.current = player;

    // 2. Handle HLS with your existing Config + the Security Fix
    if (Hls.isSupported()) {
      // We spread the existing config and add our fix
      const hls = new Hls({
        ...getHlsConfig(), // This keeps your original HLS settings
        xhrSetup: (xhr, url) => {
          // This prevents your backend JWT from being sent to DigitalOcean
          xhr.withCredentials = false; 
        },
      });

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play().catch(e => console.error("Playback failed", e));
      });

      hlsRef.current = hls;
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("canplay", () => {
        videoRef.current.play();
      });
    } else {
      console.log("video format not supportted");
      toast.error("Video format not supporteds");
    }
    
  }, [src]);

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "500px",
          }}
          className="video-js vjs-control-bar"
        ></video>
      </div>
    </div>
  );
}

export default VideoPlayer;