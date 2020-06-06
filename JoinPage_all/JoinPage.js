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

function move_to_create(){
    location.href="../SignUpPage_all/SignUpPage.html"
}

function check_info(){
    var typed_id=document.getElementById("write_id").value
    var typed_pw=document.getElementById("write_password").value
    if (!typed_id || !typed_pw){

        var errme=document.getElementById("err_message")
        errme.innerHTML="Type in ID and password"
        errme.style.color="red"
    }
    else{
    return firebase.database().ref('/user/').once('value',function(snapshot){
        var myValue = snapshot.val();
        if(myValue[typed_id] && myValue[typed_id].password==typed_pw){
                //now_ID=typed_id
                get_id(typed_id)
                location.href="../MainPage_all/MainPage.html?"+typed_id
        }
        else {
            console.log("case3")
            var errme=document.getElementById("err_message")
            errme.innerHTML="Id or password is invalid."
            errme.style.color="red"
        }

    });
}
}