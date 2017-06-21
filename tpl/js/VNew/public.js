// JavaScript Document
var dhxWins, w1, w2, w3, w5, w6, Interval_tag, USERHOST,G_ = [];

function check_lst(n, m) {
    for (var i = 1; i <= m; i++) {
        if (i == n) {
            $('#wzgn_' + n).show('slow');
            $('#lst' + i).removeClass("list");
            $('#lst' + i).addClass("select");
        } else {
            $('#wzgn_' + i).hide('slow');
            $('#lst' + i).removeClass("select");
            $('#lst' + i).addClass("list");
        }
    }
}

function select_lii(n, m) {
    for (var i = 1; i <= m; i++) {
        if (i == n) {
            $('#li_div_div_' + i).show('fast');
            $('#lii_' + i).removeClass("li_3");
            $('#lii_' + i).addClass("li_4");
        } else {
            $('#li_div_div_' + i).hide('fast');
            $('#lii_' + i).removeClass("li_4");
            $('#lii_' + i).addClass("li_3");
        }
    }
}

function select2_lii(n, m, h) {
    for (var i = 1; i <= m; i++) {
        if (i == n) {
            $('#li2_div_div_' + i + '_' + h).show('fast');
            $('#lii2_' + i + '_' + h).removeClass("li_3");
            $('#lii2_' + i + '_' + h).addClass("li_4");
        } else {
            $('#li2_div_div_' + i + '_' + h).hide('fast');
            $('#lii2_' + i + '_' + h).removeClass("li_4");
            $('#lii2_' + i + '_' + h).addClass("li_3");
        }
    }
}

function select_li(n, m) {
    for (var i = 1; i <= m; i++) {
        if (i == n) {
            $('#li_div_' + i).show('fast');
            $('#li_' + i).removeClass("li_1");
            $('#li_' + i).addClass("li_2");
        } else {
            $('#li_div_' + i).hide('fast');
            $('#li_' + i).removeClass("li_2");
            $('#li_' + i).addClass("li_1");
        }
    }
}

function check_img(n, m) {
    for (var i = 1; i <= m; i++) {
        if (i == n) {
            $('#li_' + i).removeClass("img1");
            $('#img' + i).addClass("img2");
        } else {
            $('#li_' + i).removeClass("img2");
            $('#img' + i).addClass("img1");
        }
    }
}


//email 判断
function checkEmail(cEmail) {
    var arr = cEmail.split('@');
    var c = true;
    if (arr.length != 2)c = false;
    else if (!arr[0].length || !arr[1].length)c = false;
    else if (arr[1].split('.').length < 2) c = false;
    else if (!arr[1].split('.')[0].length || arr[1].split('.')[1].length < 2 || arr[1].split('.')[1].length > 4)c = false;
    return c;
}

//清除空格
function trim(str) {
    return rtrim(ltrim(str));
}

function ltrim(s) {
    return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s) {
    return s.replace(/(\s*$)/g, "");
}

function show_msg() {

    var msg_5 = '该会员的VIP试用期已过!<a href="http://www.ev123.com/website/yxt/index.html">申请开通</a>';
    show_msg_new(msg_5);

}

function show_msg2() {

    var msg_5 = '欢迎您！作为中国服务类企业最集中的平台，我们将会为您开启新的网络营销之路。</font><br /><font color="red">1、</font>为了更好的精选优秀企业，您需要遵守以下几个规则。<br /><font color="red">A、</font>请您发布规范的，高质量的企业信息。<br /><font color="red">B、</font>请确保您发布的每条信息的真实性和合法性。 <br /><div style="color:red;width:320px;text-align:right;font-size:14px">客户咨询：010-51299718-8004</div>';
    show_msg_new(msg_5, 350, 200);

}

function show_v() {
    var msg_5 = '<div style="width:380px;color:#666666;font-size:14px"><div style="float:left;margin:10px;width:130px;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="130" height="120"><param name="movie" value="/images4/vv/1.swf" /><param name="wmode" value="opaque" /><embed src="/images4/vv/1.swf" wmode="opaque" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="130" height="120"></embed></object></div><div style="float:left;width:220px;padding-top:20px;line-height:24px">您好，我是小V！<br/>您即将进入<b style="color:#ff0000">“建站ABC”</b>平台！<br/>我们将为您提供完整的建站规划、培训方案，并指导帮助您建设一个满意的企业网站！</div><div style="width:100%;text-align:right"><input type="button" value="马上进入" style="height:30px;cursor:pointer" onclick="location=\'/change_mode.php?type=7\'"></div></div>';
    show_msg_new(msg_5, 400, 210);
}

function show_info_msg(type) {
    var pro_msg = readCookie('show_pro_msg');
    if (type == 1) {
        //是否已提示过
        if (pro_msg == 1) {
            return false;
        }
        var con = '<font color="red" style="font-size:14px">好消息：</font><br />为了更好的帮助您进行企业网络营销推广，易维企业服务网推出了 “<a href="http://caigou.ev123.com" target="_blank">企业采购平台</a>”。只要正确的填写您的产品信息，将会在该平台展示。 <a href="http://caigou.ev123.com" target="_blank">进入>></a><br /><br/>';
        writeCookie('show_pro_msg', 1, 3600);
    } else {
        var con = '';
    }

    var msg_5 = '<div style="width:310px;">' + con + '<div style="color:red;width:300px;text-align:right;font-size:14px">客户咨询：010-51299718-8004</div></div>';
    show_msg_new(msg_5, 350, 200);

}

