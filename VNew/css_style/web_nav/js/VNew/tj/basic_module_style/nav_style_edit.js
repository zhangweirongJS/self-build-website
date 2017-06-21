/*
 author:;
 author:自定义导航;
 Date:;
 change ;
 */
/*---------------------------------------关于导航的编辑---------------------------*/
var copytj = pf.Pwin.Ev.pubVar.version,
  pcurNId = pf.Pwin.Ev.admin.tj.v.curEditObjId,
  pcurN = pf.Pwin.Ev.admin.tj.v.curEditObj,
  nums = copytj == 'copytj' ? pf.Pwin.Ev.admin.cp.v.copyusingTempId : pf.Pwin.Ev.admin.tj.v.usingTempId,
  temId = "skin_" + nums,
  curN = pcurN.children("#nav"),
  curNId = "nav",
  NW = pcurN.width(),
  NH = pcurN.height(),
  lastNItem = curN.find(".NItem:last"),
  Nstyle = "Nstyle";
// 页面加载完以后执行的方法
$(function() {
  // 给tab的标题绑定单击事件通过单击事件调用执行不同的函数
  $("#alert_tab_t").on({
    click: function() {
      var that = $(this),
        tId = that.data("id"),
        cDom = $("#" + tId);
      if (!that.hasClass('cur')) {
        that.addClass('cur').siblings().removeClass('cur');
        if (!Nset.getAttrSetFun.alreadyRun[tId]) {
          Nset.showLoading();
          setTimeout(function() {
            if (Nset.getAttrSetFun[tId]()) {
              pf.fncolor(cDom);
              pf.eleChange([pcurN]);
              cDom.find("input[name=opacityObj]").changeOpacity();
              Nset.hideLoading();
            }
          }, 1);
        }
        cDom.css('display', 'block').siblings().css('display', 'none');
      }
    }
  }, "li");
  $("#skinStyle_tab").trigger('click');
  lastNItem.addClass("NItemH");
});

