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
                $('#btnJobDetails').show();
                $('#lblEngaged').show();
                $('#lblEngaged').text("Engaged");
                $('#btnEngage').hide();
                $('#btnabort').show();
                $('#btnclear').show();
                //notEnroutebutton show
                $('#btnnotEnroute').show();
                
                $('#btnnavigation').show();
                $('#btnOffline').hide();
                loadjscssfile("Common/UpdatePostcode.js", "js");
            }
            else if(data.d === false)
            {
                $('#btnJobDetails').hide();
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
           $('#btnJobDetails').hide();
            
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
           $('#btnJobDetails').hide();
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
                              //alert("Job aborted successfully.");
                              //window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                             navigator.notification.alert(
				        	"Job aborted successfully.",
  				       	abortComplete, // Specify a function to be called 
 					   	'ECABS4U',
 							"OK"
							);
                        	function abortComplete()
                        	{
    			     		window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
							}
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
                            $('#btnJobDetails').hide();
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


//ERROR not en route button click
//function notEnroute()
//{
//    $('#btnOffline').show();
//        $.ajax({
//                url:"http://115.115.159.126/ECabs/ECabs4U.asmx/UnEngageDriver",
//                     type:"POST",
//                     datatype:"json",
//                     data:"{'relatedId':'"+relatedId+"'}",
//                     contentType: "application/json; charset=utf-8",                     
//                     success: function(data){
//                         if(data.d === true)
//                         {                            
//                            
//                            $('#lblEngaged').show();
//                            $('#lblEngaged').text("Available");
//                           window.location='DriverCabLaterJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
//                         }
//                     },
//            		error: function (XMLHttpRequest, textStatus, errorThrown) {
//                        alert(errorThrown);
//                    }
//            });
//    
//    //window.location='DriverCabLaterJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
//    
//}

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




var sec = 15;
//ERROR not en route button click
function notEnroute()
{
   navigator.notification.confirm(
        "Please confirm your choice.",
         onErrorEnRoute,
        "Confirm",
        "Reject Job, Accept Job "
        );
}
function onErrorEnRoute(buttonIndex) 
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
       $('#divRejectJob').show();
       countDown();
    }
}
function countDown() {
  if (sec < 10) {
    $("#myTimer").text("0" + sec);
  } else {
    $("#myTimer").text(sec);
  }
    
  if (sec <= 0) {
    $("#myTimer").fadeTo(2500, 0);
    $('#btnOffline').show();
    $.ajax({
    url:"http://115.115.159.126/ECabs/ECabs4U.asmx/UnEngageDriver",
         type:"POST",
         datatype:"json",
         data:"{'relatedId':'"+relatedId+"'}",
         contentType: "application/json; charset=utf-8",                     
         success: function(data){
             if(data.d === true) {  
                $('#divRejectJob').hide();
                $('#btnJobDetails').hide();
                $('#lblEngaged').show();
                $('#lblEngaged').text("Available");
               window.location='DriverCabLaterJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
             }
         },
  error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
    return;
  }
  sec -= 1;
  window.setTimeout(countDown, 1000);
}

function showJobDetails(){
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/DriverEngagedJob";
    $.ajax(url, {
       type:"POST",
       datatype:"json",
       data:"{'driverId':'"+relatedId+"'}",
       contentType: "application/json; charset=utf-8",
        success: showDetail2,
        error: function (XMLHttpRequest, textStatus, errorThrown) 
        { }
    });
}
function makeCall()
{
    var number = $('#lblCustomerContact').text();
    window.location.href = "tel:" + number;    
}

function showDetail2(data)
{
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lbltDate').text(": "+data.d[2]);
    //Conversion of time formate.
    var time = data.d[3];
    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format === "PM" && hrs < 12) hrs = hrs + 12;
    if (format === "AM" && hrs === 12) hrs = hrs - 12;
    var hours = hrs.toString();
    var minutes = mnts.toString();
    if (hrs < 10) hours = "0" + hours;
    if (mnts < 10) minutes = "0" + minutes;
     $('#lblTime').text(":"+ hours + ":" + minutes);  
    
    
    $('#lblFrom').text(": "+data.d[4]);
    $('#lblTo').text(": "+data.d[5]);
    $('#lblCustomerName').text(": "+data.d[6]);
    
    $('#lblCustomerContact').text(data.d[7]);
    $('#lblCustomerContact').css("font-weight", 900);
    
    $('#lblNoOfPassenger').text(": "+data.d[8]);
    
    
     if(data.d[13] !== "")
    {
        $('#driverrating').show();
        $('#starrating').raty({ score: data.d[13], readOnly: true });
         console.log("stars=" + $('#hiddenstar').val());
     }
    else
    {
        $('#driverrating').hide();
    }
    if(data.d[9]!=="No Customer Feedback")
    {
        $('#labelline').show();
         $('#custFeedback').show();
       $('#lblCustomerFeedback').text(": "+data.d[9]);
       
        
    }
    else
    {
        $('#custFeedback').hide();
        $('#MyFeedback').hide();
        $('#labelline').hide();
    }
   
    
    if(data.d[10]!== "No Return")
    {
        $('#rtnfrom').show();
        $('#lblreturnfrom').text(": "+data.d[10]);
    }
    else
    {
        $('#rtnfrom').hide();
       
    }
    if(data.d[11]!== "No Return")
    {
        $('#rtnto').show();
        $('#lblreturnto').text(": "+data.d[11]);
    }
    else
    {
       //$('#rtnto').hide();
        $('#rtnto').hide();
    }
    if(data.d[12]!=="No Driver Comments")
    {
         $('#MyFeedback').show();
        $('#labelline').show();
      $('#lblMyFeedback').text(": "+data.d[12]);  
    }
    else
    {
        $('#MyFeedback').hide();
    }
    $("#popup_box1").show();
    $('#divJobDetails2').show();
    $('#transparent_div').show();
}
function Cancel()
{
   $("#popup_box1").fadeOut("fast");
   $('#divJobDetails2').fadeOut("fast");
   $('#transparent_div').hide();
}