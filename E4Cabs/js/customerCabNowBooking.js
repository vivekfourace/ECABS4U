var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   //do nothing
}
window.onload = getResponse();
function backtosearch() {
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}
//CabNow Logic Start
var id, isAnyDriverHired = false,bidh,bidm;
id = window.setInterval(getResponse, 2000);

function getResponse()
{
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerCabNowBooking",
        type: "POST",
        dataType: "Json",
        data: "{'relatedId':'" + relatedId + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
    
function getData(data) {    
    var count = data.d.length; 
    
    var previousjobID = 0, jobID = 0, DriverID = 0;
    if(count > 0)
    {
        $('#bookingmsgnow').hide();
        $('#cabnowmsg').show();
        DisplayDriversData();
    } 
    else{
       $('#cabnowmsg').empty().append("");
       $('#bookingmsgnow').show();
    }
    function DisplayDriversData()
    {   
        //console.log('in display driver data');
        $('#cabnowmsg').empty();
        $('#divbid').show();
        $('#divawait').hide();
        $('#load').hide();
        //$('#transparent_div').hide();
        var html = '<table id="tbhist" cellspacing="0" width="100%">';
            html += '<tr class="thead-grid">';
            html += '<th>JobNo</th>';
            html += '<th >From</th>';
            html += '<th>To</th>';
            html += '<th></th>';
            html += '</tr>';
        
      
        
        for (var i = 0; i < count; i++) {
        	jobID = data.d[i]["CustomerRequestID"];
            var From = data.d[i]["From"];
            var To = data.d[i]["To"];
            var CustResponse = data.d[i]["CustomerResponse"];           
            var DriverName = data.d[i]["DriverName"];
            var DriverPhoto = data.d[i]["DriverPicUrl"];
            var VehicleImages = data.d[i]["VehicleImageUrl"];
            var spec = data.d[i]["DriverSpecialReq"];
            DriverID = data.d[i]["DriverID"];
            var Fare = data.d[i]["Comments"];
            var searchTime = data.d[i]["SearchTime"];
            var bidTime = data.d[i]["BidTime"];
            getBidTimeData(searchTime,bidTime);
            
            if(i>0){ previousjobID = data.d[i-1]["CustomerRequestID"]; }
            if(jobID !== previousjobID)
            {
           	
                html += '<tr style="background-color:white">';
                html += '<td colspan="5"><hr style="border:2px solid darkred; margin: -2px;" ></td>';
                html += '</tr>';
                html += '<tr style="background-color:lightgray;">';
                html += '<td style="width:20%;height:35px;text-align:center;"><a href="#" onclick="ShowDetailBooking(\''+jobID+'\')" style="color:blue;">'+ jobID +'</a></td>'; 
                html += "<td style='width:20%;height:35px;text-align:center;'>" + From +"</td>";
                html += "<td style='width:20%;height:35px;text-align:center;'>" + To +"</td>";
                html += '<td style="width:20%;height:35px;text-align:center;"><input type="button" class="rejectbtn" value="Cancel Job" style="-webkit-appearance:none;-moz-appearance:none;width:98%"; onclick="CancelJob(\''+jobID+'\')"/></td>';
                html += '</tr>';
                html += '<tr class="thead-grid2">';
                html += '<td style="text-align:center;">Fare</td>';
        		html += '<td style="text-align:center;">Date</td>';
                html += '<td style="text-align:center;">Specs</td>';
           	 html += '<td style="text-align:center;">ETA</td>';
           	 html += '</tr>';
                isAnyDriverHired = false;
                for(var j=0; j<count; j++)
                {
                    if(data.d[j]["CustomerResponse"] === true && data.d[j]["CustomerRequestID"] === jobID)
                    {
                        isAnyDriverHired = true;
                    }
                }
            }
            html += '<tr style="border-bottom:1px solid black !important;">';
            html += "<td style='width: 15%;height:35px;text-align:center;'>"+'&pound' + Fare +"</td>";
            html += "<td width='25%' align='center'>"+'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
            if(spec !== "")
                html += "<td width='10%' align='center'>" + '<img src="img/sc.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
            else
                html += "<td width='10%' align='center'>" + '<img src="img/spec.png"  width="15" height="15" style="color:grey;" onclick="SpecShow(\'Not Available\')"/>' + "</td>";
            html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
            html += "</tr>";
            html += '<tr style="border-bottom:1px solid black !important;">';
            html += '<td style="width: 20%;text-align:left;border-bottom:1px solid black !important;">';
            html += '<a href="#" onclick="showRatingBoxLaterPresent(\''+DriverID+'\')" style="color:blue; font-size: 17px;">'+ DriverName +'</a><br/>';
            html += '<img src="'+DriverPhoto+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImageLater(this)\"/>';
            html += '</td>';
            html += '<td style="width: 20%;text-align:left;border-bottom:1px solid black !important;"><br/><img src="'+VehicleImages+'" style="width:50px;height:50px;border-radius:4px;" onclick="ShowLargeImageLater(this)\"/></td>';
            html += '<td style="width: 25%;text-align:left;border-bottom:1px solid black !important;"><input type="button" class="btn-tmp" value="Rating" style="-webkit-appearance:none;-moz-appearance:none;width:98%"; onclick="showRatingBoxLaterPresent(\''+DriverID+'\')"/></td>';
            if(Fare > 0)
            {
                if(CustResponse !== true)
                {
            		if(isAnyDriverHired === false)
                    {
                        html += "<td style='width: 20%;text-align:center;border-bottom:1px solid black !important;'>"+'<input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;"  class="accept-btn2" value="Hire" onclick="HireDriver(\''+ jobID +'\',\''+ DriverID +'\')"/>'+"</td>";
                    }
                    else
                    {
                        html += "<td style='width: 20%;text-align:center;border-bottom:1px solid black !important;'></td";
                    }
                }
                else
                {
                 	html += "<td style='width: 20%;text-align:center;border-bottom:1px solid black !important;'>"+'Awaiting driver response <span style="color:green; font-size:16px;">Or</span><br/><input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;" class="rejectbtn" value="Cancel Driver" onclick="CancelDriver(\''+ jobID +'\',\''+ DriverID +'\')"/>'+"</td>";   
                }
            }
            else
            {
                html += "<td style='width: 20%;text-align:center;border-bottom:1px solid black !important;'>Awaiting Bids</td>";
            }
            html += '</tr>'; 
            
            /*previousjobID = jobID = data.d[i]["CustomerRequestID"];
            previousDriverID = driverID = data.d[i]["DriverID"];
            var driverID = data.d[i]["DriverID"];
            var customerReqId = data.d[i]["CustomerRequestID"];
            var spec = data.d[i]["DriverSpecialReq"];
            var searchTime = data.d[i]["SearchTime"];
            var driverImgUrl = data.d[i]["DriverPicUrl"];
            var vehicleImgUrl = data.d[i]["VehicleImageUrl"];
            var Fare = data.d[i]["Comments"];
            var CustResponse = data.d[i]["CustomerResponse"];
            var bidTime = data.d[i]["BidTime"];
            
            getBidTimeData(searchTime,bidTime);
            
            
            for (var j = 0; j < count; j++) {
                if(data.d[j]["CustomerResponse"] === true)
                    {
                        isCustomerResponded = "true"; 
                        break;
                    }
            }
            
            if(i>0){
                previousjobID = data.d[i-1]["CustomerRequestID"];
                previousDriverID = data.d[i-1]["DriverID"];
                if(previousDriverID !== driverID){
                    if(isCustomerResponded === "true"){
                        isCustomerResponded = "null";
                    }
                }
            }           
           
            if(i>0){ previousjobID = data.d[i-1]["CustomerRequestID"]; }
               
            if(jobID !== previousjobID)
            {
           	 html += '<tr style="background-color:white">';
                html += '<td colspan="5"><hr style="border:2px solid darkred; margin: -2px;" ></td>';
                html += '</tr>';
                html += '<tr style="background-color:lightgray;">';
                html += '<td style="width:20%;height:35px;text-align:center;"><a href="#" onclick="ShowDetailBooking(\''+jobID+'\')" style="color:blue;">'+ jobID +'</a></td>'; 
                html += "<td style='width:40%;height:35px;text-align:center;' colspan='2' >" + From +"</td>";
                html += "<td style='width:20%;height:35px;text-align:center;'>" + To +"</td>";
                html += '<td style="width:20%;height:35px;text-align:center;"><input type="button" class="rejectbtn" value="Cancel Job" style="width:98%"; onclick="CancelJob(\''+jobID+'\')"/></td>';
                html += '</tr>';
                html += '<tr class="thead-grid2">';
                html += '<td>Driver</td>';
        		html += '<td>Vehicle</td>';
                html += '<td style="text-align:center;">Fare</td>';
           	 html += '<td>Rating </td>';
           	 html += '<td>Action </td>';  
           	 html += '</tr>';
                isAnyDriverHired = false;
                for(var j=0; j<count; j++)
                {
                    if(data.d[j]["CustomerResponse"] === true && data.d[j]["CustomerRequestID"] === jobID)
                    {
                        isAnyDriverHired = true;
                    }
                }
            }
                      
            
            //var customerResponse = data.d[i]["CustomerResponse"];
           
            
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound "+ data.d[i]["Comments"]+"</td>";
                html += "<td width='25%' align='center'>"+'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/sc.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                
                if(Fare > 0)
                {
                    if(CustResponse !== true)
                    {
                		if(isAnyDriverHired === false)
                        {
                            html += "<td style='width: 20%;text-align:center;'>"+'<input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;"  class="accept-btn2" value="Hire" onclick="HireDriver(\''+ customerReqId +'\',\''+ driverID +'\')"/>'+"</td>";
                        }
                        else
                        {
                        }
                    }
                    else
                    {
                     	html += "<td style='width: 20%;text-align:center;'>"+'Awaiting driver response <span style="color:green; font-size:16px;">Or</span><br/><input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;" class="rejectbtn" value="Cancel Driver" onclick="CancelDriver(\''+ customerReqId +'\',\''+ driverID +'\')"/>'+"</td>";   
                    }
                }
                else
                {
                    html += "<td style='width: 20%;text-align:center;'>Awaiting Bids</td>";
                }
                html += '</tr>';
                html += '<tr>';  
                html += '<td style="width:100%;text-align:left;" colspan="2"><img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImage(this)\"/>'
                html += '<img src="'+vehicleImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImage(this)\"/>'
                html += '<td style="width:100%;text-align:center;" colspan="2"><input type="button" class="btn-tmp" value="Rating" style="width:80%"; onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                html += '</tr>';
            
            /*else if(spec === null) {
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound " + data.d[i]["Comments"] + "</td>";
                html += "<td width='25%' align='center'>" + '<a href="#" style="color:blue;" class="pulse" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/spec.png"  width="15" height="15" style="color:grey;" onclick="SpecShow(\'Not Available\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                
                if(Fare > 0)
                {
                    if(CustResponse !== true)
                    {
                		if(isAnyDriverHired === false)
                        {
                            html += "<td style='width: 20%;text-align:center;'>"+'<input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;"  class="accept-btn2" value="Hire" onclick="HireDriver(\''+ customerReqId +'\',\''+ driverID +'\')"/>'+"</td>";
                        }
                        else
                        {
                        }
                    }
                    else
                    {
                     	html += "<td style='width: 20%;text-align:center;'>"+'Awaiting driver response <span style="color:green; font-size:16px;">Or</span><br/><input type="button" id="check" style="-webkit-appearance:none;-moz-appearance:none;" class="rejectbtn" value="Cancel Driver" onclick="CancelDriver(\''+ customerReqId +'\',\''+ driverID +'\')"/>'+"</td>";   
                    }
                }
                else
                {
                    html += "<td style='width: 20%;text-align:center;'>Awaiting Bids</td>";
                }
                html += '</tr>';
                html += '<tr>';
                html += '<td style="width:100%;text-align:left;" colspan="2"><img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px" onclick=\"ShowLargeImage(this)\"/>'
                html += '<img src="'+vehicleImgUrl+'" style="width:50px;height:50px;border-radius:4px" onclick=\"ShowLargeImage(this)\"/>'
                html += '<td style="width:100%;text-align:center;" colspan="2"><input type="button" class="btn-tmp" value="Rating" style="width:80%"; onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                html += '</tr>';
            }*/
        }
        html += '</tbody>';
        html += '</table>';
       // html += '<br/>';    
       // html += '<div>';
       // html += '<table>';
       // html += '<tr>';
       // html += '<td>';
       // html += '<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" id="searchAgain" class="reject-btn" value="InSufficient Drivers" onclick="SearchDriverAgain()"/>';
       // html += '</td></tr>'; 
       // html += '</table>';
       // html += '</div>'; 
        $('#cabnowmsg').html('');        
        $('#cabnowmsg').append(html);
    }
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
            $('#feedback-content').empty();
              ratingcont = data.d.length;
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
                         var StartDate = data.d[i]["StartDate"];
                        
                        table2 += '<tr><td style="text-align:left;width:25%">'+StartDate+'</td>';
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
               	 //table2 += '<table width="99%" style="border-collapse:collapse;">';
                    table2 += '<tr><td style="width:80%">No Feedback available.';
                    table2 += '</td></tr>';
                    table2 += '</table>'; 
            }
                
                //$('#feedback-content').append(table1);
                $('#feedback-content').append(table2);
                $('#popup_box').fadeIn("fast");
                $('#divRatingFeedback').fadeIn("fast");                
           
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
            $('#feedback-content').empty();
            if(data.d["0"] === null && data.d["1"] === null && data.d["2"] === null && data.d["3"] === null)
            {
               jAlert('Sorry!!! No comments found for this driver.', 'ECabs4U-Comments');
            }
            else
            {   
                
                if(data.d["4"] !== null)
                {
                    var table2 = '<table width="99%" style="border-collapse:collapse;margin-top:5px">';
                    table2 += '<tr><td style="width:20%">';
                    table2 += '</td>';
                    table2 += '<td style="text-align:left;width:80%">'+'Date :'+data.d["5"]+'</td></tr>';
                    table2 += '<tr><td style="width:20%">';
                    table2 += '<img src="'+driverImgUrl+'" style="height:50px;border-radius:4px;text-align:left"/>';
                    table2 += '</td>';
                    table2 += '<td style="text-align:left;width:80%">'+'Customer :'+data.d["4"]+'</td></tr>';
                    if(data.d["3"] === null)
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
                        table2 += '<td style="text-align:left;width:80%;">'+'Driver: '+data.d["3"]+'</td>';                    
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


function ShowLargeImage(imgUrl)
{
    var imageUrl = imgUrl.src;
    console.log(imgUrl.src);    
    $('#imgDV').attr("src",imageUrl);
    $('#popup_box').fadeIn("fast");
    $('#imgDiv').fadeIn("fast");
    $('#transparent_div').fadeIn("fast");
    window.clearInterval(id);
}

function hideImage()
{
    $('#transparent_div').hide();
    $('#popup_box').hide("fast");
    $('#imgDiv').hide("fast");
    id = window.setInterval(getResponse, 10000);
}

function showExpiry() {
    $('#transparent_div').show();
    $('#popup_box').show();
    $('#popupBoxClose').show();
    $('#divBiding').hide();
    $('#divselect').hide();
    $('#divExpiry').show();
    $('#lblsearch').text();
    $('#lblexp').text();
    $('#divDealConfirmed').hide();
    $('#divspec').hide();
    $('#divspecHireClick').hide();
}
function showBid() {
    $('#transparent_div').show();
    $('#popup_box').show();
    $('#popupBoxClose').show();
    $('#divBiding').show();
    $('#divExpiry').hide();
    $('#divselect').hide();
    $('#lblbid').text();
    $('#lblpick').text();
    $('#divDealConfirmed').hide();
    $('#divspec').hide();
    $('#divspecHireClick').hide();
}
function closeExpiry() {
    $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divExpiry').hide();
}
function closeBid() {
    $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divBiding').hide();
}

function SpecShow(a) {
    $('#transparent_div').show();
    $('#popup_box').show();
    $('#divspec').show();
    $('#popupBoxClose').show();
    $('#divDealConfirmed').hide();
     $('#divspecHireClick').hide();
    $('#txtothereSpecialReq').text(a);
    id = window.setInterval(getResponse, 10000);
}
function specClose() {
    $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divspec').hide();
}

function SpecialReqShow(specreq)
{
    $('#transparent_div').show();
    $('#popup_box').show();
    $('#divspecHireClick').show();
    $('#popupBoxClose').show();
    $('#divspec').hide();
    $('#divDealConfirmed').hide();
    $('#txtSpecialReq').text(specreq);
    id = window.setInterval(getResponse, 10000);
    
}

function HireDriver() {
    $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divspecHireClick').hide();
     DisableHiremeBtns();
     window.clearInterval(id);
     HireCurrentDriver();
    
}

function RejectDriver()
{
     $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divspecHireClick').hide();
     var status = "Rejected";
    var driverId = dId;
    var requestId = reqId;
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + driverId + "','reqid':'" + requestId + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === true)
                    {
                        getResponse();
                    }
                    else
                    {
                        console.log('Exception in RejectResponse');
                    }
                },
            });
}

