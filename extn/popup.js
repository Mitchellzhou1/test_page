let numberDisplay = document.getElementById('numberDisplay');
let port = chrome.runtime.connect({name: "popup"});

port.onMessage.addListener(function(msg) {
  if (msg.number) {
    numberDisplay.textContent = msg.number;
  }
});

port.onDisconnect.addListener(function() {
  numberDisplay.textContent = "Disconnected";
});