/**模块自定义设置区域的函数**/
//设置模块
var Nset = {};
// 隐藏显示遮罩方法
Nset.showLoading = function() {
  $("#tabc_loading").show();
};
Nset.hideLoading = function() {
  $("#tabc_loading").hide();
};
// 定义一个存放回显值的对象
Nset.getAttrVal = {};
// 得到回显值的执行函数
Nset.getAttrRunFun = {
  'skinStyle': function() {
    var colorList = $("#color_list"),
      NstyleList = $("#N_style_list"),
      NstyleListUl = $("#N_style_list_ul"),
      NstyleIndex = $("#N_style_index"),
      Showstylelist = function(colorV, p) {
        // curClass_导航当前的class,c存储当前导航,b空白导航,d默认导航,did默认的数据id值,arraylist导航列表数组
        var curClass_ = /nav_\d+/.exec(curN.attr("class")),
          c, b, d, d_ = '',
          did = '',
          b_ = '',
          arraylist = [];
        b_ = curClass_ == "nav_1" ? 'cur' : '';
        did = copytj == 'copytj' ? 'nav_1000' : 'nav';
        if (curClass_ == null || curClass_ == 'nav_1000') {
          d_ = 'cur';
        }
        b = '<li class="' + b_ + '" data-id="nav_1"><a href="javascript:;" title="空白"><img src="images/tj/nav_img/nav_1.png" /><em></em></a></li>';
        d = '<li class="default-nav ' + d_ + '" data-id="' + did + '"><a href="javascript:;" title="默认导航"><img src="images/tj/nav_img/nav.png" /><em></em></a></li>';
        curClass_ == "nav_1" ? arraylist.push(b, d) : arraylist.push(d, b);
        for (var i = 0; i < aData.nav.length; i++) {
          if (curClass_ == aData.nav[i].PId) {
            c = '<li class="cur" data-id="' + aData.nav[i].PId + '"><a href="javascript:;" title="当前正在使用的风格"><img src="' + aData.nav[i].PUrl + '" /><em></em></a></li>';
          }
          if (colorV != 0) {
            if (aData.nav[i].colorClass == colorV && curClass_ != aData.nav[i].PId) {
              arraylist.push('<li data-id="' + aData.nav[i].PId + '"><a href="javascript:;" title="' + aData.nav[i].Pname + '"><img src="' + aData.nav[i].PUrl + '" /></a><em></em></li>');
            }
          } else {
            if (curClass_ != aData.nav[i].PId) {
              arraylist.push('<li data-id="' + aData.nav[i].PId + '"><a href="javascript:;" title="' + aData.nav[i].Pname + '"><img src="' + aData.nav[i].PUrl + '" /></a><em></em></li>');
            }
          }
        }
        if (c) {
          arraylist.unshift(c);
        }
        var li = "";
        for (var i = (p - 1) * 10; i <= p * 10 - 1; i++) {
          if (arraylist[i]) {
            li += arraylist[i];
          } else {
            break;
          }
        }
        var span = '',
          spanC;
        for (var i = 1; i <= Math.ceil(arraylist.length / 10); i++) {
          spanC = i == p ? 'cur' : '';
          span += '<span title="第' + i + '页" class="' + spanC + '"></span>';
        }
        NstyleListUl.html(li);
        NstyleIndex.html(span);
      };
    // 给颜色dom绑定单击事件
    colorList.on({
      click: function() {
        var that = $(this),
          vals = that.data("val");
        if (!that.hasClass('cur')) {
          that.addClass('cur').siblings().removeClass('cur');
          Showstylelist(vals, 1);
        }
      }
    }, 'b');
    // 给模块皮肤列表添加绑定事件
    NstyleListUl.on({
      click: function() {
        $(this).addClass("cur").siblings().removeClass("cur");
        var newClass = $(this).data("id");
        curN.attr("class", "nav " + newClass);
        pf.eleChange_([pcurN]);
      }
    }, "li");
    // 给页码绑定单击事件
    NstyleIndex.on({
      click: function() {
        var that = $(this),
          i = that.index(),
          colorV = colorList.find(".cur").data('val');
        that.addClass("cur");
        that.siblings().removeClass('cur');
        Showstylelist(colorV, i + 1);
      }
    }, 'span');
    //确定按钮绑定事件
    $("#N_skinStyleEnter").on('click', function() {
      var t = $(this);
      Nset.Nenter(t);
    });
    // 恢复默认样式按钮绑定事件
    $("#N_skinStyleReset").on('click', function() {
      var id = copytj == 'copytj' ? 'nav_1000' : "nav";
      NstyleListUl.find('li').each(function(){
        var that = $(this);
        if(that.data('id') == id && !that.hasClass('cur')){
          that.trigger('click');
        }
      })
    });
  },
  'exteriorStyle': function() {
    Nset.getAttrVal.exteriorStyle = {
      abso: pf.gS(Nstyle, 'web_nav', '', 'position'),
      full: pf.gS(Nstyle, curNId, '', 'width'),
      ncw: parseInt(pf.gS(Nstyle, curNId, '.NCenter', 'width')),
      ncf: pf.gS(Nstyle, curNId, '.NCenter', 'float'),
      nmt: parseInt(pf.gS(Nstyle, curNId, '', 'margin-top')),
      nmb: parseInt(pf.gS(Nstyle, curNId, '', 'margin-bottom')),
      nbg: pf.gS(Nstyle, curNId, '.NMainBg', 'background'),
      nbgc: pf.gS(Nstyle, curNId, '.NMainBg', 'background-color'),
      nbgi: pf.gS(Nstyle, curNId, '.NMainBg', 'background-image'),
      nbgp: pf.gS(Nstyle, curNId, '.NMainBg', 'background-position'),
      nbgr: pf.gS(Nstyle, curNId, '.NMainBg', 'background-repeat'),
      nop: pf.gS(Nstyle, curNId, '.NMainBg', 'opacity'),
      nboc: pf.gS(Nstyle, curNId, '', 'border-color'),
      nbos: pf.gS(Nstyle, curNId, '', 'border-style'),
      nbow: parseInt(pf.gS(Nstyle, curNId, '', 'border-width')),
      nmbortc: pf.gS(Nstyle, curNId, '.NMain', 'border-top-color'),
      nbort: pf.gS(Nstyle, curNId, '', 'border-top'),
      nbortc: pf.gS(Nstyle, curNId, '', 'border-top-color'),
      nborts: pf.gS(Nstyle, curNId, '', 'border-top-style'),
      nbortw: parseInt(pf.gS(Nstyle, curNId, '', 'border-top-width')),
      nborb: pf.gS(Nstyle, curNId, '', 'border-bottom'),
      nborbc: pf.gS(Nstyle, curNId, '', 'border-bottom-color'),
      nborbs: pf.gS(Nstyle, curNId, '', 'border-bottom-style'),
      nborbw: parseInt(pf.gS(Nstyle, curNId, '', 'border-bottom-width')),
      nborl: pf.gS(Nstyle, curNId, '', 'border-left'),
      nborlc: pf.gS(Nstyle, curNId, '', 'border-left-color'),
      nborls: pf.gS(Nstyle, curNId, '', 'border-left-style'),
      nborlw: parseInt(pf.gS(Nstyle, curNId, '', 'border-left-width')),
      nborr: pf.gS(Nstyle, curNId, '', 'border-right'),
      nborrc: pf.gS(Nstyle, curNId, '', 'border-right-color'),
      nborrs: pf.gS(Nstyle, curNId, '', 'border-right-style'),
      nborrw: parseInt(pf.gS(Nstyle, curNId, '', 'border-right-width')),
      nmborts: pf.gS(Nstyle, curNId, '.NMain', 'border-top-style'),
      nmbortw: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'border-top-width')),
      nmborb: pf.gS(Nstyle, curNId, '.NMain', 'border-bottom'),
      nmborbc: pf.gS(Nstyle, curNId, '.NMain', 'border-bottom-color'),
      nmborbs: pf.gS(Nstyle, curNId, '.NMain', 'border-bottom-style'),
      nmborbw: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'border-bottom-width')),
      nmborl: pf.gS(Nstyle, curNId, '.NMain', 'border-left'),
      nmborlc: pf.gS(Nstyle, curNId, '.NMain', 'border-left-color'),
      nmborls: pf.gS(Nstyle, curNId, '.NMain', 'border-left-style'),
      nmborlw: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'border-left-width')),
      nmborr: pf.gS(Nstyle, curNId, '.NMain', 'border-right'),
      nmborrc: pf.gS(Nstyle, curNId, '.NMain', 'border-right-color'),
      nmborrs: pf.gS(Nstyle, curNId, '.NMain', 'border-right-style'),
      nmborrw: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'border-right-width')),
      nbgh : parseInt(pf.gS(Nstyle, curNId, '.NMainBg', 'height')),
      nmh : parseInt(pf.gS(Nstyle, curNId, '.NMain', 'height')),
      nmpl: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'padding-left')),
      nmpr: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'padding-right')),
      nmpt: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'padding-top')),
      nmpb: parseInt(pf.gS(Nstyle, curNId, '.NMain', 'padding-bottom')),
      sw: parseInt(pf.gS(Nstyle, curNId, '.NSub', 'width')),
      scpt: parseInt(pf.gS(Nstyle, curNId, '.NSubC', 'padding-top')),
      scpb: parseInt(pf.gS(Nstyle, curNId, '.NSubC', 'padding-bottom')),
      scpr: parseInt(pf.gS(Nstyle, curNId, '.NSubC', 'padding-right')),
      scpl: parseInt(pf.gS(Nstyle, curNId, '.NSubC', 'padding-left')),
      scbg: pf.gS(Nstyle, curNId, '.NSubC', 'background'),
      scbgc: pf.gS(Nstyle, curNId, '.NSubC', 'background-color'),
      scbgi: pf.gS(Nstyle, curNId, '.NSubC', 'background-image'),
      scbgp: pf.gS(Nstyle, curNId, '.NSubC', 'background-position'),
      scbgr: pf.gS(Nstyle, curNId, '.NSubC', 'background-repeat'),
      sop: pf.gS(Nstyle, curNId, '.NSub', 'opacity')
    };
  },
  'itemStyle': function() {
    Nset.getAttrVal.itemStyle = {
      iw: parseInt(pf.gS(Nstyle, curNId, '.NItemTable', 'width')),
      ih: parseInt(pf.gS(Nstyle, curNId, '.NItemM a', 'height')),
      ilh: parseInt(pf.gS(Nstyle, curNId, '.NItemM a', 'line-height')),
      ibg: pf.gS(Nstyle, curNId, '.NItemM', 'background'),
      ibgc: pf.gS(Nstyle, curNId, '.NItemM', 'background-color'),
      ibgi: pf.gS(Nstyle, curNId, '.NItemM', 'background-image'),
      ibgp: pf.gS(Nstyle, curNId, '.NItemM', 'background-position'),
      ibgr: pf.gS(Nstyle, curNId, '.NItemM', 'background-repeat'),
      iop: pf.gS(Nstyle, curNId, '.NItemTable', 'opacity'),
      iafc: pf.gS(Nstyle, curNId, '.NItemM a', 'color'),
      iafs: parseInt(pf.gS(Nstyle, curNId, '.NItemM a', 'font-size')),
      iafb: pf.gS(Nstyle, curNId, '.NItemM a', 'font-weight'),
      iafi: pf.gS(Nstyle, curNId, '.NItemM a', 'font-style'),
      iafu: pf.gS(Nstyle, curNId, '.NItemM a', 'text-decoration'),
      iaff: pf.gS(Nstyle, curNId, '.NItemM a', 'font-family'),
      iata: pf.gS(Nstyle, curNId, '.NItemM a', 'text-align'),
      // 栏目项鼠标经过状态
      ihbg: pf.gS(Nstyle, curNId, '.NItemH .NItemM', 'background'),
      ihbgc: pf.gS(Nstyle, curNId, '.NItemH .NItemM', 'background-color'),
      ihbgi: pf.gS(Nstyle, curNId, '.NItemH .NItemM', 'background-image'),
      ihbgp: pf.gS(Nstyle, curNId, '.NItemH .NItemM', 'background-position'),
      ihbgr: pf.gS(Nstyle, curNId, '.NItemH .NItemM', 'background-repeat'),
      ihafc: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'color'),
      ihafs: parseInt(pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'font-size')),
      ihafb: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'font-weight'),
      ihafi: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'font-style'),
      ihafu: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'text-decoration'),
      ihaff: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'font-family'),
      ihata: pf.gS(Nstyle, curNId, '.NItemH .NItemM a', 'text-align'),
      // 栏目项当前状态
      icbg: pf.gS(Nstyle, curNId, '.NItemCur .NItemM', 'background'),
      icbgc: pf.gS(Nstyle, curNId, '.NItemCur .NItemM', 'background-color'),
      icbgi: pf.gS(Nstyle, curNId, '.NItemCur .NItemM', 'background-image'),
      icbgp: pf.gS(Nstyle, curNId, '.NItemCur .NItemM', 'background-position'),
      icbgr: pf.gS(Nstyle, curNId, '.NItemCur .NItemM', 'background-repeat'),
      icafc: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'color'),
      icafs: parseInt(pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-size')),
      icafb: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-weight'),
      icafi: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-style'),
      icafu: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-decoration'),
      icaff: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-family'),
      icata: pf.gS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-align'),
      // 分割线设置
      ilishow: pf.gS(Nstyle, curNId, '.NLine', 'display'),
      ilih: parseInt(pf.gS(Nstyle, curNId, '.NLine', 'height')),
      iliw: parseInt(pf.gS(Nstyle, curNId, '.NLine', 'width')),
      ilibg: pf.gS(Nstyle, curNId, '.NLine', 'background'),
      ilibgc: pf.gS(Nstyle, curNId, '.NLine', 'background-color'),
      ilibgi: pf.gS(Nstyle, curNId, '.NLine', 'background-image'),
      ilibgp: pf.gS(Nstyle, curNId, '.NLine', 'background-position'),
      ilibgr: pf.gS(Nstyle, curNId, '.NLine', 'background-repeat')
    };
  },
  'subItemStyle': function() {
    Nset.getAttrVal.subItemStyle = {
      ifloat: pf.gS(Nstyle, curNId, '.NSubC p', 'float'),
      ih: parseInt(pf.gS(Nstyle, curNId, '.NSubC a', 'height')),
      ilh: parseInt(pf.gS(Nstyle, curNId, '.NSubC a', 'line-height')),
      iw: parseInt(pf.gS(Nstyle, curNId, '.NSubC a', 'width')),
      ibtshow: pf.gS(Nstyle, curNId, '.NSubC p', 'border-top'),
      ibtc: pf.gS(Nstyle, curNId, '.NSubC p', 'border-top-color'),
      ibts: pf.gS(Nstyle, curNId, '.NSubC p', 'border-top-style'),
      ibtw: parseInt(pf.gS(Nstyle, curNId, '.NSubC p', 'border-top-width')),
      ibbshow: pf.gS(Nstyle, curNId, '.NSubC p', 'border-bottom'),
      ibbc: pf.gS(Nstyle, curNId, '.NSubC p', 'border-bottom-color'),
      ibbs: pf.gS(Nstyle, curNId, '.NSubC p', 'border-bottom-style'),
      ibbw: parseInt(pf.gS(Nstyle, curNId, '.NSubC p', 'border-bottom-width')),
      iabg: pf.gS(Nstyle, curNId, '.NSub a', 'background'),
      iabgc: pf.gS(Nstyle, curNId, '.NSub a', 'background-color'),
      iabgi: pf.gS(Nstyle, curNId, '.NSub a', 'background-image'),
      iabgp: pf.gS(Nstyle, curNId, '.NSub a', 'background-position'),
      iabgr: pf.gS(Nstyle, curNId, '.NSub a', 'background-repeat'),
      iafc: pf.gS(Nstyle, curNId, '.NSub a', 'color'),
      iafs: parseInt(pf.gS(Nstyle, curNId, '.NSub a', 'font-size')),
      iafb: pf.gS(Nstyle, curNId, '.NSub a', 'font-weight'),
      iafi: pf.gS(Nstyle, curNId, '.NSub a', 'font-style'),
      iafu: pf.gS(Nstyle, curNId, '.NSub a', 'text-decoration'),
      iaff: pf.gS(Nstyle, curNId, '.NSub a', 'font-family'),
      iata: pf.gS(Nstyle, curNId, '.NSub a', 'text-align'),
      // 鼠标经过
      iahbg: pf.gS(Nstyle, curNId, '.NSub a:hover', 'background'),
      iahbgc: pf.gS(Nstyle, curNId, '.NSub a:hover', 'background-color'),
      iahbgi: pf.gS(Nstyle, curNId, '.NSub a:hover', 'background-image'),
      iahbgp: pf.gS(Nstyle, curNId, '.NSub a:hover', 'background-position'),
      iahbgr: pf.gS(Nstyle, curNId, '.NSub a:hover', 'background-repeat'),
      iahfc: pf.gS(Nstyle, curNId, '.NSub a:hover', 'color'),
      iahfs: parseInt(pf.gS(Nstyle, curNId, '.NSub a:hover', 'font-size')),
      iahfb: pf.gS(Nstyle, curNId, '.NSub a:hover', 'font-weight'),
      iahfi: pf.gS(Nstyle, curNId, '.NSub a:hover', 'font-style'),
      iahfu: pf.gS(Nstyle, curNId, '.NSub a:hover', 'text-decoration'),
      iahff: pf.gS(Nstyle, curNId, '.NSub a:hover', 'font-family'),
      iahta: pf.gS(Nstyle, curNId, '.NSub a:hover', 'text-align')
    };
  }
};
// 执行回显函数的方法
Nset.getAttrSetFun = {
  'alreadyRun': {
    'skinStyle': false,
    'exteriorStyle': false,
    'itemStyle': false,
    'subItemStyle': false
  },
  'skinStyle': function() {
    Nset.getAttrRunFun.skinStyle();
    $("#color_list b.default").trigger('click');
    this.alreadyRun.skinStyle = true;
    return true;
  },
  'exteriorStyle': function() {
    Nset.getAttrRunFun.exteriorStyle();
    var g = Nset.getAttrVal.exteriorStyle,
      da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
      da_s = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s")),
      da_l = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-l"));
    /*//导航是否浮动
     if (g.abso) {
     if(g.abso == 'absolute'){
     $('#N_absoYes').click();
     }else{
     $('#N_absoNo').click();
     }
     } else {
     $('#N_absoAuto').click();
     }
     //导航是否通栏
     if (g.full) {
     if (g.full == '100%')
     $('#N_fullYes').click();
     else
     $('#N_fullNo').click();
     } else {
     $('#N_fullAuto').click();
     }*/
    if (da_l.p == 1 || da_l.p == 2) {  // 默认, 1 可拖动 2 不可拖动
      $('#N_positionAuto').click();
    } else if (da_l.p == 3) { // 可拖动
      $('#N_positionAbsolute').click();
    } else if (da_l.p == 4) { // 不可拖动
      $('#N_positionRelative').click();
    }
    //导航是否通栏
    if(da_l.p == 2 || da_l.p == 4){
      $("#trNavFull").show();
      if (da_l.wt === 0) {
        $('#N_fullAuto').click();
      }else if (da_l.wt == 1){
        $('#N_fullNo').click();
      }else if(da_l.wt == 2){
        $('#N_fullYes').click();
      }
    }else{
      $("#trNavFull").hide();
    }
    //导航宽度
    if (!isNaN(g.ncw)) {
      $('#N_width').val(g.ncw);
      $('#N_widthCus').click();
    } else {
      $('#N_width').val(curN.find('.NCenter').width());
      $('#N_widthAuto').click();
    }
    //导航内部位置
    if (g.ncf) {
      $('#N_CFloat').val(g.ncf);
      $('#N_CFloatCus').click();
    } else {
      $('#N_CFloatAuto').click();
    }
    //导航高度
    if(g.nmh === undefined){
      g.nmh = isNaN(g.nbgh) ? undefined : g.nbgh;
    }
    if (isNaN(g.nmh)) {
      $('#N_height').val(curN.find('.NMain').height());
      $('#N_heightAuto').click();
    } else {
      $('#N_height').val(g.nmh);
      $('#N_heightCus').click();
    }
    // 导航上下边距
    if (isNaN(g.nmt) || isNaN(g.nmb)) {
      $('#N_marginAuto').click();
      $('#N_marginTop').val(parseInt(curN.css('margin-top')));
      $('#N_marginBottom').val(parseInt(curN.css('margin-bottom')));
    } else {
      $('#N_marginTop').val(g.nmt);
      $('#N_marginBottom').val(g.nmb);
      $('#N_marginCus').click();
    }
    //导航背景
    if (g.nbg) {
      $('#N_bgHide').click();
    } else {
      if (g.nbgc) {
        $('#N_bgColor').val(g.nbgc);
        $('#N_bgImage').val(g.nbgi);
        $('#N_bgPosition').val(g.nbgp);
        $('#N_bgRepeat').val(g.nbgr);
        $('#N_bgCus').click();
      } else {
        $('#N_bgAuto').click();
      }
    }
    //透明度
    if (g.nop) {
      $("#N_opacity").val(Math.round(g.nop * 100));
    }
    //通过获得以前设置的导航边框来设置不同方向的导航边线
    if (g.nboc) {
      g.nbortc = g.nbortc ? g.nbortc : g.nboc;
      g.nborts = g.nborts ? g.nborts : g.nbos;
      g.nbortw = g.nbortw ? g.nbortw : g.nbow;
      g.nborbc = g.nborbc ? g.nborbc : g.nboc;
      g.nborbs = g.nborbs ? g.nborbs : g.nbos;
      g.nborbw = g.nborbw ? g.nborbw : g.nbow;
      g.nborlc = g.nborlc ? g.nborlc : g.nboc;
      g.nborls = g.nborls ? g.nborls : g.nbos;
      g.nborlw = g.nborlw ? g.nborlw : g.nbow;
      g.nborrc = g.nborrc ? g.nborrc : g.nboc;
      g.nborrs = g.nborrs ? g.nborrs : g.nbos;
      g.nborrw = g.nborrw ? g.nborrw : g.nbow;
    }else{
      g.nbortc = g.nbortc ? g.nbortc : undefined;
      g.nborts = g.nborts ? g.nborts : undefined;
      g.nbortw = g.nbortw ? g.nbortw : undefined;
      g.nborbc = g.nborbc ? g.nborbc : undefined;
      g.nborbs = g.nborbs ? g.nborbs : undefined;
      g.nborbw = g.nborbw ? g.nborbw : undefined;
      g.nborlc = g.nborlc ? g.nborlc : undefined;
      g.nborls = g.nborls ? g.nborls : undefined;
      g.nborlw = g.nborlw ? g.nborlw : undefined;
      g.nborrc = g.nborrc ? g.nborrc : undefined;
      g.nborrs = g.nborrs ? g.nborrs : undefined;
      g.nborrw = g.nborrw ? g.nborrw : undefined;
    }
    /*外边框设置*/
    // 上边线
    if (g.nbort) {
      $("#N_borderTopHide").trigger('click');
    } else {
      if (g.nbortc) {
        $('#N_borderTopColor').val(g.nbortc);
        $('#N_borderTopStyle').val(g.nborts);
        $('#N_borderTopWidth').val(g.nbortw);
        $("#N_borderTopCus").trigger('click');
      } else {
        $("#N_borderTopAuto").trigger('click');
      }
    }
    // 下边线
    if (g.nborb) {
      $("#N_borderBottomHide").trigger('click');
    } else {
      if (g.nborbc) {
        $('#N_borderBottomColor').val(g.nborbc);
        $('#N_borderBottomStyle').val(g.nborbs);
        $('#N_borderBottomWidth').val(g.nborbw);
        $("#N_borderBottomCus").trigger('click');
      } else {
        $("#N_borderBottomAuto").trigger('click');
      }
    }
    // 左边线
    if (g.nborl) {
      $("#N_borderLeftHide").trigger('click');
    } else {
      if (g.nborlc) {
        $('#N_borderLeftColor').val(g.nborlc);
        $('#N_borderLeftStyle').val(g.nborls);
        $('#N_borderLeftWidth').val(g.nborlw);
        $("#N_borderLeftCus").trigger('click');
      } else {
        $("#N_borderLeftAuto").trigger('click');
      }
    }
    // 右边线
    if (g.nborr) {
      $("#N_borderRightHide").trigger('click');
    } else {
      if (g.nborrc) {
        $('#N_borderRightColor').val(g.nborrc);
        $('#N_borderRightStyle').val(g.nborrs);
        $('#N_borderRightWidth').val(g.nborrw);
        $("#N_borderRightCus").trigger('click');
      } else {
        $("#N_borderRightAuto").trigger('click');
      }
    }
    /*内边框设置*/
    // 上边线
    if (g.nmbort) {
      $("#N_mainBorderTopHide").trigger('click');
    } else {
      if (g.nmbortc) {
        $('#N_mainBorderTopColor').val(g.nmbortc);
        $('#N_mainBorderTopStyle').val(g.nmborts);
        $('#N_mainBorderTopWidth').val(g.nmbortw);
        $("#N_mainBorderTopCus").trigger('click');
      } else {
        $("#N_mainBorderTopAuto").trigger('click');
      }
    }
    // 下边线
    if (g.nmborb) {
      $("#N_mainBorderBottomHide").trigger('click');
    } else {
      if (g.nmborbc) {
        $('#N_mainBorderBottomColor').val(g.nmborbc);
        $('#N_mainBorderBottomStyle').val(g.nmborbs);
        $('#N_mainBorderBottomWidth').val(g.nmborbw);
        $("#N_mainBorderBottomCus").trigger('click');
      } else {
        $("#N_mainBorderBottomAuto").trigger('click');
      }
    }
    // 左边线
    if (g.nmborl) {
      $("#N_mainBorderLeftHide").trigger('click');
    } else {
      if (g.nmborlc) {
        $('#N_mainBorderLeftColor').val(g.nmborlc);
        $('#N_mainBorderLeftStyle').val(g.nmborls);
        $('#N_mainBorderLeftWidth').val(g.nmborlw);
        $("#N_mainBorderLeftCus").trigger('click');
      } else {
        $("#N_mainBorderLeftAuto").trigger('click');
      }
    }
    // 右边线
    if (g.nmborr) {
      $("#N_mainBorderRightHide").trigger('click');
    } else {
      if (g.nmborrc) {
        $('#N_mainBorderRightColor').val(g.nmborrc);
        $('#N_mainBorderRightStyle').val(g.nmborrs);
        $('#N_mainBorderRightWidth').val(g.nmborrw);
        $("#N_mainBorderRightCus").trigger('click');
      } else {
        $("#N_mainBorderRightAuto").trigger('click');
      }
    }
    // 菜单内边距
    if (isNaN(g.nmpt) || isNaN(g.nmpb) || isNaN(g.nmpr) || isNaN(g.nmpl)) {
      $('#N_mainPaddingAuto').click();
      $('#N_mainPaddingTop').val(parseInt(curN.css('padding-top')));
      $('#N_mainPaddingBottom').val(parseInt(curN.css('padding-bottom')));
      $('#N_mainPaddingLeft').val(parseInt(curN.css('padding-left')));
      $('#N_mainPaddingRight').val(parseInt(curN.css('padding-right')));
    } else {
      $('#N_mainPaddingTop').val(g.nmpt);
      $('#N_mainPaddingBottom').val(g.nmpb);
      $('#N_mainPaddingLeft').val(g.nmpl);
      $('#N_mainPaddingRight').val(g.nmpr);
      $('#N_mainPaddingCus').click();
    }
    //下拉菜单宽度
    if (isNaN(g.sw)) {
      $('#N_subWidth').val(
        function(){
          var sw = curN.find('.NSub').width() == null ? 120 : curN.find('.NSub').width();
          return parseInt(sw);
        }
      );
      $('#N_subWidthAuto').click();
    } else {
      $('#N_subWidth').val(g.sw);
      $('#N_subWidthCus').click();
    }
    // 下拉菜单内边距
    if (isNaN(g.scpt) || isNaN(g.scpb) || isNaN(g.scpr) || isNaN(g.scpl)) {
      $('#N_subCPaddingAuto').click();
      $('#N_subCPaddingTop').val(parseInt(curN.css('padding-top')));
      $('#N_subCPaddingBottom').val(parseInt(curN.css('padding-bottom')));
      $('#N_subCPaddingLeft').val(parseInt(curN.css('padding-left')));
      $('#N_subCPaddingRight').val(parseInt(curN.css('padding-right')));
    } else {
      $('#N_subCPaddingTop').val(g.scpt);
      $('#N_subCPaddingBottom').val(g.scpb);
      $('#N_subCPaddingLeft').val(g.scpl);
      $('#N_subCPaddingRight').val(g.scpr);
      $('#N_subCPaddingCus').click();
    }
    //下拉菜单背景
    if (g.scbg) {
      $('#N_subBgHide').click();
    } else {
      if (g.scbgc) {
        $('#N_subBgColor').val(g.scbgc);
        $('#N_subBgImage').val(g.scbgi);
        $('#N_subBgPosition').val(g.scbgp);
        $('#N_subBgRepeat').val(g.scbgr);
        $('#N_subBgCus').click();
      } else {
        $('#N_subBgAuto').click();
      }
    }
    //下拉菜单透明度
    if (g.sop) {
      $("#N_subOpacity").val(g.sop * 100);
    }
    this.alreadyRun.exteriorStyle = true;
    return true;
  },
  'itemStyle': function() {
    Nset.getAttrRunFun.itemStyle();
    var g = Nset.getAttrVal.itemStyle;
    //导航项目宽度
    if (g.iw) {
      $('#N_itemWidth').val(g.iw);
      $('#N_itemWidthCus').click();
    } else {
      $('#N_itemWidth').val(curN.find('.NItemTable').width());
      $('#N_itemWidthAuto').click();
    }
    //导航项目高度
    if (isNaN(g.ih) || isNaN(g.ilh)) {
      $('#N_itemAHeight').val(curN.find('.NItemM a').height());
      $('#N_itemALineheight').val(parseInt(curN.find('.NItemM a').css('line-height')));
      $('#N_itemAHeightAuto').click();
    } else {
      $('#N_itemAHeight').val(g.ih);
      $('#N_itemALineheight').val(g.ilh);
      $('#N_itemAHeightCus').click();
    }
    //导航项目背景
    if (g.ibg) {
      $('#N_itemBgHide').click();
    } else {
      if (g.ibgc) {
        $('#N_itemBgColor').val(g.ibgc);
        $('#N_itemBgImage').val(g.ibgi);
        $('#N_itemBgPosition').val(g.ibgp);
        $('#N_itemBgRepeat').val(g.ibgr);
        $('#N_itemBgCus').click();
      } else {
        $('#N_itemBgAuto').click();
      }
    }
    //透明度
    if (g.iop) {
      $("#N_itemOpacity").val(g.iop * 100);
    }
    //栏目项文字
    if (g.iafc) {
      $('#N_itemFontColor').val(g.iafc);
      $('#N_itemFontSize').val(g.iafs);
      $('#N_itemFontBold')[0].checked = g.iafb == '700' ? true : false;
      $('#N_itemFontItalic')[0].checked = g.iafi == 'italic' ? true : false;
      $('#N_itemFontUnderline')[0].checked = g.iafu == 'underline' ? true : false;
      $('#N_itemFontFamily').val(g.iaff);
      $('#N_itemTextAlign').val(g.iata);
      $('#N_itemFontCus').click();
    } else {
      $('#N_itemFontAuto').click();
    }
    //导航项目鼠标经过背景
    if (g.ihbg) {
      $('#N_itemHoverBgHide').click();
    } else {
      if (g.ihbgc) {
        $('#N_itemHoverBgColor').val(g.ihbgc);
        $('#N_itemHoverBgImage').val(g.ihbgi);
        $('#N_itemHoverBgPosition').val(g.ihbgp);
        $('#N_itemHoverBgRepeat').val(g.ihbgr);
        $('#N_itemHoverBgCus').click();
      } else {
        $('#N_itemHoverBgAuto').click();
      }
    }
    //栏目项鼠标经过文字
    if (g.ihafc) {
      $('#N_itemHoverFontColor').val(g.ihafc);
      $('#N_itemHoverFontSize').val(g.ihafs);
      $('#N_itemHoverFontBold')[0].checked = g.ihafb == '700' ? true : false;
      $('#N_itemHoverFontItalic')[0].checked = g.ihafi == 'italic' ? true : false;
      $('#N_itemHoverFontUnderline')[0].checked = g.ihafu == 'underline' ? true : false;
      $('#N_itemHoverFontFamily').val(g.ihaff);
      $('#N_itemHoverTextAlign').val(g.ihata);
      $('#N_itemHoverFontCus').click();
    } else {
      $('#N_itemHoverFontAuto').click();
    }
    //导航项目当前状态背景
    if (g.icbg) {
      $('#N_itemCurBgHide').click();
    } else {
      if (g.icbgc) {
        $('#N_itemCurBgColor').val(g.icbgc);
        $('#N_itemCurBgImage').val(g.icbgi);
        $('#N_itemCurBgPosition').val(g.icbgp);
        $('#N_itemCurBgRepeat').val(g.icbgr);
        $('#N_itemCurBgCus').click();
      } else {
        $('#N_itemCurBgAuto').click();
      }
    }
    //栏目项当前状态文字
    if (g.icafc) {
      $('#N_itemCurFontColor').val(g.icafc);
      $('#N_itemCurFontSize').val(g.icafs);
      $('#N_itemCurFontBold')[0].checked = g.icafb == '700' ? true : false;
      $('#N_itemCurFontItalic')[0].checked = g.icafi == 'italic' ? true : false;
      $('#N_itemCurFontUnderline')[0].checked = g.icafu == 'underline' ? true : false;
      $('#N_itemCurFontFamily').val(g.icaff);
      $('#N_itemCurTextAlign').val(g.icata);
      $('#N_itemCurFontCus').click();
    } else {
      $('#N_itemCurFontAuto').click();
    }
    //导航栏目项分割线背景
    if (g.ilishow) {
      if (g.ilishow == 'none') {
        $('#N_itemLineHide').click();
      } else {
        $('#N_itemLineHeight').val(g.ilih);
        $('#N_itemLineWidth').val(g.iliw);
        $('#N_itemLineBgColor').val(g.ilibgc);
        $('#N_itemLineBgImage').val(g.ilibgi);
        $('#N_itemLineBgPosition').val(g.ilibgp);
        $('#N_itemLineBgRepeat').val(g.ilibgr);
        $('#N_itemLineCus').click();
      }
    } else {
      $('#N_itemLineHeight').val(curN.find('.NItem').height());
      $('#N_itemLineWidth').val(curN.find('.NLine').width() || 1);
      $('#N_itemLineAuto').click();
    }
    this.alreadyRun.itemStyle = true;
    return true;
  },
  'subItemStyle': function() {
    Nset.getAttrRunFun.subItemStyle();
    var g = Nset.getAttrVal.subItemStyle;
    //下拉菜单是否单行显示
    if (g.ifloat) {
      $('#N_subItemFloatYes').click();
    } else {
      $('#N_subItemFloatNo').click();
    }
    //下拉菜单项高度
    if (isNaN(g.ih) || isNaN(g.ilh)) {
      $('#N_subItemHeight').val(curN.find('.NSubC a').height() || 32);
      $('#N_subItemLineheight').val(function(){
        var lh = isNaN(curN.find('.NSubC a').css("line-height")) ? 32 : curN.find('.NSubC a').css("line-height");
        return parseInt(lh);
      });
      $('#N_subItemHeightAuto').click();
    } else {
      $('#N_subItemHeight').val(g.ih);
      $('#N_subItemLineheight').val(g.ilh);
      $('#N_subItemHeightCus').click();
    }
    //下拉菜单项宽度
    if (isNaN(g.iw)) {
      $('#N_subItemWidth').val(isNaN(parseInt(curN.find('.NLast .NSubC a').width())) ? 30 : parseInt(curN.find('.NLast .NSubC a').width()));
      $('#N_subItemWidthAuto').click();
    } else {
      $('#N_subItemWidth').val(g.iw);
      $('#N_subItemWidthCus').click();
    }
    //下拉菜单项上边线
    if (g.ibtshow) {
      $('#N_subItemBorderTopHide').click();
    } else {
      if (g.ibtc) { //下拉菜单项边线
        $('#N_subItemBorderTopColor').val(g.ibtc);
        $('#N_subItemBorderTopWidth').val(g.ibtw);
        $('#N_subItemBorderTopStyle').val(g.ibts);
        $('#N_subItemBorderTopCus').click();
      } else {
        $('#N_subItemBorderTopAuto').click();
      }
    }
    //下拉菜单项下边线
    if (g.ibbshow) {
      $('#N_subItemBorderBottomHide').click();
    } else {
      if (g.ibbc) { //下拉菜单项边线
        $('#N_subItemBorderBottomColor').val(g.ibbc);
        $('#N_subItemBorderBottomWidth').val(g.ibbw);
        $('#N_subItemBorderBottomStyle').val(g.ibbs);
        $('#N_subItemBorderBottomCus').click();
      } else {
        $('#N_subItemBorderBottomAuto').click();
      }
    }
    //下拉菜单导航项目背景
    if (g.iabg) {
      $('#N_subItemABgHide').click();
    } else {
      if (g.iabgc) {
        $('#N_subItemABgColor').val(g.iabgc);
        $('#N_subItemABgImage').val(g.iabgi);
        $('#N_subItemABgPosition').val(g.iabgp);
        $('#N_subItemABgRepeat').val(g.iabgr);
        $('#N_subItemABgCus').click();
      } else {
        $('#N_subItemABgAuto').click();
      }
    }
    //下拉菜单文字
    if (g.iafc) {
      $('#N_subItemAFontColor').val(g.iafc);
      $('#N_subItemAFontSize').val(g.iafs);
      $('#N_subItemAFontBold')[0].checked = g.iafb == '700' ? true : false;
      $('#N_subItemAFontItalic')[0].checked = g.iafi == 'italic' ? true : false;
      $('#N_subItemAFontUnderline')[0].checked = g.iafu == 'underline' ? true : false;
      $('#N_subItemAFontFamily').val(g.iaff);
      $('#N_subItemATextAlign').val(g.iata);
      $('#N_subItemAFontCus').click();
    } else {
      $('#N_subItemAFontAuto').click();
    }
    //下拉菜单栏目项鼠标经过目背景
    if (g.iahbg) {
      $('#N_subItemAHoverBgHide').click();
    } else {
      if (g.iahbgc) {
        $('#N_subItemAHoverBgColor').val(g.iahbgc);
        $('#N_subItemAHoverBgImage').val(g.iahbgi);
        $('#N_subItemAHoverBgPosition').val(g.iahbgp);
        $('#N_subItemAHoverBgRepeat').val(g.iahbgr);
        $('#N_subItemAHoverBgCus').click();
      } else {
        $('#N_subItemAHoverBgAuto').click();
      }
    }
    //下拉菜单栏目项鼠标经过文字
    if (g.iahfc) {
      $('#N_subItemAHoverFontColor').val(g.iahfc);
      $('#N_subItemAHoverFontSize').val(g.iahfs);
      $('#N_subItemAHoverFontBold')[0].checked = g.iahfb == '700' ? true : false;
      $('#N_subItemAHoverFontItalic')[0].checked = g.iahfi == 'italic' ? true : false;
      $('#N_subItemAHoverFontUnderline')[0].checked = g.iahfu == 'underline' ? true : false;
      $('#N_subItemAHoverFontFamily').val(g.iahff);
      $('#N_subItemAHoverTextAlign').val(g.iahta);
      $('#N_subItemAHoverFontCus').click();
    } else {
      $('#N_subItemAHoverFontAuto').click();
    }

    this.alreadyRun.subItemStyle = true;
    return true;
  }
}
//导航确定设置函数
Nset.Nenter = function(obj) {
  obj.focus();
  setTimeout(function() {
    pf.Pwin.$.popupClose(window.iframeNumber);
    lastNItem.removeClass("NItemH");
  }, 200);
  return false;
};


