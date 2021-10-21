//version
let manifestData = chrome.runtime.getManifest();
let ex_version = manifestData.version + "";
console.log("ニコニ広告ex.: v" + ex_version);

async function sleep(msec) {
  return new Promise(resolve => { setTimeout(() => { resolve() }, msec) })
}
function isDefaultButtonExist() {
  const btnDefault = document.querySelector('[aria-label="ニコニ広告"], [data-title="ニコニ広告する"]')
  return btnDefault != null
}

let nicoID = "";

//ID取得
window.onload = function getID() {
  nicoID = $('link[rel="canonical"]').attr('href').slice(31);
  videoscript();
};

//ニコ動
function videoscript() {

  function main_video() {
      //マイリストボタンにid付与
      $('[data-title="マイリスト"]').attr('id', 'mylistButton');

      //元ボタン削除
      $('.UadButton').attr('id', 'nicoadButton');
      $("#nicoadButton").parent().attr('id', 'nicoadButdiv');
      $('#nicoadButton').remove();

      //ボタン作成
      $("<button>", {
          type: 'button',
          id: 'nicoadButton',
          class: 'ActionButton UadButton VideoMenuContainer-button'
      }).prependTo('#nicoadButdiv');
      $('#nicoadButton').attr('data-title', 'ニコニ広告EX.');
      $("#nicoadButton").html('<svg viewBox="0 0 100 100" id="nicoadSVG" style="fill:#FF7F27 !important;"><path d="M94.3 68.4a5.7 5.7 0 0 0 2.6-1.4c3.2-3.2 1.8-10.3-3-18.9l-5.7 1c2 4.5 2.6 8 1 9.6-3.8 3.8-17.6-3.9-30.8-17s-21-27-17.1-30.9c1.6-1.6 5-1 9.5 1L52 6C43.3 1.3 36.2 0 33 3.1a5.7 5.7 0 0 0-1.4 2.6L13.9 71.6 1.6 74.9a2.1 2.1 0 0 0-1 .5c-2.2 2.2 1.4 9.4 8 16s13.8 10.2 16 8a2.1 2.1 0 0 0 .5-1L28.4 86l65.9-17.7z"></path><rect x="60.1" y="20.7" width="31.6" height="6.8" rx="3.1" ry="3.1" transform="rotate(-45 76 24)"></rect><rect x="47.4" y="10.4" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-75 61.5 13.8)"></rect><rect x="72.1" y="35.1" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-15 86.2 38.5)"></rect></svg>');

      //ボタンクリック時
      $("#nicoadButton").on('click', function () {
          //リストに登録を開いていたら閉じる
          try {
              if ($(".AddVideoListPanelContainer-header")[0].textContent == "リストに登録") {
                  $(".MylistButton").click();
              }
          } catch (err) { }

          $('.MainContainer-floatingPanel').attr('id', 'PanelContainer');
          $('#PanelContainer').html('<div class="FloatingPanelContainer is-visible"><div class="AddVideoListPanelContainer"><div class="AddVideoListPanelContainer-header">ニコニ広告ex. <button type="button" class="ActionButton CloseButton AddVideoListPanelContainer-header-closeButton" id="exclose"><div class="CloseButton-inner"><svg viewBox="0 0 100 100" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.4"><path d="M50 32.8L81.6 1.2a4.1 4.1 0 0 1 5.8 0l11.4 11.4a4.1 4.1 0 0 1 0 5.9L67.2 50l31.6 31.6a4.1 4.1 0 0 1 0 5.8L87.4 98.8a4.1 4.1 0 0 1-5.9 0L50 67.2 18.4 98.8a4.1 4.1 0 0 1-5.8 0L1.2 87.4a4.1 4.1 0 0 1 0-5.9L32.8 50 1.2 18.4a4.1 4.1 0 0 1 0-5.8L12.6 1.2a4.1 4.1 0 0 1 5.9 0L50 32.8z"></path></svg></div></button></div><div class="AddVideoListPanelContainer-content""><div class="AddingMylistPanel" style="height:100%;"><iframe id="nicoadex-iframe" src="hoge" style="border:none; width:100%; height:100%;"></iframe></div></div></div></div>');

          //:before(パネルヘッダの▲)修正
          $('.AddVideoListPanelContainer').addClass('NicoadExPanelContainer');
          
          //close処理
          $("#exclose").on('click', function () {
              $('#PanelContainer').html('');
              $('.AddVideoListPanelContainer').removeClass('NicoadExPanelContainer')
          });

          //iframe url replace
          var nicoID = $('link[rel="canonical"]').attr('href').slice(31);
          var nicoad_url = 'https://nicoad.nicovideo.jp/video/publish/' + nicoID;
          document.getElementById('nicoadex-iframe').contentWindow.location.replace(nicoad_url);

          //他ボタンクリック時
          $(".ActionButton:not(#nicoadButton)").on('click', function () {
              if (document.getElementById("exclose")) {
                  document.getElementById("exclose").click();
              }
          });
      });
  }

  async function video_first() {
      //初回～
      const maxRetry = 10
      const interval = 1000
      for (let i = 0; i <= maxRetry; i++) {
          if (isDefaultButtonExist()) {
              main_video();
              return;
          } else if (i <= maxRetry - 1) {
              await sleep(interval);
          }
      }
      console.log("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。");
  }

  video_first();
}