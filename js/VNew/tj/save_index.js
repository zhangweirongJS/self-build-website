G_.lastR       = 0; // 最后改变行的id值
G_.RSaveEnd    = 0;
G_.errorNumber = 0;

function save_index_set(type)
{
    G_.lastR    = 0;
    G_.RSaveEnd = 0;

    try {
        if (Ev.pubVar.zoomSaveVar) {
            saveIndexError(1, 1);
            return false;
        }

        var isloading = Ev.pubVar.wIframeWin.saveValue;
        if (isloading) {
            Ev.saveError = 0;
            sysDefine.shade();
            setTimeout(function() {
                save_user_set(Ev.pubVar.wIframe.contents(), type);
            }, 1000);
        } else {
            saveIndexError(type, 2);
        }
    } catch (err) {
        saveIndexError(type, 3);
    }
}

function strToJson(s)
{
    s = $.trim(s);
    if (!s) {
        return false;
    }
    s = s.replace(/\,/g, ',"').replace(/\:/g, '":');

    return JSON.parse('{"' + s + '}');
}

function saveIndexError(iType, iMsgType)
{
    var sMsg = [];
    sMsg[1]  =  '您的浏览器目前处于非100%状态，将不能进行任何操作，您可以键盘按“ctrl+数字0”组合键恢复初始状态,并刷新页面！<br>错误代码<b>0001</b>';
    sMsg[2]  = '当前页面没加载完，请稍后保存！<br>错误代码<b>0002</b>';
    sMsg[3]  = '当前页面没加载完，请稍后保存！<br>错误代码<b>0003</b>';
    sMsg[4]  = '行参数获取失败,请重新点击提交!<br>错误代码<b>0004</b>';
    sMsg[5]  = '行参数获取失败,请重新点击提交!<br>错误代码<b>0010</b>';
    sMsg[6]  = '参数获取失败,请重新点击提交!<br>错误代码<b>0005</b>';
    sMsg[7]  = '未获取到系统行,请重新点击提交!<br>错误代码<b>0006</b>';
    sMsg[8]  = '行参数获取失败,请重新点击提交!<br>错误代码<b>0007</b>';
    sMsg[9]  = '网络繁忙,请重新点击提交!<br>错误代码<b>0008</b>';
    sMsg[10] = '保存错误，频道信息验证错误！<br>错误代码<b>0009</b>';
    sMsg[11] = '保存错误，请重新点击保存！<br>错误代码<b>'+ G_.errorNumber +'</b>';
    sMsg[12] = '远程地址请求失败,请重新点击保存！<br>错误代码<b>0011</b>';
    sMsg[13] = '保存错误，请重新点击保存！<br>错误代码<b>'+ G_.errorNumber +'</b>';
    sMsg[14] = '网站升级，暂不支持保存，大约13点左右升级完成！';
    sMsg[15]  = '网络繁忙,请重新点击提交!<br>错误代码<b>0012</b>';
    sMsg[16] = '保存错误，频道信息验证错误！<br>错误代码<b>0013</b>';

    iMsgType = parseInt(iMsgType);
    if (!sMsg[iMsgType]) {
        return false;
    }

    var content = '';
    if (iMsgType === 14) {
        content = sMsg[iMsgType];
    } else {
        content = sMsg[iMsgType] + '，如有任何疑问请联系在线客服！';
    }

    $.popupClose(Ev.shade);
    Ev.shade = 0;
    Ev.saveError = 1;

    if (iType === 1 || iType === 2) {
        sysDefine.webMsg(2, content);
    }
    return false;
}

