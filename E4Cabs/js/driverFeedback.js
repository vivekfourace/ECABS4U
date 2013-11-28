//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//back to home
function backtoDriverhome()
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
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//driver Logout
function logout()
{
         $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
                type:"POST",
                dataType: "Json",
                data:"{'userID':'" +userId+"'}",
                contentType: "application/json; charset=utf-8",                     
                success: function(data)
                {
                    },
                
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(errorThrown);
                    }
         }); 
            $.cookie("remember", false);
            //$.cookie("userName", 'null');
            //$.cookie("userPassword", 'null');
            window.location = "index.html";  
}
//Driver Status
function MyHome(){
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

//Accepting the Request.    
function seeRequest()
{
   window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 //cancel the Request.
 function closeRequest()
 {
             $.ajax({
                      url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                      type:"POST",
                      datatype:"json",
                      data:"{'userID':'" +relatedId+ "'}",
                      contentType: "application/json; charset=utf-8",                     
                      success: function (data) 
                         {
                             $('#popup_box').hide();
                              $('#divDealStart').hide();
                        },
                      error: function (XMLHttpRequest, textStatus, errorThrown)
                         {
                                $('#popup_box').hide();
                              $('#divDealStart').hide(); 
                          }
                });
     
 }






