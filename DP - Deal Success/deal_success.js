// Opens the popup
function dealSuccess() {
  var dealSuccessPopup = document.getElementById("dealSuccessPopup");
  dealSuccessPopup.classList.toggle("showPopup");
}

// Closes the popup
function clickClose() {
	var dealSuccessPopup = document.getElementById("dealSuccessPopup");
	dealSuccessPopup.classList.toggle("showPopup");
}

var firebaseConfig = {
    apiKey: "AIzaSyBjFa6ITtLwyYNPwAt9YWZx0crJviZYj8g",
    authDomain: "cs374-d.firebaseapp.com",
    databaseURL: "https://cs374-d.firebaseio.com",
    projectId: "cs374-d",
    storageBucket: "cs374-d.appspot.com",
    messagingSenderId: "774674175555",
    appId: "1:774674175555:web:fcf3a66700feb62352a6f6"
};

firebase.initializeApp(firebaseConfig);

var groupKeyRef;
var groupKey;
atStart(); //가장 처음에 실행됨

function atStart(){
	//database의 해당하는 group과 연결
	//일단은 example의 key를 받았다고 가정
	groupKeyRef = firebase.database().ref("groups").child("example"); //this is the reference
	groupKey = groupKeyRef.getKey(); //this is "example"
	
}

$( document ).ready(function() {
	
	//getElementByIds
	var linkButton = document.getElementById("linkBtn");
	var submitButton = document.getElementById("submitBtn");
	var imageDiv = document.getElementById("imageDiv");

	linkButton.onclick = function() {
		groupKeyRef.once('value', function(snapshot) {
			var myValue = snapshot.val();
			var providedLink = myValue.url; //this is the link
			//window.location = providedLink; //this opens url in current window
			window.open(providedLink); //this opens url in  new window
		});
	}

	submitButton.onclick = function() {
		clickClose();
	}

	//add image
	var image = document.createElement("img");
	var providedImageUrl;
	groupKeyRef.once('value', function(snapshot) {
		var myValue = snapshot.val();
		providedImageUrl = myValue.imageurl; //url for image
		image.setAttribute("src", providedImageUrl);
		image.setAttribute("width", "250");
		image.setAttribute("height", "200"); 
		//image.setAttribute("float", right);
		//image.setAttribute("margin-right", 50px);
		imageDiv.appendChild(image);
	});
});

