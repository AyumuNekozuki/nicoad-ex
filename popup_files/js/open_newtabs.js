const open_newtabs = function(){
  $('a[href*="https://blog.nicovideo.jp/niconews/"]').attr({target:"_blank"});
};
setInterval(open_newtabs, 250);