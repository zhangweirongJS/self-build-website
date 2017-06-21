/**
 * Created by Administrator on 2017/3/2 0002.
 */
/* https://www.ev123.net
 author:qwguo;
 author:首页编辑公用函数;
 Date:2013;
 change Date: 2015/04/25
 */
var pf = {}; //编辑的公用对象
//判断当前引用该文件的页面
if (window != window.top) {
    pf.Pwin = window.parent.Ev.pubVar.winSelf; //非父框架引用
} else {
    pf.Pwin = Ev.pubVar.winSelf; // 父框架引用
}
pf.PwinDom = pf.Pwin.Ev.pubVar.winDocum;
pf.wIframe = pf.Pwin.Ev.pubVar.wIframe;
pf.wIframeWin = pf.Pwin.Ev.pubVar.wIframeWin;
pf.wIframeDom = pf.wIframe.contents();
//tab选项卡功能
pf.fT = function(obj, idobj, bfun) {
    $(obj).addClass("cur").siblings().removeClass("cur");
    $("#" + idobj).show().siblings().hide();
    if (typeof(bfun) === 'function') {
        bfun();
    }
    return false;
};
//得到元素的css通过js原生的方法得到
pf.gCss = function(obj, name) {
    var style = obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
    return style;
};
/**设置样式**/
pf.sS = function(cSId, cMId, cl, skey, sval) {
    var _cMId = "#" + cMId,
        not = true,
        cSh = "",
        cSharr = [],
        nv, reg;
    if (cl == ':hover') {
        nv = _cMId + cl + "{" + skey + ":" + sval + ";}";
    } else {
        nv = _cMId + " " + cl + "{" + skey + ":" + sval + ";}"
    }
    if (cSId != "Mstyle" && cSId != "Rstyle" && cSId != 'AbsStyle') {
        if (pf.wIframeWin.sCssJson[cSId] === undefined || pf.wIframeWin.sCssJson[cSId] === 'undefined') {
            pf.wIframeWin.sCssJson[cSId] = "";
        }
        cSh = pf.wIframeWin.sCssJson[cSId];
    } else {
        if (cSId == "Mstyle") {
            if (/menuCatalogMore/.test(cMId)) {
                cMId = "Mo_" + cMId.substr(16);
            }
        }
        if (pf.wIframeWin.sCssJson[cSId][cMId] === undefined || pf.wIframeWin.sCssJson[cSId][cMId] === 'undefined') {
            pf.wIframeWin.sCssJson[cSId][cMId] = "";
        }
        cSh = pf.wIframeWin.sCssJson[cSId][cMId];
    }
    if (cSh.length > 0) {
        cSh = cSh.replace(/{\s*\r*\n*/g, "{").replace(/\t/g, "").replace(/\r*\n*}/g, "}\n");
        cSharr = cSh.split("\n");
        if (cl == ':hover') {
            reg = new RegExp(_cMId + cl + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        } else {
            reg = new RegExp(_cMId + " *" + cl.replace(".", "\\.").replace('*', '\\*') + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        }
        //var reg = eval("/"+_cMId + " *" + cl.replace(".", "\\.") + " *{ *" + skey + " *:"+" *"+"[^;]*; *}/gi");
        for (var i = cSharr.length - 1; i >= 0; --i) {
            var v = cSharr[i];
            if (reg.test(v)) {
                cSharr.splice(i, 1, nv);
                not = false;
            } else if (v.length === 0 || /^\s$/.test(v)) {
                cSharr.splice(i, 1);
            }
        }
    }
    if (not) {
        cSharr.push(nv);
    }
    if (cSId != "Mstyle" && cSId != "Rstyle" && cSId != 'AbsStyle') {
        pf.wIframeWin.sCssJson[cSId] = cSharr.join("");
    } else {
        pf.wIframeWin.sCssJson[cSId][cMId] = cSharr.join("");
    }
    pf.wIframeWin.DF.f.writeStyle(cSId);
};

/**删除样式**/
pf.rS = function(cSId, cMId, cl, skey) {
    var _cMId = "#" + cMId,
        cSh = "",
        cSharr = "",
        reg;
    if (cSId != "Mstyle" && cSId != "Rstyle" && cSId != 'AbsStyle') {
        cSh = pf.wIframeWin.sCssJson[cSId];
    } else {
        if (cSId == "Mstyle") {
            if (/menuCatalogMore/.test(cMId)) {
                cMId = "Mo_" + cMId.substr(16);
            }
        }
        cSh = pf.wIframeWin.sCssJson[cSId][cMId];
    }
    if (cSh != undefined && cSh.length > 0) {
        cSh = cSh.replace(/{\s*\r*\n*/g, "{").replace(/\t/g, "").replace(/\r*\n*}/g, "}\n");
        cSharr = cSh.split("\n");
        if (cl == ':hover') {
            reg = new RegExp(_cMId + cl + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        } else {
            reg = new RegExp(_cMId + " *" + cl.replace(".", "\\.").replace("*", "\\*") + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        }
        //var reg = eval("/"+_cMId + " *" + cl.replace(".", "\\.") + " *{ *" + skey + " *:"+" *"+"[^;]*; *}/gi");
        for (var i = cSharr.length - 1; i >= 0; --i) {
            var v = cSharr[i];
            if (v.length == 0 || /^\s$/.test(v) || reg.test(v)) {
                cSharr.splice(i, 1);
            }
        }
        if (cSId != "Mstyle" && cSId != "Rstyle" && cSId != 'AbsStyle') {
            pf.wIframeWin.sCssJson[cSId] = cSharr.join("");
        } else {
            pf.wIframeWin.sCssJson[cSId][cMId] = cSharr.join("");
        }
        pf.wIframeWin.DF.f.writeStyle(cSId);
    }
};
// var abc = 0;
/**得到设置的样式**/
pf.gS = function(cSId, cMId, cl, skey) {
    var _cMId = "#" + cMId,
        not = true,
        cSh = "",
        gets = null,
        cSharr = "",
        reg;
    if (cSId != "Mstyle" && cSId != "Rstyle" && cSId != 'AbsStyle') {
        cSh = pf.wIframeWin.sCssJson[cSId];
    } else {
        if (cSId == "Mstyle") {
            if (/menuCatalogMore/.test(cMId)) {
                cMId = "Mo_" + cMId.substr(16);
            }
        }
        cSh = pf.wIframeWin.sCssJson[cSId][cMId];
    }
    if (cSh != undefined && cSh.length > 0) {
        cSh = cSh.replace(/{\s*/g, "{").replace(/\s*}/g, "}\n");
        cSharr = cSh.split("\n");
        if (cl == ':hover') {
            reg = new RegExp(_cMId + cl + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        } else {
            reg = new RegExp(_cMId + " *" + cl.replace(".", "\\.") + " *{ *" + skey + " *:" + " *" + "[^;]*; *}", "gi");
        }
        //var reg = eval("/"+_cMId + " *" + cl.replace(".", "\\.") + " *{ *" + skey + " *:"+" *"+"[^;]*; *}/gi");
        for (var i = cSharr.length - 1; i >= 0; --i) {
            var v = cSharr[i];
            if (reg.test(v)) {
                v = v.slice(v.indexOf('{') + 1, v.lastIndexOf(';'));
                if (skey == 'background-image') {
                    if (v.indexOf("(") != -1) {
                        gets = v.substring(v.indexOf("(") + 1, v.lastIndexOf(")"));
                    } else {
                        gets = v.slice(v.indexOf(":") + 1);
                    }
                } else {
                    gets = v.slice(v.indexOf(":") + 1);
                }
            }
        }
        return gets;
    }
};
//更改前台页面的模块属性
pf.eleChange_ = function(o) {
    for (i = 0; i < o.length; i++) {
        var da = pf.wIframeWin.DF.f.s_j(o[i].attr("data-attr"));
        if (da.c != 1) {
            da.c = 1;
            pf.wIframeWin.DF.f.changeAttr(o[i], "data-attr", pf.wIframeWin.DF.f.j_s(da));
        }
    }
    pf.Pwin.Ev.pubFun.changeSave();
};
//更改设置调用的函数，用来改变元素的属性值和是否更改的变量。
pf.eleChange = function(o) {
    $('#alert_tab_c').on({
        change: function() {
            pf.eleChange_(o);
        }
    }, 'input,select');
};
//显示隐藏属性设置
pf.sAL = function(obj, val) {
    if (val == "show")
        $("#" + obj).css({
            "display": "block"
        });
    else
        $("#" + obj).css({
            "display": "none"
        });
};
/*--上传背景图片事件--*/
pf.upBgImg = function(id) {
    var curBgImg = $('#' + id);
    pf.Pwin.Ev.pubFun.upBgImg(curBgImg);
};
/*--恢复透明度函数--*/
pf.resetOpacity = function(idArr, fn) {
    setTimeout(function() {
        var o = $('#' + idArr),
            prev = o.prev('.alpha');
        prev.find('.alphaMove').animate({
            "left": 100
        }, 200);
        prev.find('.alphaBg').animate({
            'width': 100
        }, 200);
        o.val(100);
        if (typeof(fn) == 'function') {
            setTimeout(function() {
                fn();
            }, 10);
        }
    }, 100);
};
/*--修改值--*/
//pf.changeImg = function(a){
//  var imgsrc = a;
//  pf.curBgImg.val(a).change();
//}
/*--取消背景图片事件--*/
pf.noBgImg = function(id) {
    $('#' + id).val('none').change();
    $('#' + id + '_look', '#' + id + '_none').css({
        'display': 'none'
    });
};
/*--取消背景图片事件--*/
pf.noBgColor = function(id){
    var tid = $('#' + id);
    tid.val('transparent').change();
    tid.next('.sp-replacer').find('.sp-preview-inner').css('background-color','transparent');
};
// 用于返回内外边距的值
pf.getPM = function(a,arr){
    var arr = arr.split(' '),v;
    switch(a){
        case 't' : v = 0; break;
        case 'r' : v = 1; break;
        case 'b' : v = 2; break;
        case 'l' : v = 3; break;
    }
    return parseInt(arr[v]);
};
// 用于返回内外边距的值
pf.getBR = function(a,arr){
    var arr = arr.split(' '),v;
    switch(a){
        case 'tl' : v = 0; break;
        case 'tr' : v = 1; break;
        case 'br' : v = 2; break;
        case 'bl' : v = 3; break;
    }
    return parseInt(arr[v]);
};
// 用于返回文字设置的值
pf.getFont = function(a, arr){
    var arr = arr.split(' '),v;
    switch(a){
        case 't' : v = arr[0]; break;
        case 'w' : v = arr[1]; break;
        case 's' : v = arr[2]; break;
        case 'f' : v = arr[3].slice(1,arr[3].length-1); break;
    }
    return v;
};
// 用于返回背景设置的值
pf.getBg = function(a, arr){
    var arr = arr.split(' '),v;
    switch(a){
        case 'c' : v = arr[0]; break;
        case 'i' : v = arr[1] != 'none' ? arr[1].slice(4,arr[1].length-1) : arr[1]; break;
        case 'r' : v = arr[2]; break;
        case 'p' : v = arr[3] + ' ' + arr[4]; break;
    }
    return v;
};
// 用于返回边框的值
pf.getBor = function(a,arr){
    var arr = arr.split(' '),v;
    switch(a){
        case 'c' : v = arr[0]; break;
        case 'w' : v = parseInt(arr[1]); break;
        case 's' : v = arr[2]; break;
    }
    return v;
};
//检测输入数字的范围和正确否
pf.numJudge = function(obj, defaults, mins, maxs) {
    var that = $(obj),
        a = parseInt(that.val()),
        mins = mins || 0,
        maxs = maxs || 999;
    if (isNaN(a)) {
        a = defaults;
    } else if (a < mins) {
        a = mins;
    } else if (a > maxs) {
        a = maxs;
    }
    that.val(a);
    return a;
};
pf.secondNum = function(obj, defaults, mins, maxs) {
    var that = obj,
        a = that.val(),
        reg = /^\d{1,2}(\.\d{1,3})?$/,
        mins = mins || 0.1,
        maxs = maxs || 10;
    if (!reg.test(a)) {
        a = defaults;
    } else if (a < mins) {
        a = mins;
    } else if (a > maxs) {
        a = maxs;
    }
    that.val(a);
    return a;
};
//选择颜色函数，用于设置时选择颜色接收一个参数，表示哪个对象的下方input元素
pf.fncolor = function(obj) {
    var colobj = obj.find("input[name=colorInput]");
    if (colobj.length > 0) {
        colobj.each(function() {
            var this_ = $(this);
            this_.spectrum({
                color: this_.val(),
                flat: false,
                clickoutFiresChange: true,
                showInitial: true,
                preferredFormat: "hex",
                showInput: true,
                chooseText: "确定",
                cancelText: "取消",
                change: function(color) {
                    this_.val(color.toHexString());
                }
            });
        });
    }
};
//透明度
(function($) {
    $.fn.extend({
        "changeOpacity": function(options) {
            return this.each(function() {
                //options = $.extend({opacity : 100},options);
                var o = $('<div class="alpha"><div class="alphaBg"></div><span class="alphaMove"></span><div class="alphaBorder"></div></div>'),
                    Ithis = $(this),
                    m = o.find('span'),
                    obg = o.find('.alphaBg'),
                    obo = o.find('.alphaBorder'),
                    sx = 0;
                m.css({
                    'left': Ithis.val() + 'px'
                });
                obg.css({
                    'width': Ithis.val() + 'px'
                });
                Ithis.before(o).attr("disabled", "disabled");
                m.mousedown(function(ev) {
                    var oEvent = ev || event;
                    sx = oEvent.clientX - m.position().left;
                    $(document).mousemove(function(ev) {
                        var oEvent = ev || event;
                        var l = oEvent.clientX - sx;
                        setfn(l);
                    });
                    $(document).mouseup(function() {
                        $(document).unbind('mousemove');
                        $(document).unbind('mouseup');
                        if ($.browser.msie) m[0].releaseCapture();
                    });
                    if ($.browser.msie) m[0].setCapture();
                    return false;
                });
                o.mousedown(function(ev) {
                    var oEvent = ev || event;
                    l = oEvent.clientX - o.offset().left - 5;
                    //setfn(l);
                    if (l > o.width() - m.width())
                        l = o.width() - m.width();
                    if (l < 0)
                        l = 0;
                    m.animate({
                        "left": l
                    }, 200);
                    obg.animate({
                        'width': l
                    }, 200);
                    Ithis.val(l).change();
                });

                function setfn(l) {
                    if (l > o.width() - m.width())
                        l = o.width() - m.width();
                    if (l < 0)
                        l = 0;
                    m.css({
                        "left": l
                    });
                    Ithis.val(l).change();
                    obg.width(l);
                }
            });
        }
    });
})(jQuery);