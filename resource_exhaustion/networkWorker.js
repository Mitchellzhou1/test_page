onmessage = function () {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      fetch("https://httpbin.org/get?x=" + Math.random()).catch(() => {});
    }
    postMessage("Network Worker Done");
  };
  