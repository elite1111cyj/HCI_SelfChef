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

window.onload = function() {
    initialize()
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