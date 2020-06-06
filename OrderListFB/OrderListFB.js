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
//console.log(groupKeyRef);


// ======================
// 구현해야할 것: 처음에 firebase에서 orderList 받아오기
// ==========================

$( document ).ready(function() {
  firebase.initializeApp(firebaseConfig);

  //append one item from firebase
  var groupKeyRef = firebase.database().ref("user").child("KSW").child("join").child("exampleKey");
  var groupKey;
  groupKeyRef.once('value', function(snapshot) {
	  var myValue = snapshot.val();
	  groupKey = myValue.groupKey; //access groupKey under user
	  var groupRef = firebase.database().ref("groups").child(groupKey);
	  groupRef.once('value', function(snapshot) {
		  var myValue2 = snapshot.val();
		  //add item according to firebase
		  $('<li class="ongoingProduct" id=' + 'exampleKey2' + '>' +
			  '<a class="ongoingProductLink" href=' +myValue2.url +'>' +
			  '<dl>' +
			  '<div class="with-bg-size" style="background-image: url(' + myValue2.imageurl + ');"></div>' +
			  '<div class="progress-container">' +
			  '<div class="progressbar" style="width: 20%;"></div></div>' +
			  '<dd class="descriptions">' +
			  '<div class="badges">' +
			  '<p class="progressPercent">' + (myValue2.currentamount/myValue2.endamount)*100 + '%' + '</p>' +
			  '<p class="progressPercent"><i class="fas fa-user"></i>' + myValue2.currentamount + ' people' + '</p>' +
			  '<p class="progressNote">' + myValue2.enddate +'</p></div>' +
			  '<div class="name">' + myValue2.name + '</div>' +
			  '<div class="location">' +
			  '<i class="fas fa-map-marker-alt"></i>' +' '+ myValue2.pickupplace + '</div>' +
			  '<div class="price-area">' +
			  '<div class="price-wrap">' +
			  '<span class="prev-cost">' + 'previous cost' + '</span>' +
			  '<span class="cost">' + myValue2.price+ ' won' + '</span></div></dd></dl></a>' +
			  '<div class="deleteBtn">Cancel</div></li>').appendTo("#ongoingList");
		});
  });
    

  //del button click events
  $(document).on("click", ".deleteBtn", function() { //del button click events

    var n = this.parentNode.id; //the id is the key to delete; for now: exampleKey2
    console.log("delete", n);
    var check = confirm("Are you sure to cancel "+n+"?");
    if(check){
      $("#"+n).remove();
	//remove item from firebase
	firebase.database().ref("user").child("KSW").child("join").child(n).remove();
    }

    // ==========================
    // 구현해야할 것: 처음에 firebase에서 아이템 삭제
    // ==========================
	

  });

  $(".ongoingProduct").mouseover(function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");}); // 
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