function show_msg3() {

    var msg_5 = '易商营销通致力于为中小企业提供优质的网络营销服务。<br/><a href="/register2010_3b.php?user_name=' + user_name + '" target="_blank">更多服务详情点击</a> <br /><br /><div style="color:red;width:320px;text-align:right;font-size:14px">客户咨询：010-51299718-8004</div>';
    show_msg_new(msg_5, 350, 150);

}

function show_msg4() {

    var msg_5 = '<div style="height:308px;overflow-y:auto;overflow-x:hidden;"><font color="red">特别注意：</font><br><div style="border:1px dashed #cccccc;padding:10px;width:500px;">信息存在以下情况的将不予通过。<br/>一是必须上传营业执照，同时公司名与营业执照上名称相同。<br/>二是公司所属行业必须相应，选择错误将不予通过。<br/>三是除联系方式里添加电话外，其它地方都不能有电话及地址，网址。<br/></div><br/><img src="/images/Fwdw_icons_30.png"> <b>贵公司的信息已发布，我们将在24小时之内对您的公司内容进行审核，然后发布到我们的企业网络营销渠道上。</b><br/><br/>现在每天有超过10万家企业来到易维企业服务网，查找自己满意的服务。在这里，请您随我们一起进行专业的企业网络营销。 <br/><br/><img src="/images/Fwdw_icons_36.png">首先向您介绍下我们的网络营销三步曲：<br/><b>第一步：让客户找到</b><br/><div style="border:1px dashed #cccccc;padding:10px;width:500px;">这是企业网络营销最重要也是最基础的一步，企业网站推广，易商营销通网站采用四大体系八大推广渠道来保证企业网站推广的有效性。</div><b>第二步：吸引客户</b><br/><div  style="border:1px dashed #cccccc;padding:10px;width:500px;">通过第一步的努力我们把客户吸引到我们的网站上来，就是要通过网站来吸引住客户，这部分要求企业对网站的内容和布局要引起足够的重视。</div><b>第三步：留住客户</b><br/><div  style="border:1px dashed #cccccc;padding:10px;width:500px;">通过各种渠道方式，引导用户第一时间与您取得联系。</div><br/><img src="/images/Fwdw_icons_34.png"> 您现在已经进行到了<font color="#ff0000">第二步</font>，下一步您可以发布：<br/><a href="/add_zhengshu.php"  style="font-size:12px;color:#1D3E94">荣誉证书</a>&nbsp;<a href="/add_anli.php"  style="font-size:12px;color:#1D3E94">成功案例</a>&nbsp;<a href="/album_list.php"  style="font-size:12px;color:#1D3E94">企业相册</a>&nbsp;<a href="/add_product.php"  style="font-size:12px;color:#1D3E94">公司产品</a>&nbsp;<a href="/add_server.php" style="font-size:12px;color:#1D3E94">公司服务</a>&nbsp;<a href="/add_price.php" style="font-size:12px;color:#1D3E94">服务报价</a><br/><br/></div><div style="color:red;width:520px;text-align:right;font-size:14px">客户咨询：010-51299718-8004</div>';

    show_msg_new(msg_5, 550, 378);
}

function show_msg5() {

    var msg_5 = '<div style="height:308px;overflow-y:auto;overflow-x:hidden;"><img src="/images/Fwdw_icons_30.png"> <b>您的网络营销是否也存在以下几个问题：</b><br/><br/><img src="/images/Fwdw_icons_36.png">网站存在问题的客户：<br/><br/><div style="border:1px dashed #cccccc;padding:10px;font-size:12px;color:#666666;width:500px;">??网站几年前就做好了,为什么没有带来订单呢？<br/>??网站访问量低、用户量增长缓慢，不能达到理想状态？<br/>??为什么访客在我网站上的停留时间很短？ <br/>??企业网站栏目规划不合理、导航系统不完善，没有真正实用的功能？ <br/>??企业网站访问量小，急需有效的网站推广策略？ <br/>??企业网站对销售和售后服务的促进作用未得到合理发挥？ <br/>??企业网站在网络营销资源积累方面缺乏基本支持？ <br/>??网站收录的问题：输入了网址在搜索引擎中都找不到自己的网站信息？ <br/>??输入自己的公司名，网站在搜索引擎上的排名都不在首页？ <br/>??网站全部或大部分为动态程序生成的页面，里面的内容很难被搜索引擎理解？ <br/>??首页以flash动画为主，结果搜出来就一个公司名，其它什么都没有？<br/>??网站的访问量没有进行过任何统计或监测。<br/>??网站几乎无人访问，在搜索引擎上的排名在10页以外 <br/>??花很多的钱做竞价排名，但效果不理想，投入的资金也越来越多，像个无底洞？<br/>??为什么我花的广告费比对手多效果却不好，为什么客户总是找不到我企业的网站？ <br/>??网站不能很好的直接为我的企业带来业务？<br/><br/><br/></div></div><div style="color:red;width:520px;text-align:right;font-size:14px">客户咨询：010-51299718-8004</div>';

    show_msg_new(msg_5, 550, 378);
}

