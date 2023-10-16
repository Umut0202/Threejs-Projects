import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create a WebGLRenderer with antialiasing for smoother graphics.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Set the renderer's size, clear color, and pixel ratio.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

// Enable shadow mapping for realistic lighting and shadows.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add the renderer's DOM element to the HTML body.
document.body.appendChild(renderer.domElement);

// Create a new Three.js scene to hold 3D objects.
const scene = new THREE.Scene();

// Create a perspective camera to view the scene and configure its position.
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(4, 5, 11);

// Create an OrbitControls object for user interaction with the scene.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// Create a spot light for realistic shadows and lighting.
const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

// Load the 3D model of the Millennium Falcon.
const loader = new GLTFLoader().setPath("public/millennium_falcon/");
loader.load(
  "scene.gltf",
  (gltf) => {
    const mesh = gltf.scene;
    // Set up shadow properties for the Falcon model.
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);
    // Hide the loading progress container when the model is loaded.
    document.getElementById("progress-container").style.display = "none";
  },
  (xhr) => {
    // Update the loading progress information.
    document.getElementById("progress").innerHTML = `LOADING ${
      Math.max(xhr.loaded / xhr.total, 1) * 100
    }/100`;
  }
);

// Adjust camera and renderer on window resize.
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Define an animation loop for rendering the scene.
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
