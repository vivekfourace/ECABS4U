var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function HomePage(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function MyProfilePage(){
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



function GetCancelledJobs() {
     $.ajax({
              url:'http://115.115.159.126/ECabs/ECabs4U.asmx/GetCancelledJobs', 
              type:"POST",
              datatype:"json",
              data:"{'drvId':'" +relatedId+ "'}",
              contentType: "application/json; charset=utf-8",                     
              success: function (data) 
                {
                    for(var i = 0 ; i< data.d.length; i++){
                       jobId = data.d[i].CustomeeRequestID;
                       CustId = data.d[i].CustomerID;
                       expJobId = data.d[i].ID;
                       drvId = data.d[i].DriverID;
                       expReason = data.d[i].ExpiryReason;
                        cancelledBy =  data.d[i].CancelledByID;
                        
                        if(parseInt(relatedId) === cancelledBy){
                           navigator.notification.confirm(
                               "Sorry the job " + jobId + " has been cancelled.\nReason- " + expReason,
                                onOKDeleteExpiredJob(expJobId),
                               'Cancelled Job',
                               'OK'
                           );
                        }
                    }
                }
           });
}
function onOKDeleteExpiredJob(expJobId){
    
     $.ajax({
              url:'http://115.115.159.126/ECabs/ECabs4U.asmx/DeleteCancelledJob', 
              type:"POST",
              datatype:"json",
              data:"{'expiredJobId':'" +expJobId+ "','driverId':'"+relatedId+"'}",
              contentType: "application/json; charset=utf-8",                     
              success: function () {
                   $('#transparent_div').hide();
                   console.log("1");
                   window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                   console.log("2");
              }
         });
    
}

getCancelledJobs = setInterval(GetCancelledJobs, 5000);
