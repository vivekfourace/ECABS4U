var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
    window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
window.onload = DriverCabNowBookingInfo();
var id;
id = window.setInterval(DriverCabNowBookingInfo, 10000);

function DriverCabNowBookingInfo(){
    $.ajax({
       url:'http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/DriverCabNowBooking',
       type:'post',
       dataType:'json',
       data:"{'relatedId':'"+relatedId+"'}",
       contentType:"application/json; charset=utf-8",
       success: bindGrid,
       error:function (XMLHttpRequest, textStatus, errorThrown) {}
    });
}

function bindGrid(data)
{
    var count = data.d.length;
    if(count > 0)
    {
        $('#msgNow').html("");
        var isCustomerAccepted ="";
        var Bidfare="";
        for(var i=0; i<count; i++)
        {
             if(data.d[i]["CustomerResponse"] === true)
             {
                  isCustomerAccepted = true;
             }
        }
        var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
            html += '<thead class="thead-grid">';
            html += '<tr>';
            html += '<th>JobNo</th>';
        if(isCustomerAccepted === true)
        {
            html += '<th>Fare</th>';
        }
		html += '<th>From</th>';
        html += '<th>To</th>';
        html += '<th>Status</th>';                      
        html += '</tr>';
        html += '</thead>';
        html +='<tbody class="altColor">';  
             for(var i=0; i<count; i++)
             {
                isCustomerAccepted = data.d[i]["CustomerResponse"];
                 if(isCustomerAccepted === false)
                 {
                var customerID = data.d[i]["CustomerID"];
                html += '<tr>';
                html += "<td width='25%' height='30px' align='center'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["CustomerID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                if(isCustomerAccepted === true)
                {
                    html += "<td width='15%' height='30px' align='center'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                }
                html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
               // if(isCustomerAccepted === true)
               // {  
               //     html += "<td  colspan='2' width='10%' height='30px' align='center'>Awaiting customer response</td>";
               //     //html += "<td colspan='2'>"
               //     //+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Accept" class="accept-btn" onclick="AcceptJobNow(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["Fare"]+'\')"/><br/><div style="height:3px"></div>'
               //     //+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Reject" class="reject-btn" onclick="RejectJobNow(\''+data.d[i]["CustomerRequestID"]+'\')"/>'
               //     //+"</td>";
               // }
               // else 
                 if(isCustomerAccepted === false && data.d[i]["Fare"] === null )
                {
                   // html += "<td  colspan='2' width='10%' height='30px' align='center'>Awaiting customer response</td>";
                    html += "<td colspan='2'>"
                    +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Accept" class="accept-btn" onclick="seeRequest2()"/><br/><div style="height:3px"></div>'
                    +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Reject" class="reject-btn" onclick="closeRequest2()"/>'
                    +"</td>";
                }
                     else{
                         html += "<td  colspan='2' width='10%' height='30px' align='center'>Awaiting customer response</td>";
                     }
                html += '</tr>';  
                     }
             }
        html +='</tbody>';
        html +='</table>';
        $('#msgNow').append(html);
     }
     else
     {
         $('#bookingmsgNow').show();
     }
}

function AcceptJobNow(jobno, jobfare)
{
    $('#hidJobNoNow').val(jobno);
    var fare = jobfare;
    if(fare >= 11 && fare <=20)
    {
        $('#lblconfirmfare').html('&pound'+jobfare);
        $('#lblconfirmjob').text(jobno);
        $('#popup_box').show();
        $('#divComission').show();
        $('#transparent_div').show();
        
    }
    else if(fare >=21)
    {
        $('#lblconfirmfare2').html('&pound'+jobfare);
        $('#lblconfirmjob2').text(jobno);
        $('#popup_box').show();
        $('#divComission2').show();
        $('#transparent_div').show();
        
    }
    else
    {
        var reqID = $('#hidJobNoNow').val();
        $.ajax({
            beforeSend: function(){
               $('#imgLoader').show();
            },
            complete: function(){
               $('#imgLoader').hide();
            },
            url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CabNowJobBooked",
            type: "POST",
            dataType: "Json",
            data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) 
            {
                if(data.d  === "true")
                {
                    navigator.notification.alert(
                    "Job booked successfully.",
                    jobBooked, // Specify a function to be called 
                    'ECABS4U',
                    "OK"
                    );
                    function jobBooked()
                    {
                        window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                }  
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) 
           {
                navigator.notification.alert(
                "We are extremely sorry your inconvinience. Some error occurred during booking. Please try again.",
                jobBookError, 
                'ECABS4U',
                "OK"
                );
                function jobBookError()
                { }
           }
        });
    }
}

function ShowDetailBooking(data, customerid)
{
    var url = "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/GetDCabNowBooking";
       $.ajax(url, {
          type:"POST",
          datatype:"json",
          data:"{'customerReqID':'"+data+"', 'customerid':'"+customerid+"', 'relatedId':'"+relatedId+"'}",
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
    $('#lblFare').html(": "+'&pound'+data.d[1]);
    $('#lblDriverName').text(": "+data.d[2]);
    $('#lblStartDate').text(": "+data.d[3]);
    $('#lblStartTime').text(": "+data.d[4]);
    $('#lblSearchTime').text(": "+data.d[5]);
    $('#lblBidTime').text(": "+data.d[6]);
    //$('#lblDSR').text(": "+data.d[7]);  
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
function RejectJobNow(data)
{
    var isTrue = confirm("Confirm you want to reject this job offer?");
    if(isTrue)
    {
            var rid = data;   
            var status = "Reject";
            $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },
                complete: function(){
                   $('#imgLoader').hide();
                },
                url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    navigator.notification.alert(
                    "Job rejected successfully.",
                    driverJobRejectNow,
                    'ECABS4U',
                    "OK"
                    );
                     function driverJobRejectNow()
                     {
        		         window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    				 }                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { }
            });
    }
    else
    {
        return false;
    }
            
}

function RejectComission()
{
     $('#divDeal').hide();
     $('#popup_box').hide();
     $('#transparent_div').hide();
}

function Confirmcomission()
{
    var reqID = $('#hidJobNoNow').val();
    $.ajax({
        beforeSend: function()
        {
    		$('#imgLoader').show();
    	},                
        url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CabNowJobBooked",
        type: "POST",
        dataType: "Json",
        data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) 
        {
            if(data.d !== "")
            {
                console.log(data.d);
                var returnvalue = data.d;
                if (returnvalue.match(/"Error:"/g) > 0)
                {
                    navigator.notification.alert(
                    returnvalue,
                    jobErrorCabNowBook,
                    'ECABS4U',
                    "OK"
                    );
                    function jobErrorCabNowBook()
                    { }
                }
                else
                {
                    document.addEventListener("deviceready", onDeviceReady, false);

                    function iabLoadStart(event) { }

                    function iabLoadStop(event) { }

                    function iabClose(event) {
                      iabRef.removeEventListener('loadstart', iabLoadStart);
                      iabRef.removeEventListener('loadstop', iabLoadStop);
                      iabRef.removeEventListener('exit', iabClose);
                      window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;                                     
                    }

                    function onDeviceReady() {
                      iabRef = window.open(data.d, '_blank', 'location=yes');
                      iabRef.addEventListener('loadstart', iabLoadStart);
                      iabRef.addEventListener('loadstop', iabLoadStop);
                      iabRef.addEventListener('exit', iabClose);
                    }                 
                }
            }
            else
            {
                navigator.notification.alert(
                "We are sorry for your inconvinience. Unable to do payment for this job. Please try after some time.",
                paymentError,
                'ECABS4U',
                "OK"
                );
                function paymentError()
                { }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) 
        { }
    });
    
    $('#divDeal').hide();
    $('#popup_box').hide();
    $('#transparent_div').hide();
}


function HomePage(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function MyProfilePage(){
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function seeRequest2()
{
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function closeRequest2()
{
    
     navigator.notification.confirm(
    "Do you really want to reject this job?",
     onClickRejectNow,
    "Confirm",
    "Yes,No" 
    );
    
    function onClickRejectNow(buttonIndex)
    {
            if(buttonIndex === 2)
            {
                return false;
            }
            else if(buttonIndex === 1)
            {
               $.ajax({
                  url:'http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CancelNewJobDNotification', 
                  type:"POST",
                  datatype:"json",
                  data:"{'relatedId':'" +relatedId+ "'}",
                  contentType: "application/json; charset=utf-8",                     
                  success: function () {
                       navigator.notification.alert(
                          'Job rejected successfully.',
                           jobCancelledNow22, // Specify a function to be called 
                           'ECABS4U',
                           "OK"
                           );
                           function jobCancelledNow22()
                           {
                               window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;		      
                           }
                     // window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                  }
             }); 
                
            }
    }
    
   //// alert("in");
   //  $.ajax({
   //           url:'http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CancelNewJobDNotification', 
   //           type:"POST",
   //           datatype:"json",
   //           data:"{'relatedId':'" +relatedId+ "'}",
   //           contentType: "application/json; charset=utf-8",                     
   //           success: function () {
   //               window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   //           }
   //     });
}