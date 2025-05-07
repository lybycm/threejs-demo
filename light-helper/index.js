import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { mesh, light } from "./mesh.js";
// import { mesh, light } from "./mesh2.js";
// import { mesh, light } from "./mesh3.js";
// import { mesh, light } from "./mesh4.js";
import { mesh, light } from "./mesh5.js";
// import { mesh, light } from "./mesh6.js";
// import { mesh, light } from "./mesh7.js";

const scene = new THREE.Scene();
scene.add(mesh, light);

// const gridHelper = new THREE.GridHelper(
//   1000,
//   10,
//   new THREE.Color("green"),
//   new THREE.Color("pink")
// );
// scene.add(gridHelper);

const origin = new THREE.Vector3(0, 0, 0);
const dir = new THREE.Vector3(1, 2, 0);
dir.normalize();
const arrowHelper = new THREE.ArrowHelper(
  dir,
  origin,
  500,
  new THREE.Color("yellow")
);
scene.add(arrowHelper);

const helper = new THREE.PolarGridHelper(500, 10, 5, 64);
scene.add(helper);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(200, 800, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
