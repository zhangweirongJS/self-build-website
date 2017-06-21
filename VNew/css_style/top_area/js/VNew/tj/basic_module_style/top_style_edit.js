/* https://www.ev123.net
 author:qwguo;
 author:自定义顶部样式;
 Date:2013;
 changeDate:2015/04/27
 */
var curId = pf.Pwin.Ev.admin.tj.v.curEditObjId,
    curDom = pf.Pwin.Ev.admin.tj.v.curEditObj,
    styleDom = 'Tstyle';
if (curId) {
    // 页面加载完执行函数
    $(function() {
        // 给tab标题绑定单击事件执行函数
        $("#alert_tab_t").on({
            click : function(){
                var that = $(this),
                    tId = that.data("id"),
                    cDom = $("#" + tId);
                that.addClass('cur').siblings().removeClass('cur');
                if(!Tset.getAttrSetFun.alreadyRun[tId]){
                    Tset.showLoading();
                    if(Tset.getAttrSetFun[tId]()){
                        pf.fncolor(cDom);
                        pf.eleChange([curDom]);
                        cDom.find("input[name=opacityObj]").changeOpacity();
                        Tset.hideLoading();
                        cDom.css('display','block').siblings().css('display','none');
                    }
                }else{
                    cDom.css('display','block').siblings().css('display','none');
                }
            }
        },"li");
        // 给第一个tab一个单击事件
        $("#exterior_tab").trigger('click');
        // 移除弹窗的loading动画层
        $("iframe[name='" + window.name + "']", window.parent.document).parents("div.evPopupBodyCC").find("div.loadingWait").remove();
    });
    var Tset = {};
    Tset.showLoading = function() {
        $("#tabc_loading").show();
    };
    Tset.hideLoading = function() {
        $("#tabc_loading").hide();
    };
    // 定义回显的存放对象，用来存放得到的设置值
    Tset.getAttrVal = {};
    // 得到回显值的执行函数
    Tset.getAttrRunFun = {
        'exterior' : function(){
            Tset.getAttrVal.exterior = {
                bg: pf.gS(styleDom, curId, '.topBg', 'background'),
                bgc: pf.gS(styleDom, curId, '.topBg', 'background-color'),
                bgi: pf.gS(styleDom, curId, '.topBg', 'background-image'),
                bgp: pf.gS(styleDom, curId, '.topBg', 'background-position'),
                bgr: pf.gS(styleDom, curId, '.topBg', 'background-repeat'),
                op: pf.gS(styleDom, curId, '.topBg', 'opacity'),
                full: pf.gS(styleDom, curId, '', 'width'),
                bort: pf.gS(styleDom, curId, '', 'border-top'),
                bortc: pf.gS(styleDom, curId, '', 'border-top-color'),
                borts: pf.gS(styleDom, curId, '', 'border-top-style'),
                bortw: parseInt(pf.gS(styleDom, curId, '', 'border-top-width')),
                borb: pf.gS(styleDom, curId, '', 'border-bottom'),
                borbc: pf.gS(styleDom, curId, '', 'border-bottom-color'),
                borbs: pf.gS(styleDom, curId, '', 'border-bottom-style'),
                borbw: parseInt(pf.gS(styleDom, curId, '', 'border-bottom-width')),
                borl: pf.gS(styleDom, curId, '', 'border-left'),
                borlc: pf.gS(styleDom, curId, '', 'border-left-color'),
                borls: pf.gS(styleDom, curId, '', 'border-left-style'),
                borlw: parseInt(pf.gS(styleDom, curId, '', 'border-left-width')),
                borr: pf.gS(styleDom, curId, '', 'border-right'),
                borrc: pf.gS(styleDom, curId, '', 'border-right-color'),
                borrs: pf.gS(styleDom, curId, '', 'border-right-style'),
                borrw: parseInt(pf.gS(styleDom, curId, '', 'border-right-width')),
                mt: parseInt(pf.gS(styleDom, curId, '', 'margin-top')),
                mb: parseInt(pf.gS(styleDom, curId, '', 'margin-bottom'))
            };
        },
        'interior' : function(){
            Tset.getAttrVal.interior = {
                bg: pf.gS(styleDom, curId, '.topBar', 'background'),
                bgc: pf.gS(styleDom, curId, '.topBar', 'background-color'),
                bgi: pf.gS(styleDom, curId, '.topBar', 'background-image'),
                bgp: pf.gS(styleDom, curId, '.topBar', 'background-position'),
                bgr: pf.gS(styleDom, curId, '.topBar', 'background-repeat'),
                bort: pf.gS(styleDom, curId, '.topBar', 'border-top'),
                bortc: pf.gS(styleDom, curId, '.topBar', 'border-top-color'),
                borts: pf.gS(styleDom, curId, '.topBar', 'border-top-style'),
                bortw: parseInt(pf.gS(styleDom, curId, '.topBar', 'border-top-width')),
                borb: pf.gS(styleDom, curId, '.topBar', 'border-bottom'),
                borbc: pf.gS(styleDom, curId, '.topBar', 'border-bottom-color'),
                borbs: pf.gS(styleDom, curId, '.topBar', 'border-bottom-style'),
                borbw: parseInt(pf.gS(styleDom, curId, '.topBar', 'border-bottom-width')),
                borl: pf.gS(styleDom, curId, '.topBar', 'border-left'),
                borlc: pf.gS(styleDom, curId, '.topBar', 'border-left-color'),
                borls: pf.gS(styleDom, curId, '.topBar', 'border-left-style'),
                borlw: parseInt(pf.gS(styleDom, curId, '.topBar', 'border-left-width')),
                borr: pf.gS(styleDom, curId, '.topBar', 'border-right'),
                borrc: pf.gS(styleDom, curId, '.topBar', 'border-right-color'),
                borrs: pf.gS(styleDom, curId, '.topBar', 'border-right-style'),
                borrw: parseInt(pf.gS(styleDom, curId, '.topBar', 'border-right-width')),
                h: parseInt(pf.gS(styleDom, curId, '.topBar', 'height')),
                linh: parseInt(pf.gS(styleDom, curId, '.topBar', 'line-height')),
                cpt: parseInt(pf.gS(styleDom, curId, '.topBar', 'padding-top')),
                cpr: parseInt(pf.gS(styleDom, curId, '.topBar', 'padding-right')),
                cpb: parseInt(pf.gS(styleDom, curId, '.topBar', 'padding-bottom')),
                cpl: parseInt(pf.gS(styleDom, curId, '.topBar', 'padding-left')),
                fc: pf.gS(styleDom, curId, '.topBar', 'color'),
                fs: parseInt(pf.gS(styleDom, curId, '.topBar', 'font-size')),
                fb: pf.gS(styleDom, curId, '.topBar', 'font-weight'),
                fi: pf.gS(styleDom, curId, '.topBar', 'font-style'),
                fu: pf.gS(styleDom, curId, '.topBar', 'text-decoration'),
                ff: pf.gS(styleDom, curId, '.topBar', 'font-family'),
                lfc: pf.gS(styleDom, curId, '.topBar a', 'color'),
                lfs: parseInt(pf.gS(styleDom, curId, '.topBar a', 'font-size')),
                lfb: pf.gS(styleDom, curId, '.topBar a', 'font-weight'),
                lfi: pf.gS(styleDom, curId, '.topBar a', 'font-style'),
                lfu: pf.gS(styleDom, curId, '.topBar a', 'text-decoration'),
                lff: pf.gS(styleDom, curId, '.topBar a', 'font-family'),
                lhfc: pf.gS(styleDom, curId, '.topBar a:hover', 'color'),
                lhfs: parseInt(pf.gS(styleDom, curId, '.topBar a:hover', 'font-size')),
                lhfb: pf.gS(styleDom, curId, '.topBar a:hover', 'font-weight'),
                lhfi: pf.gS(styleDom, curId, '.topBar a:hover', 'font-style'),
                lhfu: pf.gS(styleDom, curId, '.topBar a:hover', 'text-decoration'),
                lhff: pf.gS(styleDom, curId, '.topBar a:hover', 'font-family')
            };
        }
    };

    /*****得到回显值设置函数*****/
    Tset.getAttrSetFun = {
        'alreadyRun' : {
            'exterior' : false,
            'interior' : false
        },
        'exterior' : function(){
            Tset.getAttrRunFun.exterior();
            var g = Tset.getAttrVal.exterior;
            // 背景
            if (g.bg) {
                $('#Top_bgHide').click();
            }else{
                if(g.bgc){
                    $('#Top_bgColor').val(g.bgc);
                    $('#Top_bgImage').val(g.bgi);
                    $('#Top_bgPosition').val(g.bgp);
                    $('#Top_bgRepeat').val(g.bgr);
                    $('#Top_bgCus').click();
                }else {
                    $('#Top_bgAuto').click();
                }
            }
            // 通栏
            if (g.full) {
                if (g.full == '100%')
                    $('#Top_fullYes').click();
                else
                    $('#Top_fullNo').click();
            } else {
                $('#Top_fullAuto').click();
            }
            // 透明度
            if (g.op) {
                $("#Top_opacity").val(g.op * 100);
            }
            // 上边线
            if (g.bort) {
                $("#Top_borderTopHide").trigger('click');
            } else {
                if (g.bortc) {
                    $('#Top_borderTopColor').val(g.bortc);
                    $('#Top_borderTopStyle').val(g.borts);
                    $('#Top_borderTopWidth').val(g.bortw);
                    $("#Top_borderTopCus").trigger('click');
                } else {
                    $("#Top_borderTopAuto").trigger('click');
                }
            }
            // 下边线
            if (g.borb) {
                $("#Top_borderBottomHide").trigger('click');
            } else {
                if (g.borbc) {
                    $('#Top_borderBottomColor').val(g.borbc);
                    $('#Top_borderBottomStyle').val(g.borbs);
                    $('#Top_borderBottomWidth').val(g.borbw);
                    $("#Top_borderBottomCus").trigger('click');
                } else {
                    $("#Top_borderBottomAuto").trigger('click');
                }
            }
            // 左边线
            if (g.borl) {
                $("#Top_borderLeftHide").trigger('click');
            } else {
                if (g.borlc) {
                    $('#Top_borderLeftColor').val(g.borlc);
                    $('#Top_borderLeftStyle').val(g.borls);
                    $('#Top_borderLeftWidth').val(g.borlw);
                    $("#Top_borderLeftCus").trigger('click');
                } else {
                    $("#Top_borderLeftAuto").trigger('click');
                }
            }
            // 右边线
            if (g.borr) {
                $("#Top_borderRightHide").trigger('click');
            } else {
                if (g.borrc) {
                    $('#Top_borderRightColor').val(g.borrc);
                    $('#Top_borderRightStyle').val(g.borrs);
                    $('#Top_borderRightWidth').val(g.borrw);
                    $("#Top_borderRightCus").trigger('click');
                } else {
                    $("#Top_borderRightAuto").trigger('click');
                }
            }
            // 上下边距
            if (isNaN(g.mt) || isNaN(g.mb)) {
                $('#Top_marginAuto').click();
                $('#Top_marginTop').val(parseInt(curDom.css('margin-top')));
                $('#Top_marginBottom').val(parseInt(curDom.css('margin-bottom')));
            } else {
                $('#Top_marginTop').val(g.mt);
                $('#Top_marginBottom').val(g.mb);
                $('#Top_marginCus').click();
            }
            this.alreadyRun.exterior = true;
            return true;
        },
        'interior' : function(){
            Tset.getAttrRunFun.interior();
            var g = Tset.getAttrVal.interior;
            // 背景
            if (g.bg) {
                $('#Top_conBgHide').click();
            }else{
                if(g.bgc){
                    $('#Top_conBgColor').val(g.bgc);
                    $('#Top_conBgImage').val(g.bgi);
                    $('#Top_conBgPosition').val(g.bgp);
                    $('#Top_conBgRepeat').val(g.bgr);
                    $('#Top_conBgCus').click();
                }else {
                    $('#Top_conBgAuto').click();
                }
            }
            // 上边线
            if (g.bort) {
                $("#Top_conBorderTopHide").trigger('click');
            } else {
                if (g.bortc) {
                    $('#Top_conBorderTopColor').val(g.bortc);
                    $('#Top_conBorderTopStyle').val(g.borts);
                    $('#Top_conBorderTopWidth').val(g.bortw);
                    $("#Top_conBorderTopCus").trigger('click');
                } else {
                    $("#Top_conBorderTopAuto").trigger('click');
                }
            }
            // 下边线
            if (g.borb) {
                $("#Top_conBorderBottomHide").trigger('click');
            } else {
                if (g.borbc) {
                    $('#Top_conBorderBottomColor').val(g.borbc);
                    $('#Top_conBorderBottomStyle').val(g.borbs);
                    $('#Top_conBorderBottomWidth').val(g.borbw);
                    $("#Top_conBorderBottomCus").trigger('click');
                } else {
                    $("#Top_conBorderBottomAuto").trigger('click');
                }
            }
            // 左边线
            if (g.borl) {
                $("#Top_conBorderLeftHide").trigger('click');
            } else {
                if (g.borlc) {
                    $('#Top_conBorderLeftColor').val(g.borlc);
                    $('#Top_conBorderLeftStyle').val(g.borls);
                    $('#Top_conBorderLeftWidth').val(g.borlw);
                    $("#Top_conBorderLeftCus").trigger('click');
                } else {
                    $("#Top_conBorderLeftAuto").trigger('click');
                }
            }
            // 右边线
            if (g.borr) {
                $("#Top_conBorderRightHide").trigger('click');
            } else {
                if (g.borrc) {
                    $('#Top_conBorderRightColor').val(g.borrc);
                    $('#Top_conBorderRightStyle').val(g.borrs);
                    $('#Top_conBorderRightWidth').val(g.borrw);
                    $("#Top_conBorderRightCus").trigger('click');
                } else {
                    $("#Top_conBorderRightAuto").trigger('click');
                }
            }
            // 高度和行高
            if (isNaN(g.h) || isNaN(g.linh)) {
                $('#Top_conHeightAuto').click();
                $('#Top_conHeight').val(curDom.find(".topBar").height());
                $('#Top_conLineheight').val(parseInt(curDom.find(".topBar").css("line-height")));
            } else {
                $('#Top_conHeight').val(g.h);
                $('#Top_conLineheight').val(g.linh);
                $('#Top_conHeightCus').click();
            }
            // 内容边距
            if (isNaN(g.cpt) || isNaN(g.cpr) || isNaN(g.cpb) || isNaN(g.cpl)) {
                $('#Top_conPaddingAuto').click();
                $('#Top_conPaddingTop').val(parseInt(curDom.find('.topBar').css('padding-top')));
                $('#Top_conPaddingRight').val(parseInt(curDom.find('.topBar').css('padding-right')));
                $('#Top_conPaddingBottom').val(parseInt(curDom.find('.topBar').css('padding-bottom')));
                $('#Top_conPaddingLeft').val(parseInt(curDom.find('.topBar').css('padding-left')));
            } else {
                $('#Top_conPaddingTop').val(g.cpt);
                $('#Top_conPaddingRight').val(g.cpr);
                $('#Top_conPaddingBottom').val(g.cpb);
                $('#Top_conPaddingLeft').val(g.cpl);
                $('#Top_conPaddingCus').click();
            }
            // 普通文字样式
            if (g.fc) {
                $('#Top_fontColor').val(g.fc);
                $('#Top_fontSize').val(g.fs);
                $('#Top_fontBold')[0].checked = g.fb == '700' ? true : false;
                $('#Top_fontItalic')[0].checked = g.fi == 'italic' ? true : false;
                $('#Top_fontUnderline')[0].checked = g.fu == 'underline' ? true : false;
                $('#Top_fontFamily').val(g.ff);
                $('#Top_fontCus').click();
            } else {
                $('#Top_fontAuto').click();
            }
            // 链接文字颜色
            if (g.lfc) {
                $('#Top_linkFontColor').val(g.lfc);
                $('#Top_linkFontSize').val(g.lfs);
                $('#Top_linkFontBold')[0].checked = g.lfb == '700' ? true : false;
                $('#Top_linkFontItalic')[0].checked = g.lfi == 'italic' ? true : false;
                $('#Top_linkFontUnderline')[0].checked = g.lfu == 'underline' ? true : false;
                $('#Top_linkFontFamily').val(g.lff);

                $('#Top_linkHoverFontColor').val(g.lhfc);
                $('#Top_linkHoverFontSize').val(g.lhfs);
                $('#Top_linkHoverFontBold')[0].checked = g.lhfb == '700' ? true : false;
                $('#Top_linkHoverFontItalic')[0].checked = g.lhfi == 'italic' ? true : false;
                $('#Top_linkHoverFontUnderline')[0].checked = g.lhfu == 'underline' ? true : false;
                $('#Top_linkHoverFontFamily').val(g.lhff);
                $('#Top_linkFontCus').click();
            } else {
                $('#Top_linkFontAuto').click();
            }
            this.alreadyRun.interior = true;
            return true;
        }
    };
    /*****顶部样式基本设置函数*****/
    /*--通栏开关--*/
    Tset.TopFullToggle = function(a) {
        var w = pf.wIframeWin.DF.config.defWebWidth[0];
        if (a == 0) {
            pf.rS(styleDom, curId, '', 'width');
        } else if (a == 1) {
            pf.sS(styleDom, curId, '', 'width', w + 'px');
        } else {
            pf.sS(styleDom, curId, '', 'width', '100%');
        }
    };
    /*--背景设置--*/
    Tset.TopBgToggle = function(a) {
        if (a == 0 || a == 1) {
            pf.sAL('Top_bgAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBg', 'background-color');
            pf.rS(styleDom, curId, '.topBg', 'background-image');
            pf.rS(styleDom, curId, '.topBg', 'background-position');
            pf.rS(styleDom, curId, '.topBg', 'background-repeat');
            a == 0 ? pf.rS(styleDom, curId, '.topBg', 'background') : pf.sS(styleDom, curId, '.topBg', 'background', 'none');
        } else if (a == 2) {
            pf.sAL('Top_bgAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBg', 'background');
            pf.sS(styleDom, curId, '.topBg', 'background-color', $('#Top_bgColor').val());
            var bgimg = $('#Top_bgImage').val();
            if (bgimg == 'none') {
                $('#Top_bgImageLook,#Top_bgImageNone').css({
                    'display': 'none'
                });
            } else {
                $('#Top_bgImageLook').attr('href', bgimg)
                $('#Top_bgImageLook,#Top_bgImageNone').css({
                    'display': 'inline-block'
                });
                bgimg = 'url(' + bgimg + ')';
            }
            pf.sS(styleDom, curId, '.topBg', 'background-image', bgimg);
            pf.sS(styleDom, curId, '.topBg', 'background-position', $('#Top_bgPosition').val());
            pf.sS(styleDom, curId, '.topBg', 'background-repeat', $('#Top_bgRepeat').val());
        }
    };
    // 背景颜色
    Tset.TopBgColor = function(a) {
        pf.sS(styleDom, curId, '.topBg', 'background-color', a);
    };
    Tset.TopNoBgColor = function() {
        pf.sS(styleDom, curId, '.topBg', 'background-color', "transparent");
    };
    // 背景图片
    Tset.TopBgImage = function(a) {
        var bgimg = 'none';
        if (a == 'none') {
            $('#Top_bgImageLook,#Top_bgImageNone').css({
                'display': 'none'
            });
        } else {
            $('#Top_bgImageLook').attr('href', a);
            $('#Top_bgImageLook,#Top_bgImageNone').css({
                'display': 'inline-block'
            })
            bgimg = 'url(' + a + ')';
        }
        pf.sS(styleDom, curId, '.topBg', 'background-image', bgimg);
    };
    // 背景位置
    Tset.TopBgPosition = function(a) {
        pf.sS(styleDom, curId, '.topBg', 'background-position', a);
    };
    // 背景状态
    Tset.TopBgRepeat = function(a) {
        pf.sS(styleDom, curId, '.topBg', 'background-repeat', a);
    };
    // 背景透明度
    Tset.TopOpacity = function(a) {
        pf.sS(styleDom, curId, '.topBg', 'opacity', a / 100);
        pf.sS(styleDom, curId, '.topBg', 'filter', 'alpha(opacity:' + a + ')');
    };
    /**外边线设置**/
    /*上边线*/
    // 开关
    Tset.TopBorderTopToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_borderTopAttrlist', 'hide');
            pf.rS(styleDom, curId, '', 'border-top-width');
            pf.rS(styleDom, curId, '', 'border-top-style');
            pf.rS(styleDom, curId, '', 'border-top-color');
            a === 0 ? pf.rS(styleDom, curId, '', 'border-top') : pf.sS(styleDom, curId, '', 'border-top', "none");
            pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
        } else {
            pf.sAL('Top_borderTopAttrlist', 'show');
            pf.rS(styleDom, curId, '', 'border-top');
            pf.sS(styleDom, curId, '', 'border-top-color', $('#Top_borderTopColor').val());
            pf.sS(styleDom, curId, '', 'border-top-width', $('#Top_borderTopWidth').val() + "px");
            pf.sS(styleDom, curId, '', 'border-top-style', $('#Top_borderTopStyle').val());
        }
    };
    // 颜色
    Tset.TopBorderTopColor = function(a) {
        pf.sS(styleDom, curId, '', 'border-top-color', a);
    };
    // 宽度
    Tset.TopBorderTopWidth = function(a) {
        pf.sS(styleDom, curId, '', 'border-top-width', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 样式
    Tset.TopBorderTopStyle = function(a) {
        pf.sS(styleDom, curId, '', 'border-top-style', a);
    };
    /*下边线*/
    // 开关
    Tset.TopBorderBottomToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_borderBottomAttrlist', 'hide');
            pf.rS(styleDom, curId, '', 'border-bottom-width');
            pf.rS(styleDom, curId, '', 'border-bottom-style');
            pf.rS(styleDom, curId, '', 'border-bottom-color');
            a === 0 ? pf.rS(styleDom, curId, '', 'border-bottom') : pf.sS(styleDom, curId, '', 'border-bottom', "none");
            pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
        } else {
            pf.sAL('Top_borderBottomAttrlist', 'show');
            pf.rS(styleDom, curId, '', 'border-bottom');
            pf.sS(styleDom, curId, '', 'border-bottom-color', $('#Top_borderBottomColor').val());
            pf.sS(styleDom, curId, '', 'border-bottom-width', $('#Top_borderBottomWidth').val() + "px");
            pf.sS(styleDom, curId, '', 'border-bottom-style', $('#Top_borderBottomStyle').val());
        }
    };
    // 颜色
    Tset.TopBorderBottomColor = function(a) {
        pf.sS(styleDom, curId, '', 'border-bottom-color', a);
    };
    // 宽度
    Tset.TopBorderBottomWidth = function(a) {
        pf.sS(styleDom, curId, '', 'border-bottom-width', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 样式
    Tset.TopBorderBottomStyle = function(a) {
        pf.sS(styleDom, curId, '', 'border-bottom-style', a);
    };
    /*左边线*/
    // 开关
    Tset.TopBorderLeftToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_borderLeftAttrlist', 'hide');
            pf.rS(styleDom, curId, '', 'border-left-width');
            pf.rS(styleDom, curId, '', 'border-left-style');
            pf.rS(styleDom, curId, '', 'border-left-color');
            a === 0 ? pf.rS(styleDom, curId, '', 'border-left') : pf.sS(styleDom, curId, '', 'border-left', "none");
        } else {
            pf.sAL('Top_borderLeftAttrlist', 'show');
            pf.rS(styleDom, curId, '', 'border-left');
            pf.sS(styleDom, curId, '', 'border-left-color', $('#Top_borderLeftColor').val());
            pf.sS(styleDom, curId, '', 'border-left-width', $('#Top_borderLeftWidth').val() + "px");
            pf.sS(styleDom, curId, '', 'border-left-style', $('#Top_borderLeftStyle').val());
        }
    };
    // 颜色
    Tset.TopBorderLeftColor = function(a) {
        pf.sS(styleDom, curId, '', 'border-left-color', a);
    };
    // 宽度
    Tset.TopBorderLeftWidth = function(a) {
        pf.sS(styleDom, curId, '', 'border-left-width', a + "px");
    };
    // 样式
    Tset.TopBorderLeftStyle = function(a) {
        pf.sS(styleDom, curId, '', 'border-left-style', a);
    };
    /*右边线*/
    // 开关
    Tset.TopBorderRightToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_borderRightAttrlist', 'hide');
            pf.rS(styleDom, curId, '', 'border-right-width');
            pf.rS(styleDom, curId, '', 'border-right-style');
            pf.rS(styleDom, curId, '', 'border-right-color');
            a === 0 ? pf.rS(styleDom, curId, '', 'border-right') : pf.sS(styleDom, curId, '', 'border-right', "none");
        } else {
            pf.sAL('Top_borderRightAttrlist', 'show');
            pf.rS(styleDom, curId, '', 'border-right');
            pf.sS(styleDom, curId, '', 'border-right-color', $('#Top_borderRightColor').val());
            pf.sS(styleDom, curId, '', 'border-right-width', $('#Top_borderRightWidth').val() + "px");
            pf.sS(styleDom, curId, '', 'border-right-style', $('#Top_borderRightStyle').val());
        }
    };
    // 颜色
    Tset.TopBorderRightColor = function(a) {
        pf.sS(styleDom, curId, '', 'border-right-color', a);
    };
    // 宽度
    Tset.TopBorderRightWidth = function(a) {
        pf.sS(styleDom, curId, '', 'border-right-width', a + "px");
    };
    // 样式
    Tset.TopBorderRightStyle = function(a) {
        pf.sS(styleDom, curId, '', 'border-right-style', a);
    };
    /*--上下外边距开关--*/
    Tset.TopMarginToggle = function(a) {
        if (a == 0) {
            $('#Top_marginAttrlist').hide();
            pf.rS(styleDom, curId, '', 'margin-top');
            pf.rS(styleDom, curId, '', 'margin-bottom');
            pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
        } else if (a == 2) {
            $('#Top_marginAttrlist').show();
            pf.sS(styleDom, curId, '', 'margin-top', $('#Top_marginTop').val() + "px");
            pf.sS(styleDom, curId, '', 'margin-bottom', $('#Top_marginBottom').val() + "px");
        }
        $.get("/ajax_get_info2.php?type=19");
    };
    // 外上边距
    Tset.TopMarginTop = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '', 'margin-top', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 外下边距
    Tset.TopMarginBottom = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '', 'margin-bottom', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    /***********内部样式设置************/
    /*--背景设置--*/
    Tset.TopConBgToggle = function(a) {
        if (a == 0 || a == 1) {
            pf.sAL('Top_conBgAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'background-color');
            pf.rS(styleDom, curId, '.topBar', 'background-image');
            pf.rS(styleDom, curId, '.topBar', 'background-position');
            pf.rS(styleDom, curId, '.topBar', 'background-repeat');
            a == 0 ? pf.rS(styleDom, curId, '.topBar', 'background') : pf.sS(styleDom, curId, '.topBar', 'background', 'none');
        } else if (a == 2) {
            pf.sAL('Top_conBgAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBar', 'background');
            pf.sS(styleDom, curId, '.topBar', 'background-color', $('#Top_conBgColor').val());
            var bgimg = $('#Top_conBgImage').val();
            if (bgimg == 'none') {
                $('#Top_conBgImageLook,#Top_conBgImageNone').css({
                    'display': 'none'
                });
            } else {
                $('#Top_conBgImageLook').attr('href', bgimg)
                $('#Top_conBgImageLook,#Top_conBgImageNone').css({
                    'display': 'inline-block'
                });
                bgimg = 'url(' + bgimg + ')';
            }
            pf.sS(styleDom, curId, '.topBar', 'background-image', bgimg);
            pf.sS(styleDom, curId, '.topBar', 'background-position', $('#Top_conBgPosition').val());
            pf.sS(styleDom, curId, '.topBar', 'background-repeat', $('#Top_conBgRepeat').val());
        }
    };
    // 背景颜色
    Tset.TopConBgColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'background-color', a);
    };
    Tset.TopNoConBgColor = function() {
        pf.sS(styleDom, curId, '.topBar', 'background-color', "transparent");
    };
    // 背景图片
    Tset.TopConBgImage = function(a) {
        var bgimg = 'none';
        if (a == 'none') {
            $('#Top_conBgImageLook,#Top_conBgImageNone').css({
                'display': 'none'
            });
        } else {
            $('#Top_conBgImageLook').attr('href', a);
            $('#Top_conBgImageLook,#Top_conBgImageNone').css({
                'display': 'inline-block'
            })
            bgimg = 'url(' + a + ')';
        }
        pf.sS(styleDom, curId, '.topBar', 'background-image', bgimg);
    };
    // 背景位置
    Tset.TopConBgPosition = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'background-position', a);
    };
    // 背景状态
    Tset.TopConBgRepeat = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'background-repeat', a);
    };
    /**内边线设置**/
    /*上边线*/
    // 开关
    Tset.TopConBorderTopToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_conBorderTopAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'border-top-width');
            pf.rS(styleDom, curId, '.topBar', 'border-top-style');
            pf.rS(styleDom, curId, '.topBar', 'border-top-color');
            a === 0 ? pf.rS(styleDom, curId, '.topBar', 'border-top') : pf.sS(styleDom, curId, '.topBar', 'border-top', "none");
            pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
        } else {
            pf.sAL('Top_conBorderTopAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBar', 'border-top');
            pf.sS(styleDom, curId, '.topBar', 'border-top-color', $('#Top_conBorderTopColor').val());
            pf.sS(styleDom, curId, '.topBar', 'border-top-width', $('#Top_conBorderTopWidth').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'border-top-style', $('#Top_conBorderTopStyle').val());
        }
    };
    // 颜色
    Tset.TopConBorderTopColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-top-color', a);
    };
    // 宽度
    Tset.TopConBorderTopWidth = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-top-width', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 样式
    Tset.TopConBorderTopStyle = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-top-style', a);
    };
    /*下边线*/
    // 开关
    Tset.TopConBorderBottomToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_conBorderBottomAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'border-bottom-width');
            pf.rS(styleDom, curId, '.topBar', 'border-bottom-style');
            pf.rS(styleDom, curId, '.topBar', 'border-bottom-color');
            a === 0 ? pf.rS(styleDom, curId, '.topBar', 'border-bottom') : pf.sS(styleDom, curId, '.topBar', 'border-bottom', "none");
            pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
        } else {
            pf.sAL('Top_conBorderBottomAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBar', 'border-bottom');
            pf.sS(styleDom, curId, '.topBar', 'border-bottom-color', $('#Top_conBorderBottomColor').val());
            pf.sS(styleDom, curId, '.topBar', 'border-bottom-width', $('#Top_conBorderBottomWidth').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'border-bottom-style', $('#Top_conBorderBottomStyle').val());
        }
    };
    // 颜色
    Tset.TopConBorderBottomColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-bottom-color', a);
    };
    // 宽度
    Tset.TopConBorderBottomWidth = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-bottom-width', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 样式
    Tset.TopConBorderBottomStyle = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-bottom-style', a);
    };
    /*左边线*/
    // 开关
    Tset.TopConBorderLeftToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_conBorderLeftAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'border-left-width');
            pf.rS(styleDom, curId, '.topBar', 'border-left-style');
            pf.rS(styleDom, curId, '.topBar', 'border-left-color');
            a === 0 ? pf.rS(styleDom, curId, '.topBar', 'border-left') : pf.sS(styleDom, curId, '.topBar', 'border-left', "none");
        } else {
            pf.sAL('Top_conBorderLeftAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBar', 'border-left');
            pf.sS(styleDom, curId, '.topBar', 'border-left-color', $('#Top_conBorderLeftColor').val());
            pf.sS(styleDom, curId, '.topBar', 'border-left-width', $('#Top_conBorderLeftWidth').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'border-left-style', $('#Top_conBorderLeftStyle').val());
        }
    };
    // 颜色
    Tset.TopConBorderLeftColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-left-color', a);
    };
    // 宽度
    Tset.TopConBorderLeftWidth = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-left-width', a + "px");
    };
    // 样式
    Tset.TopConBorderLeftStyle = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-left-style', a);
    };
    /*右边线*/
    // 开关
    Tset.TopConBorderRightToggle = function(a) {
        if (a === 0 || a === 1) {
            pf.sAL('Top_conBorderRightAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'border-right-width');
            pf.rS(styleDom, curId, '.topBar', 'border-right-style');
            pf.rS(styleDom, curId, '.topBar', 'border-right-color');
            a === 0 ? pf.rS(styleDom, curId, '.topBar', 'border-right') : pf.sS(styleDom, curId, '.topBar', 'border-right', "none");
        } else {
            pf.sAL('Top_conBorderRightAttrlist', 'show');
            pf.rS(styleDom, curId, '.topBar', 'border-right');
            pf.sS(styleDom, curId, '.topBar', 'border-right-color', $('#Top_conBorderRightColor').val());
            pf.sS(styleDom, curId, '.topBar', 'border-right-width', $('#Top_conBorderRightWidth').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'border-right-style', $('#Top_conBorderRightStyle').val());
        }
    };
    // 颜色
    Tset.TopConBorderRightColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-right-color', a);
    };
    // 宽度
    Tset.TopConBorderRightWidth = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-right-width', a + "px");
    };
    // 样式
    Tset.TopConBorderRightStyle = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'border-right-style', a);
    };
    /*--顶部高度开关--*/
    Tset.TopConHeightToggle = function(a) {
        if (a == 0) {
            pf.sAL('Top_conHeightAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'height');
            pf.rS(styleDom, curId, '.topBar', 'line-height');
        } else if(a == 2){
            pf.sAL('Top_conHeightAttrlist', 'show');
            pf.sS(styleDom, curId, '.topBar', 'height', $('#Top_conHeight').val() + 'px');
            pf.sS(styleDom, curId, '.topBar', 'line-height', $('#Top_conLineheight').val() + 'px');
        }
    };
    // 高度
    Tset.TopConHeight = function(obj) {
        var a = pf.numJudge(obj, 30, 20, 500);
        pf.sS(styleDom, curId, '.topBar', 'height', a + 'px');
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 行高度
    Tset.TopConLineheight = function(obj) {
        var a = pf.numJudge(obj, 30, 20, 500);
        pf.sS(styleDom, curId, '.topBar', 'line-height', a + 'px');
    };
    /*--内容内边距开关--*/
    Tset.TopConPaddingToggle = function(a) {
        if (a == 0) {
            $('#Top_conPaddingAttrlist').hide();
            pf.rS(styleDom, curId, '.topBar', 'padding-top');
            pf.rS(styleDom, curId, '.topBar', 'padding-right');
            pf.rS(styleDom, curId, '.topBar', 'padding-bottom');
            pf.rS(styleDom, curId, '.topBar', 'padding-left');
        } else if (a == 2) {
            $('#Top_conPaddingAttrlist').show();
            pf.sS(styleDom, curId, '.topBar', 'padding-top', $('#Top_conPaddingTop').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'padding-right', $('#Top_conPaddingRight').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'padding-bottom', $('#Top_conPaddingBottom').val() + "px");
            pf.sS(styleDom, curId, '.topBar', 'padding-left', $('#Top_conPaddingLeft').val() + "px");
        }
    };
    // 上边距
    Tset.TopConPaddingTop = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '.topBar', 'padding-top', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 右边距
    Tset.TopConPaddingRight = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '.topBar', 'padding-right', a + "px");
    };
    // 下边距
    Tset.TopConPaddingBottom = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '.topBar', 'padding-bottom', a + "px");
        pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
    };
    // 左边距
    Tset.TopConPaddingLeft = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS(styleDom, curId, '.topBar', 'padding-left', a + "px");
    };
    /*****顶部普通文字样式*****/
    /*--文字开关--*/
    Tset.TopFontToggle = function(a) {
        if (a == 0) {
            pf.sAL('Top_fontAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar', 'color');
            pf.rS(styleDom, curId, '.topBar', 'font-size');
            pf.rS(styleDom, curId, '.topBar', 'font-weight');
            pf.rS(styleDom, curId, '.topBar', 'font-style');
            pf.rS(styleDom, curId, '.topBar', 'text-decoration');
            pf.rS(styleDom, curId, '.topBar', 'font-family');
        } else if (a == 2) {
            pf.sAL('Top_fontAttrlist', 'show');
            pf.sS(styleDom, curId, '.topBar', 'color', $('#Top_fontColor').val());
            pf.sS(styleDom, curId, '.topBar', 'font-size', $('#Top_fontSize').val() + 'px');
            var b = $('#Top_fontBold')[0].checked ? 700 : 400;
            var i = $('#Top_fontItalic')[0].checked ? 'italic' : 'normal';
            var u = $('#Top_fontUnderline')[0].checked ? 'underline' : 'none';
            pf.sS(styleDom, curId, '.topBar', 'font-weight', b);
            pf.sS(styleDom, curId, '.topBar', 'font-style', i);
            pf.sS(styleDom, curId, '.topBar', 'text-decoration', u);
            pf.sS(styleDom, curId, '.topBar', 'font-family', $('#Top_fontFamily').val());
        }
    };
    // 文字颜色
    Tset.TopFontColor = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'color', a);
    };
    // 文字大小
    Tset.TopFontSize = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'font-size', a + 'px');
    };
    // 文字加粗
    Tset.TopFontBold = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar', 'font-weight', '700');
        } else {
            pf.sS(styleDom, curId, '.topBar', 'font-weight', '400');
        }
    };
    // 文字斜体
    Tset.TopFontItalic = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar', 'font-style', 'italic');
        } else {
            pf.sS(styleDom, curId, '.topBar', 'font-style', 'normal');
        }
    };
    // 文字下划线
    Tset.TopFontUnderline = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar', 'text-decoration', 'underline');
        } else {
            pf.sS(styleDom, curId, '.topBar', 'text-decoration', 'none');
        }
    };
    // 文字字体
    Tset.TopFontFamily = function(a) {
        pf.sS(styleDom, curId, '.topBar', 'font-family', a);
    };

    /*--顶部链接文字样式--*/
    // 开关
    Tset.TopLinkFontToggle = function(a) {
        if (a == 0) {
            pf.sAL('Top_linkFontAttrlist', 'hide');
            pf.rS(styleDom, curId, '.topBar a', 'color');
            pf.rS(styleDom, curId, '.topBar a', 'font-size');
            pf.rS(styleDom, curId, '.topBar a', 'font-weight');
            pf.rS(styleDom, curId, '.topBar a', 'font-style');
            pf.rS(styleDom, curId, '.topBar a', 'text-decoration');
            pf.rS(styleDom, curId, '.topBar a', 'font-family');
            pf.rS(styleDom, curId, '.topBar a:hover', 'color');
            pf.rS(styleDom, curId, '.topBar a:hover', 'font-size');
            pf.rS(styleDom, curId, '.topBar a:hover', 'font-weight');
            pf.rS(styleDom, curId, '.topBar a:hover', 'font-style');
            pf.rS(styleDom, curId, '.topBar a:hover', 'text-decoration');
            pf.rS(styleDom, curId, '.topBar a:hover', 'font-family');
        } else if (a == 2) {
            pf.sAL('Top_linkFontAttrlist', 'show');
            pf.sS(styleDom, curId, '.topBar a', 'color', $('#Top_linkFontColor').val());
            pf.sS(styleDom, curId, '.topBar a', 'font-size', $('#Top_linkFontSize').val() + "px");
            var b = $('#Top_linkFontBold')[0].checked ? 700 : 400;
            pf.sS(styleDom, curId, '.topBar a', 'font-weight', b);
            var i = $('#Top_linkFontItalic')[0].checked ? 'italic' : 'normal';
            pf.sS(styleDom, curId, '.topBar a', 'font-style', i);
            var u = $('#Top_linkFontUnderline')[0].checked ? 'underline' : 'none';
            pf.sS(styleDom, curId, '.topBar a', 'text-decoration', u);
            pf.sS(styleDom, curId, '.topBar a', 'font-family', $('#Top_linkFontFamily').val());

            pf.sS(styleDom, curId, '.topBar a:hover', 'color', $('#Top_linkHoverFontColor').val());
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-size', $('#Top_linkHoverFontSize').val() + "px");
            var hb = $('#Top_linkHoverFontBold')[0].checked ? 700 : 400;
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-weight', hb);
            var hi = $('#Top_linkHoverFontItalic')[0].checked ? 'italic' : 'normal';
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-style', hi);
            var hu = $('#Top_linkHoverFontUnderline')[0].checked ? 'underline' : 'none';
            pf.sS(styleDom, curId, '.topBar a:hover', 'text-decoration', hu);
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-family', $('#Top_linkHoverFontFamily').val());
        }
    };
    // 链接文字颜色
    Tset.TopLinkFontColor = function(a) {
        pf.sS(styleDom, curId, '.topBar a', 'color', a);
    };
    // 链接文字大小
    Tset.TopLinkFontSize = function(a) {
        pf.sS(styleDom, curId, '.topBar a', 'font-size', a + "px");
    };
    // 链接文字加粗
    Tset.TopLinkFontBold = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a', 'font-weight', "700");
        } else {
            pf.sS(styleDom, curId, '.topBar a', 'font-weight', "400");
        }
    };
    // 链接文字斜体
    Tset.TopLinkFontItalic = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a', 'font-style', 'italic');
        } else {
            pf.sS(styleDom, curId, '.topBar a', 'font-style', 'normal');
        }
    };
    // 链接文字下划线
    Tset.TopLinkFontUnderline = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a', 'text-decoration', 'underline');
        } else {
            pf.sS(styleDom, curId, '.topBar a', 'text-decoration', 'none');
        }
    };
    // 链接文字字体
    Tset.TopLinkFontFamily = function(a) {
        pf.sS(styleDom, curId, '.topBar a', 'font-family', a);
    };
    // 链接文字鼠标经过颜色
    Tset.TopLinkHoverFontColor = function(a) {
        pf.sS(styleDom, curId, '.topBar a:hover', 'color', a);
    };
    // 链接文字鼠标经过大小
    Tset.TopLinkHoverFontSize = function(a) {
        pf.sS(styleDom, curId, '.topBar a:hover', 'font-size', a + "px");
    };
    // 链接文字鼠标经过加粗
    Tset.TopLinkHoverFontBold = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-weight', "700");
        } else {
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-weight', "400");
        }
    };
    // 链接文字鼠标经过斜体
    Tset.TopLinkHoverFontItalic = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-style', 'italic');
        } else {
            pf.sS(styleDom, curId, '.topBar a:hover', 'font-style', 'normal');
        }
    };
    // 链接文字鼠标经过下划线
    Tset.TopLinkHoverFontUnderline = function(a) {
        if ($(a).attr("checked")) {
            pf.sS(styleDom, curId, '.topBar a:hover', 'text-decoration', 'underline');
        } else {
            pf.sS(styleDom, curId, '.topBar a:hover', 'text-decoration', 'none');
        }
    };
    // 链接文字鼠标经过字体
    Tset.TopLinkHoverFontFamily = function(a) {
        pf.sS(styleDom, curId, '.topBar a:hover', 'font-family', a);
    };

    //确定设置函数
    Tset.TopEnter = function(obj) {
        $(obj).focus();
        setTimeout(function() {
            pf.Pwin.$.popupClose(iframeNumber);
        }, 200);
        return false;
    };
    //恢复默认
    Tset.TopExteriorReset = function() {
        $('#Top_bgAuto,#Top_fullAuto,#Top_borderTopAuto,#Top_borderBottomAuto,#Top_borderLeftAuto,#Top_borderRightAuto,#Top_marginAuto').trigger('click');
        $('#Top_opacity').val(100).change();
        setTimeout(function() {
            var prev = $('#Top_opacity').prev('.alpha');
            prev.find('.alphaMove').animate({
                "left": 100
            }, 200);
            prev.find('.alphaBg').animate({
                'width': 100
            }, 200);
        }, 100);
        pf.rS(styleDom, curId, '.topBg', 'opacity');
        pf.rS(styleDom, curId, '.topBg', 'filter');
    };
    Tset.TopInteriorReset = function(){
        $('#Top_conBgAuto,#Top_conBorderTopAuto,#Top_conBorderBottomAuto,#Top_conBorderLeftAuto,#Top_conBorderRightAuto,#Top_conHeightAuto,#Top_conPaddingAuto,#Top_fontAuto,#Top_linkFontAuto').trigger('click');
    };
}