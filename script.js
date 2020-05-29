//ID取得
window.onload = function getID() {
    //1 get movieID
    var nicoID = location.pathname.slice(7, 18);
    var type = nicoID.slice(0, 2);
    console.log("ニコニ広告ex.: ID = " + nicoID);

    //分岐
    if(type == ("sm" || "nm" || "so")){
        console.log("ニコニ広告ex.: type = ニコニコ動画");
        videoscript();
        console.log("go");
    }
    else if(type == ("lv" || "co")) {
        console.log("ニコニ広告ex.: type = ニコニコ生放送");
        livescript();
    }
    else{
        console.log("ニコニ広告ex.: type = ニコニコ動画(CH)");
        videoscript();
        /* issue #1 fix : please wait
        getvideoid();
        */
    }
}

/* issue #1 fix : please wait
function getvideoid() {
    var nicoID = location.pathname.slice(7, 18);
    $.ajax({
        crossDomain:true,
        url:('https://ext.nicovideo.jp/api/getthumbinfo/' + nicoID),
        type:'GET',
        dataType:'xml',
        timeout:1000,
        error:function() {
            console.error("動画IDが取得できませんでした");
        },
        success:function(xml){
            $(xml).find("video_id").one(function() {
                var video_id = $(this).text();
                console.log(video_id);
            });
        }
    })
};

function getvideoid(){
    var nicoID = location.pathname.slice(7, 18);
    var xml = ( "https://ext.nicovideo.jp/api/getthumbinfo/" + nicoID )
    console.log(xml);
    var parser = new DOMParser();
    var xmldoc = parser.parseFromString(xml,"text/xml");
    console.log(xmldoc);

    var video_id = xmldoc.getElementById("video_id").textContent;
    console.log(video_id);
}
*/

//ニコ動
function videoscript() {
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
    
    //ボタン書き換え
    $('#nicoadButton').attr('data-title', 'ニコニ広告EX.');
    $("#nicoadButton").html('<svg viewBox="0 0 100 100" id="nicoadSVG" style="fill:#FF7F27 !important;"><path d="M94.3 68.4a5.7 5.7 0 0 0 2.6-1.4c3.2-3.2 1.8-10.3-3-18.9l-5.7 1c2 4.5 2.6 8 1 9.6-3.8 3.8-17.6-3.9-30.8-17s-21-27-17.1-30.9c1.6-1.6 5-1 9.5 1L52 6C43.3 1.3 36.2 0 33 3.1a5.7 5.7 0 0 0-1.4 2.6L13.9 71.6 1.6 74.9a2.1 2.1 0 0 0-1 .5c-2.2 2.2 1.4 9.4 8 16s13.8 10.2 16 8a2.1 2.1 0 0 0 .5-1L28.4 86l65.9-17.7z"></path><rect x="60.1" y="20.7" width="31.6" height="6.8" rx="3.1" ry="3.1" transform="rotate(-45 76 24)"></rect><rect x="47.4" y="10.4" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-75 61.5 13.8)"></rect><rect x="72.1" y="35.1" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-15 86.2 38.5)"></rect></svg>');


    //ボタンクリック時
    $("#nicoadButton").get(0).onclick = function () {
        $('.MainContainer-floatingPanel').attr('id', 'PanelContainer');
        $('#PanelContainer').html('<div class="FloatingPanelContainer is-visible"><div class="AddingMylistPanelContainer"><div class="AddingMylistPanelContainer-header">ニコニ広告ex. <button type="button" class="ActionButton CloseButton AddingMylistPanelContainer-header-closeButton" id="exclose"><div class="CloseButton-inner"><svg viewBox="0 0 100 100" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.4"><path d="M50 32.8L81.6 1.2a4.1 4.1 0 0 1 5.8 0l11.4 11.4a4.1 4.1 0 0 1 0 5.9L67.2 50l31.6 31.6a4.1 4.1 0 0 1 0 5.8L87.4 98.8a4.1 4.1 0 0 1-5.9 0L50 67.2 18.4 98.8a4.1 4.1 0 0 1-5.8 0L1.2 87.4a4.1 4.1 0 0 1 0-5.9L32.8 50 1.2 18.4a4.1 4.1 0 0 1 0-5.8L12.6 1.2a4.1 4.1 0 0 1 5.9 0L50 32.8z"></path></svg></div></button></div><div class="AddingMylistPanelContainer-content""><div class="AddingMylistPanel"><iframe id="nicoadex-iframe" src="hoge" style="border:none; width:100%; height:100%;"></iframe></div></div></div></div>');

        //:before(パネルヘッダの▲)修正
        $('head').append('<style>.AddingMylistPanelContainer:before { left: 84px; }</style>');

        //close処理
        $("#exclose").get(0).onclick = function () {
            $('#PanelContainer').html('');
            $('head').append('<style>.AddingMylistPanelContainer:before { left: 48px; }</style>');
        };

        //iframe url replace
        var nicoID = location.pathname.slice(7, 18);
        var iframe = document.getElementById('nicoadex-iframe');
        iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/video/publish/' + nicoID + '?frontend_id=6&frontend_version=0&video_watch');
    };

}




