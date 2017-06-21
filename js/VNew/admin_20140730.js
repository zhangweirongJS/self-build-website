var Ev = {}; //定义一个整体的全局对象用来存放所有的变量，函数，对象，方法等，避免全局变量多而污染。
Ev.siteClass = 1;
//存放所有的公用方法
Ev.pubFun = {
	UTCTimeDemo: function() {
		var now = new Date().getTime();
		var datestr = escape(now * 1000 + Math.round(Math.random() * 1000));
		return datestr;
	},
	changeSave: function() {
		Ev.pubVar.saveVar = true;
	},
	addLoadingWait: function(o) { //添加loadingWait
		var w = o.width(),
			h = o.height();
		var loading = $('<div class="loading-wait" style="width:' + w + 'px; height:' + h + 'px;"></div>');
		o.append(loading);
	},
	delLoadingWait: function(o) { //移除loadingWait
		o.find(".loading-wait").remove();
	},
	//下拉菜单选择
	selectElement: function(o, fn) {
		var ow = o.width(),
			cursel = o.find(".cursel"),
			selectVal = o.find("input[name='selectVal']"),
			list = o.find("div.select-element-l"),
			ulH = list.find("ul").height(),
			liW = list.find("li").width(),
			s = o.find("small.select-element-s");
		if (cursel.width() < liW) {
			cursel.width(liW);
		} else if (cursel.width() > liW) {
			list.width(ow);
			cursel.width(cursel.width());
			//o.width(list.width());
		}
		if (list.height() < list.find("ul").height()) {
			list.children().first().cScroll({
				w: 5,
				tbB: false,
				fn: function() {}
			});
		}
		list.css({
			"display": "none"
		});
		o.on("click", '.cursel,.select-element-s', function() {
			if (list.css("display") == "none") {
				list.css({
					"visibility": "visible",
					"display": "block"
				});
			} else {
				list.css({
					"display": "none"
				});
			}
		});
		list.on({
			mouseenter: function() {
				$(this).addClass("hover");
			},
			mouseleave: function() {
				$(this).removeClass("hover");
			},
			click: function() {
				var t = $(this);
				selectVal.val(t.attr("data-val")).change();
				cursel.text(t.text());
				t.addClass('cur').siblings('li').removeClass('cur');

			}
		}, "li");
		selectVal.on("change", function() {
			list.css({
				"display": "none"
			});
			fn($(this).val());
		});
	},
	s_j: function(st) { //字符串转换成json
		var j = "{" + st + "}";
		j = eval('(' + j + ')');
		return j;
	},
	j_s: function(j) { //将json转换成字符串
		var x = [];
		for (i in j) {
			x.push(i + ":" + j[i]);
		}
		return x.join(",");
	},
	iframeH: function(obj) {
		var h = obj.contents().find("body").outerHeight() > 600 ? obj.contents().find("body").outerHeight() : 600;
		obj.height(h);
	},
	objSH: function(obj, val) {
		if (val == "show")
			obj.css({
				"display": "block"
			});
		else
			obj.css({
				"display": "none"
			});
	},
	wIframeUrl: function(src) {
		Ev.pubVar.wIframe.attr("src", src);
	},
	upDownMove : function(o,dir){
		// 上下移动元素
		var _o = o,p = dir == 'up' ? p = o.prev() : p = o.next();
		if (o.data("animated") != 1 && p.length) {
			var ph = dir == 'up' ? -p.height() : p.height(),
				oh = dir == 'up' ? o.height() : -o.height();
			o.data("animated", 1).animate({"top": ph}, 500);
			p.data("animated", 1).animate({"top": oh}, 500);
			setTimeout(function() {
				o.removeData("animated").css({"top": ""});
				p.removeData("animated").css({"top": ""});
				o.remove();
				dir == 'up' ? p.before(_o) : p.after(_o);
			}, 1000);
		}
	},
	upMove: function(o) { //上移动函数
		var p = o.prev(),
			_o = o;
		if (o.data("animated") != 1) {
			if (p.length) {
				o.data("animated", 1).animate({
					"top": -p.height()
				}, 500);
				p.data("animated", 1).animate({
					"top": o.height()
				}, 500);
				setTimeout(function() {
					o.removeData("animated").css({
						"top": ""
					});
					p.removeData("animated").css({
						"top": ""
					});
					o.remove();
					p.before(_o);
				}, 1000);
			}
		}
	},
	downMove: function(o) { //下移动函数
		var n = o.next(),
			_o = o;
		if (o.data("animated") != 1) {
			if (n.length) {
				o.data("animated", 1).animate({
					"top": n.height()
				}, 500);
				n.data("animated", 1).animate({
					"top": -o.height()
				}, 500);
				setTimeout(function() {
					o.removeData("animated").css({
						"top": ""
					});
					n.removeData("animated").css({
						"top": ""
					});
					o.remove();
					n.after(_o);
				}, 1000);
			}
		}
	},
	upBgImg: function(obj) { /*--上传背景图片事件--*/
		Ev.pubVar.curBgImg = obj;
		var url = '/pic_selector.php?tj=1&constant=1';
		create_window5('图片选择器', 900, 520, url);
	},
	changeBgImg: function(a) { /*--修改值--*/
		var imgsrc = a;
		Ev.pubVar.curBgImg.val(a).change();
	},
	changeAlert: function() {
		var sCon = '您刚修改过网站布局，尚未保存，是否保存？',
			manageJson = {
				but_1: {
					text: "确定",
					fun: function() {
						save_index_set();
					}
				},
				but_2: {
					text: "取消",
					fun: function() {}
				}
			};
		sysDefine.manage(sCon, 3, manageJson, 270);
		return false;
	},
	saveAlert: function() {
		if (Ev.pubVar.saveVar) {
			Ev.pubFun.changeAlert();
			return false;
		} else {
			return true;
		}
	},
	openXX: function(j) {
		$.popup({
			type: 5,
			head: {
				yes: 1,
				text: '图片编辑器'
			},
			area: {
				w: j.width,
				h: j.height
			},
			zIndex: {
				yes: 1,
				val: 4000
			},
			con: {
				src: j.url
			}
		});
	},
	CommonUpload: function(url, z) {
		// var z = z ? z : 1000;
		$.popup({
			type: 5,
			head: {
				yes: 1,
				text: '图片选择器'
			},
			area: {
				w: 900,
				h: 520
			},
			/*zIndex: {
				yes: 1,
				val: z
			},*/
			con: {
				src: url
			}
		});
	},
	alertWindow: function(text, icon) {
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
				img: [1, icon]
			}
		});
	},
	confirmWindow: function(text, icon, efun, rfun) {
		$.popup({
			type: 2,
			animate: {
				type: 1
			},
			cName: "evPopupOpacity",
			area: {
				w: 270
			},
			con: {
				text: [1, text],
				img: [1, icon]
			},
			but: {
				yes: 1,
				button: {
					but_1: {
						text: "确定",
						fun: function() {
							efun && efun();
						}
					},
					but_2: {
						text: "取消",
						fun: function() {
							rfun && rfun();
						}
					}
				}
			}
		});
	},
	addLoadingWindow: function() {
		if (!window.loadingWait) {
			window.loadingWait = $.popup({
				type: 6
			});
		}
	},
	delLoadingWindow: function() {
		if (window.loadingWait) {
			$.popupClose(window.loadingWait);
			window.loadingWait = undefined;
		}
	}
};

Ev.admin = {
	o: {} //用来初始化存放需要操作的Dom元素;
};

