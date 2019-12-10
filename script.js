setTimeout("getID()", 3000);

function getID() {
    //1 get movieID
    var nicoID = location.pathname.slice(7, 18);
    var type = nicoID.slice(0, 2);
    console.log("ニコニ広告ex.: ID = " + nicoID);

    //分岐
    if (type == "sm") {
        console.log("ニコニ広告ex.: type = ニコニコ動画");
        videoscript();
    }
    if (type == "lv") {
        console.log("ニコニ広告ex.: type = ニコニコ生放送");
        livescript();
    }
}

//ニコ動
function videoscript() {
    var nicoID = location.pathname.slice(7, 18);

    //2 従来nicoadにid付与
    var tmp = document.getElementsByClassName("ActionButton UadButton VideoMenuContainer-button");
    tmp[0].setAttribute("id", "nicoadid");

    //3 従来nicoadボタン削除
    var tmp2 = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline");
    tmp2[6].setAttribute("id", "offitemarea");
    var removenicoad = document.getElementById('offitemarea');
    removenicoad.removeChild(nicoadid);

    //4 mylistにid付与
    var tmp3 = document.getElementsByClassName("ActionButton VideoMenuContainer-button");
    tmp3[1].setAttribute("id", "mylistid");

    //5 add button & image
    var nicoadex = document.createElement('button');
    nicoadex.id = "nicoadex";
    nicoadex.className = "ActionButton VideoMenuContainer-button";
    var nicoadeximg = document.createElement('img');
    nicoadeximg.style = "width: 30px; height:30px;"
    nicoadeximg.src = "https://github.com/AyumuNekozuki/nicolive-iframe-nicoad/blob/master/icon.png?raw=true";
    nicoadeximg.alt = "ニコニ広告ex."
    var objitemarea = document.getElementsByClassName("ClickInterceptor LoginRequirer is-inline").item(6);
    objitemarea.appendChild(nicoadex).appendChild(nicoadeximg);

    //-- change data-lavel
    document.getElementById("nicoadex").setAttribute("data-label", "ニコニ広告ex.");

    //6 ボタンクリック時
    document.getElementById("nicoadex").onclick = function () {
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
    console.log("ニコニ広告ex.: debug-complete mode=video");

}

//ニコ生
function livescript() {
    var nicoID = location.pathname.slice(7, 18);

    //2 従来nicoadにid付与 bug
    var tmp = document.getElementsByClassName("___item___12Isv");
    tmp[1].setAttribute("id", "nicoadid");

    //3 従来nicoadボタン削除
    var tmp2 = document.getElementsByClassName("___official-locked-item-area___wS6uH");
    tmp2[0].setAttribute("id", "offitemarea");
    var removenicoad = document.getElementById('offitemarea');
    removenicoad.removeChild(nicoadid);

    //4 giftにid付与
    tmp[0].setAttribute("id", "giftid");

    //5 add button & image
    var nicoadex = document.createElement('button');
    nicoadex.id = "nicoadex";
    nicoadex.className = "___item___12Isv";
    nicoadex.type = "button";
    var nicoadeximg = document.createElement('img');
    nicoadeximg.className = "___item-image___2Py-3";
    nicoadeximg.src = "https://github.com/AyumuNekozuki/nicolive-iframe-nicoad/blob/master/icon.png?raw=true";
    nicoadeximg.alt = "ニコニ広告ex."
    var objitemarea = document.getElementsByClassName("___official-locked-item-area___wS6uH").item(0);
    objitemarea.appendChild(nicoadex).appendChild(nicoadeximg);

    //-- change aria-lavel
    document.getElementById("nicoadex").setAttribute("aria-label", "ニコニ広告ex.");

    //6 ボタンクリック時
    document.getElementById("nicoadex").onclick = function () {
        //giftに偽のクリックアクション
        document.getElementById('giftid').click();

        //iframe url replace
        var iframe = document.getElementById('RICH-IFRAME');
        iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/live/publish/' + nicoID + '?frontendId=12');
    };

    console.log("ニコニ広告ex.: debug-complete mode=live");
}


/*video innerhtml
<div class="FloatingPanelContainer is-visible">
    <div class="AddingMylistPanelContainer">
        <div class="AddingMylistPanelContainer-header">ニコニ広告ex.
            <button type="button" class="ActionButton CloseButton AddingMylistPanelContainer-header-closeButton">
                <div class="CloseButton-inner">
                    <svg viewBox="0 0 100 100" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.4">
                        <path d="M50 32.8L81.6 1.2a4.1 4.1 0 0 1 5.8 0l11.4 11.4a4.1 4.1 0 0 1 0 5.9L67.2 50l31.6 31.6a4.1 4.1 0 0 1 0 5.8L87.4 98.8a4.1 4.1 0 0 1-5.9 0L50 67.2 18.4 98.8a4.1 4.1 0 0 1-5.8 0L1.2 87.4a4.1 4.1 0 0 1 0-5.9L32.8 50 1.2 18.4a4.1 4.1 0 0 1 0-5.8L12.6 1.2a4.1 4.1 0 0 1 5.9 0L50 32.8z">
                        </path>
                    </svg>
                </div>
            </button>
        </div>
        <div class="AddingMylistPanelContainer-content">
            <div class="AddingMylistPanel">
            <iframe id="nicoadex-iframe" src="hoge" style="width:100%; height:100%;"></iframe>
            </div>
        </div>
    </div>
</div>
*/