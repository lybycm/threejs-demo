import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";
import { Tween, Easing } from "@tweenjs/tween.js";

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.DirectionalLight(0xffffff);
pointLight.position.set(100, 300, 200);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const tween = new Tween(mesh.position)
  .to({ x: 100, y: 100 }, 2000)
  .easing(Easing.Quadratic.InOut)
  .start();

function render(time) {
  //   if (mesh.position.x < 100) {
  //     mesh.position.x += 1;
  //     mesh.position.y += 1;
  //   }

  tween.update(time);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
