export class WebCam {
  open = (videoRef: HTMLVideoElement | null) => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      videoRef
    ) {
      console.log("camera open");
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
        })
        .then((stream) => {
          videoRef.srcObject = stream;
        });
    } else {
      console.log("error");
    }
  };

  close = (videoRef: HTMLVideoElement | null) => {
    if (videoRef) {
      console.log("camera close");
      const stream = videoRef.srcObject as MediaStream;

      if (stream) {
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        videoRef.srcObject = null;
      }
    }
  };
}
