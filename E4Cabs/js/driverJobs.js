var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function showMap()
{
   var from = $('#lblFromLoc').text();
   var to = $('#lblToLoc').text();
   var dis = "loc"; //it will specify later;
   window.location =  'Location.html?id='+from+'&rid='+to+'&rrid='+dis;
}

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
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bid()
{
    var rid =relatedId ;
    var status=true; 
    var price=50;
     $.ajax({
           url: "http://115.115.159.126/ECabs/ECabs4U.asmx/setDriverResponse",
           type:"POST",
           dataType: "Json",
           data:"{'userID':'" + relatedId +"','reqid':'"+ rid +"','status':'"+ status  +"','price':'"+ price +"'}",
           contentType: "application/json; charset=utf-8",  
           success: function (data) 
                       {
                       },
           error: function (XMLHttpRequest, textStatus, errorThrown)
                    {
           //alert(errorThrown);
            }
       });
    }

//driver Logout
function logout(){
        $.cookie("remember", false);
        $.cookie("userName", 'null');
        window.location = "index.html";  
}



//Driver Status
function myhome(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//Driver Feedback
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//History
function bookedHistory()
{
    
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