//记录所有打开的层，用jQuery对象记录
Ev.admin.openLayer = [];
//关闭已记录的打开层
Ev.admin.closeLayer = function() {
	if (Ev.admin.openLayer.length > 0) {
		for (var i = 0, n; n = Ev.admin.openLayer[i]; i++) {
			n.fadeOut(150);
		}
		Ev.admin.openLayer = [];
	}
};
//选择当前的编辑页
Ev.admin.selectEditPage = function() {
	//选择好需要的dom元素
	var sep = Ev.admin.o.sep,
		curEditPage = sep.children(".cur-edit-page"),
		editPageWrap = sep.children(".edit-page-wrap"),
		adloadobj = editPageWrap.find('.ninebox-c-c'),
		editPageList = adloadobj.children(".edit-page-list"),
		list = editPageList.find("dl.dl-list");
	//给当前一个单机事件
	curEditPage.on("click", function() {
		Ev.admin.closeLayer();
		sep.css({
			"position": "relative"
		});
		editPageWrap.fadeIn(150);
		editPageList.cScroll({
			w: 6,
			tbB: false
		});
		Ev.admin.openLayer.push(editPageWrap);
	});
	//给列表阻止冒泡
	sep.on({
		click: function(event) {
			event.stopPropagation();
		}
	});
	list.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			Ev.admin.closeLayer();
		}
	}, "dd");
	list.on({
		click: function() {
			var t = $(this);
			if (Ev.pubVar.version == 'cp') {
				if (t.parent().attr("id")) {
					$("#adminSaveBut").hide();
				} else {
					$("#adminSaveBut").show();
				}
			}
			var sUrl = t.data('url'),
				changeText = function() {
					curEditPage.attr('data-url', sUrl);
					curEditPage.find("em").text(t.text()).attr("title", t.text());
					t.parent().addClass('curedit');
					t.parent().siblings().removeClass('curedit');
					$('#switchoverButArea .conadmin-a b').text(t.text());
				};
			iNavIndex = parseInt($(this).parent().index());
			Ev.indexPage = (iNavIndex === 0) ? true : false;

			Ev.admin.pageModeSwitch(1, sUrl, changeText, '');
		}
	}, "a");
	list.on({
		click: function() {
			$(this).parent().prev("a").trigger("click");
		}
	}, "small.e-icon-design");
	list.on({
		click: function() {
			var sUrl = $(this).data('url');
			// get_url_window(sUrl, '栏目管理', 800, 610);
			Ev.admin.openAddChannel(sUrl);
		}
	}, "small.e-icon-subedit");
	list.on({
		click: function() {
			var t = $(this),
				sUrl = t.data('url'),
				iType = t.data('type'),
				ddP = t.parent().parent();
			ddP.addClass('curedit').siblings().removeClass('curedit');
			$('#switchoverButArea .conadmin-a b').text(ddP.find("a").text());
			Ev.admin.pageModeSwitch(iType, sUrl, '', '');
		}
	}, "small.e-icon-edit");
	adloadobj.children(".add-edit-page").on({
		click: function() {
			// get_url_window('/VNew/column_add.php?tj=1', '栏目管理', 786, 520)
			// $("#addSiteColumn").trigger('click');
			Ev.admin.openAddChannel('/VNew/column_add.php?tj=1');
		}
	});
	adloadobj.children(".set-edit-page").on({
		click: function() {
			// get_url_window('/VNew/column_list.php?tj=1', '栏目管理', 786, 520);
			// $("#siteColumnAdmin").trigger('click');
			Ev.admin.openAddChannel('/VNew/column_list.php');
		}
	})
};
//语言选择
Ev.admin.languages = function() {
	//选择好需要的dom元素
	var sel = Ev.admin.o.sel,
		curLanguage = sel.children(".cur-language"),
		languageListWrap = sel.children(".language-list-wrap"),
		languageList = languageListWrap.find("div.language-list"),
		list = languageList.find("dl.dl-list")
	litem = list.children("dd");
	//
	sel.on('click', function(event) {
		event.stopPropagation()
	});
	curLanguage.click(function() {
		Ev.admin.closeLayer();
		sel.css({
			"position": "relative"
		});
		languageListWrap.css({
			"display": "block"
		});
		Ev.admin.openLayer.push(languageListWrap);
		languageList.cScroll({
			w: 6,
			tbB: false
		});
	});

	litem.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			var oThis = $(this);
			var iLanguageType = $(this).data("type");
			var sMsgCon = (Ev.pubVar.saveVar) ? '您的页面有更改，您确定更改语言刷新页面吗？' : '您确定更改语言刷新页面吗？';
			var manageJson = {
				but_1: {
					text: "确定",
					fun: function() {
						$.get('/VNew/ajax.php?type=5&state=' + iLanguageType + '&timestamp=' + window.parent.Ev.pubFun.UTCTimeDemo(), function(data) {
							if (data == 1) {
								sysDefine.webMsg(1, '设置成功!');
								var setext = oThis.text();
								curLanguage.find("b").text(setext);
								languageListWrap.fadeOut(150);
								Ev.admin.tj.fun.refreshWIframe();
							} else {
								sysDefine.webMsg(2, '网络繁忙,请重试!');
							}
						})
					}
				},
				but_2: {
					text: "取消",
					fun: function() {}
				}
			};
			sysDefine.manage(sMsgCon, 3, manageJson, 270);
		}
	});
};
// 网站宽度设置
Ev.admin.websiteWidth = function() {
	var siteWidth = Ev.admin.o.siteWidth,
		siteWidthA = siteWidth.find("a.site-width-a"),
		siteWidthWrap = $("#siteWidthWrap"),
		siteWidthWrapInner = siteWidthWrap.find(".site-width-wrap-inner"),
		interimW = 0,
		nowsetW = 0,
		addLoad = function() { //添加loadingWait
			var o = $("body"),
				w = o.width(),
				h = o.height(),
				loading = $('<div id="setSiteWidthLoading" style="width:' + w + 'px; height:' + h + 'px;"></div>');
			loading.on("click", function() {
				// if(e.which == 1 || e.which == 2 || e.which){
				return false;
				// }
				//e.stopPropagation();
			});
			o.append(loading);
		},
		delLoad = function() {
			$('body').find("#setSiteWidthLoading").remove();
		},
		showSet = function() {
			var siteWidthArr = Ev.pubVar.wIframeWin.DF.config.defWebWidth,
				l = siteWidth.offset().left,
				t = siteWidth.offset().top + siteWidth.height() - $(document).scrollTop();
			interimW = nowsetW = Ev.pubVar.wIframeWin.DF.config.defWebWidth[0];
			siteWidthWrap.css({
				left: l + "px",
				top: t + "px",
				display: "block"
			});
			var bl = siteWidthWrapInner.find('li.li-' + siteWidthArr[0]).position().left;
			siteWidthWrapInner.find("b.cur-b").css({
				left: bl + "px"
			});
			Ev.admin.closeLayer();
			Ev.admin.openLayer.push(siteWidthWrap);
			addLoad();
		},
		chStyle = function() {
			var reg = new RegExp('\{width\s*:\s*' + interimW + "px;\s*\}", "gi"),
				sarr = ['Tstyle', 'Hstyle', 'Nstyle', 'Bstyle', 'Fstyle'],
				nw = '{width:' + nowsetW + 'px;}';
			for (var i = 0; i < sarr.length; i++) {
				var s = Ev.pubVar.wIframeWin.sCssJson[sarr[i]];
				if (s) {
					if (reg.test(s)) {
						Ev.pubVar.wIframeWin.sCssJson[sarr[i]] = s.replace(reg, nw);
					}
				}
			}
		};
	siteWidthA.on({
		click: function() {
			try {
				var isloading = Ev.pubVar.wIframeWin.saveValue;
				if (isloading) {
					if (Ev.pubFun.saveAlert()) {
						showSet();
					}
				} else {
					sysDefine.webMsg(2, '当前页面没加载完，请稍后设置！');
				}
			} catch (err) {
				sysDefine.webMsg(2, '当前页面没加载完，请稍后设置！');
			}
		}
	});
	siteWidthWrapInner.on({
		click: function() {
			var l = $(this).position().left,
				vals = $(this).data("num");
			siteWidthWrapInner.find("b.cur-b").animate({
				left: l
			}, 200, function() {
				$(this).data('val', vals);
				nowsetW = siteWidthWrapInner.find("b.cur-b").data("val");
				Ev.pubVar.wIframeWin.DF.websiteWidth(nowsetW);
				chStyle();
				interimW = nowsetW;
			});
		}
	}, ".width-line-wrap li");
	siteWidthWrapInner.on({
		click: function() {
			var that = $(this),
				id = that.data("id"),
				disabled = that.data("disalbe"),
				width = siteWidthWrapInner.find("b.cur-b").data('val');
			if (!disabled) {
				that.data('disable', 1).addClass('btn-disable').siblings('.width-btn').addClass('btn-disable').data('disable', 1);
				if (id == 'reset') {
					var defW = Ev.pubVar.wIframeWin.DF.config.defWebWidth[0];
					if (Ev.pubVar.wIframeWin.DF.websiteWidth(defW)) {
						delLoad();
						Ev.admin.closeLayer();
						that.removeData('disable').removeClass('btn-disable').siblings('.width-btn').removeClass('btn-disable').removeData('disable');
						nowsetW = Ev.pubVar.wIframeWin.DF.config.defWebWidth[0];
						chStyle();
					}
				} else if (id == 'enter') {
					var siteWidth = {
						width: Ev.pubVar.wIframeWin.DF.config.webWidth[0],
						navNum: Ev.pubVar.wIframeWin.DF.nav.itemSum()
					};

					siteWidth.cssStyle = {};
					siteWidth.cssStyle.Tstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Tstyle);
					siteWidth.cssStyle.Hstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Hstyle);
					siteWidth.cssStyle.Nstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Nstyle);
					siteWidth.cssStyle.Fstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Fstyle);
					siteWidth.cssStyle.Bstyle = encodeURI(Ev.pubVar.wIframeWin.sCssJson.Bstyle);

					var siteWidthjson = JSON.stringify(siteWidth);

					$.ajax({
						'url': "/VNew/site_width_change.php?t=" + window.parent.Ev.pubFun.UTCTimeDemo(),
						type: "POST",
						cache: false,
						dataType: "json",
						data: {
							"siteWidthjson": siteWidthjson
						},
						error: function() {
							that.removeData('disable').removeClass('btn-disable').siblings('.width-btn').removeClass('btn-disable').removeData('disable');
							sysDefine.webMsg(3, "参数有误！");
							siteWidthWrapInner.find('.reset-btn').trigger('click');
						},
						success: function(status) {
							that.removeData('disable').removeClass('btn-disable').siblings('.width-btn').removeClass('btn-disable').removeData('disable');
							if (status != 1) {
								sysDefine.webMsg(3, "参数有误！");
								siteWidthWrapInner.find('.reset-btn').trigger('click');
							} else {
								Ev.pubVar.saveVar = false;
								sysDefine.webMsg(1, "宽度保存成功!");
								setTimeout('Ev.admin.tj.fun.refreshWIframe()', 0);
							}
							delLoad();
							Ev.admin.closeLayer();
						}
					});
				}
			}
		}
	}, ".width-btn");
	siteWidth.on("click", function() {
		return false;
	});
	siteWidthWrapInner.on("click", function() {
		return false;
	});
};

