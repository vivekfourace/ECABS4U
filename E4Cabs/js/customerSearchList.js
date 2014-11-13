var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4].split("&")[0];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   //do nothing
}

$('#load').show();
$('#transparent_div2').show();
function backtosearch() {
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
    //return false;
}

var timeOut;

    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetJobTimeOutTime",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: JobExpiryTime,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
       }
     });

function JobExpiryTime(data)
{
    timeOut = data.d;
    console.log(timeOut);
}

var timer = setInterval(function () {
    --timeOut;
    console.log(timeOut);
    if (timeOut <= 0) {
        window.clearInterval(id);
      // jAlert('No driver found Please search again.', 'ECabs4U-Booking');
        //alert('No driver found Please search again.');
        //DeleteJob("Cancelled due to no driver found");
        //Destroy();
        window.clearInterval(timer);
        window.clearInterval(id);
        window.clearInterval(reinitiateCounter);
        navigator.notification.alert(
        "No driver found Please search again.",
        noDriver221, // Specify a function to be called 
        'ECABS4U',
        "OK"
        );
        function noDriver221()
        {
          DeleteJob("Cancelled due to no driver found");
          Destroy();  		      
        }
        
        
    }
}, 1000);

var reinitiateCounter = setInterval(function(){
    var isTrue = CheckJobCount();
    if(isTrue)
    {
        SearchDriverAgain();
    }
}, 1000);

var a = 0;
function CheckJobCount()
{
    a++;
    console.log(a);
    if(a === 60)
    {
       console.log("timer for 60s auto initiation");
       return true;
    }
    return false;
}

