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

document.getElementById("btn4").addEventListener("click", () => {
  const resultEl = document.getElementById("result4");
  const statusEl = document.getElementById("status4");
  resultEl.classList.remove("hidden");

  statusEl.textContent = "⏳ Simulating NORMAL usage (primes)...";
  statusEl.className = "status pending";

  const worker = new Worker("resource_exhaustion/regularCalculations.js");
  worker.postMessage(30000);

  worker.onmessage = (e) => {
    statusEl.textContent = `✅ Completed: ${e.data}`;
    statusEl.className = "status allowed";
  };
});

document.getElementById('btn5').addEventListener('click', () => {
  const resultEl = document.getElementById("result5");
  const statusEl = document.getElementById("status5");
  resultEl.classList.remove("hidden");

  alert("⚠️ Resource usage simulation starting. This will run for 30 seconds and may freeze or crash your browser tab!");

  statusEl.textContent = "⏳ Running INTENSE resource usage simulation...";
  statusEl.className = "status pending";

  const cpuWorker = new Worker('resource_exhaustion/cpuWorker.js');
  const memoryWorker = new Worker('resource_exhaustion/memoryWorker.js');
  const networkWorker = new Worker('resource_exhaustion/networkWorker.js');

  cpuWorker.onmessage = (e) => console.log("CPU:", e.data);
  memoryWorker.onmessage = (e) => console.log("Memory:", e.data);
  networkWorker.onmessage = (e) => console.log("Network:", e.data);

  cpuWorker.postMessage({});
  memoryWorker.postMessage({});
  networkWorker.postMessage({});

  setTimeout(() => {
    statusEl.textContent = "✅ INTENSE simulation complete.";
    statusEl.className = "status allowed";
  }, 20000);
});




