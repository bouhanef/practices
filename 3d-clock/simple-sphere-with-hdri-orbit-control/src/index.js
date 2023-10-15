import {ACESFilmicToneMapping, Color, Mesh, MeshStandardMaterial, PMREMGenerator, PerspectiveCamera, SRGBColorSpace, Scene, SphereGeometry, WebGLRenderer, sRGBEncoding} from "three";
import { RGBELoader } from './RGBELoader';
import { OrbitControls } from "./OrbitControls";

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

// Define controller to orbit
let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

// For HDRI, see in the function init
let pmrem = new PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

// Loop of rundering
(async function init() {

    // Apply hdri
    let envHdrTexture = await new RGBELoader().loadAsync("./../assets/cannon_1k_blurred.hdr");
    let envRT = pmrem.fromEquirectangular(envHdrTexture);
    let envMap = envRT.texture;
    envHdrTexture.dispose(); 
    scene.environment = envMap

    // Sphere mesh defenition
    let SphereMesh = new Mesh(
        new SphereGeometry(2, 10, 10),
        new MeshStandardMaterial({
            envMap: envRT.envHdrTexture,
            roughness: 0.2,
            metalness: 0.5
        })
    );
    
    // Add sphere to scene
    scene.add(SphereMesh);


    renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
    })
})();