onmessage = function () {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      fetch("https://cryptoJackingC2Server.com/thisnotreal").catch(() => {});
    }
    postMessage("Network Worker Done");
  };
  