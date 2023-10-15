import {ACESFilmicToneMapping, Color, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, SRGBColorSpace, Scene, SphereGeometry, WebGLRenderer, sRGBEncoding} from "three";

// Scene defenetion
let scene = new Scene();
scene.background = new Color("white");

// Camera defenition
let camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0,0,10);

// Renderer defenition
let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( innerWidth, innerHeight );
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputColorSpace = SRGBColorSpace; 
document.body.appendChild(renderer.domElement);

// Sphere mesh defenition
let SphereMesh = new Mesh(
    new SphereGeometry(2, 10, 10),
    new MeshBasicMaterial({ color : 0xff0000 })
);

// Add sphere to scene
scene.add(SphereMesh);

// Loop of rundering
(async function init() {

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    })
})();