function Destroy() {
    window.clearInterval(timer);
    window.clearInterval(id);
    window.clearInterval(reinitiateCounter);
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

$('#load').show();

var id, checkDealResp, anyMoreDriver = true;
id = window.setInterval(getResponse, 10000);

function getResponse()
{
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetResponseData",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
function SearchAgain(){
    $('#bookingmsg').hide();
    $('#msg').show();
    window.clearInterval(id);
    id = window.setInterval(getResponse, 10000);
    anyMoreDriver = false;
    getResponse();  
}
function getData(data) {    
    var count = data.d.length; 
    console.log(count);
    if(count > 0)
    {
        window.clearInterval(timer);
        window.clearInterval(reinitiateCounter);
        $('#bookingmsg').hide();
        $('#msg').show();
        DisplayDriversData();
    } 
    else
    {
       
       $('#msg').empty().append("");
       $('#msg').hide();
       if(anyMoreDriver ===  false)
        {
            anyMoreDriver = true;
            //alert("Sorry!!! No more driver available to hire. Please search again.");
            navigator.notification.alert(
            "Sorry!!! No more driver available to hire. Please search again.",
            noDriver222, // Specify a function to be called 
            'ECABS4U',
            "OK"
            );
            function noDriver222()
            {
                		      
            }
            
            
        }
       
       $('#bookingmsg').show();
         
        //alert("No driver response found.");
       //window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId;
    }
    function DisplayDriversData()
    {   
        window.clearInterval(timer);
        window.clearInterval(reinitiateCounter);
        console.log('in display driver data');
        $('#msg').empty();
        $('#divbid').show();
        $('#divawait').hide();
        $('#load').hide();
        $('#transparent_div2').hide();
        customerReqIdJOB = data.d[0]["CustomerRequestID"]; 
        
        
        var html = '<table width="100%" style="border-collapse:collapse;">'; 
        html += '<thead class="header-style">';
        html += '<tr style="background-color:lightgray; color:black;">';
        html += '<td style="width:20%;height:35px;padding-left:5px;" colspan="4">Job No - '+ customerReqIdJOB +'</td>';        
        html += '<td style="width:20%;height:35px;text-align:center;" colspan="2"><input type="button" class="rejectbtn" value="Cancel Job" style="width:98%"; onclick="CancelJobRequest(\''+customerReqIdJOB+'\')"/></td>';
        html += '</tr>';        
        html += '<tr>';
        html += '<th>Fare</th>';
        html += '<th>Date</th>';
        html += '<th>Job</th>';
        html += '<th>Specs</th>';
        html += '<th>ETA</th>';
        html += '<th></th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (var i = 0; i < count; i++) {
            var driverID = data.d[i]["DriverID"];
            var customerReqId = data.d[i]["CustomerRequestID"];
           //customerReqJobno= data.d[i]["CustomerRequestID"];
            var spec = data.d[i]["DriverSpecialReq"];
            var searchTime = data.d[i]["SearchTime"];
            var driverImgUrl = data.d[i]["DriverPicUrl"];
            var vehicleImgUrl = data.d[i]["VehicleImageUrl"];
            console.log(driverImgUrl);
            console.log(vehicleImgUrl);
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
            
            var bidTime = data.d[i]["BidTime"];
            var bid = bidTime.split(" ");
            var bidmin = bid[1].split(":");
            var bidh = bidmin[0];
            var bidm = bidmin[1];
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
            if (spec !== null) {
                console.log(driverID);
                console.log(spec);
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound "+ data.d[i]["Comments"]+"</td>";
                html += "<td width='25%' align='center'>"+'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/sc.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="disableBtn accept-btn" value="Hire" id= "' + driverID + '" onclick = "Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'' + spec + '\');"/>' + "</td>";
                html += '</tr>';
                html += '<tr>';                 
                html += '<td style="width:100%;text-align:left;" colspan="2"><img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImage(this)\"/>'
                html += '<img src="'+vehicleImgUrl+'" style="width:50px;height:50px;border-radius:4px;" onclick=\"ShowLargeImage(this)\"/>'
                html += '<td style="width:100%;text-align:center;" colspan="2"><input type="button" class="btn-tmp" value="Rating" style="width:80%"; onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                html += '</tr>';
                }
            else if(spec === null) {
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound " + data.d[i]["Comments"] + "</td>";
                html += "<td width='25%' align='center'>" + '<a href="#" style="color:blue;" class="pulse" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/spec.png"  width="15" height="15" style="color:grey;" onclick="SpecShow(\'Not Available\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="disableBtn accept-btn"  value="Hire" id= "' + driverID + '" onclick = "this.disabled=true;Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'Not Available\');"/>' + "</td>";
                html += '</tr>';
                html += '<tr>';
                html += '<td style="width:100%;text-align:left;" colspan="2"><img src="'+driverImgUrl+'" style="width:50px;height:50px;border-radius:4px" onclick=\"ShowLargeImage(this)\"/>'
                html += '<img src="'+vehicleImgUrl+'" style="width:50px;height:50px;border-radius:4px" onclick=\"ShowLargeImage(this)\"/>'
                html += '<td style="width:100%;text-align:center;" colspan="2"><input type="button" class="btn-tmp" value="Rating" style="width:80%"; onclick="showRatingBoxLaterpast(\''+driverImgUrl+'\', \''+driverID+'\')"></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        html += '</table>';
        html += '<br/>';    
        html += '<div>';
        html += '<table>';
        html += '<tr>';
        html += '<td>';
        html += '<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" id="searchAgain" class="reject-btn" value="InSufficient Drivers" onclick="SearchDriverAgain()"/>';
        html += '</td></tr>'; 
        html += '</table>';
        html += '</div>';   
        $('#msg').show();
        $('#bookingmsg').hide();
        $('#msg').append(html);
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
          // alert(data.d);
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
                                table2 += '<th>Driver Comments</th>';
                          
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
          // alert(data.d);
            $('#feedback-content').empty();
            if(data.d["0"] === null && data.d["1"] === null && data.d["2"] === null && data.d["3"] === null)
            {
               jAlert('No comments found.', 'ECabs4U-Comments');
              //  alert('No comments found');
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
    $('#transparent_div2').fadeIn("fast");
    window.clearInterval(id);
}

function hideImage()
{
    $('#transparent_div2').hide();
    $('#popup_box').hide("fast");
    $('#imgDiv').hide("fast");
    id = window.setInterval(getResponse, 10000);
}

function SearchDriverAgain()
{
    $('#msg').empty();
    $('#load').show();
    $('#transparent_div2').show();
    window.clearInterval(reinitiateCounter);
    $('#statusMessage').html("Searching for more drivers...");
    $('#statusMessage').css("color","Yellow");
     $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetNewResponseData",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
    });
}

function showExpiry() {
    $('#transparent_div2').show();
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
    $('#transparent_div2').show();
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
    $('#transparent_div2').hide();
    $('#popup_box').hide();
    $('#divExpiry').hide();
}
function closeBid() {
    $('#transparent_div2').hide();
    $('#popup_box').hide();
    $('#divBiding').hide();
}

function SpecShow(a) {
    $('#transparent_div2').show();
    $('#popup_box').show();
    $('#divspec').show();
    $('#popupBoxClose').show();
    $('#divDealConfirmed').hide();
     $('#divspecHireClick').hide();
    $('#txtothereSpecialReq').text(a);
    id = window.setInterval(getResponse, 10000);
}
function specClose() {
    $('#transparent_div2').hide();
    $('#popup_box').hide();
    $('#divspec').hide();
}

function SpecialReqShow(specreq)
{
    $('#transparent_div2').show();
    $('#popup_box').show();
    $('#divspecHireClick').show();
    $('#popupBoxClose').show();
    $('#divspec').hide();
    $('#divDealConfirmed').hide();
    $('#txtSpecialReq').text(specreq);
    id = window.setInterval(getResponse, 10000);
    
}

function HireDriver() {
    $('#transparent_div2').hide();
    $('#popup_box').hide();
    $('#divspecHireClick').hide();
     DisableHiremeBtns();
     window.clearInterval(id);
     HireCurrentDriver();
    
}

function RejectDriver()
{
     $('#transparent_div2').hide();
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

    if(spec === "Not Available")
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
       $('#loading').show();
       $('#transparent_div2').show();
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
      $(this).disabled = true;
   });
}

function getResponseFromDriver(data)
 {
    checkDealResp = window.setInterval(checkDeal, 1000);
    function destroySetInterval() {
        window.clearInterval(checkDealResp);
    }
}
var jobs1;
function checkDeal() {
        $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CheckdealResponse",
            type: "POST",
            dataType: "Json",
            data: "{'driverId':'" + dId + "','requestId':'" + requestID + "'}",
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
                            $('#loading').hide();
                            $('#transparent_div2').hide();                   
                            $('#lblconfirmjob').text(data.d[0]);
                            $('#lblconfirmdrivername').text(data.d[1]);
                            $('#lblconfirmfrom').text(data.d[2]);
                            $('#lblconfirmto').text(data.d[3]);
                            $('#lblconfirmdistance').text(data.d[4]);
                            $('#lblconfirmdate').text(data.d[5]);
                            $('#lblconfirmtime').text(data.d[6]);
                            $('#lblconfirmfare').text(data.d[7]);
                            $('#lblconfirmdriverPhoneNo').text(data.d[8]);
                            $('#popup_box').show();
                            $('#divDealConfirmed').show();
                            $('#transparent_div2').show();
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
                    getResponseFalse();
                    $('#load').hide();                    
                    $('#statusMessage').hide();
                    $('#divDeal').hide();
                    $('#loading').hide();
                    $('#transparent_div2').hide();
                    //alert("search again")
                }
                else if(getBooked === "")
                {
                   
                  jobs1 = window.setInterval(getResponseExpire, 200000);
                  ///RejectDriver()-----see this function for delete driver response. 
                }
                else {
                    $('#load').hide();                    
                    $('#statusMessage').hide();
                    $('#divDeal').hide();
                    $('#loading').show();
                    $('#transparent_div2').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });

    }
