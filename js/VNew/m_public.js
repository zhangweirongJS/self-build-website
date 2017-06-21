/**
 * Created by qiangxl on 2017/2/20.
 */
$(function(){
  $(".catalogList").each(function(){
    $(this).height($(this).parent().height());
    $(this).width($(this).parent().width());
  });
  $(".catalogList dt em").on("click",function(){
    if($(this).hasClass("open")){
      $(this).parent().next("dd").hide();
      $(this).addClass("close");
      $(this).removeClass("open");
      console.log(2);
    }else{
      console.log(1);
      $(this).parent().next("dd").show();
      $(this).removeClass("close");
      $(this).addClass("open");
    }
    var pcata = $(this).parents(".catalogList");
    if(pcata.height() < pcata.children("dl").height() || parseInt(pcata.children("dl").css("margin-top"),10) < 0){
      pcata.find(".but").show();
    }else{
      pcata.find(".but").hide();
    }
  });

  $(".catalogList").live("mouseenter",function(){
    var dl = $(this).children("dl");
    var dl_H = dl.height();
    var t_H = $(this).height();
    if(dl_H > t_H || parseInt(dl.css("margin-top"),10)<0){
      $(this).find(".but").show();
    }
    $(this).find(".downBut").click(function(){
      var dl_T = Math.abs(parseInt(dl.css("margin-top"),10));
      var dl_sH = dl.height() - dl_T;
      if((dl_sH-t_H)>0){
        if(dl.is(':animated')==false){
          dl.animate({marginTop:-(dl_T+t_H/3)},500);
        }
      }
    });
    $(this).find(".upBut").click(function(){
      var dl_T = Math.abs(parseInt(dl.css("margin-top"),10));
      if(dl_T>0){
        if(dl.is(':animated')==false){
          dl.animate({marginTop:-(dl_T-t_H/3)},500);
        }
      }
    });
  });
  $(".catalogList").live("mouseleave",function(){
    $(this).find(".but").hide();
  });
});


function tj_zhuce() {
  window.location.href="/dom/zhuce.php?username="+ user_name;
}