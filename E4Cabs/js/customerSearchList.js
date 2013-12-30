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
$('#transparent_div').show();
function backtosearch() {
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
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
        alert('No driver found Please search again.');
        Destroy();
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
    if(a == 60)
    {
       console.log("true timer for 60s auto initiation");
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

var id;
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
    
function getData(data) {    
    var count = data.d.length;  
    if(count > 0)
    {
        window.clearInterval(timer);
        window.clearInterval(reinitiateCounter);
        DisplayDriversData();
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
        $('#transparent_div').hide();
        var html = '<table width="100%" style="border-collapse:collapse;">';
        html += '<thead class="header-style">';
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
            var spec = data.d[i]["DriverSpecialReq"];
            var searchTime = data.d[i]["SearchTime"];
            var driverImgUrl = data.d[i]["DriverPicUrl"];
            console.log(driverImgUrl);
            var tm = searchTime.split(" ");

            var min = tm[1].split(":");
            var sh = min[0];
            var sm = min[1];
            var ss = min[2];
            if (sm > 49) {
                sh = parseInt(sh) + 1;
                sm = parseInt(sm) + 10;
                sm = parseInt(sm) - 60;
                if (ss == 00) {
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
                if (ss == 00) {
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
                if (bids == 00) {
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
                if (bids == 00) {
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
            if (spec != null) {
                console.log(driverID);
                console.log(spec);
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound "+ data.d[i]["Comments"]+"</td>";
                html += "<td width='25%' align='center'>"+'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/sc.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" class="disableBtn accept-btn" value="Hire" id= "' + driverID + '" onclick = "Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'' + spec + '\');"/>' + "</td>";
                html += '</tr>';
                html += '<tr>';           
                var rating3 = data.d[i]["RatingPast"];
                var rating4 = data.d[i]["RatingPresent"];
                
                                        html += '<td style="width:100%;text-align:left;border-bottom:1px solid #848484;" colspan="2"><img src="'+driverImgUrl+'" style="width:40px;height:40px"/>'
                          if(rating3 != "")
                          {
                                   if(rating3 == "1")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/1star.PNG" style="width:18%"/></td>';
                                    }
                                    else if(rating3 == "2")
                                    {
                                     
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/2star.PNG" style="width:33%"/></td>';
                                    }
                                    else if(rating3 == "3")
                                    {                                     
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/3star.PNG" style="width:45%"/></td>';
                                    }
                                    else if(rating3 == "4")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/4star.PNG" style="width:58%"/></td>';
                                    }
                                    else if(rating3 == "5")
                                    {
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/5star.PNG" style="width:70%"/></td>';
                                    }
                          }
                          else
                           {
                                html += '<td style="width:30%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/5star.PNG" style="width:70%"/></td>'
                           }
                          if(rating4 != "")
                          {
                                   if(rating4 == "1")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/1star.PNG' style='width:18%'/></td>";
                                    }
                                    else if(rating4 == "2")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/2star.PNG' style='width:33%'/></td>";
                                    }
                                    else if(rating4 == "3")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/3star.PNG' style='width:45%'/></td>";
                                    }
                                    else if(rating4 == "4")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/4star.PNG' style='width:58%'/></td>";
                                    }
                                    else if(rating4 == "5")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/5star.PNG' style='width:70%'/></td>";
                                    }
                          }
                          else
                           {
                               html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/5star.PNG' style='width:70%'/></td>";
                           }
                          html += '</tr>';
                }
            else if(spec == null) {
                console.log(spec);
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound " + data.d[i]["Comments"] + "</td>";
                html += "<td width='25%' align='center'>" + '<a href="#" style="color:blue;" class="pulse" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/spec.png"  width="15" height="15" style="color:grey;" onclick="SpecShow(\'Not Available\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" class="disableBtn accept-btn"  value="Hire" id= "' + driverID + '" onclick = "this.disabled=true;Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'Not Available\');"/>' + "</td>";
                html += '</tr>';
                html += '<tr>';
                var rating33 = data.d[i]["RatingPast"];
                var rating44 = data.d[i]["RatingPresent"];
                
                                html += '<td style="width:100%;text-align:left;border-bottom:1px solid #848484;" colspan="2"><img src="'+driverImgUrl+'" style="width:40px;height:40px"/>'
                          if(rating33 != "")
                          {
                                   if(rating33 == "1")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/1star.PNG" style="width:18%"/></td>';
                                    }
                                    else if(rating33 == "2")
                                    {
                                     
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/2star.PNG" style="width:33%"/></td>';
                                    }
                                    else if(rating33 == "3")
                                    {                                     
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/3star.PNG" style="width:45%"/></td>';
                                    }
                                    else if(rating33 == "4")
                                    {
                                        
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/4star.PNG" style="width:58%"/></td>';
                                    }
                                    else if(rating33 == "5")
                                    {
                                        html += '<td style="width:100%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/5star.PNG" style="width:70%"/></td>';
                                    }
                          }
                          else
                           {
                               html += '<td style="width:30%;text-align:center;border-bottom:1px solid #848484;" colspan="2"><img src="img/5star.PNG" style="width:70%"/></td>'
                           }
                          if(rating44 != "")
                          {
                                   if(rating44 == "1")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/1star.PNG' style='width:18%'/></td>";
                                    }
                                    else if(rating44 == "2")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/2star.PNG' style='width:33%'/></td>";
                                    }
                                    else if(rating44 == "3")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/3star.PNG' style='width:45%'/></td>";
                                    }
                                    else if(rating44 == "4")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/4star.PNG' style='width:58%'/></td>";
                                    }
                                    else if(rating44 == "5")
                                    {
                                        html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/5star.PNG' style='width:70%'/></td>";
                                    }
                          }
                          else
                           {
                               html += "<td style='width:100%;text-align:center;border-bottom:1px solid #848484;' colspan='2'><img src='img/5star.PNG' style='width:70%'/></td>";
                           }
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
        html += '<input type="button" id="searchAgain" class="reject-btn" value="InSufficient Drivers" onclick="SearchDriverAgain()"/>';
        html += '</td></tr>'; 
        html += '</table>';
        html += '</div>';        
        $('#msg').append(html);
    }
}

