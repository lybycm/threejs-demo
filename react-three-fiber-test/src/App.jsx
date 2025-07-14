import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

function Mesh() {
  const meshRef = useRef();
  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });
  function clickHandler() {
    meshRef.current.material.color.set("blue");
  }
  return (
    <mesh ref={meshRef} onClick={clickHandler}>
      <dodecahedronGeometry args={[100]} />
      <meshPhongMaterial color={"orange"} />
    </mesh>
  );
}

function Naruto() {
  const gltf = useLoader(GLTFLoader, "/naruto.glb");
  gltf.scene.scale.setScalar(200);

  const size = useThree((state) => state.size);
  console.log(size);
  const camera = useThree((state) => state.camera);

  gsap.to(camera.position, {
    x: 0,
    y: 500,
    z: 200,
    duration: 1,
    ease: "power2.inOut",
  });

  return <primitive object={gltf.scene} />;
}

function App() {
  return (
    <Canvas
      camera={{
        position: [0, 500, 500],
      }}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <ambientLight />
      <axesHelper args={[1000]} />
      <directionalLight position={[500, 400, 300]} />
      <OrbitControls />
      {/* <mesh ref={meshRef}>
        <dodecahedronGeometry args={[100]} />
        <meshPhongMaterial color={"orange"} />
      </mesh> */}
      {/* <Mesh /> */}
      <Suspense fallback={null}>
        <Naruto />
      </Suspense>
    </Canvas>
  );
}

export default App;