//用户中心
Ev.admin.usercenter = function() {
	//选择好需要的dom元素
	var use = Ev.admin.o.user,
		curUser = use.children("a.user-center-a"),
		usercenterListWrap = use.children(".usercenter-list-wrap"),
		usercenterList = usercenterListWrap.find("div.usercenter-list"),
		list = usercenterList.find("dl.dl-list")
	litem = list.children();
	//
	use.on('click', function(event) {
		event.stopPropagation()
	});
	curUser.click(function() {
		Ev.admin.closeLayer();
		use.css({
			"position": "relative"
		});
		usercenterListWrap.css({
			"display": "block"
		});
		Ev.admin.openLayer.push(usercenterListWrap);
		usercenterList.cScroll({
			w: 6,
			tbB: false
		});
	});
	litem.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			var that = $(this),
				id = that.data("name");
			switch (id) {
				case "myHome":
				case "myCenter":
				case "myPrassword":
					var sUrl = that.data('url');
					// Ev.admin.pageModeSwitch(4,'user_index.php?is_frame=2', '', '');
					if (Ev.pubVar.saveVar) {
						var manageJson = {
							but_1: {
								text: "确定",
								fun: function() {
									Ev.pubVar.saveVar = false;
									window.location.href = sUrl;
								}
							},
							but_2: {
								text: "取消",
								fun: function() {}
							}
						};
						window.parent.sysDefine.manage('您的页面有更改，是否保存后再继续？', 3, manageJson, 270);
					} else {
						Ev.pubVar.saveVar = false;
						window.location.href = sUrl;
					}
					break;
				case "myLogout":
					function myLogout() {
						Ev.admin.tj.fun.locationWIframe("http://www.ev123.net/re_change_host.php?out=1");
						sysDefine.webEternityMsg(1, "正在退出...");
						var time = UTCTimeDemo();
						$.post("/ajax_get_info.php", {
								type: "271",
								u: time
							},
							function(data) {
								setTimeout("out_login()", 3000);
							}
						);
					}
					var manageJson = {
						but_1: {
							text: "确定",
							fun: function() {
								Ev.pubVar.saveVar = false;
								myLogout();
							}
						},
						but_2: {
							text: "取消"
						}
					};
					sysDefine.manage('您确定要退出吗？', 3, manageJson, 270);
					break;
			}
			usercenterListWrap.fadeOut(150);
		}
	});
};

//版本切换
Ev.admin.siteVersion = function() {
	var svs = Ev.admin.o.svs,
		pcBut = svs.children(".version-but").children(".v-pc"),
		pcVerList = svs.children(".pc-version-wrap");
	pcBut.on({
		click: function(event) {
			if ($(this).children("a").hasClass("cur")) {
				if (Ev.pubVar.designMode) {
					if (Ev.pubVar.editStatus) {
						Ev.admin.openLayer.push(pcVerList);
						svs.css({
							"position": "relative"
						});
						pcVerList.fadeIn(150);
						return false;
					}
				} else {
					var sUrl = $(this).find("a").data("url");
					Ev.admin.pageModeSwitch(1, sUrl, '', '');
				}
			}
		}
	});
	pcVerList.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			if (Ev.pubVar.designMode == true) {
				var that = $(this),
					v = that.data("v"),
					dataV = parseInt(that.data("version"));
				if (v == "cp") {
					Ev.admin.cp.v.lookTempVersion = dataV;
					Ev.admin.cp.fun.openSelectTemp();
				} else if (v == "tj") {
					//Ev.admin.tj.v.tVersion = dataV;
					Ev.admin.tj.v.lookTempV = dataV;
					Ev.admin.tj.fun.openSelectTemp();
				}
			} else {
				var manageJson = {
					but_1: {
						text: "确定",
						fun: function() {
							$("#toolBackbuild").trigger("click")
						}
					},
					but_2: {
						text: "取消",
						fun: function() {}
					}
				};
				sysDefine.manage('您当前是在内容编辑模式，您确定要切换到设计模式？', 'warn_icon', manageJson, 270);
			}
		}
	}, "dd");
};

