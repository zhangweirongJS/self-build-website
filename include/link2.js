/**
 * Created by Administrator on 2017/3/8 0008.
 */

//设置超链接
function show_iframe(is_frame,id, type, fileId){
    if (!type)  type = 1;
    if (!fileId)  fileId = '';
    var url='/show_link?id='+id+'&type='+type+'&is_frame='+is_frame+'&fileId='+fileId;
    window.parent.create_window6('查找站内链接-<span style="font-size:12px;font-weight:normal">未找到，请先添加栏目内容</span>',780,430,url);
}

//设置手机超链接
function show_wap_iframe(is_frame,id, type, fileId){
    if (!type)  type = 1;
    if (!fileId)  fileId = '';
    var url='./show_wap_link.php?id='+id+'&type='+type+'&is_frame='+is_frame+'&fileId='+fileId;
    window.parent.create_window6('查找站内链接-<span style="font-size:12px;font-weight:normal">未找到，请先添加栏目内容</span>',780,410,url);
}

function wap_find_web_link(url){
    if (!url) 	return false;
    window.parent.create_window6('查找站内链接-<span style="font-size:12px;font-weight:normal">未找到，请先添加栏目内容</span>',780,410,url);
}

//移出超链接
function remove_iframe(tag){
    resize_editor_window();
    if(tag==1){
        $('#frame_div').hide();
        $('#subm_frame').attr('src','');
        window.parent.resize_window('w1','编辑模块',650,body_height,2);
    }
    if(tag==2){
        $('#frame_div2').hide();
        $('#select_subm_frame').css('width',760);
        $('#select_subm_frame').css('height',410);
        $('#select_subm_frame').attr('src','');
        window.parent.resize_window('w1','编辑模块',650,body_height,2);
    }
    if(tag==3){
        $('#frame_div').hide();
        $('#select_subm_frame').attr('src','');
        window.parent.resize_window('w1','导航设置',680,body_height,2);
    }
}

//图片选择器
function show_selector2(is_frame,id,is_small,t_width,t_height){
    var url='/pic_selector?id='+id+'&is_small='+is_small+'&is_frame='+is_frame+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    window.parent.create_window5('图片选择器',900,520,url);
}
//图片编辑器
function show_editor2(is_frame,id,is_small,t_width,t_height){
    var img_url = $("#img_url_b").val();
    img_url = encodeURIComponent(img_url);
    var url ='/PicEditor/PicEditor.php?imgurl='+img_url+'&id='+id+'&is_small='+is_small+'&is_frame='+is_frame+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    var j = {'width':1000,'height':600,'url':url};
    window.parent.Ev.pubFun.openXX(j);
}
//图片选择器
function show_selector2_new(is_frame,id,is_small,t_width,t_height){
    var url='/pic_selector?id='+id+'&is_small='+is_small+'&is_frame='+is_frame+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    $('#select_subm_frame').attr('src',url);
    window.parent.resize_window('w1','图片选择器',900,520,1);
    $('#frame_div2').show();
}

//加载图片编辑器
function show_pic_editor(url,width,height,type){
    $('#frame_div2').hide();
    $('#select_subm_frame').attr('src',url);
    if(type==2){
        window.parent.resize_window('w1','<font color="red">请将图片裁剪为，宽:'+width+'px 高:'+height+'px </font>',1000,450,2);
        $('#select_subm_frame').css('width',980);
        $('#select_subm_frame').css('height',410);
    }
    $('#frame_div2').show();
}

//重新定义
function resize_editor_window(){
    var body_height2=document.body.scrollHeight;
    if(body_height2>360){
        body_height=body_height2+40;
    }
}

// 添加qq数据
function module_add_qq(module_id, id) {
    var url = './own_module_add_qq.php?module_id='+ module_id +'&id='+ id;
    window.parent.create_window2s('添加QQ号码',266,200,url);
}

// 添加统计图数据
function module_add_statistics(module_id, id) {
    var url = './own_module_add_statistics.php?module_id='+ module_id +'&id='+ id;
    window.parent.create_window2s('添加统计图数据',266,160,url);
}

// 添加幻灯片数据
function module_add_banner(module_id, id, width, height) {
    var url = './own_module_add_banner.php?module_id='+ module_id +'&width='+ width +'&height='+ height +'&id='+ id;
    window.parent.create_window2s('添加幻灯片',420,380,url);
}


/**
 tj 版新方法
 */

