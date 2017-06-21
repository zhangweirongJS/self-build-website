/**************** 前台页面公用的js方法 *******************/
// swf定义一个网站全局的对象，用来存储前台网站的各个方法。是webSiteFunction
wsf = {};
wsf.userLike = function(){

};
wsf.f = { //功能性函数
	s_j: function(st) { //字符串转换成json
		var j;
		if (!!st) {
			j = "{" + st + "}";
			j = eval('(' + j + ')');
			return j;
		} else {
			j = {};
			return j;
		}
	},
	j_s: function(j) { //将json转换成字符串
		var x = [];
		for (var i in j) {
			x.push(i + ":" + j[i]);
		}
		return x.join(",");
	},
	addLoadingWait: function(o) { //添加loadingWait
		o = o ? o : $('body');
		var w = o.width(),
			h = o.height();
		var loading = $('<div class="loading-wait" style="width:' + w + 'px; height:' + h + 'px;"></div>');
		o.append(loading);
	},
	alertWindow : function(text, icon) {
		var icons = ['warn', 'error', 'right'];
		window.$.popup({
			// addTarget: parWin.Ev.pubVar.winDocum.find("body"),
			type: 1,
			animate: {
				type: 1,
				target: 1
			},
			head: {
				yes: 0
			},
			opBut: {
				yes: 0
			},
			autoClose: {
				yes: 1,
				time: 1.5
			},
			but: {
				yes: 0
			},
			con: {
				text: [1, text],
				img: [1, icons[icon]]
			}
		});
	},
	openWin: function(tit, url,w, h) {
		w = w ? w : 600;
		h = h ? h : 500;
        var popups = $.popup({
        	cName : "evPopupOpacity",
            type: 5,
            area: {w: w,h: h},
            head: {text: tit},
            animate: {type: 1},
            con: {src: url}
        });
        return {w : $("#popupIframe_"+popups),n : popups};
    },
    reg : {
    	phoneTelDigit : function(v){
			var reg = /((^(\+86|86)?[0]?1[3578]\d{9})|(^\d{3,4}\-\d{7,8})|(^\d{3,4}\-\d{7,8})\-\d{1,4})$/;
			var z = reg.test(v);
			return z;
		}
    }
};
// 站点导航的方法,主要作用是显示和隐藏子导航菜单。
wsf.nav = function(){
	$("#nav").on({
		mouseenter: function() {
			var that = $(this),
				sub = that.find("div.NSub");
			if (sub.length) {
				var l = that.offset().left,
					pl = sub.width() + l;
				if (pl > $(document).width()) {
					sub.css({
						left: 'auto',
						right: 0
					});
				}
				that.addClass('NItemSub');
			}
			if(!that.hasClass('NItemCur')){
				that.addClass("NItemH");
			}
		},
		mouseleave: function() {
			$(this).removeClass("NItemH");
			$(this).removeClass("NItemSub");

		}
	}, '.NItem');
};
// 站点搜索框方法,主要作用是显示和隐藏默认文字。
wsf.search = function(){
	var searchModule = $("#search");
	if(searchModule.length){
		searchModule.on({
			focus : function(){
				var t = $(this),v = t.val(),dv = t.data('defaultv');
				v == dv && t.val('');
			},
			blur : function(){
				var t = $(this),v = t.val(),dv = t.data('defaultv');
				(v == dv || !v) && t.val(dv);
			}
		},"#keyWord");
	}
};
/*网站的logo search shopCart 位置计算*/
// wsf.hoffL = function(){
// 	var logo = $("#logo"),searchs = $("#search"),shopCart = $("#shopping_car"),webNav = $('#web_nav'),
// 			hcL = Math.floor(($("body").width() - userSiteWidth)/2);
// 	logo.css({'left': parseInt(logo.css('left')) + hcL});
// 	searchs.css({'left': parseInt(searchs.css('left')) + hcL});
// 	shopCart.css({'left': parseInt(shopCart.css('left')) + hcL});
// 	if(parseInt(webNav.css('left')) > 0){
// 		webNav.css({'left': parseInt(webNav.css('left')) + hcL});
// 	}
// };
/*网站的logo search shopCart 位置计算*/
wsf.hoffL = function(){
	var j = 0;
	var p = function(obj,t){
		if(t == 'n'){
			if(obj.attr('data-l')){
				j = wsf.f.s_j(obj.attr('data-l'));
			}
		}else{
			if(obj.attr('data-s')){
				j = wsf.f.s_j(obj.attr('data-s'));
			}
		}
	};
	var logo = $("#logo"),searchs = $("#search"),shopCart = $("#shopping_car"),webNav = $('#web_nav');
	var hcL = Math.floor(($("body").width() - userSiteWidth)/2);

	if(logo.length){
		p(logo);
		logo.css({'left': j.l + hcL});
	}
	if(searchs.length){
		p(searchs);
		searchs.css({'left': j.l + hcL});
	}
	if(shopCart.length){
		p(shopCart);
		shopCart.css({'left': j.l + hcL});
	}
	if(webNav.length){
		p(webNav,'n');
		if(j.p == 1 || j.p == 3){
			webNav.css({'left': j.l + hcL});
		}
	}
};

// 兼容老用户的logo,search,shopping上边距定位
wsf.hoffT = function(){
	var logo = $("#logo"),searchs = $("#search"),shopCar = $("#shopping_car"),
			logoT = parseInt(logo.css('top')),searchT =  parseInt(searchs.css('top')),shopCarT = parseInt(shopCar.css('top')),topH = $("#top_area").outerHeight();
	logo.css({top : logoT + topH +'px'});
	searchs.css({top : searchT + topH +'px'});
	shopCar.css({top : shopCarT + topH +'px'});
};
/*
fixedShopcar
主要用来显示前台的浮动购物车，和里边的一些方法
 */
