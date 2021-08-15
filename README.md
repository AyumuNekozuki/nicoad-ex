![](https://img.shields.io/github/license/AyumuNekozuki/nicoad-ex)
![](https://img.shields.io/chrome-web-store/v/lfmmnpoacjifgojmhkegmhngbfhdjlmb) 
![](https://img.shields.io/amo/v/nicoad-ex)

![](/images/logo.png)

# ニコニ広告ex.

ニコニコ動画・生放送ページのニコニ広告を、コメント欄に表示するブラウザ拡張機能です。ブラウザ拡張機能のボタンを押せば、どのページからでも、チケットの確認やふくびきなどを行うことが出来ます。

[Chrome Web Store](https://chrome.google.com/webstore/detail/%E3%83%8B%E3%82%B3%E3%83%8B%E5%BA%83%E5%91%8Aex/lfmmnpoacjifgojmhkegmhngbfhdjlmb) / [Firefox Add-Ons](https://addons.mozilla.org/ja/firefox/addon/nicoad-ex/) にて公開中です。

---

## 必要条件
以下のいずれかを利用して開発に参加することができます。
- Google Chrome 最新版
- Mozilla Firefox 最新版

（どちらもOSは問わないが最新のものであることが条件）

## 使用言語
- JavaScript
- jQuery

## 開発への参加
### 環境構築
1. 最新のリポジトリをDL
2. ブラウザの設定からデベロッパーモード(Chromeのみ)を有効化
3. DLしたファイルを読み込み編集

### 注意事項
- 同じスクリプトでChrome/Firefoxどちらも動作する必要があります。
- iframeの`src`の書き換えは、`contentWindow.location.replace`を利用し、jQueryを利用しないこと。以下補足です。
  - jQueryの`attr`では履歴（戻る／進む）ボタンに影響が出ます。
  - jQueryの`$('#example_iframe_id')`での指定では、`contentWindow.location.replace`が利用できません。

## ライセンス
MIT

## 作者
AyumuNekozuki / @nekozuki_dev 