//图片选择器
function tj_show_selector(m_id){
    var t_width = $("#pic_width").html();
    var t_height = $("#pic_height").html();
    var url='/pic_selector?m_id='+m_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    window.parent.create_window5('图片选择器',900,520,url);
}
//图片编辑器
function tj_show_editor(m_id){
    var img_url = $("#pic").val();
    img_url = encodeURIComponent(img_url);
    var t_width = $("#pic_width").html();
    var t_height = $("#pic_height").html();
    var url ='/PicEditor/PicEditor.php?imgurl='+img_url+'&m_id='+m_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    var j = {'width':1000,'height':600,'url':url};
    window.parent.pubfn.openXX(j);
}
//图片选择器
function tj_show_selector2(m_id, t_width, t_height){
    var url='/pic_selector?m_id='+m_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    window.parent.create_window5('图片选择器',900,520,url);
}
//图片编辑器
function tj_show_editor2(m_id, t_width, t_height){
    var img_url = $("#pic").val();
    img_url = encodeURIComponent(img_url);
    var url ='/PicEditor/PicEditor.php?imgurl='+img_url+'&m_id='+m_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    var j = {'width':1000,'height':600,'url':url};
    window.parent.pubfn.openXX(j);
}
//图片选择器
function wap_show_selector(w_id, t_width, t_height){
    var url='/pic_selector?w_id='+w_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    window.parent.create_window5('图片选择器',900,520,url);
}
//图片选择器
function wap_show_editor(w_id, t_width, t_height){
    var img_url = $("#pic").val();
    img_url = encodeURIComponent(img_url);
    var url ='/PicEditor/PicEditor.php?imgurl='+img_url+'&w_id='+w_id+'&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    var j = {'width':1000,'height':600,'url':url};
    window.parent.pubfn.openXX(j);
}
//图片选择器(tj版自定义banner)
function tj_show_selector3(){
    var t_width = parseInt($("#pic_width").html());
    var t_height = parseInt($("#pic_height").html());
    var url='/pic_selector?tj=1&banner=1&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    window.parent.create_window5('图片选择器',900,520,url);
}
//图片编辑器(tj版自定义banner)
function tj_show_editor3(){
    var img_url = $("#pic").val();
    var t_width = parseInt($("#pic_width").html());
    var t_height = parseInt($("#pic_height").html());
    img_url = encodeURIComponent(img_url);
    var url ='/PicEditor/PicEditor.php?imgurl='+img_url+'&tj=1&banner=1&t_width='+t_width+'&t_height='+t_height+'&u='+UTCTimeDemo();
    var j = {'width':1000,'height':600,'url':url};
    window.parent.pubfn.openXX(j);
}
// 添加幻灯片数据
function tj_module_add_banner(module_id, id, width, height) {
    var url = './tj_module_add_banner.php?module_id='+ module_id +'&id='+id+'&width='+ width +'&height='+ height;
    window.parent.create_window2s('添加幻灯片',420,340,url);
}

// 添加幻灯片数据
function wap_module_add_banner(module_id, id, width, height) {
    var url = './wap_module_add_banner.php?module_id='+ module_id +'&id='+id+'&width='+ width +'&height='+ height;
    window.parent.create_window2s('添加幻灯片',420,340,url);
}

// 添加图片信息
function tj_module_add_p_c(module_id, id, title, type) {
    var url = './tj_module_add_p_c.php?module_id='+ module_id +'&id='+id;
    if (type == 5) {
        var tmp_height=450;
    } else {
        var tmp_height=380;
    }
    window.parent.create_window2s(title,420,tmp_height,url);
}

// 添加图片信息
function wap_module_add_p_c(module_id, id, title, type) {
    var url = './wap_module_add_p_c.php?module_id='+ module_id +'&id='+id;
    if (type == 5) {
        var tmp_height=450;
    } else {
        var tmp_height=380;
    }
    window.parent.create_window2s(title,420,tmp_height,url);
}

// 添加城市信息
function wap_module_add_city(module_id, id, title, type) {
    var url = './wap_module_add_city.php?module_id='+ module_id +'&id='+id;
    var tmp_height=450;
    window.parent.create_window2s(title,420,tmp_height,url);
}

// 添加双排图标
function wap_module_add_two_p_c(module_id, id, title, type) {
    var url = './wap_module_add_two_p_c.php?module_id='+ module_id +'&id='+id;
    window.parent.create_window2s(title,420,340,url);
}

// 添加按钮组
function wap_module_add_but_group(module_id, id, title) {
    var url = './wap_module_add_but_group.php?tubiao_style=1&module_id='+ module_id +'&id='+id;
    window.parent.create_window2s(title,620,530,url);
}

// 添加分级标题
function tj_module_add_class_title(con_id, module_id, id) {
    var url = './tj_module_add_class_title.php?module_id='+module_id+'&con_id='+con_id+'&id='+id;
    window.parent.create_window2s('添加目录', 420, 220, url);
}

// 添加分级标题
function add_channel_style(type) {
    var url = './own_channel_style.php?type='+type;
    window.parent.create_window2s('风格列表', 640, 320, url);
}

//全局分享设置
function wap_module_share(type, channel_id, class_id, product_id) {
    var url = './share_config.php?type='+type+'&channel_id='+channel_id+'&class_id='+class_id+'&product_id='+product_id;
    window.parent.create_window6('分享设置', 600, 400, url);
}

// 编辑论坛版区
function wap_module_bbsEdit(module_id, id) {
    var title = '编辑内容';
    var url = './wap_module_add_bbs.php?module_id='+ module_id +'&id='+id;
    window.parent.create_window2s(title,450,300,url);
}