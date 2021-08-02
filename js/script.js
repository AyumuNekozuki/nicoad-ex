//version
let manifestData = chrome.runtime.getManifest();
let ex_version = manifestData.version + "";
console.log("ニコニ広告ex.: v" + ex_version);


//ID取得
window.onload = function getID() {
    //1 get movieID
    var nicoID = location.pathname.slice(7, 18);
    var type = nicoID.slice(0, 2);
    console.log("ニコニ広告ex.: ID = " + nicoID);
    console.log("ニコニ広告ex.: type = " + type);

    //分岐
    if (type == "sm" || type == "nm") {
        console.log("ニコニ広告ex.: type = ニコニコ動画");
        videoscript();
    }
    else if (type == "lv" || type == "co") {
        console.log("ニコニ広告ex.: type = ニコニコ生放送");
        livescript();
    }
    else {
        console.log("ニコニ広告ex.: type = ニコニコ動画(CH)");
        videoscript();
        video_buginfo();
    }
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
            $('head').append('<style>.AddVideoListPanelContainer:before { left: 84px; }</style>');

            //close処理
            $("#exclose").on('click', function () {
                $('#PanelContainer').html('');
                $('head').append('<style>.AddVideoListPanelContainer:before { left: 48px; }</style>');
            });

            //iframe url replace
            var nicoID = location.pathname.slice(7, 18);
            var iframe = document.getElementById('nicoadex-iframe');
            iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/video/publish/' + nicoID);

            //他ボタンクリック時
            $(".ActionButton:not(#nicoadButton)").on('click', function () {
                if (document.getElementById("exclose")) {
                    document.getElementById("exclose").click();
                }
            });
        });
    }

    function v_checkadex() {
        if (document.getElementById("nicoadButton")) {
            console.log("ニコニ広告ex.: 動作中です");
        } else {
            main_video();
        }
    }

    function video_first() {
        //初回～
        $('[data-title="ニコニ広告する"]').attr('id', 'nicoadButton');
        if (document.getElementById("nicoadButton")) {
            main_video();
        } else {
            console.log("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。再実行します。");
        }
    }

    video_first();
    setInterval(v_checkadex, 2500);
}


//ニコ動-バグインフォ(CH動画用)
function video_buginfo() {
    $("#nicoadButton").on('click', function () {
        $(".AddVideoListPanelContainer-header").css({
            height: '60px'
        })
        $('.AddVideoListPanelContainer-header').append('<p id="nicoad-buginfo" style="font-size:12px;"><a href="https://github.com/AyumuNekozuki/nicoad-ex/issues/1" target="_blank" title="ニコニ広告ex.：一部チャンネル動画で貢献度ランキングが表示されない不具合" style="color:#1DA1F2; text-decoration:underline;">広告ex.:一部チャンネル動画で貢献度ランキングが表示されな...</a></p>')
        $("<p>", {
            id: 'nidoad-buginfo',
            style: 'font-size:12px;'
        }).append('.AddVideoListPanelContainer-header');
    });
    $(".ActionButton :not(#nicoadButton)").on('click', function () {
        $("#nicoad-buginfo").remove();
    });
}

