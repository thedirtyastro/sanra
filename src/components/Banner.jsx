import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { MeshStandardMaterial, TextureLoader, DirectionalLight } from "three";

import baseColorTexture from "../assets/textures/camera_camera_BaseColor.png";
import metallicTexture from "../assets/textures/camera_camera_Metallic.png";
import normalTexture from "../assets/textures/camera_camera_NormalOpenGL.png";
import roughnessTexture from "../assets/textures/camera_camera_Roughness.png";

import cameraModelUrl from "../assets/model/camera.fbx";

const CameraModel = ({ scrollPosition }) => {
  const groupRef = useRef();
  const lightRef = useRef();
  const [time, setTime] = useState(0);
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
      fbx.scale.set(0.008, 0.008, 0.008);
      fbx.rotation.set(0, 26.7, 0);

      fbx.traverse((child) => {
        if (child.isMesh) {
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

  // useEffect(() => {
  //   let rotationInterval;

  //   if (groupRef.current) {
  //     rotationInterval = setInterval(() => {
  //       groupRef.current.rotation.y += 0.01;
  //     }, 16); // ~60fps
  //   }

  //   return () => {
  //     clearInterval(rotationInterval);
  //   };
  // }, []);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (lightRef.current) {
        // Create a circular motion for the light
        const radius = 5;
        const speed = 0.00013;
        setTime((prevTime) => prevTime + speed);

        // Update light position in a circular pattern
        lightRef.current.position.x = Math.cos(time) * radius;
        lightRef.current.position.z = Math.sin(time) * radius;

        // Slightly vary the intensity for additional effect
        lightRef.current.intensity = 1 + Math.sin(time * 2) * 0.2;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [time]);

  return (
    <>
      <group ref={groupRef} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
    </>
  );};

const Banner = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black relative">
      <div className="text-white z-30 fixed top-0 bg-black mt-5 rounded-full">
        <div className="container mx-auto  p-5 bg-black flex items-center rounded-full justify-between py-4 bg-transparent shadow-[0_4px_10px_rgba(192,192,192,0.7)]">
          <div className="flex space-x-6 text-lg bg-black font-medium">
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
            <a href="#aboutme" className="hover:text-gray-300">
              About Me
            </a>
            <a href="#myworks" className="hover:text-gray-300">
              My Works
            </a>
            <a href="#skills" className="hover:text-gray-300">
              Skills
            </a>
            <a href="#contactme" className="hover:text-gray-300">
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-[1600px] h-[1600px] z-20 flex justify-center items-center">
        {/* Rotating text circles */}
        <svg viewBox="-400 -400 800 800" className="absolute animate-spin-slow">
          <path
            id="circle-text-path"
            fill="none"
            d="M 0,200 A 200,200 0 1,1 0,-200 A 200,200 0 1,1 0,200"
          />
          <text fill="#444444" fontSize="24">
            <textPath href="#circle-text-path">
              PORTRAIT PHOTOGRAPHER • PASSIONATE CREATOR • ETHICAL STORYTELLER •
              VISUAL ARTIST •
            </textPath>
          </text>
        </svg>

        <svg
          viewBox="-400 -400 800 800"
          className="absolute animate-spin-reverse"
        >
          <path
            id="inner-circle-path"
            fill="none"
            d="M 0,150 A 150,150 0 1,1 0,-150 A 150,150 0 1,1 0,150"
          />
          <text fill="#666666" fontSize="20">
            <textPath href="#inner-circle-path">
              CAPTURING MOMENTS • CREATING MEMORIES • TELLING STORIES •
              PRESERVING TIME •
            </textPath>
          </text>
        </svg>

        <div className="text-[50px] uppercase z-50 font-bold text-white text-center leading-tight">
          <svg
            width="960"
            height="53"
            viewBox="0 0 960 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.184 52.504C15.28 52.504 10.432 51.112 6.64 48.328C2.848 45.496 0.808 41.464 0.52 36.232H15.568C15.712 38.008 16.24 39.304 17.152 40.12C18.064 40.936 19.24 41.344 20.68 41.344C21.976 41.344 23.032 41.032 23.848 40.408C24.712 39.736 25.144 38.824 25.144 37.672C25.144 36.184 24.448 35.032 23.056 34.216C21.664 33.4 19.408 32.488 16.288 31.48C12.976 30.376 10.288 29.32 8.224 28.312C6.208 27.256 4.432 25.744 2.896 23.776C1.408 21.76 0.664 19.144 0.664 15.928C0.664 12.664 1.48 9.88 3.112 7.576C4.744 5.224 7 3.448 9.88 2.248C12.76 1.048 16.024 0.447999 19.672 0.447999C25.576 0.447999 30.28 1.84 33.784 4.624C37.336 7.36 39.232 11.224 39.472 16.216H24.136C24.088 14.68 23.608 13.528 22.696 12.76C21.832 11.992 20.704 11.608 19.312 11.608C18.256 11.608 17.392 11.92 16.72 12.544C16.048 13.168 15.712 14.056 15.712 15.208C15.712 16.168 16.072 17.008 16.792 17.728C17.56 18.4 18.496 19 19.6 19.528C20.704 20.008 22.336 20.632 24.496 21.4C27.712 22.504 30.352 23.608 32.416 24.712C34.528 25.768 36.328 27.28 37.816 29.248C39.352 31.168 40.12 33.616 40.12 36.592C40.12 39.616 39.352 42.328 37.816 44.728C36.328 47.128 34.144 49.024 31.264 50.416C28.432 51.808 25.072 52.504 21.184 52.504ZM78.7924 43.72H60.7924L58.0564 52H43.2244L61.7284 1.24H78.0004L96.4324 52H81.5284L78.7924 43.72ZM75.2644 32.92L69.7924 16.504L64.3924 32.92H75.2644ZM148.048 52H133.936L115.144 23.632V52H101.032V1.24H115.144L133.936 29.968V1.24H148.048V52ZM194.319 1.24V12.472H180.783V52H166.671V12.472H153.279V1.24H194.319ZM244.972 1.24V52H230.86V31.624H213.652V52H199.54V1.24H213.652V20.32H230.86V1.24H244.972ZM277.384 52.504C272.632 52.504 268.264 51.4 264.28 49.192C260.296 46.936 257.128 43.84 254.776 39.904C252.472 35.92 251.32 31.432 251.32 26.44C251.32 21.448 252.472 16.984 254.776 13.048C257.128 9.064 260.296 5.968 264.28 3.76C268.264 1.552 272.632 0.447999 277.384 0.447999C282.184 0.447999 286.552 1.552 290.488 3.76C294.472 5.968 297.616 9.064 299.92 13.048C302.224 16.984 303.376 21.448 303.376 26.44C303.376 31.432 302.224 35.92 299.92 39.904C297.616 43.84 294.472 46.936 290.488 49.192C286.504 51.4 282.136 52.504 277.384 52.504ZM277.384 39.4C280.984 39.4 283.816 38.224 285.88 35.872C287.992 33.52 289.048 30.376 289.048 26.44C289.048 22.408 287.992 19.24 285.88 16.936C283.816 14.584 280.984 13.408 277.384 13.408C273.736 13.408 270.88 14.584 268.816 16.936C266.752 19.24 265.72 22.408 265.72 26.44C265.72 30.424 266.752 33.592 268.816 35.944C270.88 38.248 273.736 39.4 277.384 39.4ZM328.872 52.504C322.968 52.504 318.12 51.112 314.328 48.328C310.536 45.496 308.496 41.464 308.208 36.232H323.256C323.4 38.008 323.928 39.304 324.84 40.12C325.752 40.936 326.928 41.344 328.368 41.344C329.664 41.344 330.72 41.032 331.536 40.408C332.4 39.736 332.832 38.824 332.832 37.672C332.832 36.184 332.136 35.032 330.744 34.216C329.352 33.4 327.096 32.488 323.976 31.48C320.664 30.376 317.976 29.32 315.912 28.312C313.896 27.256 312.12 25.744 310.584 23.776C309.096 21.76 308.352 19.144 308.352 15.928C308.352 12.664 309.168 9.88 310.8 7.576C312.432 5.224 314.688 3.448 317.568 2.248C320.448 1.048 323.712 0.447999 327.36 0.447999C333.264 0.447999 337.968 1.84 341.472 4.624C345.024 7.36 346.92 11.224 347.16 16.216H331.824C331.776 14.68 331.296 13.528 330.384 12.76C329.52 11.992 328.392 11.608 327 11.608C325.944 11.608 325.08 11.92 324.408 12.544C323.736 13.168 323.4 14.056 323.4 15.208C323.4 16.168 323.76 17.008 324.48 17.728C325.248 18.4 326.184 19 327.288 19.528C328.392 20.008 330.024 20.632 332.184 21.4C335.4 22.504 338.04 23.608 340.104 24.712C342.216 25.768 344.016 27.28 345.504 29.248C347.04 31.168 347.808 33.616 347.808 36.592C347.808 39.616 347.04 42.328 345.504 44.728C344.016 47.128 341.832 49.024 338.952 50.416C336.12 51.808 332.76 52.504 328.872 52.504ZM399.8 1.24V52H385.688V31.624H368.48V52H354.368V1.24H368.48V20.32H385.688V1.24H399.8ZM480.913 1.24V52H466.801V23.992L457.225 52H445.417L435.769 23.776V52H421.657V1.24H438.721L451.465 34.216L463.921 1.24H480.913ZM502.77 1.24V30.688C502.77 33.424 503.394 35.536 504.642 37.024C505.938 38.512 507.882 39.256 510.474 39.256C513.066 39.256 515.01 38.512 516.306 37.024C517.65 35.488 518.322 33.376 518.322 30.688V1.24H532.434V30.688C532.434 35.344 531.45 39.328 529.482 42.64C527.514 45.904 524.826 48.376 521.418 50.056C518.058 51.688 514.314 52.504 510.186 52.504C506.058 52.504 502.362 51.688 499.098 50.056C495.882 48.376 493.338 45.904 491.466 42.64C489.642 39.376 488.73 35.392 488.73 30.688V1.24H502.77ZM578.436 1.24V12.472H564.9V52H550.788V12.472H537.396V1.24H578.436ZM629.089 1.24V52H614.977V31.624H597.769V52H583.657V1.24H597.769V20.32H614.977V1.24H629.089ZM650.989 1.24V30.688C650.989 33.424 651.613 35.536 652.861 37.024C654.157 38.512 656.101 39.256 658.693 39.256C661.285 39.256 663.229 38.512 664.525 37.024C665.869 35.488 666.541 33.376 666.541 30.688V1.24H680.653V30.688C680.653 35.344 679.669 39.328 677.701 42.64C675.733 45.904 673.045 48.376 669.637 50.056C666.277 51.688 662.533 52.504 658.405 52.504C654.277 52.504 650.581 51.688 647.317 50.056C644.101 48.376 641.557 45.904 639.685 42.64C637.861 39.376 636.949 35.392 636.949 30.688V1.24H650.989ZM714.127 52L704.047 33.28H702.535V52H688.423V1.24H710.671C714.751 1.24 718.207 1.96 721.039 3.4C723.871 4.792 726.007 6.736 727.447 9.232C728.887 11.68 729.607 14.44 729.607 17.512C729.607 20.968 728.647 24.016 726.727 26.656C724.855 29.248 722.095 31.096 718.447 32.2L729.895 52H714.127ZM702.535 23.632H709.519C711.439 23.632 712.879 23.176 713.839 22.264C714.799 21.352 715.279 20.032 715.279 18.304C715.279 16.672 714.775 15.4 713.767 14.488C712.807 13.528 711.391 13.048 709.519 13.048H702.535V23.632ZM768.136 43.72H750.136L747.4 52H732.568L751.072 1.24H767.344L785.776 52H770.872L768.136 43.72ZM764.608 32.92L759.136 16.504L753.736 32.92H764.608ZM849.632 1.24V52H835.52V23.992L825.944 52H814.136L804.488 23.776V52H790.376V1.24H807.44L820.184 34.216L832.64 1.24H849.632ZM889.777 43.72H871.777L869.041 52H854.209L872.713 1.24H888.985L907.417 52H892.513L889.777 43.72ZM886.249 32.92L880.777 16.504L875.377 32.92H886.249ZM959.032 52H944.92L926.128 23.632V52H912.016V1.24H926.128L944.92 29.968V1.24H959.032V52Z"
              fill="url(#paint0_linear_26_13)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_26_13"
                x1="488.5"
                y1="-27"
                x2="488.5"
                y2="81"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#474747" />
              </linearGradient>
            </defs>
          </svg>{" "}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
      <div className="absolute w-full h-full ">
        <div className="w-full h-full">
          <Canvas
            camera={{
              position: [0, 1, 5],
              fov: 75,
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
          >
            <Stats />
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
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Banner;
