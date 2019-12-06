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
    //うまく行かない
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
    console.log("ニコニ広告ex.: debug move 01-06 complete");
}