function SearchDriverAgain()
{
    $('#msg').empty();
    $('#load').show();
    $('#transparent_div').show();
    $('#statusMessage').html("Searching for more drivers...");
    $('#statusMessage').css("color","Yellow");
     $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetNewResponseData",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
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
    $('#txtothereSpecialReq').text(a);
    id = window.setInterval(getResponse, 10000);
}
function specClose() {
    $('#transparent_div').hide();
    $('#popup_box').hide();
    $('#divspec').hide();
}

var dId, reqId, specS;

function Hireme(driID, reqID,spec)
{       
    dId = driID;
    reqId = reqID;
    specS = spec;    

    if(spec == "Not Available")
    {
        window.clearInterval(id);
        DisableHiremeBtns();
        HireCurrentDriver();     
    }
    else
    {   
        window.clearInterval(id);
        navigator.notification.confirm(
        "Did you read the special circumstance entry?",
         onConfirm,
        'Confirm',
        'No,Yes'
     );
    }
  }

function onConfirm(buttonIndex)
{
    if(buttonIndex == 1)
    {        
        SpecShow(specS);     
    }
    else if(buttonIndex == 2)
    {
       DisableHiremeBtns();
       window.clearInterval(id);
       HireCurrentDriver();
    }
}

function HireCurrentDriver()
{
       $('#loading').show();
       $('#transparent_div').show();
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
        var checkDealResp = window.setInterval(function () {
        $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/checkdealResponse",
            type: "POST",
            dataType: "Json",
            data: "{'userID':'" + relatedId + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                var getDriverID = data.d[0];
                var getResponse = data.d[1];
                var getBooked = data.d[2];

                if (getBooked == "True") {
                    DisableHiremeBtns()
                    $.ajax({
                        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetConfirmData",
                        type: "POST",
                        dataType: "Json",
                        data: "{'driverID':'" + getDriverID + "','requestID':'" + getResponse + "'}",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                           
                            $('#loading').hide();
                            $('#transparent_div').hide();

                            $('#lbldriverId').text(getDriverID);
                            $('#lblconfirmjob').text(data.d[0]);
                            $('#lblconfirmdrivername').text(data.d[1]);
                            $('#lblconfirmfrom').text(data.d[2]);
                            $('#lblconfirmto').text(data.d[3]);
                            $('#lblconfirmdistance').text(data.d[4]);
                            $('#lblconfirmdate').text(data.d[5]);
                            $('#lblconfirmtime').text(data.d[6]);
                            $('#lblconfirmfare').text(data.d[7]);
                            $('#popup_box').show();
                            $('#divDealConfirmed').show();
                            $('#transparent_div').show();
                            $('#divselect').hide();
                        },
                        complete: function () {
                            destroySetInterval();                          
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                }
                else {
                    $('#load').hide();                    
                    $('#statusMessage').hide();
                    $('#divDeal').hide();
                    $('#loading').show();
                    $('#transparent_div').show();
                    
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
        if(loc2 != "")
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
            $('#popup_box').hide();
            $('#transparent_div').hide();
            var requestId = $('#lblconfirmjob').text();
            var driverId = $('#lbldriverId').text();
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/SaveData",
                type: "POST",
                dataType: "Json",
                data: "{'driverId':'" + driverId + "','requestId':'" + requestId + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    alert("Cab booked successfully.");
                    myProfile();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
}
function selectDriver()
{
            $('#divselect').hide();
            $('#popup_box').hide();
            $('#transparent_div').hide();
}

function CancelJobRequest()
{
         var result = confirm("Do you really want to cancel this job?");    
         if (result==true) {
           var cause = "Cancelled";
           DeleteJob(cause);
         }
         else
         {
          return false;    
         }
}

function ReInitiateJob()
{
        var result = confirm("Do you want to Re-initiate this job?");    
        if (result==true) {
              window.location = 'customerSearch.html?id=' + userId + '&rid=' + requestID + '&rrid=' + relatedId;
        }
        else
        {
         return false;
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
                    alert(data.d);
                    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
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
function logout(){
    navigator.notification.confirm(
    "Do you want to logout?",
    onLogoutCallback,
    "Confirm",
    "No, Yes"
    );
}

function onLogoutCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
        $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: {},
         }); 
        $.cookie("remember", false);
        window.location = "index.html";
    }
}
