onmessage = function () {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      Math.sqrt(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    postMessage("CPU Worker Done");
  };
  