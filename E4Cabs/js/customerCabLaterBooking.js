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
                                html += '<thead class="thead-grid">';
                                html += '<tr>';
                                html += '<th>JobNo</th>';
                                html += '<th>Fare</th>';
                            	html += '<th>From</th>';
                                html += '<th>To</th>';
                                html += '<th>Status</th>';  
                               
                                
                                html += '</tr>';
                                html += '</thead>';
                                               html +='<tbody style="background-color:#CEECF5;">';  
                                                    for(var i=0; i<count; i++)
                                                    {
                                                      fare = data.d[i]["Fare"];
                                                        $('#lbljobFeed').text(data.d[i]["CustomerRequestID"]);
                                                       var isJobBooked = data.d[i]["IsBooked"];
                                                       var driverID = data.d[i]["DriverID"];
                                                         var driverImgUrl = data.d[i]["DriverPhoto"];
                                                         var vehicleImgUrl = data.d[i]["VehicleImages"];
                                                       html += '<tr>';
                                                       html += "<td style='width:25%;height:35px;text-align:center;'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["DriverID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                                                        if(fare !== "0" )
                                                       {
                                                           html += "<td style='width:15%;height:35px;text-align:center;'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                                                       }
                                                        else{
                                                            html += "<td style='width:15%;height:35px;text-align:center;'>Waiting</td>";
                                                        }
                                                       html += "<td style='width:25%;height:35px;text-align:center;'>" + data.d[i]["From"] +"</td>";
                                                       html += "<td style='width:25%;height:35px;text-align:center;'>" + data.d[i]["To"] +"</td>";
                                                       if(fare !== "0")
                                                       {
                                                            if(isJobBooked == "True")
                                                            {
                                                             	html += "<td style='width:25%;height:35px;text-align:center;'>Cab Booked</td>";
                                                                 html += "<td style='width:10%;height:35px;text-align:center;'>"+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Abort" onclick="CancelBookedJob(\''+data.d[i]["CustomerRequestID"]+'\')"/>'+"</td>";
                                                            }
                                                            else
                                                            {
                                                                 html += "<td style='width:15%;height:35px;text-align:center;'>"+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="accept-btn" value="Hire" onclick="HireDriver(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["DriverID"]+'\')"/>'+"</td>";
                                                            }
                                                        }
                                                        else
                                                        {
                                                            html += "<td style='width:25%;height:35px;text-align:center;'>Awaiting Bids</td>";
                                                        }
                                                        
                                                       html += '</tr>';
                                                        
                                         //added new 2nd row
                                                        
                                         html += '<tr style="background-color:white;">';           
                                         var rating3 = data.d[i]["RatingPast"];
                                         var rating4 = data.d[i]["RatingPresent"];
                
                                      html += '<td style="width:100%;text-align:left;" colspan="2"><img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImageLater(this)\"/>'
                                     if(fare !== "0" )
                                                       {
                                                        
                                                        html += '<img src="'+vehicleImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImageLater(this)\"/>'
                                                        }
                                                           if(rating3 !== "")
                          {
                                   if(rating3 === "1")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/1star.PNG" style="width:18%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating3 === "2")
                                    {
                                     
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/2star.PNG" style="width:33%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating3 === "3")
                                    {                                     
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/3star.PNG" style="width:45%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating3 === "4")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/4star.PNG" style="width:58%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating3 === "5")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/5star.PNG" style="width:70%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                          }
                          else
                           {
                                html += '<td style="width:30%;text-align:center;" colspan=""><img src="img/5star.PNG" style="width:70%" onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>'
                           }
                          if(rating4 !== "")
                          {
                                   if(rating4 === "1")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/1star.PNG" style="width:18%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating4 === "2")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/2star.PNG" style="width:33%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating4 === "3")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/3star.PNG" style="width:45%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating4 === "4")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/4star.PNG" style="width:58%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                                    else if(rating4 === "5")
                                    {
                                        html += '<td style="width:100%;text-align:center;" colspan="2"><img src="img/5star.PNG" style="width:70%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                                    }
                          }
                          else
                           {
                               html += '<td style="width:100%;text-align:center;" colspan=""><img src="img/5star.PNG" style="width:70%" onclick="showRatingBoxLaterPresent(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                           }
                          html += '</tr>';
                                                        //border-bottom:1px solid #0080FF
                                                        html += '<tr style="background-color:white">';
                                                         html += '<td colspan="5"><hr ></td>';
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
                        
                    }
                });
 }

function ShowDetailBooking(jobNo, driverid)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCCabLaterBooking";
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
    $('#lblJobNo').text(": "+data.d[0]);
    if(data.d[1] !== null)
    {
        $('#lblFare').html(": "+'&pound'+data.d[1]);
    }
    else
    {
         $('#lblFare').html(": "+'Waiting for response.');
    }
    $('#lblDriverName').text(": "+data.d[2]);
    $('#lblStartDate').text(": "+data.d[3]);
    $('#lblStartTime').text(": "+data.d[4]);
    $('#lblSearchTime').text(": "+data.d[5]);
    $('#lblBidTime').text(": "+data.d[6]);
    if(data.d[7] !== null)
    {
        $('#lblDSR').html(": "+ data.d[7]);
    }
    else
    {
         $('#lblDSR').html(": "+'Waiting for response.');
    }
    console.log(data.d);
    if(data.d[8] !== ""){
        $('#lblDriverRating').text(": "+data.d[8]); 
    }
    else{
    	$('#lblDriverRating').text(": Rating not available.");  
    }
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
                        alert('Booking in progress. Please check later.');
                        window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                        
                    }
                });
}

