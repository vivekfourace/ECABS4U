var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];








function BackProfile()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//diver Profile from menu
function myProfile()

{
    
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Driver Jobs from menu
function MyBookings(){
    window.location='driverJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//driver Logout
function logout(){
    window.location="index.html";
}



//Driver Status
function myStatus(){
    window.location='driverStatusUpdate.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//Driver Feedback
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}