/**----------------导航外观设置-------------------**/
/*--导航浮动开关--*/
/*Nset.NAbsoToggle = function(a) {
 var da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
 das = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s")),
 l = das.l,t = das.t;
 if(a == 0){
 pcurN.find(".moveBtn").hide();
 pf.rS(Nstyle, 'web_nav', '', 'position');
 pcurN.css({'left' : 'auto','top' : 'auto'});
 pf.rS(Nstyle, 'web_nav', '', 'width');
 pf.rS(Nstyle, curNId, '', 'width');
 $("#trNavFull").show();
 if(da.p != 0){
 $('#N_fullAuto').trigger('click');
 da.p = 0
 };
 }else if(a == 1){
 pcurN.find(".moveBtn").show();
 pf.sS(Nstyle, 'web_nav', '', 'position', 'absolute');
 if(da.p == 0 || da.p == 2){
 pf.sS(Nstyle, curNId, '', 'width','auto');
 pf.sS(Nstyle, 'web_nav', '', 'width','auto');
 l = Math.floor((pf.wIframeDom.width() - pf.wIframeWin.DF.config.webWidth[0])/2);
 t = pcurN.offset().top;
 pcurN.css({'left' : l,'top' : t});
 }
 $("#trNavFull").hide();
 if(da.p != 1){da.p = 1};
 }else if(a == 2){
 pcurN.find(".moveBtn").show();
 pf.sS(Nstyle, 'web_nav', '', 'position', 'fixed');
 if(da.p == 0 || da.p == 1){
 pf.sS(Nstyle, curNId, '', 'width','auto');
 pf.sS(Nstyle, 'web_nav', '', 'width','auto');
 l = Math.floor((pf.wIframeDom.width() - pf.wIframeWin.DF.config.webWidth[0])/2);
 t = pcurN.offset().top;
 pcurN.css({'left' : l,'top' : t});
 $("#N_fullAuto").click();
 }
 $("#trNavFull").show();
 if(da.p != 2){
 $('#N_fullAuto').trigger('click');
 da.p = 2;
 }
 }
 das.l = l,das.t = t;
 pf.wIframeWin.DF.f.changeAttr(pcurN, "data-attr", pf.wIframeWin.DF.f.j_s(da));
 pf.wIframeWin.DF.f.changeAttr(pcurN, "data-s", pf.wIframeWin.DF.f.j_s(das));
 };*/
