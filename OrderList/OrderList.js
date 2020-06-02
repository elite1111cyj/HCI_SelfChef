// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {

  $(document).on("click", ".deleteBtn", function() { //del button click events
    var n = this.parentNode.id;
    console.log("delete", n);
    var check = confirm("Are you sure to cancel "+n+"?");
    if(check){
      $("#"+n).remove();
    }
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
