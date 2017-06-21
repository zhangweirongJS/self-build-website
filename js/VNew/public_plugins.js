//一些公用的jQuery插件
//时间：2014/08/08

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
			// AMD. Register as an anonymous module.
			define(['jquery'], factory);
	} else if (typeof exports === 'object') {
			// Node/CommonJS style for Browserify
			module.exports = factory;
	} else {
			// Browser globals
			factory(jQuery);
	}
}(function ($) {

	var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
			toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
									['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
			slice  = Array.prototype.slice,
			nullLowestDeltaTimeout, lowestDelta;

	if ( $.event.fixHooks ) {
			for ( var i = toFix.length; i; ) {
					$.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
			}
	}

	var special = $.event.special.mousewheel = {
			version: '3.1.9',

			setup: function() {
					if ( this.addEventListener ) {
							for ( var i = toBind.length; i; ) {
									this.addEventListener( toBind[--i], handler, false );
							}
					} else {
							this.onmousewheel = handler;
					}
					// Store the line height and page height for this particular element
					$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
					$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
			},

			teardown: function() {
					if ( this.removeEventListener ) {
							for ( var i = toBind.length; i; ) {
									this.removeEventListener( toBind[--i], handler, false );
							}
					} else {
							this.onmousewheel = null;
					}
			},

			getLineHeight: function(elem) {
					return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
			},

			getPageHeight: function(elem) {
					return $(elem).height();
			},

			settings: {
					adjustOldDeltas: true
			}
	};

	$.fn.extend({
			mousewheel: function(fn) {
					return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
			},

			unmousewheel: function(fn) {
					return this.unbind('mousewheel', fn);
			}
	});


	function handler(event) {
			var orgEvent   = event || window.event,
					args       = slice.call(arguments, 1),
					delta      = 0,
					deltaX     = 0,
					deltaY     = 0,
					absDelta   = 0;
			event = $.event.fix(orgEvent);
			event.type = 'mousewheel';

			// Old school scrollwheel delta
			if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
			if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
			if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
			if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

			// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
			if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
					deltaX = deltaY * -1;
					deltaY = 0;
			}

			// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
			delta = deltaY === 0 ? deltaX : deltaY;

			// New school wheel delta (wheel event)
			if ( 'deltaY' in orgEvent ) {
					deltaY = orgEvent.deltaY * -1;
					delta  = deltaY;
			}
			if ( 'deltaX' in orgEvent ) {
					deltaX = orgEvent.deltaX;
					if ( deltaY === 0 ) { delta  = deltaX * -1; }
			}

			// No change actually happened, no reason to go any further
			if ( deltaY === 0 && deltaX === 0 ) { return; }

			// Need to convert lines and pages to pixels if we aren't already in pixels
			// There are three delta modes:
			//   * deltaMode 0 is by pixels, nothing to do
			//   * deltaMode 1 is by lines
			//   * deltaMode 2 is by pages
			if ( orgEvent.deltaMode === 1 ) {
					var lineHeight = $.data(this, 'mousewheel-line-height');
					delta  *= lineHeight;
					deltaY *= lineHeight;
					deltaX *= lineHeight;
			} else if ( orgEvent.deltaMode === 2 ) {
					var pageHeight = $.data(this, 'mousewheel-page-height');
					delta  *= pageHeight;
					deltaY *= pageHeight;
					deltaX *= pageHeight;
			}

			// Store lowest absolute delta to normalize the delta values
			absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

			if ( !lowestDelta || absDelta < lowestDelta ) {
					lowestDelta = absDelta;

					// Adjust older deltas if necessary
					if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
							lowestDelta /= 40;
					}
			}

			// Adjust older deltas if necessary
			if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
					// Divide all the things by 40!
					delta  /= 40;
					deltaX /= 40;
					deltaY /= 40;
			}

			// Get a whole, normalized value for the deltas
			delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
			deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
			deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

			// Add information to the event object
			event.deltaX = deltaX;
			event.deltaY = deltaY;
			event.deltaFactor = lowestDelta;
			// Go ahead and set deltaMode to 0 since we converted to pixels
			// Although this is a little odd since we overwrite the deltaX/Y
			// properties with normalized deltas.
			event.deltaMode = 0;

			// Add event and delta to the front of the arguments
			args.unshift(event, delta, deltaX, deltaY);

			// Clearout lowestDelta after sometime to better
			// handle multiple device types that give different
			// a different lowestDelta
			// Ex: trackpad = 3 and mouse wheel = 120
			if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
			nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

			return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta() {
			lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta) {
			// If this is an older event and the delta is divisable by 120,
			// then we are assuming that the browser is treating this as an
			// older mouse wheel event and that we should divide the deltas
			// by 40 to try and get a more usable deltaFactor.
			// Side note, this actually impacts the reported scroll distance
			// in older browsers and can cause scrolling to be slower than native.
			// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
			return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}
}));
//滚动时定位插件
;(function($) {
  $.fn.scrollFix = function(height, dir) {
    height = height || 0;
    height = height == "top" ? 0 : height;
    return this.each(function() {
      if (height == "bottom") {
        height = document.documentElement.clientHeight - this.scrollHeight;
      } else if (height < 0) {
        height = document.documentElement.clientHeight - this.scrollHeight + height;
      }
      var that = $(this),
        oldHeight = false,
        p, r, l = that.offset().left;
      dir = dir == "bottom" ? dir : "top"; //默认滚动方向向下
      if (window.XMLHttpRequest) { //非ie6用fixed


        function getHeight() { //>=0表示上面的滚动高度大于等于目标高度
          return (document.documentElement.scrollTop || document.body.scrollTop) + height - that.offset().top;
        }
        $(window).scroll(function() {
          if (oldHeight === false) {
            if ((getHeight() >= 0 && dir == "top") || (getHeight() <= 0 && dir == "bottom")) {
              oldHeight = that.offset().top - height;
              that.css({
                position: "fixed",
                top: height,
                left: l
              });
            }
          } else {
            if (dir == "top" && (document.documentElement.scrollTop || document.body.scrollTop) < oldHeight) {
              that.css({
                position: "static"
              });
              oldHeight = false;
            } else if (dir == "bottom" && (document.documentElement.scrollTop || document.body.scrollTop) > oldHeight) {
              that.css({
                position: "static"
              });
              oldHeight = false;
            }
          }
        });
      } else { //for ie6
        $(window).scroll(function() {
          if (oldHeight === false) { //恢复前只执行一次，减少reflow
            if ((getHeight() >= 0 && dir == "top") || (getHeight() <= 0 && dir == "bottom")) {
              oldHeight = that.offset().top - height;
              r = document.createElement("span");
              p = that[0].parentNode;
              p.replaceChild(r, that[0]);
              document.body.appendChild(that[0]);
              that[0].style.position = "absolute";
            }
          } else if ((dir == "top" && (document.documentElement.scrollTop || document.body.scrollTop) < oldHeight) || (dir == "bottom" && (document.documentElement.scrollTop || document.body.scrollTop) > oldHeight)) { //结束
            that[0].style.position = "static";
            p.replaceChild(that[0], r);
            r = null;
            oldHeight = false;
          } else { //滚动
            that.css({
              left: l,
              top: height + document.documentElement.scrollTop
            })
          }
        });
      }
    });
  };
})(jQuery);

