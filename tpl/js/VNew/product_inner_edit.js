/**************** 编辑状态下的内页小模块的编辑 *******************/
var InnerEdit = {};
/*添加操作句柄*/
InnerEdit.addEditDir = function(o, tagDom, fn) {
	$('body').children('.operateEdit').remove();
	var opArray = [],
		typeEdit = $('<small>样式设置</small>');
	//设置样式
	typeEdit.click(function() {
		parWin.Ev.admin.tj.v.curEditObjId = o.attr('id');
		parWin.Ev.admin.tj.v.curEditObj = o;
		fn();
	});
	opArray.push(typeEdit);
	var op = $('<span class="operateEdit wire operate-wire"></span>'),
		l = o.offset().left - 2,
		t = o.offset().top - 2,
		w = o.outerWidth(),
		h = o.outerHeight();
	for (i = 0; i < opArray.length; i++) {
		op.append(opArray[i]);
	}
	op.find("small").hover(function() {
		$(this).addClass("cur");
	}, function() {
		$(this).removeClass("cur");
	});
	op.css({
		left: l + 'px',
		top: t + 'px',
		width: w + 'px',
		height: h + 'px'
	});
	tagDom.append(op);
	op.on('mouseleave', function() {
		$(this).remove();
	})
};
/*移除操作句柄*/
InnerEdit.removeEditDir = function() {
	$('body').children('.operateEdit').remove();
};
/*元素鼠标经过调用函数*/
InnerEdit.mEnter = function(o, fn) {
	var w = o.width(),
		h = o.height();
	InnerEdit.addEditDir(o, $('body'), fn);
};
/*页面加载完执行函数*/
InnerEdit.auto = function() {
	// 绑定鼠标经过事件
	// 产品最终页的幻灯片
	$('#pPreview').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_preview_edit');
			});
		}
	});
	// 产品最终页的产品标题
	$('#pDetailsTitle').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_title_edit');
			});
		}
	});
	// 产品最终页的产品活动标签
	$('#pActivityTag').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_tagClass_edit');
			});
		}
	});
	// 产品最终页的产品价格
	$('#pPriceList').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_priceList_edit');
			});
		}
	});
	// 销量表格
	$('#pSaleSumTable').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_saleSum_table_edit');
			});
		}
	});
	// 批发表格
	$('#pStandardTable').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_standardTable_edit');
			});
		}
	});
	// 属性列表
	$('#pAttrList').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_attrList_edit');
			});
		}
	});
	// 产品服务列表
	$('#pServiceList').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_serviceList_edit');
			});
		}
	});
	// 产品规格类表
	$('#pStandardList').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_standardList_edit');
			});
		}
	});
	// 联系方式列表
	$('#pContactList').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_attrList_edit');
			});
		}
	});
	// 标签切换
	$('#pTabShowDetail').on({
		mouseenter: function() {
			var that = $(this);
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_tabSwitch_edit');
			});
		}
	});
	// 按钮
	$('#innerNowBuy,#innerAddCat,#yuyueButton').on({
		mouseenter : function(){
			var that = $(this);
			InnerEdit.mEnter(that,function(){
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=btn_style_edit');
			});
		}
	});
	// 购买数量
	$('#pBuySum').on({
		mouseenter : function(){
			var that = $(this);
			InnerEdit.mEnter(that,function(){
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=pro_buySum_edit');
			});
		}
	});
	// 相关产品设置
	// $('#pRelatedList').on({
	// 	mouseenter : function(){
	// 		var that = $(this);
	// 		InnerEdit.mEnter(that,function(){
	// 			DF.f.openPopup("样式设置", 'tj_website_admin/inner_module_style/product/pro_related_edit.html');
	// 		});
	// 	}
	// });
	$('.head-body-module').on({
		mouseenter: function() {
			var that = $(this),
					inDa = DF.f.s_j(that.attr("data-attr"));
			InnerEdit.mEnter(that, function() {
				DF.f.openPopup("样式设置", '/VNew/css_style.php?tag=head_body_module_style_edit&mtype=' + inDa.mt);
			});
		}
	});
};

$(function() {
	InnerEdit.auto();
});