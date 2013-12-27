var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

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
                       html += "<td style='width:20%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["JobNumber"] +"</td>"; 
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["From"] +"</td>";
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>" + data.d[i]["To"] +"</td>";
                       html += "<td style='width:25%;height:35px;text-align:center;border-bottom:1px solid #0080FF'>"+'<input type="button" class="accept-btn" value="Engage me" onclick="Engage(\''+data.d[i]["JobNumber"]+'\')"/>'+"</td>";
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
    $.ajax({
          url:"http://115.115.159.126/ECabs/ECabs4U.asmx/EngageDriver",
          type:"POST",
          datatype:"json",
          data:"{'relatedId':'"+relatedId+"','jobNo':'"+data+"'}",
          contentType: "application/json; charset=utf-8",                     
          success: function(data){
               window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
          },
       error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
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
function logout(){
          
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
