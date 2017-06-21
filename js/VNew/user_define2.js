//设置模板
function set_mod(model_id,host,type){
    writeCookie("user_tmp_model_id_"+host,model_id,3600*5);
    writeCookie("user_tmp_color_id_"+host,'',3600*5);
    if(type==2){
        var url='/ajax_get_info2.php?type=1&version=2&model_id='+model_id+'&u='+UTCTimeDemo();
    }else{
        var url='/ajax_get_info2.php?type=1&model_id='+model_id+'&version=1&u='+UTCTimeDemo();
    }
    $('#middle_in2_2').load(url).ajaxSuccess(
            function(){
                $(this).show();
            }
        );
    is_save=true;
    var no_edit=0;
    if(now_model_id){
        if(now_model_id!=model_id)no_edit=1;
    }
    document.getElementById("navigate_iframe").src = 'http://'+window.parent.siteDomain+'/self_define/index.php?username='+host+'&is_frame=1&no_edit='+no_edit+'&is_action=2&frame_model_id='+model_id+'&u='+UTCTimeDemo();
    show_imsg('mbsave');
}

//设置模板颜色
function set_color(color_id,host){
    writeCookie("user_tmp_color_id_"+host,color_id,3600*5);
    var model_id = readCookie("user_tmp_model_id_"+host);
    document.getElementById("navigate_iframe").src = 'http://'+window.parent.siteDomain+'/self_define/index.php?username='+host+'&is_frame=1&frame_model_id='+model_id+'&frame_color_id='+color_id+'&u='+UTCTimeDemo();
}



//导航设置
function navi_manage(type){
    if(type==1){
        var url='/own_add_channel.php?is_frame=2';
    }else if(type==3){
        var url='/own_set_menu.php?is_frame=2';
    }else if(type==4){
        var url='/own_add_channel.php?is_frame=3';
    }else if(type==5){
        var url='/own_sj_channel.php?is_frame=2';
    }else{
        var url='/own_channel2.php?is_frame=2';
    }
    get_url_window(url,'栏目管理',680,430);
}

//导航设置
function tj_navi_manage(type){
    if(type==1){
        var url='/own_add_channel.php?is_frame=2&tj=1';
    }else if(type==3){
        var url='/own_set_menu.php?is_frame=2&tj=1';
    }else if(type==4){
        var url='/own_add_channel.php?is_frame=3&tj=1';
    }else if(type==5){
        var url='/own_sj_channel.php?is_frame=2&tj=1';
    }else if(type==6){
        var url='/user_make_content.php';
    }else{
        var url='/own_channel2.php?is_frame=2&tj=1';
    }
    get_url_window(url,'栏目管理',680,430);
}



//创建窗体
function get_url_window(url,title,width,height,no_top)
{
    if(!width)width=670;
    if(!height)height=430;
    var tmp_arr = set_bg(width,height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];

    get_url_window_new(url,title,width,height,no_top,top_height,left_width);
    /*setTimeout(function() {
        get_url_window_new(url,title,width,height,no_top,top_height,left_width);
    }, 500);*/
}

function get_url_window_new(url,title,width,height,no_top,top_height,left_width)
{
    var isWin = dhxWins.isWindow("w1");
    if(isWin==false){
        w1=dhxWins.createWindow("w1",left_width,top_height,width,height);
    }else{
        dhxWins.window("w1").setDimension(width,height);
        dhxWins.window("w1").setPosition(left_width,top_height);
    }
    dhxWins.window("w1").setText(title);
    dhxWins.window("w1").button("park").hide();
    dhxWins.window("w1").button("minmax1").hide();
    if(no_top==1){
         dhxWins.window("w1").hideHeader();
    }
    dhxWins.window("w1").denyResize();
    var t=url+'&etc='+new Date().getTime();
    dhxWins.window("w1").attachURL(url);
    dhxWins.window("w1").attachEvent("onClose", function(win){
       $('#bg_div').remove();
       return true;
    });
}

function get_url_window2(url,title,width,height)
{
    if(!width)width=670;
    if(!height)height=430;
    var tmp_arr = set_bg(width,height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];

    get_url_window2_new(url,title,width,height,top_height,left_width);
    /*setTimeout(function() {
        get_url_window2_new(url,title,width,height,top_height,left_width);
    }, 500);*/
}

function get_url_window2_new(url,title,width,height,top_height,left_width)
{
    var isWin = dhxWins.isWindow("w2");
    if(isWin==false){
        w2=dhxWins.createWindow("w2",left_width,top_height,width,height);
    }else{
        dhxWins.window("w2").setDimension(width,height);
        dhxWins.window("w2").setPosition(left_width,top_height);
    }
    dhxWins.window("w2").setText(title);
    dhxWins.window("w2").button("park").hide();
    dhxWins.window("w2").button("minmax1").hide();
    dhxWins.window("w2").denyResize();
    var t=url+'&etc='+new Date().getTime();
    dhxWins.window("w2").attachURL(url);
    dhxWins.window("w2").attachEvent("onClose", function(win){
       $('#bg_div').remove();
       return true;
    });
}

