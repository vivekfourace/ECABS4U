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
    
    $('#transparent_div').show();
    if(param === now)
    { 
       // $("#data").css("background-color","red.");
        navigator.notification.confirm(
        'You have got a new "Cab now" job request. Do you want to see it?',
         onConfirm,
        'NEW JOB',
        'Yes,No'
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