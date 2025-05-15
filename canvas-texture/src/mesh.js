import * as THREE from "three";

const group = new THREE.Group();

function createCanvas() {
  const dpr = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const w = (canvas.width = 100 * dpr);
  const h = (canvas.height = 100 * dpr);

  const c = canvas.getContext("2d");
  c.translate(w / 2, h / 2);
  c.arc(0, 0, 40 * dpr, 0, Math.PI * 2);
  c.fillStyle = "orange";
  c.fill();

  c.beginPath();
  c.moveTo(-10 * dpr, -20 * dpr);
  c.lineTo(-10 * dpr, 20 * dpr);
  c.lineTo(20 * dpr, 0);
  c.closePath();
  c.fillStyle = "white";
  c.fill();

  return canvas;
}

function createPlane(x, y) {
  const texture = new THREE.CanvasTexture(createCanvas());
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshPhongMaterial({
    // color: 'white'
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  return mesh;
}

group.add(createPlane(-300, 0));
group.add(createPlane(0, 0));
group.add(createPlane(300, 0));

export default group;
