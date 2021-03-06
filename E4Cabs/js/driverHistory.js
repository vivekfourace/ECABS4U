var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
     window.location =  'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

window.onload = getDriverhistory();
var id, url, isCabNow, isJobAlive;
id = window.setInterval(getDriverhistory, 20000);

$(function() {
      $.fn.raty.defaults.path = 'lib/img';  
  });

function getDriverhistory()
{     
    $.ajax({
           url : "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/DriverHistoryDetails",
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
                        html += '<th>Job Date</th>';
                        html += '<th>Feedback</th>';
                    
                        html += '<th>Status</th>'; 
                        html += '</tr>';
                        html += '</thead>';
                        html +='<tbody class="tbody-grid altColor">';  
                             for(var i=0; i<count; i++)
                             {
                                $('#lbljobFeed').text(data.d[i]["JobNo"]);
                                isCabNow = data.d[i]["isCabNow"];
                                isJobAlive = data.d[i]["isJobAlive"];
                                html += '<tr>';
                                html += "<td width='20%' height='30px' align='center'>" +'<a href="#" onclick="JobDetail(\''+data.d[i]["JobNo"]+'\')" style="color:blue;">'+ data.d[i]["JobNo"]+'</a>'+"</td>"; 
                                html += "<td width='30%' height='30px' align='center'>" + data.d[i]["StartDate"] + "</td>"; 
                                html += "<td width='5%' height='30px' align='center'>"+'<img src="img/feedbackicon.png" onclick="feedBackDriver(\''+data.d[i]["JobNo"]+'\')"</img>'+"</td>"
                                
                                if(data.d[i]["isJobCompleted"] === true)
                                   {
                                       html += "<td width='25%' height='30px' align='center'>"+'<label style="color:green">Completed</label>'+"</td>";
                                   }
                                else if(!isCabNow || isCabNow)
                                {
                                   if(isJobAlive === true)
                                   {
                                       html += "<td width='25%' height='30px' align='center'>"+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="reject-btn" value="Abort" onclick="AbortJob(\''+data.d[i]["JobNo"]+'\')"/>'+"</td>";   
                                   }
                                   else if(isJobAlive=== false)
                                   {
                                        html += "<td width='25%' height='30px' align='center'>"+'<label style="color:red">Aborted</label>'+"</td>";
                                   }
                                }
                                 html += '</tr>';    
                             }
                        html +='</tbody>';
                        html +='</table>';
                        $('#msg').html('');
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
     $.ajax({url:"http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/GetCabNowData",
            type:"POST",
            dataType: "Json",
            data:"{'JobNumber':'" +JobNumber+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {                
                var isDriverRatingLocked = data.d.IsDriverRatingLocked;
                var isJobAlive = data.d.IsJobAlive;
                var custFeed = data.d.CustomerFeedback;
                var startDate = data.d.StartDate; 
                var startTime = data.d.StartTime;
                var fromLoc = data.d.FromLocation;
                var toLoc = data.d.ToLocation;
                var isJobCompleted = data.d.IsJobCompleted;                
                var driverFeedback = data.d.DriverFeedback;                

                if(custFeed  !== null)
                {                 
                    $('#horizontalline').show();
                    $('#commenttext').show();
                    $('#driverFeedback2').show();    
                    $('#lblDriverFeedback2').text(": "+ custFeed);
                }
                else
                {
                    $('#driverFeedback2').hide();
                    $('#horizontalline').hide();
                    $('#commenttext').hide();
                }
                if(driverFeedback!== null)
                {
                    $('#horizontalline').show();
                    $('#commenttext').show();
                    $('#customerFeedback2').show();    
                    $('#lblmyFeedback2').text(": "+driverFeedback );
                    $('#txtarComments').hide();
                }
                else
                    $('#customerFeedback2').hide();

                if(isJobCompleted === "True")
                {
                    if(isDriverRatingLocked === "True")
                    {
                        if(custFeed!== null)
                        {        
                            document.getElementById('txtarComments').value = custFeed;
                            $('#txtarComments').attr("readOnly",true);
                            $('#txtarComments').hide();
                        }
                        $('#lbljobNo').text(JobNumber);
                        $('#lblFeeddate').text(startDate);
                        $('#lblFeedTime').text(startTime);
                        $('#lblFeedFrom').text(fromLoc);
                        $('#lblFeedTo').text(toLoc);
                        $('#popup_box').fadeIn("fast");
                        $('#divFeedBack').fadeIn("fast");
                        $('#trbtnPopup').hide();
                        $('#trbtnOK').show();
                        $('#transparent_div').show();
                    }
                    else if(isDriverRatingLocked === "False")
                    {                           
                        $('#lbljobNo').text(JobNumber);
                        $('#lblFeeddate').text(startDate);
                        $('#lblFeedTime').text(startTime);
                        $('#lblFeedFrom').text(fromLoc);
                        $('#lblFeedTo').text(toLoc);  
                        $('#txtarComments').attr("readOnly",false);
                        $('#txtarComments').show();
                        $('#popup_box').fadeIn("fast");
                        $('#divFeedBack').fadeIn("fast");
                        $('#trbtnPopup').show();
                        $('#transparent_div').show();
                        $('#trbtnOK').hide();
                        $('#txtarComments').val("");
                    }
                }
                else if(isJobAlive === "False")
                    jAlert('This job has been aborted. You cannot give feedback.', 'ECABS4U');
                else if(isJobAlive === "True")
                    jAlert('Feedback will be accepted after the cab ride.', 'ECABS4U');
            },            
            error: function (XMLHttpRequest, textStatus, errorThrown) {}
  });  
}

function CancelFeedBack()
{
    $('#divFeedBack').hide("fast");
    $('#popup_box').hide("fast");
     $('#transparent_div').hide();
    //document.getElementById('sel').value = 0;
    document.getElementById('txtarComments').value = "";  
    
}

function JobDetail(data)
{
    var url = "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/JobDetailDriver";
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

function makeCall()
{
    var number = $('#lblCustomerContact').text();
    console.log(number);
    window.location.href = "tel:" + number;    
}

function showDetail(data)
{
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lbltDate').text(": "+data.d[2]);
    //$('#lblTime').text(": "+data.d[3]);
    //Conversion of time formate.
    var time = data.d[3];
    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format == "PM" && hrs < 12) hrs = hrs + 12;
    if (format == "AM" && hrs == 12) hrs = hrs - 12;
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
       //$('#idName').show();
       $('#custFeedback').show();
       // $('#lblCustomerFeedback').text(": "+data.d[9] + " (Rating- "+data.d[13]+")"); 
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
       // $('#labelline').hide();
    }
    
    $('#popup_box').show();
    $('#divCabLaterBooking').show();
     $('#transparent_div').show();
}

function Cancel()
{
    $('#popup_box').fadeOut("fast");
    $('#divCabLaterBooking').fadeOut("fast");
     $('#transparent_div').hide();
}

function SubmitReject()
{
    var jobNumber = $('#lblJobNumber').val();   
    var abortMessage = $('#txtAbortmsg').val();
    if(!abortMessage)
    {
        jAlert('Please enter a reason.', 'ECABS4U');
        return false;
    }
      var url = "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/AbortCurrentJobDriver";    
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
             if(data.d === "true")
             {
                $('#popup_box1').fadeOut("fast");
                $('#divAbortTask').fadeOut("fast");
                $('#txtAbortmsg').val("");
                $('#transparent_div').hide();
                
                navigator.notification.alert(
                "Job aborted successfully.",
                abortedByDriver,
                'ECABS4U',
                "OK"
                );
                function abortedByDriver()
                {
                   window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId; 
                }
             }                          
         },                    
         error: function (XMLHttpRequest, textStatus, errorThrown) { }
      });
    
}
function CancelReject()
{
    $('#popup_box1').fadeOut("fast");
    $('#divAbortTask').fadeOut("fast");
    $('#transparent_div').hide();
    $('#txtAbortmsg').val("");
}

