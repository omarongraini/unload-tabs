async function updateBadge() {
  const tabs = await browser.tabs.query({});
  const total = tabs.length;
  const unloaded = tabs.filter(t => t.discarded).length;

  if (total === 0 || unloaded === 0) {
    browser.browserAction.setBadgeText({ text: "" });
    return;
  }

  const pct = Math.round((unloaded / total) * 100);
  browser.browserAction.setBadgeText({ text: pct + "%" });
  browser.browserAction.setBadgeBackgroundColor({ color: "#4CAF50" });
}

// update on any tab change
browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
browser.tabs.onCreated.addListener(updateBadge);
browser.tabs.onActivated.addListener(updateBadge);

// update once on startup
updateBadge();