const conatiner = {
  audio: false,
  video: {
    facingMode: "environment",
    width: {
      min: document.documentElement.clientWidth,
      ideal: document.documentElement.clientWidth,
      max: document.documentElement.clientWidth,
    },
    height: {
      min: document.documentElement.clientHeight,
      ideal: document.documentElement.clientHeight,
      max: document.documentElement.clientHeight,
    },
    frameRate: {
      ideal: 60,
      min: 30,
    },
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
      navigator.mediaDevices.getUserMedia(conatiner).then((stream) => {
        // const videoTrack = stream.getVideoTracks()[0];
        // // 트랙 설정 확인
        // console.log(window.innerWidth);
        // console.log(window.innerHeight);
        // console.log(document.documentElement.clientWidth)
        // console.log(document.documentElement.clientHeight);
        // const settings = videoTrack.getSettings();
        // console.log('폭 (width):', settings.width);
        // console.log('높이 (height):', settings.height);
        // console.log('프레임 속도 (frame rate):', settings.frameRate);
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
