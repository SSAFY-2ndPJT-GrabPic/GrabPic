export class WebCam {
  open = async (
    videoRef: HTMLVideoElement | null,
    videoWidth: number,
    videoHeight: number
  ) => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      videoRef
    ) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(
        (device) =>
          device.kind === 'videoinput' && device.label.includes('back')
      );

      const index = cameras.length - 1;
      const deviceId = index >= 0 ? cameras[index].deviceId : null; 

      const info = {
        video: {
          facingMode: 'environment',
          width: videoWidth,
          height: videoHeight,
          deviceId: { exact: deviceId },
          zoom: true,
          advanced: [{ zoom: 5 }],
          frameRate: {
            ideal: 60,
            min: 30,
          },
        },
      };

      const info2 = {
        video: {
          facingMode: 'environment',
          width: videoHeight,
          height: videoWidth,
          frameRate: {
            ideal: 60,
            min: 30,
          },
        },
      };

      navigator.mediaDevices.getUserMedia(deviceId?info:info2).then((stream) => {
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
