import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./matcap1.png");

const geometry = new THREE.SphereGeometry(300);
// const material = new THREE.MeshPhongMaterial({
//   color: "orange",
// });

const material = new THREE.MeshMatcapMaterial({
  color: "orange",
  matcap: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
