
export class WebCam {
  open = (videoRef: HTMLVideoElement | null, videoWidth : number, videoHeight:number) => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      videoRef
    ) {

      navigator.mediaDevices.getUserMedia({
        // video: { facingMode: "environment", width: videoHeight, height:videoWidth,
        video: { facingMode: "environment", width: videoWidth, height:videoHeight,
        frameRate: {
          ideal: 60,
          min: 30,
        },}
      }).then((stream) => {
        videoRef.srcObject = stream;
      });
    }
  };

  close = (videoRef: HTMLVideoElement | null) => {
    if (videoRef) {
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
