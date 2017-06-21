/**
 * Created by Administrator on 2017/3/8 0008.
 */
/* https://www.ev123.net
 author:qwguo;
 author:自定义焦点图;
 Date:2013;
 change Date : 2014/09/03;
 */
var curBId = pf.Pwin.Ev.admin.tj.v.curEditObjId,
    curB = pf.Pwin.Ev.admin.tj.v.curEditObj;
if (curBId) {
    $(function() {
        if (Hset.getAttr.hget() == true) {
            $("iframe[name='" + window.name + "']", window.parent.document).parents("div.evPopupBodyCC").find("div.loadingWait").remove();
            pf.eleChange([curB]);
        };
        //颜色对象设置
        if ($("input[name=colorInput]").length > 0) {
            $("input[name=colorInput]").spectrum({
                color: $(this).val(),
                flat: false,
                clickoutFiresChange: true,
                showInitial: true,
                preferredFormat: "hex",
                showInput: true,
                chooseText: "确定",
                cancelText: "取消",
                change: function(color) {
                    $(this).val(color.toHexString());
                }
            });
        }
        $("input[name=opacityObj]").changeOpacity();
    });

    var Hset = {};
    Hset.getAttr = {
        head: {
            full: pf.gS('Bstyle', curBId, '', 'width'),
            h: parseInt(pf.gS('Bstyle', curBId, '.bannerCon', 'height')),
            b: pf.gS('Bstyle', curBId, '.bannerCon', 'border'),
            bc: pf.gS('Bstyle', curBId, '.bannerCon', 'border-color'),
            bs: pf.gS('Bstyle', curBId, '.bannerCon', 'border-style'),
            bw: parseInt(pf.gS('Bstyle', curBId, '.bannerCon', 'border-width')),
            mt: parseInt(pf.gS('Bstyle', curBId, '', 'margin-top')),
            mb: parseInt(pf.gS('Bstyle', curBId, '', 'margin-bottom'))
        },
        hget: function() {
            if (this.head.full) { //通栏
                if (this.head.full == '100%')
                    $('#H_full_yes').click();
                else
                    $('#H_full_no').click();
            } else {
                $('#H_full_auto').click();
            }
            if (this.head.h) { //高度
                this.head.h ? $('#H_height').val(this.head.h) : '';
                $('#H_height_cus').click();
            } else {
                $('#H_height_auto').click();
                $('#H_height').val(curB.find('.bannerCon').height());
            }
            if (this.head.bc) { //边线颜色
                $('#H_border_c').val(this.head.bc);
                $('#H_border_w').val(this.head.bw);
                $('#H_border_s').val(this.head.bs);
                $('#H_border_cus').click();
            } else if (this.head.b) {
                $('#H_border_hide').click();
            } else {
                $('#H_border_auto').click();
            }
            if (isNaN(this.head.mt) || isNaN(this.head.mb)) { //内容边距
                $('#H_margin_auto').click();
                $('#H_margin_t').val(parseInt(curB.css('margin-top')));
                $('#H_margin_b').val(parseInt(curB.css('margin-bottom')));
            } else {
                $('#H_margin_t').val(this.head.mt);
                $('#H_margin_b').val(this.head.mb);
                $('#H_margin_cus').click();
            }
            if (curB.attr('visible') == 'show') { //显示隐藏
                $('#H_visible_no').click();
            } else {
                $('#H_visible_yes').click();
            }
            return true;
        }
    };
    /*--banner通栏开关--*/
    Hset.HFullToggle = function(a) {
        var w = pf.wIframeWin.DF.config.defWebWidth[0];
        if (a == 0) {
            pf.rS('Bstyle', curBId, '', 'width');
        } else if (a == 1) {
            pf.sS('Bstyle', curBId, '', 'width', w + 'px');
        } else {
            pf.sS('Bstyle', curBId, '', 'width', '100%');
        }
    };
    /*--banner边线自定义开关--*/
    Hset.HBorderToggle = function(a) {
        if (a == 0) {
            pf.sAL('H_border_attrlist', 'hide');
            pf.rS('Bstyle', curBId, '.bannerCon', 'border');
            pf.rS('Bstyle', curBId, '.bannerCon', 'border-color');
            pf.rS('Bstyle', curBId, '.bannerCon', 'border-width');
            pf.rS('Bstyle', curBId, '.bannerCon', 'border-style');
        } else if (a == 1) {
            pf.sAL('H_border_attrlist', 'hide');
            pf.sS('Bstyle', curBId, '.bannerCon', 'border', 'none');
        } else {
            pf.sAL('H_border_attrlist', 'show');
            pf.rS('Bstyle', curBId, '.bannerCon', 'border');
            pf.sS('Bstyle', curBId, '.bannerCon', 'border-color', $('#H_border_c').val());
            pf.sS('Bstyle', curBId, '.bannerCon', 'border-width', $('#H_border_w').val() + 'px');
            pf.sS('Bstyle', curBId, '.bannerCon', 'border-style', $('#H_border_s').val());
        }
    };
    /*--banner高度开关--*/
    Hset.HHeightToggle = function(a) {
        if (a == 0) {
            pf.sAL('H_height_attrlist', 'hide');
            pf.rS('Bstyle', curBId, '.bannerCon', 'height');
        } else {
            pf.sAL('H_height_attrlist', 'show');
            pf.sS('Bstyle', curBId, '.bannerCon', 'height', $('#H_height').val() + 'px');
        }
    };
    /*--banner高度设置--*/
    Hset.HHeight = function(obj) {
        var a = pf.numJudge(obj, 300, 50, 1000);
        pf.sS('Bstyle', curBId, '.bannerCon', 'height', a + 'px');
        setTimeout(function() {
            pf.Pwin.Ev.pubFun.iframeH(pf.wIframe);
        }, 300);
    };
    /*--banner边线颜色--*/
    Hset.HBorderColor = function(a) {
        pf.sS('Bstyle', curBId, '.bannerCon', 'border-color', a);
    };
    /*--banner边线宽度--*/
    Hset.HBorderWidth = function(a) {
        pf.sS('Bstyle', curBId, '.bannerCon', 'border-width', a + 'px');
    };
    /*--banner边线样式--*/
    Hset.HBorderStyle = function(a) {
        pf.sS('Bstyle', curBId, '.bannerCon', 'border-style', a);
    };

    /*--上下边距开关--*/
    Hset.HMarginToggle = function(a) {
        if (a == 0) {
            pf.sAL('h_margin_attrlist', 'hide');
            pf.rS('Bstyle', curBId, '', 'margin-top');
            pf.rS('Bstyle', curBId, '', 'margin-bottom');
        } else if (a == 1) {
            pf.sAL('h_margin_attrlist', 'show');
            pf.sS('Bstyle', curBId, '', 'margin-top', $('#H_margin_t').val() + "px");
            pf.sS('Bstyle', curBId, '', 'margin-bottom', $('#H_margin_b').val() + "px");
        }
        $.get("/ajax_get_info2.php?type=19");
    };
    /*--banner上边距--*/
    Hset.HMarginT = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS('Bstyle', curBId, '', 'margin-top', a + "px");
    };
    /*--banner下边距--*/
    Hset.HMarginB = function(obj) {
        var a = pf.numJudge(obj, 0, 0, 300);
        pf.sS('Bstyle', curBId, '', 'margin-bottom', a + "px");
    };
    //确定设置函数
    Hset.Henter = function(obj) {
        $(obj).focus();
        setTimeout(function() {
            pf.Pwin.$.popupClose(window.name.substr(12));
        }, 200);
        return false;
    };
    //恢复默认
    Hset.HRuleReset = function() {
        $('#H_full_auto').click();
        $('#H_height_auto').click();
        $('#H_border_auto').click();
        $('#H_margin_auto').click();
    }

}