//设置圈主
function input_q(user_id,q_id){
    var status_value='';
    var status= document.getElementsByName("state");
    for(i=0;i<status.length;i++){
        if(status[i].checked){
            status_value=status[i].value;
        }
    }
    if(!status_value){
        show_msg_new("请选择您在圈子里的角色!");
        return;
    }
    var time = UTCTimeDemo();
    $.post("/ajax_get_info.php", {type:"15",userid:user_id,id:q_id,state:status_value,u:time},
    function(data){
            if(data==0){
                show_msg_new('他已经是您的好友了，不要重复添加！');
            }else{
                show_msg_new('添加成功！');
            }
       }
     );
    dhxWins.window("w1").close();
}

//关闭窗体
function close_window(tag){
   if(tag){
     dhxWins.window(tag).close();
   }else{
     dhxWins.window("w1").close();
   }
}

function iframe_yulan(url,refre_url){
    $('#navigate_iframe').css('height',1500);
    $('#fanhui_url').val(refre_url);
    document.getElementById( "navigate_iframe").contentWindow.location.href = url;
    $('#yulan_div').show();
}

function change_iframe_height(height){
    if(height){
        $('#navigate_iframe').css('height',height);
    }else{
        $('#navigate_iframe').css('height',1500);
    }
}

function show_refer(){
    var fanhui_url=$('#fanhui_url').val();
    if(fanhui_url){
        var fanhui_url=fanhui_url.replace('modle_id','');
    }
    if(fanhui_url){
        iframe_location2(fanhui_url);
    }
    $('#yulan_div').hide();
    to_edit_con();
}

//定位
function to_edit_con(){
    location.href='#edit_con';
}

//确定保存模版
function save_temp(tag,url){
    if(tag==1){
        location.href='/user_make_style.php?save=1';
    }
    if(tag==2){
        writeCookie("user_tmp_model_id_"+user_name,'',3600*5);
        if(!url || url=='undefined'){
            close_vmsg();
            return false;
        }else{
            location.href=url;
        }
    }
}

function show_huodong(url,pic_url){
    var tmp_arr = set_bg(500,300);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];

    var float_div = '<div id="v_msg" style="position:absolute;left:'+left_width+'px;top:'+top_height+'px;z-index:99;width:500px;height:300px;overflow:hidden;" align="center"><div style="position:relative"><a href="'+url+'"><img src="'+pic_url+'"></a><a href="javascript:close_vmsg()" style="position:absolute;top:10px;right:10px;font-size:20px;color:#ffffff">×</a></div></div>';

    $('body').append(float_div);
}


function v_msg(msg_tag,face,is_frame,type,url){
    if(msg_tag==3){
        var width=600;
        var height=210;
    }else{
        var width=500;
        var height=200;
    }
    var tmp_arr = set_bg(width,height);
    var top_height = tmp_arr[0];
    var left_width = tmp_arr[1];


    var float_div = '<div id="v_msg" style="position:absolute;left:'+left_width+'px;top:'+top_height+'px;z-index:99;width:'+width+'px;height:'+height+'px;overflow:hidden;" align="center"></div>';
    $('body').append(float_div);

    var url='/vmsg.php?msg_tag='+msg_tag+'&type='+type+'&face='+face+'&is_frame='+is_frame+'&url='+escape(url)+'&u='+new Date().getTime();
    $('#v_msg').load(url).ajaxSuccess(
        function(){
            $(this).show();
        }
    );
}

function close_vmsg(){
    $('#bg_div').remove();
    $('#v_msg').remove();
}

function show_v_list(){
    if($("#vmsg_con").is(":hidden")){
        $('#vmsg_con').show();
        $('.vmsg_div').css('width','255px');
    }else{
        $('#vmsg_con').hide();
        $('.vmsg_div').css('width','45px');
    }
}
//提交信息
function tijiao_vmsg(){
    var msg_con=$('#msg_content').val();
    msg_con=trim(msg_con);
    if(msg_con && msg_con!='我要提问'){
        if(strLen(msg_con)>500){
            $('#msg_content').focus();
            show_msg_new('问题不能超过250个汉字或500个字符！');
        }else{
            var time =UTCTimeDemo();
            $.post("/ajax_get_info.php", {type:"111",msg_con:msg_con,u:time},
            function(data){
                    if(data==1){
                        show_msg_new('提交成功，我们将尽快以短消息的方式回复给您！:)');
                        $('#msg_con').val('');
                    }else{
                        show_msg_new('操作超时，请重新提交！:(');
                    }
               }
             );
        }
    }else{
        $('#msg_content').focus();
        show_msg_new('请先填写问题！：）');
    }
}

