import React, { useState, useEffect } from "react";

const AnimatedText = () => {
  const name = "SANTHOSH MUTHURAMAN";
  const colors = ["#212529", "#343a40", "#495057", "#6c757d", "#868e96", "#adb5bd", "#ced4da", "#ffffff"]; // Dark and white matte colors
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Loop through the color array
    }, 500);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [colors.length]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] text-center font-bold text-[#ffffff]">
      {name.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            color: colors[(index + colorIndex) % colors.length], // Change color for each letter in a loop
            transition: "color 0.3s ease", // Smooth color transition
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