//网站编辑工具
Ev.admin.toolbar = function() {
	var toolbar = Ev.admin.o.toolbar,
		closeTimeFun, closeTime = null,
		tooldl = $("#dlToolbar"),
		moreTool = $("#adminMoreToolbarWrap"),
		toolSwitch = $("#toolSwitch");
	//定时器复制函数
	closeTimeFun = function() {
		closeTime = setTimeout(function() {
			var toolState = toolSwitch.data("state"),
				moreToolOpen = moreTool.data('open'),
				toolbarLock = toolbar.data("lock");
			if (toolbarLock == 0) {
				if (toolState == 0) {
					toolbar.removeClass("admin-toolbar-hover");
				}
				if (moreToolOpen == 1) {
					moreTool.css({
						"width": "0px"
					});
					tooldl.children("dd.open").removeClass("open");
					moreTool.removeData('open');
				}
			}
		}, 1000);
	};
	//给工具栏绑定鼠标经过事件
	toolbar.on({
		mouseenter: function() {
			toolbar.data("lock", 0);
		}
	});
	//打开关闭按钮
	toolSwitch.on("click", function() {
		var that = $(this),
			toolState = that.data("state");
		if (toolState == 0) {
			toolbar.addClass("admin-toolbar-hover");
			that.data("state", 1);
			that.attr("class", "tool-switch tool-switch-off");
		} else {
			toolbar.removeClass("admin-toolbar-hover");
			that.data("state", 0);
			that.attr("class", "tool-switch tool-switch-on");
		}
	});
	//网站工具鼠标经过
	tooldl.on({
		mouseenter: function() {
			clearTimeout(closeTime);
			var toolState = toolSwitch.data("state");
			if (toolState == 0) {
				toolbar.addClass("admin-toolbar-hover");
			}
		},
		mouseleave: function() {
			closeTimeFun();
		}
	});
	//网站主工具每项绑定事件
	tooldl.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			var that = $(this),
				thisId = that.attr("id"),
				showObj = moreTool.find("#" + thisId + "_more"),
				moreToolOpen = moreTool.data("open");
			moreTool.children().hide();
			if (moreToolOpen) {
				that.siblings(".open").removeClass("open");
			}
			//通过判断单击不同的id来执行不同的处理方式
			switch (thisId) {
				case "toolAdvancedfun":
					//判断是否是高级功能，如果是单独执行
					sysDefine.Iframe('高级功能', '/VNew/advanced.php', 786, 535);
					//sysDefine.Iframe ('高级功能', '/templates/VNew/tj/hmo_style_edit.html', 786, 535);
					break;
					/*case "toolColumn":
						// Ev.admin.tj.fun.openAddChannel('/VNew/tj/copyChannel.php');
						// Ev.admin.openAddChannel('/VNew/column_add.php?tj=1');
						// get_url_window('/VNew/column_add.php?tj=1','栏目管理',786,520);
						Ev.admin.openAddChannel('/VNew/column_list.php');
						break;*/
					/*case "toolAddrow":
					Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=2');
					if (Ev.admin.cp.v.lookTempId != Ev.admin.cp.v.usingTempId) {
						sysDefine.webMsg(3, "需保存后再添加模块！");
						return false;
					} else {
						//判断是否是拖拽版添加模块，如果是先加在模块相对应的图片
						var ullayoutlist = showObj.find("ul.drog-layout-list,ul.drag-sys-layout-list");
						if (!ullayoutlist.data("imgload")) {
							ullayoutlist.children("li").each(function() {
			          var da = Ev.pubFun.s_j($(this).attr("data-attr")),
			            addimg = $('<img src="' + da.img + '" />');
			          addimg.load();
			        });
							ullayoutlist.data("imgload", 1);
						}
					}
					break;
				case "toolAddConrow":
					Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=1');
					break;*/
				case "toolUpcon":
					//判断是否是发布内容功能，如果是单独执行
					sysDefine.Iframe('内容管理', '/VNew/con_list', 786, 515);
					break;
				case "toolBackbuild":
					//判断是否是返回设计，如果是单独执行
					var sUrl = that.data("url");
					Ev.admin.pageModeSwitch(1, sUrl, '', '');
					break;
				case 'toolUpgrade':
					if (Ev.pubVar.saveVar) {
						var manageJson = {
							but_1: {
								text: "确定",
								fun: function() {
									Ev.pubVar.saveVar = false;
									window.location.href = '/user_make_shop.php';
								}
							},
							but_2: {
								text: "取消",
								fun: function() {}
							}
						};
						window.parent.sysDefine.manage('您的页面有更改，确定离开页面吗？', 3, manageJson, 270);
					} else {
						Ev.pubVar.saveVar = false;
						window.location.href = '/user_make_shop.php';
					}
					break;
				case 'hangye':
					sysDefine.Iframe('行业应用', '/VNew/hangye.php', 786, 535);
					break;
			}
			if (showObj.length) {
				that.addClass("open");
				var w = 0,
					t = that.position().top,
					x = 8,
					xw = 0,
					lil = showObj.find("ul:last li");
				if (thisId == "toolAddrow") {
					x = 7;
					lil = showObj.find("ul.drog-layout-list li");
				}
				showObj.show();
				lil.each(function(i) {
					w += $(this).width() + 16;
					if (i < x) {
						xw = w;
					}
				});
				if (thisId == "toolAddrow") {
					w = xw;
				} else {
					w = w > xw ? xw : w;
				}
				showObj.width(w + 30);
				if (moreToolOpen) {
					moreTool.animate({
						marginTop: t
					}, 200).css("width", (w + 50) + "px");
				} else {
					moreTool.data("open", 1);
					moreTool.css("margin-top", t + "px").animate({
						width: w + 50
					}, 200);
				}
			}
		}
	}, "dd");
	//给子类外层div绑定事件
	moreTool.on({
		mouseenter: function() {
			clearTimeout(closeTime);
		},
		mouseleave: function() {
			closeTimeFun();
		}
	});
	//给子类所有的工具绑定事件
	moreTool.on({
		mouseenter: function() {
			$(this).addClass("hover");
		},
		mouseleave: function() {
			$(this).removeClass("hover");
		},
		click: function() {
			//鼠标单击事件
			var that = $(this),
				tId = that.attr("id");
			//通过判断单击的对象来执行不同的函数
			switch (tId) {
				/*case 'dragMotypeDefault' : case 'dragMotypeBlank' :
					var defineStyleType = tId == 'dragMotypeDefault' ? 0 : 4;
					$.get("/VNew/ajax.php?type=15&defineStyleType="+ defineStyleType +"&defineStyleId=0");
					//拖拽版的模块样式设置
					Ev.pubVar.wIframe[0].contentWindow.DF.config.mStyle = that.attr("data-curMo");
					that.addClass("cur").siblings().removeClass("cur");
					$("#dragMotypeSelect").children("img").attr("src", "/images/VNew/tj/Module_img/select_Mo.png");
				break;
				case 'dragMotypeSelect' :
					Ev.admin.tj.fun.selectMoType(that,tId);
					toolbar.data('lock',1);
				break;
        case 'topAreaLayout' : case 'headerLayout' : case 'logoLayout' : case 'searchLayout' : case 'shopCartLayout' :case 'navLayout' : case 'bannerLayout' : case 'footerLayout' :
          Ev.admin.tj.fun.addSysMo(that);
        break;

				//拖拽版的模块行添加函数
				case  'dragLayout_1': case  'dragLayout_2': case  'dragLayout_3': case  'dragLayout_4': case  'dragLayout_16': case  'dragLayout_5': case  'dragLayout_6': case  'dragLayout_7': case  'dragLayout_8': case  'dragLayout_12': case  'dragLayout_13': case  'dragLayout_14': case  'dragLayout_15': case  'dragLayout_20': case  'dragLayout_21': case  'dragLayout_22': case  'dragLayout_23': case  'dragLayout_11': case  'dragLayout_28': case  'dragLayout_29': case  'dragLayout_30':
					Ev.admin.tj.fun.addRow(that);
				break;
				case 'dragLayout_120':
				Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=1');
				break;*/
				/*一键添加*/
				case 'addConrowBut':
					Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=1');
					break;
				case 'addLayoutBut':
					Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=2');
					break;
					/*case 'addElementBut' :
						Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=3');
					break;*/
				case 'addSysModuleBut':
					Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=3');
					break;
					// 网站栏目
				case 'siteColumnNew':
					Ev.admin.openAddChannel('/VNew/tj/copyChannel.php?c_id=1');
					break;
				case 'siteColumnAdmin':
					Ev.admin.openAddChannel('/VNew/column_list.php');
					break;
				case 'siteContentUp':
					sysDefine.Iframe('内容管理', '/VNew/con_list.php', 786, 515);
					break;
				case 'siteColumnDesign':
					Ev.admin.o.sep.find('.cur-edit-page').trigger('click');
					return false;
					break;
					//标准版模版选择
				case 'boutiqueWebBut':
					Ev.admin.cp.v.lookTempVersion = parseInt(that.data("version"));
					Ev.admin.cp.fun.openSelectTemp();
					break;
					//拖拽版模版选择
				case 'tjWebBut':
					Ev.admin.tj.v.lookTempVersion = parseInt(that.data("version"));
					Ev.admin.tj.fun.openSelectTemp();
					break;
					//查看历史记录和收藏模版
				case 'tempHistoryBut':
				case 'tempFavoritesBut':
					if (Ev.pubVar.version == "tj" || Ev.pubVar.version == 'copytj') {
						if (Ev.pubVar.version == 'copytj') {
							sysDefine.Iframe('自由拖拽模板', '/VNew/select_templates.php?copytj=1', 786, 540);
						} else {
							Ev.admin.tj.v.lookTempVersion = parseInt(that.data("version"));
							Ev.admin.tj.fun.openSelectTemp();
						}
					}
					if (Ev.pubVar.version == "cp") {
						Ev.admin.cp.v.lookTempVersion = parseInt(that.data("version"));
						Ev.admin.cp.fun.openSelectTemp();
					}
					break;
					//网站栏目
					/*case 'addSiteColumn' :
						get_url_window('/VNew/column_add.php?tj=1','栏目管理',786,520);
					break;
					case 'siteColumnAdmin' :
						get_url_window('/VNew/column_list.php?tj=1','栏目管理',786,520);
					break;
					case 'xialaColumnAdmin' :
						get_url_window('/VNew/column_xiala.php?tj=1','栏目管理',786,520);
					break;*/
					//网站会员
				case 'memberAdminBut':
				case 'memberGradeBut':
				case 'memberReadersBut':
				case 'memberPublishBut':
				case 'memberIntegralBut':
				case 'bbsLayoutAddBut':
				case 'bbsLayoutAdminBut':
				case 'bbsPostAdminBut':
				case 'bbsMemberSearchBut':
				case 'bbsAdvancedBut':
				case 'bbsStyleBut':
				case 'orderAdminBut':
				case 'linePayBut':
				case 'sendBut':
				case 'tuanBut':
				case 'returnsBut':
				case 'integralBut':
				case 'shoppingCarBut':
				case 'invoiceBut':
					var dataUrl = that.data("url");
					Ev.admin.pageModeSwitch(3, dataUrl, '', '');
					Ev.admin.o.toolbar.trigger("mouseleave");
					break;
				case 'chargeServeBut':
				case 'upgradeSiteBut':
					var dataUrl = that.data("url");
					Ev.admin.pageModeSwitch(4, dataUrl, '', '');
					Ev.admin.o.toolbar.trigger("mouseleave");
					break;
			}
		}
	}, "li");
};

