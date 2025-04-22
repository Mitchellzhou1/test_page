onmessage = function () {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      fetch("cryptojacking-C2-server").catch(() => {});
    }
    postMessage("Network Worker Done");
  };
  