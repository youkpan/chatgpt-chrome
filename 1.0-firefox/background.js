// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
var menutitle = "Using ChatGPT process";

browser.contextMenus.create({
  id: "using-chatGPT",
  title: menutitle,
  contexts: ["selection", "all"],
});

function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "using-chatGPT") {

    var url = "popup.html?mquery=" + encodeURIComponent(info.selectionText)

    var w = 600;
    var h = 800;
    var left = (1600 / 2) - (w / 2);
    var top = (1000 / 2) - (h / 2);
    let creating = browser.windows.create({
      url: [url],
      type: "popup",
      height: 800,
      width: 600,
      left: left, top: top
    });
    creating.then(onCreated, onError);
  }
});

  