wsf.fixedShopcar = function(){
	var fixedShopcar = $("#fixedShopcar"),
		shopcarAlert = fixedShopcar.find("div.shopcar-alert"),
		listBody = fixedShopcar.find("dd.shopcar-list-body"),
		listUl = listBody.find(".shopcar-list-ul");
	listBody.cScroll({
		w: 10,
		tbB: false
	});
	fixedShopcar.on({
		click: function() {
			var that = $(this);
			if (that.data("alertShow") == 1) {
				that.removeData("alertShow");
				shopcarAlert.css({
					'visibility': 'hidden'
				});
			} else {
				that.data("alertShow", 1);
				shopcarAlert.css({
					'visibility': 'visible'
				});
			}
		}
	}, ".shopcar-icon");
	fixedShopcar.on({
		click: function() {
			fixedShopcar.find(".shopcar-icon").removeData("alertShow");
			shopcarAlert.css({
				'visibility': 'hidden'
			});
		}
	}, ".shopcar-alert-close");
	listUl.on({
		click: function() {
			var par = $(this).parent().parent();
			par.animate({
				height: 0,
				opacity: 0
			}, 500, function() {
				$(this).remove();
				if (listUl.height() > listBody.height()) {
					listBody.cScroll({
						w: 10,
						tbB: false
					});
				} else {
					listBody.cScroll({
						w: 10,
						tbB: false
					});
					listBody.find(".c-scrollbar").hide();
				}
			});
		}
	}, "span.span-option a");
};
/*
	focus-pic-module
	createDate:2015/04/02
	模块内焦点图函数，主要是模块中的焦点图切换方法
*/
wsf.focusPicModule = function(){
	$("div.focus-pic-module").each(function() {
		var obj = $(this);
		var h = obj.parent().height(),
			w = obj.parent().width(),
			dd = obj.find("dd"),
			dl = obj.find("dl"),
			type = obj.data("type"),
			dir = obj.data("dir"),
			sum = dd.length,
			curi = 0,
			ni = curi + 1,
			times, move, fun;
		dl.css({
			"width": w + "px",
			"height": h + "px",
			"overflow": "hidden"
		});
		dd.css({
			"width": w + "px",
			"height": h + "px"
		});
		//判断设置的方向
		(function() {
			var scss;
			switch (dir) {
				case 1: //left
					scss = {
						left: (w + 10) + "px",
						top: 0
					};
					break;
				case 2: //right
					scss = {
						left: -(w + 10) + "px",
						top: 0
					};
					break;
				case 3: //top
					scss = {
						top: (h + 10) + "px",
						left: 0
					};
					break;
				case 4: //bottom
					scss = {
						top: -(h + 10) + "px",
						left: 0
					};
					break;
			}
			dd.each(function() {
				var that = $(this);
				if (that.index() != curi) {
					that.css(scss);
				} else {
					that.css({
						left: 0,
						top: 0
					});
				}
			});
		})();
		//判断设置的类型
		if (sum > 1) {
			(function() {
				switch (type) {
					case 1:
					case 2:
						var controls = $('<div class="focus-controls-list"></div>');
						for (var s = 0; s < sum; s++) {
							if (type == 1) {
								var span = $('<span>' + (s + 1) + '</span>');
								if (s === curi) {
									span = $('<span class="cur">' + (s + 1) + '</span>');
								}
							} else if (type == 2) {
								var span = $('<span></span>');
								if (s === curi) {
									span = $('<span class="cur"></span>');
								}
							}
							controls.append(span);
						}
						obj.append(controls);
						fun = function(i) {
							obj.find(".focus-controls-list span:eq(" + i + ")").addClass("cur").siblings().removeClass("cur");
						};
						obj.on({
							click: function() {
								var indexs = $(this).index();
								if (indexs != curi) {
									if (!obj.data("move")) {
										move(indexs);
									}
								}
							}
						}, ".focus-controls-list span");
						break;
					case 3:
						var nextBtn = $('<span class="focus-pic-next"></span>'),
							prevBtn = $('<span class="focus-pic-prev"></span>');
						obj.append(nextBtn, prevBtn);
						obj.on({
							mouseenter: function() {
								var this_ = $(this);
								if (!this_.data("type3btn")) {
									obj.find(".focus-pic-next,.focus-pic-prev").css({
										visibility: 'visible'
									});
									this_.data("type3btn", 1);
								}
							},
							mouseleave: function() {
								var this_ = $(this);
								if (this_.data("type3btn") == 1) {
									obj.find(".focus-pic-next,.focus-pic-prev").css({
										visibility: 'hidden'
									});
									this_.removeData("type3btn");
								}
							}
						});
						fun = function(i) {
							obj.find(".focus-pic-next").data("num", i + 1);
							obj.find(".focus-pic-prev").data("num", i - 1);
						};
						fun(curi);
						obj.find(".focus-pic-next").on("click", function() {
							if (!obj.data("move")) {
								move($(this).data('num'));
							}
						});
						obj.find(".focus-pic-prev").on('click', function() {
							if (!obj.data("move")) {
								move($(this).data('num'));
							}
						});
						break;
				}
			})();
			//移动函数
			function move(c) {
				if (c == sum) {
					c = 0;
				}
				if (c < 0) {
					c = sum - 1;
				}
				obj.data("move", 1);
				var chNum = function() {
					curi = c;
					ni = c + 1;
					obj.data("move", 0);
				};
				if (dir == 1) {
					$(dd[c]).animate({
						left: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						left: -w
					}, 1000, function() {
						$(this).css({
							left: (w + 10) + "px"
						});
					});
				}
				if (dir == 2) {
					$(dd[c]).animate({
						left: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						left: w
					}, 1000, function() {
						$(this).css({
							left: -(w + 10) + "px"
						});
					});
				}
				if (dir == 3) {
					$(dd[c]).animate({
						top: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						top: -(h + 10)
					}, 1000, function() {
						$(this).css({
							top: (h + 10) + "px"
						});
					});
				}
				if (dir == 4) {
					$(dd[c]).animate({
						top: 0
					}, 1000, function() {
						chNum();
					});
					$(dd[curi]).animate({
						top: h + 10
					}, 1000, function() {
						$(this).css({
							top: -(h + 10) + "px"
						});
					});
				}
				fun(c);
			}
			var setTime = function() {
				times = setInterval(function() {
					move(ni);
				}, 5000);
			};
			obj.on({
				mouseenter: function() {
					clearInterval(times);
				},
				mouseleave: function() {
					setTime();
				}
			});
			setTime();
		}
	});
};
/*
	pic-text-list-module
	createDate:2015/07/20
	changeDate:2016/12/20==>为了解决编辑状态下dom更新后不能用的问题。
	文本列表，图文信息列表模块的方法
*/
wsf.textListModule = function(obj){
	var fun = function(t){
		if(!t.data('bindevent')){
			t.on({
				mouseenter : function(){
					$(this).addClass("liHover");
				},
				mouseleave : function(){
					$(this).removeClass("liHover");
				}
			},"li");
			t.data('bindevent',1);
		}
	};
	if(obj){
		fun(obj);
	}else{
		$("div.text-list-module").each(function(){
			fun($(this));
		});
		$("div.pic-text-list-module").each(function(){
			fun($(this));
		});
	}
};
/*列表页25的js效果*/
wsf.picTextList_changePic = function(){
	/* 更换图片效果 */
	$('.b-listpage-pic-text-list-3').on({
		click : function(){
			var t = $(this),src = t.find('img').attr('src'),lip = t.parents('li'),picimg = lip.find(".pics img");
			picimg.attr('src', src);
			t.addClass('pl-list-dd-cur').siblings().removeClass('pl-list-dd-cur');
		}
	},'.pl-small-pic-list .pl-list-dd');
	/*显示隐藏收藏*/
	$('.b-listpage-pic-text-list-3').on({
		mouseenter : function(){
			var t = $(this),plCollect = t.find(".pl-collect");
			plCollect.animate({right : 0},100);
		},
		mouseleave : function(){
			var t = $(this),plCollect = t.find(".pl-collect");
			plCollect.animate({right : -100},100);
		}
	},'.pics');
	$('.b-listpage-pic-text-list-3').on({
		click : function(){
			var t = $(this),div = t.children('div');

			var timestamp = Date.parse(new Date());
			var url = '/dom/user_collect_add.php?timestamp=' + timestamp;
			var data = {
				'title': t.data("name"),
				'type': t.data("type"),
				'doc_id': t.data("id"),
				'channel_id': channel_id,
				'username': user_name,
				'wap': 0
			};
			$.ajax({
				'url': url,
				type: "POST",
				async: false,
				cache: false,
				data: data,
				success: function(data) {
					if (data == 1) {
						//`div.attr('class','no-collect').find("b").text('收藏');
						div.attr('class','yes-collect').find("b").text('已收藏');
						alert("收藏成功！");
					} else if (data == 2) {
						alert('收藏失败，您还没有登录，登录后请您重新收藏！');
						window.location.href="/dom/denglu.php?username="+ user_name;
						return false;
					} else if (data == 3) {
						div.attr('class','yes-collect').find("b").text('已收藏');
						alert("您已经收藏过，可在个人中心查看！");
						return false;
					} else if (data == 4) {
						alert("参数错误！");
						return false;
					}
				}
			});
			return false;
		}
	},'.pl-collect');
};
/* 交互动画的json对象 */
wsf.interactJ = {
	a_1 : {
		typeJ : {
			t_1 : 'int-onlyimg-larger',
			t_2 : 'int-onlyimg-small',
			t_3 : 'int-onlyimg-move-left',
			t_4 : 'int-onlyimg-move-right',
			t_5 : 'int-onlyimg-move-top',
			t_6 : 'int-onlyimg-move-down',
			t_7 : 'int-onlyimg-rotate-left',
			t_8 : 'int-onlyimg-rotate-right'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
		}
	},
	a_2 : {
		typeJ : {
			t_1 : 'int-bigglass-fade',
			t_2 : 'int-bigglass-magnify',
			t_3 : 'int-bigglass-shrink',
			t_4 : 'int-bigglass-slide-left',
			t_5 : 'int-bigglass-slide-right',
			t_6 : 'int-bigglass-slide-up',
			t_7 : 'int-bigglass-slide-down'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><img src="/images/VNew/magnifying_glass_img.png" /></div></div>';
				obj.append(domhtml);
			}
		}
	},
	a_3 : { 
		typeJ : {
			t_1 : 'int-changeimg-fade',
			t_2 : 'int-changeimg-magnify',
			t_3 : 'int-changeimg-shrink',
			t_4 : 'int-changeimg-slide-left',
			t_5 : 'int-changeimg-slide-right',
			t_6 : 'int-changeimg-slide-up',
			t_7 : 'int-changeimg-slide-down',
			t_8 : 'int-changeimg-slide-leftup',
			t_9 : 'int-changeimg-slide-rightup',
			t_10 : 'int-changeimg-slide-leftdown',
			t_11 : 'int-changeimg-slide-rightdown',
			t_12 : 'int-changeimg-push-left',
			t_13 : 'int-changeimg-push-right',
			t_14 : 'int-changeimg-push-up',
			t_15 : 'int-changeimg-push-down',
			t_16 : 'int-changeimg-hinge-left',
			t_17 : 'int-changeimg-hinge-right',
			t_18 : 'int-changeimg-hinge-up',
			t_19 : 'int-changeimg-hinge-down',
			t_20 : 'int-changeimg-flip-horiz',
			t_21 : 'int-changeimg-flip-vert',
			t_22 : 'int-changeimg-flip-diag-l',
			t_23 : 'int-changeimg-flip-diag-r',
			t_24 : 'int-changeimg-shutter-out-horiz',
			t_25 : 'int-changeimg-shutter-out-vert',
			t_26 : 'int-changeimg-shutter-out-diag-l',
			t_27 : 'int-changeimg-shutter-out-diag-r'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var nImgUrl = obj.data('nimgurl');
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><img src="'+ nImgUrl +'" /></div></div>';
				obj.append(domhtml);
			}
		}
	},
	a_4 : { 
		typeJ : {
			t_1 : 'int-showAttr-fade',
			t_2 : 'int-showAttr-magnify',
			t_3 : 'int-showAttr-shrink',
			t_4 : 'int-showAttr-slide-left',
			t_5 : 'int-showAttr-slide-right',
			t_6 : 'int-showAttr-slide-up',
			t_7 : 'int-showAttr-slide-down',
			t_8 : 'int-showAttr-slide-leftup',
			t_9 : 'int-showAttr-slide-rightup',
			t_10 : 'int-showAttr-slide-leftdown',
			t_11 : 'int-showAttr-slide-rightdown',
			t_12 : 'int-showAttr-hinge-left',
			t_13 : 'int-showAttr-hinge-right',
			t_14 : 'int-showAttr-hinge-up',
			t_15 : 'int-showAttr-hinge-down',
			t_16 : 'int-showAttr-shutter-out-horiz',
			t_17 : 'int-showAttr-shutter-out-vert',
			t_18 : 'int-showAttr-shutter-out-diag-l',
			t_19 : 'int-showAttr-shutter-out-diag-r'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var ntitle = obj.data('ntitle'),nintro = obj.data('nintro'),picH = obj.height();
				ntitle = ntitle ? ntitle : '这是标题';
				nintro = nintro ? nintro : '这是介绍';
				var domhtml = $('<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><div class="show-attr"><h3>' + ntitle + '</h3><p>' + nintro + '</p></div></div></div>');
				obj.append(domhtml);
				var showAttr = domhtml.find('.figcaption'),attrH = showAttr.height(),attrT = (picH - attrH)/2;
				showAttr.css({top : attrT + 'px'});
			}
		}
	},
	a_5 : {
		typeJ : {
			t_1 : 'int-showTitle-fade',
			t_2 : 'int-showTitle-magnify',
			t_3 : 'int-showTitle-shrink',
			t_4 : 'int-showTitle-slide-left',
			t_5 : 'int-showTitle-slide-right',
			t_6 : 'int-showTitle-slide-up',
			t_7 : 'int-showTitle-slide-down',
			t_8 : 'int-showTitle-slide-leftup',
			t_9 : 'int-showTitle-slide-rightup',
			t_10 : 'int-showTitle-slide-leftdown',
			t_11 : 'int-showTitle-slide-rightdown',
			t_12 : 'int-showTitle-shutter-out-horiz',
			t_13 : 'int-showTitle-shutter-out-vert'
		},
		aClass: 'int-dom',
		addDom : function(obj,j){
			obj.addClass(this.aClass +' ' + this.typeJ['t_' + j.t]);
			if(this.typeJ['t_' + j.t]){
				var ntitle = obj.data('ntitle');
				ntitle = ntitle ? ntitle : '这是标题';
				var domhtml = '<div class="int-add-dom"><div class="bgzz"></div><div class="figcaption"><div class="show-attr"><h3>' + ntitle + '</h3></div></div></div>';
				obj.append(domhtml);
			}
		}
	}
};
/* 交互动画的方法 */
wsf.interactFun = function(){
	var picTextListModule = $(".pic-text-list-module"),picTextModule = $(".pic-text-module"),picModule = $('.pic-module');
	/* 图文信息，橱窗的图片交互 */
	picTextListModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				that.find("li").each(function(){
					var t = $(this),pic = t.find('.pic');
					wsf.interactJ['a_' + interact.a].addDom(pic, interact);
				});
			}
		}
	});
	/* 图文混排的图片交互 */
	picTextModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				var pic = that.find('.pic');
				wsf.interactJ['a_' + interact.a].addDom(pic, interact);
			}
		}
	});
	/* 单张图片交互 */
	picModule.each(function(){
		var that = $(this),interact = that.data('interact');
		interact = interact ? wsf.f.s_j(interact) : interact;
		if(interact){
			if(wsf.interactJ['a_' + interact.a]){
				var pic = that.find('.pic');
				wsf.interactJ['a_' + interact.a].addDom(pic, interact);
			}
		}
	});
};
/* 交互动画类型4的属性居中方法 */
wsf.interactFun_ = function(){
	$('.pic[class*="int-showAttr-"]').each(function(){
		var t = $(this),figcaption = t.find('.figcaption'),top_ = (t.height() - figcaption.height())/2;
		figcaption.css({top : top_ + 'px'});
	});
};
/*
	catalogList
	树形分类目录主要是模块的分类目录js，包括上下移动
 */