/*
toolBackbuild 返回设置
toolAddrow 添加模块
toolTemplate 模板选择
toolColumn 栏目管理
toolUpcon 内容管理
toolAdvancedfun 高级功能
toolMember 网站会员
toolBbs 论坛管理
toolMall 商城管理
toolUpgrade 购买升级
hangye 行业组件

switchoverButArea 内容管理界面 / 高级管理界面
 */
Ev.admin.iconManage = function(iType) {
		if (!iType) {
			return false;
		}
		iType = (Ev.pubVar.version == 'cp' && iType < 9) ? (parseInt(iType) + 4) : iType;
		/**
		 * 界面类型
		 * tj : 首页界面(1),内容界面(2),高级界面(3),个人中心(4)
		 * pc : 首页界面(5),内容界面(6),高级界面(7),个人中心(8)
		 * public : 专题页（9） 行业组件(10)
		 */
		var json = {
			'toolBackbuild': [2, 3, 4, 6, 7, 8, 9, 10],
			'toolAddrow': [1],
			'toolAddConrow': [1],
			'toolTemplate': [1, 5],
			'toolColumn': [1, 5],
			'toolUpcon': [1, 2, 3, 5, 6, 7, 10],
			'toolAdvancedfun': [1, 2, 3, 5, 6, 7, 10],
			'toolUpgrade': [1, 5],
			'switchoverButArea': [2, 3, 4, 6, 7, 8, 10]
		};

		if (Ev.pubVar.version == 'cp') {
			json['toolMember'] = json['toolBbs'] = json['toolMall'] = [0];

			var iTemType = Ev.admin.cp.v.usingTempVersion;
			if (iTemType == 3 || iTemType == 7) {
				json['toolMember'] = [5, 7];
			}

			if (iTemType == 7) {
				json['toolBbs'] = [5, 7];
			} else if (iTemType == 3) {
				json['toolMall'] = [5, 7];
			}

			if ((iTemType == 1 || iTemType == 6) && iType == 5) {
				$("#selectLanguage").show();
			} else {
				$("#selectLanguage").hide();
			}
		}

		$.each(json, function(id, arr) {
			$("#" + id).hide();
			if (jQuery.inArray(iType, arr) != -1) {
				$("#" + id).show();
			}
		});

		if (iType == 2 || iType == 6) {
			$("#switchoverButArea").find("a").hide().end().find("a.design-a,a.conadmin-a").css({
				"display": "inline-block"
			});
		} else if (iType == 3 || iType == 7) {
			$("#switchoverButArea").find("a").hide().end().find("a.design-a,a.advancedfunadmin-a").css({
				"display": "inline-block"
			});
		} else if (iType == 4 || iType == 8) {
			$("#switchoverButArea").find("a").hide().end().find("a.design-a").css({
				"display": "inline-block"
			});
		} else if (iType == 10) {
			$("#switchoverButArea").find("a").hide().end().find("a.design-a,a.hangYefunadmin-a").css({
				"display": "inline-block"
			});
		}


		var iIndexPage = (iType == 1 || iType == 5) ? 1 : 0;

		if (Ev.pubVar.version == 'cp') {
			var oTopId = $("#selectEditPage, #adminHelpBut, #adminSaveBut");
		} else {
			var oTopId = $("#selectEditPage, #adminHelpBut, #adminSaveBut, #selectLanguage, #adminSiteWidthBut");
		}

		if (iIndexPage) {
			oTopId.show();
			Ev.pubVar.designMode = true;
			if (Ev.indexPage == true) {
				$("#selectEditPage .cur-edit-page").html('<em title="首页">首页</em>');
			}
		} else {
			oTopId.hide();
			Ev.pubVar.designMode = false;
			Ev.indexPage = true;
		}
	}
	//后台页面模式切换函数