var dId, reqId, specS;

function Hireme(driID, reqID,spec)
{       
    dId = driID;
    reqId = reqID;
    specS = spec;    
    if(spec === "null")
    {
        
        window.clearInterval(id);
        DisableHiremeBtns();
        HireCurrentDriver();     
    }
    else
    {   
        window.clearInterval(id);
        SpecialReqShow(specS);
    }
}

function HireCurrentDriver()
{
       var driverId = dId;
       var requestId = reqId;
           $.ajax({
           url: "http://115.115.159.126/ECabs/ECabs4U.asmx/HireDriverResponse",
           type: "POST",
           dataType: "Json",
           data: "{'driverId':'" + driverId + "','requestId':'" + requestId + "'}",
           contentType: "application/json; charset=utf-8",
           success: getResponseFromDriver,
           error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
      }); 
}

function DisableHiremeBtns()
{
   $(":button.disableBtn").each(function(){
      $(this).css("background-color","#BDBDBD");
      $(this).css("border","1px solid #BDBDBD");
      $(this).css("border","1px solid #BDBDBD");
      $(this).disabled = true;
      $(this).hide();
      console.log($("#tdHire"));
      console.log($("#tdHire").text());
      console.log($("#tdHire").html());
      $("#tdHire").html("Awaiting Driver Reponse");
   });
}

