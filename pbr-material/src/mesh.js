import * as THREE from "three";

const textureCube = new THREE.CubeTextureLoader()
  .setPath("./forest/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

const geometry = new THREE.CylinderGeometry(200, 200, 500);
const material = new THREE.MeshStandardMaterial({
  color: "orange",
  roughness: 0,
  metalness: 1,
  envMap: textureCube,
  emissiveIntensity: 1,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