function save_user_set(w, type)
{
    var oSet = {};

    oSet.saveType = (type === 1) ? 1 : 0;
    oSet.copyid   = w.find('#webBody').data('copyid');

    var oCh             = strToJson(w.find('#webBody').data('attr'));
    oSet.channel_id = oCh.ch_id;
    oSet.ch_type    = oCh.ch_type;
    oSet.doc_id     = oCh.doc_id;
    oSet.innerStyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.InnerStyle);

    oSet.row_ids   = '';
    oSet.sys_count = 0;

    var lostParam = false;

    if (oSet.channel_id || w.find('#add_container .customModuleRow').length > 0) {
        w.find('#add_container .customModuleRow').each(function() {
            var oRowId = $(this).attr('id').replace(/\D/g, '');

            var sRowAttr = $.trim($(this).data('attr'));
            if (!sRowAttr) {
                lostParam = true;
                saveIndexError(type, 4);
                return false;
            }
            var oRAttr = strToJson(sRowAttr);

            if (oRAttr.c === 1) {
                G_.lastR = oRowId;
            }

            if (oSet.row_ids) {
                oSet.row_ids += ',' + oRowId;
            } else {
                oSet.row_ids = oRowId;
            }

            // 非频道页或者非系统行跳出当前循环
            if (!oSet.channel_id || oRAttr.sys !== 1 || oSet.ch_type === 76) {
                return true;
            }
            if ($(this).find('.customModule').length < 1) {
                lostParam = true;
                return false;
            }

            $(this).find('.customModule').each(function() {
                var sMAttr = $.trim($(this).data('attr'));
                if (!sMAttr) {
                    lostParam = true;
                    return false;
                }

                var oMAttr = strToJson(sMAttr);
                if (!oMAttr) {
                    lostParam = true;
                    saveIndexError(type, 5);
                    return false;
                }

                if (!oMAttr.mt && oMAttr.sys) {
                    lostParam = true;
                    return false;
                }

                if (oMAttr.sys === 1) {
                    if (oSet.channel_id && oSet.ch_type === 1001) {
                        oSet.sys_count += oMAttr.mt > 2000 ? 1 : 0;
                    } else {
                        oSet.sys_count += jQuery.inArray(oMAttr.mt, Ev.admin.tj.v.sysROnlyOneSysMTypes) === -1 ? 2 : 1;
                        return false;
                    }
                }
            });
            if (lostParam) {
                return false;
            }
        });

        if (lostParam) {
            saveIndexError(type, 6);
            return false;
        }
        if (oSet.sys_count === 0 && oSet.channel_id && oSet.ch_type !== 76) {
            saveIndexError(type, 7);
            return false;
        }
        if (!oSet.row_ids && oSet.ch_type !== 76) {
            saveIndexError(type, 8);
            return false;
        }
    }

    oSet.is_top_head = strToJson(w.find('#top_area').data('attr')).h;

    if (!oSet.channel_id || (oSet.channel_id && oSet.ch_type !== 1001)) {
        var oNav         = w.find('#web_nav');
        var oLogo        = w.find('#logo');
        var oSearch      = w.find('#search');
        var oShoppingCar = w.find('#shopping_car');
        var oBanner      = w.find('#banner_area');
        var oNavAttr     = strToJson(oNav.data('attr'));
        var oNavParam    = strToJson(oNav.data('l'));

        oSet.is_search        = strToJson(oSearch.data('attr')).h;
        oSet.is_shopping_card = strToJson(oShoppingCar.data('attr')).h;
        oSet.is_nav           = oNavAttr.h;
        oSet.is_footer        = strToJson(w.find('#footer').data('attr')).h;
        oSet.is_logo          = strToJson(oLogo.data('attr')).h;

        if (oBanner.length > 0) {
            oSet.is_banner = strToJson(oBanner.data('attr')).h;
        }

        oSet.is_head = strToJson(w.find('#header').data('attr')).h;

        oSet.logo_width  = parseInt(oLogo.css('width'));
        oSet.logo_height = parseInt(oLogo.css('height'));
        oSet.logo_left   = parseInt(oLogo.css('left')) - Ev.pubVar.wIframeWin.DF.webCZ();
        oSet.logo_top    = parseInt(oLogo.css('top'));

        oSet.search_left = parseInt(oSearch.css('left')) - Ev.pubVar.wIframeWin.DF.webCZ();
        oSet.search_top  = parseInt(oSearch.css('top'));

        oSet.shopping_card_left = parseInt(oShoppingCar.css('left')) - Ev.pubVar.wIframeWin.DF.webCZ();
        oSet.shopping_card_top  = parseInt(oShoppingCar.css('top'));

        oSet.n_id    = parseInt(/\d+/g.exec(w.find('#nav').attr('class')));
        oSet.nav_num = Ev.pubVar.wIframeWin.DF.nav.itemSum();

        oSet.isNavFloat = parseInt(oNavParam.p);
        if (oSet.isNavFloat === 1 || oSet.isNavFloat === 3) {
            oSet.navLeft = parseInt(oNavParam.l);
            oSet.navTop  = parseInt(oNavParam.t);
        } else if (oSet.isNavFloat === 2 || oSet.isNavFloat === 4) {
            oSet.isNavFull = parseInt(oNavParam.wt);
        }
    }

    oSet.t_id = parseInt(/\d+/g.exec(w.find('#webSkinCss').attr('href')));

    oSet.css_style        = {};
    oSet.css_style.Tstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Tstyle);
    oSet.css_style.Hstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Hstyle);
    oSet.css_style.Nstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Nstyle);
    oSet.css_style.Fstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Fstyle);
    oSet.css_style.Bstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Bstyle);

    if (oSet.channel_id && oSet.ch_type === 1001) {
        oSet.useruserid = w.find('#shop-nav').data('useruserid');
    }

    if (G_.RSaveEnd) {
        oSet.lastR    = 0;
    } else {
        oSet.lastR = G_.lastR;
    }
    oSet.RSaveEnd = G_.RSaveEnd;

    var FMIdArr = [];
    w.find('#absolute_module_inner').children('div').each(function() {
        var oM = $(this);

        var id = oM.attr('id').replace(/absMC_/g, '');
        if (!id || id.length !== 5) {
            return true;
        }

        FMIdArr.push(id);
    });

    if (FMIdArr.length > 0) {
        oSet.FMIds = FMIdArr.toString();
    }

    oSet.delFMIds = '';
    var delFMIdsArr = Ev.pubVar.wIframeWin.DF.config.delMoHistory.absolute_module_wrap;
    if (delFMIdsArr.length > 0) {
        var delFMIds = delFMIdsArr.toString();
        oSet.delFMIds = delFMIds.replace(/absMC_/g, '');
    }

    var sSetJson = JSON.stringify(oSet);

    var timestamp = Date.parse(new Date());
    $.ajax({
        'url': 'tj_module_save.php?current_user_name=' + sUsername + '&timestamp =' + timestamp,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: { 'user_set_param': sSetJson },
        error: function() { saveIndexError(type, 9); },
        success: function(data) {
            data = parseInt(data);
            if (data === 1) {
                if (G_.RSaveEnd || !oSet.lastR) {
                    saveFloatModuleSet(w, type);
                    if (!Ev.saveError) {
                        success_operation(type, oCh.ch_id);
                    }
                } else {
                    save_module_set(w, type);
                }
            } else {
                if (data === 1004) {
                    saveIndexError(type, 10);
                } else if (data === 1024 || data === 1025) {
                    Ev.admin.tj.fun.locationWIframe('http://www.ev123.net/re_change_host.php?out=1');
                    sysDefine.webEternityMsg(1, '登录超时，正在退出...');
                    $.post('/ajax_get_info.php', {
                            type: 271,
                            u: timestamp
                        },
                        function() {
                            setTimeout(out_login, 3000);
                        }
                    );
                } else {
                    G_.errorNumber = data;

                    saveIndexError(type, 11);
                }
            }
        }
    });
}