function getResponseFromDriver(data)
{
        var checkDealResp = window.setInterval(function () {
        $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CheckdealResponse",
            type: "POST",
            dataType: "Json",
            data: "{'driverId':'" + dId + "','requestId':'" + reqId + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
				 console.log(data.d);
                var getBooked = data.d[2];
                if (getBooked === "True") 
                {
                    DisableHiremeBtns()
                    $.ajax({
                        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetConfirmData",
                        type: "POST",
                        dataType: "Json",
                        data: "{'requestID':'" + requestID + "'}",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            console.log("in GetConfirmData");
                            $('#transparent_div').hide();                   
                            $('#lblconfirmjob').text(data.d[0]);
                            $('#lblconfirmdrivername').text(data.d[1]);
                            $('#lblconfirmfrom').text(data.d[2]);
                            $('#lblconfirmto').text(data.d[3]);
                            $('#lblconfirmdistance').text(data.d[4]);
                            $('#lblconfirmdate').text(data.d[5]);
                            $('#lblconfirmtime').text(data.d[6]);
                            $('#lblconfirmfare').text(data.d[7]);
                            $('#lbldriverId').text(data.d[8]);
                            $('#popup_box').show();
                            $('#divDealConfirmed').show();
                            $('#divselect').hide();
                        },
                        complete: function () {
                            destroySetInterval();                          
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        
                           console.log("in GetConfirmData error");}
                    });
                }
                else if (getBooked === "False") 
                {
                     //  SearchDriverAgain();
                     getResponse();
                    $('#load').hide();                    
                    $('#statusMessage').hide();
                    $('#divDeal').hide();
                }
                else {
                    $('#load').hide();                    
                    $('#statusMessage').hide();
                    $('#divDeal').hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });

    }, 1000);
    function destroySetInterval() {
        window.clearInterval(checkDealResp);
    }
}
function ShowMap() 
{
        var from = $('#lblconfirmfrom').val();
        var to = $('#lblconfirmto').val();
        var loc2=$('#txt2location').val();
        if(loc2 !== "")
        {
            window.location = 'Location.html?id=' + from + '&rid=' + to + '&rrid=' + loc2;
        }
        else
        {
            loc2 = "";
            window.location = 'Location.html?id=' + from + '&rid=' + to + '&rrid=' + loc2;
        }
}
function calOk()
{    
    $('#imgLoader').hide();
    $('#popup_box').hide();
    $('#transparent_div').hide(); 
    $('#imgLoader').hide();
    navigator.notification.alert(
        "Cab booked successfully.",
        cabBookedSuccess, 
        'ECABS4U',
        "OK"
    );
}
function cabBookedSuccess()
{
    window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId; 
}

