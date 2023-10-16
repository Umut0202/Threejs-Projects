// Import the Three.js library
import * as THREE from "three";
import { GUI } from "dat.gui";

// Create a new 3D scene
const scene = new THREE.Scene();
// Create a perspective camera with specified parameters
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create a WebGLRenderer for rendering 3D graphics
const renderer = new THREE.WebGLRenderer();
// Set the size of the rendering area to match the window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);
// Append the renderer's rendering canvas to the document body
document.body.appendChild(renderer.domElement);

// Create a BoxGeometry for a cube with dimensions 1x1x1
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Create a MeshBasicMaterial with a green color for the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Create a Mesh by combining the geometry and material
const cube = new THREE.Mesh(geometry, material);
// Add the cube to the 3D scene
scene.add(cube);

// Add the cube to the 3D scene
camera.position.z = 5;

function animate() {
  // Request the next animation frame, allowing for smooth animation
  requestAnimationFrame(animate);

  // Rotate the cube around the X and Y axes
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene with the camera
  renderer.render(scene, camera);
}
// Call the animate function to start the animation loop
animate();
