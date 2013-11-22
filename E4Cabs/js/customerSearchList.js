var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4].split("&")[0];

$('#load').show();
function backtosearch() {
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//Job Time out//
var timeOut;
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetJobTimeOutTime",    //Get Response from driver
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
    timeOut = (data.d)*1000;
    //alert(timeOut);
}

var timer = setInterval(function () {
    --timeOut;
    //document.getElementById('lblMessage').innerHTML = "Your job will expire in " + --timeOut + "s.";
    if (timeOut <= 0) {
        window.clearInterval(id);
        alert('Oops! no driver found, please search again.');
        Destroy();
    }
}, 1000);

var a = 0;
function CheckJobCount(count)
{
    a++;
    if(a == 59 && count==0)
    {
       return true;
    }
    return false;
}
function Destroy() {
    window.clearInterval(timer);
    window.clearInterval(id);
    window.location = "customerSearch.html";
}
 $('#load').show();
var id = window.setInterval(function () {
   
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetResponseData",    //Get Response from driver
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}, 1000);

function getData(data) {
    var count = data.d.length;
    var isTrue =  CheckJobCount(count);
    //console.log(isTrue);
    //alert(isTrue);
    if(isTrue)
    {
        //TODO: send request again from the scratch to next five drivers.
        //window.clearInterval(id);
        
        SearchDriverAgain();
       
    }
    
    var getCount = data.d[0]["DriverDisplayCount"];
    if (count < getCount )
    {
        DisplayDriversData();
    }
    else if (count  >= getCount )
    {
        DisplayDriversData();
    }

    else {
        $('#divDriverList').hide();
        $('#load').show();
    }
    
    function DisplayDriversData()
    {
        $('#msg').empty();
        $('#divbid').show();
        $('#divawait').hide();
        $('#load').hide();
        var html = '<table width="100%" style="border-collapse:collapse;">';
        html += '<thead style="background-color:#D8DCBB;color:darkblue;">';
        html += '<tr>';
        html += '<th align="center">Fare</th>';
        html += '<th >Date</th>';
        html += '<th >Job</th>';
        html += '<th >Specs</th>';
        html += '<th >ETA</th>';
        html += '<th ></th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody class="body-style">';
        for (var i = 0; i < count; i++) {
            var driverID = data.d[i]["DriverID"];
            var customerReqId = data.d[i]["CustomerRequestID"];
            var spec = data.d[i]["DriverSpecialReq"];
            var searchTime = data.d[i]["SearchTime"];
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

            //
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

            // var expTime=searchTime+10;
            //var pickTime=bidTime+3;lblsearch,lblexp,lblbid,lblpick////*+ data.d[i]["StartDate"] + *
            if (spec != null) {
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound" + data.d[i]["Comments"] + '<img src="img/driver.png" onclick="ShowRating()"/>' +"</td>";
                html += "<td width='25%' align='center'>"+'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
               /* html += "<td width='20%' align='center'>" + data.d[i]["StartTime"] + "</td>";*/
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/sc.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" class="disableBtn" value="Hire" id= "' + driverID + '" onclick = "this.disabled=true;Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'' + spec + '\');"/>' + "</td>";
                html += '</tr>';
            }
            else if(spec == null) {
                html += '<tr>';
                html += "<td width='10%' align='center'> &pound" + data.d[i]["Comments"] + "</td>";
                html += "<td width='25%' align='center'>" + '<a href="#" style="color:blue;" class="pulse" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>' + "</td>";
                /* html += "<td width='20%' align='center'>" + data.d[i]["StartTime"] + "</td>";*/
                html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] + "</td>";
                html += "<td width='10%' align='center'>" + '<img src="img/spec.png"  width="15" height="15" style="color:grey;" onclick="SpecShow(\''+spec+'\')"/>' + "</td>";
                html += "<td width='20%' align='center'>" + bidh + ":" + bidm + "</td>";
                html += "<td width='15%' align='center'>" + '<input type="button" class="disableBtn"  value="Hire" id= "' + driverID + '" onclick = "this.disabled=true;Hireme(\'' + driverID + '\',\'' + customerReqId + '\',\'' + spec + '\');"/>' + "</td>";
                html += '</tr>';
                $('#txtothereSpecialReq').text("Not Available");
            }
        }
        html += '</tbody>';
        html += '</table>';
        html += '<br/>'
        
        //show the rating of drivers
        
           
        
        if(count < getCount)
        {
            html += '<div>';
            html += '<table>';
            html += '<tr>';
            html += '<td>';
            html += '<input type="button" id="searchAgain" value="InSufficient Drivers" onclick="SearchDriverAgain()"/>';
            html += '</td></tr>'; 
            html += '</table>';
            html += '</div>';
        }
        $('#msg').append(html);
    }
}

