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


function makedealsuccesspopup(pkey) {
    console.log('click')
    var productKey = pkey
    popup = document.createElement('div')
    popup.setAttribute('id', 'dealsuccesspopup')
    document.body.appendChild(popup)
    $('#dealsuccesspopup').append("<button id='close' onclick='close_dealsuccesspopup()'></button>" +
    "<p class='headerDealSuccess'>[Online Traditional Market]<br>Broccoli</br></p>" +
    "<img class='imageRight' id='productimg'></img>" +
    "<p class='bodyDealSuccess1'>1. Purchase product <button class='linkButton' id='linkBtn' onclick=link('"+ productKey +"')>The link you provided</button> </p>" +
    "<p class='bodyDealSuccess'>Make sure you buy the exact product, exact amount.<br>The participants are anticipating!</br></p>" +
    "<p class='bodyDealSuccess1'>2. Share link for group chat</pr><p><input id='textInput1' type='text' placeholder='Link'></p>" +
    "<p class='bodyDealSuccess1'>3. Share your bank account</pr>" +
    "<p><input id='textInput2' type='text' placeholder='Bank name'><input id='textInput3' type='text' placeholder='Account'></p>" +
    "<p class='bodyDealSuccess1'>4. Fix the sharing place and time<button class='submitButton' id='submitBtn' onclick='submit()'>Submit</button></pr>" +
    "<p><input id='textInput4' type='text' placeholder='Place'><input id='textInput5' type='text' placeholder='Time'></p>");
	
	firebase.database().ref("groups").child(productKey).once('value', function(snapshot){
		var myValue = snapshot.val();
		$('#productimg').attr('src', myValue.imageurl);
		$('#textInput4').attr('value', myValue.pickupplace);
		$('#textInput5').attr('value', myValue.pickupdate);
	});

}

function close_dealsuccesspopup() {
    var element = document.getElementById('dealsuccesspopup');
    element.parentNode.removeChild(element);
}

function link(productKey){
    firebase.database().ref("groups").child(productKey).once('value', function(snapshot) {
    	var myValue = snapshot.val();
	console.log(myValue);
	window.open(myValue.url);
    });
}

function submit(){
    alert("Submit Successful!");
    close_dealsuccesspopup();
}
