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
  const result = document.getElementById('result4');
  const status = document.getElementById('status4');
  result.classList.remove('hidden');
  status.textContent = 'Running high CPU load...';

  // Simulate high CPU usage for 5 seconds
  const endTime = Date.now() + 5000;
  while (Date.now() < endTime) {
    // Intentionally waste CPU with meaningless computation
    Math.sqrt(Math.random() * Number.MAX_SAFE_INTEGER);
    for (let i = 0; i < 10000; i++) {
      Math.pow(Math.random(), 10);
    }
  }

  status.textContent = 'Test complete. Your browser survived!';
});
