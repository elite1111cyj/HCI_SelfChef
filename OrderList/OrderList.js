// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  $(".deleteBtn").click(function(){ // click button event
    alert("delete btn clicked!");
  });
  $(".ongoingProduct").mouseover(function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");});
  $(".ongoingProduct").mouseleave(function(){$(this).css("box-shadow", "0px 0px 0px 0px gray");});
/*
  $(document).on('mouseenter', '.ongoingProduct', function(e) {
    $(e.target).attr('style', "box-shadow: 0px 0px 22px -6px gray");
  });
  $(document).on('mouseleave', '.ongoingProduct', function(e) {
    $(e.target).attr('style', "box-shadow: 0");
  });
*/
});
