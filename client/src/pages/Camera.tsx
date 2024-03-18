import { useEffect, useRef } from "react";
import { WebCam } from "../components/camera/WebCam";
import styled from "styled-components";

const Testc = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: red;
`
const Test = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webCam = new WebCam();

  useEffect(() => {
    webCam.open(videoRef.current);
    return () => {
      webCam.close(videoRef.current);
    };
  }, [webCam]);

  return (
    <Testc>
      <Test autoPlay muted ref={videoRef}></Test>
    </Testc>
  );
}