wsf.catalogList = function(obj_) {
	var catalogH = function(obj) {
			var oneDl = obj.children("dl.oneClassList");
			if (obj.height() < oneDl.height() || parseInt(oneDl.css("margin-top"), 10) < 0) {
				obj.find("big.but").show();
			} else {
				obj.find("big.but").hide();
			}
		},
		move = function(obj, dir) {
			var oneDl = obj.find("dl.oneClassList"),
				t_h = obj.height(),
				dl_t = Math.abs(parseInt(oneDl.css("margin-top"), 10)),
				dl_sh = oneDl.height() - dl_t,
				judge;

			if (dir == 'up') {
				judge = (dl_sh - t_h) > 0 ? true : false;
			} else if (dir == 'down') {
				judge = dl_t > 0 ? true : false;
				t_h = -t_h;
			}

			if (judge) {
				if (oneDl.data('moving') != 1) {
					oneDl.data('moving', 1);
					oneDl.animate({
						marginTop: -(dl_t + t_h / 3)
					}, 500, function() {
						oneDl.removeData('moving', 1);
					});
				}
			}
		},
		fun = function(t) {
			if(!t.data('bindevent')){
				t.css({
					height: t.parent().height() + "px",
					width: t.parent().width() + "px"
				});
				//给类别绑定展开闭合子类事件
				t.on({
					click: function() {
						var this_ = $(this),
							pDt = this_.parent().parent(),
							num;
						if (pDt.hasClass('oneClassT')) {
							num = 'one'
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two'
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three'
						}
						if (this_.hasClass('open')) {
							pDt.removeClass(num + 'ClassTopen').next("dd").removeClass(num + 'ClassCopen');
							this_.removeClass("open");
						} else {
							pDt.addClass(num + 'ClassTopen').next("dd").addClass(num + 'ClassCopen');
							this_.addClass("open");
						}
						catalogH(t);
					}
				}, "dt code");
				t.on({
					mouseenter : function(){
						var pDt = $(this);
						if (pDt.hasClass('oneClassT')) {
							num = 'one';
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two';
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three';
						}
						pDt.addClass(num + 'ClassThover');
					},
					mouseleave : function(){
						var pDt = $(this);
						if (pDt.hasClass('oneClassT')) {
							num = 'one';
						} else if (pDt.hasClass('twoClassT')) {
							num = 'two';
						} else if (pDt.hasClass('threeClassT')) {
							num = 'three';
						}
						pDt.removeClass(num + 'ClassThover');
					}
				},"dt");
				// 给上下按钮绑定事件
				t.on({
					click: function() {
						if ($(this).hasClass('upBut')) {
							move(t, 'down');
						} else if ($(this).hasClass('downBut')) {
							move(t, 'up');
						}
					}
				}, "big.but");
				// 给元素本身绑定事件
				t.on({
					mouseenter: function() {
						var this_ = $(this),
							dl = this_.find("dl.oneClassList"),
							dl_h = dl.height(),
							t_h = this_.height();
						if (dl_h > t_h || parseInt(dl.css("margin-top"), 10) < 0) {
							this_.find("big.but").show();
						}
					},
					mouseleave: function() {
						$(this).find("big.but").hide();
					}
				});
				t.data('bindevent',1);
			}
		};
	if(obj_){
		fun(obj_);
	}else{
		$("div.catalogList").each(function(){
			fun($(this));
		});
	}
};
/*
	menu-catalog-module
	抽屉型分类目录主要用来展示更多分类
*/
wsf.menuCatalogModule = function(obj_) {
	var fun = function(that){
		if(!that.data('bindevent')){
			var menuCatalog = that,
				Mo = menuCatalog.parents("div.Mo"),
				MoId = Mo.attr("id"),
				catalog = $("#menuCatalogMore_" + MoId.substr(3)), leveObj, hideTimeFun,
				moreInner = catalog.find(".catalog-more-inner"),
				gap = catalog.find("big.gap"),
				hideCatalog = function() {
					hideTimeFun = setTimeout(function() {
						leveObj.removeClass('one-class-hover').data('h',0);
						catalog.css("width", 0).data('visible',0);
					}, 500);
				};
			catalog.on({
				mouseenter: function() {
					clearTimeout(hideTimeFun);
				},
				mouseleave: function() {
					hideCatalog();
				}
			});
			menuCatalog.on({
				mouseenter: function() {

				},
				mouseleave: function() {
					hideCatalog();
				}
			});
			menuCatalog.on({
				mouseenter: function() {
					var tObj = $(this);
					clearTimeout(hideTimeFun);
					leveObj = tObj.parent();
					if(!leveObj.data('h')){
						leveObj.addClass("one-class-hover").data('h',1).siblings('dd.one-class-hover').removeClass('one-class-hover').data('h',0);
						var indexs = leveObj.index(),
							that_t = leveObj.position().top,
							that_h = leveObj.outerHeight(),
							inner_mt = parseInt(tObj.css("margin-top")),
							inner_tbw = parseInt(tObj.css("borderTopWidth")),
							inner_bbw = parseInt(tObj.css("borderBottomWidth")),
							inner_h = tObj.innerHeight(),
							l = menuCatalog.offset().left,
							t = menuCatalog.offset().top,
							gap_h = inner_h,
							gap_t = that_t + inner_tbw +  inner_mt,
							moreList = catalog.find(".catalog-more-list:eq(" + indexs + ")");
						l = l + menuCatalog.width() - 2;
						gap.css({height: gap_h + "px",top: gap_t + "px"});
						moreList.siblings().hide();
						if(moreList.find("dl").length >= 1){
							moreList.show();
							catalog.css({visibility:'visible'});
						}else{
							catalog.css({visibility:'hidden'});
						}
						moreInner.css({minHeight: gap_h + "px",marginTop : that_t + inner_mt + 'px'});
						catalog.css({left: l + "px",top: t + "px"});
						if(!catalog.data('visible')){
							catalog.animate({
								width: moreInner.outerWidth()
							}, 200, function() {
								catalog.css({
									width: "auto"
								});
							});
							catalog.data('visible',1);
						}
					}
				},
				mouseleave: function() {
					//$(this).removeClass("one-class-hover");
				}
			}, ".one-class-inner");
			menuCatalog.data('bindevent',1);
		}
	};
	if(obj_){
		fun(obj_);
	}else{
		$("div.menu-catalog-module").each(function(){
			fun($(this));
		});
	}
};
/*
	tableModule
	createDate:2015/05/11
	用来给表格添加class
*/
wsf.tableModule = function() {
	var tableModule = $('div.tableModule');
	tableModule.each(function() {
		$(this).find('tr:first').addClass('trHead');
	});
};
/*
	tab-switch-module
	createDate:2015/03/24
	模块标签项切换功能
*/
wsf.tabSwitchModule = function() {
	var tabSwitch = $("div.tab-switch-module"),
		tabT = tabSwitch.find("div.tab-switch-t"),
		tabC = tabSwitch.find("div.tab-switch-c");
	tabT.on({
		click: function() {
			if(tabT.data('noswitch') != 1){
				var that = $(this),
					indexs = that.index();
				that.find("span").addClass("active");
				that.siblings("li").find("span").removeClass("active");
				tabC.find('.tab-c-item').each(function() {
					if ($(this).index() == indexs) {
						$(this).addClass("tab-c-item-active");
					} else {
						$(this).removeClass("tab-c-item-active");
					}
				});
			}
		}
	}, "li");
};
// 自由编辑模块
wsf.customEditModule = function(){
	var customEditModule = $('div.custom-edit-module').each(function(){
		var t = $(this),tp = t.parent();
		t.css({height : tp.height()});
	});
};
/*
	row-classify-module
	createDate:2015/08/16
	横向产品分类列表模块的方法
*/
wsf.classifyModule = function(){
	$("div.classify-module").on({
		mouseenter : function(){
			$(this).addClass("classify-hover");
		},
		mouseleave : function(){
			$(this).removeClass("classify-hover");
		}
	},".big-classify,.small-classify");
	$("div.classify-module").on({
		mouseenter : function(){
			$(this).addClass("pic-classify-hover");
		},
		mouseleave : function(){
			$(this).removeClass("pic-classify-hover");
		}
	},".small-pic-classify");
};
/*选择列表*/
wsf.selectState = function(){
	$("#filterSort").on({
		mouseenter : function(){
			$(this).addClass("select-state-hover");
		},
		mouseleave : function(){
			$(this).removeClass('select-state-hover');
		}
	},".select-state");
};
// 手动移动模块
wsf.manualMoveModule = function(obj){
	var manual;
	manual = obj ? obj : $("div.manual-move-module");
	manual.each(function(){
		var t = $(this),
				li = t.find('li'),
				liNum = li.length,
				liW = li.outerWidth(),
				ulP = t.find(".pic-text-list-module");
		ulP.width(liW * liNum);
	});
	manual.on({
		click : function(){
			var t = $(this),
					id = t.data('id'),
					obj = t.parent();
			moveFun(id,obj);
		}
	},'em.prev-move,em.next-move');
	manual.on({
		mouseenter : function(){
			var t = $(this);
			t.find('em.prev-move,em.next-move').css('visibility','visible');
		},
		mouseleave : function(){
			var t = $(this);
			t.find('em.prev-move,em.next-move').css('visibility','hidden');
		}
	});
	var moveFun = function(dir,obj){
		var curManual = obj,
			list = curManual.find('.manual-move-body'),
			ulP = curManual.find(".pic-text-list-module"),
			li = ulP.find('li'),
			liNum = li.length,
			liWidth = li.outerWidth(),
			showNum = Math.floor((list.width()) / liWidth),
			ulPW = ulP.width(),
			ulPLeft = Math.abs(parseInt(ulP.css('margin-left'))),
			move = showNum * liWidth,
			newMove = ulPW - (ulPLeft + move),
			nowMove;
		if(curManual.data('move') == 1) return false;
		curManual.data('move',1);
		if(dir == 'next'){
			if(newMove > 0 && newMove > move){
					nowMove = move;
			}else{
				nowMove = newMove;
			}
			if(ulPW > move){
				ulP.animate({
					"marginLeft": "-=" + nowMove
				}, 500,function(){
					curManual.removeData('move');
				});
			}
		}else{
			nowMove = ulPLeft > move ? move : ulPLeft;
			ulP.animate({
				"marginLeft": "+=" + nowMove
			}, 500,function(){
				curManual.removeData('move');
			});
		}
	};
};
//全局模块方法绑定
wsf.absoluteModuleWrapBind = function(){
	var absMoInner = $("#absolute_module_inner");
	absMoInner.on({
		mouseenter : function(){
			var t = $(this);
			if(t.hasClass('absolute-menu-catalog')){
				wsf.absoluteMenuCatalog();
			}
		}
	},'.absolute-module');
};
//全局模块方法
wsf.absoluteMenuCatalog = function(){
 	var menuCatalog = $('.absolute-menu-catalog');
 	if(menuCatalog.length > 0){
 		menuCatalog.each(function(){
 			var t = $(this);
 			if(!t.data('bindevent')){
	 			var open = t.data('open'),
					amc = t.find('.a-m-c'),
					mch = t.find('.m-c-h'),
					mcb = t.find('.m-c-b'),
					mcm = t.find('.m-c-m'),
					gap = mcm.find('.gap');
				t.on({
		 			mouseleave : function(){
		 				if(!open){
		 					amc.removeClass('a-m-c-open');
		 					mch.removeClass('m-c-h-open');
		 				}
		 				if(mcm.data('open')){
		 					mcm.data('open',0).css({display : 'none'});
		 				}
		 				mcb.find('.o-l-e').each(function(){
		 					var ot = $(this);
		 					if(ot.data('open')){
				 				ot.removeClass('o-l-e-open').data('open',0);
				 				var tNimg = ot.find('.o-l-h-n img');
				 				tNimg.attr('src',tNimg.data('src'));
		 					}
		 				});
		 			}
		 		});
		 		t.on({
		 			mouseenter : function(){
		 				if(!open){
		 					amc.addClass('a-m-c-open');
		 					mch.addClass('m-c-h-open');
		 				}
		 			}
		 		},'.m-c-h-i');
		 		t.on({
		 			mouseenter : function(){
		 				var that = $(this),o_openId = that.data('id'),tIndex = that.index(),tagOpen = 0;
		 				if(!that.data('open')){
		 					/*更换小图标地址*/
		 					that.addClass('o-l-e-open').data('open',1);
		 					var tNimg = that.find('.o-l-h-n img'),
		 						thatSib = that.siblings('.o-l-e-open'),
		 						sibNimg = thatSib.find('.o-l-h-n img');
	 						tNimg.attr('src',tNimg.data('hsrc'));
		 					thatSib.removeClass('o-l-e-open').data('open',0);
	 						sibNimg.attr('src',sibNimg.data('src'));
		 					var tBotT = parseInt(that.find('.o-l-e-i').css('borderTopWidth')),
		 						tHeight = that.find('.o-l-e-i').height(),tTop = that.position().top - mch.height();
		 					gap.css({height : tHeight + 'px', top : (tTop + tBotT) + 'px'});
			 				mcm.find('.m-c-m-e').each(function(){
			 					var iThis = $(this),m_openId = iThis.data('id');
			 					if(m_openId == o_openId){
			 						iThis.addClass('m-c-m-e-open');
			 						tagOpen = 1;
			 					}else{
			 						iThis.removeClass('m-c-m-e-open');
			 					}
			 				});
	 						if(tagOpen == 1){
			 					if(mcm.data('open') != 1){
			 						mcm.css({display : 'block',visibility : 'hidden'});
			 						var macT = mch.height(),
			 							mcmW = mcm.width(),
			 							mcmL = mcb.width() - parseInt(mcb.find('.m-c-b-i').css('border-right-width'));
			 						mcm.css({visibility : 'visible', width : 0, left : mcmL + 'px', top : macT + 'px'});
			 						mcm.animate({width: mcmW},200).data('open',1);
		 						}
		 					}else{
	 							mcm.css({display : 'none'}).data('open',0);
	 						}
		 				}
		 				// return false;
		 			}
		 		},'.o-l-e');
		 		t.data('bindevent',1);
	 		}
 		});
 	}
 };
