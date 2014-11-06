var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var jobCheckTime;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   console.log('device ready');
}

jobCheckTime = setInterval(GetCancelledJobsForCustomer, 2000);


function GetCancelledJobsForCustomer() {
     $.ajax({
              url:'http://115.115.159.126/ECabs/ECabs4U.asmx/GetCancelledJobsForCustomer', 
              type:"POST",
              datatype:"json",
              data:"{'custId':'" +relatedId+ "'}",
              contentType: "application/json; charset=utf-8",                     
              success: function (data) 
                {
                    for(var i = 0 ; i< data.d.length; i++){
                       jobId = data.d[i].CustomeeRequestID;
                       CustId = data.d[i].CustomerID;
                       expJobId = data.d[i].ID;
                       drvId = data.d[i].DriverID;
                       expReason = data.d[i].ExpiryReason;
                       
                       navigator.notification.confirm(
                           "Cancelled JobID = "+ jobId+"\nReason = "+ expReason,
                            onOKDeleteExpiredJobForCustomer(expJobId),
                           'Cancelled Job',
                           'OK'
                       );
                    }
                }
           });
}
function onOKDeleteExpiredJobForCustomer(expJobId){
    
         $.ajax({
              url:'http://115.115.159.126/ECabs/ECabs4U.asmx/DeleteCancelledJob', 
              type:"POST",
              datatype:"json",
              data:"{'expiredJobId':'" +expJobId+ "','driverId':'"+relatedId+"'}",
              contentType: "application/json; charset=utf-8",                     
              success: function () {
                   $('#transparent_div').hide();
                   
              }
         });
    
}