Ev.admin.pageModeSwitch = function(mode, url, fun, fun1) {
	if (!url) {
		return false;
	}
	var mode = mode * 1;
	if (Ev.pubVar.saveVar) {
		var manageJson = {
			but_1: {
				text: "确定",
				fun: function() {
					Ev.pubVar.saveVar = false;
					Ev.admin.tj.fun.locationWIframe(url);
					if (typeof fun == 'function') {
						fun();
					}
					Ev.pubVar.wIframe.one("load", function() {
						Ev.admin.iconManage(mode);
					});
					$("#quickSwitchTemp").find("span.quick-close").trigger('click');
				}
			},
			but_2: {
				text: "取消",
				fun: function() {
					if (typeof fun1 == 'function') {
						fun1();
					}
				}
			}
		};
		sysDefine.manage('您的页面有更改，您确定不保存并离开本页面吗？', 3, manageJson, 270);
	} else {
		Ev.admin.tj.fun.locationWIframe(url);
		if (typeof fun == 'function') {
			fun();
		}
		//setTimeout(function(){Ev.admin.iconManage(mode);},2000);
		Ev.pubVar.wIframe.one("load", function() {
			Ev.admin.iconManage(mode);
		});
		$(document).scrollTop(0);
	}
};
//网站编辑和设计界面切换
Ev.admin.switchButFun = function() {
	var switchBut = Ev.admin.o.switchoverButArea;
	switchBut.on({
		click: function() {
			var sId = $(this).data("id");
			switch (sId) {
				case "designBut":
					// $("#toolBackbuild").trigger("click");
					if(Ev.admin.tj.v.is_action){
						$("#channel_manage").find(".curedit a").trigger('click');
					}else{
						$("#toolBackbuild").trigger("click");
						// Ev.admin.pageModeSwitch(1, $(this).data('url'), '', '');
					}
					break;
				case "conEditBut":
					$("#toolUpcon").trigger("click");
					break;
				case "advancedfunEditBut":
					$("#toolAdvancedfun").trigger("click");
					break;
				case "hangYefunEditBut":
					$("#hangye").trigger("click");
					break;
			}
		}
	}, "a");
};
//在线客服
Ev.admin.online = function() {
	var online = Ev.admin.o.online;

	function openFun() {
		if (online.data("open") != 1) {
			online.addClass("online-area-open").animate({
				right: -1
			}, 500).data("open", 1);
		} else {
			online.animate({
				right: -online.outerWidth()
			}, 500, function() {
				$(this).removeClass("online-area-open").removeData("open");
				$(this).children(".online-con-area").children(".online-con-inner").removeData("show");
			});
		}
	}
	online.on({
		click: function() {
			var sId = $(this).data('id'),
				sUrl;
			switch (sId) {
				case 'service':
					openFun();
					break;
				case 'league':
					var sUrl = $(this).data("url");
					if (Ev.pubVar.saveVar) {
						var manageJson = {
							but_1: {
								text: "确定",
								fun: function() {
									Ev.pubVar.saveVar = false;
									window.location.href = sUrl;
								}
							},
							but_2: {
								text: "取消",
								fun: function() {}
							}
						};
						window.parent.sysDefine.manage('您的页面有更改，确定离开页面吗？', 3, manageJson, 270);
					} else {
						Ev.pubVar.saveVar = false;
						window.location.href = sUrl;
					}
					break;
			}
		}
	}, "div.online-open-m a")
	online.on({
		mouseenter: function() {
			$(this).addClass("icon-item-hover");
		},
		mouseleave: function() {
			$(this).removeClass("icon-item-hover");
		},
		click: function() {
			var sUrl = $(this).data("url"),
				id = $(this).data("id");
			if (!sUrl) {
				return false;
			}
			if (id == "qq") {
				var qqIframe = window.open(sUrl);
				setTimeout(function() {
					qqIframe.close();
				}, 15000);
			} else if (id == 'read' || id == 'manual') {
				window.open(sUrl, '_blank');
			} else {
				if (Ev.pubVar.saveVar) {
					var manageJson = {
						but_1: {
							text: "确定",
							fun: function() {
								Ev.pubVar.saveVar = false;
								window.location.href = sUrl;
							}
						},
						but_2: {
							text: "取消",
							fun: function() {}
						}
					};
					window.parent.sysDefine.manage('您的页面有更改，确定离开页面吗？', 3, manageJson, 270);
				} else {
					Ev.pubVar.saveVar = false;
					window.location.href = sUrl;
				}
			}
		}
	}, ".icon-item");
};
//显示我的网址层
Ev.admin.showMyWeburl = function() {
	var previewBut = Ev.admin.o.adminPreviewBut,
		times, showSize = previewBut.children(".show-size-address");
	previewBut.on({
		mouseenter: function() {
			times = setTimeout(function() {
				showSize.data("show", 1).fadeIn(300);
			}, 500);
		},
		mouseleave: function() {
			clearTimeout(times);
			if (showSize.data("show") == 1) {
				showSize.fadeOut(600).removeData("show");
			}
		}
	})
};
/**界面说明**/
Ev.admin.interfaceFun = function() {
	var but = Ev.admin.o.adminHelpBut,
		helpDiv = $("#interfaceHelp");
	but.on("click", function() {
		helpDiv.show();
		helpDiv.on("click", function() {
			helpDiv.children(".help-prompt-area").children(".prompt-box").fadeOut(1000, function() {
				helpDiv.hide();
			});
		})
		var explain = ['webVersionSwitch', 'selectEditPage', 'adminSaveBut', 'selectLanguage', "toolAddrow", "toolTemplate", "toolColumn", "toolUpcon", "toolAdvancedfun", "toolUpgrade", "onlineArea"],
			x = 0,
			n;
		for (; n = explain[x]; x++) {
			var obj = $("#" + n);
			if (!obj.is(":hidden") && obj.length) {
				var promptBox = helpDiv.children(".help-prompt-area").children(".prompt-box[data-id='" + n + "']");
				promptBox.fadeIn(1000);
				switch (n) {
					case 'webVersionSwitch':
					case 'selectEditPage':
					case 'adminSaveBut':
					case 'selectLanguage':
						var l = obj.offset().left,
							t = obj.offset().top - $(document).scrollTop(),
							h = obj.outerHeight() + 10;
						promptBox.css({
							left: l,
							top: t + h
						});
						break;
					case 'toolAddrow':
					case 'toolTemplate':
					case 'toolColumn':
					case 'toolUpcon':
					case 'toolAdvancedfun':
					case 'toolUpgrade':
						var l = obj.offset().left,
							t = obj.offset().top - $(document).scrollTop(),
							h = obj.outerHeight(),
							w = obj.outerWidth();
						promptBox.css({
							left: l + w + 10,
							top: t + 5
						});
						break;
					case 'onlineArea':
						var t = obj.offset().top - $(document).scrollTop(),
							h = obj.outerHeight();
						promptBox.css({
							right: 60,
							top: t + h / 2
						})
				}
			}
		}
		return false;
	})
};
/*选择模版函数*/
Ev.admin.SelectTempFun = function(sName) {
	var oSelectT = Ev.admin.o.selectTempAlert;
	oSelectT.have = true;
	oSelectT.iframeName = sName;
	oSelectT.iframes = $('iframe[name="' + sName + '"]');
	oSelectT.evPopup = oSelectT.iframes.parents(".evPopup");
	oSelectT.numbers = oSelectT.evPopup.data("dataIndex");
	$("body").children(".evPopupShade").each(function() {
		if ($(this).data("dataIndex") == oSelectT.numbers)
			oSelectT.evPopupShade = $(this);
	});
	Ev.admin.hideSelectTemp();
};
//隐藏选择模板窗口
Ev.admin.hideSelectTemp = function() {
	var oSelectT = Ev.admin.o.selectTempAlert;
	if (oSelectT.have) {
		var anewtemp = Ev.admin.o.quickSwitchTemp.find(".quick-anewtemp");
		var nLeft = anewtemp.offset().left,
			nTop = anewtemp.offset().top;
		oSelectT.evPopup.data({
			w: oSelectT.evPopup.width(),
			h: oSelectT.evPopup.height(),
			p: oSelectT.evPopup.css("position"),
			l: oSelectT.evPopup.css("left"),
			t: oSelectT.evPopup.css("top")
		}).css({
			overflow: 'hidden'
		}).animate({
			width: 0,
			height: 0,
			left: nLeft,
			top: nTop,
			opacity: 0
		}, 600, function() {
			oSelectT.evPopupShade.hide();
			anewtemp.css({
				position: 'relative'
			}).animate({
				top: -10
			}, 100, function() {
				$(this).animate({
					top: 10
				}, 100, function() {
					$(this).animate({
						top: 0
					}, 50);
				});
			})
		});
		Ev.admin.o.quickSwitchTemp.css({
			visibility: 'visible'
		}).animate({
			bottom: 0
		}, 300);
	}
};
//显示选择模板窗口
Ev.admin.showSelectTemp = function() {
	var oSelectT = Ev.admin.o.selectTempAlert;
	oSelectT.evPopupShade.show();
	oSelectT.evPopup.animate({
		width: oSelectT.evPopup.data("w"),
		height: oSelectT.evPopup.data("h"),
		left: oSelectT.evPopup.data("l"),
		top: oSelectT.evPopup.data("t"),
		opacity: 1
	}, 400);
	Ev.admin.o.quickSwitchTemp.animate({
		bottom: -60
	}, 300, function() {
		$(this).css({
			visibility: 'hidden'
		});
	})
	oSelectT.have = false;
};
//移除选择模板窗口
Ev.admin.removeSelectTemp = function() {
	var oSelectT = Ev.admin.o.selectTempAlert;
	if (oSelectT.have) {
		Ev.admin.o.quickSwitchTemp.animate({
			bottom: -60
		}, 300, function() {
			$(this).css({
				visibility: 'hidden'
			});
		});
		oSelectT.evPopupShade.remove();
		oSelectT.evPopup.remove();
		oSelectT.have = false;
	}
	$("#pcVersionList").find('dd').each(function() {
		if ($(this).data('version') == Ev.admin.cp.v.usingTempVersion) {
			$(this).addClass('cur');
		} else {
			$(this).removeClass('cur');
		}
	});
};
//给快速设置按钮绑定事件
Ev.admin.quickSwitchTemp = function() {
	var quickSwitch = Ev.admin.o.quickSwitchTemp,
		oSelectT = Ev.admin.o.selectTempAlert;
	quickSwitch.on({
		click: function() {
			var id = $(this).data("id");
			switch (id) {
				case "anewtemp":
					Ev.admin.showSelectTemp();
					break;
				case "favoritesmp":
					oSelectT.iframes[0].contentWindow.temp.fun.favoritesTemp();
					break;
				case "nexttemp":
					oSelectT.iframes[0].contentWindow.temp.fun.prevNextTemp("next");
					break;
				case "prevtemp":
					oSelectT.iframes[0].contentWindow.temp.fun.prevNextTemp("prev");
					break;
				case 'savetemp':
					$("#adminSaveBut a").trigger("click");
					break;
			}
		}
	}, ".btn-area span");
	quickSwitch.on({
		click: function() {
			Ev.admin.removeSelectTemp();
		}
	}, ".quick-close");
	quickSwitch.on({
		click: function() {
			var t = $(this);
			if (!t.hasClass('cur')) {
				var tempid = t.data('id'),
					tag = t.data('bigver');
				oSelectT.iframes[0].contentWindow.temp.fun.tempColorSwitch(t, tempid, tag);
				t.addClass('cur').siblings('em').removeClass('cur');
			}
		}
	}, '.color-area em');
};
Ev.admin.showTempCaseExplain = function(tid) {
	var src = '/VNew/caseExplain.php?id=' + tid;
	$.popup({
		head: {
			text: "网站案例解析说明"
		},
		addTarget: $('body'),
		area: {
			w: 686,
			h: 480
		},
		type: 5,
		offset: {
			fix: 1
		},
		cName: "CaseExplain",
		con: {
			src: src
		},
		animate: {
			type: 0
		}
	});
};
/* 打开添加栏目频道窗口函数 */
Ev.admin.openAddChannel = function(src) {
	Ev.admin.o.channelWindow = $.popup({
		head: {
			text: "网站栏目"
		},
		addTarget: $('body'),
		type: 5,
		offset: {
			fix: 1
		},
		con: {
			src: src
		},
		animate: {
			type: 1
		},
		area: {
			w: 910,
			h: 530
		}
	});
	Ev.admin.o.channelWinDom = false;
};
/*添加栏目频道动画*/
Ev.admin.addChannelAnimate = function(alertno, channelName) {
	var icon = $('<b class="add-channel-icon">' + channelName + '</b>'),
		zz = $('<b class="channel-select-zz"></b>'),
		sepL = Ev.admin.o.sep.offset().left,
		sepT = Ev.admin.o.sep.offset().top,
		evPopup = $("#evPopup_" + alertno);
	zz.css({
		left: sepL + 'px',
		top: sepT + 'px'
	});
	$('body').append(icon, zz);
	var startT = evPopup.offset().top + evPopup.height() / 2,
		startL = evPopup.offset().left + evPopup.width() / 2 - icon.width() / 2;
	icon.css({
		left: startL + 'px',
		top: startT + 'px',
		'display': 'none'
	});
	icon.fadeIn(500);
	setTimeout(function() {
		var path = new $.path.bezier({
			start: {
				x: startL,
				y: startT,
				angle: 20,
				length: 0.1
			},
			end: {
				x: sepL + 64,
				y: sepT + 9,
				angle: -120,
				length: 0.2
			}
		});
		icon.animate({
			path: path
		}, 1000);
	}, 1000);
	setTimeout(function() {
		icon.remove();
		zz.remove();
	}, 3000);
};

