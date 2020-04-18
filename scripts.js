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
    });
}//end getVideo function

getVideo();
