document.getElementById('btn1').addEventListener('click', () => {
  const resultEl = document.getElementById('result1');
  const statusEl = document.getElementById('status1');
  resultEl.classList.remove('hidden');

  try {
    const script = document.createElement('script');
    script.src = 'https://www.webminepool.com/lib/base.js';
    script.onload = () => {
      statusEl.textContent = '✅ Loaded (NOT BLOCKED)';
      statusEl.className = 'status allowed';
    };
    script.onerror = () => {
      statusEl.textContent = '❌ Blocked by extension';
      statusEl.className = 'status blocked';
    };
    document.head.appendChild(script);
  } catch (e) {
    statusEl.textContent = `❌ Error: ${e.message}`;
    statusEl.className = 'status blocked';
  }
});

document.getElementById('btn2').addEventListener('click', () => {
  const resultEl = document.getElementById('result2');
  const statusEl = document.getElementById('status2');
  resultEl.classList.remove('hidden');

  fetch('/cryptonight.wasm')
    .then(() => {
      statusEl.textContent = '✅ Loaded (NOT BLOCKED)';
      statusEl.className = 'status allowed';
    })
    .catch((e) => {
      statusEl.textContent = '❌ Blocked by extension';
      statusEl.className = 'status blocked';
    });
});