function change_reg_type() {

    var theRadio = document.all.reg_type;
    var reg_type = 0;
    for (var i = 0; i < theRadio.length; i++) {
        if (theRadio[i].checked) {
            reg_type = theRadio[i].value;
            break;
        }
    }
    //alert(reg_type);
    remove_div('float');
    var tmp_arr = set_bg(350);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var float_div = '<div id="float" style="position:absolute;left:' + left_width + 'px;top:' + top_height + 'px;filter:alpha(opacity=100);z-index:99;width:350px;height:200px;background:#ffffff;overflow:hidden;" align="center"><img src="http://www.ev123.com/images/loading.gif"/></div>';
    $('body').append(float_div);

    var url = "/ajax_get_info.php?type=27&reg_type=" + reg_type + "&u=" + UTCTimeDemo();
    $('#float').load(url).ajaxSuccess(
        function() {
            $(this).show();
        }
    );

}

//字符长度
function strLen(key) {
    var l = escape(key),
        len;
    len = l.length - (l.length - l.replace(/\%u/g, "u").length) * 4;
    l = l.replace(/\%u/g, "uu");
    len = len - (l.length - l.replace(/\%/g, "").length) * 2;
    return len;
}


//清除浮动
function remove_div(div_id) {
    $('#bg_div').remove();
    $('#' + div_id + '').remove();
}

function getPosition(e) {
    var left = 0;
    var top = 0;

    while (e.offsetParent) {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
    }
    left += e.offsetLeft;
    top += e.offsetTop;

    return {
        x: left,
        y: top
    };
}

//时间戳
function UTCTimeDemo() {
    var now = new Date().getTime();
    var datestr = escape(now * 1000 + Math.round(Math.random() * 1000));
    return datestr;
}

//电话
function phonecheck(s) {
    var str = s;
    var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{3,4}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
    //alert(reg.test(str));
    if (reg.test(str) == false) {
        return false;
    } else {
        return true;
    }
}

//设置背景
function set_bg(tmp_width, tmp_height, is_no_bg) {

    if (is_no_bg != 1) {
        set_bg2();
    }
    if (!tmp_height) {
        tmp_height = 200;
    }

    //显示出已经添加完以后的数据
    var offset_height = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    var offset_width = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var offset_top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var top_height = offset_top + (offset_height - tmp_height) / 2;
    var left_width = (offset_width - tmp_width) / 2;

    var tmp_arr = new Array(top_height, left_width);
    return tmp_arr;
}

//获取位置
function get_postion(tmp_width, tmp_height) {

    if (!tmp_height) {
        tmp_height = 200;
    }

    //显示出已经添加完以后的数据
    var offset_height = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    var offset_width = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var offset_top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var top_height = offset_top + (offset_height - tmp_height) / 2;
    var left_width = (offset_width - tmp_width) / 2;

    var tmp_arr = new Array(top_height, left_width);
    return tmp_arr;
}

function set_bg2() {
    //将背景变灰
    var height = $(document).height();
    var height2 = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    height = (height > height2) ? height : height2;
    /*var bg_div = '<div id="bg_div" style= "position:absolute;left:0px;top:0px;filter:alpha(opacity=30);z-index:40;width:' + $(document).width() + 'px;height:' + height + 'px;background:#000;opacity:0.3" align="center"><iframe style="position:absolute; visibility:inherit; top:0px; left:0px; width:' + $(document).width() + 'px; height:' + height + 'px; z-index:-1;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';" frameborder="0"></iframe></div>';
    $('body').append(bg_div);*/
}

//加载中
function loading(load_id) {
    $('#' + load_id).html('<div class="loading"><img src="http://www.ev123.com/images/loading.gif"/></div>');
}

function show_div(div_id, tag) {
    var dis = document.getElementById(div_id).style.display;
    if (dis == 'none') {
        $('#' + div_id).show('fast');
        if (tag) {
            if (tag == 'm_act') {
                $('#' + div_id + '_title').css('background', 'url(/images2/ht2_16.jpg) no-repeat 0px 4px');
            } else {
                $('#' + div_id + '_title').addClass(tag);
            }
        }
    } else {
        $('#' + div_id).hide('fast');
        if (tag) {
            if (tag == 'm_act') {
                $('#' + div_id + '_title').css('background', 'url(/images2/ht2_23.jpg) no-repeat 0px 4px');
            } else {
                $('#' + div_id + '_title').removeClass(tag);
            }
        }
    }
}

function host_url(tag) {
    if (tag == 1) {
        alert('您还未填写公司的基本信息！');
        location.href = "/base_info.php";
    }
    if (tag == 2) {
        alert('您还未填写商城的基本信息！');
        location.href = "/set_mall_site.php";
    }
    if (tag == 3) {
        alert('您还未填写门户的基本信息！');
        location.href = "/set_portal_site.php";
    }
}

//新的信息提示
function show_msg_new(msg, width, height, time, top_height) {
    if (!width) width = 300;
    if (!height) height = 150;
    //alert(2);

    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];

    dhxWins = new dhtmlXWindows();
    dhxWins.enableAutoViewport(true);
    dhxWins.setImagePath("/msg/codebase/imgs/");
    w1 = dhxWins.createWindow("w1", left_width, top_height, width, height);
    w1.setText("信息提示");
    w1.button("park").hide();
    w1.button("minmax1").hide();
    w1.denyResize();
    w1.setIcon();
    w1.attachHTMLString(msg);
    if (time) {
        setTimeout('close_window()', time);
    }
}

//创建新窗体
function create_window2(title, width, height, url) {
    if (!width) width = 300;
    if (!height) height = 150;
    //alert(2);
    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];
    w2 = dhxWins.createWindow("w2", left_width, top_height, width, height);
    w2.setText(title);
    w2.button("park").hide();
    w2.button("minmax1").hide();
    w2.attachURL(url);
    w2.denyResize();
    w2.setIcon();
    w2.setModal(true);
    //关闭执行
    w2.attachEvent("onClose", function() {
        var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
        iframe_obj[0].contentWindow.get_system_path(2);
        return true;
    });
}

