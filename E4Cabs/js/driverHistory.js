var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

document.addEventListener("deviceready",onDeviceReady, false);
function onDeviceReady()
{
    console.log("ready");
}

function backToIndex()
{
     window.location =  'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

window.onload = gethistory();
function gethistory()
{
                        var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/DriverHistoryDetails";
                        $.ajax(url, 
                        {
                            
                           type:"POST",
                           datatype:"json",
                           data:"{'relatedId':'"+relatedId+"'}",
                           contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                var count = data.d.length;
                                if(count > 0)
                                {
                                        var html ='<table cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                                        html += '<thead class="thead-grid">';
                                        html += '<tr>';
                                        html += '<th>Job no</th>';
                                        html += '<th>Feedback</th>';
                                        html += '<th>Status</th>'; 
                                        html += '</tr>';
                                        html += '</thead>';
                                        html +='<tbody class="tbody-grid altColor">';  
                                             for(var i=0; i<count; i++)
                                             {
                                                $('#lbljobFeed').text(data.d[i]["JobNo"]);
                                                var isCabNow = data.d[i]["isCabNow"];
                                                var isJobAlive = data.d[i]["isJobAlive"];
                                                html += '<tr>';
                                                html += "<td width='20%' height='30px' align='center'>" +'<a href="#" onclick="JobDetail(\''+data.d[i]["JobNo"]+'\')" style="color:blue;">'+ data.d[i]["JobNo"]+'</a>'+"</td>"; 
                                                html += "<td width='5%' height='30px' align='center'>"+'<img src="img/feedbackicon.png" onclick="feedBackDriver(\''+data.d[i]["JobNo"]+'\')"</img>'+"</td>"
                                                
                                             if(!isCabNow)
                                             {
                                                 if(isJobAlive == true)
                                                 {
                                                     html += "<td width='25%' height='30px' align='center'>"+'<input type="button" class="reject-btn" value="Abort" onclick="AbortJob(\''+data.d[i]["JobNo"]+'\')"/>'+"</td>";   
                                                 }
                                                 else if(isJobAlive == false)
                                                 {
                                                      html += "<td width='25%' height='30px' align='center'>"+'<label style="color:red">Aborted</label>'+"</td>";
                                                 }
                                             }
                                             else if(isCabNow)
                                             {
                                                 if(isJobAlive == true)
                                                 {
                                                     html += "<td width='25%' height='30px' align='center'style='color:green'>Cab Now</td>"; 
                                                 }
                                                 else if(isJobAlive == false)
                                                 {
                                                     html += "<td width='25%' height='30px' align='center'>"+'<label style="color:red">Aborted</label>'+"</td>";
                                                 }
                                             }
                                             html += '</tr>';    
                                             }
                                        html +='</tbody>';
                                           html +='</table>';
                                        $('#msg').append(html);
                                 }
                                else
                                {
                                    $('#bookingmsg').show();
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) 
                            {
                                alert(errorThrown);
                            }
                        });                
}

function feedBackDriver(JobNumber )
{
     $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabNowDataForDriver",
            type:"POST",
            dataType: "Json",
            data:"{'JobNumber':'" +JobNumber+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                    var isDriverRatingLocked = data.d[1];
                    var isJobAlive = data.d[2];
                    var rating = data.d[3];
                    var custFeed = data.d[4];
                    var startDate = data.d[5]; 
                    var startTime = data.d[6];
                    var fromLoc = data.d[7];
                    var toLoc = data.d[8];
                
                   if(isJobAlive == "True")
                    {
                        if(isDriverRatingLocked == "True")
                        {
                               document.getElementById('sel').value = rating;
                               document.getElementById('txtarComments').value = custFeed;
                               $('#sel').attr('disabled',true);
                               $('#txtarComments').attr("readOnly",true);
                               $('#lbljobNo').text(JobNumber);
                               $('#lblFeeddate').text(startDate);
                               $('#lblFeedTime').text(startTime);
                               $('#lblFeedFrom').text(fromLoc);
                               $('#lblFeedTo').text(toLoc);
                            
                               $('#popup_box').show();
                               $('#divFeedBack').show();
                               $('#trbtnPopup').hide();
                               $('#trbtnOK').show();
                               $('#transparent_div').show();                               
                            
                        }
                        else if(isDriverRatingLocked == "False")
                        {                           
                               $('#lbljobNo').text(JobNumber);
                               $('#lblFeeddate').text(startDate);
                               $('#lblFeedTime').text(startTime);
                               $('#lblFeedFrom').text(fromLoc);
                               $('#lblFeedTo').text(toLoc);  
                               $('#sel').attr('disabled',false);
                               $('#txtarComments').attr("readOnly",false);
                            
                               $('#popup_box').show();
                               $('#divFeedBack').show();
                               $('#trbtnPopup').show();
                               $('#transparent_div').show();
                               $('#trbtnOK').hide();
                        }
                    }
                    else
                    {
                        alert('Job not active. You cannot give feedback.');
                    }
       },            
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
  });  
}