/*
//jquery focusImg
//qwguo	qwguo@sohu.com
//copyright www.ev123.com
// 焦点图js功能
 */
(function($) {
	$.fn.extend({
		focusImg: function(options) {
			return this.each(function() {
				var Opts = {
					uistyle: "style-1",
					fnclass: "inOut",
					evtype: "mouseenter",
					usertime: 6
				};
				Opts = $.extend(Opts, options);

				var full = $(this),
					fWidth = full.parent().width(),
					fHeight = full.parent().height(),
					uistyle = Opts.uistyle,
					fnclass = Opts.fnclass,
					pUl = full.children("ul"),
					pLi = pUl.find("li"),
					bNav = $("<div></div>"),
					times = null,
					an = true,
					y = 0,
					change = function(e) { //图片地址更换
						var curli = e,
							bigpic = curli.attr("bigpic"),
							bcolor = curli.attr("bcolor");
						curli.css({
							"background-color": bcolor,
							"background-image": "url(" + bigpic + ")"
						});
						curli.attr("change", "true");
					},
					eventfn = function(obj, fobj) { //事件模式
						obj.find(fobj).each(function(e) {
							$(this).bind(Opts.evtype, function() {
								eval(fnclass + "(e)");
							});
						});
					};
				switch (Opts.fnclass) {
					case 'inOut':
						(function() {
							pUl.addClass('banner-pic-1').css({
								"height": fHeight
							});
							pLi.each(function() {
								$(this).css({
									"height": fHeight
								});
							});
						})();
						break;
					case 'LMove':
						(function() {
							full.css({
								"height": fHeight + "px"
							});
							pUl.addClass('banner-pic-2').css({
								"width": pLi.length * fWidth + "px",
								"height": fHeight + "px"
							});
							pLi.each(function() {
								$(this).css({
									"width": fWidth + "px",
									"height": fHeight
								});
							});
						})();
						break;
					case 'TMove':
						(function() {
							full.css({
								"height": fHeight + "px"
							});
							pUl.addClass('banner-pic-3').css({
								"height": pLi.length * fHeight + "px"
							});
							pLi.each(function() {
								$(this).css({
									"height": fHeight
								});
							});
						})();
						break;
				}
				switch (Opts.uistyle) {
					case "style-1":
						if(pLi.length > 1){
							var ban = $("<div class='b-nav'></div>");
							pLi.each(function(e) {
								ban.append("<span></span>");
							});
							full.append(bNav.attr("class", "banner-nav-1").html(ban));
							eventfn(ban, "span");
						}
					break;
					case "style-2":
						if(pLi.length > 1){
							var ban = $("<div class='b-nav'></div>");
							pLi.each(function(e) {
								ban.append("<span>" + (e + 1) + "</span>");
							});
							full.append(bNav.attr("class", "banner-nav-2").html(ban));
							eventfn(ban, "span");
						}
					break;
					case "style-3":
						var ban = $("<div class='b-nav'></div>");
						pLi.each(function() {
							var smallurl = $(this).attr("smallpic") ? $(this).attr("smallpic") : $(this).attr("bigpic");
							var s = $("<span></span>").html("<img src=" + smallurl + " />");
							ban.append(s);
						});
						full.append(bNav.attr("class", "banner-nav-3").html(ban));
						eventfn(ban, "span");
						break;
				}
				var inOut = function(e) {
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (e != o) {
						if (an) {
							an = false;
							ospan.removeClass("cur");
							bNav.find("span:eq(" + e + ")").addClass("cur");
							pLi.eq(o).css({
								"z-index": 3
							}).animate({
								"opacity": 0
							}, 1000, function() {
								an = true;
								$(this).css({
									"opacity": 1,
									"z-index": 1
								});
							});
							curli.css({
								"display": "block",
								"z-index": 2
							});
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						}
					}
				};
				var LMove = function(e) {
					var fullW = full.parent().width(),
						fullH = full.parent().height();
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (an) {
						an = false;
						ospan.removeClass("cur");
						bNav.find("span:eq(" + e + ")").addClass("cur");
						pUl.animate({
							"left": "-" + e * fullW
						}, 200, function() {
							an = true;
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						});
					}
				};
				var TMove = function(e) {
					var fullH = full.height();
					var curli = pLi.eq(e);
					if (curli.attr("change") == "false") {
						change(curli);
					}
					var ospan = bNav.find("span.cur");
					var o = ospan.index();
					if (an) {
						an = false;
						ospan.removeClass("cur");
						bNav.find("span:eq(" + e + ")").addClass("cur");
						pUl.animate({
							"top": "-" + e * fullH
						}, 200, function() {
							an = true;
							y = y + 1;
							if (y >= pLi.length) {
								y = 0;
							}
						});
					}
				};
				times = setInterval(function() {
					eval(Opts.fnclass + "(y)");
				}, (Opts.usertime) * 1000);
				full.mouseenter(function() {
					clearInterval(times);
				});
				full.mouseleave(function() {
					times = setInterval(function() {
						eval(Opts.fnclass + "(y)");
					}, (Opts.usertime) * 1000);
				});
				eval(Opts.fnclass + "(y)");
			});
		}
	});
})(jQuery);

