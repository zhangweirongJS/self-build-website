/**
 * Created by qiangxl on 2017/2/20.
 */

// //夸iframe公用方法
// var pf = {
// 	gCss: function(obj, name) { //得到元素的css
// 		var style = obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
// 		return parseInt(style);
// 	}
// };
//初始化对象
var DF = {}; //定义一个全局的对象。
DF.o = {}; //用来存放jQuery得到的Dom元素;
DF.f = { //功能性函数
  s_j: function(st) { //字符串转换成json
    if (!!st) {
      var j = "{" + st + "}";
      j = eval('(' + j + ')');
      return j;
    } else {
      j = {};
      return j;
    }
  },
  j_s: function(j) { //将json转换成字符串
    var x = [];
    for (i in j) {
      x.push(i + ":" + j[i]);
    }
    return x.join(",");
  },
  addXL: function(o) { //添加选中虚线
    if(!o.data('xl')){
      var xl = "",
        w = o.outerWidth(),
        h = o.outerHeight();
      xl += '<div class="wire wireL" style="height:' + h + 'px;"></div><div class="wire wireT" style="width:' + w + 'px;"></div><div class="wire wireR" style="height:' + h + 'px;"></div><div class="wire wireB" style="width:' + w + 'px;"></div>';
      o.data('xl',1).append(xl);
    }
  },
  delXL: function(o) { //删除选中虚线
    o.data('xl',0).children(".wire").remove();
  },
  addShade: function(o, cName) { //添加遮罩
    o.append('<div class="' + cName + '" style="width:' + o.width() + 'px; height:' + o.height() + 'px;"></div>');
  },
  removeShade: function(o, cName) { //删除遮罩
    o.children("." + cName).remove();
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
  delfn: function(o,f) { //删除函数
    o.animate({
      "opacity": 0,
      "height": 10
    }, 500, function() {
      $(this).remove();
      if(typeof f == 'function'){
        f();
      }
    });
  },
  packEdit : function(j){
    var small = $('<small data-id="' + j.cName + '" title="' + j.title + '" class="' + j.cName + '">' + j.text + '</small>');
    return small;
  },
  addEdit: function(o, addObj, cName) { //添加编辑
    var op;
    if(!o.data('addop')){
      op = $('<span class="' + cName + '"></span>');
      for (i = 0; i < addObj.length; i++) {
        op.append(addObj[i]);
      }
      op.on({
        mouseenter : function(){
          $(this).addClass("cur");
        },
        mouseleave : function(){
          $(this).removeClass("cur");
        }
      },'small').appendTo(o);
      o.data('addop',1);
    }else{
      op = o.find('.cName');
    }
    return op;
  },
  removeEdit: function(o, cName) { //移除编辑
    o.data('addop',0).children(cName).remove();
  },
  changeAttr: function(o, setAttr, setVal) { //改变元素的指定属性
    o.attr(setAttr, setVal);
  },
  openPopup: function(tit, url) { //打开固定样式窗口
    var popups = parWin.$.popup({
      addTarget: parWin.Ev.pubVar.winDocum.find("body"),
      type: 5,
      area: {w: 656,h: 515},
      head: {text: tit},
      animate: {type: 1},
      con: {src: url}
    });
    return popups;
  },
  openconfirm : function(txt, fun){
    var confirms =  parWin.$.popup({
      addTarget: parWin.Ev.pubVar.winDocum.find("body"),
      type: 2,
      animate: {type: 1},
      head: {yes: 1,text: '系统提示'},
      opBut: {yes: 0},
      con: {text: [1, txt],img: [1, "warn"]},
      but: {yes: 1,button: {but_1: {fun: function() {fun();}}}}
    });
    return confirms;
  },
  writeStyle: function(cSId) { //根据字符串往页面中添加样式
    var cS = $("#" + cSId),
      cSh = "",
      x;
    if (cS.length != 0) {
      cS.remove();
    }
    if (cSId != 'Mstyle' && cSId != 'Rstyle' && cSId != 'cusMstyle' && cSId != 'cusHMstyle' && cSId != 'AbsStyle') {
      if (sCssJson[cSId] == 'undefined' || !sCssJson[cSId]) {
        cSh = "";
      } else {
        cSh = sCssJson[cSId];
      }
    } else {
      for (x in sCssJson[cSId]) {
        if (sCssJson[cSId][x] == 'undefined' || !sCssJson[cSId][x]) {
          cSh += "";
        } else {
          cSh += sCssJson[cSId][x];
        }
      }
    }
    $("head").append("<style type='text/css' id=" + cSId + ">" + cSh + "</style>");
  },
  deleteStyle: function(cSId, idArray) { //删除页面中json串中的样式
    if (cSId == 'Mstyle' || cSId == 'AbsStyle') {
      for (var i = 0; i < idArray.length; i++) {
        delete sCssJson[cSId][idArray[i]];
      }
    } else {
      delete sCssJson[idArray[0]];
    }
  },
  changeStyleJson: function() {},
  dragStopFn: function(o) { //拖动停止执行的方法主要是logo,search,shoppingcar等拖动位置的计算
    var sl = Math.floor(($(document).width() - DF.config.webWidth[0]) / 2),
      bl = sl + DF.config.webWidth[0] - o.outerWidth();
    if (o.offset().left < sl) {
      o.css({
        left: sl
      });
    }
    if (o.offset().left > bl) {
      o.css({
        left: bl
      });
    }
  },
  randomS: function(len) { //生成随机数
    var len = len || 5,
      chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      pwd = '';
    for (i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  /*层级方法*/
  sortZindex : function(s, tid, pid, dir) {	//更换层级方法
    var pobj = $('#' + pid),
      parr = DF.config.sortZindex[pid],
      sid = false,i = 0,x = 0,len = parr.length,
      zfun = function(){
        var cobj,sobj;
        switch(s){
          case  'row' :
            cobj = pobj.find('#' + tid).parent();
            sobj = pobj.find('#' + sid).parent();
            break;
          case 'abs' :
            cobj = pobj.find('#' + tid);
            sobj = pobj.find('#' + sid);
            break;
        }
        cobj.css({'z-index': x});
        sobj.css({'z-index': i});
      };
    for (; i < len; i++) {
      if(tid == parr[i]) break;
    }
    if (dir == 'upLayer' && i < len - 1 || dir == 'downLayer' && i > 0){
      x = dir == 'upLayer' ? i + 1 : i - 1;
      sid = parr[x];
      parr.splice(i, 1);
      parr.splice(x, 0, tid);
      zfun();
    }else if(dir == 'del'){
      parr.splice(i, 1);
      for(var y = i; y < parr.length; y++){
        switch(s){
          case 'row' :
            pobj.find('#' + parr[y]).parent().css({'z-index' : y});
            break;
          case 'abs' :
            pobj.find('#' + parr[y]).css({'z-index' : y});
            break;
        }
      }
    }
  }
};
/**公用操作方法**/
DF.pub = {};
DF.pub.Fun = {
  sysMoOpera : function(a, id){
    // 添加删除公用系统模块函数
    o = $("#" + id);
    da = DF.f.s_j(o.data('attr'));
    var funs = function(s){
      da.h = s;da.c = 1;
      var da_ = DF.f.j_s(da);
      o.attr('data-attr',da_).data('attr',da_);
      DF.config.sysPubRowStatus[id] = s;
      switch (id) {
        case 'top_area':
        case 'banner_area':
        case 'header':
        case 'web_nav':
          DF.o.mc.offset().top > 0 ? DF.o.addPageHeaderBut.hide() : DF.o.addPageHeaderBut.show();
          break;
        case 'footer':
          s == 0 ? DF.o.fAddBut.hide() : DF.o.fAddBut.show();
          break;
      }
      parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
      parWin.Ev.pubFun.changeSave();
    };
    if(a == 'c'){
      o.fadeIn('100', function() {
        o.addClass('shakeDom');
        setTimeout(function() {
          o.removeClass('shakeDom');
        }, 500);
        funs(0);
      });
    }else{
      o.fadeOut('2000', function() {
        funs(1);
      });
    }
  },
  absMoOpera : function(a, id, o){
    var absSortArr = DF.config.sortZindex.absolute_module_wrap;
    if(a == 'c'){
      var o = $("#" + id),addDomS = false,
        t = DF.o.c.offset().top,creaId;
      switch(id){
        case 'absoluteMenuCatalog' :
          creaId = 'absMC_'+ DF.f.randomS();
          addDomS = $('<div class="absolute-module absolute-menu-catalog absolute-menu-catalog-0" id="'+ creaId +'"  data-attr="n:1,mt:1,h:0,sk:0,z:'+ absSortArr.length +'"  data-s="l:0,t:'+ t +'" data-open="1" style="left: 0px; top: '+ t +'px; z-index : '+ absSortArr.length +'"><b class="moveBtn" title="拖动句柄移动导航">拖动移动位置</b><div class="a-m-c a-m-c-open"><div class="a-m-c-i"><h2 class="m-c-h m-c-h-open"><a href="#" class="m-c-h-i">全部商品</a></h2><div class="m-c-b"><div class="m-c-b-i"></div></div></div></div></div>');

          break;
      }
      DF.o.absIn.append(addDomS);
      absSortArr.push(creaId);
      addDomS.addClass('shakeDom');
      setTimeout(function() {
        addDomS.removeClass('shakeDom');
      }, 500);
    }else if(a == 'd'){
      var absSortArr = DF.config.sortZindex.absolute_module_wrap,
        delAbsSortArr = DF.config.delMoHistory.absolute_module_wrap,
        fun = function(){
          var x = 0,have = true;
          for (; x < delAbsSortArr.length; x++) {
            if (delAbsSortArr[x] == id) {
              have = false;
            }
          }
          have && delAbsSortArr.push(id);
          DF.f.sortZindex('abs', id, 'absolute_module_wrap','del');
        };
      DF.f.delfn(o,fun);
    }
    parWin.Ev.pubFun.changeSave();
  }
};
DF.pub.AddOp = {
  hides: function(o, da, opArray) { //添加隐藏和显示操作按钮
    var sb = "",
      hb = "",
      hides = "",
      shows = "";
    da.h == 1 ? sb = 'style="display:none;"' : hb = 'style="display:none;"';
    hides = $('<small title ="' + DF.edit.pub.hides.text + '" class="' + DF.edit.pub.hides.cName + '" ' + sb + '>' + DF.edit.pub.hides.text + '</small>');
    shows = $('<small title ="' + DF.edit.pub.shows.text + '" class="' + DF.edit.pub.shows.cName + '" ' + hb + '>' + DF.edit.pub.shows.text + '</small>');
    hides.click(function() {
      DF.edit.pub.hides.fn(o);
      DF.f.addShade(o, 'hideShade');
      $(this).hide();
      shows.show();
      da.h = 1;
      da.c = 1;
      DF.f.changeAttr(o, "data-attr", DF.f.j_s(da));
      parWin.Ev.pubFun.changeSave();
    });
    shows.click(function() {
      DF.edit.pub.shows.fn(o);
      DF.f.removeShade(o, 'hideShade');
      $(this).hide();
      hides.show();
      da.h = 0;
      da.c = 1;
      DF.f.changeAttr(o, "data-attr", DF.f.j_s(da));
      parWin.Ev.pubFun.changeSave();
    });
    opArray.push(hides);
    opArray.push(shows);
  },
  delSysMo: function(o, da, opArray, Tedit) {
    var del = $('<small title="' + Tedit.del.title + '" class="' + Tedit.del.cName + '">' + Tedit.del.text + '</small>');
    del.click(function() {
      DF.pub.Fun.delSysMo(o, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.push(del);
  }
};
/****************关于页面全局自由定位模块对象和方法及参数**********************/
DF.abs = {
  menter : function(o){
    var oId = o.attr("id"),
      da = DF.f.s_j(o.attr("data-attr")),
      das = DF.f.s_j(o.attr("data-s")),
      opObj = DF.abs.addOp(o, oId, da);
    DF.f.addXL(o);
    o.find(".moveBtn").show(0);
    if(!o.data('move')){
      o.draggable({
        cursor: "move",
        // handle: '.moveBtn',
        containment: "body",
        distance: 1,
        scroll: false,
        start : function(){
          o.data('ozindex',o.css('z-index')).css('z-index',1000);
        },
        stop: function() {
          das.l = o.position().left;
          das.t = o.position().top;
          var das_ = DF.f.j_s(das);
          o.attr('data-s',das_).data('s',das_);
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          o.css('z-index',o.data('ozindex'));
          parWin.Ev.pubFun.changeSave();
        }
      });
      o.data('move',1);
    }
  },
  mleave : function(o){
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
    DF.f.removeShade(o, "moveShade");
    o.find(".moveBtn").hide(0);
  },
  // 浮动模块添加操作按钮
  addOp : function(o, oId, da) {
    var opArray = [],opObj,
      /*upLayer = DF.f.packEdit(DF.edit.abs.upLayer),
       downLayer = DF.f.packEdit(DF.edit.abs.downLayer),*/
      typeEdit = DF.f.packEdit(DF.edit.abs.typeEdit),
      contentEdit = DF.f.packEdit(DF.edit.abs.contentEdit),
      deletes = DF.f.packEdit(DF.edit.abs.deletes);
    opArray.push(typeEdit, contentEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.abs[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small');
    return opObj;
  }
};
/****************关于顶部top对象和方法及参数**********************/
DF.top = {
  menter : function(o) { // 顶部鼠标经过函数
    var oId = o.attr("id"),
      da = DF.f.s_j(o.data("attr")),
      opObj = DF.top.addOp(o, oId, da);
    DF.f.addXL(o);
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.contentEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  mleave : function(o) { // 顶部鼠标离开函数
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
  },
  addOp : function(o, oId, da) {
    var opArray = [],opObj,oleft = o.width() > 960 ? (o.width() - 960) / 2 : 0,
      typeEdit = DF.f.packEdit(DF.edit.top.typeEdit),
      contentEdit = DF.f.packEdit(DF.edit.top.contentEdit),
      deletes = DF.f.packEdit(DF.edit.top.deletes);
    opArray.push(typeEdit, contentEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.top[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small').css({"left": oleft + "px"});
    return opObj;
  }
};
/****************关于头部header对象和方法及参数**********************/
DF.header = {
  menter : function(o) {
    var oId = o.attr("id"),
      da = DF.f.s_j(o.data("attr")),
      opObj = DF.header.addOp(o, oId, da);
    DF.f.addXL(o);
  },
  mleave : function(o) {
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
  },
  addOp : function(o, oId, da) {
    var opArray = [],opObj,oleft = o.width() > DF.config.defWebWidth[0] ? (o.width() - DF.config.defWebWidth[0]) / 2 - 65 : 0,
      typeEdit = DF.f.packEdit(DF.edit.header.typeEdit),
      deletes = DF.f.packEdit(DF.edit.header.deletes);
    opArray.push(typeEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.header[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small').css({"left": oleft + "px"});
    return opObj;
  }
};
/****************关于logo对象和方法及参数**********************/
DF.logo = {
  autoFun : function(o) {
    DF.f.addXL(o);
    DF.f.addShade(o, "moveShade");
  },
  menter : function(o, e) {
    var oId = o.attr('id'),
      da = DF.f.s_j(o.attr("data-attr")),
      das = DF.f.s_j(o.attr("data-s")),
      opObj = DF.logo.addOp(o, oId, da);
    o.find(".moveBtn").show(0);
    // 拖拽函数
    if(!o.data('uiDraggable')){
      o.draggable({
        cursor: "move",
        containment: "body",
        scroll: false,
        stop: function() {
          DF.f.dragStopFn(o);
          das.l = o.offset().left;
          das.t = o.offset().top;
          var das_ = DF.f.j_s(das);
          o.attr('data-s',das_).data('s',das_);
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          parWin.Ev.pubFun.changeSave();
        }
      });
    }
    // 改变大小函数
    if(!o.data('uiResizable')){
      console.log(o.resizable())
      o.resizable({
        animateDuration: "fast",
        autoHide: true,
        maxWidth: DF.config.webWidth[0],
        maxHeight: 300,
        minWidth: 110,
        minHeight: 50,
        grid: 1,
        stop: function() {
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          parWin.Ev.pubFun.changeSave();
          o.trigger("mouseleave");
        }
      });
    }
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.contentEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  // logo鼠标离开事件
  mleave : function(o) {
    DF.f.removeEdit(o, '.operateEdit');
    o.find(".moveBtn").hide(0);
  },
  // logo添加操作句柄
  addOp : function(o, oId, da) {
    var opArray = [],opObj,
      contentEdit = DF.f.packEdit(DF.edit.logo.contentEdit),
      deletes = DF.f.packEdit(DF.edit.logo.deletes);
    opArray.push(contentEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.logo[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small');
    return opObj;
  }
};
/****************关于search对象和方法及参数**********************/
DF.searchs = {
  // 搜索框鼠标经过
  menter : function(o) {
    var oId = o.attr("id"),
      da = DF.f.s_j(o.attr("data-attr")),
      das = DF.f.s_j(o.attr("data-s")),
      opObj = DF.searchs.addOp(o, oId, da);
    DF.f.addXL(o);
    DF.f.addShade(o, "moveShade");
    o.find(".moveBtn").show(0);
    //拖拽函数
    if(!o.data('uiDraggable')){
      o.draggable({
        cursor: "move",
        containment: "body",
        distance: 1,
        scroll: false,
        stop: function() {
          DF.f.dragStopFn(o);
          das.l = o.offset().left;
          das.t = o.offset().top;
          var das_ = DF.f.j_s(das);
          o.attr('data-s',das_).data('s',das_);
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          parWin.Ev.pubFun.changeSave();
        }
      });
    }
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.keywordEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  // 搜索框鼠标离开事件
  mleave : function(o) {
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
    DF.f.removeShade(o, "moveShade");
    o.find(".moveBtn").hide(0);
  },
  // 搜索框添加操作句柄
  addOp : function(o, oId, da) {
    var opArray = [],opObj,
      typeEdit = DF.f.packEdit(DF.edit.searchs.typeEdit),
      keywordEdit = DF.f.packEdit(DF.edit.searchs.keywordEdit),
      deletes = DF.f.packEdit(DF.edit.searchs.deletes);
    opArray.push(typeEdit, keywordEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.searchs[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small');
    return opObj;
  }
};
/****************关于shopcar对象和方法及参数**********************/
DF.shopCar = {
  // 购物车鼠标经过函数
  menter : function(o) {
    var oId = o.attr("id"),
      da = DF.f.s_j(o.attr("data-attr")),
      das = DF.f.s_j(o.attr("data-s")),
      opObj = DF.shopCar.addOp(o, oId, da);
    DF.f.addXL(o);
    DF.f.addShade(o, "moveShade");
    o.find(".moveBtn").show(0);
    //拖动函数
    if(!o.data('uiDraggable')){
      o.draggable({
        cursor: "move",
        containment: "body",
        scroll: false,
        stop: function() {
          DF.f.dragStopFn(o);
          das.l = o.offset().left;
          das.t = o.offset().top;
          var das_ = DF.f.j_s(das);
          o.attr('data-s',das_).data('s',das_);
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          parWin.Ev.pubFun.changeSave();
        }
      });
    }
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.typeEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  // 购物车鼠标离开函数
  mleave : function(o) {
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
    DF.f.removeShade(o, "moveShade");
    o.find(".moveBtn").hide(0);
  },
  // 购物车添加操作句柄
  addOp : function(o, oId, da) {
    var opArray = [],opObj,
      typeEdit = DF.f.packEdit(DF.edit.shopCar.typeEdit),
      deletes = DF.f.packEdit(DF.edit.shopCar.deletes);
    opArray.push(typeEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.shopCar[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small');
    return opObj;
  }
};
/****************关于导航对象和方法及参数**********************/
DF.nav = {
  // 导航鼠标经过函数
  menter : function(o) {
    var oId = o.attr("id"),
      nId = "nav",
      navObj = o.find("#nav"),
      // nInnerObj = o.find('div.NCenter'),
      da = DF.f.s_j(o.attr("data-attr")),
      das = DF.f.s_j(o.attr("data-s")),
      dal = DF.f.s_j(o.attr("data-l")),
      opObj = DF.nav.addOp(o, oId, da);
    DF.f.addXL(navObj);
    if (dal.p == 1 || dal.p == 3) {
      o.draggable({
        cursor: "move",
        containment: "body",
        scroll: false,
        handle: '.moveBtn',
        stop: function() {
          DF.f.dragStopFn(o);
          var hcL = Math.floor(($("body").width() - userSiteWidth) / 2);
          dal.l = o.offset().left - hcL;
          dal.t = o.offset().top;
          var dal_ = DF.f.j_s(dal);
          o.attr('data-l',dal_).data('s',dal_);
          if (da.c != 1) {
            da.c = 1;
            var da_ = DF.f.j_s(da);
            o.attr('data-attr',da_).data('attr',da_);
          }
          parWin.Ev.pubFun.changeSave();
        }
      });
    }
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.columnAdmin').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  // 导航鼠标经过函数
  mleave : function(o) {
    var navObj = o.find("div.nav");
    DF.f.delXL(navObj);
    DF.f.removeEdit(o.find("div.NCenter"), '.operateEdit');
  },
  // 导航添加操作按钮函数
  addOp : function(o, oId, da) {
    var opArray = [],opObj,
      navObj = o.find("div.NCenter"),
      typeEdit = DF.f.packEdit(DF.edit.nav.typeEdit),
      deletes = DF.f.packEdit(DF.edit.nav.deletes);
    opArray.push(typeEdit);
    if (parWin.Ev.pubVar.adminColumn) {
      var createColumn = DF.f.packEdit(DF.edit.nav.createColumn),
        columnAdmin = DF.f.packEdit(DF.edit.nav.columnAdmin);
      opArray.push(createColumn, columnAdmin);
    }
    if (parWin.Ev.pubVar.adminUpcon) {
      var columnEdit = DF.f.packEdit(DF.edit.nav.columnEdit);
      opArray.push(columnEdit);
    }
    if (parWin.Ev.pubVar.adminUpcon) {
      var columnStyle = DF.f.packEdit(DF.edit.nav.columnStyle);
      opArray.push(columnStyle);
    }
    opArray.push(deletes);
    opObj = DF.f.addEdit(navObj, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.nav[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
        return false;
      }
    },'small');
    return opObj;
  },
  //设置后可以显示的导航数
  itemSum : function() {
    var NMain = DF.o.n.find("dl.NMain"),
      NCenter = DF.o.n.find("div.NCenter"),
      NMainW = NMain.width(),
      NMainH = NMain.height(),
      fitemW = NMain.find("dd.NItem:eq(1)").children(".NItemTable").width(),
      fitemH = NMain.find("dd.NItem:eq(1)").children(".NItemTable").height(),
      line = NMain.children(".NLine"),
      lineW = line.width(),
      rowN = 1;
    if (!lineW || line.css('display') == 'none') {
      lineW = 0;
    }
    rowN = Math.floor(NMainH / fitemH) == 0 ? 1 : Math.floor(NMainH / fitemH);
    DF.config.navItemSum = (Math.floor((NMainW + lineW) / (fitemW + lineW))) * rowN;
    return DF.config.navItemSum;
  }
};
/****************关于banner对象和方法及参数**********************/
DF.banner = {
  // banner图的鼠标经过函数
  menter : function(o) {
    var oId = o.attr("id"),
      da = DF.f.s_j(o.attr("data-attr")),
      opObj = DF.banner.addOp(o, oId, da);
    DF.f.addXL(o);
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.contentEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  // banner图的鼠标离开函数
  mleave : function(o) {
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
  },
  // banner图的鼠标添加操作按钮函数
  addOp : function(o, oId, da) {
    var opArray = [],opObj,oleft = o.width() > 960 ? (o.width() - 960) / 2 : 0,
      typeEdit = $('<small data-id="' + DF.edit.banner.typeEdit.cName + '" title="' + DF.edit.banner.typeEdit.text + '" class="' + DF.edit.banner.typeEdit.cName + '">' + DF.edit.banner.typeEdit.text + '</small>'),
      contentEdit = $('<small data-id="' + DF.edit.banner.contentEdit.cName + '" title="' + DF.edit.banner.contentEdit.text + '" class="' + DF.edit.banner.contentEdit.cName + '">' + DF.edit.banner.contentEdit.text + '</small>'),
      deletes = $('<small data-id="' + DF.edit.banner.deletes.cName + '" title="' + DF.edit.banner.deletes.text + '" class="' + DF.edit.banner.deletes.cName + '">' + DF.edit.banner.deletes.text + '</small>');
    opArray.push(typeEdit, contentEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.banner[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small').css({"left": oleft + "px"});
    return opObj;
  }
};
/****************关于底部foot的对象和方法及参数**********************/
DF.foot = {
  //底部鼠标经过调用函数
  menter : function(o) {
    var oId = o.attr("id"),
      da = DF.f.s_j(o.data("attr")),
      opObj = DF.foot.addOp(o, oId, da);
    DF.f.addXL(o);
    if (!o.data('dblclick')) {
      o.on({
        dblclick: function() {
          opObj.find('.contentEdit').trigger('click');
          return false;
        }
      });
      o.data('dblclick', 1);
    }
  },
  //底部鼠标离开调用函数
  mleave : function(o) {
    DF.f.delXL(o);
    DF.f.removeEdit(o, '.operateEdit');
  },
  //底部添加操作按钮
  addOp : function(o, oId, da) {
    var opArray = [],opObj,oleft = o.width() > 960 ? (o.width() - 960) / 2 : 0,
      typeEdit = $('<small data-id="' + DF.edit.foot.typeEdit.cName + '" title="' + DF.edit.foot.typeEdit.text + '" class="' + DF.edit.foot.typeEdit.cName + '">' + DF.edit.foot.typeEdit.text + '</small>'),
      contentEdit = $('<small data-id="' + DF.edit.foot.contentEdit.cName + '" title="' + DF.edit.foot.contentEdit.text + '" class="' + DF.edit.foot.contentEdit.cName + '">' + DF.edit.foot.contentEdit.text + '</small>'),
      deletes = $('<small data-id="' + DF.edit.foot.deletes.cName + '" title="' + DF.edit.foot.deletes.text + '" class="' + DF.edit.foot.deletes.cName + '">' + DF.edit.foot.deletes.text + '</small>');
    opArray.push(typeEdit, contentEdit, deletes);
    opObj = DF.f.addEdit(o, opArray, 'operateEdit');
    opObj.on({
      click : function(){
        DF.edit.foot[$(this).data('id')].fn(o, oId, da);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      }
    },'small').css({"left": oleft + "px"});
    return opObj;
  }
};
/****************关于网站模块宽度计算预览的函数**********************/
DF.websiteWidth = function(v) {
  var owebWidth = DF.config.webWidth[0],
    nwebWidth = v * 1,
    addw = nwebWidth - owebWidth;
  DF.config.webWidth[0] = v;
  DF.webGuides();
  var leng = DF.config.webWidth.length;
  for (var i = 1; i < leng; i++) {
    DF.config.webWidth[i] += (addw / i);
  }
  $("#wrapper").attr("class", "wrapper wrapper-" + v);
  DF.o.c.find(".customModuleRow").each(function() {
    var row = $(this),
      da = DF.f.s_j(row.data("attr")),
      adw;
    if (da.l != 11) {
      switch (da.l) {
        case 1: case 9: case 20:
        adw = addw;
        break;
        case 2: case 5: case 6: case 7: case 8: case 12: case 13: case 14: case 15: case 21: case 22: case 23: case 31:
        adw = addw / 2;
        break;
        case 3: case 28:
        adw = addw / 3;
        break;
        case 4: case 29:
        adw = addw / 4;
        break;
        case 16: case 30:
        adw = addw / 5;
        break;
      }
      if (da.l == 5 || da.l == 6 || da.l == 12 || da.l == 13 || da.l == 14 || da.l == 15) {
        row.find("div.CModulePRLeft").each(function() {
          var cl = $(this),
            clw = cl.width();
          cl.width(clw + adw);
        });
      }
      if (da.l == 21 || da.l == 22 || da.l == 23 || da.l == 28 || da.l == 29 || da.l == 30 || da.l == 31) {
        row.find("div.CModulePCLeft").each(function() {
          var cl = $(this),
            clw = cl.width(),
            addBtn = cl.find('.addMoBut'),
            btndata = DF.f.s_j(addBtn.attr("data-attr"));
          cl.width(clw + adw);
          btndata.w = btndata.w + adw;
          addBtn.attr('data-attr', DF.f.j_s(btndata));
        })
      }
      row.find('div.customModule').each(function() {
        var c = $(this),
          m = $(this).find("div.Mo"),
          b = $(this).find("div.MoBodyC"),
          cw = c.width(),
          mw = m.width(),
          bw = b.width();
        c.width(cw + adw);
        m.width(mw + adw);
        b.width(bw + adw);
      });
    }
  });
  return true;
};
/****************关于模块行的对象、属性和方法**********************/
DF.row = {};
/*添加通栏行对象*/
DF.row.addRowDom = function(row, tagObj) {
  var tagObj_ = false;
  if (tagObj == 'l') {
    tagObj_ = DF.o.c;
    if (tagObj_.children(".customModuleRow").last().length) {
      var rlast = tagObj_.children(".customModuleRow").last(),
        lastData = DF.f.s_j(rlast.attr("data-attr"));
      if (lastData.l == 9) {
        rlast.before(row);
      } else {
        tagObj_.append(row);
      }
    } else {
      tagObj_.append(row);
    }
  } else if (tagObj == 'f') {
    tagObj_ = DF.o.c;
    tagObj_.prepend(row);
  } else {
    tagObj_ = DF.o.c.find("#" + tagObj);
    tagObj_.after(row);
  }
  row.css({
    display: 'none'
  });
  row.fadeIn(1500, function() {
    row.addClass('shakeDom');
    setTimeout(function() {
      row.removeClass('shakeDom');
    }, 500);
  });
  parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
};
/*添加抽屉菜单更多对象*/
DF.row.addMenuCatalogMoreDom = function(menus) {
  $("#menuCatalogMoreModule").append(menus);
};
//添加行函数
DF.row.addRow = function(id, tarObj) {
  var l = id,
    row = "",
    rowInner = $('<div class="customModuleRowInner"></div>'),
    ma = DF.row.j['l_' + id](),
    rowW = "";
  if (l < 20 && l != 11) {
    rowW = $('<div class="CModulePR"></div>');
  } else if (l == 11) {
    rowW = $('<div class="TitleModule"></div>');
  } else if (l > 19) {
    rowW = $('<div class="CModulePC"></div>');
  }
  row = $('<div class="customModuleRow" id=row_' + (++DF.config.maxRow) + ' data-attr="l:' + l + ',h:0,c:1,d:1"></div>');
  rowW.append(ma);
  rowInner.append(rowW);
  row.append(rowInner);
  DF.row.addRowDom(row, tarObj);
  if (l != 11) {
    row.find(".Mo").each(function() {
      DF.mo.resize.sMo($(this));
    });
  }
};
/*添加有内容的行*/
DF.row.addConRow = function(idN, tarObj, uId, aw) {
  var zuz = function(j, tarObj) {
    var rj_ = j;
    for (var x in rj_) {
      switch (x) {
        case 'Rstyle':
          for (var r in rj_[x]) {
            var r_ = 'row_' + r;
            if (!sCssJson[x][r_]) {
              sCssJson[x][r_] = rj_[x][r];
            }
          }
          break;
        case 'Mstyle':
          for (m in rj_[x]) {
            var m_ = 'Mo_' + m;
            if (!sCssJson[x][m_]) {
              sCssJson[x][m_] = rj_[x][m];
            }
          }
          break;
        case 'copyMstyle':
          var s_copyMstyle = $('#copyMstyle'),
            s_copy_s = "",
            ns_copy_s = "";
          if (s_copyMstyle.length) {
            s_copy_s = s_copyMstyle.html();
            s_copyMstyle.remove();
          }
          for (var cn in rj_.copyMstyleName) {
            if ($("." + cn).length == 0) {
              for (var cm in rj_[x]) {
                ns_copy_s += rj_[x][cm];
              }
            }
          }
          s_copy_s = s_copy_s + ns_copy_s;
          $("head").append("<style type='text/css' id='copyMstyle'>" + s_copy_s + "</style>");
          break;
      }
    }
    for (var x in sCssJson) {
      DF.f.writeStyle(x);
    }
    var row = $(rj_.html);
    if (rj_.typeOtherHtml) {
      var menuCatalogMore = $(rj_.typeOtherHtml);
      DF.row.addMenuCatalogMoreDom(menuCatalogMore);
    }
    DF.row.addRowDom(row, tarObj);
    DF.config.maxRow = rj_.RMaxVal;
    DF.config.maxMo = rj_.MMaxVal;
    // if (id != 11) {
    row.find(".Mo").each(function() {
      DF.mo.resize.sMo($(this));
    });
    // }
    parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
    parWin.Ev.pubFun.alertWindow('添加成功！', 'right');
  }
  var ajaxFun = function() {
    var rmx = DF.config.maxRow,
      mmx = DF.config.maxMo,
      defer = $.Deferred(),
      url = "",
      timestamp = Date.parse(new Date()),
      lyCopyid = $('body').data('copyid');

    if (!uId) {
      url = '/self_define/AjaxLayout.php?copyid=' + lyCopyid + '&t=' + timestamp + '&username=' + user_name + '&r_id=' + idN + '&r_max_id=' + rmx + '&m_max_id=' + mmx;
    } else {
      url = '/self_define/AjaxLayout.php?copyid=' + lyCopyid + '&t=' + timestamp + '&username=' + user_name + '&r_id=' + idN + '&copy_userid=' + uId + '&r_max_id=' + rmx + '&m_max_id=' + mmx;
    }
    $.ajax({
      'url': url,
      type: "POST",
      async: false,
      cache: false,
      dataType: "json",
      error: function() {
        // alert('网络繁忙！');
        parWin.Ev.pubFun.alertWindow('网络繁忙！', 'warn');
        parWin.$.popupClose(aw);
      },
      success: function(data) {
        defer.resolve(data);
      }
    });
    return defer.promise();
  };
  setTimeout(function() {
    $.when(ajaxFun()).done(function(data) {
      if (data.err > 0) {
        parWin.Ev.pubFun.alertWindow('参数有误！', 'error');
        parWin.$.popupClose(aw);
      } else {
        zuz(data, tarObj);
        parWin.Ev.pubFun.changeSave();
        parWin.$.popupClose(aw);
      }
    });
  }, 0);
};
//页面行排序函数
DF.row.sorts = function(o) {
  var op = o.parent(),
    move = o.find('.rowOperate .move');
  op.sortable({
    opacity: "0.6",
    axis: "y",
    containment: "parent",
    tolerance: "pointer",
    cursro: "move",
    revert: "true",
    handle: '.rowMove',
    appendTo: "parent",
    start: function(event, ui) {
      ui.helper.css({
        'left': ui.helper.data('left') + 'px'
      });
    },
    stop: function(ui) {
      $(this).find(".customModuleRow").trigger("mouseleave");
      parWin.Ev.pubFun.changeSave();
    }
  });
};
//行鼠标经过调用的函数
DF.row.menter = function(obj) {
  var oi = obj,
    o = oi.parent('.customModuleRow'),
    indexs = o.index();
  o.css("z-index", 10);
  o.data({
    mHover: 1
  });
  o.siblings(".customModuleRow").each(function() {
    if ($(this).data("mHover") == 1) {
      $(this).trigger("mouseleave");
    }
  });
  DF.row.addOp(o);
  DF.f.addXL(o);
};
//鼠标离开行调用的函数
DF.row.mleave = function(obj) {
  var oi = obj,
    o = oi.parent('.customModuleRow');
  o.css("z-index", ''),
    indexs = o.index();
  o.removeData("mHover");
  DF.f.removeEdit(o.children('div.customModuleRowInner'), ".rowOperate");
  DF.f.delXL(o);
};
//鼠标经过行添加操作句柄函数
DF.row.addOp = function(o) {
  var oId = o.attr("id"),
    da = DF.f.s_j(o.attr("data-attr")),
    ls = DF.config.rowNum,
    indexs = o.index() + 1,
    opArray = [],opObj;
  //是否可以设置行版式
  if (da.s == 1) {
    var typeLayout = DF.f.packEdit(DF.edit.row.typeLayout);
    opArray.push(typeLayout);
  }
  //是否有向下移动
  if (indexs != ls) {
    var downMove = DF.f.packEdit(DF.edit.row.downMove);
    opArray.push(downMove);
  }
  //是否有向上移动
  if (indexs != 1) {
    var upMove = DF.f.packEdit(DF.edit.row.upMove);
    opArray.push(upMove);
  }
  //是否出现拖动移动句柄
  if (ls != 1) {
    var rowMove = DF.f.packEdit(DF.edit.row.rowMove);
    opArray.push(rowMove);
  }
  var styleEdit = DF.f.packEdit(DF.edit.row.styleEdit);
  opArray.push(styleEdit);
  //是否添加隐藏显示功能
  if (da.h != undefined) {
    DF.pub.AddOp.hides(o, da, opArray);
  }
  //是否添加拷贝功能
  if (da.sys != 1) {
    var rowCopy = DF.f.packEdit(DF.edit.row.rowCopy);
    opArray.push(rowCopy);
  }
  //是否可向下添加通栏模块
  var rowNextAdd = DF.f.packEdit(DF.edit.row.rowNextAdd);
  opArray.push(rowNextAdd);
  //添加删除行功能
  if (da.d) {
    var rowDelete = DF.f.packEdit(DF.edit.row.rowDelete);
    opArray.push(rowDelete);
  }
  //给行添加模块
  if (da.l == 60) {
    var rowAddMo = DF.f.packEdit(DF.edit.row.rowAddMo);
    opArray.unshift(rowAddMo);
  }
  opObj = DF.f.addEdit(o.children('div.customModuleRowInner'), opArray, 'rowOperate');
  indexs == 1 ? opObj.addClass('rowOperate-right') : '';
  opObj.on({
    click : function(){
      DF.edit.row[$(this).data('id')].fn(o, oId, da);
      /*setTimeout(function() {
       o.trigger("mouseleave");
       }, 500);*/
    }
  },'small').css({top: -parseInt(o.css('padding-top'))});
};
//行布局json组，可以在此添加版式。
DF.row.j = {
  l_1: function() {
    var cz = DF.config.webWidth[1];
    return DF.mo.add(1, 960 + cz, 311, 'Mo');
  },
  l_2: function() {
    var cz = DF.config.webWidth[2];
    return DF.mo.add(2, 475 + cz, 311, 'Mo');
  },
  l_3: function() {
    var cz = DF.config.webWidth[3],
      tc1 = DF.mo.add(1, 314 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(2, 313 + cz, 311, 'Mo');
    return tc1 + tc2;
  },
  l_4: function() {
    var cz = DF.config.webWidth[4],
      tc1 = DF.mo.add(3, 233 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 231 + cz, 311, 'Mo');
    return tc1 + tc2;
  },
  l_5: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(2, 475 + cz, 150, 'Mo'),
      tc2 = DF.mo.add(1, 475 + cz, 311, 'Mo'),
      RLW = 485 + cz;
    return '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc1 + '</div>' + tc2;
  },
  l_6: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(1, 475 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(2, 475 + cz, 150, 'Mo'),
      RLW = 485 + cz;
    return tc1 + '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc2 + '</div>';
  },
  l_7: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(1, 636 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 314 + cz, 311, 'Mo');
    return tc1 + tc2;
  },
  l_8: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(1, 314 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 636 + cz, 311, 'Mo');
    return tc1 + tc2;
  },
  l_9: function() {},
  l_10: function() {},
  l_11: function() {
    return DF.mo.add(1, 960, 45, 'Mh');
  },
  l_12: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(3, 475 + cz, 150, 'Mo'),
      tc2 = DF.mo.add(1, 475 + cz, 470, 'Mo'),
      RLW = 485 + cz;
    return '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc1 + '</div>' + tc2;
  },
  l_13: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(1, 475 + cz, 470, 'Mo'),
      tc2 = DF.mo.add(3, 475 + cz, 150, 'Mo'),
      RLW = 485 + cz;
    return tc1 + '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc2 + '</div>';
  },
  l_14: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(2, 475 + cz, 230, 'Mo'),
      tc2 = DF.mo.add(3, 475 + cz, 150, 'Mo'),
      RLW = 485 + cz;
    return '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc1 + '</div><div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc2 + '</div>';
  },
  l_15: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(3, 475 + cz, 150, 'Mo'),
      tc2 = DF.mo.add(2, 475 + cz, 230, 'Mo'),
      RLW = 485 + cz;
    return '<div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc1 + '</div><div class="CModulePRLeft" style="width:' + RLW + 'px;">' + tc2 + '</div>';
  },
  l_16: function() {
    var cz = DF.config.webWidth[5];
    return DF.mo.add(5, 184 + cz, 311, 'Mo');
  },
  l_20: function() {
    var cz = DF.config.webWidth[1],
      abut = '<a class="addMoBut" href="javascript:;"  data-attr="w:' + (960 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 960 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft PCLeft">' + tc1 + abut + '</div>';
  },
  l_21: function() {
    var cz = DF.config.webWidth[2],
      abut1 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (240 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      abut2 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (710 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 240 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 710 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft PCLeft" style="width:' + (250 + cz) + 'px;">' + tc1 + abut1 + '</div><div class="CModulePCLeft PCRight" style="width:' + (720 + cz) + 'px;">' + tc2 + abut2 + '</div>';
  },
  l_22: function() {
    var cz = DF.config.webWidth[2],
      abut1 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (710 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      abut2 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (240 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 710 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 240 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft PCLeft" style="width:' + (720 + cz) + 'px;">' + tc1 + abut1 + '</div><div class="CModulePCLeft PCRight" style="width:' + (250 + cz) + 'px;">' + tc2 + abut2 + '</div>';
  },
  l_23: function() {
    var cz = DF.config.webWidth[2],
      abut = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (475 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 475 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 475 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft PCLeft" style="width:' + (485 + cz) + 'px;">' + tc2 + abut + '</div><div class="CModulePCLeft PCRight" style="width:' + (485 + cz) + 'px;">' + tc1 + abut + '</div>';
  },
  l_28: function() {
    var cz = DF.config.webWidth[3],
      abut1 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (314 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      abut2 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (313 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 314 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 313 + cz, 311, 'Mo');
    tc3 = DF.mo.add(1, 313 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft CModulePCLeft-1" style="width:' + (324 + cz) + 'px;">' + tc1 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-2" style="width:' + (323 + cz) + 'px;">' + tc2 + abut2 + '</div><div class="CModulePCLeft CModulePCLeft-3" style="width:' + (323 + cz) + 'px;">' + tc3 + abut2 + '</div>';
  },
  l_29: function() {
    var cz = DF.config.webWidth[4],
      abut1 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (233 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      abut2 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (231 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 233 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 233 + cz, 311, 'Mo');
    tc3 = DF.mo.add(1, 233 + cz, 311, 'Mo');
    tc4 = DF.mo.add(1, 231 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft CModulePCLeft-1" style="width:' + (243 + cz) + 'px;">' + tc1 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-2" style="width:' + (243 + cz) + 'px;">' + tc2 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-3" style="width:' + (243 + cz) + 'px;">' + tc3 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-4" style="width:' + (241 + cz) + 'px;">' + tc4 + abut2 + '</div>';
  },
  l_30: function() {
    var cz = DF.config.webWidth[5],
      abut1 = '<a class="addMoBut" href="javascript:;" data-attr="w:' + (184 + cz) + ',h:311" title="添加模块">+添加模块</a>',
      tc1 = DF.mo.add(1, 184 + cz, 311, 'Mo'),
      tc2 = DF.mo.add(1, 184 + cz, 311, 'Mo'),
      tc3 = DF.mo.add(1, 184 + cz, 311, 'Mo'),
      tc4 = DF.mo.add(1, 184 + cz, 311, 'Mo'),
      tc5 = DF.mo.add(1, 184 + cz, 311, 'Mo');
    return '<div class="CModulePCLeft CModulePCLeft-1" style="width:' + (194 + cz) + 'px;">' + tc1 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-2" style="width:' + (194 + cz) + 'px;">' + tc2 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-3" style="width:' + (194 + cz) + 'px;">' + tc3 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-4" style="width:' + (194 + cz) + 'px;">' + tc4 + abut1 + '</div><div class="CModulePCLeft CModulePCLeft-5" style="width:' + (194 + cz) + 'px;">' + tc5 + abut1 + '</div>';
  },
  l_60: function() {
    var cz = DF.config.webWidth[2],
      tc1 = DF.mo.add(1, 475 + cz, 311, 'Mo');
    return '<div class="CModulePA" style="height:321px;">' + tc1 + '</div>';
  }
};
/****************关于模块的对象功能**********************/
//模块操作对象
DF.mo = {}
//添加模块操作
DF.mo.add = function(n, w, h, o, t, c, cs, mt) {
  var r_c = '',
    t = t ? t : "模块标题名",
    c = c ? c : '<div class="setMoConBut">设计模块内容</div>',
    ct = ct ? ct : 1,
    mcn = parWin.Ev.admin.tj.v.mStyle ? parWin.Ev.admin.tj.v.mStyle : "",
    mhcn = '',
    mt = mt ? mt : "0";
  for (var i = 1; i <= n; i++) {
    var d = ++DF.config.maxMo;
    if (o == 'Mh') {
      r_c += DF.mo.j[o](d, t, mhcn);
    } else {
      r_c += DF.mo.j[o](d, w, h, t, c, mcn, mt);
    }
  }
  return r_c;
};
//删除模块操作
DF.mo.del = function(o) {
  DF.f.delfn(o);
};
//行布局json组,可以再次添加模块板式
DF.mo.j = {
  Mh: function(d, t, cn) {
    if (cn) var cn = " " + cn;
    return '<div class="customModule" data-attr="mt:18,c:1,n:1"><div id="Mo_' + d + '" class="Mo' + cn + '"><table class="MoT"><tr><td class="MoTL"></td><td class="MoTM"></td><td class="MoTR"></td></tr></table><table class="MoHead"><tr><td class="MoHeadL"></td><td class="MoHeadM" valign="top"><table class="MoName"><tr><td class="MoNameL" valign="top"></td><td class="MoNameM" valign="top"><strong class="NameTxt"><a href="#">' + t + '</a></strong></td><td class="MoNameR" valign="top"></td></tr></table><span class="MoMore"><a href="#">更多</a></span></td><td class="MoHeadR"></td></tr></table><table class="MoB"><tr><td class="MoBL"></td><td class="MoBM"></td><td class="MoBR"></td></tr></table></div></div>';
  },
  Mo: function(d, w, h, t, c, cn, mt) {
    if (cn) var cn = " " + cn;
    return '<div class="customModule" style="width:' + w + 'px; height:' + h + 'px;" data-attr="mt:' + mt + ',c:1,n:1,cid:0,sysn:0,sys:0,cuserid:0"><div id="Mo_' + d + '" class="Mo' + cn + '" style="width:' + (w - 2) + 'px; height:' + (h - 2) + 'px"><table class="MoT"><tr><td class="MoTL"></td><td class="MoTM"></td><td class="MoTR"></td></tr></table><table class="MoHead"><tr><td class="MoHeadL"></td><td class="MoHeadM" valign="top"><table class="MoName"><tr><td class="MoNameL" valign="top"></td><td class="MoNameM" valign="top"><strong class="NameTxt"><a href="#">' + t + '</a></strong></td><td class="MoNameR" valign="top"></td></tr></table><span class="MoMore"><a href="#">更多</a></span></td><td class="MoHeadR"></td></tr></table><table class="MoBody"><tr><td class="MoBodyL"></td><td class="MoBodyM" valign="top"><div class="MoBodyC" style="height:' + (h - 47) + 'px; width:' + (w - 12) + 'px">' + c + '</div></td><td class="MoBodyR"></td></tr></table><table class="MoB"><tr><td class="MoBL"></td><td class="MoBM"></td><td class="MoBR"></td></tr></table></div></div>'
  }
};
/*******关于模块大小改变的一些方法和参数**********/
/*--拖动模块改变大小--*/
DF.mo.resize = {
  rn: { //改变时的各参数
    maxW: 960,
    minW: 10,
    cminW: 60,
    minH: 50,
    dir: "s",
    mdir: "l",
    startWidth: 0,
    startHeight: 0,
    stopWidth: 0,
    stopHeight: 0,
    chazhiW: 0,
    chazhiH: 0,
    startX: 0,
    startY: 0,
    resizeX: 0,
    resizeY: 0,
    stopX: 0,
    stopY: 0,
    oLeft: 0,
    oTop: 0,
    guidesX: false,
    guidesY: false,
    showPX: false
  }
};
//模块内部元素宽度计算
DF.mo.resize.sW = function(o, czW) {
  var Mo = o.find(".Mo");
  var MoBodyC = Mo.find(".MoBodyC");
  Mo.width(Mo.width() + czW);
  MoBodyC.width(MoBodyC.width() + czW);
  var da = DF.f.s_j(o.attr("data-attr"));
  if (da.c != 1) {
    da.c = 1;
    DF.f.changeAttr(o, "data-attr", DF.f.j_s(da));
  }
};
//模块内部元素高度计算
DF.mo.resize.sH = function(o, czH) {
  var Mo = o.find(".Mo");
  var MoBodyC = Mo.find(".MoBodyC");
  Mo.height(Mo.height() + czH);
  MoBodyC.height(MoBodyC.height() + czH);
  var da = DF.f.s_j(o.attr("data-attr"));
  if (da.c != 1) {
    da.c = 1;
    DF.f.changeAttr(o, "data-attr", DF.f.j_s(da));
  }
  setTimeout(function() {
    parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
  }, 500);
};
/* --模块内部元素宽高计算--*/
DF.mo.resize.sMo = function(o) {
  var Mo = o,
    curPM = Mo.parent(),
    MoT = Mo.find('table.MoT'),
    MoHead = Mo.find("table.MoHead"),
    MoBody = Mo.find("table.MoBody"),
    MoBodyL = MoBody.find("td.MoBodyL"),
    MoBodyM = MoBody.find("td.MoBodyM"),
    MoBodyR = MoBody.find("td.MoBodyR"),
    MoBodyC = MoBody.find('div.MoBodyC'),
    MoB = Mo.find("table.MoB"),
    defaultW = curPM.width(),
    defaultH = curPM.height();
  setTimeout(function() {
    MoBodyC.css('width', 'auto');
    var MoBorderTW = parseInt(Mo.css('borderTopWidth')),
      MoBorderRW = parseInt(Mo.css('borderRightWidth')),
      MoBorderBW = parseInt(Mo.css('borderBottomWidth')),
      MoBorderLW = parseInt(Mo.css('borderLeftWidth')),
      MoTH = MoT.height(),
      MoHeadH = MoHead.height(),
      MoHeadMarT = parseInt(MoHead.css('marginTop')),
      MoHeadMarB = parseInt(MoHead.css('marginBottom')),
      MoBodyBorderTW = parseInt(MoBody.css('borderTopWidth')),
      MoBodyBorderRW = parseInt(MoBody.css('borderRightWidth')),
      MoBodyBorderBW = parseInt(MoBody.css('borderBottomWidth')),
      MoBodyBorderLW = parseInt(MoBody.css('borderLeftWidth')),
      MoBodyLW = MoBodyL.width(),
      MoBodyRW = MoBodyR.width(),
      MoBodyCMarT = parseInt(MoBodyC.css('marginTop')),
      MoBodyCMarR = parseInt(MoBodyC.css('marginRight')),
      MoBodyCMarB = parseInt(MoBodyC.css('marginBottom')),
      MoBodyCMarL = parseInt(MoBodyC.css('marginLeft')),
      MoBH = MoB.height();
    if (MoT.css('display') == 'none') {
      MoTH = 0;
    }
    if (MoHead.css('display') == 'none') {
      MoHeadH = 0;
      MoHeadMarT = 0;
      MoHeadMarB = 0;
    }
    if (MoBodyL.css('display') == 'none') {
      MoBodyLW = 0;
    }
    if (MoBodyR.css('display') == 'none') {
      MoBodyRW = 0;
    }
    if (MoB.css('display') == 'none') {
      MoBH = 0;
    }
    var MoH = defaultH - MoBorderTW - MoBorderBW;
    var MoW = defaultW - MoBorderRW - MoBorderLW;
    Mo.css({
      'height': MoH + 'px',
      'width': MoW + 'px'
    });
    var MoBodyCH = defaultH - MoBorderTW - MoBorderBW - MoTH - MoHeadH - MoHeadMarT - MoHeadMarB - MoBodyBorderTW - MoBodyBorderBW - MoBodyCMarT - MoBodyCMarB - MoBH;
    var MoBodyCW = defaultW - MoBorderRW - MoBorderLW - MoBodyBorderRW - MoBodyBorderLW - MoBodyRW - MoBodyLW - MoBodyCMarR - MoBodyCMarL;
    // console.log('MoBorderTW:'+MoBorderTW+'\nMoBorderRW:'+MoBorderRW+'\nMoBorderBW:'+MoBorderBW+'\nMoBorderLW:'+MoBorderLW+'\nMoTH:'+MoTH+'\nMoHeadMarT:'+MoHeadMarT+'\nMoHeadH:'+MoHeadH+'\nMoHeadMarB:'+MoHeadMarB+'\nMoBodyBorderTW:'+MoBodyBorderTW+'\nMoBodyBorderRW:'+MoBodyBorderRW+'\nMoBodyBorderBW:'+MoBodyBorderBW+'\nMoBodyBorderLW:'+MoBodyBorderLW+'\nMoBodyRW:'+MoBodyRW+'\nMoBodyLW:'+MoBodyLW+'\nMoBodyCMarT:'+MoBodyCMarT+'\nMoBodyCMarR:'+MoBodyCMarR+'\nMoBodyCMarB:'+MoBodyCMarB+'\nMoBodyCMarL:'+MoBodyCMarL+'\nMoBH:'+MoBH+'\nMoH:'+MoH+'\nMoW:'+MoW+'\nMoBodyCW:'+MoBodyCW+'\noBodyCH:'+MoBodyCH);
    MoBodyC.css({
      'height': MoBodyCH + 'px',
      'width': MoBodyCW + 'px'
    });
  }, 500);
};
//模块参考线函数
DF.mo.resize.guides = function(ex, ey, w, h, pl, pt) {
  if (w != DF.mo.resize.rn.startWidth) {
    var l = 0;
    if (DF.mo.resize.rn.guidesY) {
      $("body").append('<div id="move_guides_y"></div>');
      DF.mo.resize.rn.guidesY = false;
    }
    if (DF.mo.resize.rn.startX > DF.mo.resize.rn.oLeft + 7) {
      l = pl + w - 1;
    } else {
      l = pl + 1;
    }
    $("body").find("#move_guides_y").css({
      left: l + "px",
      height: $("body").height()
    });
  }
  if (h != DF.mo.resize.rn.startHeight) {
    var t = -1;
    if (DF.mo.resize.rn.guidesX) {
      $("body").append('<div id="move_guides_x"></div>');
      DF.mo.resize.rn.guidesX = false;
    }
    t += DF.mo.resize.rn.oTop + h;
    $("body").find("#move_guides_x").css({
      "top": t + "px"
    });
  }
};
//模块参考线移除函数
DF.mo.resize.removeGuides = function(d) {
  if (d == 'y') {
    $("body").find("#move_guides_y").remove();
  }
  if (d == 'x') {
    $("body").find("#move_guides_x").remove();
  }
};
//模块改变大小显示像素函数
DF.mo.resize.showPX = function(ex, ey, w, h, pl, pt) {
  if (DF.mo.resize.rn.showPX) {
    $("body").append('<div id="show_PX"></div>');
    DF.mo.resize.rn.showPX = false;
  }
  var showPX = $("#show_PX"),
    x = y = mh = mw = maw = "";
  w == DF.mo.resize.rn.startWidth || (x = '<p>W：' + w + ' 像素</p>');
  h == DF.mo.resize.rn.startHeight || (y = '<p>H：' + h + ' 像素</p>');
  if (h == DF.mo.resize.rn.minH && w == DF.mo.resize.rn.startWidth || w != DF.mo.resize.rn.startWidth && h != DF.mo.resize.rn.startHeight && h == DF.mo.resize.rn.minH) {
    mh = '<p class="tiship">拖动的最小高度不能小于' + DF.mo.resize.rn.minH + '像素</p>';
  }
  if (w == DF.mo.resize.rn.minW && h == DF.mo.resize.rn.startHeight || w != DF.mo.resize.rn.startWidth && h != DF.mo.resize.rn.startHeight && w == DF.mo.resize.rn.minW) {
    mw = '<p class="tiship">拖动的最小宽度不能小于' + DF.mo.resize.rn.minW + '像素</p>';
  }
  if (w == DF.mo.resize.rn.maxW && h == DF.mo.resize.rn.startHeight || w != DF.mo.resize.rn.startWidth && h != DF.mo.resize.rn.startHeight && w == DF.mo.resize.rn.maxW) {
    maw = '<p class="tiship">拖动的最大宽度不能大于' + DF.mo.resize.rn.maxW + '像素</p>';
  }
  showPX.html(x + y + mh + mw + maw).css({
    'left': (ex + 10) + 'px',
    'top': (ey - 50) + 'px'
  });
};
//模块改变大小移除显示像素函数
DF.mo.resize.removePX = function() {
  $("#show_PX").remove();
};
//给模块添加拖拽句柄
DF.mo.resize.addDir = function(o, pt, da) {
  var cWidth = DF.mo.resize.rn.cminW;
  switch (pt) {
    case 1:
    case 20:
    case 9:
      if (da.sys != 1 || (pt == 9 && da.sys == 1)) {
        DF.mo.resize.rn.dir = "s";
        DF.mo.resize.rn.maxW = DF.config.webWidth[0];
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 21:
    case 22:
    case 23:
    case 31:
      var cz = DF.config.webWidth[2];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent().index() == 0) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "e";
        } else {
          DF.mo.resize.rn.dir = "e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().next().width() - (cWidth + cz);
        DF.mo.resize.size(o, pt, da);
      } else if (o.parent().index() == 1) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w";
        } else {
          DF.mo.resize.rn.dir = "w,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 2:
    case 7:
    case 8:
      var cz = DF.config.webWidth[2];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.index() == 0) {
        DF.mo.resize.rn.dir = "e,s";
        DF.mo.resize.rn.maxW = (o.width() + o.next().width()) - (cWidth + cz);
      } else if (o.index() == o.parent().find(".customModule").length - 1) {
        DF.mo.resize.rn.dir = "w,s";
        DF.mo.resize.rn.maxW = (o.width() + o.prev().width()) - (cWidth + cz);
      }
      DF.mo.resize.size(o, pt, da);
      break;
    case 3:
      var cz = DF.config.webWidth[3];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.index() == 0) {
        DF.mo.resize.rn.dir = "e,s";
        DF.mo.resize.rn.maxW = (o.width() + o.next().width()) - (cWidth + cz);
      } else if (o.index() == o.parent().find(".customModule").length - 1) {
        DF.mo.resize.rn.dir = "w,s";
        DF.mo.resize.rn.maxW = (o.width() + o.prev().width()) - (cWidth + cz);
      } else {
        DF.mo.resize.rn.dir = "w,s,e";
        var olw = o.prev().width() > o.next().width() ? o.next().width() : o.prev().width();
        DF.mo.resize.rn.maxW = (o.width() + olw) - (cWidth + cz);
      }
      DF.mo.resize.size(o, pt, da);
      break;
    case 4:
      var cz = DF.config.webWidth[4];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.index() == 0) {
        DF.mo.resize.rn.dir = "e,s";
        DF.mo.resize.rn.maxW = (o.width() + o.next().width()) - (cWidth + cz);
      } else if (o.index() == o.parent().find(".customModule").length - 1) {
        DF.mo.resize.rn.dir = "w,s";
        DF.mo.resize.rn.maxW = (o.width() + o.prev().width()) - (cWidth + cz);
      } else {
        DF.mo.resize.rn.dir = "w,s,e";
        var olw = o.prev().width() > o.next().width() ? o.next().width() : o.prev().width();
        DF.mo.resize.rn.maxW = (o.width() + olw) - (cWidth + cz);
      }
      DF.mo.resize.size(o, pt, da);
      break;
    case 16:
      var cz = DF.config.webWidth[5];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.index() == 0) {
        DF.mo.resize.rn.dir = "e,s";
        DF.mo.resize.rn.maxW = (o.width() + o.next().width()) - (cWidth + cz);
      } else if (o.index() == o.parent().find(".customModule").length - 1) {
        DF.mo.resize.rn.dir = "w,s";
        DF.mo.resize.rn.maxW = (o.width() + o.prev().width()) - (cWidth + cz);
      } else {
        DF.mo.resize.rn.dir = "w,s,e";
        var olw = o.prev().width() > o.next().width() ? o.next().width() : o.prev().width();
        DF.mo.resize.rn.maxW = (o.width() + olw) - (cWidth + cz);
      }
      DF.mo.resize.size(o, pt, da);
      break;
    case 5:
    case 6:
    case 12:
    case 13:
      var cz = DF.config.webWidth[2];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent(".CModulePRLeft").length) {
        if (o.parent().index() == 0) {
          DF.mo.resize.rn.dir = "e,s";
          DF.mo.resize.rn.maxW = (o.width() + o.parent().next().width()) - (cWidth + cz);
        } else {
          DF.mo.resize.rn.dir = "w,s";
          DF.mo.resize.rn.maxW = (o.width() + o.parent().prev().width()) - (cWidth + cz);
        }
        DF.mo.resize.size(o, pt, da);
      } else {
        if (o.index() == 0) {
          DF.mo.resize.rn.dir = "e,s";
          DF.mo.resize.rn.maxW = (o.width() + o.next().width()) - (cWidth + 10 + cz);
        } else {
          DF.mo.resize.rn.dir = "w,s";
          DF.mo.resize.rn.maxW = (o.width() + o.prev().width()) - (cWidth + 10 + cz);
        }
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 14:
    case 15:
      var cz = DF.config.webWidth[2];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent().index() == 0) {
        DF.mo.resize.rn.dir = "e,s";
        DF.mo.resize.rn.maxW = (o.width() + o.parent().next().width()) - (cWidth + cz);
      } else {
        DF.mo.resize.rn.dir = "w,s";
        DF.mo.resize.rn.maxW = (o.width() + o.parent().prev().width()) - (cWidth + cz);
      }
      DF.mo.resize.size(o, pt, da);
      break;
    case 28:
      var cz = DF.config.webWidth[3];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent().index() == 0) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "e";
        } else {
          DF.mo.resize.rn.dir = "e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().next().width() - (cWidth + cz);
        DF.mo.resize.size(o, pt, da);
      } else if (o.parent().index() == 2) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w";
        } else {
          DF.mo.resize.rn.dir = "w,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      } else {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w,e";
        } else {
          DF.mo.resize.rn.dir = "w,e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 29:
      var cz = DF.config.webWidth[4];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent().index() == 0) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "e";
        } else {
          DF.mo.resize.rn.dir = "e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().next().width() - (cWidth + cz);
        DF.mo.resize.size(o, pt, da);
      } else if (o.parent().index() == 3) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w";
        } else {
          DF.mo.resize.rn.dir = "w,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      } else {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w,e";
        } else {
          DF.mo.resize.rn.dir = "w,e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 30:
      var cz = DF.config.webWidth[5];
      DF.mo.resize.rn.minW = cWidth + cz;
      if (o.parent().index() == 0) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "e";
        } else {
          DF.mo.resize.rn.dir = "e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().next().width() - (cWidth + cz);
        DF.mo.resize.size(o, pt, da);
      } else if (o.parent().index() == 4) {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w";
        } else {
          DF.mo.resize.rn.dir = "w,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      } else {
        if (da.sys == 1) {
          DF.mo.resize.rn.dir = "w,e";
        } else {
          DF.mo.resize.rn.dir = "w,e,s";
        }
        DF.mo.resize.rn.maxW = o.parent().width() - 10 + o.parent().prev().width() - (cWidth + 10 + cz);
        DF.mo.resize.size(o, pt, da);
      }
      break;
    case 60:
      DF.mo.resize.rn.minW = cWidth;
      DF.mo.resize.rn.dir = "w,s,e,se";
      DF.mo.resize.rn.maxW = DF.config.webWidth[0];
      DF.mo.resize.size(o, pt, da);
      break;
  }
};
//改变模块大小
DF.mo.resize.size = function(o, pt, da) {
  o.resizable({
    opacity: 0.8,
    animateDuration: "fast",
    autoHide: true,
    maxWidth: DF.mo.resize.rn.maxW,
    minWidth: DF.mo.resize.rn.minW,
    minHeight: DF.mo.resize.rn.minH,
    handles: DF.mo.resize.rn.dir,
    animate: true,
    animateDuration: 500,
    grid: 1,
    helper: "customModule-helper",
    start: function(event, ui) { //鼠标按
      DF.mo.resize.rn.startWidth = ui.size.width;
      DF.mo.resize.rn.startHeight = ui.size.height;
      DF.mo.resize.rn.startX = event.pageX;
      DF.mo.resize.rn.startY = event.pageY;
      DF.mo.resize.rn.oLeft = o.offset().left;
      DF.mo.resize.rn.oTop = o.offset().top;
      DF.mo.resize.rn.showPX = true;
      DF.mo.resize.rn.guidesX = true;
      DF.mo.resize.rn.guidesY = true;
    },
    resize: function(event, ui) { //开始拖动改变
      var helperDiv = $(".customModule-helper"),
        ex = event.pageX,
        ey = event.pageY,
        w = helperDiv.width(),
        h = helperDiv.height(),
        pl = helperDiv.offset().left,
        pt = helperDiv.offset().top;
      if (DF.config.showPx) {
        DF.mo.resize.showPX(ex, ey, w, h, pl, pt);
      }
      if (DF.config.showGuides) {
        DF.mo.resize.guides(ex, ey, w, h, pl, pt);
      }
    },
    stop: function(event, ui) { //改变完成并停止
      var po = o.parents(".customModuleRow"),
        da = DF.f.s_j(po.attr("data-attr"));
      if (da.c != 1) {
        da.c = 1;
        DF.f.changeAttr(po, "data-attr", DF.f.j_s(da));
      }
      parWin.Ev.pubFun.changeSave();
      DF.mo.resize.rn.stopWidth = ui.helper.width();
      DF.mo.resize.rn.stopHeight = ui.helper.height();
      DF.mo.resize.rn.stopX = event.pageX;
      DF.mo.resize.rn.stopY = event.pageY;
      DF.mo.resize.rn.mdir = (DF.mo.resize.rn.stopX - DF.mo.resize.rn.startX) > 0 ? "r" : "l";
      DF.mo.resize.count(o, pt, da);
      o.trigger('mouseleave');
      if (DF.config.showPx) {
        if (!DF.mo.resize.rn.showPX) {
          DF.mo.resize.removePX();
        }
      }
      if (DF.config.showGuides) {
        if (!DF.mo.resize.rn.guidesY) {
          DF.mo.resize.removeGuides('y');
        }
        if (!DF.mo.resize.rn.guidesX) {
          DF.mo.resize.removeGuides('x');
        }
      }
    }
  });
};
//根据行类型来判断如何计算改变的模块
DF.mo.resize.count = function(o, pt, da) {
  var speed = 500,
    chazhiW = this.rn.stopWidth - this.rn.startWidth,
    chazhiH = this.rn.stopHeight - this.rn.startHeight,
    mdir = DF.mo.resize.rn.mdir;
  //改变宽度
  if (chazhiW != 0) {
    DF.mo.resize.sW(o, chazhiW);
    switch (pt) {
      case 2:
      case 3:
      case 4:
      case 7:
      case 8:
      case 16:
        var objnext = o.next(),
          objprev = o.prev(),
          b = DF.mo.resize.rn.startWidth < DF.mo.resize.rn.stopWidth,
          s = DF.mo.resize.rn.startWidth > DF.mo.resize.rn.stopWidth;
        if (mdir == 'l' && b || mdir == 'r' && s) {
          objprev.animate({
            "width": objprev.width() - chazhiW
          }, speed);

          DF.mo.resize.sW(objprev, -chazhiW);
        } else if (mdir == 'l' && s || mdir == 'r' && b) {
          objnext.animate({
            "width": objnext.width() - chazhiW
          }, speed);
          DF.mo.resize.sW(objnext, -chazhiW);
        }
        break;
      case 5:
      case 6:
      case 12:
      case 13:
        var objnext = o.next(),
          objprev = o.prev(),
          b = DF.mo.resize.rn.startWidth < DF.mo.resize.rn.stopWidth,
          s = DF.mo.resize.rn.startWidth > DF.mo.resize.rn.stopWidth;
        if (o.parent('.CModulePRLeft').length) {
          var par = o.parent(),
            pnext = par.next(),
            pprev = par.prev();
          par.animate({
            "width": par.width() + chazhiW
          }, speed);
          o.siblings().each(function() {
            $(this).animate({
              "width": DF.mo.resize.rn.stopWidth
            }, speed);
            DF.mo.resize.sW($(this), chazhiW);
          });
          if (mdir == 'l' && b || mdir == 'r' && s) {
            pprev.animate({
              "width": pprev.width() - chazhiW
            }, speed);
            DF.mo.resize.sW(pprev, -chazhiW);
          }
          if (mdir == 'r' && b || mdir == 'l' && s) {
            pnext.animate({
              "width": pnext.width() - chazhiW
            }, speed);
            DF.mo.resize.sW(pnext, -chazhiW);
          }
        } else {
          if (mdir == 'l' && b || mdir == 'r' && s) {
            objprev.animate({
              "width": objprev.width() - chazhiW
            }, speed);
            objprev.find(".customModule").each(function() {
              $(this).animate({
                "width": $(this).width() - chazhiW
              }, speed);
              DF.mo.resize.sW($(this), -chazhiW)
            });
          }
          if (mdir == 'l' && s || mdir == 'r' && b) {
            objnext.animate({
              "width": objnext.width() - chazhiW
            }, speed);
            objnext.find(".customModule").each(function() {
              $(this).animate({
                "width": $(this).width() - chazhiW
              }, speed);
              DF.mo.resize.sW($(this), -chazhiW);
            });
          }
        }
        break;
      case 14:
      case 15:
        var par = o.parent(),
          pnext = par.next(),
          pprev = par.prev(),
          b = DF.mo.resize.rn.startWidth < DF.mo.resize.rn.stopWidth,
          s = DF.mo.resize.rn.startWidth > DF.mo.resize.rn.stopWidth;
        par.animate({
          "width": par.width() + chazhiW
        }, speed);
        o.siblings().each(function() {
          $(this).animate({
            "width": DF.mo.resize.rn.stopWidth
          }, speed);
          DF.mo.resize.sW($(this), chazhiW);
        });
        if (mdir == 'l' && b || mdir == 'r' && s) {
          pprev.animate({
            'width': pprev.width() - chazhiW
          }, speed);
          pprev.find(".customModule").each(function() {
            $(this).animate({
              "width": $(this).width() - chazhiW
            }, speed);
            DF.mo.resize.sW($(this), -chazhiW);
          });
        }
        if (mdir == 'l' && s || mdir == 'r' && b) {
          pnext.animate({
            'width': pnext.width() - chazhiW
          }, speed);
          pnext.find(".customModule").each(function() {
            $(this).animate({
              "width": $(this).width() - chazhiW
            }, speed);
            DF.mo.resize.sW($(this), -chazhiW);
          });
        }
        break;
      case 21:
      case 22:
      case 23:
      case 28:
      case 29:
      case 30:
      case 31:
        var par = o.parent(),
          pnext = par.next(),
          pprev = par.prev(),
          b = DF.mo.resize.rn.startWidth < DF.mo.resize.rn.stopWidth,
          s = DF.mo.resize.rn.startWidth > DF.mo.resize.rn.stopWidth,
          selfBut = par.find(".addMoBut"),
          nextBut = pnext.find(".addMoBut"),
          prevBut = pprev.find(".addMoBut");
        par.animate({
          "width": par.width() + chazhiW
        }, speed);
        o.siblings('.customModule').each(function() {
          $(this).animate({
            "width": DF.mo.resize.rn.stopWidth
          }, speed);
          DF.mo.resize.sW($(this), chazhiW);
        });
        if (mdir == 'l' && b || mdir == 'r' && s) {
          var selfBda = DF.f.s_j(selfBut.attr("data-attr")),
            prevBda = DF.f.s_j(prevBut.attr("data-attr"));
          selfBda.w = DF.mo.resize.rn.stopWidth;
          prevBda.w = prevBda.w - chazhiW;
          DF.f.changeAttr(selfBut, "data-attr", DF.f.j_s(selfBda));
          DF.f.changeAttr(prevBut, "data-attr", DF.f.j_s(prevBda));
          pprev.animate({
            'width': pprev.width() - chazhiW
          }, speed);
          pprev.find(".customModule").each(function() {
            $(this).animate({
              "width": $(this).width() - chazhiW
            }, speed);
            DF.mo.resize.sW($(this), -chazhiW);
          });
        }
        if (mdir == 'l' && s || mdir == 'r' && b) {
          var selfBda = DF.f.s_j(selfBut.attr("data-attr")),
            nextBda = DF.f.s_j(nextBut.attr("data-attr"));
          selfBda.w = DF.mo.resize.rn.stopWidth;
          nextBda.w = nextBda.w - chazhiW;
          DF.f.changeAttr(selfBut, "data-attr", DF.f.j_s(selfBda));
          DF.f.changeAttr(nextBut, "data-attr", DF.f.j_s(nextBda));
          pnext.animate({
            'width': pnext.width() - chazhiW
          }, speed);
          pnext.find(".customModule").each(function() {
            $(this).animate({
              "width": $(this).width() - chazhiW
            }, speed);
            DF.mo.resize.sW($(this), -chazhiW);
          });
        }
        if (da.sys == 1) {
          setTimeout(function() {
            o.height('auto')
          }, 1000);
        }
        break;
    }
  }
  //改变高度
  if (chazhiH != 0) {
    switch (pt) {
      case 2:
      case 3:
      case 4:
      case 7:
      case 8:
      case 16:
        DF.mo.resize.sH(o, chazhiH);
        o.siblings(".customModule").each(function() {
          $(this).animate({
            "height": $(this).height() + chazhiH
          }, speed);
          DF.mo.resize.sH($(this), chazhiH);
        });
        break;
      default:
        DF.mo.resize.sH(o, chazhiH);
        break;
    }
  }
};
/****************关于模块拖动&排序的一些方法和参数**********************/
//顺序模块排序
DF.mo.sorts = {};
DF.mo.sorts.order = function(o, opar) {
  opar.sortable({
    opacity: "0.6",
    cursor: "move",
    dropOnEmpty: true,
    handle: ".Mo",
    containment: "parent",
    helper: "clone",
    tolerance: "pointer",
    distance: 3,
    forcePlaceholdersize: true,
    revert: "true",
    appendTo: "parent",
    start: function(event, ui) {
      var addMoBut = $(this).children("a.addMoBut");
      if (addMoBut.length)
        addMoBut.hide();
    },
    change: function(event, ui) {
      var mop = $(this).parents(".customModuleRow"),
        da = DF.f.s_j(mop.attr("data-attr"));
      if (da.c != 1) {
        da.c = 1;
        DF.f.changeAttr(mop, "data-attr", DF.f.j_s(da));
      }
      parWin.Ev.pubFun.changeSave();
    },
    stop: function(event, ui) {
      var addMoBut = $(this).children("a.addMoBut"),
        mop = $(this).parents(".customModuleRow").find('div.customModule');
      mop.each(function() {
        $(this).removeData("ui-resizable");
        $(this).removeClass('ui-resizable');
        $(this).removeClass('ui-resizable-autohide');
        $(this).find('.ui-resizable-handle').remove();
      })
      if (addMoBut.length) {
        addMoBut.show();
        if (addMoBut.index() < $(this).children().length - 1) {
          var caddMoBut = addMoBut.clone();
          addMoBut.remove();
          $(this).append(caddMoBut);
        }
      }
    }
  });
};
//自由模块排序
DF.mo.sorts.amove = function(o) {
  o.draggable({
    cursor: "move",
    containment: "parent",
    handle: ".Mo",
    scroll: false,
    start: function() {
      $(this).css({
        "z-index": 10
      });
    },
    stop: function() {
      $(this).css({
        "z-index": ""
      });
    }
  });
};
//鼠标经过模块时需要调用的方法
DF.mo.Pmenter = function(o) {
  var Mo = o.find(".Mo"),
    mId = Mo.attr("id"),
    rpdom = o.parents(".customModuleRow"),
    pId = rpdom.attr("id"),
    pda = DF.f.s_j(rpdom.attr("data-attr")),
    da = DF.f.s_j(o.attr("data-attr"));
  DF.f.addXL(o);
  //判断模块父级行类型并添加排序功能
  if (pda.l != 1 && pda.l != 11 && pda.l != 9 && pda.l != 60) {
    var opar = o.parent();
    if (!opar.data('sHover')) {
      DF.mo.sorts.order(o, opar);
      opar.data("sHover", 1);
    }
  } else if (pda.l == 60) {
    if (!o.data('sHover')) {
      DF.mo.sorts.amove(o);
      o.data("sHover", 1);
    }
    //o.css({"z-index":10});
  }
  //给模块添加改变大小句柄，并更改大小
  DF.mo.resize.addDir(o, pda.l, da);
  //给模块添加操作按钮
  DF.mo.edit.addOp(o, mId, da, rpdom, pda, pId);
  //设置内容大按钮
  var setMoConBut = o.find("div.setMoConBut");
  if (setMoConBut.data("hover") != 1) {
    setMoConBut.on({
      click: function() {
        o.find("small.layoutEdit").trigger("click");
      }
    })
    setMoConBut.data("hover", 1);
  }
  //编辑内容大按钮
  var editMoConBut = o.find("div.editMoConBut");
  if (editMoConBut.data("hover") != 1) {
    editMoConBut.on({
      click: function() {
        o.find("small.contentEdit").trigger("click");
      }
    });
    editMoConBut.data("hover", 1);
  }
  if (!Mo.data('dblclick')) {
    Mo.on({
      dblclick: function() {
        if (da.mt == 0) {
          o.find('.operateEdit .layoutEdit').trigger('click');
        } else {
          o.find('.operateEdit .contentEdit').trigger('click');
        }
        return false;
      }
    });
    Mo.data('dblclick', 1);
  }
};
//鼠标离开模块时需要调用的方法
DF.mo.Pmleave = function(o) {
  var mId = o.find(".Mo").attr("id"),
    pda = DF.f.s_j(o.parents(".customModuleRow").attr("data-attr")),
    da = DF.f.s_j(o.attr("data-attr"));
  DF.f.removeEdit(o, ".operateEdit");
  DF.f.delXL(o);
};

/****************关于模块编辑的对象和方法及参数**********************/
DF.mo.edit = {
  rn: {
    typeCopy: false,
    copyMt: null,
    copyId: null
  }
};
//给模块添加操作设置
DF.mo.edit.addOp = function(o, mId, da, rdom, pda, rId) {
  var bodyAttr = DF.f.s_j($("#webBody").data("attr")),
    opArray = [];
  //修改模块内容布局
  if ($.inArray(da.mt, DF.edit.mo.m_layoutEdit.mtype) != -1) {
    var layoutEdit = $('<small title="' + DF.edit.mo.m_layoutEdit.title + '" class="' + DF.edit.mo.m_layoutEdit.cName + '">' + DF.edit.mo.m_layoutEdit.text + '</small>');
    layoutEdit.click(function() {
      DF.edit.mo.m_layoutEdit.fn(mId, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.push(layoutEdit);
  }
  //模块内容编辑
  if ($.inArray(da.mt, DF.edit.mo.m_contentEdit.mtype) != -1) {
    var m_contentEdit = $('<small title="' + DF.edit.mo.m_contentEdit.title + '" class="' + DF.edit.mo.m_contentEdit.cName + '">' + DF.edit.mo.m_contentEdit.text + '</small>');
    m_contentEdit.click(function() {
      DF.edit.mo.m_contentEdit.fn(rdom, mId, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.push(m_contentEdit);
  }
  //复制样式
  if (da.copy == 1) {
    if (mId != DF.mo.edit.rn.copyId) {
      var typeCopy = $('<small title="' + DF.edit.mo.typeCopy.title + '" class="' + DF.edit.mo.typeCopy.cName + '">' + DF.edit.mo.typeCopy.text + '</small>');
      typeCopy.click(function() {
        DF.mo.edit.rn.typeCopy = true;
        DF.mo.edit.rn.copyId = mId;
        DF.mo.edit.rn.copyMt = da.mt;
        DF.edit.mo.typeCopy.fn();
      });
      opArray.push(typeCopy);
    }
  }
  if (da.sys == 1) {
    var upConUrl = '',
      editConUrl = '',
      upColumeUrl = '';
    switch (bodyAttr.ch_type) {
      case 10: // 产品页
        upConUrl = '/own_add_product.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466233892';
        editConUrl = '/own_product_list.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466234025';
        upColumeUrl = '/own_add_product_class.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        break;
      case 11: // 多级文章频道
        upConUrl = 'own_add_doc.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466234334';
        editConUrl = 'own_doc_list.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        upColumeUrl = 'own_add_doc_class.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        break;
      case 14: // 服务频道
        upConUrl = 'own_add_server.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466234482';
        editConUrl = '/own_server_list.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        upColumeUrl = 'own_add_server_class.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        break;
      case 15: // 一级文章频道
        upConUrl = '/own_item_doc.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466234697';
        editConUrl = '/own_item_doc_list.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        upColumeUrl = '';
        break;
      case 12: //单页频道
        upConUrl = 'own_set_single.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466234998';
        editConUrl = '';
        upColumeUrl = '';
        break;
      case 18: //图片频道
        upConUrl = '/own_add_pic.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2&u=1466566997';
        editConUrl = '/own_pic_list.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        upColumeUrl = '';
        break;
      case 16: //下载频道
        upConUrl = 'own_add_document.php?is_frame=2&channel_id=' + bodyAttr.ch_id + '&dom_id=20';
        editConUrl = '/own_document_list.php?channel_id=' + bodyAttr.ch_id + '&is_frame=2';
        upColumeUrl = 'own_add_document_class.php?is_frame=2&channel_id=' + bodyAttr.ch_id + '&dom_id=20';
        break;
      case 19:
        editConUrl = 'own_add_job.php?is_frame=2&channel_id=' + bodyAttr.ch_id;
        break;
      case 3:
        editConUrl = 'new_guest_set.php?is_frame=2&dom_id=24';
        break;
      case 34:
        editConUrl = 'map.php';
        break;
    }
    if ($.inArray(da.mt, DF.edit.mo.upCon.mtype) != -1) {
      var upCon = $('<small title="' + DF.edit.mo.upCon.title + '" class="' + DF.edit.mo.upCon.cName + '">' + DF.edit.mo.upCon.text + '</small>');
      upCon.click(function() {
        DF.edit.mo.upCon.fn(o, mId, da, upConUrl);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      });
      opArray.push(upCon);
    }
    if ($.inArray(da.mt, DF.edit.mo.upConEdit.mtype) != -1) {
      var upConEdit = $('<small title="' + DF.edit.mo.upConEdit.title + '" class="' + DF.edit.mo.upConEdit.cName + '">' + DF.edit.mo.upConEdit.text + '</small>');
      upConEdit.click(function() {
        DF.edit.mo.upConEdit.fn(o, mId, da, editConUrl);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      });
      opArray.push(upConEdit);
    }
    if ($.inArray(da.mt, DF.edit.mo.upColumeEdit.mtype) != -1) {
      var upColumeEdit = $('<small title="' + DF.edit.mo.upColumeEdit.title + '" class="' + DF.edit.mo.upColumeEdit.cName + '">' + DF.edit.mo.upColumeEdit.text + '</small>');
      upColumeEdit.click(function() {
        DF.edit.mo.upColumeEdit.fn(o, mId, da, upColumeUrl);
        setTimeout(function() {
          o.trigger("mouseleave");
        }, 500);
      });
      opArray.push(upColumeEdit);
    }
  }
  //添加标题模块样式编辑
  if ($.inArray(da.mt, DF.edit.mo.hm_typeEdit.mtype) != -1) {
    var typeEdit = $('<small title="' + DF.edit.mo.hm_typeEdit.title + '" class="' + DF.edit.mo.hm_typeEdit.cName + '">' + DF.edit.mo.hm_typeEdit.text + '</small>');
    typeEdit.click(function() {
      DF.edit.mo.hm_typeEdit.fn(o, mId, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.unshift(typeEdit);
    //判断是否能复制粘贴
    if (DF.mo.edit.rn.typeCopy && DF.mo.edit.rn.copyId != mId && DF.mo.edit.rn.copyMt == da.mt) {
      var typePaste = $('<small title=' + DF.edit.mo.typePaste.title + ' class="' + DF.edit.mo.typePaste.cName + '">' + DF.edit.mo.typePaste.text + '</small>');
      typePaste.click(function() {
        DF.edit.mo.typePaste.fn(mId, da);
      });
      opArray.push(typePaste);
    }
  }
  //添加模块样式编辑
  if ($.inArray(da.mt, DF.edit.mo.m_typeEdit.mtype) == -1) {
    var m_typeEdit = $('<small title="' + DF.edit.mo.m_typeEdit.title + '" class="' + DF.edit.mo.m_typeEdit.cName + '">' + DF.edit.mo.m_typeEdit.text + '</small>');
    m_typeEdit.click(function() {
      DF.edit.mo.m_typeEdit.fn(o, mId, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.unshift(m_typeEdit);
    //判断是否能粘贴样式
    if (DF.mo.edit.rn.typeCopy && DF.mo.edit.rn.copyId != mId && DF.mo.edit.rn.copyMt != 3) {
      var typePaste = $('<small title=' + DF.edit.mo.typePaste.title + ' class="' + DF.edit.mo.typePaste.cName + '">' + DF.edit.mo.typePaste.text + '</small>');
      typePaste.click(function() {
        DF.edit.mo.typePaste.fn(mId, da);
      });
      opArray.push(typePaste);
    }
  }
  // 添加模块动画设置按钮
  var animatedType = $('<small title="' + DF.edit.mo.animatedType.title + '" class="' + DF.edit.mo.animatedType.cName + '">' + DF.edit.mo.animatedType.text + '</small>');
  animatedType.click(function() {
    DF.edit.mo.animatedType.fn(o, mId, da);
    setTimeout(function() {
      o.trigger("mouseleave");
    }, 500);
  });
  opArray.push(animatedType);
  //删除模块
  if (pda.l == 20 || pda.l == 21 || pda.l == 22 || pda.l == 23 || pda.l == 28 || pda.l == 29 || pda.l == 30 || pda.l == 31 || pda.l == 60) {
    if (da.sys != 1) {
      var del = $('<small title="' + DF.edit.mo.del.title + '" class="' + DF.edit.mo.del.cName + '">' + DF.edit.mo.del.text + '</small>');
      del.click(function() {
        if (da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          parWin.Ev.pubFun.confirmWindow('您确定要删除此模块吗？', 'warn', function() {
            if (o.siblings(".customModule").length >= 1) {
              if (da.n) {
                DF.f.delfn(o);
              } else {
                DF.f.delfn(o);
                DF.edit.mo.del.fn(mId, rId, o, rdom);
                parWin.Ev.pubFun.changeSave();
              }
              if (pda.c != 1) {
                pda.c = 1;
                DF.f.changeAttr(rdom, "data-attr", DF.f.j_s(pda));
              }
              setTimeout(function() {
                parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
              }, 1000);
            } else {
              setTimeout(function() {
                parWin.Ev.pubFun.alertWindow('必须保证有一个模块存在。', 'error');
              }, 300);
            }
          }, function() {});
        }
      });
      opArray.push(del);
    }
  }
  //修改模块内容布局
  if ($.inArray(da.mt, DF.edit.mo.sysPage.mtype) != -1) {
    var sysPage = $('<small title="' + DF.edit.mo.sysPage.title + '" class="' + DF.edit.mo.sysPage.cName + '">' + DF.edit.mo.sysPage.text + '</small>');
    sysPage.click(function() {
      DF.edit.mo.sysPage.fn(o, mId, da);
      setTimeout(function() {
        o.trigger("mouseleave");
      }, 500);
    });
    opArray.push(sysPage);
  }
  DF.f.addEdit(o, opArray, 'operateEdit');
};
//页面中各个模块需要出现的编辑标签，主要为了方便修改文字和单击时调用的方法。
DF.edit = {
  pub: { //公用标签
    hides: {
      text: "隐藏",
      cName: "hides",
      fn: function(o) {}
    },
    shows: {
      text: "显示",
      cName: "shows",
      fn: function(o) {}
    }
  },
  // 顶部编辑句柄
  top: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站顶部样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", 'VNew/css_style/' + mId);
      }
    },
    contentEdit: {
      text: "顶部栏目管理",
      title: "编辑网站顶部栏目内容",
      cName: "contentEdit",
      fn: function(o, mId, da) {
        show_system('top');
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站顶部",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 头部编辑句柄
  header: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站头部样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", 'VNew/css_style/' + mId);
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站头部",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // logo设置
  logo: {
    contentEdit: {
      text: "编辑logo",
      title: "编辑网站logo",
      cName: "contentEdit",
      fn: function(o, mId, da) {
        if ($('body').data('copyid') != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          show_system('logo');
        }
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站logo",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 搜索编辑句柄
  searchs: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站搜索样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", '/VNew/css_style/' + mId);
      }
    },
    keywordEdit: {
      text: "编辑",
      title: "设计网站搜索功能",
      cName: "keywordEdit",
      fn: function(o, mId, da) {
        show_system('search');
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站搜索功能",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 搜索编辑句柄
  shopCar: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站购物车样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", '/VNew/css_style/' + mId);
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站购物车",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 导航编辑句柄
  nav: {
    typeEdit: {
      text: "设计导航样式",
      title: "设计网站导航样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计导航样式", '/VNew/css_style/' + mId);
      }
    },
    createColumn: {
      text: "增加栏目",
      title: "增加网站栏目",
      cName: "createColumn",
      fn: function(o, mId, da) {
        // parWin.get_url_window('/VNew/column_add.php?tj=1','栏目管理',786,520);
        // parWin.Ev.pubVar.winDocum.find("#toolColumn").trigger("click");
        parWin.Ev.admin.openAddChannel('/VNew/tj/copyChannel/c_id_1');
      }
    },
    columnAdmin: {
      text: "栏目管理",
      title: "管理网站栏目",
      cName: "columnAdmin",
      fn: function(o, mId, da) {
        // parWin.get_url_window('/VNew/column_list.php?tj=1','栏目管理',786,520);
        parWin.Ev.admin.openAddChannel('/VNew/column_list');
        // parWin.Ev.pubVar.winDocum.find("#toolColumn").trigger("click");
      }
    },
    columnEdit: {
      text: "上传栏目内容",
      title: "上传网站栏目内容",
      cName: "columnEdit",
      fn: function(o, mId, da) {
        parWin.Ev.pubVar.winDocum.find("#toolUpcon").trigger("click");
      }
    },
    columnStyle: {
      text: "设计栏目界面",
      title: "设计网站的栏目界面",
      cName: "columnStyle",
      fn: function(o, mId, da) {
        parWin.Ev.pubVar.winDocum.find("#selectEditPage .cur-edit-page").trigger("click");
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站导航",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // banner编辑句柄
  banner: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站banner图的样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", '/VNew/css_style/' + mId);
      }
    },
    contentEdit: {
      text: "管理焦点图",
      title: "管理网站banner图",
      cName: "contentEdit",
      fn: function(o, mId, da) {
        if (parWin.Ev.pubFun.saveAlert()) {
          show_system('banner');
        }
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站焦点图",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 底部编辑句柄
  foot: {
    typeEdit: {
      text: "设计样式",
      title: "设计网站底部样式",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", '/VNew/css_style.php?tag=' + mId);
      }
    },
    contentEdit: {
      text: "底部栏目管理",
      title: "管理网站底部内容",
      cName: "contentEdit",
      fn: function(o, mId, da) {
        if ($('body').data('copyid') != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          show_system('foot');
        }
      }
    },
    deletes: {
      text: "删除",
      title: "删除网站焦点图",
      cName: "deletes",
      fn: function(o, mId, da) {
        DF.pub.Fun.sysMoOpera('d', mId);
      }
    }
  },
  // 行编辑句柄
  row: {
    styleEdit: {
      text: "设计通栏样式",
      title: "设计通栏风格样式",
      cName: "styleEdit",
      fn: function(o, oId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = oId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("通栏样式设计", '/VNew/css_style.php?tag=row');
      }
    },
    typeLayout: {
      text: "设计展示样式",
      title: "设计通栏的展示样式效果",
      cName: "typeLayout",
      fn: function(o, oId, da) {
        var chAttr = DF.f.s_j($("#webBody").data("attr")),
          oId = oId.replace(/\D/g, "");
        var sUrl = '/VNew/select_show_style.php?channel_id=' + chAttr.ch_id + '&doc_id=' + chAttr.doc_id;
        if (chAttr.ch_type == 18) {
          sUrl = 'VNew/picChannelSelectShowStyle.php?channel_id=' + chAttr.ch_id + '&album_id=' + chAttr.album_id;
        }
        window.parent.Ev.iframe = DF.f.openPopup("设计行展示样式", sUrl);
      }
    },
    downMove: {
      text: "向下移动通栏",
      title: "向下移动通栏",
      cName: "downMove",
      fn: function(o, oId, da) {
        DF.f.upDownMove(o, 'down');
      }
    },
    upMove: {
      text: "向上移动通栏",
      title: "向上移动通栏",
      cName: "upMove",
      fn: function(o, oId, da) {
        DF.f.upDownMove(o, 'up');
      }
    },
    rowMove: {
      text: "拖动上下移动通栏",
      title: "拖动上下移动通栏",
      cName: "rowMove",
      fn: function(o, oId, da) {
        var l = o.offset().left;
        o.data({'left': l});
      }
    },
    rowCopy: {
      text: "复制通栏",
      title: "复制通栏",
      cName: "rowCopy",
      fn: function(o, oId, da) {
        if (da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          oId = oId.slice(4);
          parWin.Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=4&r_id=' + oId);
        }
      }
    },
    rowNextAdd: {
      text: "向下添加通栏",
      title: "向下增加通栏",
      cName: "rowNextAdd",
      fn: function(o, oId, da) {
        parWin.Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=1&target=' + oId);
      }
    },
    rowAddMo: {
      text: "添加模块",
      title: "项行内添加自定义模块",
      cName: "rowAddMo",
      fn: function() {
        // var mid = "Mo_1"
      }
    },
    rowDelete: {
      text: "删除",
      title: "删除通栏，包括通栏内的所有模块",
      cName: "rowDelete",
      fn: function(o, mId, da) {
        var txt = '您确定要删除通栏吗？',
          fun = function() {
            DF.f.delfn(o);
            setTimeout(function() {
              parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
            }, 1000);
            parWin.Ev.pubFun.changeSave();
            DF.config.rowNum--;
          }
        DF.f.openconfirm(txt, fun);
      }
    }
  },
  // 模块编辑句柄
  mo: {
    m_typeEdit: {
      mtype: [18, 123, 124, 125, 126, 130, 140, 141, 142, 143],
      text: "设计样式",
      title: "进行标题样式、边线、内容区字体设计",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        if (da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          parWin.Ev.admin.tj.v.curEditObjId = mId;
          parWin.Ev.admin.tj.v.curEditObj = o;
          DF.f.openPopup("设计样式", '/VNew/css_style.php?tag=module&mtype=' + da.mt + '&mId=' + mId.substr(3));
        }
      }
    },
    hm_typeEdit: {
      mtype: [18, 123, 124, 125, 126, 130, 140, 141, 142, 143],
      text: "设计样式",
      title: "进行标题样式，字体等设计",
      cName: "typeEdit",
      fn: function(o, mId, da) {
        if (da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          parWin.Ev.admin.tj.v.curEditObjId = mId;
          parWin.Ev.admin.tj.v.curEditObj = o;
          DF.f.openPopup("设计样式", '/VNew/css_style.php?tag=hmodule&mId=' + mId.substr(3));
        }
      }
    },
    m_layoutEdit: {
      mtype: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23],
      text: "设计模块",
      title: "选择此模块，要展示什么内容",
      cName: "layoutEdit",
      fn: function(mId, da) {
        var iMId = /\d+/.exec(mId);
        if (da.n == 1 || da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          var sUrl = "tj_index_module_type.php?module_id=" + iMId;
          parWin.get_url_window(sUrl, '设计模块', 668, 526);
        }
      }
    },
    m_contentEdit: {
      mtype: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      text: "编辑内容",
      title: "进行模块内容上传和调用",
      cName: "contentEdit",
      fn: function(rdom, mId, da) {
        var iMId = /\d+/.exec(mId),
          rowIdN = rdom.attr('id').substr(4);
        if (da.n == 1 || da.cid != 0) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          if (da.mt == 20) {
            show_system('linksite');
          } else if (da.mt == 7) {
            module_con_edit('own_form_set.php?is_frame=3&module_id=' + iMId + '&row_id' + rowIdN);
          } else {
            module_con_edit('tj_index_module.php?module_id=' + iMId + '&row_id' + rowIdN);
          }
        }
      }
    },
    del: {
      text: "删除",
      title: "删除当前模块",
      cName: "deletes",
      fn: function(mId, rId, o, rdom) {
        var have = true,
          mId_ = mId.substr(3);
        if (DF.config.delMoHistory[rId] == undefined) {
          DF.config.delMoHistory[rId] = [];
        }
        for (var i = 0; i < DF.config.delMoHistory[rId].length; i++) {
          if (DF.config.delMoHistory[rId][i] == mId) {
            have = false;
          }
        }
        if (have) {
          DF.config.delMoHistory[rId].push(mId_);
        }
      }
    },
    typeCopy: {
      text: "复制样式",
      title: "复制当前模块的样式",
      cName: "typeCopy",
      fn: function(mid, da) {
        alert('复制成功!');
      }
    },
    typePaste: {
      text: "粘贴样式",
      title: "粘贴您刚才复制的模块样式",
      cName: "typePaste",
      fn: function() {
        alert('粘贴成功!');
      }
    },
    sysPage: {
      mtype: [59, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 47, 49, 51, 53, 55, 57, 59, 67, 69, 71, 73, 75, 77, 79, 81, 42, 94, 92, 128, 2005, 2006, 2007],
      text: "高级设计",
      title: "用来设置每页显示的条数",
      cName: "sysPage",
      fn: function(o, mId, da) {
        if (parWin.Ev.pubFun.saveAlert()) {
          var bodyDa = DF.f.s_j($('body').data('attr')),
            sUrl = "";
          if (bodyDa.ch_type == 1001) {
            var c_m_id = o.find('.Mo').data('channelid');
            sUrl = 'VNew/DefinePage.php?ch_id=' + bodyDa.ch_id + '&m_id=' + mId.substr(3) + '&m_ch_id=' + c_m_id
          } else {
            sUrl = '/VNew/DefinePage.php?ch_id=' + bodyDa.ch_id;
          }
          parWin.get_url_window(sUrl, '高级设计', 400, 200);
        }
      }
    },
    animatedType: {
      text: "动画效果",
      title: "设计动画效果",
      cName: "animatedType",
      fn: function(o, mId, da) {
        if (da.n == 1 || da.cid != 0 || da.sysn == 1) {
          parWin.Ev.pubFun.changeAlert();
        } else {
          parWin.Ev.admin.tj.v.curEditObjId = mId;
          parWin.Ev.admin.tj.v.curEditObj = o;
          DF.f.openPopup("设计动画效果", '/VNew/module_animated_style.php?tag=module&mId=' + mId.substr(3));
        }
      }
    },
    upCon: { // 发布内容
      mtype: [98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 121, 122, 67, 69, 71, 73, 75, 77, 79, 81, 84, 82, 90, 89, 88, 86, 146, 47, 49, 51, 53, 55, 57, 59, 61, 62, 64, 65, 45, 43, 42, 41, 133, 135, 137, 139, 94, 95, 92],
      text: '发布内容',
      title: '发布相关内容',
      cName: 'upCon',
      fn: function(o, mId, da, url) {
        parWin.Ev.admin.pageModeSwitch(2, url, false, '');
      }
    },
    upConEdit: { // 内容管理
      mtype: [98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 121, 122, 67, 69, 71, 73, 75, 77, 79, 81, 84, 82, 90, 89, 88, 86, 146, 47, 49, 51, 53, 55, 57, 59, 61, 62, 64, 65, 45, 43, 42, 41, 133, 135, 137, 139, 94, 95, 92, 152, 150, 151],
      text: '内容管理',
      title: '内容管理',
      cName: 'editConUrl',
      fn: function(o, mId, da, url) {
        parWin.Ev.admin.pageModeSwitch(2, url, false, '');
      }
    },
    upColumeEdit: { // 栏目管理
      mtype: [97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 66, 68, 70, 72, 74, 76, 78, 80, 83, 87, 85, 147, 46, 48, 50, 52, 54, 56, 58, 60, 63, 91],
      text: '分类管理',
      title: '分类管理',
      cName: 'upColumeEdit',
      fn: function(o, mId, da, url) {
        parWin.Ev.admin.pageModeSwitch(2, url, false, '');
      }
    }
  },
  //给定位模块句柄
  abs : {
    typeEdit: {
      text: "设计样式",
      title: "设计模块样式",
      cName: "typeEdit",
      fn: function(o, mId) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        DF.f.openPopup("设计样式", '/VNew/css_style.php?tag=abs&mtype='+ 1);
      }
    },
    contentEdit: {
      text: "编辑内容",
      title: "编辑模块内容",
      cName: "contentEdit",
      fn: function(o, mId, da) {
        parWin.Ev.admin.tj.v.curEditObjId = mId;
        parWin.Ev.admin.tj.v.curEditObj = o;
        if (da.n == 1) {
          parWin.Ev.pubFun.changeAlert();
        }else{
          if(da.mt == 1){
            module_con_edit('VNew/FMAdd.php?m_id=' + mId.slice(6));
          }
        }
      }
    },
    upLayer : {
      text : '上移一层',
      title : '模块层级向上移动一层',
      cName : 'upLayer',
      fn : function(o, oId, da){
        DF.f.sortZindex('abs', oId, 'absolute_module_wrap', 'upLayer');
      }
    },
    downLayer : {
      text : '下移一层',
      title : '模块层级向下移动一层',
      cName : 'downLayer',
      fn : function(o, oId, da){
        DF.f.sortZindex('abs', oId, 'absolute_module_wrap', 'downLayer');
      }
    },
    deletes: {
      text: "删除",
      title: "删除模块",
      cName: "deletes",
      fn: function(o, oId, da) {
        DF.pub.Fun.absMoOpera('d', oId, o);
      }
    }
  }
};

DF.config = { //初始化参数和用户设置的参数
  maxRow: 10,
  maxMo: 20,
  rowNum: 0,
  showPx: true,
  showGuides: true,
  delMoHistory: {'absolute_module_wrap' : []}
};
// 兼容老用户的logo,search,shopping上边距定位
DF.hoff = function() {
  var logoT = parseInt(DF.o.logo.css('top')),
    searchT = parseInt(DF.o.searchs.css('top')),
    shopCarT = parseInt(DF.o.shopCar.css('top')),
    topH = DF.o.t.outerHeight();
  DF.o.logo.css({
    top: logoT + topH + 'px'
  });
  DF.o.searchs.css({
    top: searchT + topH + 'px'
  });
  DF.o.shopCar.css({
    top: shopCarT + topH + 'px'
  });
};
/*网站宽度的参考线*/
DF.webGuides = function() {
  DF.o.guideL.css({
    left: DF.webCZ() - 1 + 'px',
    'display': 'block'
  });
  DF.o.guideR.css({
    right: DF.webCZ() - 2 + 'px',
    'display': 'block'
  });
};
/*屏幕和网站宽度的二分之一差值*/
DF.webCZ = function() {
  var l = Math.floor(($("body").width() - DF.config.webWidth[0]) / 2);
  return l;
};
//页面加载完要自动调用的函数
DF.autofn = function() {
  //定义空对象用来页面加载的时候记录要初始化的元素，t=top_area,n=web_nav,h=header,b=banner_area,c=add_container,f=footer
  DF.o.body = $("body"); // 网站bodyDom对象
  DF.o.abs = $("#absolute_module_wrap"); //网站中的定位元素外框Dom对象
  DF.o.absIn = $("#absolute_module_inner"); //网站中的定位元素外框Dom对象
  DF.o.t = $("#top_area"); //顶部bar工具Dom对象
  DF.o.h = $("#header"); //头部Dom对象
  DF.o.logo = $("#logo"); //logoDom对象
  DF.o.searchs = $("#search"); //搜索Dom对象
  DF.o.shopCar = $("#shopping_car"); //购物车Dom对象
  DF.o.n = $("#web_nav"); //导航Dom对象
  DF.o.b = $("#banner_area"); //banner图片Dom对象
  DF.o.c = $("#add_container"); //需要添加模块的Dom对象
  DF.o.mc = $("#main_container"); //主要内容区域对象
  DF.o.f = $("#footer"); //底部Dom对象
  DF.o.fAddBut = $("#addFootBut");
  DF.o.pageHeaderBut = $("#pageHeaderBut");
  DF.o.addPageHeaderBut = $("#addPageHeaderBut");
  DF.o.r = DF.o.c.children("div.customModuleRow"); //查找添加模块的每一行对象
  DF.o.m = DF.o.r.find("div.customModule");
  DF.o.guideL = $("#webGuidesLeft");
  DF.o.guideR = $("#webGuidesRight");
  //检测页面目前的总行数.
  DF.config.rowNum = DF.o.r.length;
  //循环元素并查找出设置了隐藏的元素添加隐藏遮罩
  DF.o.r.each(function() {
    var that_ = $(this);
    if (that_.attr("data-attr")) {
      var da = DF.f.s_j($(this).attr("data-attr"));
      if (da.h == 1) {
        DF.f.addShade($(this), 'hideShade');
      }
    }
  });
};
DF.editAutofn = function() {
  // 给pageHeaderBut绑定事件
  DF.o.pageHeaderBut.on({
    click: function() {
      parWin.Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=3');
    }
  });
  // 给DF.o.addPageHeaderBut绑定事件
  DF.o.addPageHeaderBut.on({
    click: function() {
      parWin.Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=3');
    }
  });
  //给定位模块绑定事件
  DF.o.abs.on({
    mouseenter: function() {
      DF.abs.menter($(this));
    },
    mouseleave: function() {
      DF.abs.mleave($(this));
    }
  },'.absolute-module');
  //给top绑定事件
  DF.o.t.on({
    mouseenter: function() {
      DF.top.menter($(this));
    },
    mouseleave: function() {
      DF.top.mleave($(this));
    }
  });
  //给header绑定事件
  DF.o.h.on({
    mouseenter: function() {
      DF.header.menter($(this));
    },
    mouseleave: function() {
      DF.header.mleave($(this));
    }
  });
  DF.logo.autoFun(DF.o.logo);
  DF.o.logo.on({
    mouseenter: function(e) {
      DF.logo.menter($(this), e);
    },
    mouseleave: function() {
      DF.logo.mleave($(this));
    }
  });
  //给search绑定事件
  DF.o.searchs.on({
    mouseenter: function() {
      DF.searchs.menter($(this));
    },
    mouseleave: function() {
      DF.searchs.mleave($(this));
    }
  });
  //给购物车绑定事件
  DF.o.shopCar.on({
    mouseenter: function() {
      DF.shopCar.menter($(this));
    },
    mouseleave: function() {
      DF.shopCar.mleave($(this));
    }
  });
  //给nav绑定事件
  DF.o.n.on({
    mouseenter: function() {
      DF.nav.menter($(this));
    },
    mouseleave: function() {
      DF.nav.mleave($(this));
    }
  });
  //给banner绑定事件
  DF.o.b.on({
    mouseenter: function() {
      DF.banner.menter($(this));
    },
    mouseleave: function() {
      DF.banner.mleave($(this));
    }
  });
  //给footer绑定事件
  DF.o.f.on({
    mouseenter: function() {
      DF.foot.menter($(this));
    },
    mouseleave: function() {
      DF.foot.mleave($(this));
    }
  });
  // 给fAddBut绑定事件
  DF.o.fAddBut.on({
    click: function() {
      parWin.Ev.admin.tj.fun.openAddConRow('/VNew/tj/RowTemplates.php?type=3');
    }
  });
  // 给main_container绑定事件
  DF.o.mc.on({
    mouseenter : function(){
      $(this).css({'z-index' : 10});
    },
    mouseleave : function(){
      $(this).css({'z-index' : ''});
    }
  });
  //通过add_container代理给页面的行绑定事件。
  DF.o.c.on({
    mouseenter: function() {
      var obj = $(this).find("div.customModuleRowInner");
      DF.row.menter(obj);
    },
    mouseleave: function() {
      var obj = $(this).find("div.customModuleRowInner");
      DF.row.mleave(obj);
    }
  }, "div.customModuleRow");
  //通过add_container代理给页面的模块绑定事件。
  DF.o.c.on({
    mouseenter: function() {
      DF.mo.Pmenter($(this));
    },
    mouseleave: function() {
      DF.mo.Pmleave($(this));
    }
  }, ".customModule");
  //通过add_container代理给页面的添加模块按钮行绑定事件。
  DF.o.c.on({
    click: function() {
      var data = DF.f.s_j($(this).attr("data-attr")),
        newMo = $(DF.mo.add(1, data.w, data.h, 'Mo')),
        rp = $(this).parents(".customModuleRow");
      DF.mo.resize.sMo(newMo.find('.Mo'));
      $(this).before(newMo);
      var da = DF.f.s_j(rp.attr("data-attr"));
      if (da.c != 1) {
        da.c = 1;
        DF.f.changeAttr(rp, "data-attr", DF.f.j_s(da));
      }
      setTimeout(function() {
        parWin.Ev.pubFun.changeSave();
        parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
      }, 500);
    }
  }, "a.addMoBut");
  //给行添加排序功能
  DF.row.sorts(DF.o.r);
  DF.webGuides();
  // 给body绑定事件
  DF.o.body.on({
    mousemove: function(event) {
      var l = event.pageX,
        t = event.pageY,
        d = 'none',
        top_ = DF.o.c.offset().top,
        d_l = ($(this).width() - DF.config.webWidth[0]) / 2 - 45;
      d = t < top_ ? 'block' : 'none';
      DF.o.pageHeaderBut.css({
        'display': d,
        'right': d_l + 'px'
      });
    }
  });
  /*执行匿名函数判断添加头部和页眉的按钮*/
  (function() {
    var s = DF.config.sysPubRowStatus;
    if (s.footer == 1) {
      DF.o.fAddBut.show();
    }
    if (s.top_area == 1 && s.header == 1 && s.web_nav == 1 && s.banner_area == 1) {
      DF.o.addPageHeaderBut.show();
    }
  })();
};
$(function() {
  window.parWin = window.parent;
  window.saveValue = true;
  //test

  DF.autofn();
  if (parWin.Ev.pubVar.editStatus) {
    DF.editAutofn();
  }
  if (parWin.Ev.admin.tj.v.navHoverflow == 0) {
    DF.o.n.find('.NMain').css({
      'overflow': 'hidden'
    });
    parWin.Ev.admin.tj.v.navHoverflow = 1;
  }
  // 判断页面是否有可添加的系统模块
  //parWin.Ev.pubVar.wIframe.height("auto");
  //parWin.Ev.pubFun.iframeH(parWin.Ev.pubVar.wIframe);
});