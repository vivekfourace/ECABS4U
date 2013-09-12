
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

$(document).ready(function(){
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/userStatus";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function (data) {
                        
                        var status=data.d;
                         if(status==true)
                         {
                         $('#driverStatusupdate').text("Available");
                             }
                         else
                         {
                           $('#driverStatusupdate').text("Soon to clear");   
                         }
                     },
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(errorThrown);
                }
             });
    
});

//Driver status 
 function DriverStatus(){
   window.location = 'driverStatusUpdate.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//var userID = data.d[0];
//var roleID = parseInt(data.d[1]);
//var relatedID = data.d[2];


//diver Profile
function DriverProfile()
{
    
    window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}



//Driver Jobs
function Jobs()
{
    window.location = 'pop.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
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


//driver Logout logout(string userID)
function logout(){
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/logout";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function (data) {
                         
                         window.location="index.html";
                     },
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(errorThrown);
                }
             });
    
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




