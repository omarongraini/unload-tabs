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