/*--导航通栏开关--*/
/*Nset.NFullToggle = function(a) {
 var w = pf.wIframeWin.DF.config.defWebWidth[0],
 da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
 das = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s"));
 // if(da.p == 1){
 // 	return false;
 // }
 if (a == 0) {
 pf.rS(Nstyle, curNId, '', 'width');
 } else if (a == 1) {
 if(da.p == 2){
 pf.sS(Nstyle, curNId, '', 'width', 'auto');
 }else{
 pf.sS(Nstyle, curNId, '', 'width', w + 'px');
 }
 } else {
 pf.sS(Nstyle, curNId, '', 'width', '100%');
 // if(da.p == 1 || da.p == 0){
 // 	pcurN.css({'left' : 'auto','top' : 'auto'});
 // }else if(da.p == 2){
 // 	pcurN.css({'left' : 0,'top' : das.t + 'px'});
 // }
 // pcurN.css({'left' : 0,'top' : 'auto'});
 }
 };*/
/*--导航浮动开关--*/
Nset.NPositionToggle = function(a) {
  var da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
    da_s = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s")),
    da_l = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-l")),
    wl = Math.floor((pf.wIframeDom.width() - pf.wIframeWin.DF.config.webWidth[0])/2),
    // w = pf.wIframeWin.DF.config.defWebWidth[0],
    d_l = da_s.l,d_t = da_s.t,d_p = da_s.p,
    l_l = da_l.l,l_t = da_l.t,l_p = da_l.p,
    l = false,t = false,l_,t_,btns = "none",dis='';
  // 默认, 1 可拖动 2 不可拖动
  switch(a){
    case 0: // 默认
      if(d_p == 1) { // 可拖动
        if(l_p == 1){
          return true;
        }else if(l_p == 3) { // 从可拖动切到默认可拖动
          dis = 'absolute';
          btns = "block";
          $("#trNavFull").hide();
          l = d_l;
          l_ = d_l + wl;
          t = t_ = d_t;
          da_l.p = 1;
          da_l.wt = 0;
        } else if (l_p == 4) { // 从不可拖动切到默认可拖动
          dis = 'absolute';
          btns = "block";
          $("#N_fullAuto").trigger('click');
          $("#trNavFull").hide();
          da_l.wt = 0;
          l = d_l;
          l_ = d_l + wl;
          t = t_ = d_t;
          da_l.p = 1;
        }
      } else if (d_p == 2) { // 不可拖动
        if(l_p == 2){
          return true;
        }else if (l_p == 3) { // 从不可拖动切到默认不可拖动&&从可拖动切到默认不可拖动
          dis = '';
          btns = "none";
          $("#N_fullAuto").trigger('click');
          $("#trNavFull").show();
          da_l.wt = 0;
          l = t = false;
          l_ = t_ =  'auto';
          da_l.p = 2;
        }else if(l_p == 4){
          l = t = false;
          l_ = t_ =  'auto';
          da_l.p = 2;
        }
      }else if(d_p == 4){}
      break;
    case 1: // 可拖动
      if (d_p == 1) { // 默认可拖动
        if (l_p == 1) { //默认可拖动切 换到 可拖动
          dis = 'absolute';
          btns = "block";
          da_l.p = 3;
          dis = 'absolute';
          btns = "block";
          l = l_l;
          l_ = l_l + wl;
          t = t_ = l_t;
          $("#trNavFull").hide();
          da_l.p = 3;
        } else if (l_p == 4) { // 不可拖动 切换 可拖动
          dis = 'absolute';
          btns = "block";
          l = 0;
          l_ = wl;
          t = t_ = pcurN.offset().top;
          $("#N_fullAuto").trigger('click');
          $("#trNavFull").hide();
          da_l.wt = 0;
          da_l.p = 3;
        }else if(l_p == 3){
          dis = 'absolute';
          btns = "block";
          l = l_l;
          l_ = l_l + wl;
          t = t_ = l_t;
          $("#trNavFull").hide();
          da_l.p = 3;
        }
      }else if (d_p == 2) { // 默认不可拖动
        if(l_p == 2 || l_p == 4){
          dis = 'absolute';
          btns = "block";
          l = 0;
          l_ = wl;
          t = t_ = pcurN.offset().top;
          $("#N_fullAuto").trigger('click');
          $("#trNavFull").hide();
          da_l.wt = 0;
          da_l.p = 3;
        }else{
          return true;
        }
      }
      break;
    case 2: // 不可拖动
      dis = 'relative';
      btns = "none";
      l_ = t_ = 'auto';
      l = t = false;
      $("#trNavFull").show();
      $("#N_fullAuto").trigger('click');
      da_l.wt = 0;
      da_l.p = 4;
      break;
  }
  pcurN.find(".moveBtn").css({display: btns});
  pcurN.css({'left': l_,'top' : t_,'position' : dis});
  da_l.l = l; da_l.t = t;
  da.c = 1;
  pf.wIframeWin.DF.f.changeAttr(pcurN, "data-attr", pf.wIframeWin.DF.f.j_s(da));
  pf.wIframeWin.DF.f.changeAttr(pcurN, "data-l", pf.wIframeWin.DF.f.j_s(da_l));
  pf.rS(Nstyle, 'web_nav', '', 'width');
};
/*--导航通栏开关--*/
Nset.NFullToggle = function(a) {
  var w = pf.wIframeWin.DF.config.defWebWidth[0],
    da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
    da_s = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s")),
    da_l = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-l"));
  if (a == 0) {
    curN.css({width : 'auto'});
  } else if (a == 1) {
    curN.css({width: w + 'px'});
  } else if(a == 2){
    curN.css({width : '100%'});
  }
  da_l.wt = a;
  da.c = 1;
  pf.wIframeWin.DF.f.changeAttr(pcurN, "data-attr", pf.wIframeWin.DF.f.j_s(da));
  pf.wIframeWin.DF.f.changeAttr(pcurN, "data-l", pf.wIframeWin.DF.f.j_s(da_l));
};
/*--导航宽度开关--*/
Nset.NWidthToggle = function(a) {
  // var da = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-attr")),
  // 		das = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s"));
  if (a == 0) {
    pf.sAL('N_widthAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NCenter', 'width');
    // if(da.p == 1){
    // 	l = Math.floor((pf.wIframeDom.width() - pf.wIframeWin.DF.config.webWidth[0])/2);
    // 	pcurN.css({'left' : l + 'px','top' : das.t + 'px'});
    // }
    // das.w = pf.wIframeWin.DF.config.webWidth[0];
  } else {
    pf.sAL('N_widthAttrlist', 'show');
    var w = $('#N_width').val()*1;
    pf.sS(Nstyle, curNId, '.NCenter', 'width', w + 'px');
    // das.w = w;
  }
  // pf.wIframeWin.DF.f.changeAttr(pcurN, "data-s", pf.wIframeWin.DF.f.j_s(das));
};
/*--导航宽度设置--*/
Nset.NWidth = function(obj) {
  var w = pf.wIframeWin.DF.config.defWebWidth[0],
    a = pf.numJudge(obj, w, 50, w);
  // das = pf.wIframeWin.DF.f.s_j(pcurN.attr("data-s"));
  pf.sS(Nstyle, curNId, '.NCenter', 'width', a + 'px');
  // das.w = a;
  // pf.wIframeWin.DF.f.changeAttr(pcurN, "data-s", pf.wIframeWin.DF.f.j_s(das));
};
Nset.NCFloatToggle = function(a){
  if(a == 0){
    pf.sAL('N_CFloatAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NCenter', 'float');
  }else if(a == 1){
    pf.sAL('N_CFloatAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NCenter', 'float', $('#N_CFloat').val());
  }
};
Nset.NCFloat = function(a){
  pf.sS(Nstyle, curNId, '.NCenter', 'float', a);
};
/*--上下外边距开关--*/
Nset.NMarginToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_marginAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '', 'margin-top');
    pf.rS(Nstyle, curNId, '', 'margin-bottom');
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  } else if (a == 2) {
    pf.sAL('N_marginAttrlist', 'show');
    pf.sS(Nstyle, curNId, '', 'margin-top', $('#N_marginTop').val() + "px");
    pf.sS(Nstyle, curNId, '', 'margin-bottom', $('#N_marginBottom').val() + "px");
  }
  //$.get("/ajax_get_info2.php?type=19");//返回值是1？
};
// 外上边距
Nset.NMarginTop = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 300);
  pf.sS(Nstyle, curNId, '', 'margin-top', a + "px");
  pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
};
// 外下边距
Nset.NMarginBottom = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 300);
  pf.sS(Nstyle, curNId, '', 'margin-bottom', a + "px");
  pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
};
/*--导航背景开关--*/
Nset.NBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_bgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMainBg', 'background-color');
    pf.rS(Nstyle, curNId, '.NMainBg', 'background-image');
    pf.rS(Nstyle, curNId, '.NMainBg', 'background-position');
    pf.rS(Nstyle, curNId, '.NMainBg', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NMainBg', 'display');
    pf.rS(Nstyle, curNId, '.NLeft', 'display');
    pf.rS(Nstyle, curNId, '.NRight', 'display');
    pf.rS(Nstyle, curNId, '.NMainBg', 'margin-left');
    pf.rS(Nstyle, curNId, '.NMainBg', 'margin-right');
    if (a == 0) {
      pf.rS(Nstyle, curNId, '.NMainBg', 'background');
      pf.rS(Nstyle, curNId, '.NLeft', 'background');
      pf.rS(Nstyle, curNId, '.NRight', 'background');
    } else {
      pf.sS(Nstyle, curNId, '.NMainBg', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NLeft', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NRight', 'background', 'none');
    }
  } else if (a == 2) {
    var bgimg = $('#N_bgImage').val(),alook = $('#N_bgImageLook'),anone = $('#N_bgImageNone');
    pf.sAL('N_bgAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NMainBg', 'background-color', $('#N_bgColor').val());
    if (bgimg == 'none') {
      alook.css({'display': 'none'});
      anone.css({'display': 'none'});
    } else {
      alook.css({'display': 'inline-block'}).attr('href', bgimg);
      anone.css({'display': 'inline-block'});
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NMainBg', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NMainBg', 'background-position', $('#N_bgPosition').val());
    pf.sS(Nstyle, curNId, '.NMainBg', 'background-repeat', $('#N_bgRepeat').val());
    pf.rS(Nstyle, curNId, '.NMainBg', 'display');
    pf.rS(Nstyle, curNId, '.NMainBg', 'background');
    pf.sS(Nstyle, curNId, '.NLeft', 'display', 'none');
    pf.sS(Nstyle, curNId, '.NRight', 'display', 'none');
    pf.sS(Nstyle, curNId, '.NMainBg', 'margin-left', '0px');
    pf.sS(Nstyle, curNId, '.NMainBg', 'margin-right', '0px');
  }
};
//导航背景颜色设置
Nset.NBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NMainBg', 'background-color', a);
};
//导航背景颜色取消
Nset.NNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NMainBg', 'background-color', "transparent");
};
//导航背景图设置
Nset.NBgImage = function(a) {
  var bgimg,alook = $('#N_bgImageLook'),anone = $('#N_bgImageNone');
  if (a == 'none') {
    bgimg = 'none';
    alook.css({'display': 'none'});
    anone.css({'display': 'none'});
  } else {
    bgimg = 'url(' + a + ')';
    alook.css({'display': 'inline-block'}).attr('href', a);
    anone.css({'display': 'inline-block'});
  }
  pf.sS(Nstyle, curNId, '.NMainBg', 'background-image', bgimg);
};
//导航背景图位置设置
Nset.NBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NMainBg', 'background-position', a);
};
//导航背景图展示设置
Nset.NBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NMainBg', 'background-repeat', a);
};
/*--导航背景透明度--*/
Nset.NOpacity = function(a) {
  pf.sS(Nstyle, curNId, '.NMainBg', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NMainBg', 'filter', 'alpha(opacity:' + a + ')');
  pf.sS(Nstyle, curNId, '.NLeft', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NLeft', 'filter', 'alpha(opacity:' + a + ')');
  pf.sS(Nstyle, curNId, '.NRight', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NRight', 'filter', 'alpha(opacity:' + a + ')');
  pf.sS(Nstyle, curNId, '.NLine', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NLine', 'filter', 'alpha(opacity:' + a + ')');
};

/**外边线设置**/
/*上边线*/
// 开关
Nset.NBorderTopToggle = function(a) {
  pf.rS(Nstyle, curNId, '', 'border-width');
  pf.rS(Nstyle, curNId, '', 'border-style');
  pf.rS(Nstyle, curNId, '', 'border-color');
  if (a === 0 || a === 1) {
    pf.sAL('N_borderTopAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '', 'border-top-width');
    pf.rS(Nstyle, curNId, '', 'border-top-style');
    pf.rS(Nstyle, curNId, '', 'border-top-color');
    a === 0 ? pf.rS(Nstyle, curNId, '', 'border-top') : pf.sS(Nstyle, curNId, '', 'border-top', "none");
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  } else {
    pf.sAL('N_borderTopAttrlist', 'show');
    pf.rS(Nstyle, curNId, '', 'border-top');
    pf.sS(Nstyle, curNId, '', 'border-top-color', $('#N_borderTopColor').val());
    pf.sS(Nstyle, curNId, '', 'border-top-width', $('#N_borderTopWidth').val() + "px");
    pf.sS(Nstyle, curNId, '', 'border-top-style', $('#N_borderTopStyle').val());
  }
};
// 颜色
Nset.NBorderTopColor = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-top-color', a);
};
// 宽度
Nset.NBorderTopWidth = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-top-width', a + "px");
};
// 样式
Nset.NBorderTopStyle = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-top-style', a);
};
/*下边线*/
// 开关
Nset.NBorderBottomToggle = function(a) {
  pf.rS(Nstyle, curNId, '', 'border-width');
  pf.rS(Nstyle, curNId, '', 'border-style');
  pf.rS(Nstyle, curNId, '', 'border-color');
  if (a === 0 || a === 1) {
    pf.sAL('N_borderBottomAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '', 'border-bottom-width');
    pf.rS(Nstyle, curNId, '', 'border-bottom-style');
    pf.rS(Nstyle, curNId, '', 'border-bottom-color');
    a === 0 ? pf.rS(Nstyle, curNId, '', 'border-bottom') : pf.sS(Nstyle, curNId, '', 'border-bottom', "none");
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  } else {
    pf.sAL('N_borderBottomAttrlist', 'show');
    pf.rS(Nstyle, curNId, '', 'border-bottom');
    pf.sS(Nstyle, curNId, '', 'border-bottom-color', $('#N_borderBottomColor').val());
    pf.sS(Nstyle, curNId, '', 'border-bottom-width', $('#N_borderBottomWidth').val() + "px");
    pf.sS(Nstyle, curNId, '', 'border-bottom-style', $('#N_borderBottomStyle').val());
  }
};
// 颜色
Nset.NBorderBottomColor = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-bottom-color', a);
};
// 宽度
Nset.NBorderBottomWidth = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-bottom-width', a + "px");
  pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
};
// 样式
Nset.NBorderBottomStyle = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-bottom-style', a);
};
/*左边线*/
// 开关
Nset.NBorderLeftToggle = function(a) {
  pf.rS(Nstyle, curNId, '', 'border-width');
  pf.rS(Nstyle, curNId, '', 'border-style');
  pf.rS(Nstyle, curNId, '', 'border-color');
  if (a === 0 || a === 1) {
    pf.sAL('N_borderLeftAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '', 'border-left-width');
    pf.rS(Nstyle, curNId, '', 'border-left-style');
    pf.rS(Nstyle, curNId, '', 'border-left-color');
    a === 0 ? pf.rS(Nstyle, curNId, '', 'border-left') : pf.sS(Nstyle, curNId, '', 'border-left', "none");
  } else {
    pf.sAL('N_borderLeftAttrlist', 'show');
    pf.rS(Nstyle, curNId, '', 'border-left');
    pf.sS(Nstyle, curNId, '', 'border-left-color', $('#N_borderLeftColor').val());
    pf.sS(Nstyle, curNId, '', 'border-left-width', $('#N_borderLeftWidth').val() + "px");
    pf.sS(Nstyle, curNId, '', 'border-left-style', $('#N_borderLeftStyle').val());
  }
};
// 颜色
Nset.NBorderLeftColor = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-left-color', a);
};
// 宽度
Nset.NBorderLeftWidth = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-left-width', a + "px");
};
// 样式
Nset.NBorderLeftStyle = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-left-style', a);
};
/*右边线*/
// 开关
Nset.NBorderRightToggle = function(a) {
  pf.rS(Nstyle, curNId, '', 'border-width');
  pf.rS(Nstyle, curNId, '', 'border-style');
  pf.rS(Nstyle, curNId, '', 'border-color');
  if (a === 0 || a === 1) {
    pf.sAL('N_borderRightAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '', 'border-right-width');
    pf.rS(Nstyle, curNId, '', 'border-right-style');
    pf.rS(Nstyle, curNId, '', 'border-right-color');
    a === 0 ? pf.rS(Nstyle, curNId, '', 'border-right') : pf.sS(Nstyle, curNId, '', 'border-right', "none");
  } else {
    pf.sAL('N_borderRightAttrlist', 'show');
    pf.rS(Nstyle, curNId, '', 'border-right');
    pf.sS(Nstyle, curNId, '', 'border-right-color', $('#N_borderRightColor').val());
    pf.sS(Nstyle, curNId, '', 'border-right-width', $('#N_borderRightWidth').val() + "px");
    pf.sS(Nstyle, curNId, '', 'border-right-style', $('#N_borderRightStyle').val());
  }
};
// 颜色
Nset.NBorderRightColor = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-right-color', a);
};
// 宽度
Nset.NBorderRightWidth = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-right-width', a + "px");
};
// 样式
Nset.NBorderRightStyle = function(a) {
  pf.sS(Nstyle, curNId, '', 'border-right-style', a);
};