//ニコ生
function livescript() {
    setTimeout(getID, 3500);
    var nicoID = location.pathname.slice(7, 18);
    var s = 0;
    //初回動作
    loop();

    //error 広告ボタン取得失敗
    function ErrorNotAd() {
        var erdiv = document.getElementsByClassName("___snack-bar___2IY7h ___snack-bar___CBmFK");
            erdiv[0].setAttribute("aria-hidden", "false");
        var errorpclass = document.getElementsByClassName("___message___SWZm4");
        errorpclass[0].innerHTML = "ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。<br>広告非対応番組の可能性があります。";
        errordelbut();
    };

    //error 複数
    function Errormore() {
        var erdiv = document.getElementsByClassName("___snack-bar___2IY7h ___snack-bar___CBmFK");
            erdiv[0].setAttribute("aria-hidden", "false");
        var errorpclass = document.getElementsByClassName("___message___SWZm4");
        errorpclass[0].innerHTML = "ニコニ広告ex.: ニコニ広告ex.ボタンの作成に失敗しました。<br>他のエラーが出ている可能性があります。<br>コンソールをご確認ください。";
        errordelbut();
    }

    //エラーcloseボタン func
    function errordelbut() {
        var erbutcla = document.getElementsByClassName("___close-button___3P_fY");
        erbutcla[0].onclick = function () {
            var erdiv = document.getElementsByClassName("___snack-bar___2IY7h ___snack-bar___CBmFK");
            erdiv[0].setAttribute("aria-hidden", "true");
        }
    }


    //基本処理
    function loop() {
        try {
            var tmp = document.getElementsByClassName("___item___12Isv");
            var label0 = tmp[0].getAttribute("aria-label");
        } catch{
            console.info("ニコニ広告ex.: ニコニ広告ボタン 取得失敗");
            ErrorNotAd();
        }


        if (label0 == "ギフト") {
            //4 giftにid付与
            tmp[0].setAttribute("id", "nisebutid");
            s = 1;
            lvgift();
        } else {
            //4 代用 新市場addにid付与
            var tmp5 = document.getElementsByClassName("___add-button___1FEKw");
            tmp5[0].setAttribute("id", "nisebutid");
            s = 2;
            lvichiba();
        }

        function lvgift() {
            try {
                //2 従来nicoadにid付与
                tmp[1].setAttribute("id", "nicoadid");
                //3 従来nicoadボタン削除
                var tmp2 = document.getElementsByClassName("___official-locked-item-area___wS6uH");
                tmp2[0].setAttribute("id", "offitemarea");
                var removenicoad = document.getElementById('offitemarea');
                var delnicoadid = document.getElementById("nicoadid");
                removenicoad.removeChild(delnicoadid);
            } catch{
                console.info("ニコニ広告ex.: ニコニ広告ボタン 取得失敗");
                ErrorNotAd();
            }
        }

        function lvichiba() {
            try {
                //2 従来nicoadにid付与
                tmp[0].setAttribute("id", "nicoadid");
                //3 従来nicoadボタン削除
                var tmp2 = document.getElementsByClassName("___official-locked-item-area___wS6uH");
                tmp2[0].setAttribute("id", "offitemarea");
                var removenicoad = document.getElementById('offitemarea');
                removenicoad.removeChild(nicoadid);
            } catch{
                console.info("ニコニ広告ex.: ニコニ広告ボタン 取得失敗");
                ErrorNotAd();

            }
        }

        try {
            //5 広告ex.ボタン・画像追加
            var nicoadex = document.createElement('button');
            nicoadex.id = "nicoadex";
            nicoadex.className = "___item___12Isv";
            nicoadex.type = "button";
            var nicoadeximg = document.createElement('img');
            nicoadeximg.className = "___item-image___2Py-3";
            nicoadeximg.src = "https://github.com/AyumuNekozuki/nicolive-iframe-nicoad/blob/master/icon_live.png?raw=true";
            nicoadeximg.alt = "ニコニ広告ex."
            var objitemarea = document.getElementsByClassName("___official-locked-item-area___wS6uH").item(0);
            objitemarea.appendChild(nicoadex).appendChild(nicoadeximg);

            //-- aria-lavel変更
            document.getElementById("nicoadex").setAttribute("aria-label", "ニコニ広告ex.");

            try {
                //6 ボタンクリック時
                document.getElementById("nicoadex").onclick = function () {
                    if (s == 1) {
                        //偽のクリックアクション
                        document.getElementById('nisebutid').click();
                    }
                    if (s == 2) {
                        var tmp10 = document.getElementsByClassName("___add-button___1FEKw");
                        var label2 = tmp10[0].getAttribute("aria-label");

                        

                        if (label2 == "この番組ではネタを追加できません") {
                            var icibanone = document.getElementsByClassName("___player-status___BQ7B7");
                            icibanone[0].style.display = "none";
                            var icibanone2 = document.getElementsByClassName("___rich-view-status___3mt-b");
                            icibanone2[0].removeAttribute("hidden");
                            icibanone2[0].removeAttribute("style");
                            icibanone2[0].removeAttribute("aria-expanded");
                            icibanone2[0].setAttribute("aria-expanded",true);
                            document.getElementsByClassName("___close-button___2olJ- ___button___1Ng2E")[0].onclick = function () {
                                icibanone[0].removeAttribute("style");
                                icibanone2[0].style.display = "none";
                            }
                        }
                        else if (tmp10[0].hasAttribute("disabled")) {
                            var icibanone = document.getElementsByClassName("___player-status___BQ7B7");
                            icibanone[0].style.display = "none";
                            var icibanone2 = document.getElementsByClassName("___rich-view-status___3mt-b");
                            icibanone2[0].removeAttribute("hidden");
                            icibanone2[0].removeAttribute("style");
                            icibanone2[0].removeAttribute("aria-expanded");
                            icibanone2[0].setAttribute("aria-expanded",true);
                            document.getElementsByClassName("___close-button___2olJ- ___button___1Ng2E")[0].onclick = function () {
                                icibanone[0].removeAttribute("style");
                                icibanone2[0].style.display = "none";
                            }
                        }
                        else {
                            //偽のクリックアクション
                            document.getElementById('nisebutid').click();
                        }
                    }

                    //iframe url replace
                    var iframe = document.getElementById('RICH-IFRAME');
                    iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/live/publish/' + nicoID + '?frontendId=12');
                }

                //追っかけ対応処理 idチェックなければ基本処理実行
                var checkadex = function checkad() {
                    if (document.getElementById("nicoadex")) {
                        console.log("ニコニ広告ex.: 動作中です");
                    } else {
                        loop();
                    }
                }
                setInterval(checkadex, 1000);

            } catch{
                console.info("ニコニ広告ex.: ニコニ広告ex.ボタン 作成失敗");
                Errormore();
            }
        }
        catch {
            console.info("ニコニ広告ex.: ニコニ広告ex.ボタン 作成失敗");
        }
    }
    console.info("ニコニ広告ex.: メイン処理完了");
}


