var sysDefine = {};

sysDefine.imagesArr = function(iType) {
	var aImages = {1:'right', 2:'error', 3:'warn'};

	return aImages[iType] ? aImages[iType] : 'right';
};

sysDefine.webMsg = function (iType, sCon) {
	var sImage = sysDefine.imagesArr(iType);

	$.popup({
		type : 1,
		head : {yes:0},
		con : {text:[1, sCon], img:[1,sImage]},
		but : {yes:0},
		animate : {type:1, target:1},
		opBut : {yes:0},
		autoClose : {yes:1, time:2}
	});
};

sysDefine.webEternityMsg = function (iType, sCon) {
	var aType = [1,2,3];

	if (jQuery.inArray(iType, aType)) {
		$.popup({
			type : 1,
			head : {yes:0},
			con : {text:[1, sCon]},
			but : {yes:0},
			animate : {type:1, target:1},
			opBut : {yes:0}
		});
	} else {
		var sImage = sysDefine.imagesArr(iType);

		$.popup({
			type : 1,
			head : {yes:0},
			con : {text:[1, sCon], img:[1,sImage]},
			but : {yes:0},
			animate : {type:1, target:1},
			opBut : {yes:0}
		});
	}
};

sysDefine.manage = function (con, iType, json, width) {
	if (!width) { width = 'auto'; }
	var sImage = sysDefine.imagesArr(iType);

	var num = $.popup({
				target : Ev.pubVar.winDocum.find("body"),
				type : 1,
				opBut : {close:0},
				area : {w:width, h:"auto"},
				con : {text:[1, con], img:[1,sImage]},
				but : {
					yes : 1,
					button : json
				}
			});
	return num;
};

sysDefine.Iframe = function(sTitle, sUrl, iWidth, iHeight) {
	Ev.iframe = $.popup({
		type : 5,
		head : {text : sTitle},
		area : {w:iWidth,h:iHeight},
		animate : {type:1},
		con : {src : sUrl}
	});
};

sysDefine.shade = function () {
	Ev.shade = $.popup({
		type : 6
	});
};

sysDefine.colse = function () {
	$.popupClose(Ev.iframe);
};

function hide_window(window_name){
	var isWin = dhxWins.isWindow(window_name);
	if(isWin){
		dhxWins.window(window_name).hide();
	}
}

function show_window(window_name){
	var isWin = dhxWins.isWindow(window_name);
	if(isWin){
		dhxWins.window(window_name).show();
	}
}

