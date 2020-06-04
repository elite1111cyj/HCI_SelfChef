// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var firebaseConfig = {
    apiKey: "AIzaSyBjFa6ITtLwyYNPwAt9YWZx0crJviZYj8g",
    authDomain: "cs374-d.firebaseapp.com",
    databaseURL: "https://cs374-d.firebaseio.com",
    projectId: "cs374-d",
    storageBucket: "cs374-d.appspot.com",
    messagingSenderId: "774674175555",
    appId: "1:774674175555:web:fcf3a66700feb62352a6f6"
};

//firebase.initializeApp(firebaseConfig);
//groupKeyRef = firebase.database().ref("groups").child("example"); //this is the reference
//consoe.log(groupKeyRef);


// ======================
// 구현해야할 것: 처음에 firebase에서 orderList 받아오기

// ==========================

$( document ).ready(function() {

  $(document).on("click", ".deleteBtn", function() { //del button click events
    var n = this.parentNode.id;
    console.log("delete", n);
    var check = confirm("Are you sure to cancel "+n+"?");
    if(check){
      $("#"+n).remove();
    }

    // ==========================
    // 구현해야할 것: 처음에 firebase에서 아이템 삭제
    // ==========================

  });

  $(".ongoingProduct").mouseover(function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");}); // 마우스 오버시 효과
  $(".ongoingProduct").mouseleave(function(){$(this).css("box-shadow", "0px 0px 0px 0px gray");});



  // ==========================
  // 구현해야할 것: 아이템 필터링
  // ==========================



  // ==========================
  // 구현해야할 것: remaining time 동적으로 똑딱똑딱 가는거 구현?
  // ==========================





/*
  $(document).on('mouseenter', '.ongoingProduct', function(e) {
    $(e.target).attr('style', "box-shadow: 0px 0px 22px -6px gray");
  });
  $(document).on('mouseleave', '.ongoingProduct', function(e) {
    $(e.target).attr('style', "box-shadow: 0");
  });
*/
});
