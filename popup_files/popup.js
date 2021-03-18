// 外部リンク
$(document).ready(function(){
  $('body').on('click', 'a', function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });
});

//ボタンクリック時
document.getElementById("info").onclick = function(){
  var iframe = document.getElementById('iframe');
  iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/campaign');
}

document.getElementById("ticket").onclick = function(){
  var iframe = document.getElementById('iframe');
  iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/my#tickets');
}

document.getElementById("exinfo").onclick = function(){
  var iframe = document.getElementById('iframe');
  iframe.contentWindow.location.replace('update_info.html');
}

