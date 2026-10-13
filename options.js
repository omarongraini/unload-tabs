const checkbox = document.getElementById("allowPinned");
const status = document.getElementById("status");

// load saved setting
browser.storage.local.get("allowPinned").then((res) => {
  checkbox.checked = res.allowPinned || false;
});

// save on change
checkbox.addEventListener("change", () => {
  browser.storage.local.set({ allowPinned: checkbox.checked });
  status.textContent = "Saved.";
});