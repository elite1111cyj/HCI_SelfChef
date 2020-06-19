//[start] upper bar

$(document).ready(function() {


now_ID=location.href.split("?",2)[1]

document.getElementById("My_Name").innerHTML = now_ID

var k=document.getElementById("search")
k.onkeypress=function() {
  if(event.keyCode==13)
  {go_search()}


}

}) //ready end

$(document).on("mouseover", ".search", function() {
    $(".centerbar").css("box-shadow", "0px 0px 40px -6px gray");
});

$(document).on('mouseenter','.icon', function(){
    console.log("in")
        $(this).closest("td").css({"background-color":'#a86cc1'})
        })
        
    $(document).on('mouseleave','.icon', function(){
        console.log("in")
    $(this).closest("td").css({"background-color":'#eddbf4'})        
    });
    



function go_mainpage() {
    location.href = "../MainPage_all/MainPage.html?" + now_ID
}

function go_myorderlist() {
    location.href = "../OrderList/OrderList.html?" + now_ID
}

//[end] upper bar
function go_search(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":key:"+document.getElementById("search").value
}


function fruit(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:fruit"
}

function vegetable(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:vegetable"
}
function fish(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:fish"
}

function meat(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:meat"
}
function dairy(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:dairy"
}
function health(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:health"
}
function rice(){
    location.href="../SearchResultPage/SearchResult.html?"+now_ID+":category:rice"
}


