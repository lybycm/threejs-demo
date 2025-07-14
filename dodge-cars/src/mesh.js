import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { isGameOver } from "./main";

const group = new THREE.Group();

const loader = new THREE.TextureLoader();

async function createRoad() {
  const texture = loader.load("./road.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.y = 15;

  const geometry = new THREE.PlaneGeometry(1000, 10000);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    aoMap: texture,
  });
  const road = new THREE.Mesh(geometry, material);
  group.add(road);

  road.rotateX(-Math.PI / 2);
}

export const cars = [[], [], [], []];
let timer;

let blueCarGltf;
let orangeCarGltf;

async function createCars() {
  const isBlueCar = Math.random() < 0.5;
  if (isBlueCar) {
    if (!blueCarGltf) {
      blueCarGltf = await new GLTFLoader().loadAsync("./blue-car.glb");
    }
    blueCarGltf.scene.scale.setScalar(150);
    // group.add(blueCarGltf.scene);
    return blueCarGltf.scene.clone();
  } else {
    if (!orangeCarGltf) {
      orangeCarGltf = await new GLTFLoader().loadAsync("./orange-car.glb");
    }
    orangeCarGltf.scene.scale.setScalar(130);
    orangeCarGltf.scene.position.x = 200;
    // group.add(orangeCarGltf.scene);
    return orangeCarGltf.scene.clone();
  }
}

timer = setInterval(async () => {
  if (isGameOver()) {
    return clearInterval(timer);
  }
  const car = await createCars();
  car.visible = false;
  group.add(car);

  // console.log(car);

  const helper = new THREE.BoxHelper(car);
  group.add(helper);
  car.helper = helper;

  const index = Math.floor(Math.random() * 4);

  car.position.x = -400 + index * 250;
  car.position.z = -1300;
  car.speed = 10 + Math.random() * 5;

  cars[index].push(car);
}, 3000);

async function createMan() {
  const manGltf = await new GLTFLoader().loadAsync("./Soldier.glb");
  manGltf.scene.scale.setScalar(90);
  manGltf.scene.position.z = 200;

  // manGltf.scene.rotateY(Math.PI);
  manGltf.scene.name = "man";

  const box3 = new THREE.Box3();
  box3.setFromObject(manGltf.scene);
  box3.expandByVector(new THREE.Vector3(-50, 0, 0));

  const helper = new THREE.Box3Helper(box3);
  group.add(helper);
  manGltf.scene.helper = helper;

  // const boxHelper = new THREE.BoxHelper(manGltf.scene, 0xff0000);
  // boxHelper.setFromObject(box);
  // group.add(boxHelper);
  // manGltf.scene.helper = boxHelper;

  // const box = new THREE.Box3().setFromObject(manGltf.scene);
  // manGltf.scene.box = box;

  const mixer = new THREE.AnimationMixer(manGltf.scene);
  const clipAction = mixer.clipAction(manGltf.animations[3]);
  clipAction.play();

  const clock = new THREE.Clock();
  function render() {
    requestAnimationFrame(render);
    const delta = clock.getDelta();
    mixer.update(delta);
    if (isGameOver()) {
      clipAction.paused = true;
    }
  }
  render();

  group.add(manGltf.scene);

  return manGltf.scene;
}

createRoad();
// createCars();
createMan();

export default group;
