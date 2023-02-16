import { Locales } from './locales.js'
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
var menutitle = "使用 ChatGPT 处理内容";

chrome.runtime.onInstalled.addListener(async () => {
    //for (let [tld, locale] of Object.entries(Locales)) {
      chrome.contextMenus.create({
        id: "",
        title: menutitle,
        type: 'normal',
        contexts: ['selection','all'],
      });
    //}
  });
  


// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
  const tld = item.menuItemId

  var content = item.selectionText
  
  var params = `scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=400,height=700,left=400,top=100`;
  var url ="popup.html?mquery="+encodeURIComponent(content)

  chrome.windows.getCurrent(function(wind) {

    var screen = wind.screen


    var w = 600;
    var h = 800;
    var left = (1600/2)-(w/2);
    var top = (1000/2)-(h/2); 
    
      chrome.windows.create(
        {
          focused: true,
          url: url,
          type: 'popup',
          width: w, height: h, left: left, top: top
        },
        (subWindow) => {
          /*chrome.runtime.sendmessage({
            type: "a_message_type",
            foo: "bar"
          });*/
          var selecttext = content;
          //subWindow.document.body.innerHTML="asdf"
        }
      )
  });


  
/*
  chrome.scripting.executeScript({
    //var bkg = chrome.extension.getBackgroundPage();
    //bkg.console.log(item);
    //alert("ok1")
  })

  //window.open("popup.html?q="+content,menutitle,params)
  //chrome.tabs.create({ url: url, index: tab.index + 1 });
  chrome.tabs.executeScript(tab.id, {
    file: "jquery.min.js"//
  });
  chrome.tabs.executeScript(tab.id, {
    code: "layerpath ='" + layerpath + "';"// tab.url
  });

  chrome.tabs.executeScript(tab.id, {
    file: "layer185.min.js"//
  });
  chrome.tabs.executeScript(tab.id, {
    file: "openChatGPT.js"//
  });
  */
  /*
  let url = new URL(`https://google.${tld}/search`)
  url.searchParams.set('q', item.selectionText)
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });*/
});
