function canUnload(tab) {
  const url = tab.url || "";
  if (!url) return false;
  if (url.startsWith("about:")) return false;
  if (url.startsWith("chrome://")) return false;
  if (url.startsWith("moz-extension://")) return false;
  return true;
}

async function updateBadge() {
  const tabs = await browser.tabs.query({});

  const unloadable = tabs.filter(canUnload);
  const total = unloadable.length;
  const unloaded = unloadable.filter(t => t.discarded).length;

  if (total === 0 || unloaded === 0) {
    browser.browserAction.setBadgeText({ text: "" });
    return;
  }

  const pct = Math.round((unloaded / total) * 100);
  browser.browserAction.setBadgeText({ text: pct + "%" });
  browser.browserAction.setBadgeBackgroundColor({ color: "#4CAF50" });
}

browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
browser.tabs.onCreated.addListener(updateBadge);
browser.tabs.onActivated.addListener(updateBadge);

updateBadge();