/**
 * Created by Administrator on 2017/3/8 0008.
 */
/* https://www.ev123.net
 author:qwguo;
 author:自定义搜索样式;
 Date:2015/11/23;
 */
var curId = pf.Pwin.Ev.admin.tj.v.curEditObjId,
    curDom = pf.Pwin.Ev.admin.tj.v.curEditObj,
    styleDom = 'Hstyle';
if (curId) {
    // 页面加载完执行函数
    $(function() {
        // 给tab标题绑定单击事件执行函数
        $("#alert_tab_t").on({
            click: function() {
                var that = $(this),
                    tId = that.data("id"),
                    cDom = $("#" + tId);
                if (!that.hasClass('cur')) {
                    that.addClass('cur').siblings().removeClass('cur');
                    if(!Sset.setStyleFun.alreadyRun[tId]){
                        if(Sset.setStyleFun[tId]()){
                            if (!Sset.getAttrSetFun.alreadyRun[tId]) {
                                Sset.SHLoading('tabc_loading','show');
                                setTimeout(function() {
                                    if (Sset.getAttrSetFun[tId]()) {
                                        pf.fncolor(cDom);
                                        cDom.find("input[name=opacityObj]").changeOpacity();
                                        Sset.SHLoading('tabc_loading','hide');
                                    }
                                }, 1);
                            }
                        }
                    }
                    cDom.css('display', 'block').siblings().css('display', 'none');
                }
            }
        }, "li");
        // 给第一个tab一个单击事件
        $("#skinSet_tab").trigger('click');
        // 移除弹窗的loading动画层
        $("iframe[name='" + window.name + "']", window.parent.document).parents("div.evPopupBodyCC").find("div.loadingWait").remove();
    });
    var Sset = {};
    // 隐藏显示加载等待遮罩方法
    Sset.SHLoading = function(id,s) {
        $('#' + id)[s]();
    };
    // 定义回显的存放对象，用来存放得到的设置值
    Sset.getAttrVal = {};
    // 得到回显值的执行函数
    Sset.getAttrRunFun = {
        'skinSelect': function() {
            // Sset.getAttrVal.skinSelect = {};
        },
        'skinSet': function() {
            Sset.getAttrVal.skinSet = {
                sInnerw: parseInt(pf.gS(styleDom, curId, '.search-inner', 'width')),
                sInnerpt: parseInt(pf.gS(styleDom, curId, '.search-inner', 'padding-top')),
                sInnerpb: parseInt(pf.gS(styleDom, curId, '.search-inner', 'padding-bottom')),
                sInnerpl: parseInt(pf.gS(styleDom, curId, '.search-inner', 'padding-left')),
                sInnerpr: parseInt(pf.gS(styleDom, curId, '.search-inner', 'padding-right')),
                sInnerbg: pf.gS(styleDom, curId, '.search-inner', 'background'),
                sInnerbgc: pf.gS(styleDom, curId, '.search-inner', 'background-color'),
                sInnerbgi: pf.gS(styleDom, curId, '.search-inner', 'background-image'),
                sInnerbgp: pf.gS(styleDom, curId, '.search-inner', 'background-position'),
                sInnerbgr: pf.gS(styleDom, curId, '.search-inner', 'background-repeat')
            };
        },
        'sKeySet' : function(){
            Sset.getAttrVal.sKeySet = {
                sKmt: parseInt(pf.gS(styleDom, curId, '.keyWord', 'margin-top')),
                sKmb: parseInt(pf.gS(styleDom, curId, '.keyWord', 'margin-bottom')),
                sKml: parseInt(pf.gS(styleDom, curId, '.keyWord', 'margin-left')),
                sKmr: parseInt(pf.gS(styleDom, curId, '.keyWord', 'margin-right')),
                sKh: parseInt(pf.gS(styleDom, curId, '.keyWord .input', 'height')),
                sKw: parseInt(pf.gS(styleDom, curId, '.keyWord .input', 'width')),
                sKpt: parseInt(pf.gS(styleDom, curId, '.keyWord', 'padding-top')),
                sKpb: parseInt(pf.gS(styleDom, curId, '.keyWord', 'padding-bottom')),
                sKpl: parseInt(pf.gS(styleDom, curId, '.keyWord', 'padding-left')),
                sKpr: parseInt(pf.gS(styleDom, curId, '.keyWord', 'padding-right')),
                sKbg: pf.gS(styleDom, curId, '.keyWord', 'background'),
                sKbgc: pf.gS(styleDom, curId, '.keyWord', 'background-color'),
                sKbgi: pf.gS(styleDom, curId, '.keyWord', 'background-image'),
                sKbgp: pf.gS(styleDom, curId, '.keyWord', 'background-position'),
                sKbgr: pf.gS(styleDom, curId, '.keyWord', 'background-repeat'),
                sKborT: pf.gS(styleDom, curId, '.keyWord', 'border-top'),
                sKborTc: pf.gS(styleDom, curId, '.keyWord', 'border-top-color'),
                sKborTs: pf.gS(styleDom, curId, '.keyWord', 'border-top-style'),
                sKborTw: parseInt(pf.gS(styleDom, curId, '.keyWord', 'border-top-width')),
                sKborB: pf.gS(styleDom, curId, '.keyWord', 'border-bottom'),
                sKborBc: pf.gS(styleDom, curId, '.keyWord', 'border-bottom-color'),
                sKborBs: pf.gS(styleDom, curId, '.keyWord', 'border-bottom-style'),
                sKborBw: parseInt(pf.gS(styleDom, curId, '.keyWord', 'border-bottom-width')),
                sKborL: pf.gS(styleDom, curId, '.keyWord', 'border-left'),
                sKborLc: pf.gS(styleDom, curId, '.keyWord', 'border-left-color'),
                sKborLs: pf.gS(styleDom, curId, '.keyWord', 'border-left-style'),
                sKborLw: parseInt(pf.gS(styleDom, curId, '.keyWord', 'border-left-width')),
                sKborR: pf.gS(styleDom, curId, '.keyWord', 'border-right'),
                sKborRc: pf.gS(styleDom, curId, '.keyWord', 'border-right-color'),
                sKborRs: pf.gS(styleDom, curId, '.keyWord', 'border-right-style'),
                sKborRw: parseInt(pf.gS(styleDom, curId, '.keyWord', 'border-right-width')),
                sKtxtfc: pf.gS(styleDom, curId, '.keyWord .input', 'color'),
                sKtxtfs: parseInt(pf.gS(styleDom, curId, '.keyWord .input', 'font-size')),
                sKtxtfb: pf.gS(styleDom, curId, '.keyWord .input', 'font-weight'),
                sKtxtfi: pf.gS(styleDom, curId, '.keyWord .input', 'font-style'),
                sKtxtfu: pf.gS(styleDom, curId, '.keyWord .input', 'text-decoration'),
                sKtxtff: pf.gS(styleDom, curId, '.keyWord .input', 'font-family')
            }
        },
        'sBtnSet' : function(){
            Sset.getAttrVal.sBtnSet = {
                sBtnmt: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'margin-top')),
                sBtnmb: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'margin-bottom')),
                sBtnml: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'margin-left')),
                sBtnmr: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'margin-right')),
                sBtnh: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'height')),
                sBtnw: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'width')),
                sBtnpt: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'padding-top')),
                sBtnpb: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'padding-bottom')),
                sBtnpl: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'padding-left')),
                sBtnpr: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'padding-right')),
                sBtnbg: pf.gS(styleDom, curId, '.keyBtn', 'background'),
                sBtnbgc: pf.gS(styleDom, curId, '.keyBtn', 'background-color'),
                sBtnbgi: pf.gS(styleDom, curId, '.keyBtn', 'background-image'),
                sBtnbgp: pf.gS(styleDom, curId, '.keyBtn', 'background-position'),
                sBtnbgr: pf.gS(styleDom, curId, '.keyBtn', 'background-repeat'),
                sBtnborT: pf.gS(styleDom, curId, '.keyBtn', 'border-top'),
                sBtnborTc: pf.gS(styleDom, curId, '.keyBtn', 'border-top-color'),
                sBtnborTs: pf.gS(styleDom, curId, '.keyBtn', 'border-top-style'),
                sBtnborTw: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'border-top-width')),
                sBtnborB: pf.gS(styleDom, curId, '.keyBtn', 'border-bottom'),
                sBtnborBc: pf.gS(styleDom, curId, '.keyBtn', 'border-bottom-color'),
                sBtnborBs: pf.gS(styleDom, curId, '.keyBtn', 'border-bottom-style'),
                sBtnborBw: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'border-bottom-width')),
                sBtnborL: pf.gS(styleDom, curId, '.keyBtn', 'border-left'),
                sBtnborLc: pf.gS(styleDom, curId, '.keyBtn', 'border-left-color'),
                sBtnborLs: pf.gS(styleDom, curId, '.keyBtn', 'border-left-style'),
                sBtnborLw: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'border-left-width')),
                sBtnborR: pf.gS(styleDom, curId, '.keyBtn', 'border-right'),
                sBtnborRc: pf.gS(styleDom, curId, '.keyBtn', 'border-right-color'),
                sBtnborRs: pf.gS(styleDom, curId, '.keyBtn', 'border-right-style'),
                sBtnborRw: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'border-right-width')),
                sBtnBShow: pf.gS(styleDom, curId, '.keyBtn .btxt', 'visibility'),
                sBtntxtfc: pf.gS(styleDom, curId, '.keyBtn', 'color'),
                sBtntxtfs: parseInt(pf.gS(styleDom, curId, '.keyBtn', 'font-size')),
                sBtntxtfb: pf.gS(styleDom, curId, '.keyBtn', 'font-weight'),
                sBtntxtfi: pf.gS(styleDom, curId, '.keyBtn', 'font-style'),
                sBtntxtfu: pf.gS(styleDom, curId, '.keyBtn', 'text-decoration'),
                sBtntxtff: pf.gS(styleDom, curId, '.keyBtn', 'font-family')
            }
        }
    };
    /*****得到回显值设置函数*****/
    Sset.getAttrSetFun = {
        'alreadyRun': {
            'skinSelect': false,
            'skinSet': false,
            'sKeySet': false,
            'sBtnSet': false
        },
        'skinSelect': function() {
            this.alreadyRun.skinSelect = true;
            return true;
        },
        'skinSet': function() {
            Sset.getAttrRunFun.skinSet();
            var g = Sset.getAttrVal.skinSet;
            /*****搜索外框的样式*****/
            // 宽度
            if (!isNaN(g.sInnerw)) {
                $('#S_sInnerWidth').val(g.sInnerw);
                $('#S_sInnerWidthCus').click();
            } else {
                $('#S_sInnerWidth').val(parseInt(curDom.find('.search-inner').css("width")));
                $('#S_sInnerWidthAuto').click();
            }
            // 内边距
            if(isNaN(g.sInnerpt) || isNaN(g.sInnerpb) || isNaN(g.sInnerpl) || isNaN(g.sInnerpr)){
                $("#S_sInnerPaddingAuto").trigger('click');
                $("#S_sInnerPaddingTop").val(parseInt(curDom.find('.search-inner').css("padding-top")));
                $("#S_sInnerPaddingBottom").val(parseInt(curDom.find('.search-inner').css("padding-bottom")));
                $("#S_sInnerPaddingLeft").val(parseInt(curDom.find('.search-inner').css("padding-left")));
                $("#S_sInnerPaddingRight").val(parseInt(curDom.find('.search-inner').css("padding-right")));
            }else{
                $("#S_sInnerPaddingTop").val(g.sInnerpt);
                $("#S_sInnerPaddingBottom").val(g.sInnerpb);
                $("#S_sInnerPaddingLeft").val(g.sInnerpl);
                $("#S_sInnerPaddingRight").val(g.sInnerpr);
                $("#S_sInnerPaddingCus").trigger('click');
            }
            // 背景
            if (g.sInnerbg) {
                $('#S_sInnerBgHide').click();
            } else {
                if (g.sInnerbgc) {
                    $('#S_sInnerBgColor').val(g.sInnerbgc);
                    $('#S_sInnerBgImage').val(g.sInnerbgi);
                    $('#S_sInnerBgPosition').val(g.sInnerbgp);
                    $('#S_sInnerBgRepeat').val(g.sInnerbgr);
                    $('#S_sInnerBgCus').click();
                } else {
                    $('#S_sInnerBgAuto').click();
                }
            }
            this.alreadyRun.skinSet = true;
            return true;
        },
        'sKeySet' : function(){
            Sset.getAttrRunFun.sKeySet();
            var g = Sset.getAttrVal.sKeySet;
            /*****搜索输入框的样式*****/
            // 外边距
            if(isNaN(g.sKmt) || isNaN(g.sKmb) || isNaN(g.sKml) || isNaN(g.sKmr)){
                $("#S_sKeyMarginAuto").trigger('click');
                $("#S_sKeyMarginTop").val(parseInt(curDom.find('.keyWord').css("margin-top")));
                $("#S_sKeyMarginBottom").val(parseInt(curDom.find('.keyWord').css("margin-bottom")));
                $("#S_sKeyMarginLeft").val(parseInt(curDom.find('.keyWord').css("margin-left")));
                $("#S_sKeyMarginRight").val(parseInt(curDom.find('.keyWord').css("margin-right")));
            }else{
                $("#S_sKeyMarginTop").val(g.sKmt);
                $("#S_sKeyMarginBottom").val(g.sKmb);
                $("#S_sKeyMarginLeft").val(g.sKml);
                $("#S_sKeyMarginRight").val(g.sKmr);
                $("#S_sKeyMarginCus").trigger('click');
            }
            /****边线****/
            // 上边线
            if (g.sKborT) {
                $("#S_sKeyBorderTopHide").trigger('click');
            } else {
                if (g.sKborTc) {
                    $('#S_sKeyBorderTopColor').val(g.sKborTc);
                    $('#S_sKeyBorderTopStyle').val(g.sKborTs);
                    $('#S_sKeyBorderTopWidth').val(g.sKborTw);
                    $("#S_sKeyBorderTopCus").trigger('click');
                } else {
                    $("#S_sKeyBorderTopAuto").trigger('click');
                }
            }
            // 下边线
            if (g.sKborB) {
                $("#S_sKeyBorderBottomHide").trigger('click');
            } else {
                if (g.sKborBc) {
                    $('#S_sKeyBorderBottomColor').val(g.sKborBc);
                    $('#S_sKeyBorderBottomStyle').val(g.sKborBs);
                    $('#S_sKeyBorderBottomWidth').val(g.sKborBw);
                    $("#S_sKeyBorderBottomCus").trigger('click');
                } else {
                    $("#S_sKeyBorderBottomAuto").trigger('click');
                }
            }
            // 左边线
            if (g.sKborL) {
                $("#S_sKeyBorderLeftHide").trigger('click');
            } else {
                if (g.sKborLc) {
                    $('#S_sKeyBorderLeftColor').val(g.sKborLc);
                    $('#S_sKeyBorderLeftStyle').val(g.sKborLs);
                    $('#S_sKeyBorderLeftWidth').val(g.sKborLw);
                    $("#S_sKeyBorderLeftCus").trigger('click');
                } else {
                    $("#S_sKeyBorderLeftAuto").trigger('click');
                }
            }
            // 右边线
            if (g.sKborR) {
                $("#S_sKeyBorderRightHide").trigger('click');
            } else {
                if (g.sKborRc) {
                    $('#S_sKeyBorderRightColor').val(g.sKborRc);
                    $('#S_sKeyBorderRightStyle').val(g.sKborRs);
                    $('#S_sKeyBorderRightWidth').val(g.sKborRw);
                    $("#S_sKeyBorderRightCus").trigger('click');
                } else {
                    $("#S_sKeyBorderRightAuto").trigger('click');
                }
            }
            // 宽度
            if (!isNaN(g.sKw)) {
                $('#S_sKeyWidth').val(g.sKw);
                $('#S_sKeyWidthCus').click();
            } else {
                $('#S_sKeyWidth').val(parseInt(curDom.find('.keyWord .input').css("width")));
                $('#S_sKeyWidthAuto').click();
            }
            // 高度
            if (!isNaN(g.sKh)) {
                $('#S_sKeyHeight').val(g.sKh);
                $('#S_sKeyHeightCus').click();
            } else {
                $('#S_sKeyHeight').val(parseInt(curDom.find('.keyWord .input').css("height")));
                $('#S_sKeyHeightAuto').click();
            }
            // 内边距
            if(isNaN(g.sKpt) || isNaN(g.sKpb) || isNaN(g.sKpl) || isNaN(g.sKpr)){
                $("#S_sKeyPaddingAuto").trigger('click');
                $("#S_sKeyPaddingTop").val(parseInt(curDom.find('.keyWord').css("padding-top")));
                $("#S_sKeyPaddingBottom").val(parseInt(curDom.find('.keyWord').css("padding-bottom")));
                $("#S_sKeyPaddingLeft").val(parseInt(curDom.find('.keyWord').css("padding-left")));
                $("#S_sKeyPaddingRight").val(parseInt(curDom.find('.keyWord').css("padding-right")));
            }else{
                $("#S_sKeyPaddingTop").val(g.sKpt);
                $("#S_sKeyPaddingBottom").val(g.sKpb);
                $("#S_sKeyPaddingLeft").val(g.sKpl);
                $("#S_sKeyPaddingRight").val(g.sKpr);
                $("#S_sKeyPaddingCus").trigger('click');
            }
            // 背景
            if (g.sKbg) {
                $('#S_sKeyBgHide').click();
            } else {
                if (g.sKbgc) {
                    $('#S_sKeyBgColor').val(g.sKbgc);
                    $('#S_sKeyBgImage').val(g.sKbgi);
                    $('#S_sKeyBgPosition').val(g.sKbgp);
                    $('#S_sKeyBgRepeat').val(g.sKbgr);
                    $('#S_sKeyBgCus').click();
                } else {
                    $('#S_sKeyBgAuto').click();
                }
            }
            // 文字样式
            if (g.sKtxtfc) {
                $('#S_sKeyTxtFontColor').val(g.sKtxtfc);
                $('#S_sKeyTxtFontSize').val(g.sKtxtfs);
                $('#S_sKeyTxtFontBold')[0].checked = g.sKtxtfb == '700' ? true : false;
                $('#S_sKeyTxtFontItalic')[0].checked = g.sKtxtfi == 'italic' ? true : false;
                $('#S_sKeyTxtFontUnderline')[0].checked = g.sKtxtfu == 'underline' ? true : false;
                $('#S_sKeyTxtFontFamily').val(g.sKtxtff);
                $('#S_sKeyTxtFontCus').click();
            } else {
                $('#S_sKeyTxtFontAuto').click();
            }
            this.alreadyRun.sKeySet = true;
            return true;
        },
        'sBtnSet' : function(){
            Sset.getAttrRunFun.sBtnSet();
            var g = Sset.getAttrVal.sBtnSet;
            /*****搜索按钮的样式*****/
            // 外边距
            if(isNaN(g.sBtnmt) || isNaN(g.sBtnmb) || isNaN(g.sBtnml) || isNaN(g.sBtnmr)){
                $("#S_sBtnMarginAuto").trigger('click');
                $("#S_sBtnMarginTop").val(parseInt(curDom.find('.keyBtn').css("margin-top")));
                $("#S_sBtnMarginBottom").val(parseInt(curDom.find('.keyBtn').css("margin-bottom")));
                $("#S_sBtnMarginLeft").val(parseInt(curDom.find('.keyBtn').css("margin-left")));
                $("#S_sBtnMarginRight").val(parseInt(curDom.find('.keyBtn').css("margin-right")));
            }else{
                $("#S_sBtnMarginTop").val(g.sBtnmt);
                $("#S_sBtnMarginBottom").val(g.sBtnmb);
                $("#S_sBtnMarginLeft").val(g.sBtnml);
                $("#S_sBtnMarginRight").val(g.sBtnmr);
                $("#S_sBtnMarginCus").trigger('click');
            }
            /****边线****/
            // 上边线
            if (g.sBtnborT) {
                $("#S_sBtnBorderTopHide").trigger('click');
            } else {
                if (g.sBtnborTc) {
                    $('#S_sBtnBorderTopColor').val(g.sBtnborTc);
                    $('#S_sBtnBorderTopStyle').val(g.sBtnborTs);
                    $('#S_sBtnBorderTopWidth').val(g.sBtnborTw);
                    $("#S_sBtnBorderTopCus").trigger('click');
                } else {
                    $("#S_sBtnBorderTopAuto").trigger('click');
                }
            }
            // 下边线
            if (g.sBtnborB) {
                $("#S_sBtnBorderBottomHide").trigger('click');
            } else {
                if (g.sBtnborBc) {
                    $('#S_sBtnBorderBottomColor').val(g.sBtnborBc);
                    $('#S_sBtnBorderBottomStyle').val(g.sBtnborBs);
                    $('#S_sBtnBorderBottomWidth').val(g.sBtnborBw);
                    $("#S_sBtnBorderBottomCus").trigger('click');
                } else {
                    $("#S_sBtnBorderBottomAuto").trigger('click');
                }
            }
            // 左边线
            if (g.sBtnborL) {
                $("#S_sBtnBorderLeftHide").trigger('click');
            } else {
                if (g.sBtnborLc) {
                    $('#S_sBtnBorderLeftColor').val(g.sBtnborLc);
                    $('#S_sBtnBorderLeftStyle').val(g.sBtnborLs);
                    $('#S_sBtnBorderLeftWidth').val(g.sBtnborLw);
                    $("#S_sBtnBorderLeftCus").trigger('click');
                } else {
                    $("#S_sBtnBorderLeftAuto").trigger('click');
                }
            }
            // 右边线
            if (g.sBtnborR) {
                $("#S_sBtnBorderRightHide").trigger('click');
            } else {
                if (g.sBtnborRc) {
                    $('#S_sBtnBorderRightColor').val(g.sBtnborRc);
                    $('#S_sBtnBorderRightStyle').val(g.sBtnborRs);
                    $('#S_sBtnBorderRightWidth').val(g.sBtnborRw);
                    $("#S_sBtnBorderRightCus").trigger('click');
                } else {
                    $("#S_sBtnBorderRightAuto").trigger('click');
                }
            }
            // 宽度
            if (!isNaN(g.sBtnw)) {
                $('#S_sBtnWidth').val(g.sBtnw);
                $('#S_sBtnWidthCus').click();
            } else {
                $('#S_sBtnWidth').val(parseInt(curDom.find('.keyBtn').css("width")));
                $('#S_sBtnWidthAuto').click();
            }
            // 高度
            if (!isNaN(g.sBtnh)) {
                $('#S_sBtnHeight').val(g.sBtnh);
                $('#S_sBtnHeightCus').click();
            } else {
                $('#S_sBtnHeight').val(parseInt(curDom.find('.keyBtn').css("height")));
                $('#S_sBtnHeightAuto').click();
            }
            // 内边距
            if(isNaN(g.sBtnpt) || isNaN(g.sBtnpb) || isNaN(g.sBtnpl) || isNaN(g.sBtnpr)){
                $("#S_sBtnPaddingAuto").trigger('click');
                $("#S_sBtnPaddingTop").val(parseInt(curDom.find('.keyBtn').css("padding-top")));
                $("#S_sBtnPaddingBottom").val(parseInt(curDom.find('.keyBtn').css("padding-bottom")));
                $("#S_sBtnPaddingLeft").val(parseInt(curDom.find('.keyBtn').css("padding-left")));
                $("#S_sBtnPaddingRight").val(parseInt(curDom.find('.keyBtn').css("padding-right")));
            }else{
                $("#S_sBtnPaddingTop").val(g.sBtnpt);
                $("#S_sBtnPaddingBottom").val(g.sBtnpb);
                $("#S_sBtnPaddingLeft").val(g.sBtnpl);
                $("#S_sBtnPaddingRight").val(g.sBtnpr);
                $("#S_sBtnPaddingCus").trigger('click');
            }
            // 背景
            if (g.sBtnbg) {
                $('#S_sBtnBgHide').click();
            } else {
                if (g.sBtnbgc) {
                    $('#S_sBtnBgColor').val(g.sBtnbgc);
                    $('#S_sBtnBgImage').val(g.sBtnbgi);
                    $('#S_sBtnBgPosition').val(g.sBtnbgp);
                    $('#S_sBtnBgRepeat').val(g.sBtnbgr);
                    $('#S_sBtnBgCus').click();
                } else {
                    $('#S_sBtnBgAuto').click();
                }
            }
            // 文字是否显示
            if (g.sBtnBShow) {
                g.sBtnBShow == 'hidden' ? $("#S_sBtnBHide").trigger('click') : $("#S_sBtnBShow").trigger('click');
            } else {
                $("#S_sBtnBDefault").trigger('click');
            }
            // 文字样式
            if (g.sBtntxtfc) {
                $('#S_sBtnTxtFontColor').val(g.sBtntxtfc);
                $('#S_sBtnTxtFontSize').val(g.sBtntxtfs);
                $('#S_sBtnTxtFontBold')[0].checked = g.sBtntxtfb == '700' ? true : false;
                $('#S_sBtnTxtFontItalic')[0].checked = g.sBtntxtfi == 'italic' ? true : false;
                $('#S_sBtnTxtFontUnderline')[0].checked = g.sBtntxtfu == 'underline' ? true : false;
                $('#S_sBtnTxtFontFamily').val(g.sBtntxtff);
                $('#S_sBtnTxtFontCus').click();
            } else {
                $('#S_sBtnTxtFontAuto').click();
            }
            this.alreadyRun.sBtnSet = true;
            return true;
        }
    };
    /*****搜索样式基本设置函数*****/
    Sset.setStyleFun = {
        'alreadyRun' : {
            'skinSelect' : false,
            'skinSet' : false,
            'sKeySet' : false,
            'sBtnSet' : false
        },
        'skinSelect' : function(){},
        'skinSet' : function(){
            /*******外观*********/
            /*--宽度设置开关--*/
            Sset.sInnerWidthToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sInnerWidthAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.search-inner', 'width');
                } else{
                    pf.sAL('S_sInnerWidthAttrlist', 'show');
                    pf.sS(styleDom, curId, '.search-inner', 'width', $("#S_sInnerWidth").val() + 'px');
                }
            };
            // 宽度
            Sset.sInnerWidth = function(obj) {
                var a = pf.numJudge(obj, 320, 30, 800);
                pf.sS(styleDom, curId, '.search-inner', 'width', a + 'px');
            };
            /*--搜索内边距--*/
            Sset.sInnerPaddingToggle = function(a) {
                pf.rS(styleDom, curId, '.search-inner', 'padding-right');
                if (a === 0) {
                    pf.sAL('S_sInnerPaddingAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.search-inner', 'padding-top');
                    pf.rS(styleDom, curId, '.search-inner', 'padding-bottom');
                    pf.rS(styleDom, curId, '.search-inner', 'padding-right');
                    pf.rS(styleDom, curId, '.search-inner', 'padding-left');
                } else {
                    pf.sAL('S_sInnerPaddingAttrlist', 'show');
                    pf.sS(styleDom, curId, '.search-inner', 'padding-top', $('#S_sInnerPaddingTop').val() + "px");
                    pf.sS(styleDom, curId, '.search-inner', 'padding-bottom', $('#S_sInnerPaddingBottom').val() + "px");
                    pf.sS(styleDom, curId, '.search-inner', 'padding-left', $('#S_sInnerPaddingLeft').val() + "px");
                    pf.sS(styleDom, curId, '.search-inner', 'padding-right', $('#S_sInnerPaddingRight').val() + "px");
                }
            };
            // 上内边距
            Sset.sInnerPaddingTop = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.search-inner', 'padding-top', a + "px");
            };
            // 下内边距
            Sset.sInnerPaddingBottom = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.search-inner', 'padding-bottom', a + "px");
            };
            // 左内边距
            Sset.sInnerPaddingLeft = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.search-inner', 'padding-left', a + "px");
            };
            // 右内边距
            Sset.sInnerPaddingRight = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.search-inner', 'padding-right', a + "px");
            };
            /*--背景设置--*/
            Sset.sInnerBgToggle = function(a) {
                if (a == 0 || a == 1) {
                    pf.sAL('S_sInnerBgAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.search-inner', 'background-color');
                    pf.rS(styleDom, curId, '.search-inner', 'background-image');
                    pf.rS(styleDom, curId, '.search-inner', 'background-position');
                    pf.rS(styleDom, curId, '.search-inner', 'background-repeat');
                    a == 0 ? pf.rS(styleDom, curId, '.search-inner', 'background') : pf.sS(styleDom, curId, '.search-inner', 'background', 'none');
                } else if (a == 2) {
                    pf.sAL('S_sInnerBgAttrlist', 'show');
                    pf.rS(styleDom, curId, '.search-inner', 'background');
                    pf.sS(styleDom, curId, '.search-inner', 'background-color', $('#S_sInnerBgColor').val());
                    var bgimg = $('#S_sInnerBgImage').val();
                    if (bgimg == 'none') {
                        $('#S_sInnerBgImageLook,#S_sInnerBgImageNone').css({
                            'display': 'none'
                        });
                    } else {
                        $('#S_sInnerBgImageLook').attr('href', bgimg)
                        $('#S_sInnerBgImageLook,#S_sInnerBgImageNone').css({
                            'display': 'inline-block'
                        });
                        bgimg = 'url(' + bgimg + ')';
                    }
                    pf.sS(styleDom, curId, '.search-inner', 'background-image', bgimg);
                    pf.sS(styleDom, curId, '.search-inner', 'background-position', $('#S_sInnerBgPosition').val());
                    pf.sS(styleDom, curId, '.search-inner', 'background-repeat', $('#S_sInnerBgRepeat').val());
                }
            };
            // 背景颜色
            Sset.sInnerBgColor = function(a) {
                pf.sS(styleDom, curId, '.search-inner', 'background-color', a);
            };
            Sset.sInnerNoBgColor = function() {
                pf.sS(styleDom, curId, '.search-inner', 'background-color', "transparent");
            };
            // 背景图片
            Sset.sInnerBgImage = function(a) {
                var bgimg = 'none';
                if (a == 'none') {
                    $('#S_sInnerBgImageLook,#S_sInnerBgImageNone').css({
                        'display': 'none'
                    });
                } else {
                    $('#S_sInnerBgImageLook').attr('href', a);
                    $('#S_sInnerBgImageLook,#S_sInnerBgImageNone').css({
                        'display': 'inline-block'
                    })
                    bgimg = 'url(' + a + ')';
                }
                pf.sS(styleDom, curId, '.search-inner', 'background-image', bgimg);
            };
            // 背景位置
            Sset.sInnerBgPosition = function(a) {
                pf.sS(styleDom, curId, '.search-inner', 'background-position', a);
            };
            // 背景状态
            Sset.sInnerBgRepeat = function(a) {
                pf.sS(styleDom, curId, '.search-inner', 'background-repeat', a);
            };
            //确定设置函数
            Sset.skinSetEnter = function() {
                pf.Pwin.$.popupClose(iframeNumber);
                return false;
            };
            //恢复默认
            Sset.skinSetReset = function() {
                $('#S_sInnerWidthAuto,#S_sInnerPaddingAuto,#S_sInnerBgAuto').trigger('click');
            }
            this.alreadyRun.skinSet = true;
            return this.alreadyRun.skinSet;
        },
        'sKeySet' : function(){
            /*******输入框*********/
            /*--内边距--*/
            Sset.sKeyMarginToggle = function(a) {
                pf.rS(styleDom, curId, '.keyWord', 'margin-right');
                if (a === 0) {
                    pf.sAL('S_sKeyMarginAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'margin-top');
                    pf.rS(styleDom, curId, '.keyWord', 'margin-bottom');
                    pf.rS(styleDom, curId, '.keyWord', 'margin-right');
                    pf.rS(styleDom, curId, '.keyWord', 'margin-left');
                } else {
                    pf.sAL('S_sKeyMarginAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyWord', 'margin-top', $('#S_sKeyMarginTop').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'margin-bottom', $('#S_sKeyMarginBottom').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'margin-left', $('#S_sKeyMarginLeft').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'margin-right', $('#S_sKeyMarginRight').val() + "px");
                }
            };
            // 上内边距
            Sset.sKeyMarginTop = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyWord', 'margin-top', a + "px");
            };
            // 下内边距
            Sset.sKeyMarginBottom = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyWord', 'margin-bottom', a + "px");
            };
            // 左内边距
            Sset.sKeyMarginLeft = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyWord', 'margin-left', a + "px");
            };
            // 右内边距
            Sset.sKeyMarginRight = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyWord', 'margin-right', a + "px");
            };
            /*上边线*/
            // 开关
            Sset.sKeyBorderTopToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sKeyBorderTopAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'border-top-width');
                    pf.rS(styleDom, curId, '.keyWord', 'border-top-style');
                    pf.rS(styleDom, curId, '.keyWord', 'border-top-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyWord', 'border-top') : pf.sS(styleDom, curId, '.keyWord', 'border-top', "none");
                } else {
                    pf.sAL('S_sKeyBorderTopAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyWord', 'border-top');
                    pf.sS(styleDom, curId, '.keyWord', 'border-top-color', $('#S_sKeyBorderTopColor').val());
                    pf.sS(styleDom, curId, '.keyWord', 'border-top-width', $('#S_sKeyBorderTopWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'border-top-style', $('#S_sKeyBorderTopStyle').val());
                }
            };
            // 颜色
            Sset.sKeyBorderTopColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-top-color', a);
            };
            // 宽度
            Sset.sKeyBorderTopWidth = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-top-width', a + "px");
            };
            // 样式
            Sset.sKeyBorderTopStyle = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-top-style', a);
            };
            /*下边线*/
            // 开关
            Sset.sKeyBorderBottomToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sKeyBorderBottomAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'border-bottom-width');
                    pf.rS(styleDom, curId, '.keyWord', 'border-bottom-style');
                    pf.rS(styleDom, curId, '.keyWord', 'border-bottom-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyWord', 'border-bottom') : pf.sS(styleDom, curId, '.keyWord', 'border-bottom', "none");
                } else {
                    pf.sAL('S_sKeyBorderBottomAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyWord', 'border-bottom');
                    pf.sS(styleDom, curId, '.keyWord', 'border-bottom-color', $('#S_sKeyBorderBottomColor').val());
                    pf.sS(styleDom, curId, '.keyWord', 'border-bottom-width', $('#S_sKeyBorderBottomWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'border-bottom-style', $('#S_sKeyBorderBottostyleDom').val());
                }
            };
            // 颜色
            Sset.sKeyBorderBottomColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-bottom-color', a);
            };
            // 宽度
            Sset.sKeyBorderBottomWidth = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-bottom-width', a + "px");
            };
            // 样式
            Sset.sKeyBorderBottomStyle = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-bottom-style', a);
            };
            /*左边线*/
            // 开关
            Sset.sKeyBorderLeftToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sKeyBorderLeftAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'border-left-width');
                    pf.rS(styleDom, curId, '.keyWord', 'border-left-style');
                    pf.rS(styleDom, curId, '.keyWord', 'border-left-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyWord', 'border-left') : pf.sS(styleDom, curId, '.keyWord', 'border-left', "none");
                } else {
                    pf.sAL('S_sKeyBorderLeftAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyWord', 'border-left');
                    pf.sS(styleDom, curId, '.keyWord', 'border-left-color', $('#S_sKeyBorderLeftColor').val());
                    pf.sS(styleDom, curId, '.keyWord', 'border-left-width', $('#S_sKeyBorderLeftWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'border-left-style', $('#S_sKeyBorderLeftStyle').val());
                }
            };
            // 颜色
            Sset.sKeyBorderLeftColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-left-color', a);
            };
            // 宽度
            Sset.sKeyBorderLeftWidth = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-left-width', a + "px");
            };
            // 样式
            Sset.sKeyBorderLeftStyle = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-left-style', a);
            };
            /*右边线*/
            // 开关
            Sset.sKeyBorderRightToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sKeyBorderRightAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'border-right-width');
                    pf.rS(styleDom, curId, '.keyWord', 'border-right-style');
                    pf.rS(styleDom, curId, '.keyWord', 'border-right-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyWord', 'border-right') : pf.sS(styleDom, curId, '.keyWord', 'border-right', "none");
                } else {
                    pf.sAL('S_sKeyBorderRightAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyWord', 'border-right');
                    pf.sS(styleDom, curId, '.keyWord', 'border-right-color', $('#S_sKeyBorderRightColor').val());
                    pf.sS(styleDom, curId, '.keyWord', 'border-right-width', $('#S_sKeyBorderRightWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'border-right-style', $('#S_sKeyBorderRightStyle').val());
                }
            };
            // 颜色
            Sset.sKeyBorderRightColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-right-color', a);
            };
            // 宽度
            Sset.sKeyBorderRightWidth = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-right-width', a + "px");
            };
            // 样式
            Sset.sKeyBorderRightStyle = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'border-right-style', a);
            };
            /*--宽度设置开关--*/
            Sset.sKeyWidthToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sKeyWidthAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord .input', 'width');
                } else{
                    pf.sAL('S_sKeyWidthAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyWord .input', 'width', $("#S_sKeyWidth").val() + 'px');
                }
            };
            // 宽度
            Sset.sKeyWidth = function(obj) {
                var a = pf.numJudge(obj, 238, 10, 800);
                pf.sS(styleDom, curId, '.keyWord .input', 'width', a + 'px');
            };
            /*--高度设置开关--*/
            Sset.sKeyHeightToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sKeyHeightAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord .input', 'height');
                    pf.rS(styleDom, curId, '.keyWord .input', 'line-height');
                } else{
                    pf.sAL('S_sKeyHeightAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyWord .input', 'height', $("#S_sKeyHeight").val() + 'px');
                    pf.sS(styleDom, curId, '.keyWord .input', 'line-height', $("#S_sKeyHeight").val() + 'px');
                }
            };
            // 高度
            Sset.sKeyHeight = function(obj) {
                var a = pf.numJudge(obj, 28, 10, 100);
                pf.sS(styleDom, curId, '.keyWord .input', 'height', a + 'px');
                pf.sS(styleDom, curId, '.keyWord .input', 'line-height', a + 'px');
            };
            /*--内边距--*/
            Sset.sKeyPaddingToggle = function(a) {
                pf.rS(styleDom, curId, '.keyWord', 'padding-right');
                if (a === 0) {
                    pf.sAL('S_sKeyPaddingAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'padding-top');
                    pf.rS(styleDom, curId, '.keyWord', 'padding-bottom');
                    pf.rS(styleDom, curId, '.keyWord', 'padding-right');
                    pf.rS(styleDom, curId, '.keyWord', 'padding-left');
                } else {
                    pf.sAL('S_sKeyPaddingAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyWord', 'padding-top', $('#S_sKeyPaddingTop').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'padding-bottom', $('#S_sKeyPaddingBottom').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'padding-left', $('#S_sKeyPaddingLeft').val() + "px");
                    pf.sS(styleDom, curId, '.keyWord', 'padding-right', $('#S_sKeyPaddingRight').val() + "px");
                }
            };
            // 上内边距
            Sset.sKeyPaddingTop = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyWord', 'padding-top', a + "px");
            };
            // 下内边距
            Sset.sKeyPaddingBottom = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyWord', 'padding-bottom', a + "px");
            };
            // 左内边距
            Sset.sKeyPaddingLeft = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyWord', 'padding-left', a + "px");
            };
            // 右内边距
            Sset.sKeyPaddingRight = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyWord', 'padding-right', a + "px");
            };
            /*--背景设置--*/
            Sset.sKeyBgToggle = function(a) {
                if (a == 0 || a == 1) {
                    pf.sAL('S_sKeyBgAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord', 'background-color');
                    pf.rS(styleDom, curId, '.keyWord', 'background-image');
                    pf.rS(styleDom, curId, '.keyWord', 'background-position');
                    pf.rS(styleDom, curId, '.keyWord', 'background-repeat');
                    a == 0 ? pf.rS(styleDom, curId, '.keyWord', 'background') : pf.sS(styleDom, curId, '.keyWord', 'background', 'none');
                } else if (a == 2) {
                    pf.sAL('S_sKeyBgAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyWord', 'background');
                    pf.sS(styleDom, curId, '.keyWord', 'background-color', $('#S_sKeyBgColor').val());
                    var bgimg = $('#S_sKeyBgImage').val();
                    if (bgimg == 'none') {
                        $('#S_sKeyBgImageLook,#S_sKeyBgImageNone').css({
                            'display': 'none'
                        });
                    } else {
                        $('#S_sKeyBgImageLook').attr('href', bgimg)
                        $('#S_sKeyBgImageLook,#S_sKeyBgImageNone').css({
                            'display': 'inline-block'
                        });
                        bgimg = 'url(' + bgimg + ')';
                    }
                    pf.sS(styleDom, curId, '.keyWord', 'background-image', bgimg);
                    pf.sS(styleDom, curId, '.keyWord', 'background-position', $('#S_sKeyBgPosition').val());
                    pf.sS(styleDom, curId, '.keyWord', 'background-repeat', $('#S_sKeyBgRepeat').val());
                }
            };
            // 背景颜色
            Sset.sKeyBgColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'background-color', a);
            };
            Sset.sKeyNoBgColor = function() {
                pf.sS(styleDom, curId, '.keyWord', 'background-color', "transparent");
            };
            // 背景图片
            Sset.sKeyBgImage = function(a) {
                var bgimg = 'none';
                if (a == 'none') {
                    $('#S_sKeyBgImageLook,#S_sKeyBgImageNone').css({
                        'display': 'none'
                    });
                } else {
                    $('#S_sKeyBgImageLook').attr('href', a);
                    $('#S_sKeyBgImageLook,#S_sKeyBgImageNone').css({
                        'display': 'inline-block'
                    })
                    bgimg = 'url(' + a + ')';
                }
                pf.sS(styleDom, curId, '.keyWord', 'background-image', bgimg);
            };
            // 背景位置
            Sset.sKeyBgPosition = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'background-position', a);
            };
            // 背景状态
            Sset.sKeyBgRepeat = function(a) {
                pf.sS(styleDom, curId, '.keyWord', 'background-repeat', a);
            };
            /****--搜索输入框文字开关--***/
            Sset.sKeyTxtFontToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sKeyTxtFontAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyWord .input', 'color');
                    pf.rS(styleDom, curId, '.keyWord .input', 'font-size');
                    pf.rS(styleDom, curId, '.keyWord .input', 'font-weight');
                    pf.rS(styleDom, curId, '.keyWord .input', 'font-style');
                    pf.rS(styleDom, curId, '.keyWord .input', 'text-decoration');
                    pf.rS(styleDom, curId, '.keyWord .input', 'font-family');
                } else if (a == 2) {
                    pf.sAL('S_sKeyTxtFontAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyWord .input', 'color', $('#S_sKeyTxtFontColor').val());
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-size', $('#S_sKeyTxtFontSize').val() + "px");
                    var b = $('#S_sKeyTxtFontBold')[0].checked ? 700 : 400;
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-weight', b);
                    var i = $('#S_sKeyTxtFontItalic')[0].checked ? 'italic' : 'normal';
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-style', i);
                    var u = $('#S_sKeyTxtFontUnderline')[0].checked ? 'underline' : 'none';
                    pf.sS(styleDom, curId, '.keyWord .input', 'text-decoration', u);
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-family', $('#S_sKeyTxtFontFamily').val());
                }
            };
            // 文字颜色
            Sset.sKeyTxtFontColor = function(a) {
                pf.sS(styleDom, curId, '.keyWord .input', 'color', a);
            };
            // 文字大小
            Sset.sKeyTxtFontSize = function(a) {
                pf.sS(styleDom, curId, '.keyWord .input', 'font-size', a + "px");
            };
            // 文字加粗
            Sset.sKeyTxtFontBold = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-weight', '700');
                } else {
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-weight', '400');
                }
            };
            // 文字斜体
            Sset.sKeyTxtFontItalic = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-style', 'italic');
                } else {
                    pf.sS(styleDom, curId, '.keyWord .input', 'font-style', 'normal');
                }
            };
            // 文字下划线
            Sset.sKeyTxtFontUnderline = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyWord .input', 'text-decoration', 'underline');
                } else {
                    pf.sS(styleDom, curId, '.keyWord .input', 'text-decoration', 'none');
                }
            };
            // 文字字体
            Sset.sKeyTxtFontFamily = function(a) {
                pf.sS(styleDom, curId, '.keyWord .input', 'font-family', a);
            };
            //确定设置函数
            Sset.sKeySetEnter = function() {
                pf.Pwin.$.popupClose(iframeNumber);
                return false;
            };
            //恢复默认
            Sset.sKeySetReset = function() {
                $('#S_sKeyMarginAuto,#S_sKeyBorderTopAuto,#S_sKeyBorderBottomAuto,#S_sKeyBorderLeftAuto,#S_sKeyBorderRightAuto,#S_sKeyHeightAuto,#S_sKeyWidthAuto,#S_sKeyPaddingAuto,#S_sKeyBgAuto,#S_sKeyTxtFontAuto').trigger('click');
            }
            this.alreadyRun.sKeySet = true;
            return this.alreadyRun.sKeySet;
        },
        'sBtnSet' : function(){
            /*******按钮*********/
            /**边线设置**/
            /*--外间距--*/
            Sset.sBtnMarginToggle = function(a) {
                pf.rS(styleDom, curId, '.keyBtn', 'margin-right');
                if (a === 0) {
                    pf.sAL('S_sBtnMarginAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'margin-top');
                    pf.rS(styleDom, curId, '.keyBtn', 'margin-bottom');
                    pf.rS(styleDom, curId, '.keyBtn', 'margin-right');
                    pf.rS(styleDom, curId, '.keyBtn', 'margin-left');
                } else {
                    pf.sAL('S_sBtnMarginAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyBtn', 'margin-top', $('#S_sBtnMarginTop').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'margin-bottom', $('#S_sBtnMarginBottom').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'margin-left', $('#S_sBtnMarginLeft').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'margin-right', $('#S_sBtnMarginRight').val() + "px");
                }
            };
            // 上边距
            Sset.sBtnMarginTop = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyBtn', 'margin-top', a + "px");
            };
            // 下边距
            Sset.sBtnMarginBottom = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyBtn', 'margin-bottom', a + "px");
            };
            // 左边距
            Sset.sBtnMarginLeft = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyBtn', 'margin-left', a + "px");
            };
            // 右边距
            Sset.sBtnMarginRight = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyBtn', 'margin-right', a + "px");
            };
            /*上边线*/
            // 开关
            Sset.sBtnBorderTopToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sBtnBorderTopAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-top-width');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-top-style');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-top-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyBtn', 'border-top') : pf.sS(styleDom, curId, '.keyBtn', 'border-top', "none");
                } else {
                    pf.sAL('S_sBtnBorderTopAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-top');
                    pf.sS(styleDom, curId, '.keyBtn', 'border-top-color', $('#S_sBtnBorderTopColor').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'border-top-width', $('#S_sBtnBorderTopWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'border-top-style', $('#S_sBtnBorderTopStyle').val());
                }
            };
            // 颜色
            Sset.sBtnBorderTopColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-top-color', a);
            };
            // 宽度
            Sset.sBtnBorderTopWidth = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-top-width', a + "px");
            };
            // 样式
            Sset.sBtnBorderTopStyle = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-top-style', a);
            };
            /*下边线*/
            // 开关
            Sset.sBtnBorderBottomToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sBtnBorderBottomAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-bottom-width');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-bottom-style');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-bottom-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyBtn', 'border-bottom') : pf.sS(styleDom, curId, '.keyBtn', 'border-bottom', "none");
                } else {
                    pf.sAL('S_sBtnBorderBottomAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-bottom');
                    pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-color', $('#S_sBtnBorderBottomColor').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-width', $('#S_sBtnBorderBottomWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-style', $('#S_sBtnBorderBottostyleDom').val());
                }
            };
            // 颜色
            Sset.sBtnBorderBottomColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-color', a);
            };
            // 宽度
            Sset.sBtnBorderBottomWidth = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-width', a + "px");
            };
            // 样式
            Sset.sBtnBorderBottomStyle = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-bottom-style', a);
            };
            /*左边线*/
            // 开关
            Sset.sBtnBorderLeftToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sBtnBorderLeftAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-left-width');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-left-style');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-left-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyBtn', 'border-left') : pf.sS(styleDom, curId, '.keyBtn', 'border-left', "none");
                } else {
                    pf.sAL('S_sBtnBorderLeftAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-left');
                    pf.sS(styleDom, curId, '.keyBtn', 'border-left-color', $('#S_sBtnBorderLeftColor').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'border-left-width', $('#S_sBtnBorderLeftWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'border-left-style', $('#S_sBtnBorderLeftStyle').val());
                }
            };
            // 颜色
            Sset.sBtnBorderLeftColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-left-color', a);
            };
            // 宽度
            Sset.sBtnBorderLeftWidth = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-left-width', a + "px");
            };
            // 样式
            Sset.sBtnBorderLeftStyle = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-left-style', a);
            };
            /*右边线*/
            // 开关
            Sset.sBtnBorderRightToggle = function(a) {
                if (a === 0 || a === 1) {
                    pf.sAL('S_sBtnBorderRightAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-right-width');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-right-style');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-right-color');
                    a === 0 ? pf.rS(styleDom, curId, '.keyBtn', 'border-right') : pf.sS(styleDom, curId, '.keyBtn', 'border-right', "none");
                } else {
                    pf.sAL('S_sBtnBorderRightAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyBtn', 'border-right');
                    pf.sS(styleDom, curId, '.keyBtn', 'border-right-color', $('#S_sBtnBorderRightColor').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'border-right-width', $('#S_sBtnBorderRightWidth').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'border-right-style', $('#S_sBtnBorderRightStyle').val());
                }
            };
            // 颜色
            Sset.sBtnBorderRightColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-right-color', a);
            };
            // 宽度
            Sset.sBtnBorderRightWidth = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-right-width', a + "px");
            };
            // 样式
            Sset.sBtnBorderRightStyle = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'border-right-style', a);
            };
            /*--宽度设置开关--*/
            Sset.sBtnWidthToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sBtnWidthAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'width');
                } else{
                    pf.sAL('S_sBtnWidthAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyBtn', 'width', $("#S_sBtnWidth").val() + 'px');
                }
            };
            // 宽度
            Sset.sBtnWidth = function(obj) {
                var a = pf.numJudge(obj, 238, 10, 800);
                pf.sS(styleDom, curId, '.keyBtn', 'width', a + 'px');
            };
            /*--高度设置开关--*/
            Sset.sBtnHeightToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sBtnHeightAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'height');
                    pf.rS(styleDom, curId, '.keyBtn', 'line-height');
                } else{
                    pf.sAL('S_sBtnHeightAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyBtn', 'height', $("#S_sBtnHeight").val() + 'px');
                    pf.sS(styleDom, curId, '.keyBtn', 'line-height', $("#S_sBtnHeight").val() + 'px');
                }
            };
            // 高度
            Sset.sBtnHeight = function(obj) {
                var a = pf.numJudge(obj, 28, 10, 100);
                pf.sS(styleDom, curId, '.keyBtn', 'height', a + 'px');
                pf.sS(styleDom, curId, '.keyBtn', 'line-height', a + 'px');
            };
            /*--内边距--*/
            Sset.sBtnPaddingToggle = function(a) {
                pf.rS(styleDom, curId, '.keyBtn', 'padding-right');
                if (a === 0) {
                    pf.sAL('S_sBtnPaddingAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'padding-top');
                    pf.rS(styleDom, curId, '.keyBtn', 'padding-bottom');
                    pf.rS(styleDom, curId, '.keyBtn', 'padding-right');
                    pf.rS(styleDom, curId, '.keyBtn', 'padding-left');
                } else {
                    pf.sAL('S_sBtnPaddingAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyBtn', 'padding-top', $('#S_sBtnPaddingTop').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'padding-bottom', $('#S_sBtnPaddingBottom').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'padding-left', $('#S_sBtnPaddingLeft').val() + "px");
                    pf.sS(styleDom, curId, '.keyBtn', 'padding-right', $('#S_sBtnPaddingRight').val() + "px");
                }
            };
            // 上内边距
            Sset.sBtnPaddingTop = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyBtn', 'padding-top', a + "px");
            };
            // 下内边距
            Sset.sBtnPaddingBottom = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 100);
                pf.sS(styleDom, curId, '.keyBtn', 'padding-bottom', a + "px");
            };
            // 左内边距
            Sset.sBtnPaddingLeft = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyBtn', 'padding-left', a + "px");
            };
            // 右内边距
            Sset.sBtnPaddingRight = function(obj) {
                var a = pf.numJudge(obj, 0, 0, 300);
                pf.sS(styleDom, curId, '.keyBtn', 'padding-right', a + "px");
            };
            /*--背景设置--*/
            Sset.sBtnBgToggle = function(a) {
                if (a == 0 || a == 1) {
                    pf.sAL('S_sBtnBgAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'background-color');
                    pf.rS(styleDom, curId, '.keyBtn', 'background-image');
                    pf.rS(styleDom, curId, '.keyBtn', 'background-position');
                    pf.rS(styleDom, curId, '.keyBtn', 'background-repeat');
                    a == 0 ? pf.rS(styleDom, curId, '.keyBtn', 'background') : pf.sS(styleDom, curId, '.keyBtn', 'background', 'none');
                } else if (a == 2) {
                    pf.sAL('S_sBtnBgAttrlist', 'show');
                    pf.rS(styleDom, curId, '.keyBtn', 'background');
                    pf.sS(styleDom, curId, '.keyBtn', 'background-color', $('#S_sBtnBgColor').val());
                    var bgimg = $('#S_sBtnBgImage').val();
                    if (bgimg == 'none') {
                        $('#S_sBtnBgImageLook,#S_sBtnBgImageNone').css({
                            'display': 'none'
                        });
                    } else {
                        $('#S_sBtnBgImageLook').attr('href', bgimg)
                        $('#S_sBtnBgImageLook,#S_sBtnBgImageNone').css({
                            'display': 'inline-block'
                        });
                        bgimg = 'url(' + bgimg + ')';
                    }
                    pf.sS(styleDom, curId, '.keyBtn', 'background-image', bgimg);
                    pf.sS(styleDom, curId, '.keyBtn', 'background-position', $('#S_sBtnBgPosition').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'background-repeat', $('#S_sBtnBgRepeat').val());
                }
            };
            // 背景颜色
            Sset.sBtnBgColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'background-color', a);
            };
            Sset.sBtnNoBgColor = function() {
                pf.sS(styleDom, curId, '.keyBtn', 'background-color', "transparent");
            };
            // 背景图片
            Sset.sBtnBgImage = function(a) {
                var bgimg = 'none';
                if (a == 'none') {
                    $('#S_sBtnBgImageLook,#S_sBtnBgImageNone').css({
                        'display': 'none'
                    });
                } else {
                    $('#S_sBtnBgImageLook').attr('href', a);
                    $('#S_sBtnBgImageLook,#S_sBtnBgImageNone').css({
                        'display': 'inline-block'
                    })
                    bgimg = 'url(' + a + ')';
                }
                pf.sS(styleDom, curId, '.keyBtn', 'background-image', bgimg);
            };
            // 背景位置
            Sset.sBtnBgPosition = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'background-position', a);
            };
            // 背景状态
            Sset.sBtnBgRepeat = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'background-repeat', a);
            };
            /*--更多显示隐藏--*/
            Sset.sBtnBShowToggle = function(a) {
                if (a == 0) {
                    pf.rS(styleDom, curId, '.keyBtn .btxt', 'visibility');
                } else if (a == 1) {
                    pf.sS(styleDom, curId, '.keyBtn .btxt', 'visibility', 'hidden');
                } else if (a == 2) {
                    pf.sS(styleDom, curId, '.keyBtn .btxt', 'visibility', 'visible');
                }
            };
            /****--文字开关--***/
            Sset.sBtnTxtFontToggle = function(a) {
                if (a == 0) {
                    pf.sAL('S_sBtnTxtFontAttrlist', 'hide');
                    pf.rS(styleDom, curId, '.keyBtn', 'color');
                    pf.rS(styleDom, curId, '.keyBtn', 'font-size');
                    pf.rS(styleDom, curId, '.keyBtn', 'font-weight');
                    pf.rS(styleDom, curId, '.keyBtn', 'font-style');
                    pf.rS(styleDom, curId, '.keyBtn', 'text-decoration');
                    pf.rS(styleDom, curId, '.keyBtn', 'font-family');
                } else if (a == 2) {
                    pf.sAL('S_sBtnTxtFontAttrlist', 'show');
                    pf.sS(styleDom, curId, '.keyBtn', 'color', $('#S_sBtnTxtFontColor').val());
                    pf.sS(styleDom, curId, '.keyBtn', 'font-size', $('#S_sBtnTxtFontSize').val() + "px");
                    var b = $('#S_sBtnTxtFontBold')[0].checked ? 700 : 400;
                    pf.sS(styleDom, curId, '.keyBtn', 'font-weight', b);
                    var i = $('#S_sBtnTxtFontItalic')[0].checked ? 'italic' : 'normal';
                    pf.sS(styleDom, curId, '.keyBtn', 'font-style', i);
                    var u = $('#S_sBtnTxtFontUnderline')[0].checked ? 'underline' : 'none';
                    pf.sS(styleDom, curId, '.keyBtn', 'text-decoration', u);
                    pf.sS(styleDom, curId, '.keyBtn', 'font-family', $('#S_sBtnTxtFontFamily').val());
                }
            };
            // 文字颜色
            Sset.sBtnTxtFontColor = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'color', a);
            };
            // 文字大小
            Sset.sBtnTxtFontSize = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'font-size', a + "px");
            };
            // 文字加粗
            Sset.sBtnTxtFontBold = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyBtn', 'font-weight', '700');
                } else {
                    pf.sS(styleDom, curId, '.keyBtn', 'font-weight', '400');
                }
            };
            // 文字斜体
            Sset.sBtnTxtFontItalic = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyBtn', 'font-style', 'italic');
                } else {
                    pf.sS(styleDom, curId, '.keyBtn', 'font-style', 'normal');
                }
            };
            // 文字下划线
            Sset.sBtnTxtFontUnderline = function(a) {
                if ($(a).attr("checked")) {
                    pf.sS(styleDom, curId, '.keyBtn', 'text-decoration', 'underline');
                } else {
                    pf.sS(styleDom, curId, '.keyBtn', 'text-decoration', 'none');
                }
            };
            // 文字字体
            Sset.sBtnTxtFontFamily = function(a) {
                pf.sS(styleDom, curId, '.keyBtn', 'font-family', a);
            };
            //确定设置函数
            Sset.sBtnSetEnter = function() {
                pf.Pwin.$.popupClose(iframeNumber);
                return false;
            };
            //恢复默认
            Sset.sBtnSetReset = function() {
                $('#S_sBtnMarginAuto,#S_sBtnBorderTopAuto,#S_sBtnBorderBottomAuto,#S_sBtnBorderLeftAuto,#S_sBtnBorderRightAuto,#S_sBtnHeightAuto,#S_sBtnWidthAuto,#S_sBtnPaddingAuto,#S_sBtnBgAuto,#S_sBtnBDefault,#S_sBtnTxtFontAuto').trigger('click');
            }
            this.alreadyRun.sBtnSet = true;
            return this.alreadyRun.sBtnSet;
        }
    };
}