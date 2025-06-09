import * as THREE from "three";
import {
  ApplySequences,
  BatchedParticleRenderer,
  ConeEmitter,
  ConstantValue,
  DonutEmitter,
  GridEmitter,
  IntervalValue,
  ParticleSystem,
  RandomColor,
  RectangleEmitter,
  TextureSequencer,
  Vector3,
  Vector4,
  RenderMode,
  Rotation3DOverLife,
  AxisAngleGenerator,
  Noise,
} from "three.quarks";

const group = new THREE.Group();

const batchRenderer = new BatchedParticleRenderer();
group.add(batchRenderer);

const loader = new THREE.TextureLoader();
const texture = loader.load("./leaf.png");

const geometry = new THREE.PlaneGeometry(10, 10);

const particles = new ParticleSystem({
  duration: 20,
  looping: true,
  instancingGeometry: geometry,
  startLife: new ConstantValue(20),
  startSpeed: new IntervalValue(100, 200),
  startSize: new IntervalValue(5, 10),
  startColor: new RandomColor(new Vector4(1, 0, 0, 1), new Vector4(1, 1, 0, 1)),

  startRotation: new IntervalValue(Math.PI / 6, Math.PI / 3),

  emissionOverTime: new IntervalValue(20, 30),
  renderMode: RenderMode.Mesh,
  shape: new GridEmitter({
    width: 1000,
    height: 1000,
    column: 10,
    row: 10,
  }),
  material: new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  }),
});

particles.addBehavior(
  new Rotation3DOverLife(
    new AxisAngleGenerator(
      new THREE.Vector3(0, 1, 1).normalize(),
      new IntervalValue(Math.PI / 10, Math.PI)
    )
  )
);

particles.addBehavior(
  new Noise(new ConstantValue(0.5), new IntervalValue(50, 100))
);

particles.emitter.rotateX(Math.PI / 2);

group.add(particles.emitter);

batchRenderer.addSystem(particles);

export { batchRenderer };

export default group;
