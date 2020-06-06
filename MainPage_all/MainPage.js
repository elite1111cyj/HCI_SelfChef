//[start] upper bar//
now_ID = location.href.split("?", 2)[1]

document.getElementById("My_Name").innerHTML = now_ID

function go_mainpage() {
    location.href = "/MainPage_all/MainPage.html?" + now_ID
}

function go_myorderlist() {
    location.href = "/OrderList/OrderList.html?" + now_ID
}

function go_search() {
    return
}