/*
//模块移动函数
主要是拖拽版的单模块内容移动效果
*/
(function($) {
	$.fn.extend({
		"moveModule": function(options) {
			return this.each(function() {
				var defaultO = {
					axis: "top",
					speed: "slow",
					type: "flow",
					hand: false
				};
				var O = $.extend(defaultO, options);
				var speed = 100;
				if (O.type == "flow") {
					switch (O.speed) {
						case "slowly":
							speed = 150;
							break;
						case "slow":
							speed = 100;
							break;
						case "normal":
							speed = 60;
							break;
						case "quick":
							speed = 30;
							break;
						case "quickly":
							speed = 5;
							break;
					}
				} else if (O.type == "single") {
					switch (O.speed) {
						case "slowly":
							speed = 5000;
							break;
						case "slow":
							speed = 4000;
							break;
						case "normal":
							speed = 3000;
							break;
						case "quick":
							speed = 2000;
							break;
						case "quickly":
							speed = 1000;
							break;
					}
				}
				var _this = $(this),
					movepx = 0,
					times = null,
					thisPar = $(this).parent(),
					thisParH = thisPar.height(),
					thisParW = thisPar.width(),
					firstChild = _this.children().first();
				if (O.axis == "top" || O.axis == "bottom") {
					var thisH = _this.height();
				} else if (O.axis == "left" || O.axis == "right") {
					if(_this.hasClass('pic-text-list-module')){
						_this.addClass('pic-text-list-module-moveL');
						// if(_this.hasClass('pic-text-list-module-1')){
							var liw = firstChild.find("li").width();
							firstChild.find("li").width(liw);
							// firstChild.find("li").width(thisParW);
						// }
						var li_w = 0;
						firstChild.find("li").each(function(){
							li_w+= $(this).outerWidth();
						});
						firstChild.width(li_w);
					}
					var thisW = firstChild.width();
					_this.width(firstChild.width() * 2 + 10);
				}
				var clone = $(firstChild.clone());
				//向上
				if (O.axis == "top") {
					movepx = 0;
					_this.append(clone);
					times = setInterval(moveT, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveT, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//向下
				if (O.axis == "bottom") {
					movepx = -(thisH + (thisH - thisParH));
					_this.css({
						"margin-top": -thisH
					}).append(clone);
					times = setInterval(moveB, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveB, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//向左
				if (O.axis == "left") {
					movepx = 0;
					_this.css({
						"margin-left": 0
					}).append(clone);
					times = setInterval(moveL, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveL, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//向右
				if (O.axis == "right") {
					movepx = -(thisW);
					_this.css({
						"margin-left": movepx
					}).append(clone);
					times = setInterval(moveR, speed);
					_this.bind("mouseout", function() {
						times = setInterval(moveR, speed);
					});
					_this.bind("mouseover", function() {
						clearInterval(times);
					});
				}
				//下移动函数
				function moveB() {
					if (thisH != firstChild.height()) {
						thisH = firstChild.height();
					}
					var mt = parseInt(_this.css("margin-top"));
					var itemH = firstChild.children().outerHeight();
					if (O.type == "flow") {
						if (mt < 0) {
							_this.css("margin-top", movepx);
							movepx++;
						} else {
							movepx = -thisH;
							_this.css("margin-top", movepx);
						}
					} else if (O.type == "single") {
						if (mt < 0) {
							_this.animate({
								"margin-top": mt + itemH
							}, 500);
						} else {
							_this.css("margin-top", -thisH);
							_this.animate({
								"margin-top": -(thisH - itemH)
							}, 500);
						}
					}
				}
				//上移动函数
				function moveT() {
					if (thisH != firstChild.height()) {
						thisH = firstChild.height();
					}
					var itemH = firstChild.children().outerHeight();
					var mt = Math.abs(parseInt(_this.css("margin-top")));
					if (O.type == "single") {
						if (mt < thisH) {
							_this.animate({
								"margin-top": -(mt + itemH)
							}, 500);
						} else {
							_this.css("margin-top", 0);
							_this.animate({
								"margin-top": -(itemH)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (mt < thisH) {
							_this.css("margin-top", -movepx);
							movepx++;
						} else {
							movepx = 0;
							_this.css("margin-top", -movepx);
						}
					}
				}
				//左移动
				function moveL() {
					if (thisParW != _this.parent().width()) {
						if (_this.hasClass("proListmodule_1")) {
							thisParW = _this.parent().width();
							firstChild.children().width(thisParW);
							clone.remove();
							clone = $(firstChild.clone());
							_this.css({
								"margin-left": 0
							}).append(clone);
							thisW = firstChild.width();
							_this.width(firstChild.width() * 2);
						}
					}
					var itemW = firstChild.children().outerWidth();
					var ml = Math.abs(parseInt(_this.css("margin-left")));
					if (O.type == "single") {
						if (ml < thisW) {
							_this.animate({
								"margin-left": -(ml + itemW)
							}, 500);
						} else {
							_this.css("margin-left", 0);
							_this.animate({
								"margin-left": -(itemW)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (ml < thisW) {
							_this.css("margin-left", -movepx);
							movepx++;
						} else {
							movepx = 0;
							_this.css("margin-left", -movepx);
						}
					}
				}

				//右移动
				function moveR() {
					if (thisParW != _this.parent().width()) {
						if (_this.hasClass("pic-text-list-module-1") || _this.hasClass("pic-text-list-module-2")) {
							thisParW = _this.parent().width();
							firstChild.children().width(thisParW);
							clone.remove();
							clone = $(firstChild.clone());
							_this.css({
								"margin-left": -firstChild.width()
							}).append(clone);
							thisW = firstChild.width();
							_this.width(firstChild.width() * 2);
						}
					}
					var itemW = firstChild.children().outerWidth();
					var ml = parseInt(_this.css("margin-left"));
					if (O.type == "single") {
						if (ml < 0) {
							_this.animate({
								"margin-left": ml + itemW
							}, 500);
						} else {
							_this.css("margin-left", -thisW);
							_this.animate({
								"margin-left": -(thisW - itemW)
							}, 500);
						}
					} else if (O.type == "flow") {
						if (ml < 0) {
							_this.css("margin-left", movepx);
							movepx++;
						} else {
							movepx = -thisParW;
							_this.css("margin-left", movepx);
						}
					}
				}

			});
		}
	});
})(jQuery);
/*
//textList module
文本列表前标函数,为也面的文本列表添加前标
*/
// $(function(){
// 	var icon_array = {
// 		'icon_1':"&#8226",				//''
// 		'icon_2':"&#9734",				//'☆'
// 		'icon_3':"&#9733",				//'★'
// 		'icon_4':"&#9675",				//'○'
// 		'icon_5':"&#9679",				//'●'
// 		'icon_6':"&#9671",				//'◇'
// 		'icon_7':"&#9670",				//'◆'
// 		'icon_8':"&#9633",				//'□'
// 		'icon_9':"&#9632",				//'■'
// 		'icon_10':"&#9651",				//'△'
// 		'icon_11':"&#9650",				//'▲'
// 		'icon_12':"&#8251"				//'※'
// 	}
// 	var textList_1 = $("div.text-list-module-1"),
// 			textList_2 = $("div.text-list-module-2");
// 		textList_1.each(function(){
// 			$(this).find("li").each(function(){
// 				var codes = $(this).find("code"),
// 						dataId = codes.data("id");
// 				if(dataId){
// 					codes.html(icon_array[dataId]);
// 				}
// 			})
// 		});

// });
// 产品最终页的图片效果
wsf.innerPreview = function(id) {
	var preview = $(id),
		bigPics = preview.find(".show-big-pic"),
		bigPic = bigPics.find(".pics"),
		smallListArea = preview.find(".small-pic-list-area"),
		leftBut = smallListArea.find(".left-but"),
		rightBut = smallListArea.find(".right-but"),
		slist = smallListArea.find(".small-pic-list"),
		listUl = slist.find("ul"),
	li = listUl.find("li"),
		ulW = 0, spic = "", zoom = "";
	li.each(function() {
		ulW += $(this).width();
	});
	// listUl.width(ulW);
	var movePx = 0,
		cmovePx = ulW - slist.width();
	rightBut.on({
		click: function() {
			if (movePx < cmovePx) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx += li.width())
					}, 200);
				}
			}
		}
	});
	leftBut.on({
		click: function() {
			if (movePx > 0) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx -= li.width())
					}, 200);
				}
			}
		}
	});
	li.on({
		click: function() {
			$(this).siblings().removeClass('liCur').end().addClass("liCur");
			var msrc = $(this).find("img").attr("msrc"),
				bsrc = $(this).find("img").attr("bsrc");
			bigPics.find("img").attr({
				"src": msrc,
				"bsrc": bsrc
			});
		}
	});
	bigPics.on({
		mouseenter: function(event) {
			var that = $(this),
				bsrc = that.find("img").attr("bsrc");
			if (that.data("hover") != 1) {
				that.data("hover", 1);
				zoom = $('<div class="zoom"></div>');
				that.children().append(zoom);
				spic = $('<div class="zoomPic"><img src="' + bsrc + '" /></div>');
				spic.css({
					"left": (preview.width() + 10) + "px",
					"top": "0px"
				});
				spic.appendTo(preview);
			}
			var l = event.clientX,
				t = event.clientY + $(document).scrollTop();
			fun(l, t);
		},
		mousemove: function(event) {
			var l = event.clientX,
				t = event.clientY + $(document).scrollTop();
			fun(l, t);
		},
		mouseleave: function() {
			var that = $(this);
			that.removeData("hover");
			zoom.remove();
			spic.remove();
			zoom = "";
			spic = "";
		}
	});
	var fun = function(l, t) {
		l = l - bigPic.offset().left - zoom.outerWidth() / 2;
		t = t - bigPic.offset().top - zoom.outerHeight() / 2;
		if (l < 0) {
			l = 0;
		} else if (l > bigPic.outerWidth() - zoom.outerWidth()) {
			l = bigPic.outerWidth() - zoom.outerWidth();
		}
		if (t < 0) {
			t = 0;
		} else if (t > bigPic.outerHeight() - zoom.outerHeight()) {
			t = bigPic.outerHeight() - zoom.outerHeight();
		}
		zoom.css({
			"left": l + "px",
			"top": t + "px"
		});
		var lx = l / (bigPic.outerWidth() - zoom.outerWidth()),
			tx = t / (bigPic.outerHeight() - zoom.outerHeight());
		var img = spic.children("img");
		img.css({
			"left": -lx * (img.outerWidth() - spic.outerWidth()) + "px",
			"top": -tx * (img.outerHeight() - spic.outerHeight()) + "px"
		});
	};
};
// 产品最终页的图片效果
wsf.innerWapBuy = function(){
	var pWapBuyArea = $("#pWapBuyArea");
	if(pWapBuyArea.length){
		var pPriceList = $("#pPriceList"),t;
		if(pPriceList.length){
			t = pPriceList.position().top;
		}else{
			t = 32;
		}
		pWapBuyArea.css({top : t + 'px'});
		pWapBuyArea.on({
			mouseenter : function(){
				$(this).addClass('p-wap-buy-area-hover');
			},
			mouseleave : function(){
				$(this).removeClass('p-wap-buy-area-hover');
			}
		});
	}
};
// 招聘功能
function zpshowDiv() {
	var winWidth = $("body").width(),
		winHeight = $("body").height();

	$('#allzz').css({
		display: "block",
		width: winWidth,
		height: winHeight
	});
	$("#zpAlert").css({
		display: "block"
	});
}

function zpcloseDiv() {
	$("#allzz,#zpAlert").css({
		display: "none"
	});
}

/**产品最终页的图片展示效果**/
$(function() {
	var preview = $("#inner_preview"),
		bigPics = preview.children(".bigPics"),
		bigPic = bigPics.children(".bigPic"),
		smallListArea = preview.children(".smallPic_listArea"),
		leftBut = smallListArea.children(".left_but"),
		rightBut = smallListArea.children(".right_but"),
		slist = smallListArea.children(".smallPic_list"),
		listUl = slist.children("ul"),
		li = listUl.children("li"),
		ulW = 0, spic = "", zoom = "";
	li.each(function() {
		ulW += $(this).width();
	});
	listUl.width(ulW);
	var movePx = 0,
		cmovePx = ulW - slist.width();
	rightBut.on({
		click: function() {
			if (movePx < cmovePx) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx += li.width())
					}, 200);
				}
			}
		}
	});
	leftBut.on({
		click: function() {
			if (movePx > 0) {
				if (!listUl.is(":animated")) {
					listUl.animate({
						marginLeft: -(movePx -= li.width())
					}, 200);
				}
			}
		}
	});
	li.on({
		click: function() {
			$(this).siblings().removeClass('Pic_box_cur').end().addClass("Pic_box_cur");
			var msrc = $(this).children("img").attr("msrc"),
				bsrc = $(this).children("img").attr("bsrc");
			bigPics.find("img").attr({
				"src": msrc,
				"bsrc": bsrc
			});
		}
	});
	bigPics.on({
		mouseenter: function(event) {
			var that = $(this),
				bsrc = that.find("img").attr("bsrc");
			if (that.data("hover") != 1) {
				that.data("hover", 1);
				zoom = $('<div class="zoom"></div>');
				that.children().append(zoom);
				spic = $('<div class="zoomPic"><img src="' + bsrc + '" /></div>');
				spic.css({
					"left": (preview.width() + 10) + "px",
					"top": "0px"
				});
				spic.appendTo(preview);
			}
			var l = event.clientX,
				t = event.clientY;
			fun(l, t);
		},
		mousemove: function(event) {
			var l = event.clientX,
				t = event.clientY;
			fun(l, t);
		},
		mouseleave: function() {
			var that = $(this);
			that.removeData("hover");
			zoom.remove();
			spic.remove();
			zoom = "";
			spic = "";
		}
	});
	var fun = function(l, t) {
		l = l - bigPic.offset().left - zoom.outerWidth() / 2;
		t = t - bigPic.offset().top - zoom.outerHeight() / 2;
		if (l < 0) {
			l = 0;
		} else if (l > bigPic.outerWidth() - zoom.outerWidth()) {
			l = bigPic.outerWidth() - zoom.outerWidth();
		}
		if (t < 0) {
			t = 0;
		} else if (t > bigPic.outerHeight() - zoom.outerHeight()) {
			t = bigPic.outerHeight() - zoom.outerHeight();
		}
		zoom.css({
			"left": l + "px",
			"top": t + "px"
		});
		var lx = l / (bigPic.outerWidth() - zoom.outerWidth()),
			tx = t / (bigPic.outerHeight() - zoom.outerHeight());
		var img = spic.children("img");
		img.css({
			"left": -lx * (img.outerWidth() - spic.outerWidth()) + "px",
			"top": -tx * (img.outerHeight() - spic.outerHeight()) + "px"
		});
	};
});
/* 倒计时函数 */
wsf.countDown = function(j) {
	var r = function(t) {
			var a = t.split(' '),
				ymd = a[0],
				hms = a[1],
				str = ymd.split('-'),
				fix = hms.split(':'),
				year = str[0] - 0,
				month = str[1] - 0 - 1,
				day = str[2] - 0,
				hour = fix[0] - 0,
				minute = fix[1] - 0,
				second = fix[2] - 0,
				time = (new Date(year, month, day, hour, minute, second)).getTime();
			return parseInt(time / 1000);
		},
		o = j.o,
		st = r(j.st),
		et = r(j.et),
		nts = j.nt ? r(j.nt) : (new Date().getTime() / 1000),
		n_underway = function() {
			var y, m, d, h, mi, s, now = nts,
				c = et - now,
				html_;
			nts = nts + 1;
			if (c > 0) {
				d = Math.floor(c / (60 * 60 * 24));
				h = Math.floor((c - d * 24 * 60 * 60) / 3600);
				mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
				s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
				h = h < 10 ? '0' + h : h;
				mi = mi < 10 ? '0' + mi : mi;
				s = s < 10 ? '0' + s : s;
				html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
				o.html(html_);
				setTimeout(function() {
					n_underway();
				}, 1000);
			} else {
				j.efun();
				// o.html('活动已经结束！');
			}
		},
		b_underway = function() {
			var y, m, d, h, mi, s, now = nts,
				c = st - now,
				html_;
			nts = nts + 1;
			if (c > 0) {
				d = Math.floor(c / (60 * 60 * 24));
				h = Math.floor((c - d * 24 * 60 * 60) / 3600);
				mi = Math.floor((c - d * 24 * 60 * 60 - h * 3600) / 60);
				s = Math.floor(c - d * 24 * 60 * 60 - h * 3600 - mi * 60);
				h = h < 10 ? '0' + h : h;
				mi = mi < 10 ? '0' + mi : mi;
				s = s < 10 ? '0' + s : s;
				html_ = '<span class="count-time"><i>' + d + '</i><em>天</em><i>' + h + '</i><em>时</em><i>' + mi + '</i><em>分</em><i>' + s + '</i><em>秒</em></span>';
				o.html(html_);
				setTimeout(function() {
					b_underway();
				}, 1000);
			} else {
				n_underway();
				j.nfun();
			}
		};
	// 判断状态
	if ((st - nts) > 0) {
		j.sfun();
		b_underway();
	} else if ((nts - et) > 0) {
		j.efun();
		// o.html('活动已经结束！');
	} else {
		n_underway();
		j.nfun();
	}
};
//手动左右滚动产品效果――类
wsf.flow_pro_ = function(n, t) {
	var ContN = $(n).parent(),
		$list_ul = ContN.find("ul"),
		$list_ul_par = $list_ul.parent(),
		$list_li_num = $list_ul.find("li").length,
		$list_li_Lborder = parseInt($list_ul.find("li").css("border-left-width")),
		$list_li_Rborder = parseInt($list_ul.find("li").css("border-right-width")),
		$list_li_Lpadd = parseInt($list_ul.find("li").css("padding-left")),
		$list_li_Rpadd = parseInt($list_ul.find("li").css("padding-left")),
		$list_li_Rmargin = parseInt($list_ul.find("li").css('margin-right')),
		$list_li_Lmargin = parseInt($list_ul.find("li").css('margin-left'));
	$list_li_Lborder = isNaN($list_li_Lborder) ? 0 : $list_li_Lborder;
	$list_li_Rborder = isNaN($list_li_Rborder) ? 0 : $list_li_Rborder;
	$list_li_Rmargin = isNaN($list_li_Rmargin) ? 0 : $list_li_Rmargin;
	$list_li_Lmargin = isNaN($list_li_Lmargin) ? 0 : $list_li_Lmargin;
	var $list_li_width = $list_ul.find("li").width() + $list_li_Lborder + $list_li_Rborder + $list_li_Lmargin + $list_li_Rmargin + $list_li_Lpadd + $list_li_Rpadd,
		$show_num = Math.floor(($list_ul_par.width()) / $list_li_width),
		$ul_width = $list_li_width * $list_li_num,
		$list_ul_left = Math.abs($list_ul.position().left),
		$page = Math.ceil($list_li_num / $show_num),
		$move = $show_num * $list_li_width,
		$newMove = $ul_width - ($list_ul_left + $move);
	if (t == 1) {
		if ($newMove > 0) {
			if ($newMove > $move) {
				if ($list_ul.is(':animated') === false) {
					$list_ul.animate({
						"left": "-=" + $move
					}, 500);
					$(n).parent().find(".left-but").addClass("left-but-off");
				}
			} else {
				if ($list_ul.is(':animated') === false) {
					$list_ul.animate({
						"left": "-=" + $newMove
					}, 500);
					$(n).parent().find(".right-but").addClass("right-but-off");
					$(n).parent().find(".left-but").addClass("left-but-off");
				}
			}
		}
	} else {
		if ($list_ul_left > 0) {
			if ($list_ul_left > $move) {
				if ($list_ul.is(':animated') === false) {
					$list_ul.stop().animate({
						"left": "+=" + $move
					}, 500);
					$(n).parent().find(".right-but").removeClass("right-but-off");
				}
			} else {
				if ($list_ul.is(':animated') === false) {
					$list_ul.stop().animate({
						"left": "+=" + $list_ul_left
					}, 500);
					$(n).parent().find(".left-but").removeClass("left-but-off");
					$(n).parent().find(".right-but").removeClass("right-but-off");
				}
			}
		}
	}
};
/*--手动左右滚动产品function--*/
wsf.flow_pro = function() {
	$(".right-but").click(function() {
		wsf.flow_pro_(this, 1);
	});
	$(".left-but").click(function() {
		wsf.flow_pro_(this, 2);
	});
};
/*在线客服*/
wsf.onlineService = function(){
	var onService_panel = $("#onService_panel");
	onService_panel.on({
		mouseenter : function(){
			onService_panel.animate({
				right: 0
			});
			$(this).hide();
		}
	},"#onlineOpen");
	onService_panel.on({
		click : function(){
			onService_panel.animate({
				right: -102
			});
			onService_panel.find(".online_tab").fadeOut(100);
			onService_panel.find("#onlineOpen").show();
		}
	},"#onlineClose");

	$(".online_icon").click(function() {
		$(".online_tab").fadeOut(100);
		var onclickId = $(this).attr("id");
		var findparent_tab;
		switch (onclickId) {
			case "online_tel_icon":
				findparent_tab = $("#onlineTelTab");
				break;
			case "online_qq_icon":
				findparent_tab = $("#onlineQQTab");
				break;
			case "online_message_icon":
				findparent_tab = $("#onlineMessageTab");
				break;
		}
		findparent_tab.fadeIn(100);
	});
	$("#onService_panel .tab_close").click(function() {
		$(this).parents(".online_tab").hide();
	});

	function checkLen(obj, maxs) {
		var maxChars = maxs; //最多字符数
		if (obj.value.length > maxChars) {
			obj.value = obj.value.substring(0, maxChars);
		}
		var curr = maxChars - obj.value.length;
		$(obj).parents("dl").find(".text_length b").text(curr.toString());
	}
};
/*网站宽度加载*/
wsf.loadWidth = function(){
	var w = $(window),wW = w.width(),bodys = $('body');
	if(wW < userSiteWidth){
		bodys.width(userSiteWidth + 20);
	}
};
/*模块进场动画执行*/
if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	wsf.wow_ = function(){
		wsf.wow = new WOW({
		  boxClass: 'customModule',
		  animateClass: 'animated',
		  offset: 0,
		  mobile: true,
		  live: true
		});
	};
}

