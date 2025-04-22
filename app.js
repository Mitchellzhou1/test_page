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
  const start = Date.now();
  const arr = [];

  const bloatDOM = () => {
    for (let i = 0; i < 5000; i++) {
      const el = document.createElement('div');
      el.textContent = '🚨'.repeat(100);
      document.body.appendChild(el);
    }
  };

  const memoryFlood = () => {
    for (let i = 0; i < 1000; i++) {
      arr.push(new Array(1e5).fill("crash"));
    }
  };

  const canvasAttack = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 10000;
    canvas.height = 10000;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 1000; i++) {
      ctx.fillRect(Math.random() * 10000, Math.random() * 10000, 1000, 1000);
    }
  };

  const networkSpam = () => {
    for (let i = 0; i < 200; i++) {
      fetch("https://httpbin.org/get?x=" + Math.random()).catch(() => {});
    }
  };

  const cpuHammer = () => {
    while (Date.now() - start < 10000) {
      Math.sqrt(Math.random() * Number.MAX_SAFE_INTEGER);
      memoryFlood();
      canvasAttack();
      networkSpam();
      bloatDOM();
    }
    alert("Crash simulation complete!");
  };

  setTimeout(cpuHammer, 10);
});