function selectDriver()
{
    $('#divselect').hide();
    $('#popup_box').hide();
    $('#transparent_div').hide();
}

function HideDisplay()
{
    $('#divRatingFeedback').hide();
    $('#popup_box').hide();    
}

function CancelJobRequest()
{
  navigator.notification.confirm(
    "Do you really want to cancel this job?",
    onClickCancel,
    "Confirm",
    "Yes,No" 
  );
}
function onClickCancel(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
         var cause = "Cancelled by customer";
          DeleteJob(cause);
      
    }
}

function ReInitiateJob() {
     navigator.notification.confirm(
    "Do you want to reinitiate this job?",
    onreinitiateCallback,
    "Confirm",
    "Yes,No" 
    );
}

function onreinitiateCallback(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
        window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID;
      
    }
}

function DeleteJob(cause)
{
         $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CancelCurrentJob",
            type: "POST",
            dataType: "Json",
            data: "{'requestID':'" + requestID + "','relatedId':'" + relatedId + "','cause':'" + cause + "'}",
            contentType: "application/json; charset=utf-8",
            success: function(data)
                {
                    navigator.notification.alert(
				   	 data.d,
  				 	  cabCancledSuccess, 
 					   'ECABS4U',
 						"OK"
						);
    
				    function cabCancledSuccess()
                    {
			          window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
					}
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
}
function getBidTimeData(searchTime, bidTime){
    var tm = searchTime.split(" ");
            
    var min = tm[1].split(":");
    var sh = min[0];
    var sm = min[1];
    var ss = min[2];
    if (sm > 49) {
        sh = parseInt(sh) + 1;
        sm = parseInt(sm) + 10;
        sm = parseInt(sm) - 60;
        if (ss === 00) {
            sm = parseInt(sm) + 1;
            ss = 00;
            $('#lblsearch').text(min[0] + ":" + min[1]);
            $('#lblexp').text(sh + ":" + sm );
        }
        else {
            $('#lblsearch').text(min[0] + ":" + min[1]);
            $('#lblexp').text(sh + ":" + sm );
        }
    }
    else {
        sm = parseInt(sm) + 10;
        if (ss === 00) {
            sm = parseInt(sm) + 1;
            ss = 00;
            $('#lblsearch').text(min[0] + ":" + min[1]);
            $('#lblexp').text(sh + ":" + sm );
        }
        else {
            $('#lblsearch').text(min[0] + ":" + min[1]);
            $('#lblexp').text(sh + ":" + sm );
        }
    }
    
    var bid = bidTime.split(" ");
    var bidmin = bid[1].split(":");
    bidh = bidmin[0];
    bidm = bidmin[1];
    var bids = bidmin[2];
    if (bidm > 56) {
        bidh = parseInt(bidh) + 1;
        bidm = 00;
        if (bids === 00) {
            bidm = parseInt(bidm) + 1;
            bids = 00;
            $('#lblbid').text(bidmin[0] + ":" + bidmin[1] );
            $('#lblpick').text(bidh + ":" + bidm );
        }
        else {
            $('#lblbid').text(bidmin[0] + ":" + bidmin[1]);
            $('#lblpick').text(bidh + ":" + bidm );
        }
    }
    else {
        bidm = parseInt(bidm) + 3;
        if (bids === 00) {
            sm = parseInt(sm) + 1;
            ss = 00;
            $('#lblbid').text(bidmin[0] + ":" + bidmin[1]);
            $('#lblpick').text(bidh + ":" + bidm );
        }
        else {
            $('#lblbid').text(bidmin[0] + ":" + bidmin[1]);
            $('#lblpick').text(bidh + ":" + bidm );
        }
    }
}
//CabNow Logic End
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