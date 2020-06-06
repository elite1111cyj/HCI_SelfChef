// Your web app's Firebase configuration
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
var curfile;

window.onload = function() {
    initialize()
}


$(function() {
    $('#dateselectinput').datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $('#setdate').datepicker({
        dateFormat: 'yy-mm-dd'
    });
});

$('#dateselect').change(function() {
    if ($(this).is(':checked')) {
        $('#dateselectinput').attr('disabled', false);
    } else {
        $('#dateselectinput').attr('disabled', true);
    }
});
$('#amountselect').change(function() {
    if ($(this).is(':checked')) {
        $('#amountselectinput').attr('disabled', false);
    } else {
        $('#amountselectinput').attr('disabled', true);
    }
});


function initialize() {
    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }

    var d = new Date()
    var s = 'ex) ' + d.getFullYear() + '-' + leadingZeros((d.getMonth() + 1), 2) + '-' + leadingZeros(d.getDate(), 2)

    $('#dateselectinput').attr('placeholder', s)
    $('#setdate').attr('placeholder', s)
}

function onclicked() {

    //need to talk more about the DB structure..
    //this code is just pushing into the 'full' list. need to push into 'user' list too.
    //make sure that the pickup date is later than due date!
    var newKey = firebase.database().ref('/groups/').push();
    var storageRef = firebase.storage().ref(newKey.key);
    task = storageRef.put(curfile);
    task.then(function() {
        storageRef.getDownloadURL().then(function(imageurl) {
            console.log(imageurl)
            var name = $("#name").val()
            var tag = $("#tag").val()
            var url = $("#url").val()
            var enddate = $('#dateselectinput').val()
            var endamount = $('#amountselectinput').val()
            var pickupdate = $('#setdate').val()
            var pickupplace = $('#setplace').val()
            var category = $('#categorysearch').val()
            var price = $('#priceper').val()
            var unit = $('#unit').val()
                //need to check if there is any blank!
            newKey.set({
                name: name,
                tag: tag,
                url: url,
                enddate: enddate,
                endamount: endamount,
                pickupdate: pickupdate,
                pickupplace: pickupplace,
                imageurl: imageurl,
                category: category,
                price: price,
                unit: unit
            });

            alert("You successfully made a new group buying!")
            close();
        })
    })
}

function close() {
    //close the popup window and go back to the original state
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            //need to crop
            $('#image').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageholder").change(function() {
    readURL(this);
});

var fileButton = document.getElementById("imageholder");

fileButton.addEventListener('change', function(e) {
    curfile = e.target.files[0];
});

function makepopup() {

}