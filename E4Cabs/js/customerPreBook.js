//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//back to home
function backtoCustomerhome()
{
     window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//redirect to driver next to customer page
function availabledriver()
{
    window.location='driverNextToCustomers.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//My Profile Button
 function myProfile()
{
   window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


function cabNow()
{   
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function feedBack()
{
        window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
       window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

function preCab()
{
       window.location='customerPreBook.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}