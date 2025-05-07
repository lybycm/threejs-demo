import * as THTEE from "three";

const loader = new THTEE.TextureLoader();
const textrue = loader.load("./ditu.awebp");

const geometry = new THTEE.SphereGeometry(100);

const material = new THTEE.MeshBasicMaterial({
  map: textrue,
});

const mesh = new THTEE.Mesh(geometry, material);

export default mesh;
