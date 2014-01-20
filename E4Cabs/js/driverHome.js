var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
    console.log("Device ready");
}


$('#imgLoader').hide();

function  NavigateToMap()
{
    window.location = 'Navigation.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

 $.ajax({
        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/DriverAvaibalility",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
            if(data.d == true)
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Unavailable");
                $('#btnEngage').hide();
                $('#btnabort').show();
                $('#btnclear').show();
                $('#btnnavigation').show();
            }
            else if(data.d == false)
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Available");               
            }
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
     }); 

function AbortJob()
{
    navigator.notification.confirm(
    "Do you want to abort this job?",
    onAbortCallback,
    "Confirm",
    "No, Yes"    
    );
}

function onAbortCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
       $('#popup_box1').show();
       $('#divAbortTask').show();
       $('#transparent_div').show();
    }
}

function SubmitAbort()
{
    var abortMessage = $('#txtAbortmsg').val();
    if(!abortMessage)
    {
        alert('Please enter a reason.');
        return false;
    }
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/AbortCurrentJob";
    
            $.ajax(url,{
                     beforeSend: function(){
                        $('#imgLoader').show();
                     },
                     complete: function(){
                        $('#imgLoader').hide();
                         
                     },
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'" +relatedId+ "','abortMessage':'"+abortMessage+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d == "true")
                         {                            
                              $('#popup_box1').hide();
                              $('#divAbortTask').hide();
                              $('#transparent_div').hide();
                              $('#txtAbortmsg').val("");
                              alert("Job aborted successfully.");
                              window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }                         
                     },
             });
}

function cancelAbort()
{
    $('#popup_box1').hide();
    $('#divAbortTask').hide();
    $('#txtAbortmsg').val("");
    $('#transparent_div').hide();
}

function clearJob()
{
    navigator.notification.confirm(
    "Do you want to clear this job?",
    onClearCallback,
    "Confirm",
    "No, Yes"  
    );
}

function onClearCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
        $.ajax({
                url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ClearDriverStatus",
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'"+relatedId+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d == true)
                         {
                            window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }
                     },
            });
    }
}


function engageMe()
{
    window.location='DriverCabLaterJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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