function backtostart()
{
    window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function CancelBookedJob(data)
{
    var jobNo = data;
    document.getElementById("lblJobNumber").value = jobNo;
    var isTrue = confirm("Do you want to abort the current cab?");
    if(isTrue)
    {
        $('#freezBack').show();
        $('#popup_box1').show();
        $('#divAbortTask').show();
        $('#transparent_div').show();
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
        alert('Please enter your reason.');
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
                              $('#transparent_div').hide();
                              alert("Job aborted.");
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
    $('#transparent_div').hide();
}


//make image bigger
function ShowLargeImageLater(imgUrl)
{
    var imageUrl = imgUrl.src;
    console.log(imgUrl.src);    
    $('#imgDV').attr("src",imageUrl);
    $('#popup_box').fadeIn("fast");
    $('#imgDiv').fadeIn("fast");
    $('#transparent_div').fadeIn("fast");
    window.clearInterval(id);
}

//make image smaller

function hideImageLater()
{
    $('#transparent_div').hide();
    $('#popup_box').hide("fast");
    $('#imgDiv').hide("fast");
    id = window.setInterval(getResponse, 10000);
}


function showRatingBoxLaterpast(driverImgUrl, driverID)
{    
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetRatingFeedback",
        type: "POST",
        dataType: "Json",
        data: "{'driverID':'" + driverID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function(data)
        {    
          // alert(data.d);
            $('#feedback-content').empty();
            if(data.d["0"] === null && data.d["1"] === null && data.d["2"] === null && data.d["3"] === null)
            {
                alert('No comments found');
            }
            else
            {   
                
                if(data.d["1"] !== null)
                {
                    var table1 = '<table width="99%" style="border-collapse:collapse;">';
                    table1 += '<tr><td style="width:20%">';
                    table1 += '<img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px;text-align:left"/>';
                    table1 += '</td>';
                    table1 += '<td style="text-align:left;width:80%">'+'Customer :'+data.d["1"]+'</td></tr>';
                    if(data.d["0"] === null)
                    {
                        table1 += '<tr>';
                        table1 += '<td style="width:20%;border-bottom:1px solid black"><img src="img/man.png" style="height:50px;border-radius:4px;"/></td>';
                        table1 += '<td style="text-align:left;width:80%;border-bottom:1px solid black">'+'Driver: (No any reply)'+'</td>';                    
                        table1 += '</tr>';
                    }
                    else
                    {
                        table1 += '<tr>';
                        table1 += '<td style="width:20%;border-bottom:1px solid black"><img src="img/man.png" style="height:50px;border-radius:4px;"/></td>';
                        table1 += '<td style="text-align:left;width:80%;border-bottom:1px solid black">'+'Driver :'+data.d["0"]+'</td>';                    
                        table1 += '</tr>';
                    }
                    table1 += '</table>';
                }
                else{
                    var table1 = '<table width="99%" style="border-collapse:collapse;">';
                    table1 += '<tr><td style="width:80%">No Feedback available.';
                    table1 += '</td></tr>';
                    table1 += '</table>';
                }
                
                $('#feedback-content').append(table1);
              //  $('#feedback-content').append(table2);
                $('#popup_box').fadeIn("fast");
                $('#divRatingFeedback').fadeIn("fast");                
           }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

function showRatingBoxLaterPresent(driverImgUrl, driverID)
{    
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetRatingFeedback",
        type: "POST",
        dataType: "Json",
        data: "{'driverID':'" + driverID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function(data)
        {    
          // alert(data.d);
            $('#feedback-content').empty();
            if(data.d["0"] === null && data.d["1"] === null && data.d["2"] === null && data.d["3"] === null)
            {
                alert('No comments found');
            }
            else
            {   
                
                if(data.d["3"] !== null)
                {
                    var table2 = '<table width="99%" style="border-collapse:collapse;margin-top:5px">';
                    table2 += '<tr><td style="width:20%">';
                    table2 += '<img src="'+driverImgUrl+'" style="height:50px;border-radius:4px;text-align:left"/>';
                    table2 += '</td>';
                    table2 += '<td style="text-align:left;width:80%">'+'Customer :'+data.d["3"]+'</td></tr>';
                    if(data.d["2"] === null)
                    {                       
                        table2 += '<tr>';
                     table2 += '<td style="width:20%;border-bottom:1px solid black"><img src="img/man.png" style="height:50px;border-radius:4px;"/></td>';
                        table2 += '<td style="text-align:left;width:80%;border-bottom:1px solid black">'+'Driver: (No any reply)'+'</td>';                    
                        table2 += '</tr>';
                    }
                    else
                    {
                        table2 += '<tr>';
                        table2 += '<td style="width:20%;"><img src="img/man.png" style="height:50px;border-radius:4px;"/></td>';
                        table2 += '<td style="text-align:left;width:80%;">'+'Driver: '+data.d["2"]+'</td>';                    
                        table2 += '</tr>';
                    }
                    table2 += '</table>';
                }
                else{
                    var table2 = '<table width="99%" style="border-collapse:collapse;">';
                    table2 += '<tr><td style="width:80%">No Feedback available.';
                    table2 += '</td></tr>';
                    table2 += '</table>';
                }
                
                
               // $('#feedback-content').append(table1);
               $('#feedback-content').append(table2);
                $('#popup_box').fadeIn("fast");
                $('#divRatingFeedback').fadeIn("fast");                
           }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
function HideDisplay()
{
    $('#divRatingFeedback').hide();
    $('#popup_box').hide();    
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
