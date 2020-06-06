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

var formatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month, day)
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}
var daysLeft = function(input) {
    var inputDate = parseDate(input);
    var today = new Date();
    var timeDiff = inputDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000*3600*24));
};

//firebase.initializeApp(firebaseConfig);
//groupKeyRef = firebase.database().ref("groups").child("example"); //this is the reference
//console.log(groupKeyRef);


// ======================
// �����ؾ��� ��: ó���� firebase���� orderList �޾ƿ���
// ==========================

$( document ).ready(function() {
  firebase.initializeApp(firebaseConfig);

  //append one item from firebase
  var groupKeyRef = firebase.database().ref("user").child("KSW").child("join").child("exampleKey");
  var groupKey;
  groupKeyRef.once('value', function(snapshot) {
	  var myValue = snapshot.val();
    console.log(myValue);
	  groupKey = myValue.groupKey; //access groupKey under user
	  var groupRef = firebase.database().ref("groups").child(groupKey);
	  groupRef.once('value', function(snapshot) {
		  var myValue2 = snapshot.val();
      var originPrice = parseFloat(myValue2.price);
      var price = formatter.format(originPrice);

      var duedate = daysLeft(myValue2.enddate);
      if(duedate<=0){
        duedate = "Finished!";
      }
      else{
        duedate+=" days left";
      }

		  //add item according to firebase
		  $('<li class="ongoingProduct" id=' + 'exampleKey2' + '>' +
			  '<a class="ongoingProductLink" href=' +myValue2.url +'>' +
			  '<dl>' +
			  '<div class="with-bg-size" style="background-image: url(' + myValue2.imageurl + ');"></div>' +
			  '<div class="progress-container">' +
			  '<div class="progressbar" style="width:'+((myValue2.currentamount/myValue2.endamount)*100).toFixed(1)+'%"></div></div>' +
			  '<dd class="descriptions">' +
			  '<div class="badges">' +
			  '<p class="progressPercent">' + ((myValue2.currentamount/myValue2.endamount)*100).toFixed(1) + '%' + '</p>' +
			  '<p class="progressPercent"><i class="fas fa-user"></i>' + myValue2.currentamount + ' joined' + '</p>' +
			  '<p class="progressNote">' + myValue2.enddate +'</p></div>' +
        '<p class="progressNote">' + duedate +'</p></div>' +
			  '<div class="name">' + myValue2.name + '</div>' +
			  '<div class="location">' +
			  '<i class="fas fa-map-marker-alt"></i>' +' '+ myValue2.pickupplace + '</div>' +
			  '<div class="price-area">' +
			  '<div class="price-wrap">' +
			  '<span class="prev-cost">' + 'now the price is' + '</span>' +
			  '<span class="cost">' + price+ '</span></div></dd></dl></a>' +
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
    // �����ؾ��� ��: ó���� firebase���� ������ ����
    // ==========================


  });

  //$(".ongoingProduct").mouseover(function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");}); //
  //$(".ongoingProduct").mouseleave(function(){$(this).css("box-shadow", "0px 0px 0px 0px gray");});
  $(document).on("mouseover", ".ongoingProduct", function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");});
  $(document).on("mouseleave", ".ongoingProduct", function(){$(this).css("box-shadow", "0px 0px 0px 0px gray");});



  // ==========================
  // �����ؾ��� ��: ������ ���͸�
  // ==========================



  // ==========================
  // �����ؾ��� ��: remaining time �������� �ȵ��ȵ� ���°� ����?
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
