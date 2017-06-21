//编辑系统内容
var parent_host=window.parent.location.host;
function show_system(tag){
	var url='http://'+parent_host+'/';
	var tmp_url,title,tmp_width,tmp_height,tmp_param,user_name;
	tmp_width = 650;
	tmp_height = 505;
	var xxx = 0;
	if($.browser.msie){
		xxx = 15;
	}
	tmp_param ='is_frame=2';
	if(tag=='top'){
		tmp_height = 505+xxx;
		tmp_url='own_set_top';
		title='顶部栏目管理';
	}
	if(tag=='search'){
		tmp_url='tj_index_module_search';
		title='编辑内容';
	}
	if(tag=='foot_doc'){
		tmp_url='own_add_foot_doc.php';
		title='底部文章';
		tmp_height = 450;
	}
	if(tag=='linksite'){
		tmp_url='add_link_site.php';
		tmp_height = 505+xxx;
		title='编辑内容';
	}
	if(tag=='foot'){
		tmp_width = 800;
		tmp_height = 600;

		tmp_url='add_foot.php';
		title='底部栏目管理';
	}
	if(tag=='logo'){
		tmp_width = 800;
		tmp_height = 600;

		tmp_url='tj_logo_set';
		title='编辑网站页头';
	}
	if(tag=='banner'){
		tmp_url='tj_define_banner';
		title='管理焦点图';
	}
	var to_url=url+tmp_url+'?'+tmp_param+'&tj=1&u='+UTCTimeDemo();
	if(tag=='banner'){
		var copyid   = $("#webBody").data("copyid");
		to_url += '&copyid='+ copyid
	}
	window.parent.get_url_window(to_url,title,tmp_width,tmp_height);
}

function module_con_edit(link) {
	var tmp_width = 700;
	var tmp_height = 400;

	var url='http://'+parent_host+'/';
	to_url=url+link+'&u='+UTCTimeDemo();

	window.parent.get_url_window(to_url,'编辑内容',tmp_width,tmp_height);
}

function m_css_style_edit(link) {
	var tmp_width  = 668;
	var tmp_height = 526;

	var url='http://'+parent_host+'/';
	to_url=url+link+'&u='+UTCTimeDemo();

	window.parent.get_url_window(to_url,'样式设置',tmp_width,tmp_height);
}

//时间戳
function UTCTimeDemo(){
	   var now = new Date().getTime();
	   var datestr=escape(now*1000+Math.round(Math.random()*1000));
	   return datestr;
};

//初始化编辑标签
$(function(){
	$("a").each(function(){
		var tmp_href=$(this).attr('href');
		if(tmp_href!=undefined){
			tmp_href=$.trim(tmp_href);
			var pos=tmp_href.indexOf("javascript");
			if(tmp_href!='' && pos==-1  && tmp_href!='#' && tmp_href!='###'){
					var iSaveUrl = $(this).data("saveurl");
					if (parseInt(iSaveUrl) == 1) {
						if (tmp_href.indexOf("?") == -1) {
							tmp_href=tmp_href+'?is_frame=1&is_action=2';
						} else {
							tmp_href=tmp_href+'&is_frame=1&is_action=2';
						}
						$(this).on("click", function(){ iFrameOpenUrl(tmp_href); });
					}
				$(this).attr('href','###');
			}
		}
	});
});

function iFrameOpenUrl(sUrl) {
	if (!sUrl) { return false; }

	if (window.parent.Ev.pubVar.saveVar) {
		var confirmJson = {
			but_1 : {text:"确定", fun:function(){ window.parent.Ev.pubVar.saveVar=false; window.parent.Ev.admin.tj.fun.locationWIframe('http://'+ location.host + sUrl); }},
			but_2 : {text:"取消", fun:function(){ }}
		};
		window.parent.sysDefine.manage('您的页面有更改，您确定不保存并离开吗？', 3, confirmJson);
	} else {
		window.parent.Ev.admin.tj.fun.locationWIframe('http://'+ location.host + sUrl);
	}
}
