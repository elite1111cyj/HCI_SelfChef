//[start] upper bar

$(document).ready(function() {


now_ID=location.href.split("?",2)[1]

document.getElementById("My_Name").innerHTML = now_ID
})

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




$("#search").keyup(function(e) { // enter event
    if (e.keyCode == 13 && this.value != '') {
      $("#search").focus();
    }
});