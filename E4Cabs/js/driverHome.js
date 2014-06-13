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
    
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.NONE] = 'Please enable your mobile network connection.';
    
    
      // states[Connection.UNKNOWN] = 'Unknown connection';
      // states[Connection.ETHERNET] = 'Ethernet connection';
      // states[Connection.WIFI] = 'WiFi connection';
      // states[Connection.CELL_2G] = 'Cell 2G connection';
      // states[Connection.CELL_3G] = 'Cell 3G connection';
      // states[Connection.CELL_4G] = 'Cell 4G connection';
     //states[Connection.CELL] = 'Cell generic connection';
    

   if(states[networkState] === 'Please enable your mobile network connection.')
    {
        
        
        $('#lblInternetconnection').text(states[networkState]);
        
     // alert('No network connection found.');
        return false;
    }
   else
    {
    
        window.location = 'Navigation.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
       
    }
}

 $.ajax({
        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/DriverAvaibalility",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
            if(data.d === true)
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Engaged");
                $('#btnEngage').hide();
                $('#btnabort').show();
                $('#btnclear').show();
                $('#btnnavigation').show();
                $('#btnOffline').hide();
                loadjscssfile("Common/UpdatePostcode.js", "js");
            }
            else if(data.d === false)
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
    onAbortCallback2,
    "Confirm",
    "Yes,No"   
    );
}

function onAbortCallback2(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
        $('#transparent_div').show();
        //$('#btnOffline').show();
       $('#popup_box1').show();
       $('#divAbortTask').show();
       
    }
}

function Offline()
{
    navigator.notification.confirm(
    "Whilst unavailable you will not receive any 'Cab Now' job offers. Do you wish to continue?",
    onAbortCallback,
    "Warning",
    'Yes,No'   
    );
}

function onAbortCallback(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
       $.ajax({
        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/MakeOffline",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
           $('#btnOffline').hide();
           $('#btnOnline').show();
           $('#lblStaus').show();
           $('#lblStaus').text("Unavailable");
           $('#lblStaus').css("color", "red");
           $('#lblEngaged').hide();
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
    }
}

function Online()
{
    $.ajax({
     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/MakeOnline",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
           $('#btnOffline').show();
           $('#btnOnline').hide();
           $('#lblStaus').hide();
           $('#lblEngaged').show();
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
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
                         if(data.d === "true")
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
    "Can you confirm you have completed this job?",
    onClearCallback,
    "Confirm",
    "Yes,No" 
    );
}

function onClearCallback(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
        $('#btnOffline').show();
        $.ajax({
                url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ClearDriverStatus",
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'"+relatedId+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d === true)
                         {                            
                            window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                            $('#lblEngaged').show();
                            $('#lblEngaged').text("Available");
                         }
                     },
            });
    }
}

function ShowLaterJobOffers()
{
    window.location='CabLaterJobList.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
