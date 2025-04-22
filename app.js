document.getElementById('btn1').addEventListener('click', async () => {  // Added async here
  const resultEl = document.getElementById('result1');
  const statusEl = document.getElementById('status1');
  resultEl.classList.remove('hidden');

  try {
    const response = await fetch('https://www.webminepool.com/lib/base.js');
    if (response.ok) {
      statusEl.textContent = '✅ Loaded (NOT BLOCKED)';
      statusEl.className = 'status allowed';
    } else {
      statusEl.textContent = '❌ Blocked by server';
      statusEl.className = 'status blocked';
    }
  } catch (e) {
    statusEl.textContent = `❌ Error: ${e.message}`;
    statusEl.className = 'status blocked';
  }
});

document.getElementById('btn2').addEventListener('click', () => {
  const resultEl = document.getElementById('result2');
  const statusEl = document.getElementById('status2');
  resultEl.classList.remove('hidden');

  fetch('cryptonight.wasm')
    .then((response) => {
      if (response.ok) {
        statusEl.textContent = '✅ Loaded (NOT BLOCKED)';
        statusEl.className = 'status allowed';
      } else {
        statusEl.textContent = '❌ Blocked by server';
        statusEl.className = 'status blocked';
      }
    })
    .catch((e) => {
      statusEl.textContent = `❌ Error: ${e.message}`;
      statusEl.className = 'status blocked';
    });
});

document.getElementById("btn3").addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.src = "iframe-miner.html";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.display = "none";

  document.body.appendChild(iframe);
  document.getElementById("result3").classList.remove("hidden");
});


document.getElementById('btn4').addEventListener('click', () => {
  alert("⚠️ Resource usage simulation starting. This will run for 10 seconds and may freeze or crash your browser tab!");

  const cpuWorker = new Worker('resource_exhaustion/cpuWorker.js');
  const memoryWorker = new Worker('resource_exhaustion/memoryWorker.js');
  const canvasWorker = new Worker('resource_exhaustion/canvasWorker.js');
  const networkWorker = new Worker('resource_exhaustion/networkWorker.js');
  const domWorker = new Worker('resource_exhaustion/domWorker.js');

  // Start workers and listen for completion
  cpuWorker.onmessage = (e) => console.log(e.data);
  memoryWorker.onmessage = (e) => console.log(e.data);
  canvasWorker.onmessage = (e) => console.log(e.data);
  networkWorker.onmessage = (e) => console.log(e.data);
  domWorker.onmessage = (e) => console.log(e.data);

  // Send start signal to workers
  cpuWorker.postMessage({});
  memoryWorker.postMessage({});
  canvasWorker.postMessage({});
  networkWorker.postMessage({});
  domWorker.postMessage({});

  // Handle simulation completion
  setTimeout(() => {
    alert("✅ Resource simulation complete.");
  }, 50000 + 100);
});



