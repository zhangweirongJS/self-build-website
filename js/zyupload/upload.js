/**
 * Created by Administrator on 2017/3/8 0008.
 */
var ImgSource = [],ImgName = [];
function show_Window(){
    window.parent.$.popup({
        type : 5,
        head : {text:"设置水印"},
        zIndex : {yes:1,val:7000},
        con : {
            src : "/pic_water_set.php?is_frame=2"
        },
        area : {w:'450',h:'550'}
    });
}
function CloseWin(fileId,iframeId,type,wap){
    window.parent.Ev.pubFun.delLoadingWindow();
    if(ImgSource.length==0){
        $('#process').width('0%');
        $('#total').text('0');
        $('#last').text('0');
        $('.jd').hide();
        return false;
    }else{
        window.parent.Ev.pubFun.alertWindow('上传成功！');
    }

    if(ImgSource.length>1){
        url = ImgSource;
        pname = ImgName;
    }else{
        url = ImgSource[0];
        pname = ImgName[0];
    }

    switch(parseInt(type)){
        case 1:
            var num = iframeId.substr(1);
            window.parent.$('.dhtmlx_wins_body_inner div iframe')[num-1].contentWindow.reset_img_url(url,fileId,pname);
            break;
        case 2:
            window.parent.$('#popupIframe_' + iframeId).contentWindow.reset_img_url(url,fileId,pname);;
            break;
        case 3:
            window.parent.reset_img_url(url,fileId,pname);
            break;
        default:
            if(parseInt(window.parent.Ev.siteClass)==1){
                window.parent.Ev.pubVar.wIframeWin.reset_img_url(url,fileId,pname);
            }else{
                window.parent.winobj.mFrameWin.reset_img_url(url,fileId,pname);
            }
            break;
    }

    var num = window.name.substr(12);
    window.parent.$.popupClose(num);
}
function remove(arr,val){
    var index = arr.indexOf(val);
    if(index!=-1) arr.splice(index,1);
    return arr;
}
function UTCTimeDemo(){
    var now = new Date().getTime();
    var datestr=escape(now*1000+Math.round(Math.random()*1000));
    return datestr;
}
$(function(){
    if (!Array.prototype.indexOf){
        Array.prototype.indexOf = function(elt /*, from*/){
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
    var img_Date = $("#img_Date"),
        imgSet_list = $("#imgSet_list"),
        imgSet = $("#imgSet"),
        listMore = $("#listMore"),
        list_btn = $("#list_btn");
    list_btn.on({
        click : function(){
            var t = $(this),
                c = t.data('id');
            if(c == 'o'){
                close_div();
            }else if(c =='r'){
                var num = window.name.substr(12);
                window.parent.$.popupClose(num);
            }
        }
    },'a');
    imgSet_list.on({
        scroll : function(){
            var t = $(this),only = t.scrollTop() + t.height(),
                ul = imgSet;
            ulH = ul.height() - 800;
            if(t.data('x') != 1){
                if(only > ulH){
                    listMore.trigger('click');
                    t.data('x',1);
                }
            }
        }
    });
    // 查看更多
    listMore.on('click',function() {
        var time = Date.parse(new Date());
        var listNum = imgSet.find('li').size();
        $.ajax({
            url: '/action/pic_selector/ajax_get_mypic.php?time='+time,
            type: 'POST',
            dataType: 'json',
            data: {'listNum': listNum,'type':type,'pic_name':pic_name},
            success:function (data) {
                var listStr = '';
                if ( data ) {
                    for (var i in data) {
                        listStr += '<li class="list" id="list_'+i+'" data-id="'+i+'" data-pic="'+data[i]['pic2']+'" data-pname="'+data[i]['name']+'">';
                        listStr += '<a href="###">';
                        listStr += '<span class="pic"><img src="'+data[i]['pic']+'" title="'+data[i]['name']+'"></span>';
                        listStr += '<p class="pic_name">';
                        if(data[i]['name'])
                            listStr += data[i]['name']+'</p>';
                        else
                            listStr += '无名称</p>';
                        listStr += '<a href="###" class="choose"></a>';
                        listStr += '<a href="###" class="del_img" data-id="'+i+'"></a>';
                        listStr += '</a></li>';
                    }
                    imgSet.append(listStr);
                    imgSet_list.data('x',0);
                }
            }
        });
    });
    imgSet.on({
        click : function(){
            var tmpId = $(this).data('id');
            if(!PicArr || PicArr.indexOf(tmpId)==-1){
                if(maximum>1){
                    if(PicArr.length+1>maximum){
                        window.parent.Ev.pubFun.alertWindow('最多可选择'+maximum+'张图片！','error');
                        return false;
                    }
                    PicArr.push(tmpId);
                    $(this).addClass("cur");//siblings().removeClass("cur");
                }else{
                    PicArr = [tmpId];
                    $(this).addClass("cur").siblings().removeClass("cur");
                }
                $(this).find(".choose").first().addClass("cur_img");
            }else{
                PicArr = remove(PicArr,tmpId);
                $(this).removeClass("cur");
                $(this).find(".choose").first().removeClass("cur_img");
            }
        }
    },'li');
    imgSet.on({
        click : function(event){
            event.stopPropagation();
            if(confirm('删除文件会影响到所有使用该文件的地方，确定删除吗？')){
                var obj = $(this);
                var id = obj.data('id');
                if(!id){
                    window.parent.Ev.pubFun.alertWindow("请指定要删除的图片","error");
                    return false;
                }
                window.parent.Ev.pubFun.addLoadingWindow();
                var time = Date.parse(new Date());
                $.ajax({
                    url: '/action/pic_selector/ajax_delete_pic.php?time='+time,
                    type: 'POST',
                    dataType: 'json',
                    data: {'pid':id,'type':parseInt(type)+1,'w':'mypic'},
                    success:function (data) {
                        if(data==1){
                            window.parent.Ev.pubFun.alertWindow("删除成功");
                            obj.parents('.list').remove();
                            var tmpId = obj.parent().data('id');
                            if(PicArr.indexOf(tmpId)>-1){
                                PicArr = remove(PicArr,tmpId);
                            }
                        }else{
                            window.parent.Ev.pubFun.alertWindow("删除失败，请稍后重试！","error");
                        }
                        window.parent.Ev.pubFun.delLoadingWindow();
                    }
                });
            }
        }
    },'.del_img');
});

function changeType(){
    var type = $("#in_select option:selected").val();
    var pic_name = $("#pic_name").val();
    window.location.href = "/CommonUpload/MyPic.php?"+param+"&type="+type+"&pic_name="+pic_name;
}
var limit = 0,last = 0;
function close_div(){
    if(PicArr.length==0){
        window.parent.Ev.pubFun.alertWindow('请先选择文件！', 'error');
        return false;
    }

    if(PicArr.length>maximum){
        window.parent.Ev.pubFun.alertWindow('最多可选择'+maximum+'张图片！', 'error');
        return false;
    }

    limit = PicArr.length;
    $('#total').text(limit);
    $('.jd').show();

    window.parent.Ev.pubFun.addLoadingWindow();
    var url = "/CommonUpload/Action/CommonUploadAction.php?"+param+"&type="+(parseInt(type)+1);
    $.each(PicArr,function(i,v){
        var pic = $('#list_'+v).data('pic');
        var name = $('#list_'+v).data('pname');

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            async : true,
            data: {img_source:pic, t:UTCTimeDemo()},
            statusCode: {502: function(){
                process();
            }
            },
            success:function (response) {
                if(!parseInt(response.errorcode)){
                    ImgSource.push(response.errormsg);
                    ImgName.push(name);
                }else{
                    if(maximum==1) window.parent.Ev.pubFun.alertWindow(response.errormsg, 'error');
                }
                process();
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                process();
            }
        });
    });
}

function process(){
    if(limit > 0)
    {
        if(--limit <= 0)
        {
            CloseWin(fileId, iframeId, itype, WAP_STYLE);
            return false;
        }
        last = PicArr.length-limit;
        $("#last").text(last+1);
        $("#process").width(last/PicArr.length*100+'%');
    }
}

function goSearch(){
    var webUrl = $("#webUrl").val();
    webUrl = encodeURIComponent(webUrl);
    window.location.href = "/CommonUpload/ToMy.php?"+param+"&webUrl="+webUrl;
}