function AbortJob(data)
{
    var jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    navigator.notification.confirm(
    "Do you want to abort the current job?",
    onAbortCallback,
    "Confirm",
    "Yes,No"
    );
}

function onAbortCallback(buttonIndex)
{
    if(buttonIndex == 2)
    {
        return false;
    }
    else if(buttonIndex == 1)
    {
        $('#transparent_div').show();
        $('#popup_box1').fadeIn("fast");
        $('#divAbortTask').fadeIn("fast");
    }
}

function PostFeedBack()
{
   var requestID= $('#lbljobNo').text();
   //var getRating = document.getElementById('sel').value;
   var getComments = document.getElementById('txtarComments').value;
    //if(getRating == 0)
    //{
       // alert("Please select rating.");
       // return false;
   // }
    if(!getComments)
    {
        jAlert('Please enter comments.', 'ECABS4U');
        //alert("Please enter comments.");
        return false;
    }
    
     $.ajax({url:"http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/DriverFeedbackForCustomer",
             beforeSend: function(){
                $('#imgLoader').show();
             },
             complete: function(){
                $('#imgLoader').hide();
             },
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','reqID':'" +requestID+"','feedback':'" +getComments+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                jAlert('Feedback comment posted successfully.', 'ECABS4U');
                //alert("Feedback comment posted successfully");
                document.getElementById('txtarComments').value ="";
                //document.getElementById('sel').value = 0;
                $('#divFeedBack').fadeOut("fast");
                $('#popup_box').fadeOut("fast");
                $('#transparent_div').hide();
                },
         });  
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


