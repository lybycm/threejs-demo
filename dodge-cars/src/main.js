import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh, { cars } from "./mesh.js";
import blood, { batchRenderer, addCollisionBehavior } from "./blood.js";
import { throttle } from "lodash-es";
import gsap from "gsap";

const scene = new THREE.Scene();

scene.add(mesh);
scene.add(blood);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(500, 300, 600);
scene.add(light);

const light2 = new THREE.AmbientLight();
scene.add(light2);

const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(0, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let man;
let gameOver = false;
export function isGameOver() {
  return gameOver;
}

const clock = new THREE.Clock();
function render() {
  const delta = clock.getDelta();
  if (batchRenderer) {
    batchRenderer.update(delta);
  }
  if (!man) {
    man = scene.getObjectByName("man");
  }
  let manBox3;
  if (man) {
    manBox3 = new THREE.Box3();
    manBox3.setFromObject(man);
    // manBox3.expandByVector(new THREE.Vector3(-50, 0, 0));
    if (man.rotation.y === 0) {
      manBox3.expandByVector(new THREE.Vector3(-50, 0, 0));
    } else {
      manBox3.expandByVector(new THREE.Vector3(0, 0, -50));
    }
  }
  if (!gameOver) {
    cars.forEach((arr) => {
      arr.forEach((item) => {
        item.visible = true;

        item.position.z += item.speed;

        item.helper.update(item);
        if (man) {
          const carBox3 = new THREE.Box3();
          carBox3.setFromObject(item);
          const collision = manBox3.intersectsBox(carBox3);
          if (collision) {
            gameOver = true;
            const box3 = manBox3.intersect(carBox3);

            const emitter = blood.getObjectByName("bloodEmitter");
            emitter.visible = true;
            const pos = box3.getCenter(new THREE.Vector3());
            emitter.position.copy(pos);
            addCollisionBehavior(-pos.y);
          }
        }
      });

      arr = arr.filter((item) => {
        if (item.position.z > 500) {
          item.parent?.remove(item);
          return false;
        }
        return true;
      });
    });
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function moveMan(man, x) {
  gsap.to(man.position, {
    x,
    duration: 0.3,
    ease: "none",
    // onUpdate: () => {
    //   man.helper.update(man);
    // },
  });
}
const moveManFn = throttle(moveMan, 300);

window.addEventListener("keydown", (e) => {
  if (isGameOver()) {
    return;
  }
  const man = scene.getObjectByName("man");
  if (man) {
    let delta = 0;

    if (e.code === "ArrowLeft") {
      delta = -50;
      man.rotation.y = Math.PI / 2;
    } else if (e.code === "ArrowRight") {
      delta = 50;
      man.rotation.y = -Math.PI / 2;
    }
    moveManFn(man, man.position.x + delta);
  }
});
