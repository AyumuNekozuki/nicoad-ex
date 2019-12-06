function goscript() {
    //1 get liveID
    var liveID = location.pathname.slice(7, 18);
    console.log("ニコニ広告ex.: " + liveID);
    console.log("ニコニ広告ex.: debug move 01");

    //2 従来nicoadにid付与 bug
    var tmp = document.getElementsByClassName("___item___12Isv");
    tmp[1].setAttribute("id", "nicoadid");
    console.log("ニコニ広告ex.: debug move 02");

    //3 従来nicoadボタン削除
    var tmp2 = document.getElementsByClassName("___official-locked-item-area___wS6uH");
    tmp2[0].setAttribute("id", "offitemarea");
    console.log("ニコニ広告ex.: debug move 03");
    var removenicoad = document.getElementById('offitemarea');
    offitemarea.removeChild(nicoadid);
    console.log("ニコニ広告ex.: debug move 04");

    //4 giftにid付与
    tmp[0].setAttribute("id", "giftid");
    console.log("ニコニ広告ex.: debug move 05");

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
    console.log("ニコニ広告ex.: debug move 06");

    //-- change aria-lavel
    document.getElementById("nicoadex").setAttribute("aria-label", "ニコニ広告ex.");

    //6 ボタンクリック時
    document.getElementById("nicoadex").onclick = function () {
        //giftに偽のクリックアクション
        document.getElementById('giftid').click();
        //iframe url replace
        var iframe = document.getElementById('RICH-IFRAME');
        iframe.contentWindow.location.replace('https://nicoad.nicovideo.jp/live/publish/' + liveID + '?frontendId=12');
    };
    console.log("ニコニ広告ex.: debug move 01-06 complete");
}

setTimeout("goscript()", 3000);