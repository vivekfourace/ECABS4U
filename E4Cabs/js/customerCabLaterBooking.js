var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = getCablaterBooking();

function getCablaterBooking()
{
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerCabLaterBooking";
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
                                html += '<thead style="background-color:#0A0A2A;color:#fff;">';
                                html += '<tr style="height:30px">';
                                html += '<th class="th4 font">JobNo</th>';
                                html += '<th class="th4 font">Fare</th>';
                                html += '<th class="th4 font">From</th>';
                                html += '<th class="th4 font">To</th>';
                                html += '<th class="th4 font">Status</th>';                           
                                
                                html += '</tr>';
                                html += '</thead>';
                                               html +='<tbody class="body-style altColor"  style="font-size:14px;">';  
                                                    for(var i=0; i<count; i++)
                                                    {
                                                       $('#lbljobFeed').text(data.d[i]["CustomerRequestID"]);
                                                       var isJobBooked = data.d[i]["IsBooked"];
                                                       var driverID = data.d[i]["DriverID"];
                                                       console.log(driverID);
                                                       html += '<tr>';
                                                       html += "<td width='25%' height='30px' align='center'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["DriverID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                                                       html += "<td width='15%' height='30px' align='center'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                                                       html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                                                       html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
                                                       if(isJobBooked == "True")
                                                       {
                                                           html += "<td width='25%' height='30px' align='center'>Cab Booked</td>";
                                                           html += "<td width='10%' height='30px' align='center'>"+'<input type="button" value="Abort" onclick="CancelBookedJob(\''+data.d[i]["CustomerRequestID"]+'\')"/>'+"</td>";
                                                       }
                                                       else
                                                        {
                                                            html += "<td width='10%' height='30px' align='center'>"+'<input type="button" value="Hire" onclick="HireDriver(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["DriverID"]+'\')"/>'+"</td>";
                                                        }
                                                       
                                                       html += '</tr>';
                                                    }
                                               html +='</tbody>';
                                   html +='</table>';
                                $('#msg').append(html);
                         }
                        else
                        {
                            alert("No Cab Later Booking found.");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                        
                    }
                });
 }

function ShowDetailBooking(jobNo, driverid)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabLaterBooking";
                $.ajax(url, {
                   type:"POST",
                   datatype:"json",
                   data:"{'customerReqID':'"+jobNo+"', 'driverid':'"+driverid+"'}",
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
    $('#lblDriverName').text(data.d[2]);
    $('#lblStartDate').text(data.d[3]);
    $('#lblStartTime').text(data.d[4]);
    $('#lblSearchTime').text(data.d[5]);
    $('#lblBidTime').text(data.d[6]);
    $('#lblDSR').text(data.d[7]);
    $('#lblDriverRating').text(data.d[8]);    
    $('#popup_box').show();
    $('#divCabLaterBooking').show();
    
}

function Cancel()
{
    $('#popup_box').hide();
    $('#divCabLaterBooking').hide();
}
function HireDriver(customerReqID, driverid)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/HireDriverResponse";
                $.ajax(url, {
                   beforeSend: function(){
                        $('#imgLoader').show();
                     },
                     complete: function(){
                        $('#imgLoader').hide();
                     },
                   type:"POST",
                   datatype:"json",
                   data:"{'driverId':'" + driverid + "','requestId':'" + customerReqID + "'}",
                   contentType: "application/json; charset=utf-8",
                    success: function(data){
                        alert('Cab booking is in process, please check after some time.');
                        window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                        
                    }
                });
}

function backtostart()
{
    window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function CancelBookedJob(data)
{
    var jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    var isTrue = confirm("Do you want to abort the current Cab.");
    if(isTrue)
    {
        $('#freezBack').show();
        $('#popup_box1').show();
        $('#divAbortTask').show();
    }
    else
    {
        return false;
    }
    
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
                         if(data.d == "true")
                         {
                              $('#popup_box1').hide();
                              $('#divAbortTask').hide();
                              $('#txtAbortmsg').val("");
                              $('#freezBack').hide();
                              alert("Job aborted successfully.");
                              window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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

function cabNow()
{
      window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function preCab()
{
     window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
      window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function myProfile()
{
     window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
                
                error: function (XMLHttpRequest, textStatus, errorThrown)
              {
              }
          });          
          $.cookie("remember", false);
          //$.cookie("userName", 'null');
          //$.cookie("userPassword", 'null');
          window.location = "index.html";  
  }