wsf.moduleBind = function(){
	$(".customModule").on({
		mouseenter : function(){
			var t = $(this),
				dataType = wsf.f.s_j(t.attr('data-attr')),
				childDiv = t.find('.MoBodyC > div');
			if(!childDiv.data('bindevent') && !childDiv.hasClass('editMoConBut')){
				switch(dataType.mt){
					case 5 : case 6 : case 1 : case 2 :
						wsf.textListModule(childDiv);
					break;
					case 19 :
						wsf.catalogList(childDiv);
					break;
					case 21 :
						wsf.menuCatalogModule(childDiv);
					break;
				}
			}
		}
	});
};
/*页面加载完后要执行加载的函数*/
$(function(){
	wsf.nav();
	wsf.search();
	wsf.focusPicModule();
	wsf.textListModule();
	wsf.catalogList();
	wsf.menuCatalogModule();
	wsf.tabSwitchModule();
	// wsf.tableModule();
	wsf.tabSwitchModule();
	wsf.classifyModule();
	wsf.selectState();
	wsf.customEditModule();
	wsf.manualMoveModule();
	wsf.innerWapBuy();
	wsf.picTextList_changePic();
	wsf.interactFun_();
	if(!is_action){
		wsf.loadWidth();
		wsf.absoluteMenuCatalog();
	}else{
		wsf.moduleBind();
		wsf.absoluteModuleWrapBind();
	}
});
