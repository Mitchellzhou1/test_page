let regexPatterns = [];
let blockedUrls = [];
let protectionEnabled = true;

// Convert wildcard to regex
function wildcardToRegex(wildcard) {
  return new RegExp("^" + wildcard
    .replace(/\./g, '\\.')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.') + "$");
}

// Load patterns and state
(async () => {
  const data = await chrome.storage.sync.get(['protectionActive', 'blockedUrls']);
  protectionEnabled = data.protectionActive !== false;
  blockedUrls = data.blockedUrls || [];

  const blacklistText = await fetch(chrome.runtime.getURL('blacklist.txt')).then(r => r.text());
  regexPatterns = blacklistText.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(pattern => ({
      pattern,
      regex: wildcardToRegex(pattern)
    }));
})();

// Detect but NOT block
chrome.webRequest.onCompleted.addListener(async (details) => {
  if (!protectionEnabled) return;

  const url = details.url;
  let origin = "";
  try {
    origin = details.initiator ? new URL(details.initiator).origin : new URL(url).origin;
  } catch (e) {
    origin = new URL(url).origin;
  }

  for (let { regex, pattern } of regexPatterns) {
    if (regex.test(url)) {
      if (!blockedUrls.includes(url)) {
        blockedUrls.push(url);
        chrome.storage.sync.set({ blockedUrls });
        chrome.runtime.sendMessage({
          action: "updateBlockedCount",
          count: blockedUrls.length
        });
      }

      const blockUrl = chrome.runtime.getURL('blockpage.html') +
        `?u=${encodeURIComponent(url)}&r=${encodeURIComponent(pattern)}&origin=${encodeURIComponent(origin)}`;

      if (details.tabId >= 0) {
        chrome.tabs.update(details.tabId, { url: blockUrl });
      }
      break;
    }
  }
}, { urls: ["<all_urls>"] });
