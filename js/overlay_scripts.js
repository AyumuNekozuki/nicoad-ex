//初期化 issue #36
// ブラウザ側のwindowじゃないと各種イベントが見えない
const elm = document.createElement("script");
elm.innerHTML = `
  // 履歴追加を検知
  const originalPushState = window.history.pushState;
  window.history.pushState = (state, title, url) => {
    window.dispatchEvent(new window.Event("locationchange"));
    return originalPushState.call(window.history, state, title, url);
  }

  // 戻る進むを検知
  window.addEventListener('popstate', function (event) {
    window.dispatchEvent(new window.Event('locationchange'));
  });

  // カスタムイベントで受け取る
  window.addEventListener("locationchange", (e) => {
    if(document.getElementById('nicoadex_overlay').classList.contains("active")){
      document.getElementById('nicoadex_overlay').classList.remove('active');
      document.getElementById('nicoadex_overlay_iframe').contentWindow.location.replace("https://nicoad.nicovideo.jp/solid/publish/");
    }
  })
`;
if(location.hostname == "3d.nicovideo.jp"){
  document.head.appendChild(elm);
}


//version
const manifestData = chrome.runtime.getManifest();
const ex_version = manifestData.version + "";
console.log("ニコニ広告ex.: v" + ex_version);

$(function(){
  let isNicodic = false;
  let nicoID, content_type, nicoad_url;

  if(location.hostname == "dic.nicovideo.jp"){
    isNicodic = true;
    nicoID = $(".a-list_articleInfo>ul>li>a").first().text();
    content_type = "dic";
    if(nicoID == ""){ nicoID = "hogehoge" };
  }else{
    nicoID = location.pathname.slice(7, 18);
    content_type = nicoID.slice(0, 2);
  }

  console.log("ニコニ広告ex.: " + content_type);
  console.log("ニコニ広告ex.: " + nicoID);


  $('body').prepend('<div id="nicoadex_overlay"><button id="nicoadex_hide_but"></button><iframe id="nicoadex_overlay_iframe" src=""></iframe></div>');

  switch(location.hostname){
    case "seiga.nicovideo.jp":
      nicoad_url = "https://nicoad.nicovideo.jp/seiga/publish/" + nicoID;
      $('.nicoad_button').remove();
      $('#nicoad_conductor').prepend('<button id="nicoad_button_illust"></button>');
      $('#nicoad_button_illust').on('click', function() {
        $('#nicoadex_hide_but').trigger("click");
      });
      break;

    case "3d.nicovideo.jp":
      nicoad_url = "https://nicoad.nicovideo.jp/solid/publish/" + nicoID;
      $('.eh955zv2.emfyha70').remove();
      $('.css-zid5zk.e1ype1e01').prepend('<button id="nicoad_button_solid"></button>');
      $('a.ehqcs810.css-1eevzgf.er2nyud7').remove();
      $('.css-7whenc.ehqcs812').append('<button id="nicoad_button_solid_wide"></button>');
      $('#nicoad_button_solid, #nicoad_button_solid_wide').on('click', function() {
        $('#nicoadex_hide_but').trigger("click");
      });
      $('a').on('click', function() {
        nicoID = location.pathname.slice(7, 18);
        if(nicoID == ""){ nicoID = "hogehoge" };
        nicoad_url = "https://nicoad.nicovideo.jp/solid/publish/" + nicoID;
      });
      break;

    case "dic.nicovideo.jp":
      nicoad_url = "https://nicoad.nicovideo.jp/nicodic/publish/" + nicoID;
      $('#nicoad_point_article_pc_a_area > a').remove();
      $('#nicoad_point_article_pc_a_area').prepend('<button id="nicoad_button_dic_top"><span class="st-button_nicoad-text">ニコニ広告する</span></button>');
      $('#nicoad_point_article_pc_info_area > a').remove();
      $('#nicoad_point_article_pc_info_area').prepend('<button id="nicoad_button_dic_bottom"><span class="st-button_nicoad-text">ニコニ広告する</span></button>');
      $('p.a-nicoad_supporter-othersLink > a').remove();
      $('p.a-nicoad_supporter-othersLink').prepend('<a id="nicoad_button_dic_link">広告主をもっとみる</a>');
      $('#nicoad_button_dic_top, #nicoad_button_dic_bottom, #nicoad_button_dic_link').on('click', function() {
        $('#nicoadex_hide_but').trigger("click");
      });
      break;

    default:
      break;
  }


  $('#nicoadex_hide_but').on('click', function() {
    if(location.hostname == "3d.nicovideo.jp"){
      nicoID = location.pathname.slice(7, 18);
      if(nicoID == ""){ nicoID = "hogehoge" };
      nicoad_url = "https://nicoad.nicovideo.jp/solid/publish/" + nicoID;
    }

    if($("#nicoadex_overlay").hasClass("active")){
      $("#nicoadex_overlay").removeClass("active");
      document.getElementById('nicoadex_overlay_iframe').contentWindow.location.replace("");
    }else{
      document.getElementById('nicoadex_overlay_iframe').contentWindow.location.replace(nicoad_url);
      $("#nicoadex_overlay").addClass("active");
    }
  });

});


