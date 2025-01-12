// FlashEffect.js
import React, { useEffect, useState } from "react";

const FlashEffect = ({ triggerFlash }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (triggerFlash) {
      setFlash(true);
      setTimeout(() => setFlash(false), 100); // Flash lasts 100ms
    }
  }, [triggerFlash]);

  return (
    flash && (
      <div className="absolute inset-0 bg-white opacity-100 animate-camera-flash z-50"></div>
    )
  );
};

export default FlashEffect;
