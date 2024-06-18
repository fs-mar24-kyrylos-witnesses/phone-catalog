import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { CanvasLoader } from './Loader';

const Earth: React.FC = () => {
  const earth = useGLTF('./planet/scene.gltf');

  return (
    // eslint-disable-next-line react/no-unknown-property
    <primitive object={earth.scene} scale={2} position-y={0} rotation-y={0} />
  );
};

export const EarthCanvas = () => {
  const getCanvasSize = () => {
    if (window.innerWidth <= 768) {
      return {
        width: '100%',
        height: '400px',
        marginTop: '-70px',
      };
    } else {
      return {
        width: '100%',
        height: '600px',
        marginTop: '-100px',
      };
    }
  };

  const canvasSize = getCanvasSize();
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 55,
        near: 0.1,
        far: 300,
        position: [-5, 3, 6],
      }}
      style={{
        position: 'relative',
        width: canvasSize.width,
        height: canvasSize.height,
        marginLeft: '0',
        marginTop: canvasSize.marginTop,
        padding: 0,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};
