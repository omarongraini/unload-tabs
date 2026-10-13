browser.browserAction.onClicked.addListener(async () => {
  const { allowPinned } = await browser.storage.local.get("allowPinned");
  const tabs = await browser.tabs.query({});

  for (const tab of tabs) {
    if (tab.active) continue;          // never unload the current tab
    if (tab.pinned && !allowPinned) continue; // skip pinned unless allowed
    browser.tabs.discard(tab.id);
  }
});