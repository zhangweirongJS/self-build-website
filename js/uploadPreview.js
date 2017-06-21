/**
 * Created by Administrator on 2017/3/8 0008.
 */
(function($) {
    jQuery.fn.extend({
        uploadPreview: function(opts) {
            opts = jQuery.extend({
                width: 0,
                height: 0,
                imgDiv: "#imgDiv",
                imgType: ["gif", "jpeg", "jpg", "png"],
                maxwidth: 0,
                maxheight: 0,
                maxsize:1024,
                imgurl: null,
                reload_tag:1,
                callback: function() { return false; }
            }, opts || {});
            var _self = this;
            var _this = $(this);
            var imgDiv = $(opts.imgDiv);

            imgDiv.width(opts.width);
            imgDiv.height(opts.height);

            autoScaling = function() {
                if ($.browser.version == "7.0" || $.browser.version == "8.0" || $.browser.version == "9.0") imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                var img_width = imgDiv.width();
                var img_height = imgDiv.height();

                if (img_width > opts.maxwidth || img_height > opts.maxheight) {
                    alert("图片尺寸过大，请按提示尺寸上传！");
                    if(opts.reload_tag==1)document.location.reload();
                    clearvalue(_this[0]);
                    _this.trigger("blur"); //失去控件焦点
                    imgDiv.hide();
                    return false;
                }
                if (img_width > 0 && img_height > 0) {
                    /*  var rate = (opts.width / img_width < opts.height / img_height) ? opts.width / img_width : opts.height / img_height;
                     if (rate <= 1) {
                     if ($.browser.version == "7.0" || $.browser.version == "8.0") imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "scale";
                     alert(img_width * rate);
                     imgDiv.width(img_width * rate);
                     imgDiv.height(img_height * rate);
                     } else {
                     imgDiv.width(img_width);
                     imgDiv.height(img_height);
                     }
                     var left = (opts.width - imgDiv.width()) * 0.5;
                     var top = (opts.height - imgDiv.height()) * 0.5;
                     imgDiv.css({ "margin-left": left, "margin-top": top });
                     imgDiv.hide();*/
                }
            }
            _this.change(function() {
                _this = $(this);
                if (this.value) {
                    if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        alert("图片类型必须是" + opts.imgType.join("，") + "中的一种");
                        if(opts.reload_tag==1)document.location.reload();
                        clearvalue(_this[0]);
                        return false;
                    }

                    imgDiv.hide();
                    if ($.browser.msie) {
                        if ($.browser.version == "6.0") {
                            //var img = $("<img />");
                            //imgDiv.replaceWith(img);
                            // imgDiv = img;
                            var image = new Image();
                            //image.src = 'file:///' + this.value;
                            //imgDiv.attr('src', image.src);
                            image.dynsrc='file:///' + this.value;
                            var fileSize =image.fileSize;
                            var size = fileSize/1024;
                            if(size>opts.maxsize){
                                alert("上传文件过大，请按提示上传！");
                                if(opts.reload_tag==1)document.location.reload();
                                clearvalue(_this[0]);
                                return false;
                            }
                            autoScaling();
                        }
                        else {
                            imgDiv.css({ filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)" });
                            imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                            try {

                                imgDiv.get(0).filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = getPath(_this[0]);
                            } catch (e) {
                                alert("无效的图片文件！");
                                if(opts.reload_tag==1)document.location.reload();
                                clearvalue(_this[0]);
                                return;
                            }
                            setTimeout("autoScaling()", 100);

                        }
                    }
                    else {
                        var img = $("<img />");
                        imgDiv.replaceWith(img);
                        imgDiv = img;
                        imgDiv.attr('src', this.files.item(0).getAsDataURL());
                        imgDiv.css({ "vertical-align": "middle" });
                        setTimeout("autoScaling()", 100);
                    }
                }
            });
        }
    });
})(jQuery);
//获得上传控件的值，obj为上传控件对象
function getPath(obj) {
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}
//清空上传控件的值，obj为上传控件对象
function clearvalue(obj) {
    obj.select();
    document.execCommand("delete");
}