/**内边线设置**/
/*上边线*/
// 开关
Nset.NMainBorderTopToggle = function(a) {
  if (a === 0 || a === 1) {
    pf.sAL('N_mainBorderTopAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'border-top-width');
    pf.rS(Nstyle, curNId, '.NMain', 'border-top-style');
    pf.rS(Nstyle, curNId, '.NMain', 'border-top-color');
    a === 0 ? pf.rS(Nstyle, curNId, '.NMain', 'border-top') : pf.sS(Nstyle, curNId, '.NMain', 'border-top', "none");
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  } else {
    pf.sAL('N_mainBorderTopAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NMain', 'border-top');
    pf.sS(Nstyle, curNId, '.NMain', 'border-top-color', $('#N_mainBorderTopColor').val());
    pf.sS(Nstyle, curNId, '.NMain', 'border-top-width', $('#N_mainBorderTopWidth').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'border-top-style', $('#N_mainBorderTopStyle').val());
    var h = curN.find('.NMain').height(),
      bt = parseInt(curN.find('.NMain').css("border-top-width")),
      bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
      bh = h;
    bh = isNaN(bt) ? bh + 0 : bh + bt;
    bh = isNaN(bb) ? bh + 0 : bh + bb;
    pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
    pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
  }
};
// 颜色
Nset.NMainBorderTopColor = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-top-color', a);
};
// 宽度
Nset.NMainBorderTopWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-top-width', a + "px");
  var h = curN.find('.NMain').height(),
    bt = parseInt(curN.find('.NMain').css("border-top-width")),
    bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
    bh = h;
  bh = isNaN(bt) ? bh + 0 : bh + bt;
  bh = isNaN(bb) ? bh + 0 : bh + bb;
  pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
  pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
};
// 样式
Nset.NMainBorderTopStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-top-style', a);
};
/*下边线*/
// 开关
Nset.NMainBorderBottomToggle = function(a) {
  if (a === 0 || a === 1) {
    pf.sAL('N_mainBorderBottomAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'border-bottom-width');
    pf.rS(Nstyle, curNId, '.NMain', 'border-bottom-style');
    pf.rS(Nstyle, curNId, '.NMain', 'border-bottom-color');
    a === 0 ? pf.rS(Nstyle, curNId, '.NMain', 'border-bottom') : pf.sS(Nstyle, curNId, '.NMain', 'border-bottom', "none");
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  } else {
    pf.sAL('N_mainBorderBottomAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NMain', 'border-bottom');
    pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-color', $('#N_mainBorderBottomColor').val());
    pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-width', $('#N_mainBorderBottomWidth').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-style', $('#N_mainBorderBottomStyle').val());
    var h = curN.find('.NMain').height(),
      bt = parseInt(curN.find('.NMain').css("border-top-width")),
      bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
      bh = h;
    bh = isNaN(bt) ? bh + 0 : bh + bt;
    bh = isNaN(bb) ? bh + 0 : bh + bb;
    pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
    pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
  }
};
// 颜色
Nset.NMainBorderBottomColor = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-color', a);
};
// 宽度
Nset.NMainBorderBottomWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-width', a + "px");
  var h = curN.find('.NMain').height(),
    bt = parseInt(curN.find('.NMain').css("border-top-width")),
    bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
    bh = h;
  bh = isNaN(bt) ? bh + 0 : bh + bt;
  bh = isNaN(bb) ? bh + 0 : bh + bb;
  pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
  pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
};
// 样式
Nset.NMainBorderBottomStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-bottom-style', a);
};
/*左边线*/
// 开关
Nset.NMainBorderLeftToggle = function(a) {
  if (a === 0 || a === 1) {
    pf.sAL('N_mainBorderLeftAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'border-left-width');
    pf.rS(Nstyle, curNId, '.NMain', 'border-left-style');
    pf.rS(Nstyle, curNId, '.NMain', 'border-left-color');
    a === 0 ? pf.rS(Nstyle, curNId, '.NMain', 'border-left') : pf.sS(Nstyle, curNId, '.NMain', 'border-left', "none");
  } else {
    pf.sAL('N_mainBorderLeftAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NMain', 'border-left');
    pf.sS(Nstyle, curNId, '.NMain', 'border-left-color', $('#N_mainBorderLeftColor').val());
    pf.sS(Nstyle, curNId, '.NMain', 'border-left-width', $('#N_mainBorderLeftWidth').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'border-left-style', $('#N_mainBorderLeftStyle').val());
  }
};
// 颜色
Nset.NMainBorderLeftColor = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-left-color', a);
};
// 宽度
Nset.NMainBorderLeftWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-left-width', a + "px");
};
// 样式
Nset.NMainBorderLeftStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-left-style', a);
};
/*右边线*/
// 开关
Nset.NMainBorderRightToggle = function(a) {
  if (a === 0 || a === 1) {
    pf.sAL('N_mainBorderRightAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'border-right-width');
    pf.rS(Nstyle, curNId, '.NMain', 'border-right-style');
    pf.rS(Nstyle, curNId, '.NMain', 'border-right-color');
    a === 0 ? pf.rS(Nstyle, curNId, '.NMain', 'border-right') : pf.sS(Nstyle, curNId, '.NMain', 'border-right', "none");
  } else {
    pf.sAL('N_mainBorderRightAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NMain', 'border-right');
    pf.sS(Nstyle, curNId, '.NMain', 'border-right-color', $('#N_mainBorderRightColor').val());
    pf.sS(Nstyle, curNId, '.NMain', 'border-right-width', $('#N_mainBorderRightWidth').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'border-right-style', $('#N_mainBorderRightStyle').val());
  }
};
// 颜色
Nset.NMainBorderRightColor = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-right-color', a);
};
// 宽度
Nset.NMainBorderRightWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-right-width', a + "px");
};
// 样式
Nset.NMainBorderRightStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NMain', 'border-right-style', a);
};

