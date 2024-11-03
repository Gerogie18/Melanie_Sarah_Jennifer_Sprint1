// Name: SD 12 group: Melanie
// Date: Nov 1, 2024
// Description: Add ghost to chase cursor



$(document).ready(function(){
  $(document).mousemove(function(e){
    $('.ghost').css('left',e.pageX+"px");
    $('.ghost').css('top',e.pageY+"px");
  });
});