function saveFloatModuleSet(w, type)
{
    var oFMSet = {
        list : {}
    };

    oFMSet.chId = parseInt(w.find('body').data('chid'));

    w.find('#absolute_module_inner').children('div').each(function(k) {
        var oM = $(this);

        var id = oM.attr('id').replace(/absMC_/g, '');
        if (!id) {
            return true;
        }

        var oAttr = strToJson(oM.data('attr'));

        var mt = parseInt(oAttr.mt); // 类型
        var sk = parseInt(oAttr.sk); // 模版id
        var z  = parseInt(oAttr.z); // 层级

        var oS    = strToJson(oM.data('s'));

        var l = oS.l;
        var t = parseInt(oS.t);

        if (!mt) {
            return true;
        }

        oFMSet.list['m'+ k]    = {};
        oFMSet.list['m'+ k].id = id;
        oFMSet.list['m'+ k].mt = mt;
        oFMSet.list['m'+ k].sk = sk;
        oFMSet.list['m'+ k].z  = z;
        oFMSet.list['m'+ k].l  = l;
        oFMSet.list['m'+ k].t  = t;

        oFMSet.list['m'+ k].style = encodeURI(Ev.pubVar.wIframeWin.sCssJson.AbsStyle['absMC_'+ id]);
    });

    if (!oFMSet.list.m0) {
        return true;
    }

    var sFMSetJson = JSON.stringify(oFMSet);

    var timestamp = Date.parse(new Date());
    $.ajax({
        'url': 'tj_module_save.php?current_user_name=' + sUsername + '&timestamp =' + timestamp,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: { 'float_module_set': sFMSetJson },
        error: function() { saveIndexError(type, 15); },
        success: function(data) {
            data = parseInt(data);
            if (data !== 1) {
                if (data === 1004) {
                    saveIndexError(type, 16);
                } else if (data === 1024 || data === 1025) {
                    Ev.admin.tj.fun.locationWIframe('http://www.ev123.net/re_change_host.php?out=1');
                    sysDefine.webEternityMsg(1, '登录超时，正在退出...');
                    $.post('/ajax_get_info.php', {
                            type: 271,
                            u: timestamp
                        },
                        function() {
                            setTimeout(out_login, 3000);
                        }
                    );
                } else {
                    G_.errorNumber = data;

                    saveIndexError(type, 11);
                }
            }
        }
    });

    //oSet.css_style.Tstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Tstyle);
}