function getResponseFalse(){
    window.clearInterval(checkDealResp);
    $('#msg').hide();
    $("#bookingmsg").show();
}

function getResponseExpire()
{    
    $('#load').hide();                    
    $('#statusMessage').hide();
    $('#divDeal').hide();
    $('#loading').hide();
    $('#transparent_div2').hide();


     navigator.notification.alert(
       	 "Time out",
    	 	  cabCancledSuccess2, // Specify a function to be called 
    		   'ECABS4U',
    			"OK"
    		);

    function cabCancledSuccess2()
    {
       window.clearInterval(jobs1);
       window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
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
            $('#transparent_div2').hide(); 
            $('#imgLoader').hide();
           navigator.notification.alert(
	   	 "Cab booked successfully.",
		       cabBookedSuccess, // Specify a function to be called 
			   'ECABS4U',
				"OK"
			);
    
			function cabBookedSuccess()
            {
			    window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId; 
			}
}
function selectDriver()
{
    $('#divselect').hide();
    $('#popup_box').hide();
    $('#transparent_div2').hide();
}

function HideDisplay()
{
    $('#divRatingFeedback').hide();
    $('#popup_box').hide();    
}



function makeCalltoDriver()
{
    var number = $('#lblconfirmdriverPhoneNo').text();
    console.log(number);
    window.location.href = "tel:" + number;    
}


function CancelJobRequest()
{
     navigator.notification.confirm(
    "Do you really want to cancel this job?",
    onClickCancel,
    "Confirm",
    "Yes,No" 
    );
         //var result = confirm("Do you really want to cancel this job?");    
         //if (result===true) {
         //  var cause = "Cancelled";
         //  DeleteJob(cause);
         //}
         //else
         //{
         // return false;    
         //}
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

function ReInitiateJob()
{
        //var result = confirm("Do you want to reinitiate this job?");    
        //if (result===true) {
              //window.location = 'customerSearch.html?id=' + userId + '&rid=' + requestID + '&rrid=' + relatedId;
            
         //   window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID;
      //  }
       // else
      //  {
      //   return false;
      //  }
    
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
        //alert(requestID);
        
        window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID;
      
    }
}

function AlterJob()
{
    //alert(requestID);
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID;
}
function AlterJob2()
{//var search="Hi";
     window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
    //window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID+ '&rrid=' + search;
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
                    //alert(data.d);
                    //window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                    
                    navigator.notification.alert(
				   	 data.d,
  				 	  cabCancledSuccess, // Specify a function to be called 
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

