let socket = null;
let latestNumber = "Waiting for data...";
let popupPort = null;

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8765");

  socket.onopen = function(e) {
    console.log("[background.js] WebSocket connection established");
  };

  socket.onmessage = function(event) {
    latestNumber = event.data;
    console.log(`[background.js] Received number: ${latestNumber}`);
    
    if (popupPort) {
      popupPort.postMessage({number: latestNumber});
    }
  };

  socket.onclose = function(event) {
    console.log("[background.js] WebSocket connection closed, reconnecting...");
    setTimeout(connectWebSocket, 1000);
  };

  socket.onerror = function(error) {
    console.error("[background.js] WebSocket error:", error);
    socket.close();
  };
}

connectWebSocket();

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "popup");
  popupPort = port;
  
  port.postMessage({number: latestNumber});
  
  port.onDisconnect.addListener(function() {
    popupPort = null;
  });
});