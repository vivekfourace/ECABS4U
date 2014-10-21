var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var jobCheckTime;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   console.log('device ready');
}

function showConfirm(param) {
    var now = 1;
    //alert(param);
    //var later = 2;
    //alert("Hi");
    //alert(relatedId);
    $('#transparent_div').show();
    if(param === now)
    { 
       // $("#data").css("background-color","red.");
        navigator.notification.confirm(
        //'You have got a new "Cab now" job request. Do you want to see it?',
        'You have a ‘cab now’ job request.',
         onConfirm,
        'NEW JOB',
        'View,Reject'
        );
    }
    //else if(param === later)
    //{
    //    navigator.notification.confirm(
    //    'You have got a new "Cab later" job request. Do you want to see it?',
    //     onConfirm,
    //    'NEW JOB',
    //    'Yes,No'
    //    );
    //}
}
function onConfirm(buttonIndex)
{
    if(buttonIndex === 2)
    {
        closeRequest();
        jobCheckTime = setInterval(Check, 10000); 
        $('#transparent_div').hide();
    }
    else if(buttonIndex === 1)
    {
        seeRequest();
    }
}

function playBeep() {
 
    navigator.notification.beep(1);
    navigator.notification.vibrate(1000);
    
    return;
    
}

jobCheckTime = setInterval(Check, 5000);


function Check() 
{    
  $.ajax({
    url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/CheckNewJob',
    type: "POST",
    datatype: "json",
    data: "{'userID':'" + relatedId + "'}",
    contentType: "application/json; charset=utf-8",
    success: function (data) 
    {
        var isTrue = data.d[0];
        
        if (isTrue === "True") 
        {
            var jobType = data.d[1];
            var isvisited = data.d[2];  
            if(isvisited === "False")
            {
                if (jobType === "True") 
                {   
                    var cabnow = 1;
                    showConfirm(cabnow);
                    playBeep();
                    clearInterval(jobCheckTime);
                }
                else if (jobType === "False") 
                {
                    $('#btnPulsating').show();
                    $('#btnNormal').hide();
                    clearInterval(jobCheckTime);
                }
            }
        }
        GetCancelledJobs();
    },
 });
}
//function Check() {    
//          $.ajax({
//              url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/CheckNewJob',
//              type: "POST",
//              datatype: "json",
//              data: "{'userID':'" + relatedId + "'}",
//              contentType: "application/json; charset=utf-8",
//              success: function (data)
//              {
//                  var isTrue = data.d[0];
//                   console.log(data.d[0]+","+data.d[1]+","+data.d[2]);
//                  if (isTrue === "True")
//                  {
//                      var jobType = data.d[1];
//                      if (jobType === "True") 
//                      {                        
//                         
//                          var cabnow = 1;
//                          showConfirm(cabnow);
//                          playBeep();
//                          clearInterval(jobCheckTime);
//                      }
//                        else if (jobType === "False") 
//                      {
//                          var isnotvisited = data.d[2];                          
//                          console.log(isnotvisited);
//                          if(isnotvisited === "True")
//                          {
//                              $('#btnPulsating').show();
//                              $('#btnNormal').hide();
//                              //var cablater = 2;
//                              //showConfirm(cablater);
//                              //playBeep();
//                              clearInterval(jobCheckTime);
//                          }
//                      }
//                  }
//           },
//     });
//}



function seeRequest()
{
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function closeRequest()
{
     $.ajax({
              url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJobDNotification', 
              type:"POST",
              datatype:"json",
              data:"{'relatedId':'" +relatedId+ "'}",
              contentType: "application/json; charset=utf-8",                     
              success: function () {}
        });
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
                      navigator.notification.confirm(
                          "Cancelled JobID = "+ jobId+"\nReason = "+ expReason,
                           onOKDeleteExpiredJob(expJobId),
                          'Cancelled Job',
                          'OK'
                      );
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
                   window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
              }
         });
    
}
