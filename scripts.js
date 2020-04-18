const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

console.log('kia ora');


function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        console.log(localMediaStream); 
        video.srcObject = localMediaStream; //createObjectURL is deprecated for chrome, so 'video.srcObject' is the fix i found
        // video.src = window.URL.createObjectURL(localMediaStream); //converts webcam stream to a URL format making it usable on this website 
        video.play();
    })
    .catch(err => {
        console.error('oh snap!', err );
    });
}//end getVideo function

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height; //sets canvas to match dimensions of video
    return  setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16 ); //the interval is in milliseconds, in this case 16
}// end paintToCanvas function

function takePhoto() {
    snap.currentTime = 0;
    snap.play(); 
    
}// end takePhoto function

getVideo();
