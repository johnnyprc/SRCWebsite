$(document).ready(function() {
    console.log( "ready!" );

    var url = "https://docs.google.com/spreadsheets/d/1PJ3WNzB0MT-KN-_hDV00InJ4BaYeuFrXDIgIsIw5tms/pubhtml";
	var gss = new GoogleSpreadsheetsParser(url,{sheetTitle: 'Form Responses 1', hasTitle: true});
	$('#testTxt').text(gss.contents[0][0]);
});