function show_msg_con(id,list_type){
    var url='/ajax_get_info.php?type=110&id='+id+'&menu_sub='+menu_sub+'&list_type='+list_type+'&u='+UTCTimeDemo();
    $('#vmsg_item').load(url).ajaxSuccess(
        function(){
            $(this).show();
        }
    );
}

function show_msg_item(tmp_tag,list_type){
    var time =UTCTimeDemo();
    menu_sub=tmp_tag;
    $.post("/ajax_get_info.php", {type:"109",menu_sub:menu_sub,list_type:list_type,u:time},
    function(data){
            if(data){
                vmsg_item(data);
            }else{
                if(list_type==1){
                    vmsg_item('<dd>暂无相关问题！</dd>');
                }else{
                    vmsg_item();
                }
            }
       }
     );
    //to_edit_con();
}

function vmsg_item(items){
    if(items){
        $('#vmsg_item').html(items);
        $('.vmsg_div').show();
    }else{
        $('.vmsg_div').hide();
    }
}
function vmsg_define(){
    var msg_con=$('#msg_content').val();
    msg_con=trim(msg_con);
    if(msg_con=='我要提问'){
        $('#msg_content').val('');
    }
}

function show_demo(){
    var title="建站演示";
    var url="/v_demo.php";
    get_url_window(url,title,980,540);
}

function show_demo2(){
    close_vmsg();
    show_demo();
}

//观看视频教程
function show_demo3(){
    close_vmsg();
    show_video(1);
}

function shoucang(url,name){
    window.external.addFavorite(url,name);
}

function changeBodyBg1(obj){
     navigate_iframe=document.getElementById("navigate_iframe").contentWindow;
     navigate_iframe.document.body.style.backgroundImage="url("+obj.value+")";
}
//显示视频
function show_video(tag){
    var url='/show_video.php?show_no='+tag+'&u='+UTCTimeDemo();
    var title="视频教程";
    get_url_window(url,title,680,580);
}

//手动左右滚动产品效果——类
function collect_list_move(n,t){
    var ContN = $(n).parent();
    var $list_ul=ContN.find("ul");
    var $list_ul_par=$list_ul.parent();
    var $list_li_num=$list_ul.find("li").length;
    var $list_li_Lborder=parseInt($list_ul.find("li").css("border-left-width"));
    var $list_li_Rborder=parseInt($list_ul.find("li").css("border-right-width"));
    var $list_li_Lpadd=parseInt($list_ul.find("li").css("padding-left"));
    var $list_li_Rpadd=parseInt($list_ul.find("li").css("padding-left"));
        $list_li_Lborder=isNaN($list_li_Lborder)?0:$list_li_Lborder;
        $list_li_Rborder=isNaN($list_li_Rborder)?0:$list_li_Rborder;
    var $list_li_Rmargin=parseInt($list_ul.find("li").css('margin-right'));
    var $list_li_Lmargin=parseInt($list_ul.find("li").css('margin-left'));
    var $list_li_margin=$list_li_Rmargin+$list_li_Lmargin;
    var $list_li_padd=$list_li_Lpadd+$list_li_Rpadd;
    var $list_li_Wborder=$list_li_Lborder+$list_li_Rborder;
    var $list_li_width=$list_ul.find("li").width()+$list_li_margin+$list_li_Wborder+$list_li_padd;
    var $show_num=Math.round(($list_ul_par.width())/$list_li_width);
    var $list_ul_left=(0-parseInt($list_ul.css("left")));
    var $page = Math.ceil($list_li_num/$show_num);
    var $ul_width=$list_li_width*$list_li_num;
    var $move=$show_num*$list_li_width;
    var $oldMove=$list_ul_left+$move;
    var $newMove=$ul_width-$oldMove;
    if(t ==1){
        if($newMove>0){
          if($newMove>$move){
            $list_ul.stop().animate({"left":"-="+$move},500);
           $(n).parent().find(".left-but").addClass("left-but-off");
          }else{
            $list_ul.stop().animate({"left":"-="+$newMove},500);
           $(n).parent().find(".right-but").addClass("right-but-off");
           $(n).parent().find(".left-but").addClass("left-but-off");
          }
        }
    }else{
        if($list_ul_left>0){
          if($list_ul_left>$move){
            $list_ul.stop().animate({"left":"+="+$move},500);
           $(n).parent().find(".right-but").removeClass("right-but-off");
          }else{
            $list_ul.stop().animate({"left":"+="+$list_ul_left},500);
           $(n).parent().find(".left-but").removeClass("left-but-off");
           $(n).parent().find(".right-but").removeClass("right-but-off");
          }
        }
    }
}
/*--手动左右滚动产品function--*/
var flow_collect_list=function(){
  $(".right-but").click(function(){
      collect_list_move(this,1);
  });
  $(".left-but").click(function(){
      collect_list_move(this,2);
  });
};
