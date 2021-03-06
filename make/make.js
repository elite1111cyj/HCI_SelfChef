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
var curfile = null;
let input, hashtagArray, container, t;

window.onload = function() {
        initialize()
        $('<div class="loader"></div>').appendTo("#loadingarea");

    }
    /*
    function go_makenewgroup() {
        console.log('popup')
        document.getElementById("makepopup").style.display = 'inline'
    }
    */
function go_makenewgroup() {
    $('#button_makegb').attr('disabled', true)
    popup = document.createElement('div')
    popup.setAttribute('id', 'makepopup')
    document.body.appendChild(popup)
    $('#makepopup').append(
        "<div id='title'>Make a new Group Buying</div>" + "\
    <button id='close' onclick='close_makenewgroup()'>\
    </button>\
    <div id='info'><b>Information</b>\
        <div id = 'info_help' class = 'help-tip'>\
        <p>Give the product information\
        <br> - Hash tag: People can reach your group buying by searching for the hash tag you wrote\
        <br> - Price info: Please set the unit of buying and the price per unit \
        </p>\
        </div>\
        <input type='text' placeholder='Product Name' id='name'></input>\
        <input type='text' placeholder='Hash Tags ex) #fresh #onion #marketkurly' id='tag'></input>\
        <input type='text' placeholder='Product Link (optional)' id='url'></input>\
        <input type='file' accept='img/*' id='imageholder'></input>\
        <img id='image' src='#' />\
        <select id='categorysearch' name='category'>\
            <option value='default'>Select category</option>\
            <option value='fruit'>fruit</option>\
            <option value='vegetable'>vegetable</option>\
            <option value='fish'>fish</option>\
            <option value='meat'>meat</option>\
            <option value='dairy'>dairy</option>\
            <option value='health'>health</option>\
            <option value='rice'>rice</option>\
        </select>\
        <div id='price'>\
            <div id='pricetext'>Price info: </div>\
            <input type='text' placeholder='price ex)6000 won' id='priceper'></input>\
            <div id='slash'>/</div>\
            <input type='text' placeholder='unit ex)kg' id='unit'></input>\
        </div>\
    </div>\
    <div id='select'>\
        <div id = 'select_text'>Set due date & target amount</div>\
        <div id = 'select_help' class = 'help-tip'>\
        <p>Set the due date or target amount.\
            <br> If you choose the due date, it will automatically end after the date. Due date has to be same or later than tody. \
            <br> If you chosse the target amount, it will automatically end if the target amount is reached.\
            <br> You can choose both or only one\
        </p>\
        </div>\
        <input type='checkbox' name='endselect' value='Date' id='dateselect' checked>\
        <div id='dateselecttext'><b>Ends with due date</b></div>\
        <input type='checkbox' name='endselect' value='Amount' id='amountselect'>\
        <div id='amountselecttext'><b>Ends with num of target amount</b></div>\
        <input type='text' placeholder='Due date' id='dateselectinput'></input>\
        <input type='text' placeholder='Target amount ex) 10' id='amountselectinput' disabled='true'></input>\
    </div>\
    <div id='set'>Set the pick up information\
        <div id = 'set_help' class = 'help-tip'>\
        <p>Set the pick up information\
        <br> You can later set the 'detailed' pickup place and time.\
        </p>\
        </div>\
        <input type='text' placeholder='Pick up date' id='setdate'></input>\
        <input type='text' placeholder='Pick up place ex) Eo-eun dong' id='setplace'></input>\
    </div>\
    <div id='loadingarea'></div>\
    <button type='submit' id='submit' onclick='makeclicked()'>Submit</button>\
        ")
    $("#imageholder").change(function() {
        readURL(this);
    });
    initialize()
    var fileButton = document.getElementById("imageholder");

    fileButton.addEventListener('change', function(e) {
        curfile = e.target.files[0];
    });
    $(function() {
        $('#dateselectinput').datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('#setdate').datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('#dateselect').change(function() {
            if ($(this).is(':checked')) {
                $('#dateselectinput').attr('disabled', false);
                $('#dateselectinput').css('background', '#FFFFFF');
            } else {
                $('#dateselectinput').attr('disabled', true);
                $('#dateselectinput').css('background', 'rgb(231, 231, 231)');
            }
        });
        $('#amountselect').change(function() {
            if ($(this).is(':checked')) {
                $('#amountselectinput').attr('disabled', false);
                $('#amountselectinput').css('background', '#FFFFFF');
            } else {
                $('#amountselectinput').attr('disabled', true);
                $('#amountselectinput').css('background', 'rgb(231, 231, 231)');
            }
        });
    });
}

