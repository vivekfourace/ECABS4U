var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var btnArray = ['No','Yes'];
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   console.log('device ready');
}

$.ajax({
    url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetFailedJobs",
    datatype:"JSON",
    type:"POST",
    data:"{'relatedId':'"+relatedId+"','role':'"+roleId+"'}",
    contentType:"application/json; charset=utf-8",
    success:displayResult
});

function displayResult(data)
{
    var count = data.d.length;
    if(count > 0)
    {
       var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
       html += '<thead class="thead-grid">';
       html += '<tr>';
       html += '<th>JobNo</th>';
       html += '<th>From</th>';
       html += '<th>To</th>';
       html += '<th>Status</th>';
       html += '</tr>';
       html += '</thead>';
          html +='<tbody class="tbody-grid altColor">';  
               for(var i=0; i<count; i++)
               {
                  var jobno = data.d[i]["JobNumber"];
                  var from = data.d[i]["From"];
                  var to = data.d[i]["To"];
                  html += '<tr>';
                  html += "<td width='15%' height='30px' align='center'>"+jobno+"</td>"; 
                  html += "<td width='25%' height='30px' align='center'>"+from+"</td>";
                  html += "<td width='25%' height='30px' align='center'>"+to+"</td>";
                  html += "<td width='30%' height='30px' align='center'>"
                       +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="accept-btn" value="Re-initiate" onclick="InitiateJob(\''+jobno+'\')"/>'+'<br/>'
                       +'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="reject-btn" value="Cancel" onclick="CancelJob(\''+jobno+'\')"/>'+"</td>";
                  html += '</tr>';
               }
          html +='</tbody>';
          html +='</table>';
       $('#msg').append(html);
     }
}

function InitiateJob(jobno)
{
    $('#hdnJobno').val(jobno);
    //alert(jobno);
    //$('#lbljobno').val(jobno);
    //alert(jobno);
    SubmitDeal();
    
}

function CancelJob(jobno)
{
    var cause = "Not opted for re-initiate";
    $.ajax({
       url:"http://115.115.159.126/ECabs/ECabs4U.asmx/CancelCurrentJob",
       type:"POST",
        datatype:"json",
        data:"{'requestID':'" +jobno+"', 'relatedId':'" +relatedId+"', 'cause':'" +cause+"'}",
        contentType:"application/json;charset=utf-8",
        success:function(data)
        {
           // alert(data.d);
           // window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                        navigator.notification.alert(
				       data.d,
  				      driverFailedJob221, // Specify a function to be called 
 					   'ECABS4U',
 					  "OK"
					   );
                        function driverFailedJob221()
                        {
    			       window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
					   }
            
        },
    });
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

function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}