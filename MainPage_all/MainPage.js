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


//[start] now popular

$(document).on('mouseenter','#popular', function(){
    
    // ="<td id=\"popular\"><div id=\"popular_title\">Now Popular</div><div id=\"popular_product\">1. Salmon<br>2. Cabbage<br>3. Octopus<br>4. Apple</div></td>"

})

//[end] now popular
