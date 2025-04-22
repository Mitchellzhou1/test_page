onmessage = function () {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      for (let i = 0; i < 200; i++) {
        const el = document.createElement('div');
        el.textContent = '🚨'.repeat(100);
        el.style.fontSize = "2px";
        document.body.appendChild(el);
      }
    }
    postMessage("DOM Worker Done");
  };
  