/*--导航高度开关--*/
Nset.NHeightToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_heightAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'height');
    pf.rS(Nstyle, curNId, '.NMainBg', 'height');
    pf.rS(Nstyle, curNId, '.NMainBg', 'margin-bottom');
  } else {
    pf.sAL('N_heightAttrlist', 'show');
    var h = $('#N_height').val()*1,
      bt = parseInt(curN.find('.NMain').css("border-top-width")),
      bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
      bh = h;
    bh = isNaN(bt) ? bh + 0 : bh + bt;
    bh = isNaN(bb) ? bh + 0 : bh + bb;
    pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
    pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
    pf.sS(Nstyle, curNId, '.NMain', 'height', h + 'px');
    pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
  }
};
/*--导航高度设置--*/
Nset.NHeight = function(obj) {
  var a = pf.numJudge(obj, 50, 10, 1000),
    bt = parseInt(curN.find('.NMain').css("border-top-width")),
    bb = parseInt(curN.find('.NMain').css("border-bottom-width")),
    bh = a;
  bh = isNaN(bt) ? bh + 0 : bh + bt;
  bh = isNaN(bb) ? bh + 0 : bh + bb;
  pf.sS(Nstyle, curNId, '.NMainBg', 'height', bh + 'px');
  pf.sS(Nstyle, curNId, '.NMainBg', 'margin-bottom', -bh + 'px');
  pf.sS(Nstyle, curNId, '.NMain', 'height', a + 'px');
  pf.Pwin.Ev.pubFun.iframeH(pf.Pwin.Ev.pubVar.wIframe);
};
/*--菜单内边距开关--*/
Nset.NMainPaddingToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_mainPaddingAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NMain', 'padding-top');
    pf.rS(Nstyle, curNId, '.NMain', 'padding-bottom');
    pf.rS(Nstyle, curNId, '.NMain', 'padding-right');
    pf.rS(Nstyle, curNId, '.NMain', 'padding-left');
  } else if (a == 2) {
    pf.sAL('N_mainPaddingAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NMain', 'padding-top', $('#N_mainPaddingTop').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'padding-bottom', $('#N_mainPaddingBottom').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'padding-right', $('#N_mainPaddingRight').val() + "px");
    pf.sS(Nstyle, curNId, '.NMain', 'padding-left', $('#N_mainPaddingLeft').val() + "px");
  }
};
// 菜单内上边距
Nset.NMainPaddingTop = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 500);
  pf.sS(Nstyle, curNId, '.NMain', 'padding-top', a + "px");
};
// 菜单内下边距
Nset.NMainPaddingBottom = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 500);
  pf.sS(Nstyle, curNId, '.NMain', 'padding-bottom', a + "px");
};
// 菜单内左边距
Nset.NMainPaddingLeft = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 500);
  pf.sS(Nstyle, curNId, '.NMain', 'padding-left', a + "px");
};
// 菜单内右边距
Nset.NMainPaddingRight = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 500);
  pf.sS(Nstyle, curNId, '.NMain', 'padding-right', a + "px");
};
/*--导航下拉菜单宽度设置开关--*/
Nset.NSubWidthToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subWidthAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSub', 'width');
  } else {
    pf.sAL('N_subWidthAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSub', 'width', $('#N_subWidth').val() + 'px');
  }
};
/*--导航下拉菜单宽度设置--*/
Nset.NSubWidth = function(obj) {
  var w = pf.wIframeWin.DF.config.defWebWidth[0],
    a = pf.numJudge(obj, 120, 60, w);
  pf.sS(Nstyle, curNId, '.NSub', 'width', a + 'px');
};

/*--下拉菜单内边距开关--*/
Nset.NSubCPaddingToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subCPaddingAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC', 'padding-top');
    pf.rS(Nstyle, curNId, '.NSubC', 'padding-bottom');
    pf.rS(Nstyle, curNId, '.NSubC', 'padding-right');
    pf.rS(Nstyle, curNId, '.NSubC', 'padding-left');
  } else if (a == 2) {
    pf.sAL('N_subCPaddingAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSubC', 'padding-top', $('#N_subCPaddingTop').val() + "px");
    pf.sS(Nstyle, curNId, '.NSubC', 'padding-bottom', $('#N_subCPaddingBottom').val() + "px");
    pf.sS(Nstyle, curNId, '.NSubC', 'padding-right', $('#N_subCPaddingRight').val() + "px");
    pf.sS(Nstyle, curNId, '.NSubC', 'padding-left', $('#N_subCPaddingLeft').val() + "px");
  }
};
// 下拉菜单内上边距
Nset.NSubCPaddingTop = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 50);
  pf.sS(Nstyle, curNId, '.NSubC', 'padding-top', a + "px");
};
// 下拉菜单内下边距
Nset.NSubCPaddingBottom = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 50);
  pf.sS(Nstyle, curNId, '.NSubC', 'padding-bottom', a + "px");
};
// 下拉菜单内左边距
Nset.NSubCPaddingLeft = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 50);
  pf.sS(Nstyle, curNId, '.NSubC', 'padding-left', a + "px");
};
// 下拉菜单内右边距
Nset.NSubCPaddingRight = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 50);
  pf.sS(Nstyle, curNId, '.NSubC', 'padding-right', a + "px");
};

/*--导航下拉菜背景开关--*/
Nset.NSubBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_subBgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC', 'background-color');
    pf.rS(Nstyle, curNId, '.NSubC', 'background-image');
    pf.rS(Nstyle, curNId, '.NSubC', 'background-position');
    pf.rS(Nstyle, curNId, '.NSubC', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NSubT', 'display');
    pf.rS(Nstyle, curNId, '.NSubB', 'display');
    if (a == 0) {
      pf.rS(Nstyle, curNId, '.NSub', 'background');
      pf.rS(Nstyle, curNId, '.NSubC', 'background');
      pf.rS(Nstyle, curNId, '.NSubT', 'background');
      pf.rS(Nstyle, curNId, '.NSubB', 'background');
    } else {
      pf.sS(Nstyle, curNId, '.NSub', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NSubC', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NSubT', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NSubB', 'background', 'none');
    }
  } else if (a == 2) {
    pf.sAL('N_subBgAttrlist', 'show');
    var bgimg = $('#N_subBgImage').val(),alook = $('#N_subBgImageLook'),anone = $('#N_subBgImageNone');
    pf.sS(Nstyle, curNId, '.NSubC', 'background-color', $('#N_subBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NSubC', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NSubC', 'background-position', $('#N_subBgPosition').val());
    pf.sS(Nstyle, curNId, '.NSubC', 'background-repeat', $('#N_subBgRepeat').val());
    pf.rS(Nstyle, curNId, '.NSubC', 'display');
    pf.sS(Nstyle, curNId, '.NSubT', 'display', 'none');
    pf.sS(Nstyle, curNId, '.NSubB', 'display', 'none');
  }
};
/*--导航下拉菜单背景颜色设置--*/
Nset.NSubBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC', 'background-color', a);
};
//导航背景颜色取消
Nset.NSubNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NSubC', 'background-color', "transparent");
};
/*--导航下拉菜单背景图片设置--*/
Nset.NSubBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_subBgImageLook'),anone = $('#N_subBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    bgimg = 'url(' + a + ')';
    alook.attr('href', a).show();
    anone.show();
  }
  pf.sS(Nstyle, curNId, '.NSubC', 'background-image', bgimg);
};
//导航下拉菜单背景图位置设置
Nset.NSubBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC', 'background-position', a);
};
//导航下拉背景图展示设置
Nset.NSubBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC', 'background-repeat', a);
};
/*--导航下拉透明度--*/
Nset.NSubOpacity = function(a) {
  pf.sS(Nstyle, curNId, '.NSub', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NSub', 'filter', 'alpha(opacity:' + a + ')');
};
//导航外观设置确定
Nset.exteriorStyleEnter = function(obj) {
  var t = $(obj);
  Nset.Nenter(t);
}
//导航外观设置恢复默认
Nset.exteriorStyleReset = function() {
  $('#N_positionAuto,#N_widthAuto,#N_fullAuto,#N_marginAuto,#N_bgAuto,#N_borderTopAuto,#N_borderBottomAuto,#N_borderRightAuto,#N_borderLeftAuto,#N_mainBorderTopAuto,#N_mainBorderBottomAuto,#N_mainBorderRightAuto,#N_mainBorderLeftAuto,#N_heightAuto,#N_mainPaddingAuto,#N_subWidthAuto,#N_subCPaddingAuto,#N_subBgAuto').trigger('click');
  var N_opacity = $('#N_opacity'),N_subOpacity = $('#N_subOpacity');
  N_opacity.val(100).change();
  N_subOpacity.val(100).change();
  setTimeout(function() {
    var prev_N = N_opacity.prev('.alpha');
    prev_N.find('.alphaMove').animate({
      "left": 100
    }, 200);
    prev_N.find('.alphaBg').animate({
      'width': 100
    }, 200);
    var prev_S = N_subOpacity.prev('.alpha');
    prev_S.find('.alphaMove').animate({
      "left": 100
    }, 200);
    prev_S.find('.alphaBg').animate({
      'width': 100
    }, 200);
  }, 100);
  pf.rS(Nstyle, curNId, '.NMainBg', 'opacity');
  pf.rS(Nstyle, curNId, '.NMainBg', 'filter');
  pf.rS(Nstyle, curNId, '.NLine', 'opacity');
  pf.rS(Nstyle, curNId, '.NLine', 'filter');
  pf.rS(Nstyle, curNId, '.NSub', 'opacity');
  pf.rS(Nstyle, curNId, '.NSub', 'filter');
  pf.rS(Nstyle, curNId, '.NLeft', 'opacity');
  pf.rS(Nstyle, curNId, '.NLeft', 'filter');
  pf.rS(Nstyle, curNId, '.NRight', 'opacity');
  pf.rS(Nstyle, curNId, '.NRight', 'filter');
};

/**----------------导航栏目项设置-------------------**/
/*-----默认状态----*/
/*--导航栏目宽度自定义开关--*/
Nset.NItemWidthToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_itemWidthAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemTable', 'width');
  } else {
    pf.sAL('N_itemWidthAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NItemTable', 'width', $('#N_itemWidth').val() + "px");
  }
};
/*--导航栏目宽度设置--*/
Nset.NItemWidth = function(obj) {
  var a = pf.numJudge(obj, 120, 10, 960);
  pf.sS(Nstyle, curNId, '.NItemTable', 'width', a + "px");
};

/*--导航高度开关--*/
Nset.NItemAHeightToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_itemAHeightAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemM a', 'line-height');
    pf.rS(Nstyle, curNId, '.NItemM a', 'height');
    pf.rS(Nstyle, curNId, '.NSub', 'top');
  } else {
    pf.sAL('N_itemAHeightAttrlist', 'show');
    var h = $('#N_itemAHeight').val(),
      lh = $('#N_itemAHeight').val();
    pf.sS(Nstyle, curNId, '.NItemM a', 'height', h + 'px');
    pf.sS(Nstyle, curNId, '.NItemM a', 'line-height', lh + 'px');
    pf.sS(Nstyle, curNId, '.NSub', 'top', h + 'px');
  }
};
/*--导航高度设置--*/
Nset.NItemAHeight = function(obj) {
  var a = pf.numJudge(obj, 50, 10, 1000);
  pf.sS(Nstyle, curNId, '.NItemM a', 'height', a + 'px');
  pf.sS(Nstyle, curNId, '.NSub', 'top', a + 'px');
};
/*--导航行高设置--*/
Nset.NItemALineheight = function(obj) {
  var a = pf.numJudge(obj, 50, 10, 1000);
  pf.sS(Nstyle, curNId, '.NItemM a', 'line-height', a + 'px');
};

