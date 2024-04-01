const conatiner = {
  audio: false,
  video: {
    // facingMode : {exact: "environment"},
    width: { min: window.innerWidth, ideal: window.innerWidth, max: window.innerWidth },
    // height: { min: 410, ideal: 416, max: 420 },
    // width: { min: 640, ideal: 640, max: 640 },
    // height: { min: 640, ideal: 640, max: 640 },
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
        // .getUserMedia({
        //   video: { facingMode: "environment" },
        // })
        .then((stream) => {
          videoRef.srcObject = stream;
        });
    } else {
      // console.log("error");
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
