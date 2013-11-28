//query string 

var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
//back to index
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
                                //alert(count);
                                if(count > 0)
                                {
                                        var html = '<table cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                                        html += '<thead style="background-color:#0A0A2A;color:#fff;">';
                                        html += '<tr>';
                                        html += '<th class="th4 font">JobNo</th>';
                                        //html += '<th class="th4 font">Date</th>';
                                        //html += '<th class="th4 font">Time</th>';
                                        html += '<th class="th4 font">From</th>';
                                        html += '<th class="th4 font">To</th>';
                                        html += '<th class="th4 font">Status</th>'; 
                                        html += '</tr>';
                                        html += '</thead>';
                                                       html +='<tbody class="body-style altColor"  style="font-size:14px;">';  
                                                            for(var i=0; i<count; i++)
                                                            {
                                                               $('#lbljobFeed').text(data.d[i]["JobNo"]);
                                                               var isCabNow = data.d[i]["isCabNow"];
                                                               var isJobAlive = data.d[i]["isJobAlive"];
                                                               html += '<tr>';
                                                               html += "<td width='25%' align='center'>" +'<a href="#" onclick="feedBackDriver(\''+data.d[i]["JobNo"]+'\')" style="color:blue;" onclick="">'+ data.d[i]["JobNo"]+'</a>' + "</td>";
                                                               html += "<td width='25%' align='center' style='display:none'>" + data.d[i]["StartDate"] + "</td>";
                                                               html += "<td width='25%' align='center' style='display:none'>" + data.d[i]["StartTime"] +"</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["FromLoc"] +"</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["ToLoc"] +"</td>";
                                                               
                                                               
                                                            if(!isCabNow)
                                                            {
                                                                if(isJobAlive == true || isJobAlive == null)
                                                                {
                                                                    html += "<td width='25%' height='30px' align='center'>"+'<input type="button" value="Abort" onclick="AbortJob(\''+data.d[i]["JobNo"]+'\')"/>'+"</td>";   
                                                                }
                                                                else if(isJobAlive == false)
                                                                {
                                                                     html += "<td width='25%' height='30px' align='center'>"+'<label style="color:red">Aborted</label>'+"</td>";
                                                                }
                                                            }
                                                            else
                                                            {
                                                              html += "<td width='25%' height='30px' align='center'>"+"</td>";  
                                                            }
                                                            html += '</tr>';    
                                                            }
                                                       html +='</tbody>';
                                           html +='</table>';
                                        $('#msg').append(html);
                                 }
                                else
                                {
                                    alert("No history found");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) 
                            {
                                alert(errorThrown);
                            }
                        });
                
}

//feedback
function feedBackDriver(JobNumber )
{
     $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabNowDataForDriver",
            type:"POST",
            dataType: "Json",
            data:"{'JobNumber':'" +JobNumber+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                    var isRatingLocked = data.d[1];
                    var isJobAlive = data.d[2];
                    var rating = data.d[3];
                    var custFeed = data.d[4];
                    var startDate = data.d[5]; 
                    var startTime = data.d[6];
                    var fromLoc = data.d[7];
                    var toLoc = data.d[8];
                
                   if(isJobAlive == "True" || isJobAlive == "")
                    {
                        if(isRatingLocked == "True")
                        {
                               document.getElementById('sel').value = rating;
                               document.getElementById('txtarComments').value = custFeed;
                               $('#sel').attr('disabled',true);
                               $('#txtarComments').attr("readOnly",true);
                               $('#popup_box').show();
                               $('#divFeedBack').show();
                               $('#trbtnPopup').hide();
                               $('#trbtnOK').show();
                            
                               $('#lbljobNo').text(JobNumber);
                               $('#lblFeeddate').text(startDate);
                               $('#lblFeedTime').text(startTime);
                               $('#lblFeedFrom').text(fromLoc);
                               $('#lblFeedTo').text(toLoc);
                               
                            
                        }
                        else if(isRatingLocked == "")
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
                               $('#trbtnOK').hide();
                        }
                    }
                    else
                    {
                        alert('Job has been aborted, you cannot give feedback');
                    }
       },            
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
  });  
}

//cancel feedback
function CancelFeedBack()
{
    $('#divFeedBack').hide();
    $('#popup_box').hide();
    document.getElementById('sel').value = 0;
    document.getElementById('txtarComments').value = "";
    
    
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
    
    //TODO: write service to abort the job and send email to the customer
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
                              $('#freezBack').hide();
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
    $('#freezBack').hide();
    $('#txtAbortmsg').val("");
}

function AbortJob(data)
{
    var jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    var isTrue = confirm("Do you want to abort the current Cab.");
    if(isTrue)
    {
        
        //$('#lblJobNumber').text(data);
        $('#freezBack').show();
        $('#popup_box1').show();
        $('#divAbortTask').show();
    }
    else
    {
        return false;
    }
    
}



//feedback post
function PostFeedBack()
{
   var requestID= $('#lbljobNo').text();
   var getRating = document.getElementById('sel').value;
   var getComments = document.getElementById('txtarComments').value;
    if(getRating == 0)
    {
        alert("Please select Rating.");
        return false;
    }
    if(!getComments)
    {
        alert("Please enter Comments.");
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
                alert("Feedback comment posted successfully!");
                document.getElementById('txtarComments').value ="";
                document.getElementById('sel').value = 0;
                $('#divFeedBack').hide();
                $('#popup_box').hide();
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
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
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
          $.cookie("remember", false);
          //$.cookie("userName", 'null');
          //$.cookie("userPassword", 'null');
          window.location = "index.html";  
}
//Customer Feedback 
function feedBack()
{
       window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//back to index
function backtostart()
{
        window.location="index.html";
}

//Accepting the Request.    
function seeRequest()
{
        window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 //cancel the Request.
function closeRequest()
{
         $.ajax({
                  url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                  type:"POST",
                  datatype:"json",
                  data:"{'userID':'" +relatedId+ "'}",
                  contentType: "application/json; charset=utf-8",                     
                  success: function (data) 
                     {
                         $('#popup_box').hide();
                          $('#divDealStart').hide();
                    },
                  error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                            $('#popup_box').hide();
                          $('#divDealStart').hide(); 
                      }
            });
    
}


    
    
    
