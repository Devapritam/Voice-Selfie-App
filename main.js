var SpeechRecognition = window.webkitSpeechRecognition;

var mic = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    mic.start();
}

mic.onresult = function(event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if(content == "take my selfie"){
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var data = "taking your selfie in 5 seconds ---";
    var utterThis = new SpeechSynthesisUtterance(data);
    synth.speak(utterThis);
    Webcam.attach(document.getElementById("camera"));
    setTimeout(function () {
        takeSelfiePic();
        saveSnapshot();
    }, 5000);
}

Webcam.set({
    width:400,
    height:250,
    image_format: 'png',
    png_quality: 90
});

function takeSelfiePic() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'" />'
    });
}

function saveSnapshot() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}