//rating or driver  lbl4star lbl3star lbl2star lbl1star
function ShowRating()
{
    //alert("inside");
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDriverRating",    //Get Response from driver 
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function(data)
        {
            
            $('#lbl5tar').text(data.d[0]);
            $('#lbl4star').text(data.d[1]);
            $('#lbl3star').text(data.d[2]);
            $('#lbl2star').text(data.d[3]);
            $('#lbl1star').text(data.d[4]);
            $('#popup_box').show();
            $('#divRating').show(); 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
   
}
//close rating pop up
function ratingClose()
{
   $('#divRating').hide(); 
   $('#popup_box').hide();
    
}
//
 function SearchDriverAgain()
{
    $('#msg').empty();
     $('#load').show();
    $('#statusMessage').html("Searching for more drivers...");
    $('#statusMessage').css("color","Yellow");
    //alert("SearchDriverAgain");
     $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetNewResponseData",    //Get Response from driver 
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
//getting the more list of driver
function SearchAgain()
{
    $('#msg').empty();
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetResponseData",    //Get Response from driver 
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
    $('#popup_box').hide();
    $('#divExpiry').hide();
}
function closeBid() {
    $('#popup_box').hide();
    $('#divBiding').hide();
}
//specia req pop up divExpiry divBiding closeExpiry closeBid
function SpecShow(a) {
    //alert(a);
    $('#popup_box').show();
    $('#divspec').show();
    $('#popupBoxClose').show();
    $('#divDealConfirmed').hide();
    $('#txtothereSpecialReq').text(a);
    
    

}
//close the pop up spec 
function specClose() {
    $('#popup_box').hide();
    $('#divspec').hide();
    
}

// hire me response send to driver 
function Hireme(driID, reqID,spec)
{
    DisableHiremeBtns();    // Disable all other buttons once cliked on any one 'Hire' button.
     $('#msg').disabled = true;
    var getSpec=$('#txtothereSpecialReq').text(spec); 
    if(getSpec != "Not Available")
    {
            var seeSpec=confirm("Please read the special circumstance entry");
            if(seeSpec==true)
            {
               $('#popup_box').show();
               $('#divspec').show();
               $('#popupBoxClose').show();              
               
            }
            else
            {
                return false;
            }
    }
      //$('#load').hide();
      $('#loading').show();   //Start loader load
      var driverId = driID;
      var requestId = reqID;
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

//Disable buttons function
function DisableHiremeBtns()
{
            $(":button.disableBtn").each(function(){
               this.disabled = true;
            });
}
//getting response data from drivers
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
                           
                            $('#loading').hide(); //Hide loader once deal found.

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
                            $('#divselect').hide();
                            
                            
                        },
                        complete: function () {
                            destroySetInterval();    //Call destroy                             
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
                    
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });

    }, 1000);
    //destroy the timer interval
    function destroySetInterval() {
        window.clearInterval(checkDealResp);    //clear Interval
    }
}
//showing map location
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
//
//saving the data after cab is booked in cab now table
function calOk() 
{
            $('#popup_box').hide();
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
//selection pop
function selectDriver()
{
            $('#divselect').hide();
            $('#popup_box').hide();
}

//Menu items--

//Logout Button
function logout()
 {
            $.cookie("remember", false);
            $.cookie("userName", 'null');
            $.cookie("userPassword", 'null');
            window.location = "index.html";
}

//cab Now Button
function cabNow() {
        window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//Customer Feedback 
function feedBack()
 {
        window.location = 'customerFeedback.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//Booked History
function bookedHistory()
 {
        window.location = 'bookedhistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//Home Button
function preCab()
{
        window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//My Profile Button
function myProfile() {
        window.location = 'customerHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

function CancelJobRequest()
{
         var result = confirm("Do you really want to cancel this job ?");    
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
        var result = confirm("Do you want to Re-Initiate this job ?");    
        if (result==true) {
          var cause = "ReInitiate";
          DeleteJob(cause);     
        }
        else
        {
         return false;
        }
}



function DeleteJob(cause)
{
         $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CancelCurrentJob",    //Cancel Current Job
            type: "POST",
            dataType: "Json",
            data: "{'requestID':'" + requestID + "','relatedId':'" + relatedId + "','cause':'" + cause + "'}",
            contentType: "application/json; charset=utf-8",
            success: function(data)
                {
                    alert(data.d); //delete job status
                    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
}
