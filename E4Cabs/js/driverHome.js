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

//diver Profile
function DriverProfile()
{
    
    window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//Driver Jobs
function Jobs()
{
    //window.location = 'pop.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
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


//driver Logout logout(string userID)
function logout(){
    
        
        $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";
}

function soonToclear()
{
    //alert("hi");
     $('#lblCurrentStatus').text("Soon To Clear");
    $('#driverStatusupdate').text("Soon To Clear");
    $('#lblCurrentStatus').css("color","#639ECD");
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/clearStatus";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success:{},
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(errorThrown);
                }
             });
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



