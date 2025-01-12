import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import {
  MeshStandardMaterial,
  TextureLoader,
  Raycaster,
  Vector2,
  Group,
} from "three";

import baseColorTexture from "./assets/textures/camera_camera_BaseColor.png";
import metallicTexture from "./assets/textures/camera_camera_Metallic.png";
import normalTexture from "./assets/textures/camera_camera_NormalOpenGL.png";
import roughnessTexture from "./assets/textures/camera_camera_Roughness.png";

import cameraModelUrl from "./assets/model/camera.fbx";

const DebugHelper = () => {
  const { scene, camera } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let lastHighlightedObject = null;

  const resetHighlight = () => {
    if (lastHighlightedObject && lastHighlightedObject.material) {
      lastHighlightedObject.material.emissive?.setHex(0x000000);
      lastHighlightedObject = null;
    }
  };

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();

      const canvas = event.target;
      const rect = canvas.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const meshes = [];
      scene.traverse((object) => {
        if (object.isMesh && object.name.includes("Camera_Mesh")) {
          meshes.push(object);
        }
      });

      const intersects = raycaster.intersectObjects(meshes, true);

      resetHighlight();

      if (intersects.length > 0) {
        const object = intersects[0].object;

        if (object.material) {
          object.material.emissive?.setHex(0xff0000);
          lastHighlightedObject = object;
        }

        console.group("Inspected Camera Part");
        console.log("Name:", object.name);
        console.log("Type:", object.type);
        console.log("Position:", {
          x: object.position.x.toFixed(3),
          y: object.position.y.toFixed(3),
          z: object.position.z.toFixed(3),
        });
        console.log("Rotation:", {
          x: object.rotation.x.toFixed(3),
          y: object.rotation.y.toFixed(3),
          z: object.rotation.z.toFixed(3),
        });
        console.log("Scale:", {
          x: object.scale.x.toFixed(3),
          y: object.scale.y.toFixed(3),
          z: object.scale.z.toFixed(3),
        });
        console.log("Material Properties:", {
          type: object.material.type,
          color: object.material.color?.getHexString(),
          roughness: object.material.roughness,
          metalness: object.material.metalness,
        });
        console.log("Geometry:", {
          vertices: object.geometry.attributes.position?.count || 0,
          faces: object.geometry.index ? object.geometry.index.count / 3 : 0,
        });
        console.groupEnd();
      }
    };

    const canvas = document.querySelector("canvas");
    canvas?.addEventListener("contextmenu", handleRightClick);

    return () => {
      canvas?.removeEventListener("contextmenu", handleRightClick);
      resetHighlight();
    };
  }, [scene, camera]);

  return null;
};

const CameraModel = () => {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const [textures, setTextures] = useState({
    baseColor: null,
    metallic: null,
    normal: null,
    roughness: null,
  });

  useEffect(() => {
    const textureLoader = new TextureLoader();

    const loadTexture = (url, type) => {
      textureLoader.load(url, (texture) => {
        setTextures((prev) => ({ ...prev, [type]: texture }));
        texture.anisotropy = 16;
        texture.needsUpdate = true;
      });
    };

    loadTexture(baseColorTexture, "baseColor");
    loadTexture(metallicTexture, "metallic");
    loadTexture(normalTexture, "normal");
    loadTexture(roughnessTexture, "roughness");
  }, []);

  const fbx = useLoader(FBXLoader, cameraModelUrl);
  useEffect(() => {
    if (fbx) {
      fbx.scale.set(0.01, 0.01, 0.01);
      fbx.position.set(0, 0, 0);
      fbx.rotation.set(0, 26.7, 0);

      let meshIndex = 0;
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.name = `Camera_Mesh_Part_${meshIndex++}`;
          meshRefs.current.push(child);

          child.material = new MeshStandardMaterial({
            map: textures.baseColor,
            roughnessMap: textures.roughness,
            metalnessMap: textures.metallic,
            normalMap: textures.normal,
            roughness: 0.5,
            metalness: 0.5,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      groupRef.current.add(fbx);
    }
  }, [fbx, textures]);

  return <group ref={groupRef} name="Camera_Group" />;
};

const App = () => {
  const [flash, setFlash] = useState(false); // Initially no flash
  const canvasRef = useRef();
  const cameraRef = useRef();

  // Trigger flash effect
  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200); // Flash for 200ms
  };

  // Camera movement based on cursor
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!canvasRef.current || !cameraRef.current) return;

      const { clientWidth, clientHeight } = canvasRef.current;

      const offsetX = (event.clientX / clientWidth - 0.5) * 2;
      const offsetY = (event.clientY / clientHeight - 0.5) * 2;

      cameraRef.current.position.x = offsetX * 5; // Adjust the multiplier for sensitivity
      cameraRef.current.position.y = -offsetY * 5;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative">
      {flash && (
        <div className="absolute inset-0 bg-white opacity-100 transition-opacity duration-100 ease-in-out z-50"></div>
      )}

<div className="flex justify-center self-center ml-10 items-center text-[100px] font-bold text-[#ffffff]">
      SANTHOSH MUTHURAMAN
      </div>

      <Canvas
        ref={canvasRef}
        camera={{
          position: [0, 1, 8],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        className="w-full h-full"
        shadows
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
        }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        <Stats />
        <DebugHelper />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[5, 5, 5]} intensity={0.7} />
        <CameraModel />
        <OrbitControls />
      </Canvas>
    

      <button
        className="absolute bottom-10 p-4 text-white bg-blue-500 rounded"
        onClick={triggerFlash}
      >
        Trigger Flash
      </button>
    </div>
  );
};

export default App;
