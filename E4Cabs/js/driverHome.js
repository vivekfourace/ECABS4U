var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function DriverStatus(){
    window.location = "driverStatusUpdate.html";
}

function DriverProfile(){
    window.location = 'driverProfile.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
}