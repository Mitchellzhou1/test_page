let lastUsage = null;

function calculateUsageDelta(prev, curr) {
  return curr.map((core, i) => {
    const prevCore = prev[i];
    const activePrev = prevCore.usage.user + prevCore.usage.kernel;
    const activeCurr = core.usage.user + core.usage.kernel;
    const totalPrev = prevCore.usage.total;
    const totalCurr = core.usage.total;

    const activeDelta = activeCurr - activePrev;
    const totalDelta = totalCurr - totalPrev;

    return totalDelta === 0 ? 0 : (activeDelta / totalDelta) * 100;
  });
}

function sampleCpuUsage() {
  chrome.system.cpu.getInfo(current => {
    if (lastUsage) {
      const usagePercents = calculateUsageDelta(lastUsage.processors, current.processors);
      const avgUsage = usagePercents.reduce((a, b) => a + b, 0) / usagePercents.length;
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] CPU Usage: ${avgUsage.toFixed(2)}%`);
    }
    lastUsage = current;
  });
}

setInterval(sampleCpuUsage, 5000); // every 5 seconds
