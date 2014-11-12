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
var id;
id = window.setInterval(gethistory, 20000);

  $(function() {
      $.fn.raty.defaults.path = 'lib/img';  
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
                            var isRecentJob, isCabNow, isJobAlive;    
                            for(var i=0; i<count; i++)
                            {
                                $('#lbljobFeed').text(data.d[i]["JobNo"]);
                                isCabNow = data.d[i]["isCabNow"];
                                isJobAlive = data.d[i]["isJobAlive"];
                                isRecentJob = data.d[i]["isRecentJob"];
                                    
                                html += '<tr>';
                                html += "<td width='20%' height='30px' align='center'>" +'<a href="#" onclick="JobDetail(\''+data.d[i]["JobNo"]+'\')" style="color:blue; float: left;padding-left: 21%;">'+ data.d[i]["JobNo"]+'</a>';
                                if(isRecentJob)
                                    html += "<img src='img/StarBlinking.gif' style='height: 15px;float:right;'</img>";
                                html += "</td>"; 
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
                                         html += "<td width='25%' height='30px' align='center'>"+'<label style="color:red">Cancelled</label>'+"</td>";
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
   $('body').css('overflow','hidden');
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
    window.location.href = "tel:" + number;    
}

function showDetail(data)
{
   
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lbltDate').text(": "+data.d[2]);
    // $('#lblTime').text(": "+data.d[3]);
    //Conversion of time formate.
    var time = data.d[3];
    // alert(time);
    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format == "PM" && hrs < 12) hrs = hrs + 12;
    if (format == "AM" && hrs == 12) hrs = hrs - 12;
    var hours = hrs.toString();
    var minutes = mnts.toString();
    if (hrs < 10) hours = "0" + hours;
    if (mnts < 10) minutes = "0" + minutes;
    //alert(hours + ":" + minutes);
     $('#lblTime').text(":"+ hours + ":" + minutes);  
    
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
    
    
    if(data.d[13] !== "")
    {
        $('#driverRating').show();
        $('#starrating2').raty({ score: data.d[13], readOnly: true });
        console.log("stars=" + $('#hiddenstar').val());
    }
    else
    {
        $('#driverRating').hide();
        
    }
                
        
    
    if(data.d[12]!=="No Customer Feedback")
    {
        $('#customerFeedback').show();
        $('#labelline').show();
        $('#lblmyFeedback').text(": "+data.d[12]);
    }
    else
    {
        $('#customerFeedback').hide();
        $('#labelline').hide();
    }
    
    $('#transparent_div').show();
    $('#popup_box').fadeIn("fast");
    $('#divCabLaterBooking').fadeIn("fast");
}

function Cancel()
{
    $('body').css('overflow','auto');
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
        jAlert('Please enter your reason.', 'ECabs4U-Abort Job');
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
                            // jAlert('Job cancelled.', 'ECabs4U-Abort Job');
                             alert("Job cancelled.");
                             // window.location='CustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                            // navigator.notification.alert(
				        	//"Job cancelled.",
  				       	//cancelSuccess, // Specify a function to be called 
 					   	//'ECABS4U',
 							//"OK"
							//);
                        	//function cancelSuccess()
                        	//{
    			     		window.location='CustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
							//}
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

var finalrating ="";
//feedback
function feedBackCustomer(JobNumber )
{
     $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabNowData",
            type:"POST",
            dataType: "Json",
            data:"{'JobNumber':'" +JobNumber+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                $('body').css('overflow','hidden');
                var isCustomerRatingLocked = data.d.IsCustomerRatingLocked;
                var isJobCompleted = data.d.IsJobCompleted;
                var custrating = data.d.DriverRating;
                var custFeed = data.d.CustomerFeedback;
                var startDate = data.d.StartDate; 
                var startTime = data.d.StartTime;
                var fromLoc = data.d.FromLocation;
                var toLoc = data.d.ToLocation;
                var isJobAlive = data.d.IsJobAlive;
                var driverFeedback = data.d.DriverFeedback;
                if(custrating !== ""){
                    $('#starrating').raty({ score: custrating, readOnly: true });
                }
                else{
                    $('#starrating').raty({
                        target : '#hiddenstar',
                        targetType : 'number',
                        score: 0,
                      click: function(score, evt) {
                          finalrating = score;
                      }});
                }                
                if(driverFeedback !== null)
                  {
                     $('#horizontalline').show();
                     $('#commenttext').show();
                     $('#driverFeedback2').show();    
                     $('#lblDriverFeedback2').text(": "+ driverFeedback);
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
                    $('#lblmyFeedback2').text(": "+ custFeed);
     			 }
    			else
   			 {
   		         $('#customerFeedback2').hide();
                    $('#horizontalline').hide();
                    $('#commenttext').hide();        
    			}
                   
                if(isJobCompleted === "True")
                {
                   console.log(isJobCompleted);
                   if(isCustomerRatingLocked === "True") //show read only
                   {
                      if(custFeed!== null)
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
                       $('#txtarComments').val("");
                   }
                }
                else if(isJobAlive === "False")
                {
                    jAlert('This job has been cancelled. You cannot give feedback.', 'ECabs4U-Feedback'); 
                }
              else if(isJobAlive === "True")
             {
                  jAlert('Feedback will be accepted after the cab ride.', 'ECabs4U-Feedback'); 
             }
           },            
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
  });  
}

//cancel feedback
function CancelFeedBack()
{
    $('body').css('overflow','auto');
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
    $('body').css('overflow','auto');
    var requestID= $('#lbljobNo').text();
    if(finalrating === "") { finalrating = 0; }
    var getRating = finalrating;
    var getComments = document.getElementById('txtarComments').value;
    if(getRating === 0)
    {
        jAlert('Please select rating.', 'ECabs4U-Alert'); 
        return false;
    }
    if(!getComments)
    {
        jAlert('Please enter comments.', 'ECabs4U-Alert'); 
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
                jAlert('Feedback has been added successfully.', 'ECabs4U-Feedback'); 
                document.getElementById('txtarComments').value ="";
                $('#divFeedBack').fadeOut("fast");
                $('#popup_box').fadeOut("fast");
                $('#transparent_div').hide();
            },            
            error: function (XMLHttpRequest, textStatus, errorThrown) { }
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