//jquery custom scroll 
//qwguo
//copyright www.ev123.com
(function($){
	$.fn.extend({
		cScroll : function(_j){
			return this.each(function(){
				var j = {
				  w : 12,
				  tbB : true,
				  fun : function(){}
				};
				j = $.extend(j,_j);

				var that = this,
					_this = $(that),
					Stime,
					curT = 0,
					bw = j.tbB ? j.w : 0,
					maxT = 0,
					whellPx = 0,
					Sp = 0,
					barMH = 0,
					barH = 0,
					curP = 1,
					mouseD = true,
					thatH = _this.height(),
					thatCH = _this.children().height(),
					oj = {};
				if(thatH < thatCH){	//判断内容的高度是否大于外边的高度
					addScroll();	
				}else{
					if(_this.children(".c-scrollbar").length==1){
						//_this.children(".c-scrollbar").remove();
						addScroll();
					}
				}
				function addScroll(){	//添加滚动条
					var borderW1 =j.w/2-1;
					var borderW2 = j.w-4;
					_this.addClass("c-scroll").css({overflow:"hidden",position:"relative",padding:"0px"});
					if(_this.children(".c-scrollbar").length==0){//存在性检测
						_this.wrapInner("<div class='c-scrollcon' style='top:0px;zoom:1;position:relative;z-index:1'></div>");
						_this.append('<div class="c-scrollbar" style="z-index:2; width:'+j.w+'px;"><div class="barbut-t"><em style="border-width:0px '+borderW1+'px '+borderW2+'px;"></em></div><div class="bar-m"><div class="bar-m-bg"></div><div class="bar"></div></div><div class="barbut-b"><em style="border-width:'+borderW2+'px '+borderW1+'px 0px;"></em></div><div class="c-pagenumber"><b class="num">1</b><small></small></div></div>');
					}
					oj.scrollcon = _this.children(".c-scrollcon"),
					oj.scrollbar = _this.children(".c-scrollbar"),
					oj.barButT = oj.scrollbar.children(".barbut-t"),
					oj.barM = oj.scrollbar.children(".bar-m"),
					oj.barM_bg = oj.barM.children(".bar-m-bg"),
					oj.bar = oj.barM.children(".bar"),
					oj.barButB = oj.scrollbar.children(".barbut-b");
					oj.barPageNum = oj.scrollbar.children('.c-pagenumber');
					barCount();
					_this.on({
						mouseenter : function(){
							_this.data("chover",1);
							oj.scrollbar.addClass("c-scrollbar-h");
						},
						mouseleave : function(){
							_this.data("chover",0);
							!mouseD || oj.scrollbar.removeClass('c-scrollbar-h');
						},
						mousewheel : function(event, delta, deltaX, deltaY){
							if(delta > 0){curT -= whellPx;}else{curT += whellPx;};
							setT();
							if(delta < 0){
								if(curT < maxT){
									return false;
								}
							}else{
								if(curT > 0){
									return false;
								}
							}
						}
					});
					oj.scrollbar.on({
						mouseenter : function(){
							$(this).data("chover",1);
							$(this).addClass("c-scrollbar-me");
						},
						mouseleave : function(){
							$(this).data("chover",0);
							!mouseD || $(this).removeClass('c-scrollbar-me');
						}
					});
					oj.bar.on({
						mouseenter : function(){
							$(this).data("chover",1);
							!mouseD || $(this).addClass("bar-me");
						},
						mouseleave : function(){
							$(this).data("chover",0);
							!mouseD || $(this).removeClass('bar-me');
						},
						mousedown : function(e){
							mouseD = false;
							$(this).addClass("bar-md");
							var pageY = e.pageY ,t = parseInt($(this).css("top"));
							
							$(document).mousemove(function(e2){
								curT =t+ e2.pageY - pageY;//pageY浏览器可视区域鼠标位置，screenY屏幕可视区域鼠标位置
								setT();
								return false;
							});
							$(document).mouseup(function(){
								mouseD = true;
								oj.bar.removeClass('bar-md');
								if(_this.data("chover") == 0){
									_this.trigger('mouseleave');
								}
								if(oj.scrollbar.data("chover") == 0){
									oj.scrollbar.trigger('mouseleave');
								}
								if(oj.bar.data("chover") == 0){
									oj.bar.trigger('mouseleave');
								}
								$(document).unbind();
							});
							return false;
						}
					});		
					oj.barM_bg.on({
						mousedown : function(e){
							$(this).addClass("bar-m-bg-md");
							//var cpx = e.pageY - oj.scrollbar.offset().top - barH/2 - bw;
							
							curT = e.pageY - oj.scrollbar.offset().top - barH/2 - bw;
							asetT();
							return false;

						},
						mouseup : function(){
							$(this).removeClass('bar-m-bg-md');
						}
					});		
					oj.barButT.on({
						mouseenter : function(){
							$(this).addClass("barbut-t-me");
						},
						mouseleave : function(){
							$(this).removeClass('barbut-t-me');
						},
						mousedown : function(){
							$(this).addClass("barbut-t-md");
							timeSetT('u');
							$(document).mouseup(function(){
								oj.barButT.removeClass("barbut-t-md");
								$(document).unbind();
								clearTimeout(Stime);
								Sp=0;
							});
						}
					});		
					oj.barButB.on({
						mouseenter : function(){
							$(this).addClass("barbut-b-me");
						},
						mouseleave : function(){
							$(this).removeClass('barbut-b-me');
						},
						mousedown : function(){
							$(this).addClass("barbut-b-md");
							timeSetT('d');
							$(document).mouseup(function(){
								oj.barButT.removeClass("barbut-b-md");
								$(document).unbind();
								clearTimeout(Stime);
								Sp=0;
							});
						},
						mouseup : function(){
							$(this).removeClass('barbut-b-md');
						}
					});		
				}
				function timeSetT(d){
					//var self=this;
					if(d == "u"){curT -= whellPx;}else{curT += whellPx;};
					setT();
					Sp += 2;
					var t = 500 - Sp*50;
					if(t<=0){t=0};
					Stime = setTimeout(function(){timeSetT(d);},t);
				}				
				function barCount(){
					j.fun.call(that);
					var cH = oj.scrollcon.height();
					oj.scrollbar.height(thatH);
					if(j.tbB){
						barMH = thatH - j.w * 2;
					}else{
						barMH = thatH;
						oj.barButB.css("display","none");
						oj.barButT.css("display","none");
					}
					barH = (thatH / thatCH) * barMH;
					barH = barH < 20 ? 20 : barH;
					maxT = barMH - barH;
					whellPx = barH / 4;
					oj.barM.height(barMH);
					oj.barM_bg.height(barMH);
					oj.bar.height(barH);
				}
				function setT(){
					j.fun.call(that);
					if(curT > maxT){curT = maxT;}
					if(curT < 0){curT = 0;}
					oj.bar.css({top:curT});
					var scT = (curT / maxT) * (thatCH - thatH + (thatH / 40));
					oj.scrollcon.css({top:-scT});
//					if((scT/thatH)>curP){
//						showPage();
//						curP++;
//						hidePage();
//					}
//					if((scT/thatH)<curP){
//						showPage();
//						curP--;
//						hidePage();
//						console.log(curP);
//					}
				}
				function asetT(){
					j.fun.call(that);
					if(curT > maxT){curT = maxT;}
					if(curT < 0){curT = 0;}
					oj.bar.css({top:curT});
					var scT = -(curT / maxT) * (thatCH - thatH + (thatH / 40));
					oj.scrollcon.animate({top:scT},1000);
				}	
//				function showPage(){
//					oj.barPageNum.find("b").text(curP+1);
//					oj.barPageNum.data("data-show",1);
//					oj.barPageNum.fadeIn(500);
//				}	
//				function hidePage	(){
//					console.log(1);
//					if(oj.barPageNum.data("data-show")==1){
//						oj.barPageNum.fadeOut(3000,function(){
//							console.log(2)
//							oj.barPageNum.data("data-show",0);
//						});
//					}
//				}
			});
		}
	})
})(jQuery);