function save_module_set(w, type)
{
    var success = 1;
    var fail    = 0;
    var oCh     = strToJson(w.find('#webBody').data('attr'));
    var copyid  = w.find('#webBody').data('copyid');

    if (oCh.ch_id || w.find('#add_container .customModuleRow').length > 0) {
        w.find('#add_container .customModuleRow').each(function() {
            var
                oRow = $(this),
                oRowAttr = strToJson(oRow.data('attr'));

            if (oRowAttr.c === 1) {
                var oRSet          = {};
                var oRowId         = oRow.attr('id');
                oRSet.row_id       = oRowId.replace(/\D/g, '');
                oRSet.row_type     = oRowAttr.l;
                oRSet.is_show      = oRowAttr.h;
                oRSet.sys          = parseInt(oRowAttr.sys) ? parseInt(oRowAttr.sys) : 0;
                oRSet.copy_row_id  = oRowAttr.cid;
                oRSet.copy_user_id = oRowAttr.cuserid;
                oRSet.copyid       = copyid;

                if (oCh.ch_id && oCh.ch_type === 1001) {
                    oRSet.useruserid = w.find('#shop-nav').data('useruserid');
                }


                oRSet.channel_id = oCh.ch_id;
                oRSet.doc_id = oCh.doc_id;

                var m_dels = Ev.pubVar.wIframeWin.DF.config.delMoHistory[oRowId];
                oRSet.m_dels = m_dels ? m_dels : '';

                var sRCss = '';
                if (Ev.pubVar.wIframeWin.sCssJson.Rstyle) {
                    var sRJson = Ev.pubVar.wIframeWin.sCssJson.Rstyle[oRowId];

                    if ($.trim(sRJson) === 'undefined') {
                        sRCss = '';
                    } else if (typeof(sRJson) !== 'undefined') {
                        sRCss = encodeURI(sRJson);
                    }
                }
                oRSet.css = sRCss ? sRCss : '';

                var oMSet = {};
                oRow.find('.customModule').each(function(m_key) {
                    var
                        oModule = $(this),
                        oMo = oModule.find('.Mo'),
                        oMCon = oModule.find('.MoBody .MoBodyM .MoBodyC'),
                        oMAttr = strToJson(oModule.data('attr')),
                        oMSys = (oMAttr.sys === 1) ? oMAttr.sys : 0,
                        oMType = parseInt(oMAttr.mt);
                    if (!oModule || !oMo || (!oMCon && oMType !== 18)) {
                        return true;
                    }

                    var iMId = oMo.attr('id').replace(/\D/g, '');
                    if (!iMId) {
                        return true;
                    }

                    oMSet['m' + m_key]                = {};
                    oMSet['m' + m_key].m_id           = parseInt(iMId);
                    oMSet['m' + m_key].m_type         = parseInt(oMType);
                    oMSet['m' + m_key].m_sys          = parseInt(oMSys);
                    oMSet['m' + m_key].copy_m_id      = parseInt(oMAttr.cid);

                    if (oRSet.sys && oCh.ch_id === 9 && oRSet.row_type === 31) {
                        oMSet['m' + m_key].chId = oMo.data('channelid') ? oMo.data('channelid') : 0;
                    }

                    var aModuleClass = [];
                    var MClass = oMo.attr('class');

                    if ($.inArray(oMType, Ev.admin.tj.v.navTypes) !== -1) {
                        if (MClass.indexOf('cusHMo_') >= 0) {
                            aModuleClass = /cusHMo_\d+\s?/.exec(oMo.attr('class'));
                        } else if (MClass.indexOf('sysHMo_') >= 0) {
                            aModuleClass = /sysHMo_\d+\s?/.exec(oMo.attr('class'));
                        } else if (MClass.indexOf('copyHMo_') >= 0) {
                            aModuleClass =/copyHMo_\d+_\d+\s?/.exec(oMo.attr('class'));
                        } else {
                            aModuleClass = /HMo_\d+\s?/.exec(oMo.attr('class'));
                        }
                    } else {
                        oMSet['m' + m_key].width = parseInt(oModule.css('width'));
                        oMSet['m' + m_key].height = parseInt(oModule.css('height'));

                        oMSet['m' + m_key].m_width = parseInt(oMo.css('width'));
                        oMSet['m' + m_key].m_height = parseInt(oMo.css('height'));

                        oMSet['m' + m_key].c_width = parseInt(oMCon.css('width'));
                        oMSet['m' + m_key].c_height = parseInt(oMCon.css('height'));

                        if (MClass.indexOf('cusMo_') >= 0) {
                            aModuleClass = /cusMo_\d+\s?/.exec(oMo.attr('class'));
                        } else if (MClass.indexOf('sysMo_') >= 0) {
                            aModuleClass = /sysMo_\d+\s?/.exec(oMo.attr('class'));
                        } else if (MClass.indexOf('copyMo_') >= 0) {
                            aModuleClass =/copyMo_\d+_\d+\s?/.exec(oMo.attr('class'));
                        } else {
                            aModuleClass = /Mo_\d+\s?/.exec(oMo.attr('class'));
                        }
                    }

                    if (aModuleClass) {
                        oMSet['m' + m_key].cur_module_class = aModuleClass[0];
                    }

                    if (oMo.data('classname')) {
                        oMSet['m' + m_key].defaultClassName = oMo.data('classname');
                    }

                    var parent_class = oModule.parent();
                    if (oRSet.row_type === 28 || oRSet.row_type === 29 || oRSet.row_type === 30) {
                        if (parent_class.hasClass('CModulePCLeft-1')) {
                            oMSet['m' + m_key].parent_class = 'CModulePCLeft-1';
                        } else if (parent_class.hasClass('CModulePCLeft-2')) {
                            oMSet['m' + m_key].right_class = 'CModulePCLeft-2';
                        } else if (parent_class.hasClass('CModulePCLeft-3')) {
                            oMSet['m' + m_key].parent_class_3 = 'CModulePCLeft-3';
                        } else if (parent_class.hasClass('CModulePCLeft-4')) {
                            oMSet['m' + m_key].parent_class_4 = 'CModulePCLeft-4';
                        } else if (parent_class.hasClass('CModulePCLeft-5')) {
                            oMSet['m' + m_key].parent_class_5 = 'CModulePCLeft-5';
                        }
                    } else {
                        if (parent_class.hasClass('CModulePRLeft')) {
                            oMSet['m' + m_key].parent_class = 'CModulePRLeft';
                        } else if (parent_class.hasClass('PCLeft')) {
                            oMSet['m' + m_key].parent_class = 'PCLeft';
                        } else if (parent_class.hasClass('PCRight')) {
                            oMSet['m' + m_key].right_class = 'PCRight';
                        }
                    }

                    var sCss = '';
                    if (Ev.pubVar.wIframeWin.sCssJson.Mstyle) {
                        var sMJson = Ev.pubVar.wIframeWin.sCssJson.Mstyle['Mo_' + iMId];

                        if ($.trim(sMJson) === 'undefined') {
                            sCss = '';
                        } else if (typeof(sMJson) !== 'undefined') {
                            sCss = encodeURI(sMJson);
                        }
                    }

                    oMSet['m' + m_key].css = sCss ? sCss : '';
                }); // module foreach
                oRSet.module = oMSet;
                var sRowJson = JSON.stringify(oRSet);

                var timestamp = Date.parse(new Date());
                $.ajax({
                    'url': 'tj_module_save.php?current_user_name=' + sUsername + '&timestamp=' + timestamp,
                    type: 'POST',
                    async: false,
                    cache: false,
                    dataType: 'json',
                    data: {
                        'content_set_param': sRowJson
                    },
                    error: function() {
                        saveIndexError(type, 12);
                    },
                    success: function(code) {
                        if (parseInt(code) === 1) {
                            success = 1;
                        } else {
                            success        = 0;
                            fail           = 1;
                            G_.errorNumber = code;
                        }
                    }
                });

                if (fail === 1) {
                    saveIndexError(type, 13);
                    return false;
                }
            }
        }); // row foreach
    } else {
        success     = 1;
    }

    if (success === 1) {
        G_.RSaveEnd = 1;
        save_user_set(w, type);
        //success_operation(type, oCh.ch_id);
    }
}

