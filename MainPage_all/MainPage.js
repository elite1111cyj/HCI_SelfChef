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

//[start] upper bar
now_ID=location.href.split("?",2)[1]

document.getElementById("My_Name").innerHTML=now_ID

function go_mainpage(){
    location.href="/MainPage_all/MainPage.html?"+now_ID
}
function go_myorderlist(){
    location.href="/OrderList/OrderList.html?"+now_ID
}

//[end] upper bar
function go_search(){
    return
}
