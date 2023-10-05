
// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.


var buildUrl = "Build";
var config = {
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "VideoOverlay",
    productVersion: "0.1",
};

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);

    var canvas = document.querySelector("#unity-canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "fixed";

    document.body.style.textAlign = "left";
}

function onResize() {
    console.log("resize");
    var canvas = document.querySelector("#unity-canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    console.log("set size: ", canvas.width, canvas.height);
}

window.addEventListener("resize", function () {
    onResize();
});
onResize();

var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    })
        .then((unityInstance) => {
            unityGame = unityInstance;
            loadingBar.style.display = "none";
        })
        .catch((message) => {
            alert(message);
        });
};
document.body.appendChild(script);
