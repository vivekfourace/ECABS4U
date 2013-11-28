var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
    window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

$.ajax({
   url:'http://115.115.159.126/ECabs/ECabs4U.asmx/DriverCabLaterBooking',
   type:'post',
   dataType:'json',
   data:"{'relatedId':'"+relatedId+"'}",
   contentType:"application/json; charset=utf-8",
   success: bindGrid,
   error:function (XMLHttpRequest, textStatus, errorThrown) {}
});

function bindGrid(data)
{
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
                    var isCustomerAccepted = data.d[i]["CustomerResponse"];
                    console.log(isCustomerAccepted);
                    html += '<tr>';
                    html += "<td width='25%' height='30px' align='center'>" +'<a href="#" onclick="ShowDetailBooking(\''+data.d[i]["CustomerRequestID"]+'\')" style="color:blue;">'+ data.d[i]["CustomerRequestID"]+'</a>' + "</td>"; 
                    html += "<td width='15%' height='30px' align='center'>"+'&pound' + data.d[i]["Fare"] +"</td>";
                    html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                    html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
                     
                    if(isCustomerAccepted == "True")
                     {
                       html += "<td width='5%' height='30px' align='center'>"+'<input type="button" value="Accept" onclick="AcceptJob(\''+data.d[i]["CustomerRequestID"]+'\',\''+data.d[i]["Fare"]+'\')"/>'+"</td>";
                       html += "<td width='5%' height='30px' align='center'>"+'<input type="button" value="Reject" onclick="RejectJob(\''+data.d[i]["CustomerRequestID"]+'\')"/>'+"</td>";
                     }
                     else if(isCustomerAccepted == "False")
                     {
                         html += "<td width='10%' height='30px' align='center'>No Response</td>";
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
}

function AcceptJob(jobno, jobfare)
{
    $('#hidJobNo').val(jobno);
    var fare = jobfare;
    if(fare == 15 || fare > 15)
    {
        $('#lblconfirmfare').text('&pound'+jobfare);
        $('#lblconfirmjob').text(jobno);
        $('#popup_box').show();
        $('#divComission').show();
    }
    else
    {
            var reqID = $('#hidJobNo').val();
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d == true)
                    {
                       alert('Job booked successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
    }
}

function RejectJob(data)
{
    var isTrue = confirm("Do you want to reject this job offer!");
    if(isTrue)
    {
            var rid = data;   
            var status = "Reject";
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/rejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                     alert("Job Rejected Successfully.");
                     window.location = 'DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
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
}

function Confirmcomission()
{
            var reqID = $('#hidJobNo').val();
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d == true)
                    {
                       //alert('Job booked successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
     window.location.href = "https://sandbox.gocardless.com/pay/YH0MFHY7"; //for commission 1.2pond
     $('#divDeal').hide();
     $('#popup_box').hide();
}