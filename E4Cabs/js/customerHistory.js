var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var jobNo;
var btnarray = ["Yes","No"];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
    console.log("ready");
}

function backToIndex()
{
   window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}
window.onload = gethistory();

  $(function() {
      $.fn.raty.defaults.path = 'lib/img';

     /* $('#default-demo').raty({
        click: function(score, evt) {
          alert('ID: ' + $(this).attr('id') + "\nscore: " + score + "\nevent: " + evt.type);
        }
      });*/
    });

function gethistory()
{
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerHistoryDetails";
                $.ajax(url, {
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: function (data) {                   
                        var count = data.d.length;
                        if(count > 0)
                        {
                                var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                                html += '<thead class="thead-grid">';
                                html += '<tr>';
                                html += '<th>JobNo</th>';
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
                                           html += "<td width='5%' height='30px' align='center'>"+'<img src="img/feedbackicon.png" onclick="feedBackCustomer(\''+data.d[i]["JobNo"]+'\')"</img>'+"</td>"
                                           
                                             if(data.d[i]["isJobCompleted"] === true)
                                                {
                                                    html += "<td width='25%' height='30px' align='center'>"+'<label style="color:green">Completed</label>'+"</td>";
                                                }
                                            
                                            else if(isCabNow || !isCabNow)
                                             {
                                                if(isJobAlive === true)
                                                {
                                                    html += "<td width='25%' height='30px' align='center'>"+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="reject-btn" value="Cancel Job" onclick="AbortJob(\''+data.d[i]["JobNo"]+'\')"/>'+"</td>";   
                                                }
                                                else if(isJobAlive === false)
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
                        //alert(errorThrown);
                    }
                });
                
            }
 
function AbortJob(data)
{   
    console.log('in abort');
    jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    navigator.notification.confirm(
    "Do you want to cancel the current cab order.",
    onAbortCallback,
    "Confirm",
    btnarray
    );
}

function onAbortCallback(btnIndex)
{
    if(btnIndex === 2)
    {
        return false;
    }
    else if(btnIndex === 1)
    {
        $('#popup_box1').fadeIn("fast");
        $('#divAbortTask').fadeIn("fast");
        $('#transparent_div').show();
    }
}

function JobDetail(data)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/JobDetailCustomer";
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
    var number = $('#lblDriverContact').text();
    console.log(number);
    window.location.href = "tel:" + number;    
}

function showDetail(data)
{
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lbltDate').text(": "+data.d[2]);
    $('#lblTime').text(": "+data.d[3]);
    $('#lblFrom').text(": "+data.d[4]);
    $('#lblTo').text(": "+data.d[5]);
    $('#lblDriverName').text(": "+data.d[6]);
    
    $('#lblDriverContact').text(data.d[7]);
    $('#lblDriverContact').css("font-weight", 900);
    
    $('#lblNoOfPassenger').text(": "+data.d[8]);
    if(data.d[9]!=="No Driver Comments")
    {
    $('#driverFeedback').show();
   // $('#driverFeedback2').show();    
    $('#labelline').show();
    $('#lblDriverFeedback').text(": "+data.d[9]);
    //$('#lblDriverFeedback2').text(": "+data.d[9]);
    }
    else
    {
        $('#driverFeedback').hide();
      //  $('#driverFeedback2').hide();
        $('#labelline').hide();
    }
    
    
     if(data.d[10]!== "No Return")
    {
        $('#rtnfrom').show();
        $('#lblreturnfrom2').text(": "+data.d[10]);
    }
    else
    {
        $('#rtnfrom').hide();
       
    }
    if(data.d[11]!== "No Return")
    {
        
         $('#rtnto').show();
        
        $('#lblreturnto2').text(": "+data.d[11]);
    }
    else
    {
       //$('#rtnto').hide();
        $('#rtnto').hide();
    }
    
     if(data.d[12]!=="No Customer Feedback")
    {
    $('#customerFeedback').show();
   // $('#customerFeedback2').show();
    $('#labelline').show();
    $('#lblmyFeedback').text(": "+data.d[12]);
    //$('#lblmyFeedback2').text(": "+data.d[12]);
    }
    else
    {
        $('#customerFeedback').hide();
        //$('#customerFeedback2').hide();
         $('#labelline').hide();
    }
    
    $('#transparent_div').show();
    $('#popup_box').fadeIn("fast");
    $('#divCabLaterBooking').fadeIn("fast");
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
        alert('Please enter your reason.');
        return false;
    }
    
    //TODO: write service to abort the job and send email to the customer
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/AbortCurrentJobCustomer";
    
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
                              alert("Job cancelled.");
                              window.location='CustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }                         
                     },
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
             });
    
}