/*--导航栏目项背景开关--*/
Nset.NItemBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_itemBgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemM', 'background-color');
    pf.rS(Nstyle, curNId, '.NItemM', 'background-image');
    pf.rS(Nstyle, curNId, '.NItemM', 'background-position');
    pf.rS(Nstyle, curNId, '.NItemM', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NItemL', 'display');
    pf.rS(Nstyle, curNId, '.NItemR', 'display');
    if (a == 0) {
      pf.rS(Nstyle, curNId, '.NItemM', 'background');
      pf.rS(Nstyle, curNId, '.NItemL', 'background');
      pf.rS(Nstyle, curNId, '.NItemR', 'background');
    } else {
      pf.sS(Nstyle, curNId, '.NItemM', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NItemL', 'background', 'none');
      pf.sS(Nstyle, curNId, '.NItemR', 'background', 'none');
    }
  } else if (a == 2) {
    var bgimg = $('#N_itemBgImage').val(),alook = $('#N_itemBgImageLook'),anone = $('#N_itemBgImageNone');
    pf.sAL('N_itemBgAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NItemL', 'display', 'none');
    pf.sS(Nstyle, curNId, '.NItemR', 'display', 'none');
    pf.sS(Nstyle, curNId, '.NItemM', 'background-color', $('#N_itemBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.rS(Nstyle, curNId, '.NItemM', 'background');
    pf.rS(Nstyle, curNId, '.NItemL', 'background');
    pf.rS(Nstyle, curNId, '.NItemR', 'background');
    pf.sS(Nstyle, curNId, '.NItemM', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NItemM', 'background-position', $('#N_itemBgPosition').val());
    pf.sS(Nstyle, curNId, '.NItemM', 'background-repeat', $('#N_itemBgRepeat').val());
  }
};
/*--导航栏目项背景颜色设置--*/
Nset.NItemBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM', 'background-color', a);
};
//导航栏目项背景颜色取消
Nset.NItemNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NItemM', 'background-color', "transparent");
};
/*--导航栏目项背景图片设置--*/
Nset.NItemBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_itemBgImageLook'),anone = $('#N_itemBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    alook.attr('href', a).show();
    anone.show();
    bgimg = 'url(' + a + ')';
  }
  pf.sS(Nstyle, curNId, '.NItemM', 'background-image', bgimg);
};
/*--导航栏目背景位置设置--*/
Nset.NItemBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM', 'background-position', a);
};
/*--导航栏目背景状态设置--*/
Nset.NItemBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM', 'background-repeat', a);
};
/*--导航背景透明度--*/
Nset.NItemOpacity = function(a) {
  pf.sS(Nstyle, curNId, '.NItemTable', 'opacity', a / 100);
  pf.sS(Nstyle, curNId, '.NItemTable', 'filter', 'alpha(opacity:' + a + ')');
};
/*--导航栏目文字开关--*/
Nset.NItemFontToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_itemFontAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemM a', 'color');
    pf.rS(Nstyle, curNId, '.NItemM a', 'font-size');
    pf.rS(Nstyle, curNId, '.NItemM a', 'font-weight');
    pf.rS(Nstyle, curNId, '.NItemM a', 'font-style');
    pf.rS(Nstyle, curNId, '.NItemM a', 'text-decoration');
    pf.rS(Nstyle, curNId, '.NItemM a', 'font-family');
    pf.rS(Nstyle, curNId, '.NItemM a', 'text-align');
  } else if (a == 1) {
    pf.sAL('N_itemFontAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NItemM a', 'color', $('#N_itemFontColor').val());
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-size', $('#N_itemFontSize').val() + 'px');
    var b = $('#N_itemFontBold')[0].checked ? 700 : 400;
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-weight', b);
    var i = $('#N_itemFontItalic')[0].checked ? 'italic' : 'normal';
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-style', i);
    var u = $('#N_itemFontUnderline')[0].checked ? 'underline' : 'none';
    pf.sS(Nstyle, curNId, '.NItemM a', 'text-decoration', u);
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-family', $('#N_itemFontFamily').val());
    pf.sS(Nstyle, curNId, '.NItemM a', 'text-align', $('#N_itemTextAlign').val());
  }
};
/*--导航栏目文字颜色--*/
Nset.NItemFontColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM a', 'color', a);
};
/*--导航栏目文字大小--*/
Nset.NItemFontSize = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM a', 'font-size', a + 'px');
};
/*--导航栏目文字加粗--*/
Nset.NItemFontBold = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-weight', '700');
  } else {
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-weight', '400');
  }
};
/*--导航栏目文字斜体--*/
Nset.NItemFontItalic = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-style', 'italic');
  } else {
    pf.sS(Nstyle, curNId, '.NItemM a', 'font-style', 'normal');
  }
};
/*--导航栏目文字下划线--*/
Nset.NItemFontUnderline = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemM a', 'text-decoration', 'underline');
  } else {
    pf.sS(Nstyle, curNId, '.NItemM a', 'text-decoration', 'none');
  }
};
/*--导航栏目文字字体--*/
Nset.NItemFontFamily = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM a', 'font-family', a);
};
/*--导航栏目文字对齐方式--*/
Nset.NItemTextAlign = function(a) {
  pf.sS(Nstyle, curNId, '.NItemM a', 'text-align', a);
};
/*--导航栏目分割线开关--*/
Nset.NItemLineToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_itemLineAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NLine', 'width');
    pf.rS(Nstyle, curNId, '.NLine', 'height');
    pf.rS(Nstyle, curNId, '.NLine', 'background-color');
    pf.rS(Nstyle, curNId, '.NLine', 'background-image');
    pf.rS(Nstyle, curNId, '.NLine', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NLine', 'background-position');
    a == 0 ? pf.rS(Nstyle, curNId, '.NLine', 'display') : pf.sS(Nstyle, curNId, '.NLine', 'display', 'none');
  } else if (a == 2) {
    pf.sAL('N_itemLineAttrlist', 'show');
    var bgimg = $('#N_itemLineBgImage').val(),alook = $('#N_itemLineBgImageLook'),anone = $('#N_itemLineBgImageNone');
    pf.sS(Nstyle, curNId, '.NLine', 'display', 'block');
    pf.sS(Nstyle, curNId, '.NLine', 'height', $('#N_itemLineHeight').val() + 'px');
    pf.sS(Nstyle, curNId, '.NLine', 'width', $('#N_itemLineWidth').val() + 'px');
    pf.sS(Nstyle, curNId, '.NLine', 'background-color', $('#N_itemLineBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NLine', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NLine', 'background-position', $('#N_itemLineBgPosition').val());
    pf.sS(Nstyle, curNId, '.NLine', 'background-repeat', $('#N_itemLineBgRepeat').val());
  }
};
/*--导航栏目分割线高度度设置--*/
Nset.NItemLineHeight = function(obj) {
  var a = pf.numJudge(obj, 50, 10, 1000);
  pf.sS(Nstyle, curNId, '.NLine', 'height', a + 'px');
};
/*--导航栏目分割线宽度设置--*/
Nset.NItemLineWidth = function(obj) {
  var a = pf.numJudge(obj, 0, 0, 100);
  pf.sS(Nstyle, curNId, '.NLine', 'width', a + 'px');
};
/*--导航栏目分割线颜色设置--*/
Nset.NItemLineBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NLine', 'background-color', a);
};
//导航背景颜色取消
Nset.NItemLineNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NLine', 'background-color', "transparent");
};
/*--导航栏目分割背景图片设置--*/
Nset.NItemLineBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_itemLineBgImageLook'),anone = $('#N_itemLineBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    bgimg = 'url(' + a + ')';
    alook.attr('href', a).show();
    anone.show();
  }
  pf.sS(Nstyle, curNId, '.NLine', 'background-image', bgimg);
};
/*--导航栏目分割背景位置设置--*/
Nset.NItemLineBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NLine', 'background-position', a);
};
/*--导航栏目分割背景状态设置--*/
Nset.NItemLineBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NLine', 'background-repeat', a);
};
/*-----鼠标经过状态----*/
/*--导航栏目项鼠标经过背景开关--*/
Nset.NItemHoverBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_itemHoverBgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background-color');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background-image');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background-position');
    a == 0 ? pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background') : pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background', 'none');
  } else if (a == 2) {
    var bgimg = $('#N_itemHoverBgImage').val(),alook = $('#N_itemHoverBgImageLook'),anone = $('#N_itemHoverBgImageNone');
    pf.sAL('N_itemHoverBgAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM', 'background')
    pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-color', $('#N_itemHoverBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-position', $('#N_itemHoverBgPosition').val());
    pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-repeat', $('#N_itemHoverBgRepeat').val());
  }
};
/*--导航栏目项鼠标经过背景颜色设置--*/
Nset.NItemHoverBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-color', a);
};
//导航栏目项鼠标经过取消背景颜色设置
Nset.NItemHoverNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-color', "transparent");
};
/*--导航栏目项鼠标经过背景图片设置--*/
Nset.NItemHoverBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_itemHoverBgImageLook'),anone = $('#N_itemHoverBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    bgimg = 'url(' + a + ')';
    alook.attr('href', a).show();
    anone.show();
  }
  pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-image', bgimg);
};
/*--导航栏目鼠标经过背景位置设置--*/
Nset.NItemHoverBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-position', a);
};
/*--导航栏目鼠标经过背景状态设置--*/
Nset.NItemHoverBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM', 'background-repeat', a);
};
/*--导航栏目鼠标经过文字开关--*/
Nset.NItemHoverFontToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_itemHoverFontAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'color');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'font-size');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'font-weight');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'font-style');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'text-decoration');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'font-family');
    pf.rS(Nstyle, curNId, '.NItemH .NItemM a', 'text-align');
  } else if (a == 1) {
    pf.sAL('N_itemHoverFontAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'color', $('#N_itemHoverFontColor').val());
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-size', $('#N_itemHoverFontSize').val() + 'px');
    var b = $('#N_itemHoverFontBold')[0].checked ? 700 : 400;
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-weight', b);
    var s = $('#N_itemHoverFontItalic')[0].checked ? 'italic' : 'normal';
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-style', s);
    var u = $('#N_itemHoverFontUnderline')[0].checked ? 'underline' : 'none';
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'text-decoration', u);
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-family', $('#N_itemHoverFontFamily').val());
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'text-align', $('#N_itemHoverTextAlign').val());
  }
};
/*--导航栏目鼠标经过文字颜色--*/
Nset.NItemHoverFontColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'color', a);
};
/*--导航栏目鼠标经过文字大小--*/
Nset.NItemHoverFontSize = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-size', a + 'px');
};
/*--导航栏目鼠标经过文字加粗--*/
Nset.NItemHoverFontBold = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-weight', '700');
  } else {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-weight', '400');
  }
};
/*--导航栏目鼠标经过文字斜体--*/
Nset.NItemHoverFontItalic = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-style', 'italic');
  } else {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-style', 'normal');
  }
};
/*--导航栏目鼠标经过文字下划线--*/
Nset.NItemHoverFontUnderline = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'text-decoration', 'underline');
  } else {
    pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'text-decoration', 'none');
  }
};
/*--导航栏目鼠标经过文字字体--*/
Nset.NItemHoverFontFamily = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'font-family', a);
};
/*--导航栏目鼠标经过文字对齐方式--*/
Nset.NItemHoverTextAlign = function(a) {
  pf.sS(Nstyle, curNId, '.NItemH .NItemM a', 'text-align', a);
};
/*-------当前状态-------*/
/*--导航栏目项当前状态背景开关--*/
Nset.NItemCurBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_itemCurBgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background-color');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background-image');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background-repeat');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background-position');
    a == 0 ? pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background') : pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background', 'none');
  } else if (a == 2) {
    var bgimg = $('#N_itemCurBgImage').val(),alook = $('#N_itemCurBgImageLook'),anone = $('#N_itemCurBgImageNone');
    pf.sAL('N_itemCurBgAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM', 'background')
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-color', $('#N_itemCurBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show()
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-position', $('#N_itemCurBgPosition').val());
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-repeat', $('#N_itemCurBgRepeat').val());
  }
};
/*--导航栏目项当前状态背景颜色设置--*/
Nset.NItemCurBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-color', a);
};
//导航栏目项当前状态取消背景颜色设置
Nset.NItemCurNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-color', "transparent");
};
/*--导航栏目项当前状态背景图片设置--*/
Nset.NItemCurBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_itemCurBgImageLook'),anone = $('#N_itemCurBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    bgimg = 'url(' + a + ')';
    alook.attr('href', a).show();
    anone.show();
  }
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-image', bgimg);
};
/*--导航栏目当前状态背景位置设置--*/
Nset.NItemCurBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-position', a);
};
/*--导航栏目当前状态背景状态设置--*/
Nset.NItemCurBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM', 'background-repeat', a);
};
/*--导航栏目当前状态文字开关--*/
Nset.NItemCurFontToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_itemCurFontAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'color');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-size');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-weight');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-style');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-decoration');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-family');
    pf.rS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-align');
  } else if (a == 1) {
    pf.sAL('N_itemCurFontAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'color', $('#N_itemCurFontColor').val());
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-size', $('#N_itemCurFontSize').val() + 'px');
    var b = $('#N_itemCurFontBold')[0].checked ? 700 : 400;
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-weight', b);
    var s = $('#N_itemCurFontItalic')[0].checked ? 'italic' : 'normal';
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-style', s);
    var u = $('#N_itemCurFontUnderline')[0].checked ? 'underline' : 'none';
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-decoration', u);
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-family', $('#N_itemCurFontFamily').val());
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-align', $('#N_itemCurTextAlign').val());
  }
};
/*--导航栏目当前状态文字颜色--*/
Nset.NItemCurFontColor = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'color', a);
};
/*--导航栏目文字大小--*/
Nset.NItemCurFontSize = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-size', a + 'px');
};
/*--导航栏目当前状态文字加粗--*/
Nset.NItemCurFontBold = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-weight', '700');
  } else {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-weight', '400');
  }
};
/*--导航栏目当前状态文字斜体--*/
Nset.NItemCurFontItalic = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-style', 'italic');
  } else {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-style', 'normal');
  }
};
/*--导航栏目当前状态文字下划线--*/
Nset.NItemCurFontUnderline = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-decoration', 'underline');
  } else {
    pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-decoration', 'none');
  }
};
/*--导航栏目当前状态文字字体--*/
Nset.NItemCurFontFamily = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'font-family', a);
};
/*--导航栏目当前状态文字对齐方式--*/
Nset.NItemCurTextAlign = function(a) {
  pf.sS(Nstyle, curNId, '.NItemCur .NItemM a', 'text-align', a);
};
/*--导航栏目项设置确定--*/
Nset.NItemStyleEnter = function(obj){
  var t = $(obj);
  Nset.Nenter(t);
}
//导航栏目项设置恢复默认
Nset.NItemStyleReset = function() {
  $('#N_itemWidthAuto,#N_itemAHeightAuto,#N_itemBgAuto,#N_itemFontAuto,#N_itemLineAuto,#N_itemHoverBgAuto,#N_itemHoverFontAuto,#N_itemCurBgAuto,#N_itemCurFontAuto').trigger('click');
  var N_itemOpacity = $('#N_itemOpacity');
  N_itemOpacity.val(100).change();
  setTimeout(function() {
    var prev_N = N_itemOpacity.prev('.alpha');
    prev_N.find('.alphaMove').animate({
      "left": 100
    }, 200);
    prev_N.find('.alphaBg').animate({
      'width': 100
    }, 200);
  }, 100);
  pf.rS(Nstyle, curNId, '.NItemTable', 'opacity');
  pf.rS(Nstyle, curNId, '.NItemTable', 'filter');
};