//jquery alert 
jQuery.extend({
	ev_alert : function(options,backfn){
		var Opts = {
			zShow : true,
			zOpVal : 0.3,
			aW : null,
			aH : null,
			aFixed : true,
			atShow : true,
			atText : "弹窗标题",
			acIframe : false,
			acUrl : "",
			acCon : "<p>这是弹窗要显示的内容</p>"
		};
		Opts = $.extend(Opts,options);
		var winObj = {
			dW : $(document).width(),
			dH : $(document).height(),
			dSct : $(document).scrollTop(),
			wH : $(window).height(),
			wW : $(window).width()
		}
		if(Opts.zShow){
			var evShadeHtml = $('<div class="ev-shade"></div>');
			evShadeHtml.css({'opacity':0});
			$("body").append(evShadeHtml);
			evShadeHtml.animate({opacity:Opts.zOpVal},500);
		}
		var evAlert = $('<div class="ev-alert"><div class="ev-alert-title"><div class="alert-t-c"><strong class="alert-t-n">'+Opts.atText+'</strong><small class="alert-t-close" title="关闭"></small></div><span class="alert-t-l"></span><span class="alert-t-r"></span></div><div class="ev-alert-con"><span class="alert-c-l"></span><div class="alert-c-c"></div><span class="alert-c-r"></span><div class="ev-alert-loading"></div></div><div class="ev-alert-bottom"><div class="alert-b-c"></div><span class="alert-b-l"></span><span class="alert-b-r"></span></div></div>');
		if(Opts.acIframe){
			var AContent = $('<iframe frameborder="0" src="'+Opts.acUrl+'" style="width:100%; height:100%; border:none;"></iframe>');
		}else{
			var AContent = Opts.acCon;
		}
		evAlert.find('.alert-t-close').bind("click",function(){
			evAlert.animate({opacity:0,top:winObj.dSct},500,function(){
				evAlert.remove();
			})
			evShadeHtml.animate({opacity:0},500,function(){
				$(this).remove();
				$("html").css({"overflow-y":"auto","padding-right":"0px"});
			});
		});
		evAlert.find('.alert-c-c').append(AContent);
		evAlert.draggable({
			cursor: "move",
			containment: "window",
			handle:".ev-alert-title",
			scroll : false,
			helper : function(event){
			 return $('<div class="ev-alert-helper" style="width:'+$(this).width()+'px; height:'+$(this).height()+'px;"></div>');
			},
			start : function(){
			},
			stop : function(event){
				$(this).css({"left":parseInt($('div.ev-alert-helper').css("left")),"top":parseInt($('.ev-alert-helper').css("top"))});
			}
		});
		$("html").css({"overflow-y":"hidden","padding-right":"17px"})
		$("body").append(evAlert);
		whcount_1();
		var iframes = evAlert.find('iframe');
		if(iframes.length){
			iframes.load(function(){
				evAlert.find(".ev-alert-loading").remove();
				var dh = $(this).contents().height(),
					dw = $(this).contents().width(),
					aw = evAlert.find('.alert-c-l').width() + dw + evAlert.find('.alert-c-r').width(),
					ah = evAlert.find('.ev-alert-title').height() + dh + evAlert.find(".ev-alert-bottom").height(),
					aLeft = (winObj.dW-aw)/2,
					aTop = winObj.dSct+(winObj.wH-ah)/2;
				evAlert.find('.alert-c-c').css({'height':dh+'px','width':dw+'px'});
				evAlert.css({"left":aLeft+"px","top":aTop,"width":aw+"px","height":ah+"px"});
				if(backfn){
					backfn(evAlert.find('iframe'));
				}
			})
		}
		function whcount_1(){
			var aLeft = (winObj.dW-evAlert.width())/2,
				aTop = winObj.dSct+(winObj.wH-evAlert.height())/2;
			evAlert.css({"left":aLeft+"px","top":winObj.dSct+"px"});
			evAlert.animate({"opacity":1,"top":aTop});
		}
		window.show_ev_alert = evAlert;
	}
});

