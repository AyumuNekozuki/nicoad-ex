//ID取得
setTimeout(getID, 3500);
function getID() {
    //1 get movieID
    var nicoID = location.pathname.slice(7, 18);
    var type = nicoID.slice(0, 2);
    console.log("ニコニ広告ex.: ID = " + nicoID);

    //分岐
    if (type == "sm") {
        console.log("ニコニ広告ex.: type = ニコ動 (sm)");
        videoscript();
    }
    if (type == "nm") {
        console.log("ニコニ広告ex.: type = ニコ動 (nm)");
        videoscript();
    }
    if (type == "so") {
        console.log("ニコニ広告ex.: type = ニコ動 (so)");
        videoscript();
    }
    if (type == "lv") {
        console.log("ニコニ広告ex.: type = ニコ生 (lv)");
        livescript();
    }
    if (type == "co"){
        console.log("ニコニ広告ex.: type = ニコ生 (co)");
        livescript();
    }
    else{
        console.log("ニコニ広告ex.: type = ニコ動 (so)");
        videoscript();
    }
}

//ニコ動
function videoscript() {
    try {
        //2 従来nicoadにid付与
        var tmp = document.getElementsByClassName("ActionButton UadButton VideoMenuContainer-button");
        tmp[0].setAttribute("id", "nicoadid");

        //3 従来nicoadボタン削除
        var tmp2 = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline");
        tmp2[6].setAttribute("id", "offitemarea");
        var removenicoad = document.getElementById('offitemarea');
        var delnicoadid = document.getElementById("nicoadid");
        removenicoad.removeChild(delnicoadid);

        //4 mylistにid付与
        var tmp3 = document.getElementsByClassName("ActionButton VideoMenuContainer-button");
        tmp3[1].setAttribute("id", "mylistid");

        //5 広告ex.ボタン・画像追加
        var nicoadex = document.createElement('button');
        nicoadex.id = "nicoadex";
        nicoadex.className = "ActionButton VideoMenuContainer-button";
        var nicoadeximg = document.createElement('img');
        nicoadeximg.style = "width: 30px; height:30px;"
        nicoadeximg.src = "https://github.com/AyumuNekozuki/nicolive-iframe-nicoad/blob/master/icon_video.png?raw=true";
        nicoadeximg.alt = "ニコニ広告ex."
        var objitemarea = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline").item(6);
        objitemarea.appendChild(nicoadex).appendChild(nicoadeximg);

    } catch{
        //2 従来nicoadにid付与
        var tmp = document.getElementsByClassName("ActionButton UadButton VideoMenuContainer-button");
        tmp[0].setAttribute("id", "nicoadid");

        //3 従来nicoadボタン削除
        var tmp2 = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline");
        tmp2[5].setAttribute("id", "offitemarea");
        var removenicoad = document.getElementById("offitemarea");
        var delnicoadid = document.getElementById("nicoadid");
        removenicoad.removeChild(delnicoadid);

        //4 mylistにid付与
        var tmp3 = document.getElementsByClassName("ActionButton VideoMenuContainer-button");
        tmp3[1].setAttribute("id", "mylistid");

        //5 広告ex.ボタン・画像追加
        var nicoadex = document.createElement('button');
        nicoadex.id = "nicoadex";
        nicoadex.className = "ActionButton VideoMenuContainer-button";
        var nicoadeximg = document.createElement('img');
        nicoadeximg.style = "width: 30px; height:30px;"
        nicoadeximg.src = "https://github.com/AyumuNekozuki/nicolive-iframe-nicoad/blob/master/icon_video.png?raw=true";
        nicoadeximg.alt = "ニコニ広告ex."
        var objitemarea = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline").item(5);
        objitemarea.appendChild(nicoadex).appendChild(nicoadeximg);
    }


    //-- ラベル変更
    document.getElementById("nicoadex").setAttribute("data-label", "ニコニ広告ex.");

    //6 ボタンクリック時
    document.getElementById("nicoadex").onclick = function () {
        var nicoID = location.pathname.slice(7, 18);
        //div 書き換え
        var head = document.getElementsByClassName("MainContainer-floatingPanel");
        head[0].innerHTML = '<div class="FloatingPanelContainer is-visible"><div class="AddingMylistPanelContainer"><div class="AddingMylistPanelContainer-header">ニコニ広告ex.<button type="button" class="ActionButton CloseButton AddingMylistPanelContainer-header-closeButton" id="exclose"><div class="CloseButton-inner"><svg viewBox="0 0 100 100" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.4"><path d="M50 32.8L81.6 1.2a4.1 4.1 0 0 1 5.8 0l11.4 11.4a4.1 4.1 0 0 1 0 5.9L67.2 50l31.6 31.6a4.1 4.1 0 0 1 0 5.8L87.4 98.8a4.1 4.1 0 0 1-5.9 0L50 67.2 18.4 98.8a4.1 4.1 0 0 1-5.8 0L1.2 87.4a4.1 4.1 0 0 1 0-5.9L32.8 50 1.2 18.4a4.1 4.1 0 0 1 0-5.8L12.6 1.2a4.1 4.1 0 0 1 5.9 0L50 32.8z"></path></svg></div></button></div><div class="AddingMylistPanelContainer-content""><div class="AddingMylistPanel"><iframe id="nicoadex-iframe" src="hoge" style="width:100%; height:100%;"></iframe></div></div></div></div>';

        //close処理
        document.getElementById("exclose").onclick = function () {
            var head2 = document.getElementsByClassName("MainContainer-floatingPanel");
            head2[0].innerHTML = "";
        };

        //iframe url replace
        var iframe = document.getElementById('nicoadex-iframe');
        iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/video/publish/' + nicoID + '?frontend_id=6&frontend_version=0&video_watch');
    };

}

//ニコ生
function livescript() {
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


