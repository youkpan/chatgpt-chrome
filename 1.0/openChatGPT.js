var current_select = ""
var outdata =""
var apikey = ""
var language = "en"
function clear() {
    query = init_query
    $("#prompts")[0].value = current_select + "\nQ:" + query;
    $("#output")[0].value = ""
}

function get_result() {
    $("#prompts")[0].innerHTML += "\nA:"
    prompt2 = $("#prompts")[0].innerHTML
    apikey = $("#apikey")[0].value
    if (apikey == "") {
        alert("Please set API key,you can go to openai.com to get API key")
        return
    }
    chrome.storage.sync.set({'apikey': apikey}, function() {});
    //prompt2 = prompt1 + "\nQ:" + query+"\nA:"
    $.ajax({
        type: "post",
        url: "https://api.openai.com/v1/completions",
        async: true, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        data: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt2,
            "max_tokens": 1500,
            "temperature": 0.1,
            "top_p": 0.6,
            "n": 1,
            "presence_penalty": 0.2,
            "frequency_penalty": 0.1,
            "stream": false,
            "logprobs": null,
            "stop": ""
        }),
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': "Bearer " + apikey },
        dataType: "json",
        success: function (data) {
            console.log(data)
            outdata = data.choices[0].text
            if (outdata.length > 2) {
                if (outdata.substring(0, 2) == "\n\n") {
                    outdata = outdata.substring(2)
                }
                if (outdata.substring(0, 1) == "\n") {
                    outdata = outdata.substring(1)
                }
            }
            if (outdata.length > 0) {
                //query += "\nA:" + outdata+"\n\nQ:"
                $("#prompts")[0].innerHTML += outdata + "\n\nQ:";
                $('#output').text(outdata);
                prompts1 = $("#prompts")
                prompts1[0].scrollTop = prompts1[0].scrollHeight;
            }
        } // 注意不要在此行增加逗号
    });

}
$(function () {
    var userLang = navigator.language || navigator.userLanguage; 
    //alert ("The language is: " + userLang);
    language =userLang
    if (userLang.length>2){
        language = userLang.substring(0,2)
    }
    chrome.storage.sync.get(["current_select","apikey"]).then((result) => {
        console.log( result);
        current_select = result.current_select
        apikey = result.apikey
        $("#apikey")[0].value =apikey
    });

    $("#prompts")[0].innerHTML = current_select
    $("#apikey")[0].value = $.cookie("apikey")
    init_page()
    $("#submit").on("click",get_result)
    $("#clear").on("click",clear)
    $("#taskselect").on('change', function () {
        prompt1 = this.value
        current_select = prompt1
        chrome.storage.sync.set({'current_select': current_select}, function() {});
        if (language == "zh"){
            pos = prompt1.indexOf("我的第一")
            if (pos == -1) {
                pos = prompt1.indexOf("首先")
            }
            if (pos != -1) {
                prompt1 = prompt1.substring(0, pos)
            }
        }else{
            pos = prompt1.indexOf("My first ")
            if (pos != -1) {
                prompt1 = prompt1.substring(0, pos)
            }
        }
        
        $("#prompts")[0].innerHTML = prompt1 + "\nQ:" + query;
        prompts1 = $("#prompts")
        prompts1[0].scrollTop = prompts1[0].scrollHeight;
    });
})

function init_page() {
    var html = ""
    if (language == "zh"){
        prompt_data = prompt_data_cn
    }
    
    for (var i = 0; i < prompt_data.length; i += 2) {
        mname = prompt_data[i]
        prompt1 = prompt_data[i + 1]
        html += '<option value="' + prompt1 + '">' + mname + '</option>'
    }
    $("#taskselect")[0].innerHTML = html
}

function get_query(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
var query =""
var init_query = ""
$(function () {
    console.log(location.href)
    var data = location.href
    data = data.substring(data.indexOf(".html?mquery=")+13 )
    query = decodeURIComponent(data)
    $("#prompts")[0].innerHTML = query
    init_query = query
    
    //document.body.innerHTML = query
    /*
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.type === "a_message_type") {
        console.log(request.foo); // request has the payload from the parent window
      }
    });*/
  });

  
/*
function show_window(){
    layer.open({
        content: "<div'>"+"</div>"
        ,btn: ["完成"]
        ,shadeClose:false
        ,id: 'layer1'
        ,zIndex:100
        ,type:3
        ,yes: function(index){
            layer.close(index)
            
        }
      });
}
show_window()
*/
