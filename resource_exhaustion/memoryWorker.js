onmessage = function () {
    const arr = [];
    const start = Date.now();
    while (Date.now() - start < 10000) {
      arr.push(new Array(1e5).fill("💣"));
    }
    postMessage("Memory Worker Done");
  };
  