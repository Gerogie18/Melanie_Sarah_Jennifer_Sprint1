$(document).ready(function(){
  $(document).mousemove(function(e){
    $('.ghost').css('left',e.pageX+"px");
    $('.ghost').css('top',e.pageY+"px");
  });
});