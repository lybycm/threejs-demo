import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

const group = new THREE.Group();

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial({
//   color: "orange",
// });
// const mesh = new THREE.Mesh(geometry, material);

// group.add(mesh);

const gltfLoader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
);
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load("./tshirt.glb", (gltf) => {
  group.add(gltf.scene);
  // gltf.scene.name = "tshirt";
  gltf.scene.scale.setScalar(1000);

  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      console.log(obj.name, obj);
    }
  });
});

export default group;
