const conatiner = {
  audio: false,
  video: {
    width: { min: window.innerWidth, ideal: window.innerWidth, max: window.innerWidth },
    height: { min: window.innerHeight, ideal: window.innerHeight, max: window.innerHeight },
    frameRate: {
      ideal: 60,
      min: 30
    }
  },
};

export class WebCam {
  open = (videoRef: HTMLVideoElement | null) => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      videoRef
    ) {
      // console.log("camera open");
      navigator.mediaDevices
        .getUserMedia(conatiner)
        .then((stream) => {
          videoRef.srcObject = stream;
        });
    }
  };

  close = (videoRef: HTMLVideoElement | null) => {
    if (videoRef) {
      // console.log("camera close");
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
