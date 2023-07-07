import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'


const WIDTH = window.innerWidth; 
const HEIGHT = window.innerHeight;
const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
scene.background = 0xffffff;

const camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const renderer = new THREE.WebGLRenderer({
    antialiase: true,
    canvas: canvas
});

document.body.appendChild(canvas);


const orbitControl = new OrbitControls(camera, renderer.domElement);


var ground = new THREE.Mesh(
    new THREE.BoxGeometry(40, 5, 40),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "https://threejs.org/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg" )}) //Texture
);
scene.add(ground);


// Walls of HOME
const back = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 2),
    new THREE.MeshBasicMaterial({

    })
);
back.name = "wall";
back.position.set(0, 10, -10);
scene.add(back);

var left = back.clone();
left.name = "wall";
left.position.set(-10, 10, 0);
left.rotateY(Math.PI / 2);
scene.add(left);

const right = left.clone();
right.name = "wall";
right.position.set(10, 10, 0);
scene.add(right);

textureLoader.setPath('https://threejs.org/');
scene.children.forEach( function (obj) {
         if(obj instanceof THREE.Mesh && obj.name == "wall"){
             obj.material.map = textureLoader.load("/examples/textures/brick_diffuse.jpg");
        }
});


// Roof of HOME
const radiusTop = 0;
const radiusBot = 20;
const height = 20;
const radialSegments = 4;
const heightSegment = 10; //default 1
const openEnded = !false; //defaul but make true

var cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBot, height, radialSegments, heightSegment, openEnded), 
    new THREE.MeshPhongMaterial({
        color: new THREE.Color("royalblue"),
        side: [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide][2],
        flatShading: true
    }));

cylinder.position.y = 30;
cylinder.rotateY(Math.PI / 4);

scene.add(cylinder);



const stairGroup = stair();
stairGroup.position.set(0, -2, 25)
scene.add(stairGroup);

// Creating stair for HOME
function stair(height) {

    var group = new THREE.Group();

    for (let i = 0; i < 5; i++) {
        var stairUnit = new THREE.Mesh(
            new THREE.BoxGeometry(15, 1, 2),
            new THREE.MeshPhongMaterial({
              color: new THREE.Color( 0xffffff - Math.round(Math.random() * 100000) )
            })
        );

        let clonedStair = stairUnit.clone();
        clonedStair.position.set(0, i * 1, -i * 1);
        group.add(clonedStair);
    }

    return group;
}



// var textureLoader = new THREE.TextureLoader();
// textureLoader.setResourcePath("https://threejs.org/");
// ground.material.map = textureLoader.load("examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg");
// ground.material.normalMap = textureLoader.load("examples/textures/floors/FloorsCheckerboard_S_Normal.jpg");


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.5);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight)


animate();
function animate() {

    renderer.render(scene , camera);
    requestAnimationFrame(animate);
}