chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    return;
  }

  switch (command) {
    case 'open_side_panel': {
      await chrome.sidePanel.open({ tabId: tab.id });
      break;
    }
  }
});
