var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var jobCheckTime;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   console.log('device ready');
}

jobCheckTime = setInterval(GetCancelledJobsForCustomer, 10000);


function GetCancelledJobsForCustomer() {
    
     $.ajax({
              url:'http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/GetCancelledJobsForCustomer', 
              type:"POST",
              datatype:"json",
              data:"{'custId':'" +relatedId+ "'}",
              contentType: "application/json; charset=utf-8",                     
              success: function (data) 
                {
                    
                    
                    for(var i = 0 ; i< data.d.length; i++){
                        var jobId = data.d[i].CustomeeRequestID;
                        CustId = data.d[i].CustomerID;
                        expJobId = data.d[i].ID;
                        drvId = data.d[i].DriverID;
                        expReason = data.d[i].ExpiryReason;
                        cancelledBy =  data.d[i].CancelledByID;
                         var CabNow=data.d[i].isCabNow;
                        if(parseInt(relatedId) === cancelledBy){
                          // console.log("in");
                           // alert(CabNow);
                            if(CabNow == null)
                            {
                              navigator.notification.confirm(
                            
                               "Sorry, JobNo "+jobId+" cancelled by driver. \nReason- " + expReason,
                                onOKDeleteExpiredJobForCustomer(expJobId),
                               'Cancelled Job',
                               "OK" 
                              );
                                
                            }
                            else
                            {
                                navigator.notification.confirm(
                                    "Sorry, JobNo "+jobId+" cancelled by driver. \nReason- " + expReason,
                                    onClickSearchagain,
                                    "Confirm",
                                    "Re-Search,OK"
                                    ); 
                                
                                function onClickSearchagain(buttonIndex)
                                {
                                    if(buttonIndex == 2)
                                    {
                                        onOKDeleteExpiredJobForCustomer(expJobId);
                                    }
                                    else if(buttonIndex == 1)
                                    {
                                       // alert(CabNow);
                                        if(CabNow === "True")
                                        {
                                          var cancelledJobData;
                                          window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + jobId+ '&rrid=' + cancelledJobData;
                                          onOKDeleteExpiredJobForCustomer(expJobId);   
                                        }
                                        else if(CabNow === "False")
                                        {
                                          var cancelledJobDataFuture;
                                          window.location = 'customerSearchFuture.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + jobId+ '&rrid=' + cancelledJobDataFuture;
                                          onOKDeleteExpiredJobForCustomer(expJobId);  
                                        }
                                       
                                    }
                                }
                                
                            }
                          
                        }
                    }
                }
           });
}
function onOKDeleteExpiredJobForCustomer(expJobId){
    
         $.ajax({
              url:'http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/DeleteCancelledJob', 
              type:"POST",
              datatype:"json",
              data:"{'expiredJobId':'" +expJobId+ "','driverId':'"+relatedId+"'}",
              contentType: "application/json; charset=utf-8",                     
              success: function () {
                   $('#transparent_div').hide();
                   
              }
         });
    
}

