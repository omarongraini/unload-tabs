function canUnload(tab) {
  const url = tab.url || "";
  if (!url) return false;
  if (url.startsWith("about:")) return false;
  if (url.startsWith("chrome://")) return false;
  if (url.startsWith("moz-extension://")) return false;
  return true;
}

async function countTabs() {
  const tabs = await browser.tabs.query({});
  let all = 0;
  let unpinned = 0;

  for (const tab of tabs) {
    if (tab.active) continue;
    if (tab.discarded) continue;
    if (!canUnload(tab)) continue;
    all++;
    if (!tab.pinned) unpinned++;
  }

  document.getElementById("countAll").textContent = all;
  document.getElementById("countUnpinned").textContent = unpinned;
}

async function unload(skipPinned) {
  const tabs = await browser.tabs.query({});
  for (const tab of tabs) {
    if (tab.active) continue;
    if (skipPinned && tab.pinned) continue;
    if (!canUnload(tab)) continue;
    browser.tabs.discard(tab.id);
  }
  window.close();
}
async function countStats() {
  const tabs = await browser.tabs.query({});
  let total = 0;
  let pinned = 0;

  for (const tab of tabs) {
    if (!canUnload(tab)) continue;
    total++;
    if (tab.pinned) pinned++;
  }

  document.getElementById("stats").textContent =
    `Tabs: ${total} · Pinned: ${pinned}`;
}

document.getElementById("unloadAll").addEventListener("click", () => unload(false));
document.getElementById("unloadUnpinned").addEventListener("click", () => unload(true));

countTabs();
countStats();