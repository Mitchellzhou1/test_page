document.addEventListener('DOMContentLoaded', () => {
  // Initial load
  checkCpuSupport();
  
  // Update every second
  setInterval(checkCpuSupport, 1000);
});

function checkCpuSupport() {
  // First check if the API is available
  if (!chrome.system || !chrome.system.cpu) {
    showError("CPU API not available. Check permissions in manifest.json");
    return;
  }

  updateCpuUsage();
}

function updateCpuUsage() {
  chrome.system.cpu.getInfo((cpuInfo) => {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    
    try {
      // Calculate total usage
      let totalUsage = 0;
      let count = 0;
      
      for (const processor of cpuInfo.processors) {
        for (const usage of processor.usage) {
          totalUsage += usage.total;
          count++;
        }
      }
      
      if (count === 0) {
        showError("No CPU data received");
        return;
      }
      
      // Calculate average usage percentage
      const avgUsage = (totalUsage / count) * 100;
      const roundedUsage = Math.round(avgUsage * 10) / 10;
      
      // Update UI
      document.getElementById('cpuBar').style.width = `${roundedUsage}%`;
      document.getElementById('cpuPercent').textContent = `${roundedUsage}%`;
      
      // Change color based on usage
      const cpuBar = document.getElementById('cpuBar');
      if (roundedUsage > 70) {
        cpuBar.style.backgroundColor = '#f44336';
      } else if (roundedUsage > 40) {
        cpuBar.style.backgroundColor = '#FFC107';
      } else {
        cpuBar.style.backgroundColor = '#4CAF50';
      }
      
      // Display processor info
      const modelInfo = cpuInfo.modelName.match(/\d+\.\d+GHz/) || ['N/A'];
      document.getElementById('cpuInfo').textContent = 
        `${cpuInfo.numOfProcessors} cores @ ${modelInfo[0]}`;
        
    } catch (error) {
      showError(error.message);
    }
  });
}

function showError(message) {
  document.getElementById('cpuInfo').textContent = `Error: ${message}`;
  document.getElementById('cpuPercent').textContent = '--%';
  document.getElementById('cpuBar').style.width = '0%';
}