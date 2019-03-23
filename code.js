//ReadMe.html読んでね

function doGet(e) {
    var id = e.parameter.id;
    var quest = e.parameter.quest;
    var homeId = "1PkoxrfExAqABupXn3uFMM4Q5HGLSfQJG";
    //ここに一番上のフォルダのidを入れる

    if ((id == undefined && quest == undefined) || id == homeId) {
        recordUser(DriveApp.getFolderById(homeId).getName());
        var htmlTemplate = HtmlService.createTemplateFromFile('index');
        htmlTemplate.p = homeId;
        return evaluateHtml(htmlTemplate);
    }
    else if (id && id.length == 33) {
        recordUser(DriveApp.getFolderById(id).getName());
        var htmlTemplate = HtmlService.createTemplateFromFile('pages');
        htmlTemplate.p = id;
        return evaluateHtml(htmlTemplate);
    }
    else if (quest != undefined) {
        recordUser("アンケート");
        return evaluateHtml(HtmlService.createTemplateFromFile('lab2018'));
    }
    else {
        recordUser(DriveApp.getFolderById(id).getName());
        var htmlTemplate = HtmlService.createTemplateFromFile('index');
        htmlTemplate.p = homeId;
        return evaluateHtml(htmlTemplate);
    }
}

//htmlTemplateからhtmlを出力
function evaluateHtml(htmlTemplate) {
    return htmlTemplate.evaluate()
/*タイトルを設定*/.setTitle('KU1025β')
/*ファビコンを設定*/.setFaviconUrl('https://drive.google.com/uc?id=1d7PXXzJU4iWdBhSqGJ_piNlcVLmzlYbg&.png');
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
//css.htmlをindex.htmlやpages.htmlにincludeするための関数
//参考：https://tonari-it.com/gas-html-css/#toc4


//folderIdから親フォルダの情報を取得
function parentFolder(folderId) {
    var parentFolder = DriveApp.getFolderById(folderId).getParents().next();
    this.id = parentFolder.getId();
    this.name = parentFolder.getName();
    return this;
}

function getContents(rootFolderId) {
    var htmlFolder = DriveApp.getFolderById("10_CBJ7bueuVvX4BS0usPXwtuL7QbohHc");
    var htmlFiles = htmlFolder.getFilesByName(rootFolderId);
    var htmlDocumentId;
    if (htmlFiles.hasNext()) {
        htmlDocumentId = htmlFiles.next().getId();
        return DocumentApp.openById(htmlDocumentId).getBody().getText();
    }
    else {
        return "";
    }
}

//開かれたページと時刻をスプレッドシートに記録
function recordUser(pageName) {
    var sheetData = SpreadsheetApp.openById("1mYtdZrnYZmhkuSK6-qA2WJKDzFst1-PhP9E1CwoUsPE").getSheetByName("シート1");
    var lastRow = sheetData.getDataRange().getLastRow();
    lastRow++;
    var time = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd/HH:mm:ss.SSS');
    sheetData.getRange(lastRow, 1).setValue(time);
    sheetData.getRange(lastRow, 2).setValue(pageName);
    return 0;
}