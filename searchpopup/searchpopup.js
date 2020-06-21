// Your web app's Firebase configuration
/*
var firebaseConfig = {
    apiKey: "AIzaSyBjFa6ITtLwyYNPwAt9YWZx0crJviZYj8g",
    authDomain: "cs374-d.firebaseapp.com",
    databaseURL: "https://cs374-d.firebaseio.com",
    projectId: "cs374-d",
    storageBucket: "cs374-d.appspot.com",
    messagingSenderId: "774674175555",
    appId: "1:774674175555:web:fcf3a66700feb62352a6f6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref('/images/');
*/
//test values

function makesearchpopup(pkey) {
    console.log('click')
    productKey = pkey
    popup = document.createElement('div')
    popup.setAttribute('id', 'searchpopup')
    document.body.appendChild(popup)
        /*$('#searchpopup').append("\
        <button id='close' onclick='close_searchpopup()'>\
        </button>\
        <img id='productimg' />\
        <div id='infobox'>\
            <div id='productname'></div>\
            <div id='progress'></div>\
            <div id='bar'></div>\
            <div id='pickupplace'></div>\
            <div id='date'>3 days left</div>\
            <div id='searchprice'></div>\
            <div id='searchurl'>default url</div>\
        </div>\
        <div id='control'>\
            <input type='text' id='amount'></input>\
            <input type='button' class='controller' id='up' onclick='up()'></input>\
            <input type='button' class='controller' id='down' onclick='down()'></input>\
            <input type='button' id='add' value='Add' onclick='addProduct(" + productKey + ")'></input>\
        </div>*/
    $('#searchpopup').append("<button id='close' onclick='close_searchpopup()'></button>" +
        "<img id='productimg' />" +
        "<div id='infobox'>" +
        "<div id='productname'></div>" +
        "<div id='progress'></div>" +
        "<div id='bar'></div>" +
        "<div id='pickupplace'></div>" +
        "<div id='date'>3 days left</div>" +
        "<div id='searchprice'></div>" +
        "<div id='searchurl'>default url</div>" +
        "</div>" +
        "<div id='control'>" +
        "<input type='text' id='amount' value=1></input>" +
        "<input type='button' class='controller' id='up' onclick='up()' value='+'></input>" +
        "<input type='button' class='controller' id='down' onclick='down()' value='-'></input>" +
        "<input type='button' id='add' value='Add' onclick=addProduct('" + productKey + "')></input>" +
        "</div>"
    );

    initialize()
    getInfo(productKey)
}

function initialize() {
    var d = new Date()
    $('#amount').val(1);
}

function up() {
    cval = Number($('#amount').val());
    $('#amount').val(cval + 1);
}

function down() {
    cval = Number($('#amount').val());
    if (cval > 1) $('#amount').val(cval - 1);
}

var endamount;

function getInfo(key) {
    return firebase.database().ref('/groups/').once('value').then(function(snapshot) {
        var myValue = snapshot.val();
        var myInfo = myValue[key]
        var name = myInfo.name
        var enddate = myInfo.enddate
        endamount = myInfo.endamount
        var pickupplace = myInfo.pickupplace
        var price = myInfo.price
        var unit = myInfo.unit
        var imageurl = myInfo.imageurl
        var url = myInfo.url
        var currentamount = myInfo.currentamount
        var w
        if (endamount) { w = (currentamount / endamount) * 500 } else { w = 500 }
        var datemsg
        if (enddate) { datemsg = 'End date: ' + enddate } else { datemsg = 'No end date' }

        $('#productname').html(name)
<<<<<<< HEAD
        $('#pickupplace').html(pickupplace)
        $('#searchprice').html(price + '/' + unit)
        $('#date').html(datemsg)
        $('#searchurl').html(url)
=======
        $('#pickupplace').html('<i class="fas fa-map-marker-alt"></i>  '+pickupplace)
        $('#price').html(price + '/' + unit)
        $('#date').html('<i class="fas fa-calendar-day"></i>  '+datemsg)
        $('#searchurl').html('<a href='+url+' target="_blank">'+url+'</a>')
>>>>>>> 0e058de8acba0316c443faf93ec1cc85b54512da
        $('#productimg').attr('src', imageurl);
        $('#bar').css('width', w);
        $('#progress').html(endamount);
        $('#bar').html(currentamount);
    })
}

function addProduct(key) {
    var amount = Number($('#amount').val())
    return firebase.database().ref('/user/' + now_ID).once('value').then(function(snapshot) {
        var userValue = snapshot.val();
        var makeList = userValue['make'];
        var joinList = userValue['join'];
        if (makeList) {
            var makeKeys = Object.keys(makeList);
            for (var i = 0; i < makeKeys.length; i++) {
                var productkey = makeKeys[i];
                var productcode = makeList[productkey].value;
                if (productcode == key) {
                    alert("You made this group buying")
                    return
                }
            }
        }
        if (joinList) {
            var joinKeys = Object.keys(joinList);
            for (var i = 0; i < joinKeys.length; i++) {
                var productkey = joinKeys[i]
                var productcode = joinList[productkey].value;
                if (productcode == key) {
                    alert("You already joined this group buying")
                    return
                }
            }
        }

        return firebase.database().ref('/groups/').once('value').then(function(snapshot) {
            var myValue = snapshot.val();
            var myInfo = myValue[key];
            var currentamount = Number(myInfo.currentamount);
            var ref = firebase.database().ref('/groups/' + key)
            currentamount = currentamount + amount
            if (currentamount > endamount) {
                alert("Exceed the available amount")
            } else {
                ref.update({ currentamount: currentamount })
                if (currentamount == endamount) {
                    ref.update({ complete: 'true' })
                }
                var userKey = firebase.database().ref('/user/' + now_ID + '/join/').push();
                userKey.set({ value: key, amount: amount })
                alert("You successfully joined a group buying!")
                close_searchpopup();
            }
        })
    })
}

function close_searchpopup() {
    var element = document.getElementById('searchpopup');
    element.parentNode.removeChild(element);
}