//判断是否为IE
function is_ie() {
    if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
        return true;
    } else {
        return false;
    }
}
//创建新窗体
function create_window2s(title, width, height, url) {
    if (!width) width = 300;
    if (!height) height = 150;
    //alert(2);
    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];
    w2 = dhxWins.createWindow("w2", left_width, top_height, width, height);
    w2.setText(title);
    w2.button("park").hide();
    w2.button("minmax1").hide();
    w2.attachURL(url);
    w2.denyResize();
    w2.setIcon();
    w2.setModal(true);
}

//创建新窗体
function create_window3(title, width, height, url) {
    if (!width) width = 300;
    if (!height) height = 150;
    //alert(2);
    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];
    w3 = dhxWins.createWindow("w3", left_width, top_height, width, height);
    w3.setText(title);
    w3.button("park").hide();
    w3.button("minmax1").hide();
    w3.attachURL(url);
    w3.denyResize();
    w3.setIcon();
    w3.setModal(true);
}

//给某个窗体传值
function set_window_id_val(wid, obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[0].contentWindow.document.getElementById(obj_id).value = val;
}

//给某个自定义窗体传值
function setDefineWindowIdVal(obj_id, val_) {
    Ev.admin.o.channelWinDom.find("#"+obj_id).val(val_);
}


//新的信息提示
function show_msg_new2(msg, width, height, time) {
    msg = '<font style="font-size:14px">' + msg + '</font>';
    setTimeout(function() {
        window.parent.show_msg_new(msg, width, height, time);
    }, 1000);
}

function set_dom(dom_id) {

    var width = 400;
    var height = 250;
    var tmp_arr = set_bg(width);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var time = UTCTimeDemo();

    var float_div = '<div id="float" class="float_msg" style="left:' + left_width + 'px;top:' + top_height + 'px;width:' + width + 'px;height:' + height + 'px;" align="center"><div class="div_con2"><div class="info_title2"><div>组件设置</div><div class="r"><a href="javascript:remove_div(\'float\');"><img src="/images2/2-111_06.jpg" border="0"></a></div></div><div class="msg_con"><iframe name="subm_frame" style="width:360px;height:200px" src="/dom_manage.php?dom_id=' + dom_id + '&t=' + time + '" align="center" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe></div></div></div>';
    $('body').append(float_div);
}


//是否删除
function exec_confirm(url) {
    if (confirm("确定要删除吗？删除后将不可恢复！")) {
        //      var urls=url;
        //      alert(urls);
        location.href = url;
    }
}

function exec_confirm2(url, msg) {
    if (confirm(msg)) {
        location.href = url;
    }
}

function load_url(url) {
    location.href = url;
}

//改变表格行的背景颜色
function change_bgcolor(id) {
    $('#tr_' + id).css('background', 'D8D8D8');
}

function change_bgcolor2(id) {
    $('#tr_' + id).css('background', 'E6E6E6');
}
//修改内容城市的回显
function setcitycode(city) {
    document.getElementById("citycode").value = city;
}

function show_div2(div_id) {
    $('#' + div_id).show('fast');
}

function hide_div2(div_id) {
    $('#' + div_id).hide('fast');
}

function re_set_iframe_height(height) {
    var iframe_obj = $("#navigate_iframe");
    iframe_obj.height(height);
}

function SetWinHeight(no_to_top) {
    var iframe = $('#navigate_iframe');
    //alert(iframe);
    try {
        //var src = $('#tmp_iframe_src').val();
        var height = iframe.contents().find("body").height() + 100;
        height =height>600?height:600;

        //var bHeight = iframe.contentWindow.document.body.scrollHeight+300;
        //var dHeight = iframe.contentWindow.document.documentElement.scrollHeight+500;
        iframe.height(height);
        iframe.attr('height', height);
        if (!no_to_top) {
            $(document,'body,html').scrollTop(0);
        }
    } catch (ex) {}
}

function getVcode2() {
    var date = new Date();
    document.getElementById("vcodesrc").src = "/include/captcha/captcha.php?datete=" + date.getTime();
}

function go_url(url) {
    location.href = url;
}

function close_window() {
    dhxWins.window("w1").close();
}

function close_window2(tag) {
    dhxWins.window("w" + tag).close();
}

//重新定义窗体尺寸
function resize_window(window_name, title, width, height, type) {
    if (!width) width = 780;
    if (!height) height = 410;
    width = width + 6;
    var tmp_arr = get_postion(width, height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];
    var isWin = dhxWins.isWindow(window_name);
    if (isWin) {
        dhxWins.window(window_name).setText(title);
        dhxWins.window(window_name).setPosition(left_width, top_height);
        dhxWins.window(window_name).setDimension(width, height);
        if (type == 1) {
            dhxWins.window(window_name).button("close").disable();
        }
        if (type == 2) {
            dhxWins.window(window_name).button("close").enable();
        }
    }
}

function out_login() {
    var no_new = readCookie('no_new');
    writeCookie('ev_userid', '', -1);
    writeCookie('ev_manager_id','',-1);
    writeCookie('ev_shellCode', '', -1);
    writeCookie('portal_userid', '', -1);
    if (no_new && USERHOST) {
        location.href = 'http://' + USERHOST + '/login.php';
    } else {
        location.href = '/login.php';
    }
}