/*****************下拉菜单项目设置**********************/
/*--下拉菜单栏目多行显示开关--*/
Nset.NSubItemFloatToggle = function(a) {
  if (a == 1) {
    pf.rS(Nstyle, curNId, '.NSubC p', 'float');
  } else {
    pf.sS(Nstyle, curNId, '.NSubC p', 'float','left');
  }
};
/*--下拉菜单栏目项高度自定义开关--*/
Nset.NSubItemHeightToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subItemHeightAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC a', 'height');
    pf.rS(Nstyle, curNId, '.NSubC a', 'line-height');
  } else {
    pf.sAL('N_subItemHeightAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSubC a', 'height', $('#N_subItemHeight').val() + "px");
    pf.sS(Nstyle, curNId, '.NSubC a', 'line-height', $('#N_subItemLineheight').val() + "px");
  }
};
/*--下拉菜单栏目项高度设置--*/
Nset.NSubItemHeight = function(obj) {
  var a = pf.numJudge(obj, 30, 15, 100);
  pf.sS(Nstyle, curNId, '.NSubC a', 'height', a + "px");
};
/*--下拉菜单栏目项行高设置--*/
Nset.NSubItemLineheight = function(obj) {
  var a = pf.numJudge(obj, 30, 15, 100);
  pf.sS(Nstyle, curNId, '.NSubC a', 'line-height', a + "px");
};
/*--导航下拉菜单宽度设置开关--*/
Nset.NSubItemWidthToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subItemWidthAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC a', 'width');
  } else {
    pf.sAL('N_subItemWidthAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSubC a', 'width', $('#N_subItemWidth').val() + 'px');
  }
};
/*--导航下拉菜单宽度设置--*/
Nset.NSubItemWidth = function(obj) {
  var a = pf.numJudge(obj, 120, 10, 960);
  pf.sS(Nstyle, curNId, '.NSubC a', 'width', a + 'px');
};

/*--下拉菜单栏目项上边线开关--*/
Nset.NSubItemBorderTopToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_subItemBorderTopAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-top-width');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-top-style');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-top-color');
    a == 0 ? pf.rS(Nstyle, curNId, '.NSubC p', 'border-top') : pf.sS(Nstyle, curNId, '.NSubC p', 'border-top', 'none');
  } else if (a == 2) {
    pf.sAL('N_subItemBorderTopAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-top');
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-color', $('#N_subItemBorderTopColor').val());
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-style', $('#N_subItemBorderTopStyle').val());
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-width', $('#N_subItemBorderTopWidth').val() + 'px');
  }
};
/*--下拉菜单栏目项上边线宽度--*/
Nset.NSubItemBorderTopWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-width', a + 'px');
  //Nset.resizeNav(curN);
};
/*--下拉菜单栏目项上边线颜色--*/
Nset.NSubItemBorderTopColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-color', a);
};
/*--下拉菜单栏目项上边线样式--*/
Nset.NSubItemBorderTopStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-top-style', a);
};
/*--下拉菜单栏目项下边线开关--*/
Nset.NSubItemBorderBottomToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_subItemBorderBottomAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-bottom-width');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-bottom-style');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-bottom-color');
    a == 0 ? pf.rS(Nstyle, curNId, '.NSubC p', 'border-bottom') : pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom', 'none');
  } else if (a == 2) {
    pf.sAL('N_subItemBorderBottomAttrlist', 'show');
    pf.rS(Nstyle, curNId, '.NSubC p', 'border-bottom');
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-color', $('#N_subItemBorderBottomColor').val());
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-style', $('#N_subItemBorderBottomStyle').val());
    pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-width', $('#N_subItemBorderBottomWidth').val() + 'px');
  }
};
/*--下拉菜单栏目项下边线宽度--*/
Nset.NSubItemBorderBottomWidth = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-width', a + 'px');
  //Nset.resizeNav(curN);
};
/*--下拉菜单栏目项下边线颜色--*/
Nset.NSubItemBorderBottomColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-color', a);
};
/*--下拉菜单栏目项下边线样式--*/
Nset.NSubItemBorderBottomStyle = function(a) {
  pf.sS(Nstyle, curNId, '.NSubC p', 'border-bottom-style', a);
};
/*--下拉菜单栏目项背景开关--*/
Nset.NSubItemABgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_subItemABgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSub a', 'background-color');
    pf.rS(Nstyle, curNId, '.NSub a', 'background-image');
    pf.rS(Nstyle, curNId, '.NSub a', 'background-position');
    pf.rS(Nstyle, curNId, '.NSub a', 'background-repeat');
    a == 0 ? pf.rS(Nstyle, curNId, '.NSub a', 'background') : pf.sS(Nstyle, curNId, '.NSub a', 'background', 'none');
  } else if (a == 2) {
    pf.sAL('N_subItemABgAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSub a', 'background-color', $('#N_subItemABgColor').val());
    var bgimg = $('#N_subItemABgImage').val(),alook = $('#N_subItemABgImageLook'),anone = $('#N_subItemABgImageNone');
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NSub a', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NSub a', 'background-position', $('#N_subItemABgPosition').val());
    pf.sS(Nstyle, curNId, '.NSub a', 'background-repeat', $('#N_subItemABgRepeat').val());
  }
};
/*--下拉菜单栏目项背景颜色设置--*/
Nset.NSubItemABgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'background-color', a);
};
//下拉菜单栏目项背景颜色取消
Nset.NSubItemANoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NSub a', 'background-color', "transparent");
};
/*--下拉菜单栏目项背景图片设置--*/
Nset.NSubItemABgImage = function(a) {
  var bgimg = 'none',alook = $('#N_subItemABgImageLook'),anone = $('#N_subItemABgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    alook.attr('href', bgimg).show();
    anone.show();
    bgimg = 'url(' + a + ')';
  }
  pf.sS(Nstyle, curNId, '.NSub a', 'background-image', bgimg);
};
/*--下拉菜单栏目项背景位置设置--*/
Nset.NSubItemABgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'background-position', a);
};
/*--下拉菜单栏目项背景状态设置--*/
Nset.NSubItemABgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'background-repeat', a);
};

/*--下拉菜单栏目项文字开关--*/
Nset.NSubItemAFontToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subItemAFontAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSub a', 'color');
    pf.rS(Nstyle, curNId, '.NSub a', 'font-size');
    pf.rS(Nstyle, curNId, '.NSub a', 'font-weight');
    pf.rS(Nstyle, curNId, '.NSub a', 'font-style');
    pf.rS(Nstyle, curNId, '.NSub a', 'text-decoration');
    pf.rS(Nstyle, curNId, '.NSub a', 'font-family');
    pf.rS(Nstyle, curNId, '.NSub a', 'text-align');
  } else if (a == 1) {
    pf.sAL('N_subItemAFontAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSub a', 'color', $('#N_subItemAFontColor').val());
    pf.sS(Nstyle, curNId, '.NSub a', 'font-size', $('#N_subItemAFontSize').val() + 'px');
    var b = $('#N_subItemAFontBold')[0].checked ? 700 : 400;
    pf.sS(Nstyle, curNId, '.NSub a', 'font-weight', b);
    var i = $('#N_subItemAFontItalic')[0].checked ? 'italic' : 'normal';
    pf.sS(Nstyle, curNId, '.NSub a', 'font-style', i);
    var u = $('#N_subItemAFontUnderline')[0].checked ? 'underline' : 'none';
    pf.sS(Nstyle, curNId, '.NSub a', 'text-decoration', u);
    pf.sS(Nstyle, curNId, '.NSub a', 'font-family', $('#N_subItemAFontFamily').val());
    pf.sS(Nstyle, curNId, '.NSub a', 'text-align', $('#N_subItemATextAlign').val());
  }
};
/*--下拉菜单栏目项文字颜色--*/
Nset.NSubItemAFontColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'color', a);
};
/*--下拉菜单栏目项文字大小--*/
Nset.NSubItemAFontSize = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'font-size', a + 'px');
};
/*--下拉菜单栏目项文字加粗--*/
Nset.NSubItemAFontBold = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a', 'font-weight', '700');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a', 'font-weight', '400');
  }
};
/*--下拉菜单栏目项文字斜体--*/
Nset.NSubItemAFontItalic = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a', 'font-style', 'italic');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a', 'font-style', 'normal');
  }
};
/*--下拉菜单栏目项文字下划线--*/
Nset.NSubItemAFontUnderline = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a', 'text-decoration', 'underline');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a', 'text-decoration', 'none');
  }
};
/*--下拉菜单栏目项文字字体--*/
Nset.NSubItemAFontFamily = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'font-family', a);
};
/*--下拉菜单栏目项文字对齐方式--*/
Nset.NSubItemATextAlign = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a', 'text-align', a);
};

/*--下拉菜单栏目项鼠标经过背景开关--*/
Nset.NSubItemAHoverBgToggle = function(a) {
  if (a == 0 || a == 1) {
    pf.sAL('N_subItemAHoverBgAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'background-color');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'background-image');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'background-position');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'background-repeat');
    a == 0 ? pf.rS(Nstyle, curNId, '.NSub a:hover', 'background') : pf.sS(Nstyle, curNId, '.NSub a:hover', 'background', 'none');
  } else if (a == 2) {
    var bgimg = $('#N_subItemAHoverBgImage').val(),alook = $('#N_subItemAHoverBgImageLook'),anone = $('#N_subItemAHoverBgImageNone');
    pf.sAL('N_subItemAHoverBgAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-color', $('#N_subItemAHoverBgColor').val());
    if (bgimg == 'none') {
      alook.hide();
      anone.hide();
    } else {
      alook.attr('href', bgimg).show();
      anone.show();
      bgimg = 'url(' + bgimg + ')';
    }
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-image', bgimg);
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-position', $('#N_subItemAHoverBgPosition').val());
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-repeat', $('#N_subItemAHoverBgRepeat').val());
  }
};
/*--下拉菜单栏目项鼠标经过背景颜色设置--*/
Nset.NSubItemAHoverBgColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-color', a);
};
//下拉菜单栏目项鼠标经过背景颜色取消
Nset.NSubItemAHoverNoBgColor = function() {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-color', "transparent");
};
/*--下拉菜单栏目项鼠标经过项背景图片设置--*/
Nset.NSubItemAHoverBgImage = function(a) {
  var bgimg = 'none',alook = $('#N_subItemAHoverBgImageLook'),anone = $('#N_subItemAHoverBgImageNone');
  if (a == 'none') {
    alook.hide();
    anone.hide();
  } else {
    bgimg = 'url(' + a + ')';
    anone.show();
    alook.attr('href', a).show();
  }
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-image', bgimg);
};
/*--下拉菜单栏目项鼠标经过背景位置设置--*/
Nset.NSubItemAHoverBgPosition = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-position', a);
};
/*--下拉菜单栏目项鼠标经过背景状态设置--*/
Nset.NSubItemAHoverBgRepeat = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'background-repeat', a);
};

/*--下拉菜单栏目项鼠标经过文字开关--*/
Nset.NSubItemAHoverFontToggle = function(a) {
  if (a == 0) {
    pf.sAL('N_subItemAHoverFontAttrlist', 'hide');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'color');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'font-size');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'font-weight');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'font-style');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'text-decoration');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'font-family');
    pf.rS(Nstyle, curNId, '.NSub a:hover', 'text-align');
  } else if (a == 1) {
    pf.sAL('N_subItemAHoverFontAttrlist', 'show');
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'color', $('#N_subItemAHoverFontColor').val());
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-size', $('#N_subItemAHoverFontSize').val() + 'px');
    var b = $('#N_subItemAHoverFontBold')[0].checked ? 700 : 400;
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-weight', b);
    var i = $('#N_subItemAHoverFontItalic')[0].checked ? 'italic' : 'normal';
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-style', i);
    var u = $('#N_subItemAHoverFontUnderline')[0].checked ? 'underline' : 'none';
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'text-decoration', u);
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-family', $('#N_subItemAHoverFontFamily').val());
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'text-align', $('#N_subItemAHoverTextAlign').val());
  }
};
/*--下拉菜单栏目项鼠标经过文字颜色--*/
Nset.NSubItemAHoverFontColor = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'color', a);
};
/*--下拉菜单栏目项鼠标经过文字大小--*/
Nset.NSubItemAHoverFontSize = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-size', a + 'px');
};
/*--下拉菜单栏目项鼠标经过文字加粗--*/
Nset.NSubItemAHoverFontBold = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-weight', '700');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-weight', '400');
  }
};
/*--下拉菜单栏目项鼠标经过文字斜体--*/
Nset.NSubItemAHoverFontItalic = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-style', 'italic');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-style', 'normal');
  }
};
/*--下拉菜单栏目项鼠标经过文字下划线--*/
Nset.NSubItemAHoverFontUnderline = function(a) {
  if ($(a).attr("checked")) {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'text-decoration', 'underline');
  } else {
    pf.sS(Nstyle, curNId, '.NSub a:hover', 'text-decoration', 'none');
  }
};
/*--下拉菜单栏目项鼠标经过文字字体--*/
Nset.NSubItemAHoverFontFamily = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'font-family', a);
};
/*--下拉菜单栏目项鼠标经过文字对齐方式--*/
Nset.NSubItemAHoverTextAlign = function(a) {
  pf.sS(Nstyle, curNId, '.NSub a:hover', 'text-align', a);
};
/*--拉菜单栏目项设置确定--*/
Nset.NSubItemStyleEnter = function(obj){
  var t = $(obj);
  Nset.Nenter(t);
};
/*--拉菜单栏目项设置恢复默认--*/
Nset.NSubItemStyleReset = function() {
  $("#N_subItemFloatNo,#N_subItemHeightAuto,#N_subItemWidthAuto,#N_subItemBorderTopAuto,#N_subItemBorderBottomAuto,#N_subItemABgAuto,#N_subItemAFontAuto,#N_subItemAHoverBgAuto,#N_subItemAHoverFontAuto").trigger('click');
};