//[start] upper bar//
now_ID = location.href.split("?", 2)[1]

document.getElementById("My_Name").innerHTML = now_ID

function go_mainpage() {
    location.href = "/MainPage_all/MainPage.html?" + now_ID
}
function go_myorderlist() {
    location.href = "/OrderList/OrderList.html?" + now_ID
}
function go_search() {
    return
}

$(document).ready(function() {
  $('<div class="loader"></div>').appendTo("#ongoingList");

  firebase.initializeApp(firebaseConfig);
  firebase.database().ref('/groups').on('value', function(snapshot) {
    var myValue = snapshot.val();
    console.log("myValue", keyList);
    var keyList = Object.keys(myValue);
    console.log("myValue", keyList);
    ans_list = [];
    for (var i = 0; i < keyList.length; i++) {
      var cur = myValue[keyList[i]];

      var originPrice = parseFloat(cur.price);
      var price = formatter.format(originPrice);

      var duedate = daysLeft(cur.enddate);
      if (duedate <= 0) {
        duedate = "Finished!";
      } else {
        duedate += " days left";
      }
      //add item according to firebase
      $('<li class="ongoingProduct" id=' + 'exampleKey2' + '>' +
        '<a class="ongoingProductLink" href=' + cur.url + '>' +
        '<dl>' +
        '<div class="with-bg-size" style="background-image: url(' + cur.imageurl + ');"></div>' +
        '<div class="progress-container">' +
        '<div class="progressbar" style="width:' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%"></div></div>' +
        '<dd class="descriptions">' +
        '<div class="badges">' +
        '<p class="progressPercent">' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%' + '</p>' +
        '<p class="progressPercent"><i class="fas fa-user"></i>' + cur.currentamount + ' joined' + '</p>' +
        '<p class="progressNote">' + cur.enddate + '</p></div>' +
        '<p class="progressNote">' + duedate + '</p></div>' +
        '<div class="name">' + cur.name + '</div>' +
        '<div class="location">' +
        '<i class="fas fa-map-marker-alt"></i>' + ' ' + cur.pickupplace + '</div>' +
        '<div class="price-area">' +
        '<div class="price-wrap">' +
        '<span class="prev-cost">' + 'now the price is' + '</span>' +
        '<span class="cost">' + price + '</span></div></dd></dl></a>' +
        '<div class="deleteBtn">Cancel</div></li>').appendTo("#ongoingList");
      //orderProList.push([cur.question, cur.input, cur.ans, cur.ox]);
    }
    $( ".loader" ).remove();
  });

  //del button click events
  $(document).on("click", ".deleteBtn", function() { //del button click events

    var n = this.parentNode.id; //the id is the key to delete; for now: exampleKey2
    console.log("delete", n);
    var check = confirm("Are you sure to cancel " + n + "?");
    if (check) {
      $("#" + n).remove();
      //remove item from firebase
      firebase.database().ref("user").child("KSW").child("join").child(n).remove();
    }
    // ==========================
    // >>> Delete element in firebase db
    // ==========================
  });

  $(document).on("mouseover", ".ongoingProduct", function() {
    $(this).css("box-shadow", "0px 0px 22px -6px gray");
  });
  $(document).on("mouseleave", ".ongoingProduct", function() {
    $(this).css("box-shadow", "0px 0px 0px 0px gray");
  });

  now_ID=location.href.split("?",2)[1]

});
