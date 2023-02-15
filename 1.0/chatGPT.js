
var child_exec = function () {
  var fun = function () {

  }
  var lines = new String(fun);
  return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
}
//setTimeout('iframee.contentWindow.eval(child_exec())',4000);

function searchonhaha(info, tab) {
  var searchurl = "http://v.hayoou.com/search.php?browser=chrome&l=zhcn&id=chromeUser" +
    "&q=" + encodeURIComponent(info.selectionText);
  window.open(searchurl);
}

url = '';
//if(typeof(tab.url)!='undefined')
//	url=tab.url;

targetWindow = null;

layerpath = chrome.extension.getURL("/layer");
//alert(layerpath);
//window.open(layerpath+"/skin/default/xubox_ico0.png");
summary_init = Array();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //alert(tabId);
  if (0 && typeof (summary_init[tabId]) == 'undefined')//changeInfo.status == 'complete') //typeof(summary_init[tabId])=='undefined')//
  {
    summary_init[tabId] = 1;
    // do your things
    chrome.tabs.executeScript(tabId, {
      file: "jquery.min.js"//
    });

    chrome.tabs.executeScript(tabId, {
      code: "layerpath ='" + layerpath + "';"// tab.url
    });

    chrome.tabs.executeScript(tabId, {
      file: "layer185.min.js"//
    });
    /*
      chrome.windows.getCurrent(function(win){
      //alert(win.location.href);
    })
    */
    chrome.tabs.executeScript(tabId, {
      code: "url ='" + tab.url + "';"// tab.url
        + "isdebug=0;inited =0;abstact_result0=0;notips=false;"
    });

    //window.open(chrome.extension.getURL("background/abstract.pan.js"));

    chrome.tabs.executeScript(tabId, {
      file: "abstract.min.js"//("background/abstract.pan.js")//chrome.extension.getURL
    });

  }
})


function opensummary(info, tab) {

  url = tab.url;

  chrome.windows.getCurrent(function (win) {
    targetWindow = win;
    var temp, p1Str = "";
    for (temp in targetWindow) {

      p1Str = p1Str + temp + " -- " + targetWindow[temp] + "\n"
    }

  })


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
    code: "url ='" + tab.url + "';"// tab.url
      + "isdebug=0;inited =0;notips=false;abstact_result0=0;re_summary=true;"
  });

  //window.open(chrome.extension.getURL("background/abstract.pan.js"));

  chrome.tabs.executeScript(tab.id, {
    file: "abstract.min.js"//("background/abstract.pan.js")//chrome.extension.getURL
  });

  setTimeout(function () {

  }, 1000);

  /*
    chrome.tabs.executeScript({
    //code: 'alert(1);document.body.style.backgroundColor="red";'
    //+"start_summary();",
    //code: 'alert(1);'
    file: "http://v.hayoou.com/src/abstract.pan.js"//("background/abstract.pan.js")//chrome.extension.getURL
  });
  */


}

//var menutitle = "\u4F7F\u7528\u6709\u9053\u641C\u7D22 " + Hex2Utf8(info.selectionText);
var menutitle2 = "Summary page using ChatGPT";
var parent2 = chrome.contextMenus.create({ "title": menutitle2, "contexts": ["all"], "onclick": opensummary, });

var menutitle = "搜索一下哈哈笑料 ";
//var parent = chrome.contextMenus.create({"title": "\u4F7F\u7528\u6709\u9053\u641C\u7D22 ","contexts":["selection"],"onclick":searchonyodao,});
var parent3 = chrome.contextMenus.create({ "title": menutitle, "contexts": ["selection"], "onclick": searchonhaha, });


//localStorage["a"] = "sfsf";//设置a为"sfsf"，覆盖上面的值
//localStorage.setItem("b","isaac");//设置b为"isaac"
//var a1 = localStorage["a"];//获取a的值
//var a2 = localStorage.a;//获取a的值
//var b = localStorage.getItem("b");//获取b的值
//localStorage.removeItem("c");//清除c的值
//chrome.storage.sync.get('b',function(result){})

var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?76fe9678629000018a136792cec43b70";//a042f12aa0f3f28813953de4f1e70a19";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
