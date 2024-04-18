import React, { useEffect, useRef } from 'react';
function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Dibuja algo en el canvas    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []); // Este efecto se ejecuta solo una vez, después de que el componente se monta en el DOMreturn 
  
  (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}><canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} /></div>
  );
}

export default CanvasBackground;