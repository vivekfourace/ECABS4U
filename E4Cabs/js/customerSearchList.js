var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4].split("&")[0];


function backtosearch()
{
    window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


