
// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Build.loader.js";
var config = {
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "VideoOverlay",
    productVersion: "0.1",
};


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