//成品版的全局对象用来存放成品版的一些信息
Ev.admin.cp = {};
//成品版的存放dom元素的对象
Ev.admin.cp.o = {};
//成品版的一些公用方法
Ev.admin.cp.fun = {};
//成品版打开选择模版窗口
Ev.admin.cp.fun.openSelectTemp = function() {
	if ((Ev.pubVar.version == "cp" || Ev.pubVar.version == "copytj") && Ev.admin.o.selectTempAlert.have) {
		Ev.admin.showSelectTemp();
	} else {
		//alertIframe.attr("src",'/VNew/select_templates.php');
		sysDefine.Iframe('精品定制模板', '/VNew/select_templates.php', 786, 540);
	}
};


//拖拽版的全局对象用来存放成品版的一些信息
Ev.admin.tj = {};
//拖拽版的存放dom元素的对象
Ev.admin.tj.o = {};
//拖拽版的一些公用方法
Ev.admin.tj.fun = {};
// 拖拽版打开自定义默认模块样式窗口
Ev.admin.tj.fun.openDMSE = function(types, styleid) {
	var src = '';
	if (types == 'HMo') {
		src = '/VNew/tj/define_style_add.php?type=1';
		if (styleid) {
			src += '&id=' + styleid;
		}
	} else {
		src = '/VNew/tj/define_style_add.php';
		if (styleid) {
			src += '?id=' + styleid;
		}
	}
	$.popup({
		head: {
			text: "自定义默认模块样式"
		},
		addTarget: $('body'),
		area: {
			w: 786,
			h: 515
		},
		type: 5,
		offset: {
			fix: 1
		},
		cName: "myAlert",
		con: {
			src: src
		},
		animate: {
			type: 1
		}
	});
};
// 拖拽版打开自定义默认模块样式窗口
Ev.admin.tj.fun.openDMVE = function(types) {
	var src = '/VNew/tj/define_style_preview.php?type=' + types,
		h = types == 1 ? 450 : 220;
	$.popup({
		head: {
			text: "预览模块样式"
		},
		addTarget: $('body'),
		area: {
			w: 500,
			h: h
		},
		type: 5,
		offset: {
			fix: 1
		},
		cName: "myAlert",
		con: {
			src: src
		},
		animate: {
			type: 1
		}
	});
};

//拖拽版打开选择模版窗口
Ev.admin.tj.fun.openSelectTemp = function() {
	if (Ev.pubVar.version == "tj" && Ev.admin.o.selectTempAlert.have) {
		Ev.admin.showSelectTemp();
	} else {
		sysDefine.Iframe('自由拖拽模板', '/VNew/select_templates.php?tj=1', 786, 540);
	}
};
//拖拽版添加行模块函数
Ev.admin.tj.fun.addRow = function(obj) {
	var that = obj,
		da = Ev.pubFun.s_j(that.attr("data-attr")),
		win = Ev.pubVar.wIframe.contents(),
		add_con = win.find("#add_container");
	rowlast = add_con.children("div.customModuleRow:last"),
		ent = 0, sct = 0,
		enl = 0;
	if (rowlast.length) {
		ent = rowlast.offset().top + (rowlast.height() / 3);
		enl = rowlast.find("div.customModuleRowInner").offset().left;
		sct = ent + rowlast.height() - $(window).height();
	} else {
		ent = add_con.offset().top;
		enl = add_con.offset().left;
	}
	// if(rowlast){
	// 	addBeforeObj = 0;
	// }
	Ev.pubVar.winDocum.scrollTop(sct);
	var l = that.offset().left,
		t = that.offset().top + that.height(),
		anicon = $('<div class="animateIcon"><img src=' + da.img + ' /></div>').css({
			"left": l,
			"top": t,
			"opacity": 0.9
		});
	Ev.pubVar.winDocum.find("body").append(anicon);
	setTimeout(function() {
		var img = anicon.find("img"),
			h = img.height();
		anicon.animate({
			"top": ent,
			"width": Ev.pubVar.wIframeWin.DF.config.webWidth[0],
			"height": h,
			"left": enl,
			"opacity": 0.6
		}, 500, function() {
			Ev.pubVar.wIframeWin.DF.row.addRow(da.l, add_con);
			Ev.pubFun.iframeH(Ev.pubVar.wIframe);
		});
		setTimeout(function() {
			img.animate({
				'width': Ev.pubVar.wIframeWin.DF.config.webWidth[0],
				'height': h
			}, 500, function() {
				anicon.remove();
				Ev.pubVar.saveVar = true;
			});
		}, 10);
	}, 1);
};
/* 添加有内容的行 */
Ev.admin.tj.fun.openAddConRow = function(src) {
	src = src ? src : '/VNew/tj/RowTemplates.php';
	$.popup({
		head: {
			text: "选择添加模块"
		},
		addTarget: $('body'),
		type: 5,
		offset: {
			fix: 1
		},
		con: {
			src: src
		},
		animate: {
			type: 1
		},
		area: {
			w: 910,
			h: 530
		}
	});
};
//拖拽版选择默认添加行模块样式函数
Ev.admin.tj.fun.selectMoType = function(that, id) {
	switch (id) {
		case "dragMotypeSelect":
			Ev.admin.tj.o.dragMotypeSelect = that;
			$.popup({
				type: 5,
				area: {
					w: 656,
					h: 515
				},
				head: {
					text: "选择添加统一的模块样式"
				},
				animate: {
					type: 1
				},
				con: {
					src: '/VNew/css_style.php?tag=default_module_style_select'
				}
			});
			//get_url_window('/VNew/css_style.php?tag=module_defaule','选择添加统一的模块样式',668,526);
			break;
		case "dragHMotypeSelect":
			$.popup({
				type: 5,
				head: {
					text: "选择预设单行标题样式"
				},
				animate: {
					type: 1
				},
				con: {
					src: './templates/VNew/tj/hmo_style_select.html'
				}
			});
			break;
	}
};
// 通过更改src地址刷新前台页面
Ev.admin.tj.fun.locationWIframe = function(sUrl) {
	if (!sUrl) {
		return false;
	}
	Ev.pubVar.wIframe.attr("src", sUrl);
}

// 刷新前台页面
Ev.admin.tj.fun.refreshWIframe = function() {
	if (Ev.pubVar.wIframe.attr("src").indexOf("&pc_tj") > 0 || Ev.pubVar.wIframe.attr("src").indexOf("&tj_pc") > 0) {
		Ev.admin.tj.fun.refreshWIframeIndex();
	} else {
		Ev.pubVar.wIframeWin.location.reload(true);
	}
}

