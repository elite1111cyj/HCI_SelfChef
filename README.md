# SelfChef
CS372 HCI Design Project

20180095 Sangwoo Kim\
20180526 Hyejin Lee\
20180555 Youngjae Jang\
20180731 Jihyeong Hong\

This service is for self-boarding students who want to group-buy food ingredients.
Here, you can make a new group buying or join a group buying.
After group buying ends, we share the contact information (ex. open chat) of the host.

### Prototype
[https://www.figma.com/proto/gO27wJeCxLrI2DBSasyXzz/HCI_DesignProject?node-id=1%3A8&scaling=min-zoom](https://www.figma.com/proto/gO27wJeCxLrI2DBSasyXzz/HCI_DesignProject?node-id=1%3A8&scaling=min-zoom)

### User Guide
[http://bitly.kr/HCISelfChef]
The link directs you to the starting page of the prototype.
1. If you access other pages without signing in or up, the ID will not be identified and The top most part will say 'undefined' or 'name here'.
If you want to skip the signing up, add '?' followed by the user name at the tail of the url.
2. Use test user (ID: 'test', PW: 'cs374') or you can also create a new account.

## Page description
### Join
This is the first page. ID and password are entered here.
JoinPage_all includes the html, css and js file for this page.
Also, to make a new account, SignUpPage_all folder includes files for the page.

### MainPage
The main page of the website. Here, you can search a product or search by categories. Also, you can make a new group buying, too.
MainPage_all includes html, css, and js file for this page. Also, for 'making new group buying' popup, make.css and make.js in make folder are connected to MainPage.html.

### Search Result
The page when the search result appears. SearchResultPage includes html, css, js files for this page. Since there are popups for adding group buying products, searchpopup.css, searchpopup.js in searchpopup folder are connected to Search Result.html. Also, as same as above, make.css and make.js are also connected. 

### OrderList
This is the page for the users to see what group buyings they are participating in.
OrderList includes html, css, js files for this page. make.css, make.js are connected as above, and since there are popups for the previous group buyings, *** are also connected to OrderList.html.