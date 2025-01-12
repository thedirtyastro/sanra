const App = () => {
  const [flash, setFlash] = useState(false); // Initially no flash
  const canvasRef = useRef();
  const cameraRef = useRef();
  const rotationRef = useRef(0); // Reference for rotation angle
  const zoomLevel = useRef(60); // Reference for zoom level (initially 60)

  // Trigger flash effect
  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200); // Flash for 200ms
  };

  // Continuous rotation logic
  useEffect(() => {
    const rotateCamera = () => {
      if (cameraRef.current) {
        rotationRef.current += 0.01; // Increment rotation
        const radius = 8; // Radius of the circular path
        const x = radius * Math.sin(rotationRef.current);
        const z = radius * Math.cos(rotationRef.current);

        cameraRef.current.position.set(x, 1, z);
        cameraRef.current.lookAt(0, 0, 0); // Keep the camera focused on the center
      }

      requestAnimationFrame(rotateCamera); // Keep looping
    };

    rotateCamera();
  }, []);

  // Zoom on scroll logic
  useEffect(() => {
    const handleScroll = (event) => {
      if (cameraRef.current) {
        const delta = event.deltaY * 0.01; // Adjust zoom speed
        zoomLevel.current = Math.max(
          50,
          Math.min(70, zoomLevel.current + delta)
        ); // Clamp zoom level between 50 and 70
        cameraRef.current.fov = zoomLevel.current;
        cameraRef.current.updateProjectionMatrix(); // Apply changes
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative">
      {flash && (
        <div className="absolute inset-0 bg-white opacity-100 transition-opacity duration-100 ease-in-out z-50"></div>
      )}

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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] font-bold text-[#a3a4a4]">
        SANTHOSH MUTHURAMAN
      </div>

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