/*
 * jQuery css bezier animation support -- Jonah Fox
 * version 0.0.1
 * Released under the MIT license.
 */
/*
  var path = $.path.bezier({
    start: {x:10, y:10, angle: 20, length: 0.3},
    end:   {x:20, y:30, angle: -20, length: 0.2}
  })
  $("myobj").animate({path: path}, duration)

*/

;(function($){

  $.path = {};

  var V = {
    rotate: function(p, degrees) {
      var radians = degrees * Math.PI / 180,
        c = Math.cos(radians),
        s = Math.sin(radians);
      return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]];
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]];
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]];
    }
  };

  $.path.bezier = function( params, rotate ) {
    params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
    params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];

    var v14 = V.minus( this.p4, this.p1 ),
      v12 = V.scale( v14, params.start.length ),
      v41 = V.scale( v14, -1 ),
      v43 = V.scale( v41, params.end.length );

    v12 = V.rotate( v12, params.start.angle );
    this.p2 = V.add( this.p1, v12 );

    v43 = V.rotate(v43, params.end.angle );
    this.p3 = V.add( this.p4, v43 );

    this.f1 = function(t) { return (t*t*t); };
    this.f2 = function(t) { return (3*t*t*(1-t)); };
    this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
    this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

    /* p from 0 to 1 */
    this.css = function(p) {
      var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
      css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.path.arc = function(params, rotate) {
    for ( var i in params ) {
      this[i] = params[i];
    }

    this.dir = this.dir || 1;

    while ( this.start > this.end && this.dir > 0 ) {
      this.start -= 360;
    }

    while ( this.start < this.end && this.dir < 0 ) {
      this.start += 360;
    }

    this.css = function(p) {
      var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
        css = {};

      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
      css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.fx.step.path = function(fx) {
    var css = fx.end.css( 1 - fx.pos );
    if ( css.prevX != null ) {
      $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
    }
    fx.elem.style.top = css.top;
    fx.elem.style.left = css.left;
  };

})(jQuery);
//图片变灰色函数
function gray(imgObj) { 
	var canvas = document.createElement('canvas'); 
	var canvasContext = canvas.getContext('2d'); 
	
	var imgW = $(imgObj).width(); 
	var imgH = $(imgObj).height(); 
	canvas.width = imgW; 
	canvas.height = imgH; 
	canvasContext.drawImage(imgObj, 0, 0); 
	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH); 
	for(var y = 0; y < imgPixels.height; y++){ 
		for(var x = 0; x < imgPixels.width; x++){ 
			var i = (y * 4) * imgPixels.width + x * 4; 
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; 
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg; 
		} 
	} 
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height); 
		return canvas.toDataURL(); 
}
var adminPF = {
    formChekcboxAll : function(fobj,objname,tobj) {
        fobj.on({
            click : function(){
                var t = $(this),tag = true;
                if(t.prop('checked')){
                   fobj.find('input[name="'+ objname +'"]').each(function(){
                        if(!$(this).prop('checked')){
                            tag = false;
                            return false;
                        }
                    });
                }else{
                    tag = false;
                }
                tobj.attr('checked',tag);
            }
        },'input[name="'+ objname +'"]:checkbox');
        tobj.on('click',function(){
            fobj.find('input[name="'+ objname +'"]').attr('checked',tobj.prop('checked'));
        });
    },
    upDownMove : function(o,dir,fun){
        // 上下移动元素
        var p = dir == 'up' ? p = o.prev() : p = o.next(),sumIndex = o.siblings().length;
        if (o.data("animated") != 1 && p.length) {
            var ph = dir == 'up' ? -p.height() : p.height(),
                oh = dir == 'up' ? o.height() : -o.height();
            o.data("animated", 1).animate({"top": ph}, 500);
            p.data("animated", 1).animate({"top": oh}, 500);
            setTimeout(function() {
                if(typeof fun == 'function') fun();
                o.removeData("animated").css({"top": ""});
                p.removeData("animated").css({"top": ""});
                if(dir == 'up'){
                    if(o.index() == 1){
                        o.find('.up-icon').hide();
                        p.find('.up-icon').show();
                    }
                    if(o.index() == sumIndex){
                        o.find('.down-icon').show();
                        p.find('.down-icon').hide();
                    }
                }else{
                    if(o.index() == sumIndex-1){
                        o.find('.down-icon').hide();
                        p.find('.down-icon').show();
                    }
                    if(o.index() == 0){
                        o.find('.up-icon').show();
                        p.find('.up-icon').hide();
                    }
                }
                var _o = o;
                o.remove();
                dir == 'up' ? p.before(_o) : p.after(_o);
            }, 1000);
        }
    },
    previewImage : function(file,tagObj) {
        if (file.files && file.files[0]) {
            var img = $('<img class="create-img">'),
                reader = new FileReader();
            tagObj.html(img);
            reader.onload = function(evt) {
                img.attr('src', evt.target.result);
            }
            reader.readAsDataURL(file.files[0]);
        }
    },
    getZIndex : function(){
		var zindex = Math.max.apply(null, $.map($('body > *'), function(e, n) {
			var z = parseInt($(e).css('z-index'));
			if(z == 2147483647){
				z = 1000;
			}
			return z || 1000;
		}));
		return zindex+1;
	}
};