var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
    document.addEventListener("backbutton", goToHome, false);
}

function goToHome() {
    navigator.app.backHistory();
    console.log('Going to home page');
    //window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function showMap()
{
   var from = $('#lblFromLoc').text();
   var to = $('#lblToLoc').text();   
   var dis = "loc";
   window.location =  'Location.html?from='+from+'&to='+to+'&dist='+dis+'&id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function reqReject() {            
    navigator.notification.confirm(
    "Are you sure to reject the job?",
    onRejectCallback,
    "Confirm",
    "No, Yes"   
    );
}

function onRejectCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
           
            var rid = $('#hdnJobno').val();
            console.log(rid);
            var status = "Rejected";
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/rejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d == true)
                    {
                      console.log('rej')
                      window.location = 'driverProfile.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                    }
                    else
                    {
                        console.log('Exception in rejectResponse')
                    }
                },
            });
    }
}

function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function myProfile()
{
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//function bid()
//{
//    var rid = relatedId ;
//    var status = true; 
//    var price = 50;
//     $.ajax({
//           url: "http://115.115.159.126/ECabs/ECabs4U.asmx/setDriverResponse",
//           type:"POST",
//           dataType: "Json",
//           data:"{'userID':'" + relatedId +"','reqid':'"+ rid +"','status':'"+ status  +"','price':'"+ price +"'}",
//           contentType: "application/json; charset=utf-8",  
//           success: {},
//       });
//    }

function logout()
{
    $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: {},           
         });
    
        $.cookie("remember", false);
        //$.cookie("userName", 'null');
        //$.cookie("userPassword", 'null');
        window.location = "index.html";    
}

function myhome(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

