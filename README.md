# KU1025
readmeを読んでくださって＆KU1025βを利用してくださってありがとうございます！

##KU1025βとは？
KU1025βとは，(狭義には)Google Apps ScriptとGoogleドライブを利用した過去問サイト
ですが，Googleドライブの中身をフォルダの構造そのままにwebサイトにできるので
過去問に限らず色々なことに使える気がする。知らんけど
質問があれば1025.kuexam@Gメール.comかtwitter:@1025kuexamへ

##使い方
1.ここ(https://tonari-it.com/gas-html-web-page/#toc1)を参考にしてGASのスタンドアロンスクリプトを作成。

2.コード.gsとindex.html,pages.html,css.html,prepare.gsを立ち上げたプロジェクトにコピー。myfunctionは消してok

3.過去問(或いは公開したい資料)を入れているGoogleドライブのフォルダを開き，URLからフォルダIDをコピー
フォルダIDとは:(https://drive.google.com/drive/u/0/folders/[フォルダID])

4.コード.gsの6行目homeId=”ここ”に3.でコピーしたidを貼り付け

5.pages.htmlの51行目(変わってるかも)とかindex.htmlのどこかにtwitterが埋め込んであるので消したり変えたり....

6.他にもいろいろ書いてあることを変える(doGet内の要らないelse ifとか)

7.ここ(https://tonari-it.com/gas-html-web-page/#toc8)を参考にして公開する

8.サイトのurlを配る。長いしわけわからんのでbit.lyとかでカスタムurl作るといいと思う
9.KU1025を使った旨を下記メールアドレスかtwitterに連絡する。絶対。
10.【重要】ここまで読んだあなたはかなり過去問サイトに興味があると思うのでぜひ運営に協力してください！！
連絡先：1025.kuexam@Gメール.com　或いは　<a href="https://twitter.com/1025kuexam">@1025kuexam</a>(twitter)

thanks
シバニャンさんのkakomon-site-generator(https://github.com/shiba6v/kakomon-site-generator)
KU1025βのgetFilesId()およびほぼ全てのhtmlファイルはこれを参考にしています。

##KU1025(旧サイト)についておよびβを作った経緯
旧サイト(http://1025-kuexam.netlify.com)は
シバニャンさんのkakomon-site-generator(https://github.com/shiba6v/kakomon-site-generator)
で作成していました。めちゃくちゃありがてぇ(twitter埋め込んだり色変えたりトップページ手書きしたりはした)
が，僕の家でrubyを実行できないので更新頻度が課題となっていました
kakomon-site-generatorの中の関数使ってGASで常に最新の状態のサイトを作れるのでは？と思ってβを作った