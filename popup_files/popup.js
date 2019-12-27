// 外部リンク
$(function () {
  $('.olink').on('click', (e) => {
    chrome.tabs.create({ url: $(e.target).attr('href') });
  });
});

//ボタンクリック時
document.getElementById("info").onclick = function(){
  var iframe = document.getElementById('iframe');
  iframe.contentWindow.location.replace('https://blog.nicovideo.jp/niconews/category/nicoad/');
}

document.getElementById("ticket").onclick = function(){
  var iframe = document.getElementById('iframe');
  iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/my#tickets');
}