function out_login2() {
    writeCookie('ev_userid', '');
    writeCookie('ev_manager_id','',-1);
    writeCookie('portal_userid', '');
    location.href = 'http://www.ev123.net';
}

function is_checked(check_name) {
    var ids = document.getElementsByName(check_name);
    var flag = false;
    for (var i = 0; i < ids.length; i++) {
        if (ids[i].checked) {
            flag = true;
            break;
        }
    }
    return flag;
}

//回复短消息
function re_message(user_id) {

    var tmp_arr = set_bg(400, 200);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];

    dhxWins = new dhtmlXWindows();
    dhxWins.enableAutoViewport(true);
    dhxWins.setImagePath("/msg/codebase/imgs/");
    w1 = dhxWins.createWindow("w1", left_width, 100, 400, 200);
    w1.setText('回复消息');
    w1.button("park").hide();
    w1.button("minmax1").hide();
    var url = "/re_message.php?re_user=" + user_id;
    var t = url + '&etc=' + new Date().getTime();
    w1.attachURL(url);

}

function re_user_msg() {
    var re_content = $('#re_content').val();
    re_content = trim(re_content);
    if (re_content == '') {
        alert('请填写回复内容！');
    } else {
        $('#add').val(1);
        $('#form1').submit();
    }
}


function show_msg_txt(tmp_tag) {
    var time = UTCTimeDemo();
    var tag = readCookie('vmsg_' + tmp_tag);
    if (!tag) {
        $.post("/ajax_get_info.php", {
                type: "112",
                menu_sub: tmp_tag,
                u: time
            },
            function(data) {
                if (data) {
                    $('#v_msg_con').html(data);
                    $('#v_msg_txt').show();
                }
            }
        );
    }
}

//清除图片
function clear_pro_pic(id, pic_id) {

    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {
            type: "121",
            id: id,
            pic_id: pic_id,
            u: time
        },
        function(data) {
            //alert(data);
            if (data) {
                show_msg_new2('清除成功！', 300, 150);
                $('#propic' + pic_id).hide();
            }
        }
    );
}

//清除文章导读图
function clear_doc_pic(id) {

    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {
            type: "122",
            id: id,
            u: time
        },
        function(data) {
            //alert(data);
            if (data) {
                show_msg_new2('清除成功！', 300, 150);
                $('#docpic').hide();
            }
        }
    );
}

//清除项目导读图
function clear_item_pic(id) {

    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {
            type: "124",
            id: id,
            u: time
        },
        function(data) {
            //alert(data);
            if (data) {
                show_msg_new2('清除成功！', 300, 150);
                $('#itempic').hide();
            }
        }
    );
}

//清除服务导读图
function clear_server_pic(id) {

    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {
            type: "126",
            id: id,
            u: time
        },
        function(data) {
            //alert(data);
            if (data) {
                show_msg_new2('清除成功！', 300, 150);
                $('#serverpic').hide();
            }
        }
    );
}


//记录操作日志
function insert_user_browse_path(title, path) {
    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {
            type: "123",
            title: title,
            url: path,
            u: time
        },
        function(data) {});
}

function close_msg_txt(tmp_tag) {
    $('#v_msg_txt').hide('fast');
    writeCookie('vmsg_' + tmp_tag, 1, 3600 * 24);
}

function show_imsg(tag) {
    var is_set = readCookie(user_name + '_' + tag);
    if (is_set != 1) {
        if (tag == 'buzu') $('#buzu_border').show();
        $('#' + tag).show();
    }
}

function close_imsg(tag, tag_boder, show_tag) {
    if (tag == 'buzu') $('#buzu_border').hide();
    if (tag_boder) $('#' + tag_boder).hide();
    $('#' + tag).hide('fast');
    if (tag == 'xzlm') $('#addlm').show();
    if (show_tag) $('#' + show_tag).show();
    writeCookie(user_name + '_' + tag, 1, 3600 * 24);
}

function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