function CancelReject()
{
    $('#popup_box1').fadeOut("fast");
    $('#divAbortTask').fadeOut("fast");
    $('#txtAbortmsg').val("");
    $('#transparent_div').hide();
}


//feedback
function feedBackCustomer(JobNumber )
{
     $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabNowDataForCustomer",
            type:"POST",
            dataType: "Json",
            data:"{'JobNumber':'" +JobNumber+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {

                    var isCustomerRatingLocked = data.d[1];
                    var isJobCompleted = data.d[2];
                    var custrating = data.d[3];
                    var custFeed = data.d[4];
                    var startDate = data.d[5]; 
                    var startTime = data.d[6];
                    var fromLoc = data.d[7];
                    var toLoc = data.d[8];
                    var isJobAlive = data.d[9];
                
                
                if(data.d[10]!== null)
                  {
                 
                      $('#horizontalline').show();
                      $('#commenttext').show();
                    $('#driverFeedback2').show();    
                    $('#lblDriverFeedback2').text(": "+data.d[10]);
     			 }
    			else
   			 {
        
   		         $('#driverFeedback2').hide();
                     $('#horizontalline').hide();
                      $('#commenttext').hide();
        
    			}
                if(custFeed!== null)
                  {
                    $('#horizontalline').show();
                    $('#commenttext').show();
                    $('#customerFeedback2').show();    
                    $('#lblmyFeedback2').text(": "+data.d[4]);
     			 }
    			else
   			 {
        
   		         $('#customerFeedback2').hide();
                    $('#horizontalline').hide();
                      $('#commenttext').hide();
        
    			}
                   
                
                     if(isJobCompleted === "True" || isJobAlive === "False")
                     {
                        console.log(isJobCompleted);
                        if(isCustomerRatingLocked === "True") //show read only
                        {
                               document.getElementById('sel').value = custrating;
                               document.getElementById('txtarComments').value = custFeed;
                               $('#sel').attr('disabled',true);
                               $('#txtarComments').attr("readOnly",true);
                            	$('#txtarComments').hide();
                               $('#popup_box').fadeIn("fast");
                               $('#divFeedBack').fadeIn("fast");
                               $('#trbtnPopup').hide();
                               $('#trbtnOK').show();
                               $('#transparent_div').show();
                            
                               $('#lbljobNo').text(JobNumber);
                               $('#lblFeeddate').text(startDate);
                               $('#lblFeedTime').text(startTime);
                               $('#lblFeedFrom').text(fromLoc);
                               $('#lblFeedTo').text(toLoc); 
                           
                            
                        }
                        else if(isCustomerRatingLocked === "False")
                        {
                               $('#lbljobNo').text(JobNumber);
                               $('#lblFeeddate').text(startDate);
                               $('#lblFeedTime').text(startTime);
                               $('#lblFeedFrom').text(fromLoc);
                               $('#lblFeedTo').text(toLoc);    
                         
                               $('#sel').attr('disabled',false);
                               $('#txtarComments').attr("readOnly",false);
                            	$('#txtarComments').show();
                               $('#popup_box').fadeIn("fast");
                               $('#divFeedBack').fadeIn("fast");
                               $('#trbtnPopup').show();                            
                               $('#trbtnOK').hide();
                               $('#transparent_div').show();
                        }
                      }
                      //else if(isJobAlive === "False")
                      //{
                         // alert('This job has been cancelled. You cannot give feedback.');
                      //}
                else if(isJobAlive === "True")
               {
               alert('Feedback will be accepted after the cab ride.');
                }
       },            
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
  });  
}

//cancel feedback
function CancelFeedBack()
{
    $('#divFeedBack').hide("fast");
    $('#popup_box').hide("fast");
    $('#transparent_div').hide();
    document.getElementById('sel').value = 0;
    document.getElementById('txtarComments').value = "";
    $('#txtarComments').show();
    
}
//feedback post
function PostFeedBack()
{
    
    
   var requestID= $('#lbljobNo').text();
   var getRating = document.getElementById('sel').value;
    //alert(getRating);
   var getComments = document.getElementById('txtarComments').value;
    if(getRating === 0)
    {
        alert("Please select rating.");
        return false;
    }
    if(!getComments)
    {
        alert("Please enter comments.");
        return false;
    }
    
    
   $.ajax({
             url:"http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerFeedbackForDriver",
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
                alert("Feedback has been added successfully.");
                document.getElementById('txtarComments').value ="";
                document.getElementById('sel').value = 0;
                $('#divFeedBack').fadeOut("fast");
                $('#popup_box').fadeOut("fast");
                $('#transparent_div').hide();
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         });  
}
function backtostart()
{
    window.location="index.html";
}
function searchpage()
{
    window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function myProfile()
 {
     window.location = 'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }
function myBooking()
{ 
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
  window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

