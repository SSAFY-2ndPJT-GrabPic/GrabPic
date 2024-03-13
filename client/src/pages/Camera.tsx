import { useEffect, useRef } from "react";
import { WebCam } from "../components/camera/WebCam";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webCam = new WebCam();

  useEffect(() => {
    webCam.open(videoRef.current);
    return () => {
      webCam.close(videoRef.current);
    };
  }, []);

  return (
    <div>
      <h1>Camera</h1>
      <video autoPlay muted ref={videoRef} />
    </div>
  );
}
