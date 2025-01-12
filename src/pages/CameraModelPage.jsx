import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { MeshStandardMaterial, TextureLoader } from "three";

import baseColorTexture from "../assets/textures/camera_camera_BaseColor.png";
import metallicTexture from "../assets/textures/camera_camera_Metallic.png";
import normalTexture from "../assets/textures/camera_camera_NormalOpenGL.png";
import roughnessTexture from "../assets/textures/camera_camera_Roughness.png";

import cameraModelUrl from "../assets/model/camera.fbx";

const CameraModelPage = ({ triggerFlash }) => {
  const [textures, setTextures] = useState({
    baseColor: null,
    metallic: null,
    normal: null,
    roughness: null,
  });

  const fbx = useLoader(FBXLoader, cameraModelUrl);

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

  useEffect(() => {
    if (fbx && textures.baseColor) {
      fbx.scale.set(0.01, 0.01, 0.01);
      fbx.position.set(0, 0, 0);
      fbx.rotation.set(0, 27, 0);

      fbx.traverse((child) => {
        if (child.isMesh) {
          child.name = "Camera_Mesh";
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
    }
  }, [fbx, textures]);

  return (
    <group name="Camera_Group">
      {fbx && <primitive object={fbx} />}
    </group>
  );
};

export default CameraModelPage;
