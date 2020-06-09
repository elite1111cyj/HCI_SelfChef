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

//test values
//var productKey = '-M8ywY0Ui2yOOLRt-CT3'
var now_ID = 'KSW'


function makedealcancelpopup() {
    console.log('click')
    //var productKey = pkey
    popup = document.createElement('div')
    popup.setAttribute('id', 'dealcancelpopup')
    document.body.appendChild(popup)
    $('#dealcancelpopup').append("<button id='close' onclick='close_dealcancelpopup()'></button>" +
    "<br></br><br></br><br>"+
    "<p class='headerDealCancel'>[Online Traditional Market] Broccoli</p>" +
    "<p class='bodyDealCancel'>Deal cancelled.<br>We will let the participants know.</br></p>" +
    "<p class='bodyDealCancel'>Thanks for your work!</p>");

}

function close_dealcancelpopup() {
    var element = document.getElementById('dealcancelpopup');
    element.parentNode.removeChild(element);
}