//收藏信息处理
function copyToClipBoard2(clipBoardContent) {
    if (window.clipboardData) {
        if (window.clipboardData.setData("Text", clipBoardContent)) {
            alert("信息复制成功！您可以通过 QQ,MSN,E-Mail 粘贴给您的朋友!!");
        }
    } else {
        var flashcopier = 'flashcopier';
        if (!document.getElementById(flashcopier)) {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        clipBoardContent = clipBoardContent.replace(/\"/g, '\'');
        var divinfo = '<embed src="/_clipboard.swf" FlashVars="clipboard=' + clipBoardContent + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
        alert("信息复制成功！您可以通过 QQ,MSN,E-Mail 粘贴给您的朋友!!");
    }
}

function change_edit_type(type) {
    $('.content_li ul li').removeClass('actl');
    $('.content_li ul li').addClass('norl');
    $('#con_li_' + type).removeClass('norl');
    $('#con_li_' + type).addClass('actl');
    $('.con_txt').hide();
    $('#con_txt_' + type).show();
    $("#my_submit_div").show();
    $('#con_li_id').val(type);
}

//显示进度条
function show_progress_bar() {
    var msg = "<div  style='padding-top:30px;padding-left:30px;'>上传中，请不要关闭窗口...<div style='width:100%;height:30px;background:url('/images/029.gif') no-repeat;clear:both'></div></div>";
    show_msg_new(msg, 300, 150, 0, 200);
}

//设置网站背景
function set_make_self() {
    var url = '/user_make_self.php?is_frame=1&u=' + UTCTimeDemo();
    var title = "网站背景设置";
    get_url_window(url, title, 680, 300);
}

function go_top() {
    document.documentElement.scrollTop = 0;
}

function show_online_pay(pid, title, width, height) {
    var url = "/online_pay.php?pid=" + pid;
    if (!width) width = 600;
    if (!height) height = 460;
    if (!title) title = '在线支付';
    window.parent.get_url_window(url, title, width, height);
}

//手动左右滚动产品效果――类
function flow_pro_(n, t) {
    var ContN = $(n).parent();
    var $list_ul = ContN.find("ul");
    var $list_ul_par = $list_ul.parent();
    var $list_li_num = $list_ul.find("li").length;
    var $list_li_Lborder = parseInt($list_ul.find("li").css("border-left-width"));
    var $list_li_Rborder = parseInt($list_ul.find("li").css("border-right-width"));
    var $list_li_Lpadd = parseInt($list_ul.find("li").css("padding-left"));
    var $list_li_Rpadd = parseInt($list_ul.find("li").css("padding-left"));
    $list_li_Lborder = isNaN($list_li_Lborder) ? 0 : $list_li_Lborder;
    $list_li_Rborder = isNaN($list_li_Rborder) ? 0 : $list_li_Rborder;
    var $list_li_Rmargin = parseInt($list_ul.find("li").css('margin-right'));
    var $list_li_Lmargin = parseInt($list_ul.find("li").css('margin-left'));
    var $list_li_margin = $list_li_Rmargin + $list_li_Lmargin;
    var $list_li_padd = $list_li_Lpadd + $list_li_Rpadd;
    var $list_li_Wborder = $list_li_Lborder + $list_li_Rborder;
    var $list_li_width = $list_ul.find("li").width() + $list_li_margin + $list_li_Wborder + $list_li_padd;
    var $show_num = Math.round(($list_ul_par.width()) / $list_li_width);
    var $list_ul_left = (0 - parseInt($list_ul.css("left")));
    var $page = Math.ceil($list_li_num / $show_num);
    var $ul_width = $list_li_width * $list_li_num;
    var $move = $show_num * $list_li_width;
    var $oldMove = $list_ul_left + $move;
    var $newMove = $ul_width - $oldMove;
    if (t == 1) {
        if ($newMove > 0) {
            if ($newMove > $move) {
                $list_ul.stop().animate({
                    "left": "-=" + $move
                }, 500);
                $(n).parent().find(".left-but").addClass("left-but-off");
            } else {
                $list_ul.stop().animate({
                    "left": "-=" + $newMove
                }, 500);
                $(n).parent().find(".right-but").addClass("right-but-off");
                $(n).parent().find(".left-but").addClass("left-but-off");
            }
        }
    } else {
        if ($list_ul_left > 0) {
            if ($list_ul_left > $move) {
                $list_ul.stop().animate({
                    "left": "+=" + $move
                }, 500);
                $(n).parent().find(".right-but").removeClass("right-but-off");
            } else {
                $list_ul.stop().animate({
                    "left": "+=" + $list_ul_left
                }, 500);
                $(n).parent().find(".left-but").removeClass("left-but-off");
                $(n).parent().find(".right-but").removeClass("right-but-off");
            }
        }
    }
}
/*--手动左右滚动产品function--*/
var flow_pro = function() {
    $(".right-but").click(function() {
        flow_pro_(this, 1);
    });
    $(".left-but").click(function() {
        flow_pro_(this, 2);
    });
};

//获取文件路径
function getFilePath(obj) {
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {

            if (obj.files) {
                var path = readFileFirefox(obj);
                return path;
            }
            return obj.value;
        }
        return obj.value;
    }
}
//firefox 获取文件路径
function readFileFirefox(fileBrowser) {
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } catch (e) {
        alert('请更改浏览器设置！');
        fileBrowser.value = '';
        return;
    }

    var fileName = fileBrowser.value;
    var file = Components.classes["@mozilla.org/file/local;1"]
        .createInstance(Components.interfaces.nsILocalFile);
    try {
        file.initWithPath(fileName.replace(/\//g, "\\\\"));
    } catch (e) {
        if (e.result != Components.results.NS_ERROR_FILE_UNRECOGNIZED_PATH) throw e;
        return;
    }
    if (file.exists() == false) {
        alert("File '" + fileName + "' not found.");
        return;
    }
    return file.path;
}

function fileNewChange(target, type, maxsize) {
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileName = target.value;
    if (fileName) var extend = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
    if (!type) {
        var AllowExt = ".jpg|.jpeg|.gif|.png|";
    } else if (type == 2) {
        var AllowExt = ".jpg|.jpeg|.gif|.png|.ico|";
    } else {
        var AllowExt = ".jpg|.jpeg|.gif|.png|.zip|.rar|.docx|.doc|.txt|";
    }

    var fileSize = 0;
    if (isIE && !target.files) {
        /*var filePath=getFilePath(target);
      //var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
      //var file = fileSystem.GetFile(filePath);
      //fileSize = file.Size;
      var image=new Image();
      image.dynsrc=filePath;
      image.onload=function(){
          fileSize =image.fileSize||target.files[0].fileSize;
      }*/
    } else {
        if (AllowExt != 0 && AllowExt.indexOf(extend + "|") == -1) {
            if (!type) {
                alert('仅支持上传jpg,jpeg,gif,png格式的图片!');
            } else if (type == 2) {
                alert('仅支持上传jpg,jpeg,gif,png,ico格式的图片!');
            } else {
                alert('仅支持上传图片、WORD文档、记事本、压缩包格式的文件!');
            }
            target.outerHTML = target.outerHTML;
            return false;
        }
        fileSize = target.files[0].size;
        maxsize = maxsize ? maxsize : 3072;
        var size = fileSize / 1024;
        if (size > maxsize) {
            if (maxsize < 1024) {
                alert("上传文件不能大于" + maxsize + "K");
            } else {
                alert("上传文件不能大于1M");
            }
            target.outerHTML = target.outerHTML;
            return false;
        } else {
            return true;
        }
    }

}
//设置表单参数值
function set_form_param_val(param_id, param_val) {
    $(window.frames["navigate_iframe"].document).find("#param_" + param_id).val(param_val);
}
//设置表单参数值
function set_form_param_val_two(param_id, param_val) {
    $(window.frames["navigate_iframe"].document).find("#" + param_id).val(param_val);
}

//设置背景图片
function set_form_param_val_sec(param_id,param_val){
    $(window.frames["navigate_iframe"].document).find("."+param_id).css("background","url("+param_val+")");
}

//设置上传头像的图片
function set_form_param_val_thr(param_id,param_val){
    $(window.frames["navigate_iframe"].document).find("."+param_id).attr("src",param_val);
}

//会议上传图片回显
function set_meet_imgshow_func(param_id, param_val) {
    $(window.frames["navigate_iframe"].document).find("#" + param_id).html(param_val);
}
// 产品焦点图回显
function set_meet_map_func(param_id,param_val,clear_img)
{
    var win_frames = $(window.frames["navigate_iframe"].document);
    win_frames.find("#"+param_id).html(param_val);
    win_frames.find("."+param_id).html(param_val);
    win_frames.find("#"+param_id).parent().append(clear_img);
    var this_url = win_frames.find("#min_img_icon .cur img").attr("src");
    win_frames.find("#show_img img").attr("src",this_url);
}

function get_more_pic_func(param_id) {
    return $(window.frames["navigate_iframe"].document).find("#" + param_id).html();
}

function no_blank(obj) {
    var val = $(obj).val();
    val = trim(val);
    if (val == '') {
        alert('此处不能为空！');
        $(obj).focus();
    }
}

/**
    首页模块-》添加类型数据列表返回值(追加到最前面)
    类型： qq  统计图  banner
*/
function set_window_module_param_val(obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    var content = val + iframe_obj[0].contentWindow.document.getElementById(obj_id).innerHTML;
    $(iframe_obj[0].contentWindow.document.getElementById(obj_id)).html($.trim(content));
    window.parent.close_window2(2);
}

/**
    首页模块-》添加类型数据列表返回值(追加到最后面)
    类型： qq  统计图  banner
*/
function set_window_module_param_last_val(obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    var content = iframe_obj[0].contentWindow.document.getElementById(obj_id).innerHTML + val;
    $(iframe_obj[0].contentWindow.document.getElementById(obj_id)).html($.trim(content));
    window.parent.close_window2(2);
}

/**
    首页模块-》修改类型返回值
    类型: banner
*/
function edit_window_module_param_val(obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    $(iframe_obj[0].contentWindow.document.getElementById(obj_id)).html($.trim(val));
    window.parent.close_window2(2);
}

// 首页模块-》添加类型数据列表返回值失败，返回主页面
function set_window_module_param_var_fail() {
    window.parent.close_window2(2);
}



// 验证是否为qq号
function check_qq_format(qq) {
    var is_qq = false;
    if (/^[0-9]{5,13}$/i.test(qq)) {
        is_qq = true;
        return is_qq;
    } else {
        is_qq = false;
        return is_qq;
    }
}

// 验证qq邮箱
function check_email(email) {
    var is_email = false;
    if (/^\w+([-+.]\w+)*@(qq|QQ).com/.test(email)) {
        is_email = true;
        return is_email;
    } else {
        is_email = false;
        return is_email;
    }
}

// 验证是否为正整数
function check_number(number) {
    var is_number = false;
    if (/^[0-9]\d*$/.test(number)) {
        is_number = true;
        return is_number;
    } else {
        is_number = false;
        return is_number;
    }
}

// 验证价格是否有效(后面只可以接2为小数)
function check_price(number) {
    var is_number = false;
    if (/^\d{1,10}(\.\d{1,2})?$/.test(number)) {
        is_number = true;
        return is_number;
    } else {
        is_number = false;
        return is_number;
    }
}

//验证QQ
function isQQ(qq) {
    if (qq.search(/^[1-9]\d{4,11}$/) != -1) {
        return true;
    } else {
        return false;
    }
}

// 获取字符串长度
function GetStringLength(str) {
    var realLength = 0,
        len = str.length,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

// 手机验证
function isPhone(Phone) {
    if (!Phone) return false;

    var reg = /(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
    return reg.test(Phone);
};

// 电话验证
function isTel(tel) {
    if (!tel) return false;

    var reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    return reg.test(tel);
};

// 验证 url
function isHost(str_url) {
    if (!str_url) return false;
    var myReg = new RegExp("^(http://\\w+\\.){1}(\\w+\\-*\\w+\\.){1,2}[a-zA-Z]{2,6}$");
    return myReg.test(str_url);
}


//创建新窗体
function create_window5(title, width, height, url) {
    if (!width) width = 300;
    if (!height) height = 150;
    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];
    w5 = dhxWins.createWindow("w5", left_width, top_height, width, height);
    w5.setText(title);
    w5.button("park").hide();
    w5.button("minmax1").hide();
    w5.attachURL(url);
    w5.denyResize();
    w5.setIcon();
    w5.setModal(true);
}

//创建新窗体
function create_window6(title, width, height, url) {
    if (!width) width = 300;
    if (!height) height = 150;
    var tmp_arr = set_bg(width, height);
    var top_height = top_height ? top_height : tmp_arr[0];
    var left_width = tmp_arr[1];
    w6 = dhxWins.createWindow("w6", left_width, top_height, width, height);
    w6.setText(title);
    w6.button("park").hide();
    w6.button("minmax1").hide();
    w6.attachURL(url);
    w6.denyResize();
    w6.setIcon();
    w6.setModal(true);
}


// 关闭图片页面
function pic_uplode_over(pic_url_id, show_pic_id, val, type) {
    if (type == 2) {
        window.parent.set_window_banner_pic_val(pic_url_id, show_pic_id, val);
    } else {
        window.parent.set_window_pic_val(pic_url_id, show_pic_id, val, type);
    }
    window.parent.close_window2(5);

}
function pic_editor_over(pic_url_id, show_pic_id, val, type) {
    if (type == 2) {
        window.parent.set_window_banner_pic_val(pic_url_id, show_pic_id, val);
    } else {
        window.parent.set_window_pic_val(pic_url_id, show_pic_id, val, type);
    }
}
// 写入幻灯片图片地址
function set_window_banner_pic_val(pic_url_id, show_pic_id, val) {
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[1].contentWindow.document.getElementById(pic_url_id).value = val;
    iframe_obj[1].contentWindow.document.getElementById(show_pic_id).style.display = "";
    var pic_url = '<img src="' + val + '"  width="200" height="100">';
    iframe_obj[1].contentWindow.document.getElementById(show_pic_id).innerHTML = pic_url;
    iframe_obj[1].contentWindow.document.getElementById('edit_pic').style.display = "";
    //iframe_obj[1].contentWindow.friame_kg();
}

// 写入图片地址
function set_window_pic_val(pic_url_id, show_pic_id, val, type) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[0].contentWindow.document.getElementById(pic_url_id).value = val;
    iframe_obj[0].contentWindow.document.getElementById(show_pic_id).style.display = "";
    if (type == 1) {
        var pic_url = '<img src="' + val + '"  width="200" height="100">';
    } else {
        var pic_url = '<img src="' + val + '"  >';
    }
    iframe_obj[0].contentWindow.document.getElementById(show_pic_id).innerHTML = pic_url;
    iframe_obj[0].contentWindow.document.getElementById('edit_pic').style.display = "";
    //iframe_obj[0].contentWindow.friame_kg();
}

//给某个窗体传值
function set_window_id_val_two(wid, obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');

    iframe_obj[1].contentWindow.document.getElementById(obj_id).value = val;
}

//给某个窗体传html值
function set_window_id_html(wid, obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[1].contentWindow.document.getElementById(obj_id).innerHTML = val;
}

// 隐藏/显示某个窗口 div
function set_window_id_show_hide(wid, obj_id, status) {
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[1].contentWindow.document.getElementById(obj_id).style.display = status;
}

function set_window_id_show_hide_1(obj_id, status) {
    if (document.getElementById("alertFrame")) {
        document.getElementById("alertFrame").contentWindow.document.getElementById(obj_id).style.display = status;
    } else {
        document.getElementById("navigate_iframe").contentWindow.document.getElementById(obj_id).style.display = status;
    }
}

//调用 but group 方法
function set_window_but_group_function(wid, obj_id, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[1].contentWindow.add_rm_pic_size_option(obj_id, val);
}

function tj_get_window_location_class_title(fId) {
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[0].contentWindow.refreshAddData(fId);
    window.parent.close_window2(2);
}

// 导航选择样式
function set_window_module_nav_val(name, val) {
    //访问父窗口
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    $(iframe_obj[0].contentWindow.document.getElementById("style_id")).html("已选择了" + $.trim(name) + "样式");
    $(iframe_obj[0].contentWindow.document.getElementById("model_id")).val($.trim(val));
    window.parent.close_window2(2);
}


//论坛小版块设置
function set_window_forum_config(id, value) {
    //访问父窗口
    var iframe_obj = $("#navigate_iframe");
    var tmp_arr = value.split('#$#');
    $(iframe_obj[0].contentWindow.document.getElementById('name_' + id)).val(tmp_arr[0]);
    $(iframe_obj[0].contentWindow.document.getElementById('brief_' + id)).val(tmp_arr[1]);
    window.parent.close_window2(2);
}
//设置产品服务标签参数值
function setProductLabelImgOrSrc(isImg, param_id, param_val) {
    if (!isImg) {
        $(window.frames["navigate_iframe"].document).find("#" + param_id).attr('src', param_val);
    } else if (isImg == 1) {
        $(window.frames["navigate_iframe"].document).find("#" + param_id).val(param_val);
    } else if (isImg == 2) {
        $(window.frames["navigate_iframe"].document).find("#" + param_id).html(param_val);
    }
}

function callFrameFunction(findNum, closeNum, arr)
{
    var iframe_obj = $('.dhtmlx_wins_body_inner div iframe');
    iframe_obj[findNum].contentWindow.usuallyFun(arr);
    window.parent.close_window2(closeNum);
}