//ニコ生
function livescript() {

    //エラー表示
    function error_notAD() {
        $('.___snack-bar___2IY7h, .___snack-bar___CBmFK').attr('aria-hidden', 'false');
        $('.___message___SWZm4').html("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。")
        error_closebut();
        setTimeout(() => {
            document.getElementById('error-closebut').click();
        },
            5000)
    }
    function error_closebut() {
        $('.___close-button___3P_fY').attr('id', 'error-closebut');
        $("#error-closebut").on('click', function () {
            $('.___snack-bar___2IY7h, .___snack-bar___CBmFK').attr('aria-hidden', 'true');
        });
    }

    //メイン処理
    function live_main() {
        //ボタン削除
        var order = $('[aria-label="ニコニ広告"]').data('target-order');
        $('[aria-label="ニコニ広告"]').attr('id', 'nicoadButton');
        $('#nicoadButton').remove();

        //ボタン作成
        $("<button>", {
            type: 'button',
            id: 'nicoadButton',
            class: '___item___12Isv'
        }).appendTo('.___official-locked-item-area___wS6uH');
        $('#nicoadButton').attr('aria-label', 'ニコニ広告EX.');
        $('#nicoadButton').attr('data-content-type', 'nicoadex');
        $('#nicoadButton').attr('data-target-order', order);
        $("#nicoadButton").html('<svg viewBox="-30 -30 160 160" id="nicoadSVG" class="___item-image___2Py-3" style="fill:#FF7F27 !important;"><path d="M94.3 68.4a5.7 5.7 0 0 0 2.6-1.4c3.2-3.2 1.8-10.3-3-18.9l-5.7 1c2 4.5 2.6 8 1 9.6-3.8 3.8-17.6-3.9-30.8-17s-21-27-17.1-30.9c1.6-1.6 5-1 9.5 1L52 6C43.3 1.3 36.2 0 33 3.1a5.7 5.7 0 0 0-1.4 2.6L13.9 71.6 1.6 74.9a2.1 2.1 0 0 0-1 .5c-2.2 2.2 1.4 9.4 8 16s13.8 10.2 16 8a2.1 2.1 0 0 0 .5-1L28.4 86l65.9-17.7z"></path><rect x="60.1" y="20.7" width="31.6" height="6.8" rx="3.1" ry="3.1" transform="rotate(-45 76 24)"></rect><rect x="47.4" y="10.4" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-75 61.5 13.8)"></rect><rect x="72.1" y="35.1" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-15 86.2 38.5)"></rect></svg>')

        //いろいろid付与
        $(".___close-button___OGexZ").attr('id', 'iframe-close-but');
        $(".___setting-button___HHUPl").attr('id', 'setting-but');
        $(".___fullscreen-button___dO6Gz").attr('id', 'fullscreen-but');

        //ボタンクリック時
        $("#nicoadButton").on('click', function () {
            exit_nicoadex();

            //詳細設定画面 消す（バグ防止）
            $(".___close-button___23Wwj").attr('id', 'settingclose-but');
            if (document.getElementById('settingclose-but')) {
                document.getElementById("settingclose-but").click();
            }

            //ニコニ広告exヘッダ消す
            $('#nicoadex_iframePanel_header').remove();
            $('.___rich-view-status___2PXao').attr('id', 'iframePanel');
            $('.___rich-view-status___2PXao').removeAttr('hidden');
            $('.___rich-view-status___2PXao').attr('aria-expanded', 'true');

            //ステータスパネル＆コメント欄のhidden追加
            $('.___player-status-panel___15EEA').attr('aria-hidden', 'true');

            $('.___rich-view-header___1KxaL').prepend('<div id="nicoadex_iframePanel_header"><h1>ニコニ広告EX.<a data-v-0d10b35d="" href="https://github.com/AyumuNekozuki/nicoad-ex" target="_blank"><svg style="vertical-align: middle;" data-v-0d10b35d="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><circle data-v-0d10b35d="" cx="9" cy="9" r="9" fill="#0080ff"></circle> <path data-v-0d10b35d="" d="M10.2,12a.4.4,0,0,1,.4.4v1.2a.4.4,0,0,1-.4.4H7.8a.4.4,0,0,1-.4-.4V12.4a.4.4,0,0,1,.4-.4ZM4,5.6A1.6,1.6,0,0,1,5.6,4h6.8A1.6,1.6,0,0,1,14,5.6V8.2a1.6,1.6,0,0,1-1.6,1.6h-2a.4.4,0,0,0-.4.4v.6a.4.4,0,0,1-.4.4H8.4a.4.4,0,0,1-.4-.4V9a.8.8,0,0,1,.8-.8h2.4a.8.8,0,0,0,.8-.8v-1a.8.8,0,0,0-.8-.8H6.8a.8.8,0,0,0-.8.8V7.6a.4.4,0,0,1-.4.4H4.4A.4.4,0,0,1,4,7.6Z" fill="#fff"></path></svg></a></h1></div>')

            //iframe url replace
            var nicoID = location.pathname.slice(7, 18);
            var iframe = document.getElementById('RICH-IFRAME');
            iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/live/publish/' + nicoID);
        });

        //終了処理
        function exit_nicoadex() {
            if (document.getElementById('nicoadex_iframePanel_header')) {
                $('#nicoadex_iframePanel_header').remove();
            }
            $('.___rich-view-status___2PXao').removeAttr('aria-expanded');
            $('.___rich-view-status___2PXao').attr('aria-expanded', 'false');
            $('.___rich-view-status___2PXao').attr('hidden', '');
            
            //ステータスパネル＆コメント欄のhidden除去
            $('.___player-status-panel___15EEA').removeAttr('aria-hidden');
            
            var iframe = document.getElementById('RICH-IFRAME');
            iframe.contentWindow.location.replace('(unknown)');
        }


        $('#iframe-close-but').on('click', function () {
            exit_nicoadex();
        });
        $('#fullscreen-but').on('click', function () {
            document.getElementById("iframe-close-but").click();
        });
        $('#setting-but').on('click', function () {
            document.getElementById("iframe-close-but").click();
        });

        //ニコニ広告exヘッダ削除
        //エモーション,ギフト,新市場
        $('.___emotion-button___1Rolf').addClass('adex-other');
        $('[aria-label="ギフト"]').addClass('adex-other');
        $('.___add-button___1FEKw').addClass('adex-other');
        $('[data-content-type="broadcast_tool"]').addClass('adex-other');
        $('.adex-other').on('click', function () {
            $('#nicoadex_iframePanel_header').remove();
        });
    }
    var checkadex = function checkad() {
        if (document.getElementById("nicoadButton")) {
        } else {
            live_main();
        }
    }

    //初回～
    $('[aria-label="ニコニ広告"]').attr('id', 'nicoadButton');
    if (document.getElementById("nicoadButton")) {
        live_main();
    } else {
        error_notAD();
        console.log("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。");
    }
    setInterval(checkadex, 2000);
}