function success_operation(type, ch_id) {
    $.popupClose(Ev.shade);
    Ev.shade = 0;
    if (Ev.pubVar.version === 'tj') {
        Ev.admin.tj.v.usingTempId = Ev.admin.tj.v.lookTempId;
    } else {
        Ev.admin.cp.v.usingTempMain    = Ev.admin.cp.v.lookTempMain;
        Ev.admin.cp.v.usingTempVersion = Ev.admin.cp.v.lookTempVersion;
        Ev.admin.cp.v.usingTempId      = Ev.admin.cp.v.lookTempId;
        Ev.admin.cp.v.copyusingTempId  = Ev.admin.cp.v.copylookTempId;

        Ev.admin.tj.v.mStyleType = Ev.admin.tj.v.mLookStyleType;
        Ev.admin.tj.v.mStyle = Ev.admin.tj.v.mLookStyle;

        $('#dragMotypeSelect, #dragMotypeBlank, #dragMotypeDefault').removeClass('cur');

        if ($.inArray(Ev.admin.tj.v.mStyleType, [1, 2, 3, 5]) !== -1) {
            $('#dragMotypeSelect').addClass('cur');
        } else if (Ev.admin.tj.v.mStyleType === 4) {
            $('#dragMotypeBlank').addClass('cur');
        } else {
            $('#dragMotypeDefault').addClass('cur');
        }
    }
    Ev.admin.removeSelectTemp();
    Ev.pubVar.saveVar = false;
    if (type === 1) {
        sysDefine.webMsg(1, '保存成功!');
    }

    if (ch_id) {
        setTimeout(Ev.admin.tj.fun.refreshWIframe, 2000);
    } else {
        if (Ev.pubVar.version === 'copytj') {
            if (Ev.pubVar.adList) {
                $('#webBuyAd').html($('#webBuyAd').html(Ev.pubVar.adList[Ev.admin.cp.v.lookTempVersion]).text());
            }
            if (Ev.pubVar.templatesViewVersion === 1) {
                $('#webVersionSwitch b').html(Ev.pubVar.templatesNames[Ev.admin.cp.v.lookTempVersion] +'版');
            } else {
                $('#webVersionSwitch b').html(Ev.pubVar.templatesNames[Ev.admin.cp.v.lookTempVersion] +'型');
            }
        }
        setTimeout(Ev.admin.tj.fun.refreshWIframeIndex, 2000);
    }
}
