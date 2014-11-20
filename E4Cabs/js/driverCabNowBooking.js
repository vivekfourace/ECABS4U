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
id = window.setInterval(DriverCabNowBookingInfo, 1000);

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
        $('#msg').html("");
        var isCustomerAccepted ="";
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
                var customerID = data.d[i]["CustomerID"];
                html += '<tr>';
                html += "<td width='25%' height='30px' align='center'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["CustomerID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                if(isCustomerAccepted === true)
                {
                    if(data.d[i]["Fare"] === "null")
                    {
                        html += "<td width='15%' height='30px' align='center'>--</td>";
                    }
                    if(data.d[i]["Fare"] > 0)
                    {
                        html += "<td width='15%' height='30px' align='center'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                    }
                }
                html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
                if(isCustomerAccepted === true)
                {  
                    html += "<td colspan='2'>"
                    +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Accept" class="accept-btn" onclick="AcceptJob(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["Fare"]+'\')"/><br/><div style="height:3px"></div>'
                    +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Reject" class="reject-btn" onclick="RejectJob(\''+data.d[i]["CustomerRequestID"]+'\')"/>'
                    +"</td>";
                }
                else if(isCustomerAccepted === false)
                {
                    html += "<td  colspan='2' width='10%' height='30px' align='center'>Awaiting customer response</td>";
                }
                html += '</tr>';                                    
             }
        html +='</tbody>';
        html +='</table>';
        $('#msgcabnow').html('');
        $('#msgcabnow').append(html);
     }
     else
     {
         $('#bookingmsg').show();
     }
}

function AcceptJob(jobno, jobfare)
{
    $('body').css('overflow','hidden');
    $('#hidJobNo').val(jobno);
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
        var reqID = $('#hidJobNo').val();
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
                $('body').css('overflow','auto');
                if(data.d  === "true")
                {
                   //alert('Job booked successfully.');
                  // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                     navigator.notification.alert(
    			        "Job booked successfully.",
      	             jobBookedsuccess223, // Specify a function to be called 
     				   'ECABS4U',
     					"OK"
    					);
                         function jobBookedsuccess223()
                         {
            		       window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        				 }
                }  
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) 
           {
              // alert("Some error occurred during booking and payment. Please try again.");
                navigator.notification.alert(
    			    "Some error occurred during booking and payment. Please try again.",
      	         jobBookedError222, // Specify a function to be called 
     				   'ECABS4U',
     					"OK"
    					);
                     function jobBookedError222()
                     {
        		      
    				 }
           }
        });
    }
}

function ShowDetailBooking(data, customerid)
{
    $('body').css('overflow','hidden');
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
    $('#divCabBooking').show();
    $('#transparent_div').show();
     $('#divComission').hide();
    $('#divComission2').hide();
    
}

function Cancel()
{
    $('body').css('overflow','auto');
    $('#popup_box').hide();
    $('#divCabBooking').hide();
    $('#transparent_div').hide();
}
function RejectJob(data)
{
    
    
    $('body').css('overflow','hidden');
    //var isTrue = confirm("Confirm you want to reject this job offer?");
    //if(isTrue)
    //{
    //        var rid = data;   
    //        var status = "Reject";
    //        $.ajax({
    //            beforeSend: function(){
    //               $('#imgLoader').show();
    //            },
    //            complete: function(){
    //               $('#imgLoader').hide();
    //            },
    //            url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/RejectResponse",
    //            type: "POST",
    //            dataType: "Json",
    //            data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            success: function (data) {
    //                $('body').css('overflow','auto');
    //               // alert("Job rejected successfully.");
    //               //  window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    //                navigator.notification.alert(
    //			        "Job rejected successfully.",
    //  	              Jobreject222, // Specify a function to be called 
    // 				   'ECABS4U',
    // 					"OK"
    //					);
    //                 function Jobreject222()
    //                 {
    //    		      window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    //				 }
    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) { }
    //        });
    //}
    //else
    //{
    //    return false;
    //}
         
    
    
    navigator.notification.confirm(
    "Confirm you want to reject this job offer?.",
    canceljobNow,  
    'ECABS4U',
    "OK,Cancel"
    );
    
    
    function canceljobNow(buttonIndex)
     {
            if(buttonIndex === 2)
            {
               
                return false;
            }
            else if(buttonIndex === 1)
            {
                
                var rid = data;   
                var status = "Bid rejected by driver for JobNo " + rid;
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
                        $('body').css('overflow','auto');
                       // alert("Job rejected successfully.");
                       //  window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                        navigator.notification.alert(
        			        "Job rejected successfully.",
          	              Jobreject222, 
         				   'ECABS4U',
         					"OK"
        					);
                         function Jobreject222()
                         {
            		      window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        				 }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) { }
                });
                
                
            }
     }
    
}

function RejectComission()
{
    $('body').css('overflow','auto');
     $('#divDeal').hide();
     $('#popup_box').hide();
     $('#transparent_div').hide();
     $('#divComission').hide();
    $('#divComission2').hide();
}

function Confirmcomission()
{
    var reqID = $('#hidJobNo').val();
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
            $('body').css('overflow','auto');
            var returnvalue = data.d;
            if (returnvalue.match(/"Error:"/g) > 0)
            {
               // alert(returnvalue);
               // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                navigator.notification.alert(
			    returnvalue,
  	          joberror222, // Specify a function to be called 
 				'ECABS4U',
 					"OK"
					);
                 function joberror222()
                 {
    		      window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
				 }
            }
            else if(data.d.substring(0,4) === "Job "){
                //alert(data.d);
               // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                navigator.notification.alert(
			    data.d,
  	          joberror223, // Specify a function to be called 
 				'ECABS4U',
 					"OK"
					);
                 function joberror223()
                 {
    		      window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
				 }
            }
            else if(data.d.substring(0,4) === "Plea"){
               // alert(data.d);
               // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                 navigator.notification.alert(
			    data.d,
  	          joberror224, // Specify a function to be called 
 				'ECABS4U',
 					"OK"
					);
                 function joberror224()
                 {
    		      window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
				 }
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
           //alert("Unable to do payment. Please try again.");
             navigator.notification.alert(
        			        "Unable to do payment. Please try again.",
          	             paymentError222, // Specify a function to be called 
         				   'ECABS4U',
         					"OK"
        					);
                             function paymentError222()
                             {
                		      
            				 }
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    {
		console.log("error occurred.");
    }
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