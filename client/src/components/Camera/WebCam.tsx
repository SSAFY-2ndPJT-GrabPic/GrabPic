
export class WebCam {
  open = async (videoRef: HTMLVideoElement | null, videoWidth : number, videoHeight:number) => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      videoRef
    ) {

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === "videoinput" && device.label.includes("back"));

      console.log(cameras[0].deviceId);
      const deviceId = cameras[0].deviceId
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: videoHeight, height:videoWidth,deviceId: { exact: deviceId},
        // video: { facingMode: "environment", width: videoWidth, height:videoHeight,
        frameRate: {
          ideal: 60,
          min: 30,
        },
        }
        
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
