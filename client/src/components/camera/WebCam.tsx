

export class WebCam{
    open = (videoRef : HTMLVideoElement) => {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({
                video: {facingMode: {exact: "environment"}},
            }).then((stream) => {
                videoRef.srcObject = stream;
            });
        }else{
            console.log("error");
        }
    };
    
    close = (videoRef : HTMLVideoElement) => {
        const stream = videoRef.srcObject as MediaStream;

        if(stream){
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            })

            videoRef.srcObject = null;
        }

    }
}
