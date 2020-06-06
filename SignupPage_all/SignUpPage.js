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
var okay=false;
function go_main(){
    var check=document.getElementById("write_id")
    if (okay){
    location.href="../MainPage_all/MainPage.html?"+check.value
    }
}

$(document).on('click','#join_us', function(){

    if(document.getElementById("write_password").value!=document.getElementById("write_re_password").value){
        var message=document.getElementById("status")
        message.innerHTML="Your password and confirm password do not match."
        message.style.color="red";
        console.log(document.getElementById("status"))
    }
    return firebase.database().ref('/user/').once('value',function(snapshot){
        var myValue = snapshot.val(); {
        if (myValue && Object.keys(myValue).includes(document.getElementById("write_id").value)){
            var message=document.getElementById("status")
            message.innerHTML="The ID already exists."
            message.style.color="red";
        }
        else{
            var idi=document.getElementById("write_id").value
            var newKey=firebase.database().ref('/user/').child(idi)       
            newKey.set(
                {password:document.getElementById("write_password").value}
            )
            var message=document.getElementById("status")
            message.innerHTML="Nice to Meet you, "+idi+". Click to Start!"
            message.style.color="blue";
            okay=true
        }
    }
    });
})

