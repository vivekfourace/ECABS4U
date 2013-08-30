
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];




 function DriverStatus(){
   window.location = 'driverStatusUpdate.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//var userID = data.d[0];
//var roleID = parseInt(data.d[1]);
//var relatedID = data.d[2];

function DriverProfile()
{
    window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

function Jobs()
{
    window.location = 'Myjobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}