function close_makenewgroup() {
    var element = document.getElementById('makepopup');
    element.parentNode.removeChild(element);
    $('#button_makegb').attr('disabled', false)
}



function initialize() {
    //curfile = "../src/noImage.jpg";

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

function makeclicked() {
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
    if (name == '') {
        alert("You should fill in the 'Product name' field")
        return
    }
    if (tag == '') {
        alert("You should fill in the 'Hash Tag' field")
        return
    }
    if (url == '') {
        url = 'No url provided'
    }
    if (enddate == '' && endamount == '') {
        alert("You should fill in at least one of 'end with date' or 'end with target amount'")
        return
    }

    if (category == 'default') {
        alert("You should choose the category")
        return
    }
    if (price == '' || unit == '') {
        alert("You should fill in the price info")
        return
    }

    function parseDate(input) {
        var parts = input.split('-');
        // new Date(year, month, day)
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    var today = new Date();

    var daysLeft = function(input, target) {
        var inputDate = parseDate(input);
        var timeDiff = inputDate.getTime() - target.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    var duedate = daysLeft(enddate, today);
    if (duedate < 0) {
        alert("Due date should be the same or later than today")
        return
    }

    if (pickupdate == '') {
        alert("You should fill in the pickup date")
        return
    }

    var datediff = daysLeft(pickupdate, parseDate(enddate));
    if (datediff < 0) {
        alert("Pickup date should be the same or later than the due date")
        return
    }

    if (pickupplace == '') {
        alert("You should fill in the pickup place")
        return
    }

    $('<div class="loader"></div>').appendTo("#loadingarea");
    $('#submit').attr('disabled', true);

    var newKey = firebase.database().ref('/groups/').push();

    if (curfile == null) {
        imageurl = 'https://raw.githubusercontent.com/elite1111cyj/HCI_SelfChef/master/src/logo3.png'
        newKey.set({
            name: name,
            host: now_ID,
            tag: tag,
            url: url,
            enddate: enddate,
            endamount: endamount,
            pickupdate: pickupdate,
            pickupplace: pickupplace,
            imageurl: imageurl,
            category: category,
            price: price,
            unit: unit,
            currentamount: 0,
            complete: false
        });
        var userKey = firebase.database().ref('/user/' + now_ID + '/make/').push();
        userKey.set({ value: newKey.key })
        $(".loader").remove();
        alert("You successfully made a new group buying!")
        $('#submit').attr('disabled', false);
        close_makenewgroup();
        return
    }

    var storageRef = firebase.storage().ref(newKey.key);
    task = storageRef.put(curfile);
    task.then(function() {
        storageRef.getDownloadURL().then(function(imageurl) {
            newKey.set({
                name: name,
                host: now_ID,
                tag: tag,
                url: url,
                enddate: enddate,
                endamount: endamount,
                pickupdate: pickupdate,
                pickupplace: pickupplace,
                imageurl: imageurl,
                category: category,
                price: price,
                unit: unit,
                currentamount: 0,
                complete: false
            });
            var userKey = firebase.database().ref('/user/' + now_ID + '/make/').push();
            userKey.set({ value: newKey.key })
            $(".loader").remove();
            alert("You successfully made a new group buying!")
            $('#submit').attr('disabled', false);
            close_makenewgroup();
        })
    })

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