var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var jobNo = "";

window.onload = showCabLaterJobs();
function showCabLaterJobs()
{
    $.ajax({
          url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetCabLaterJobs",
          type:"POST",
          datatype:"json",
          data:"{'relatedId':'"+relatedId+"'}",
          contentType: "application/json; charset=utf-8",                     
          success: showTodayJobs,
       error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
}


function showTodayJobs(data)
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
            html += '<th></th>';                      
            html += '</tr>';
            html += '</thead>';
               html +='<tbody class="altColor">';  
                    for(var i=0; i<count; i++)
                    {
                       $('#lbljobFeed').text(data.d[i]["JobNumber"]);
                       html += '<tr>';
                       html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" +'<a href="#" onclick="JobDetail2(\''+data.d[i]["JobNumber"]+'\')" style="color:blue;">'+ data.d[i]["JobNumber"]+'</a>'+"</td>"; 
                       //html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>"+'<input type="button" style="-webkit-appearance:none;-moz-appearance:none;" class="accept-btn" value="En route" onclick="Engage(\''+data.d[i]["JobNumber"]+'\')"/>'+"</td>";
                    }
               html +='</tbody>';
               html +='</table>';
            $('#msg').append(html);
     }
    else
    {
        $('#bookingmsg').show();
    }
}

function Engage(data)
{
    jobNo = data;
      navigator.notification.confirm(
    "Do you want to en-route this job?",
    EngageDriver,
    "Confirm",
    "Yes,No"   
    );
}
function EngageDriver(buttonIndex, data)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
    $.ajax({
          url:"http://115.115.159.126/ECabs/ECabs4U.asmx/EngageDriver",
          type:"POST",
          datatype:"json",
          data:"{'relatedId':'"+relatedId+"','jobNo':'"+jobNo+"'}",
          contentType: "application/json; charset=utf-8",                     
          success: function(data){
               window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
          },
       error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
    }
}



function JobDetail2(data)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/JobDetailDriver";
                $.ajax(url, {
                   type:"POST",
                   datatype:"json",
                   data:"{'customerReqID':'"+data+"'}",
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
    $('#lbltDate').text(": "+data.d[2]);
    //$('#lblTime').text(": "+data.d[3]);
    
    //Conversion of time formate.
    var time = data.d[3];
    // alert(time);
    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format == "PM" && hrs < 12) hrs = hrs + 12;
    if (format == "AM" && hrs == 12) hrs = hrs - 12;
    var hours = hrs.toString();
    var minutes = mnts.toString();
    if (hrs < 10) hours = "0" + hours;
    if (mnts < 10) minutes = "0" + minutes;
    //alert(hours + ":" + minutes);
     $('#lblTime').text(":"+ hours + ":" + minutes); 
    
    
    $('#lblFrom').text(": "+data.d[4]);
    $('#lblTo').text(": "+data.d[5]);
    $('#lblCustomerName').text(": "+data.d[6]);
    
    $('#lblCustomerContact').text(data.d[7]);
    $('#lblCustomerContact').css("font-weight", 900);
    
    $('#lblNoOfPassenger').text(": "+data.d[8]);
    
    if(data.d[9]!=="No Customer Feedback")
    {
        $('#labelline').show();
         $('#custFeedback').show();
      $('#lblCustomerFeedback').text(": "+data.d[9] + " (Rating- "+data.d[13]+")");  
    }
    else
    {
        $('#custFeedback').hide();
        $('#MyFeedback').hide();
        $('#labelline').hide();
    }
   
    
    if(data.d[10]!== "No Return")
    {
        $('#rtnfrom').show();
        $('#lblreturnfrom').text(": "+data.d[10]);
    }
    else
    {
        $('#rtnfrom').hide();
       
    }
    if(data.d[11]!== "No Return")
    {
        $('#rtnto').show();
        $('#lblreturnto').text(": "+data.d[11]);
    }
    else
    {
       //$('#rtnto').hide();
        $('#rtnto').hide();
    }
    if(data.d[12]!=="No Driver Comments")
    {
         $('#MyFeedback').show();
        $('#labelline').show();
      $('#lblMyFeedback').text(": "+data.d[12]);  
    }
    else
    {
        $('#MyFeedback').hide();
       // $('#labelline').hide();
    }
    
    $('#popup_box').show();
    $('#divCabLaterBooking').show();
     $('#transparent_div').show();
}


function Cancel()
{
    $('#popup_box').fadeOut("fast");
    $('#divCabLaterBooking').fadeOut("fast");
     $('#transparent_div').hide();
}

function makeCall()
{
    var number = $('#lblCustomerContact').text();
    console.log(number);
    window.location.href = "tel:" + number;    
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