// 刷新页面到首页
Ev.admin.tj.fun.refreshWIframeIndex = function() {
	Ev.pubVar.wIframe.attr("src", Ev.pubVar.wIframe.data("indexurl"));
}


// 更新数据缓存
Ev.admin.tj.fun.updateWIframeData = function(sUrl) {
		if (!sUrl) {
			return false;
		}

		Ev.pubVar.wIframe.data("url", sUrl);
	}
	//更改网站背景函数
Ev.admin.tj.fun.setWebBg = function() {
	var srcUrl;
	if (Ev.pubVar.version == 'tj' || Ev.pubVar.version == 'copytj') {
		Ev.admin.tj.v.curEditObj = Ev.pubVar.wIframe.contents().find("body#webBody");
		Ev.admin.tj.v.curEditObjId = "webBody";
	}
	Ev.iframe = $.popup({
		head: {
			text: "设置网站背景"
		},
		type: 5,
		area: {
			w: 660,
			h: 515
		},
		animate: {
			type: 1
		},
		offset: {
			fix: 1
		},
		con: {
			src: '/VNew/css_style.php?tag=web_bg'
		}
	})
};
//用于页面加载完后调用的函数，并且初始化一些数据
Ev.admin.auto = function() {
	Ev.pubVar.wIframe = $("#navigate_iframe");
	//	Ev.pubVar.wIframeDom = Ev.pubVar.wIframe.contents();
	//	Ev.pubVar.wIframeWin = Ev.pubVar.wIframe[0].contentWindow;//把网站iframe存入一个公用变量中，备用。
	Ev.admin.o.sep = $("#selectEditPage");
	Ev.admin.o.sel = $("#selectLanguage");
	Ev.admin.o.user = $("#userCenter");
	Ev.admin.o.toolbar = $("#adminToolbar");
	Ev.admin.o.svs = $("#siteVersionSelect");
	Ev.admin.o.online = $("#onlineArea");
	Ev.admin.o.adminHelpBut = $("#adminHelpBut");
	Ev.admin.o.switchoverButArea = $("#switchoverButArea");
	Ev.admin.o.adminPreviewBut = $("#adminPreviewBut");
	Ev.admin.o.quickSwitchTemp = $("#quickSwitchTemp");
	Ev.admin.o.siteWidth = $("#adminSiteWidthBut");
	Ev.admin.selectEditPage();
	Ev.admin.languages();
	Ev.admin.usercenter();
	Ev.admin.websiteWidth();
	Ev.admin.toolbar();
	Ev.admin.siteVersion();
	Ev.admin.online();
	Ev.admin.showMyWeburl();
	Ev.admin.interfaceFun();
	Ev.admin.switchButFun();
	Ev.admin.quickSwitchTemp();

};
//拖建版需要加载完后执行的函数
Ev.admin.tj.auto = function() {
	Ev.admin.tj.o.toolAddrow = $("#toolAddrow_more");
	Ev.admin.tj.fun.setMoType();
}

Ev.pubVar = {}; //定义一个存放所有公用的数据或状态的公用变量,主要是用来子父框架之间的交互是用。
Ev.admin.cp.v = {}; //定义一个成品版下的存放一些公用变量的对象
Ev.admin.tj.v = {}; //定义一个拖建版下的存放一些公用变量的对象

Ev.pubVar.winSelf = window; //本身窗口变量
Ev.pubVar.winDocum = $(document); //得到本身的document对象。
Ev.pubVar.wIframe = null; //主要显示区域iframe，用来存放网站的iframe
Ev.pubVar.wIframeDom = null; //主要显示区域iframeDom，用来存放网站的iframeDom
Ev.pubVar.wIframeWin = null; //主要显示区域iframeWin，用来存放网站的iframe的window对象，用它可以访问框架内的变量
Ev.pubVar.alertArray = {}; //用于记录打开窗口的对象数字
Ev.pubVar.aIframe = null; //弹窗对象，用来记录当前打开的弹窗的iframe
Ev.pubVar.aIframeDom = null; //弹窗函数，用来记录当前打开的弹窗的Dom对象
Ev.pubVar.aIframeWin = null; //弹窗函数，用来记录当前打开的弹窗的window对象，用它可以访问框架内的变量
Ev.pubVar.saveVar = false; //是否有更改变量，如果有更改那么赋值为TRUE
Ev.pubVar.zoomSaveVar = false; //是否有更改页面大小变量，如果有更改那么赋值为TRUE
Ev.pubVar.designMode = true; //设计模式变量
Ev.shade = 0;
Ev.alerts = 0;
Ev.alertsNum = 0;
Ev.iframe = 0;
Ev.saveError = 0;
Ev.indexPage = true;
//用来记录选择模板窗口
Ev.admin.o.selectTempAlert = {
	have: false
};

Ev.pubVar.version = "tj"; //网站的类型，主要分为成品版--->cp,和拖建版--->tj,拷贝拖拽版---->copytj
Ev.pubVar.version_ = false;
//Ev.admin.cp.v.tVersion = 1;//当前您的模版属于的版本
Ev.admin.cp.v.lookTempVersion = 1; //这个是用来回显的版本变量
Ev.admin.cp.v.lookTempId = 1110; //预览的模板id当前模版的id
Ev.admin.cp.v.usingTempVersion = 1; //这个是用来回显的版本变量
Ev.admin.cp.v.usingTempId = 989; //当前使用的模板id
Ev.admin.cp.v.copyusingTempId = 1;
Ev.admin.cp.v.copylookTempId = 1;

Ev.admin.tj.v.lookTempVersion = 1; //这个是用来回显的版本变量
Ev.admin.tj.v.lookTempId = 1; //预览的模板id当前模版的id
Ev.admin.tj.v.usingTempVersion = 1; //这个是用来回显的版本变量
Ev.admin.tj.v.usingTempId = 1; //当前使用的模板id
Ev.admin.tj.v.mStyleClass = 1; //用于记录选中的预设添加模块样式的默认模块是自定义模块还是系统模块
Ev.admin.tj.v.mStyle = ""; //用于记录选中的预设添加模块样式
Ev.admin.tj.v.mhStyle = ""; //用于记录选中的预设添加单行标题模块样式
Ev.admin.tj.v.mStyleLook = ''; //用来记录你要查看的预设模块的id
Ev.admin.tj.v.mStyleEdit = 'edit'; //用来记录新建还是编辑预设模块
Ev.admin.tj.v.aIframe = null; //用来记录预设模块的弹窗对象
Ev.admin.tj.v.aIframeDom = null; //用来记录预设模块的弹窗Dom对象
Ev.admin.tj.v.aIframeWin = null; //用来记录预设模块的弹窗window对象
Ev.admin.tj.v.curEditObj = null; //用于记录当前你要编辑的模块对象
Ev.admin.tj.v.curEditObjId = null; //用于记录当前你要编辑的模块对象Id
Ev.admin.tj.v.navHoverflow = 1;

$(function() {
	if ($.browser.msie) {
		if ($.browser.version == 6) {
			var iezz = '<div style="color:#fff; position:absolute; top:200px; text-align:center; font:700 40px/40px; width:' + $('body').width() + 'px; z-index:3000;">请用IE6.0版本以上的浏览器，或者谷歌/火狐等浏览器。</div><div style="height:' + $('body').height() * 2 + 'px; width:' + $('body').width() + 'px; background-color:#000; filter:alpha(opacity:50); position:absolute; left:0px; top:0px; z-index:2000;"></div>';
			$("body").append(iezz);
		}
	}
	Ev.admin.auto();
	$(Ev.pubVar.winSelf).on('beforeunload', function() { //关闭窗口前判断是否保存
		if (Ev.pubVar.saveVar) {
			return '您的页面有更改，您确定不保存并离开吗？';
		}
	})
	Ev.pubVar.winDocum.on("click", function() {
		Ev.admin.closeLayer();
	})
	Ev.pubVar.wIframe.height($(Ev.pubVar.winSelf).height() * 2);
	//console.log(Ev.pubVar.wIframe)
	Ev.pubVar.wIframe.load(function() {

		Ev.pubVar.wIframeDom = $(this).contents();
		Ev.pubVar.wIframeWin = $(this)[0].contentWindow;
		Ev.pubVar.wIframeDom.click(function() {
			Ev.admin.closeLayer();
		});
		Ev.pubVar.wIframe.height('auto');
		Ev.pubFun.iframeH(Ev.pubVar.wIframe);
	});
	window.alertIframe = $("#alertIframe");
});