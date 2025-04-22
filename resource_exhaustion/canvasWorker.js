onmessage = function () {
    const canvas = document.createElement('canvas');
    canvas.width = 10000;
    canvas.height = 10000;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const start = Date.now();
    while (Date.now() - start < 10000) {
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.fillRect(Math.random() * 10000, Math.random() * 10000, 1000, 1000);
      }
    }
    postMessage("Canvas Worker Done");
  };
  