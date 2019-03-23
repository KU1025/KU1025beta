//専門科目のhtmlを生成
function makeHtmlSourcesInitialSpecial() {
    var rootFolderId = "1BY0f4e80FPv3gnyoKOMFbXukAKtKaISl";
    makeHtmlDocument(rootFolderId);
    var rootFolder = DriveApp.getFolderById(rootFolderId);
    makeHtmlSources(rootFolder);
    return 0;
}

//全学共通科目のhtmlを生成
function makeHtmlSourcesInitialGeneral() {
    var rootFolderId = "1VU0k4EK70WG401ymoSyHxNiGxQ7DmvE1";
    makeHtmlDocument(rootFolderId);
    var rootFolder = DriveApp.getFolderById(rootFolderId);
    makeHtmlSources(rootFolder);
    return 0;
}

//前日までに作られたhtmlを削除
function removeOldFile() {
    //htmlフォルダーのid
    var htmlFolder = DriveApp.getFolderById("10_CBJ7bueuVvX4BS0usPXwtuL7QbohHc");
    var files = htmlFolder.getFiles();
    var today = new Date().getDate();
    while (files.hasNext()) {
        var file = files.next();
        if (file.getDateCreated().getDate() < today) {
            DriveApp.removeFile(file);
        }
    }
    return 0;
}

//rootFolder以下のすべてのフォルダについて，makeHtmlDocument()を実行
function makeHtmlSources(rootFolder) {
    var folders = rootFolder.getFolders();
    while (folders.hasNext()) {
        var folder = folders.next();
        makeHtmlDocument(folder.getId());
        makeHtmlSource(folder);
    }
    return 0;
}

//pages.htmlのリスト部分を事前に生成
function makeHtmlDocument(rootFolderId) {
    //公開しているウェブアプリのurl
    var url = "https://script.google.com/macros/s/AKfycby_DXbJeWYO_tOzxCM6JGPV7yAwL6ynclXHGWCk4-JSoM9j5vA/exec";
    var contents = makeContents(rootFolderId, url);

    var htmlFolder = DriveApp.getFolderById("10_CBJ7bueuVvX4BS0usPXwtuL7QbohHc");
    //[rootFolderId]という名前の空のドキュメントファイルを，マイドライブに作成
    var htmlDocumentOriginal = DocumentApp.create(rootFolderId);
    //作成したドキュメントファイルのファイルオブジェクト
    var htmlDocumentFileOriginal = DriveApp.getFileById(htmlDocumentOriginal.getId());
    //作成したドキュメントファイルをhtmlフォルダにコピー
    var htmlDocumentFile = htmlDocumentFileOriginal.makeCopy(rootFolderId, htmlFolder);
    //(マイドライブにある)元のドキュメントを削除
    DriveApp.removeFile(htmlDocumentFileOriginal);
    //コピーにcontentsを記録
    var htmlDocument = DocumentApp.openById(htmlDocumentFile.getId());
    htmlDocument.setText(contents);
    return 0;
}


//フォルダ，ファイル一覧のhtmlを生成
function makeContents(rootFolderId, url) {
    var contents = "";
    var myData = getFilesId(rootFolderId);
    var pageUrl = url + '?id=' + rootFolderId;  //現在表示しているページのurl

    var rootFolderName = DriveApp.getFolderById(rootFolderId).getName();
    //tweetbottunUrl1,2の間にファイル名を入れてtweetボタンのテキストに
    var tweetbottunUrl1 = "https://twitter.com/intent/tweet?hashtags="
        + rootFolderName.replace(/\(/g, "").replace(/\)/g, "")
        + "&ref_src=twsrc%5Etfw&text=KU1025で";
    var tweetbottunUrl2 = "を解いたよ&url=" + pageUrl + "&tw_p=tweetbutton";

    for (var i = 0; myData["folder"][i] != undefined; i++) {

        var folderId = JSON.stringify(myData["folder"][i]["fileId"]);
        var folderName = JSON.stringify(myData["folder"][i]["name"]);
        folderId = folderId.substr(1, folderId.length - 2); //.substr(1,folderId.length-2)で””を取り除く
        folderName = folderName.substr(1, folderName.length - 2);
        //<li><a href="https://script.google.com/macros/s/[scriptId]/dev?id=[folderId]">[folderName]</a></li>
        contents += "<li><a href=\"" + url + "?id=" + folderId + "\">" + folderName + "</a></li>";
    }
    for (var i = 0; myData["file"][i] != undefined; i++) {

        var fileId = JSON.stringify(myData["file"][i]["fileId"]);
        var fileName = JSON.stringify(myData["file"][i]["name"]);
        fileId = fileId.substr(1, fileId.length - 2);
        fileName = fileName.substr(1, fileName.length - 2);
        //<li><a href="https://drive.google.com/file/d/[fileId]" target="_blank">[fileName]</a>
        //<a href="[tweetbottunUrl]" class="tweetbottun">&nbsp;ツイート&nbsp;</a></li>
        contents += "<li><a href=\"https://drive.google.com/file/d/" + fileId + "\" target=\"_blank\">" + fileName + "</a> " //ファイルへのリンク
            + "<a href=\"" + tweetbottunUrl1 + fileName.substr(0, fileName.length - 4) + tweetbottunUrl2 + "\" class=\"tweetbottun\">&nbsp;ツイート&nbsp;</a></li>"; //tweetボタン
    }
    return contents;
}

//targetFolder内のfile,folderの情報を取得
function getFilesId(targetFolderId) {
    var result = { folder: [], file: [] };
    var targetFolder = DriveApp.getFolderById(targetFolderId);

    //targetFolder直下の全fileのnameとidを取得
    var files = targetFolder.getFiles();
    while (files.hasNext()) {
        var file = files.next();
        result["file"].push({ name: file.getName(), fileId: file.getId() });
    }

    //targetFolder直下の全folderのnameとidを取得
    var child_folders = targetFolder.getFolders();
    while (child_folders.hasNext()) {
        var child_folder = child_folders.next();
        result["folder"].push({ name: child_folder.getName(), fileId: child_folder.getId() });
    }

    result["file"].sort(function (a, b) { //filename降順でソート
        if (a.name < b.name) return 1;
        else return -1;
    });
    result["folder"].sort(function (a, b) { //foldername昇順でソート
        if (a.name < b.name) return -1;
        else return 1;
    });
    return result;
}