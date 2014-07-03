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
                           var previousjobID ="";
                           var html = '<table id="tbhist" cellspacing="0" width="100%"  style="border:thin solid;">';
                                html += '<tr class="thead-grid">';
                                html += '<th>JobNo</th>';
                                html += '<th colspan="2">From</th>';
                                html += '<th colspan="2">To</th>';
                                html += '</tr>';
                                for(var i=0; i<count; i++)
                                {
                                    var jobID = data.d[i]["CustomerRequestID"];
                                    var From = data.d[i]["From"];
                                    var To = data.d[i]["To"];
                                    var CustResponse = data.d[i]["CustomerResponse"];
                                    
                                    var DriverName = data.d[i]["DriverName"];
                                    var DriverPhoto = data.d[i]["DriverPhoto"];
                                    var VehicleImages = data.d[i]["VehicleImages"];
                                    var DriverSpecialReq = data.d[i]["DriverSpecialReq"];
                                    var DriverID = data.d[i]["DriverID"];
                                    var Fare = data.d[i]["Fare"];
                                   

                                    if(i>0){
                                    	previousjobID = data.d[i-1]["CustomerRequestID"];}
                                    console.log("PreviousJOBID="+previousjobID);
                                    console.log("JobID="+jobID);
                                   
                                    if(jobID !== previousjobID)
                                    {
                                   	 html += '<tr style="background-color:white">';
                                        html += '<td colspan="5"><hr style="border:2px solid darkred" ></td>';
                                        html += '</tr>';
                                        html += '<tr style="background-color:lightgray;">';
                                        html += '<td style="width:20%;height:35px;text-align:center;"><a href="#" onclick="ShowDetailBooking(\''+jobID+'\')" style="color:blue;">'+ jobID +'</a></td>'; 
                                        html += "<td style='width:40%;height:35px;text-align:center;' colspan='2'>" + From +"</td>";
                                        html += "<td style='width:40%;height:35px;text-align:center;' colspan='2'>" + To +"</td>";
                                        html += '</tr>';
                                        html += '<tr class="thead-grid2">';
                                        html += '<td>Driver</td>';
                                		html += '<td>Vehicle</td>';
                                        html += '<td style="text-align:center;">Fare</td>';
                                   	 html += '<td>Rating </td>';
                                   	 html += '<td>Action </td>';  
                                   	 html += '</tr>';
                                    }
                                    html += '<tr style="border-bottom:1px solid black !important;"><td style="width: 20%;text-align:left;><span style="font-weight:bold;font-size:14px;">' + DriverName + '</span><br/><img src="'+DriverPhoto+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImageLater(this)\"/></td>';
                                    html += '<td style="width: 20%;text-align:left;"><br/><img src="'+VehicleImages+'" style="width:50px;height:50px;border-radius:4px;" onclick="ShowLargeImageLater(this)\"/></td>';
                                    html += "<td style='width: 15%;height:35px;text-align:center;'>"+'&pound' + Fare +"</td>";
                                    html += '<td style="width: 25%;text-align:left;"><input type="button" class="btn-tmp" value="Rating" style="width:80%"; onclick="showRatingBoxLaterPresent(\''+DriverID+'\')"/></td>';
                                    if(Fare > 0)
                                    {
                                        if(CustResponse !== true)
                                        {
                                    		html += "<td style='width: 20%;text-align:center;'>"+'<input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;"  class="accept-btn2" value="Hire" onclick="HireDriver(\''+ jobID +'\',\''+ DriverID +'\')"/>'+"</td>";
                                        }
                                        else
                                        {
                                         	html += "<td style='width: 20%;text-align:center;'>Awaiting driver response</td>";   
                                        }
                                    }
                                    else
                                    {
                                        html += "<td style='width: 20%;text-align:center;'>Awaiting Bids</td>";
                                    }
                                    html += '</tr>'; 
                                }
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
    $('#lblStartDate').text(": "+data.d[1]);
    $('#lblStartTime').text(": "+data.d[2]);
    $('#lblSearchTime').text(": "+data.d[3]);
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
function HireDriver(jobID, driverid)
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
                   data:"{'driverId':'" + driverid + "','requestId':'" + jobID + "'}",
                   contentType: "application/json; charset=utf-8",
                    success: function(data){
                       // $('#check').hide();
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
                    table1 += '</td>';
                    table1 += '<td style="text-align:left;width:80%">'+'Date :'+data.d["2"]+'</td></tr>';
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
                        table1 += '<td style="width:20%;"><img src="img/man.png" style="height:50px;border-radius:4px;"/></td>';
                        table1 += '<td style="text-align:left;width:80%;">'+'Driver :'+data.d["0"]+'</td>';                    
                        table1 += '</tr>';
                       
                    }
                    table1 += '</table>';
                }
                else{
                    //var table1 = '<table width="99%" style="border-collapse:collapse;">';
                    table1 += '<table width="99%" style="border-collapse:collapse;">';
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

function showRatingBoxLaterPresent(driverID)
{    
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetRatingFeedback",
        type: "POST",
        dataType: "Json",
        data: "{'driverID':'" + driverID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function(data)
        {    
        //alert(data.d[i].lenght);
            $('#feedback-content').empty();
             ratingcont = data.d.length;
                //var data2=data.d[0]["StartDate"];
           // alert(data2);
                if(ratingcont > 0)
            {
                    var table2 = '<table width="99%" style="border-collapse:collapse;margin-top:0px">';
                    
                                table2 += '<thead class="thead-grid">';
                                table2 += '<tr>';
                                table2 += '<th>Date</th>';
                                table2 += '<th style="text-align:center">Rating</th>';
                            	table2 += '<th>Customer Comments</th>';
                                table2 += '<th>Driver Replay</th>';
                          
                                table2 += '</tr>';
                                table2 += '</thead>';
                    
                    for(var i = 0; i<ratingcont; i++)
                    {
                       
                        
                        table2 += '<tr><td style="text-align:left;width:25%">'+data.d[i]["StartDate"]+'</td>';
                        //table2 += '<td style="text-align:left;width:25%">'+data.d[i]["DriverRating"]+'</td>';
                        var ratingdriver = data.d[i]["DriverRating"];
                        if(ratingdriver === "1")
                                    {
                                        
                                        table2 += '<td style="width:100%;text-align:center;" colspan=""><img src="img/1star.PNG" style="width:18%" ></td>';
                                    }
                        else if(ratingdriver === "2")
                                    {
                                     
                                        table2 += '<td style="width:100%;text-align:center;" colspan=""><img src="img/2star.PNG" style="width:33%" ></td>';
                                    }
                       else if(ratingdriver === "3")
                                    {                                     
                                        table2 += '<td style="width:100%;text-align:center;" colspan=""><img src="img/3star.PNG" style="width:45%" ></td>';
                                    }
                       else if(ratingdriver === "4")
                                    {
                                        
                                        table2 += '<td style="width:100%;text-align:center;" colspan=""><img src="img/4star.PNG" style="width:55%" ></td>';
                                    }
                        else if(ratingdriver === "5")
                                    {
                                        table2 += '<td style="width:100%;text-align:center;" colspan=""><img src="img/5star.PNG" style="width:65%" ></td>';
                                    }                          
                          else
                                   {
                                        table2 += '<td style="width:30%;text-align:center;" colspan="">No Rating</td>'
                                   }
                         if(data.d[i]["CustomerFeedback"] === null)
                        {
                          table2 += '<td style="text-align:left;width:25%"> -- </td>';  
                        }
                        else
                        {
                            table2 += '<td style="text-align:left;width:25%">'+data.d[i]["CustomerFeedback"]+'</td>';
                            
                        }
                        if(data.d[i]["DriverFeedback"] === null)
                        {
                            table2 += '<td style="text-align:left;width:25%"> -- </td>';
                        }
                        else
                        {
                         table2 += '<td style="text-align:left;width:25%">'+data.d[i]["DriverFeedback"]+'</td>';    
                        }
                        
                        
                         
                        
                    }
                    table2 += '</table>';
               }
            else
            {
                    var table2 = '<table width="99%" style="border-collapse:collapse;">';
                    table2 += '<tr><td style="width:80%">No Feedback available.';
                    table2 += '</td></tr>';
                    table2 += '</table>';  
            }
                
               // $('#feedback-content').append(table1);
               $('#feedback-content').append(table2);
                $('#popup_box').fadeIn("fast");
                $('#divRatingFeedback').fadeIn("fast");                
          
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
