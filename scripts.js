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
        let  pixels = ctx.getImageData(0, 0, width, height); //take pixels out
        // console.log('pixels', pixels);

        // pixels = redEffect(pixels); //manipulate pixels
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        // ctx.globalAlpha = .1; //creates ghosting effect        

        ctx.putImageData(pixels, 0, 0); //put pixels back 
        
    }, 16 ); //the interval is in milliseconds, in this case 16
}// end paintToCanvas function

function takePhoto() {
    snap.currentTime = 0;
    snap.play(); //plays snap sound
    //now, to take the data out of canvas vvvvvvv
    const data = canvas.toDataURL('img/ jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Fella" / >`
    strip.insertBefore(link, strip.firstChild); 
}// end takePhoto function

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 10;  //red channel
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green channel
        pixels.data[i + 2] = pixels.data[i + 2] * .5; //blue channel 
    }
    return pixels;
}//end redEffect function

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];  //red channel
        pixels.data[i + 500] = pixels.data[i + 1]; // green channel
        pixels.data[i - 350] = pixels.data[i + 2]; //blue channel 
    }
    return pixels;
}//end rgbSplit function

function greenScreen(pixels) {
    const levels = {}; //holds your min and max green

     document.querySelectorAll(' .rgb input').forEach((input) => {
        levels[input.name] = input.value;
    }); //takes info from all the rgb inputs

    // console.log(levels);

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 02];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) { //if the pixel lands between any of these values, remove it
            pixels.data[i + 3] = 0;
        }//end IF
    }//end FOR loop

    return pixels

}//end greenScreen function

getVideo();

video.addEventListener('canplay', paintToCanvas); //will run paintToCanvas when video feed exists 