function CancelFeedBack()
{
    $('#divFeedBack').hide();
    $('#popup_box').hide();
     $('#transparent_div').hide();
    document.getElementById('sel').value = 0;
    document.getElementById('txtarComments').value = "";  
    
}

function JobDetail(data)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/JobDetailDriver";
                $.ajax(url, {
                   type:"POST",
                   datatype:"json",
                   data:"{'customerReqID':'"+data+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: showDetail,
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {                        
                    }
                });
}
function showDetail(data)
{
    $('#lblJobNo').text(data.d[0]);
    $('#lblFare').html('&pound'+data.d[1]);
    $('#lbltDate').text(data.d[2]);
    $('#lblTime').text(data.d[3]);
    $('#lblFrom').text(data.d[4]);
    $('#lblTo').text(data.d[5]);
    $('#lblCustomerName').text(data.d[6]);
    $('#lblCustomerContact').text(data.d[7]);
    $('#lblNoOfPassenger').text(data.d[8]);    
    $('#popup_box').show();
    $('#divCabLaterBooking').show();
     $('#transparent_div').show();
}

function Cancel()
{
    $('#popup_box').hide();
    $('#divCabLaterBooking').hide();
     $('#transparent_div').hide();
}

function SubmitReject()
{
    var jobNumber = $('#lblJobNumber').val();   
    var abortMessage = $('#txtAbortmsg').val();
    if(!abortMessage)
    {
        alert('Please enter a reason.');
        return false;
    }
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/AbortCurrentJobDriver";    
            $.ajax(url,{
                     beforeSend: function(){
                        $('#imgLoader').show();
                     },
                     complete: function(){
                        $('#imgLoader').hide();
                     },
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'" +relatedId+ "','abortMessage':'"+abortMessage+"','jobNumber':'"+jobNumber+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d == "true")
                         {
                              $('#popup_box1').hide();
                              $('#divAbortTask').hide();
                              $('#txtAbortmsg').val("");
                               $('#transparent_div').hide();
                              alert("Job aborted successfully.");
                              window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }                         
                     },                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
             });
    
}
function CancelReject()
{
    $('#popup_box1').hide();
    $('#divAbortTask').hide();
    $('#transparent_div').hide();
    $('#txtAbortmsg').val("");
}

function AbortJob(data)
{
    var jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    navigator.notification.confirm(
    "Confirm you want to abort the current cab?",
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
        $('#transparent_div').show();
        $('#popup_box1').show();
        $('#divAbortTask').show();
    }
}

function PostFeedBack()
{
   var requestID= $('#lbljobNo').text();
   var getRating = document.getElementById('sel').value;
   var getComments = document.getElementById('txtarComments').value;
    if(getRating == 0)
    {
        alert("Please select rating.");
        return false;
    }
    if(!getComments)
    {
        alert("Please enter comments.");
        return false;
    }
    
     $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/DriverFeedbackForCustomer",
             beforeSend: function(){
                $('#imgLoader').show();
             },
             complete: function(){
                $('#imgLoader').hide();
             },
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','reqID':'" +requestID+"','rating':'" +getRating+"','feedback':'" +getComments+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                alert("Feedback comment posted successfully");
                document.getElementById('txtarComments').value ="";
                document.getElementById('sel').value = 0;
                $('#divFeedBack').hide();
                $('#popup_box').hide();
                $('#transparent_div').hide();
                },
         });  
 }


function myhome()
{
           window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
          window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 
}
function MyBookings(){
         window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 function myProfile()
{
         window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function logout()
{                
         $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {},
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
    $.cookie("remember", false);          
    window.location = "index.html";  
}
 
function feedBack()
{
       window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}    
