async function countTabs() {
  const tabs = await browser.tabs.query({});
  let all = 0;
  let unpinned = 0;

  for (const tab of tabs) {
    if (tab.active) continue;      // current tab never counted
    if (tab.discarded) continue;   // already unloaded, skip
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
    browser.tabs.discard(tab.id);
  }
  window.close();
}

document.getElementById("unloadAll").addEventListener("click", () => unload(false));
document.getElementById("unloadUnpinned").addEventListener("click", () => unload(true));

countTabs();