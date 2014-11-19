var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady()
//{
//    console.log("Device ready");
//}

window.onload = getCablaterBooking2();
var ref;

 ref = window.setInterval(getCablaterBooking2, 1000);
function getCablaterBooking2()
{
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabLaterJobOffered";
                $.ajax(url, {
                   type:"POST",
                   datatype:"json",
                   data:"{'relatedId':'"+relatedId+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: bindGridLater2,
                  error:function (XMLHttpRequest, textStatus, errorThrown) {}
        });
                        
}
function bindGridLater2(data)
    {
         var count = data.d.length;
    if(count > 0)
    {
       //alert(count);
        $('#bookingmsg').hide();
        $('#msg').html("");
            var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
            html += '<thead class="thead-grid">';
            html += '<tr>';
            html += '<th>JobNo</th>';
            html += '<th>From</th>';
            html += '<th>To</th>';
            html += '<th>Status</th>';                      
            html += '</tr>';
            html += '</thead>';
               html +='<tbody class="altColor">';  
                    for(var i=0; i<count; i++)
                    {
                       var isCustomerAccepted = data.d[i]["CustomerResponse"];
                       var fare = data.d[i]["Fare"];
                        
                       $('#lbljobFeed').text(data.d[i]["JobNumber"]);
                        
                      if(isCustomerAccepted === "False" && fare === null)
                       {
                           html += '<tr>';
                           html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
                           html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
                           html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
                       
                      
                           html += "<td colspan='2' style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>"
                           +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="View" class="accept-btn" onclick="AcceptJob(\''+data.d[i]["JobNumber"]+'\')"/><br/><div style="height:3px"></div>'
                           +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Reject" class="reject-btn" onclick="CancelJob(\''+data.d[i]["JobNumber"]+'\')"/>'
                           +"</td>";
                       }
                     else if(isCustomerAccepted === "False")
                     {
                          html += '<tr>';
                          html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
                          html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
                          html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
                          html += "<td colspan='2' style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>Awaiting customer response</td>";
                     }
                    }
               html +='</tbody>';
               html +='</table>';
            $('#msg').append(html);
     }
    else
    {
        $('#msg').empty().append("");
        $('#bookingmsg').show();
    }
        
    }

//$.ajax({
//        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabLaterJobOffered",
//        type:"POST",
//        dataType: "Json",
//        data:"{'relatedId':'"+relatedId+"'}",
//        contentType: "application/json; charset=utf-8",                     
//        success: function(data)
//        {
//          
//            var count = data.d.length;
//    if(count > 0)
//    {
//        
//            var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
//            html += '<thead class="thead-grid">';
//            html += '<tr>';
//            html += '<th>JobNo</th>';
//            html += '<th>From</th>';
//            html += '<th>To</th>';
//            html += '<th>Status</th>';                      
//            html += '</tr>';
//            html += '</thead>';
//               html +='<tbody class="altColor">';  
//                    for(var i=0; i<count; i++)
//                    {
//                       var isCustomerAccepted = data.d[i]["CustomerResponse"];
//                       var fare = data.d[i]["Fare"];
//                        
//                       $('#lbljobFeed').text(data.d[i]["JobNumber"]);
//                        
//                      if(isCustomerAccepted === "False" && fare === null)
//                       {
//                           html += '<tr>';
//                           html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
//                           html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
//                           html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
//                       
//                      
//                           html += "<td colspan='2' style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>"
//                           +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="View" class="accept-btn" onclick="AcceptJob(\''+data.d[i]["JobNumber"]+'\')"/><br/><div style="height:3px"></div>'
//                           +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" value="Reject" class="reject-btn" onclick="CancelJob(\''+data.d[i]["JobNumber"]+'\')"/>'
//                           +"</td>";
//                       }
//                     else if(isCustomerAccepted === "False")
//                     {
//                          html += '<tr>';
//                          html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
//                          html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
//                          html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
//                          html += "<td colspan='2' style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>Awaiting customer response</td>";
//                     }
//                    }
//               html +='</tbody>';
//               html +='</table>';
//            $('#msg').append(html);
//     }
//    else
//    {
//        $('#bookingmsg').show();
//    }
//  }
//});

function AcceptJob(jobnumber)
{
   
    $('#hdnJobno').val(jobnumber);
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId+'&Jobid='+jobnumber;    
}

function CancelJob(jobnumber)

{
     navigator.notification.confirm(
    "Do you really want to reject this job?",
     onClickReject22,
    "Confirm",
    "Yes,No" 
    );
    
    function onClickReject22(buttonIndex)
    {
            if(buttonIndex === 2)
            {
                return false;
            }
            else if(buttonIndex === 1)
            {
               
            $.ajax({
                     url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'" +relatedId+ "', 'jobnumber':'" +jobnumber+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function (data) {
                         //jAlert('Job cancelled successfully.', 'Alert');
                        // alert('Job cancelled successfully.');
                         //window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         navigator.notification.alert(
                          'Job rejected successfully.',
                           jobCancelled22, // Specify a function to be called 
                           'ECABS4U',
                           "OK"
                           );
                           function jobCancelled22()
                           {
                               window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;		      
                           }
                         
                   }
                });
                
                
            }
        
    }
    
    
    // $.ajax({
    //          url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
    //          type:"POST",
    //          datatype:"json",
    //          data:"{'relatedId':'" +relatedId+ "', 'jobnumber':'" +jobnumber+ "'}",
    //          contentType: "application/json; charset=utf-8",                     
    //          success: function (data) {
    //              //jAlert('Job cancelled successfully.', 'Alert');
    //             // alert('Job cancelled successfully.');
    //              //window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    //              navigator.notification.alert(
    //               'Job cancelled successfully.',
    //                jobCancelled22, // Specify a function to be called 
    //                'ECABS4U',
    //                "OK"
    //                );
    //                function jobCancelled22()
    //                {
    //                    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;		      
    //                }
    //              
    //        }
    // });
}


function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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