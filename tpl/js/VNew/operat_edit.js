function update_module_con_html(module_id)
{
    $.ajax({
        "url": "/ajax_tj.php?username=" + user_name + "&module_id=" + module_id,
        type: "POST",
        async: false,
        cache: false,
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert('网络繁忙！');
                },
        data: {},
        success: function(myobj) {
            $("#Mo_" + module_id).find(".NameTxt").html(myobj.name);
            $("#Mo_"+module_id).find(".MoMore").html(myobj.mylink);
            if (myobj.con_update == 1) {
                myobj.con = myobj.con.replace(/\\\'/g, "'");
                $("#Mo_"+module_id).find(".MoBodyC").html(myobj.con);
            }
        }
    });
}

function update_other_con_html(name)
{
    name = $.trim(name);

    $.ajax({
        "url": "/ajax_tj.php?username=" + user_name + "&name=" + name,
        type: "POST",
        async: false,
        cache: false,
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert('网络繁忙！');
                },
        data: {},
        success: function(myobj) {
            //var myobj = JSON.parse(data);
            if (name == 'top') {
                $("#top_area").find(".topBarL").html(myobj.login);
                $("#top_area").find(".topBarR").html(myobj.fun);
            } else if(name == 'logo') {
                $("#logo").html(myobj.con);
            } else if (name == 'link') {
                $("#Mo_12").find(".MoBodyC").html(myobj.con);
            } else if (name == 'foot_doc') {
                $("#footer_nav").html(myobj.foot_doc);
                setTimeout(window.parent.Ev.pubFun.iframeH(window.parent.Ev.pubVar.wIframe), 1000);
            } else if (name == 'foot') {
                $("#copyright").html(myobj.foot_con);
                setTimeout(window.parent.Ev.pubFun.iframeH(window.parent.Ev.pubVar.wIframe), 1000);
            } else if (name == 'channel') {
                $("#nav").find(".NMain").html(myobj.channel);
            } else if (name == 'search') {
                $("#search .search-inner").html(myobj.search);
            }
        }
    });
}

function updateFMData(objData)
{
    var chId = parseInt($('body').data('chid'));
    var url = '/AjaxTjFM.php?username='+ user_name +'&ch_id='+ chId +'&m_id='+ objData.MId;
    if (objData.isCss) {
        url += '&is_css=' +objData.isCss;
    }

    $.ajax({
        "url" : url,
        type: "POST",
        async: false,
        cache: false,
        dataType: "json",
        error : function(data) {
                    alert('网络繁忙！');
                },
        data: {},
        success: function(data) {
            $('#absMC_'+ objData.MId).remove();
            if (data.h) {
                $('#absolute_module_inner').append(data.h);
                if (objData.isCss) {
                    data.s = data.s.replace(/\\\'/g, "'");
                    sCssJson.AbsStyle['absMC_'+ objData.MId] = data.s;
                    DF.f.writeStyle('AbsStyle');
                }

                window.parent.sysDefine.webMsg(1, "恢复成功!");
            }
        }
    });
}
