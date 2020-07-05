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
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}



/*
now_ID=location.href.split("?",2)[1];
console.log(now_ID);
document.getElementById("My_Name").innerHTML = now_ID
function go_mainpage(){
    location.href = "../MainPage_all/MainPage.html?" + now_ID
}
function go_myorderlist() {
    location.href = "../OrderList/OrderList.html?" + now_ID
}
*/

var daysLeft = function(input) {
    var inputDate = parseDate(input);
    var today = new Date();
    var timeDiff = inputDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};


var now_ID = location.href.split("?", 2)[1];

function go_mainpage() {
    location.href = "../MainPage_all/MainPage.html?" + now_ID
}

function go_myorderlist() {
    location.href = "../OrderList/OrderList.html?" + now_ID
}
var orderProList;
var preorderProList;

//firebase.initializeApp(firebaseConfig);
//groupKeyRef = firebase.database().ref("groups").child("example"); //this is the reference
//console.log(groupKeyRef);


// ======================
// ????????? ??: o???? firebase???? orderList ??????
// ==========================

$(document).ready(function() {

    document.getElementById("My_Name").innerHTML = now_ID


    $('<div class="loader"></div>').appendTo("#ongoingList");
    $('<div class="loader"></div>').appendTo("#prevList");

    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('/user').child(now_ID).once('value', function(snapshot) {
        var mySnapshot = snapshot.val();
        var myMake = [];
        var myJoin = [];

        if ('make' in mySnapshot) {
            myMake = mySnapshot.make;
        }
        if ('join' in mySnapshot) {
            myJoin = mySnapshot.join;
        }
        //var myMake = mySnapshot.make;
        //var myJoin = mySnapshot.join;

        var keyListMake = Object.keys(myMake); //this is exampleKey, exampleKey3, ...
        var keyListJoin = Object.keys(myJoin);

        var keyList = []; //keyList is keyListMake + keyListJoin
        keyList = keyListMake.concat(keyListJoin);

        ans_list = [];
        for (var i = 0; i < keyList.length; i++) {
            if (i < keyListMake.length) {
                var groupKey = myMake[keyList[i]].value; //access groupKey under user
            } else {
                var groupKey = myJoin[keyList[i]].value; //access groupKey under user
            }
            var groupRef = firebase.database().ref("groups").child(groupKey);
            groupRef.once('value', function(snapshot) {
                //from here, youngjae
                var cur = snapshot.val(); //keyList[i] is the key, cur is the object


                var originPrice = parseFloat(cur.price);
                var price = formatter.format(originPrice);

                var duedate = daysLeft(cur.enddate);
                if (duedate <= 0) {
                    duedate = "Finished!";
                } else {
                    duedate += " days left";
                }

                //check if cur.complete is "false"
                if (!cur.complete) {
                    //add item according to firebase
                    l_contents = '<dl>'
                    if(cur.host == 'youngjae'){
                        l_contents += '<div class="HostBadge"> Host&nbsp<i class="fas fa-user"></i> </div>'
                    }

                    l_contents += '<div class="with-bg-size" style="background-image: url(' + cur.imageurl + ');"></div>' +
                    '<div class="progress-container">' +
                    '<div class="progressbar" style="background-color: #556EE6; width:' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%"></div></div>' +
                    '<dd class="descriptions">' +
                    '<div class="badges">' +
                    '<p class="progressPercent">' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '% &nbsp&nbsp' + '</p>' +
                    '<p class="progressPercent"><i class="fas fa-user"></i>&nbsp' + cur.currentamount + ' joined' + '</p>' +
                    '<p class="progressNote">' + cur.enddate + '</p></div>' +
                    '<p class="progressNote" style="color: #32CD32">Complete!</p></div>' +
                    '<div class="name">' + cur.name + '</div>' +
                    '<div class="location">' +
                    '<i class="fas fa-map-marker-alt"></i>' + ' ' + cur.pickupplace + '</div>' +
                    '<div class="price-area">' +
                    '<div class="price-wrap">' +
                    '<span class="prev-cost">' + 'your final price is' + '</span>' +
                    '<span class="cost">' + price + '</span></div></dd></dl></a></li>';

                    $('<li class="ongoingProduct" id="' + snapshot.key + '"' + '>' +
                        //'<a class="ongoingProductLink" href=' + cur.url + '>' +
                        l_contents).appendTo("#ongoingList");
                    //orderProList.push([cur.question, cur.input, cur.ans, cur.ox]);

                } //end of "check if complete is false"
                else { //if cur.complete is "true"
                    l_contents = '<dl>'
                    if(cur.host == 'youngjae'){
                        l_contents += '<div class="InfoAsk"> Enter the Info! </div>'
                    }

                    l_contents += '<div class="with-bg-size" style="background-image: url(' + cur.imageurl + ');"></div>' +
                    '<div class="progress-container">' +
                    '<div class="progressbar" style="background-color: #556EE6; width:' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%"></div></div>' +
                    '<dd class="descriptions">' +
                    '<div class="badges">' +
                    '<p class="progressPercent">' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '% &nbsp&nbsp' + '</p>' +
                    '<p class="progressPercent"><i class="fas fa-user"></i>&nbsp' + cur.currentamount + ' joined' + '</p>' +
                    '<p class="progressNote">' + cur.enddate + '</p></div>' +
                    '<p class="progressNote" style="color: #32CD32">Complete!</p></div>' +
                    '<div class="name">' + cur.name + '</div>' +
                    '<div class="location">' +
                    '<i class="fas fa-map-marker-alt"></i>' + ' ' + cur.pickupplace + '</div>' +
                    '<div class="price-area">' +
                    '<div class="price-wrap">' +
                    '<span class="prev-cost">' + 'your final price is' + '</span>' +
                    '<span class="cost">' + price + '</span></div></dd></dl></a></li>';

                    //add item according to firebase
                    $('<li class="ongoingProduct" id="' + snapshot.key + '"' + ' onclick=makedealsuccesspopup(this.id)>' +
                        //'<a class="ongoingProductLink" href=' + cur.url + '>' +
                        l_contents).appendTo("#prevList");

                } //end of "if cur.complete is true"

            }); //end of groupRef.once
        } //end of for loop
        $(".loader").remove();
    }); //end of firebase ref on
    //del button click events
    $(document).on("click", ".deleteBtn", function() { //del button click events

        var n = this.parentNode.id; //the id is the key to delete; for now: exampleKey2
        nameofpurchase = this.parentNode.innerHTML.split("name\">", 2)[1].split("<")[0]

        var check = confirm("Are you sure you want to cancel the deal on " + nameofpurchase + "?");
        if (check) {
            $("#" + n).remove();
            //remove item from firebase
            firebase.database().ref('/user').child(now_ID).child("join").on('value', function(snapshot) {
                var mySnapshot = snapshot.val();

                if (mySnapshot) {
                    var keyList = Object.keys(mySnapshot);
                    //console.log(mySnapshot)
                    for (var i = 0; i < keyList.length; i++) {
                        //console.log(keyList[i])
                        if (mySnapshot[keyList[i]]["value"] == n) {
                            //console.log(mySnapshot[keyList[i]]["value"])
                            var buyamount = mySnapshot[keyList[i]]["amount"]
                            var ref = firebase.database().ref('/groups/')
                            ref.once('value').then(function(snapshot) {
                                var myValue = snapshot.val();
                                var myInfo = myValue[n];
                                curamount = Number(myInfo.currentamount)
                                firebase.database().ref('/groups/' + n).update({ currentamount: curamount - buyamount })
                            })
                            firebase.database().ref('user/' + now_ID + "/join/" + keyList[i]).remove()
                            return
                        }
                    }
                }
            })
            firebase.database().ref('/user').child(now_ID).child('make').on('value', function(snapshot) {
                    var sshot = snapshot.val();
                    if (sshot) {
                        var keyList = Object.keys(sshot);
                        for (var i = 0; i < keyList.length; i++) {
                            if (sshot[keyList[i]]["value"] == n) {
                                firebase.database().ref('user/' + now_ID + "/make/" + keyList[i]).remove()
                                firebase.database().ref('/groups/' + n).remove()
                            }
                        }
                    }
                })
                //firebase.database().ref("user").child(now_ID).child("join").child(n).remove();
        }
        // ==========================
        // >>> Delete element in firebase db
        // ==========================

    });


    //$(".ongoingProduct").mouseover(function(){$(this).css("box-shadow", "0px 0px 22px -6px gray");}); //
    //$(".ongoingProduct").mouseleave(function(){$(this).css("box-shadow", "0px 0px 0px 0px gray");});
    $(document).on("mouseover", ".ongoingProduct", function() {
        $(this).css("box-shadow", "0px 0px 22px -6px gray");
    });
    $(document).on("mouseleave", ".ongoingProduct", function() {
        $(this).css("box-shadow", "0px 0px 0px 0px gray");
    });

    now_ID = location.href.split("?", 2)[1]




    // ==========================
    // ????????? ??: ?????? ?????
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