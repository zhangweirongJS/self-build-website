/*存放公用dom对象的容器*/
row.o = {};
/*存放公用方法的容器*/
row.fun = {
  autoFun : function(){
    /*得到dom对象*/
    row.o.w = window;
    row.o.wp = window.parent;//得到父级窗口对象。
  }
};

/****************************关于默认内容系统行标签的对象****************************/
rsr = {};
/*存放对象的容器*/
rsr.o = {};

/*存放方法的容器*/
rsr.fun = {
  autoFun : function(){
    rsr.o.selectConRow = $('#selectConRow');
    rsr.o.selectConRowList = $("#selectConRowList");
    rsr.o.selectConRowClass = $('#selectConRowClass');
    rsr.fun.bindFun();
    rsr.fun.cCList();
    rsr.fun.loadFun();
  },
  bindFun : function(){
    /*给行的分类绑定事件*/
    rsr.o.selectConRowClass.on({
      mouseenter : function(){
        $(this).addClass('hover');
      },
      mouseleave : function(){
        $(this).removeClass('hover');
      },
      click : function(){
        var that = $(this),cid = that.data('cid');
        if(cid != 0){
          that.addClass('cur').siblings('li').removeClass('cur');
          rsr.fun.cRList(cid);
        }else{
          window.location = '/VNew/column_add.php?tj=1';
        }
      }
    },"li");
    /*给系统行的列表绑定事件*/
    rsr.o.selectConRowList.on({
      mouseenter : function(){
        $(this).addClass('hover');
      },
      mouseleave : function(){
        $(this).removeClass('hover');
      },
      click : function(){
        if($(this).data('rid') == 0){
          var chtype = $(this).data('chl');
          window.location = '/VNew/column_add.php?tj=1&chtype='+chtype;
        }
      }
    },"li");
    rsr.o.selectConRowList.on({
      click : function(){
        var t = $(this),action = t.data('action'),
            li = $(this).parents('li'),
            j = {rid : li.data('rid'), uid : li.data('uid'), id : li.attr('id')};
        switch(action){
          case  'add' :
            row.o.wp.$.popup({
              head: {
                text: "添加栏目"
              },
              addTarget: row.o.wp.$('body'),
              type: 5,
              offset: {
                fix: 1
              },
              con: {
                src: '/VNew/tj/copyChannelAdd.php?id='+j.id
              },
              animate: {
                type: 1
              },
              area: {
                w: 400,
                h: 220
              }
            });
            return false;
          break;
          case 'preview' :
          break;
        }
      }

    },"li a.btn");
  },
  loadFun : function(){
    var li = rsr.o.selectConRowClass.find("li");
    li.each(function(){
      var t = $(this),cid = t.data('cid');
      if(cid == row.channelClass){
        t.trigger('click');
      }
    })
  },
  cCList : function(){
    var list = "",cj = rsr.classJson,custom = '<li data-cid="0" class="add-li-btn"><span><b><em></em>自定义栏目</b></span></li>';
    for(var i = 0;i < cj.length; i++){
      list += '<li data-cid="'+ cj[i].id +'"><span><b>'+ cj[i].title+'</b></span></li>';
    }
    rsr.o.selectConRowClass.find('ul').append(list + custom);
  },
  cRList : function(cl){
    var rj = rsr.rowJson,
        sCRL = rsr.o.selectConRowList,
        ulArray = [],
        customLi = '<li id="customLi" class="custom-li" data-rid="0" data-chl="'+ cl +'"><div class="temp-pic"><div class="pic-btn"><span class="pic-btn-area"><b class="add-btn btn" data-action="add"></b><strong>自定义栏目</strong></span></div></div></li>';
    for(var i = 0; i < rj.length; i++){
      if(rj[i].class_id == cl){
        ulArray.push('<li id="'+ rj[i].id +'" data-c="0" data-rid="'+ rj[i].channel_id +'" data-uid="'+ rj[i].user_id +'"><div class="temp-pic"><div class="pic-btn"><span class="pic-btn-area"><a href="###" class="add-btn btn" data-action="add"></a><a href="'+ rj[i].pic +'" target="_blank" class="preview-btn btn" data-action="preview"></a></span><span class="pic-btn-bg"></span></div><img data-bsrc="'+ rj[i].pic +'" src="'+ rj[i].small_pic +'" data-surl = "'+ rj[i].small_pic +'"><div class="pic-name"><b>'+ rj[i].title + ' ' + rj[i].id +'</b><span class="pic-name-bg"></span></div></div></li>');
      }
    }
    if(ulArray.length > 0){
      ulList = $('<ul class="q ulList">'+ customLi + ulArray.join('\n') +'</ul>');
      sCRL.html(ulList);
      if(sCRL.height() >= ulList.height()){
        sCRL.off("mousewheel");
      }else{
        sCRL.cScroll({
          w:10,
          tbB :true,
          fun : function(){}
        });
      }
    }else{
      sCRL.off("mousewheel");
      sCRL.html('<div class="no-list" style="display:block;">没有列表内容</div>');
    }
  },
  addSysRow : function(j,tarObj){
    var aw = row.o.wp.$.popup({
      type : 6
    });
    setTimeout(function(){
      row.fun.pWinscroTo(tarObj);
      row.o.wp.Ev.pubVar.wIframeWin.DF.row.addConRow(j.rid,tarObj,j.uid,aw);
      // row.fun.closeWindow();
    },500)
    return false;
  }
};
$(function(){
  rsr.fun.autoFun();
  row.fun.autoFun();
});
