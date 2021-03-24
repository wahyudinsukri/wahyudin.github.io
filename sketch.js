let video;
let poseNet;
let pose;
let skeleton;
var play;
var stopp;
var canvas;


function setup() {
    canvas = createCanvas(810, 500);
    canvas.parent('video');
    video = createCapture(VIDEO);
    video.size(810, 500);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    play = select('.play');
    stopp = select('.stop');
    noLoop();
    play.mousePressed(mulai);
    stopp.mousePressed(berhenti);
}
function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}
function modelLoaded() {
    console.log('poseNet ready');
}
function mulai() {
    loop();
}
function berhenti() {
    background(17, 17, 17);
    noLoop();
}
function draw() {
    image(video, 0, 0, 810, 500);
    if (pose) {
        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 30, 30);
        }
    }

}