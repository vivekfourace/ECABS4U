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
            html += '<thead style="background-color:#0A0A2A;color:#fff;">';
            html += '<tr>';
            html += '<th class="th4 font">JobNo</th>';
            html += '<th class="th4 font">From</th>';
            html += '<th class="th4 font">To</th>';
            html += '<th class="th4 font"></th>';                      
            html += '</tr>';
            html += '</thead>';
               html +='<tbody class="body-style altColor"  style="font-size:14px;">';  
                    for(var i=0; i<count; i++)
                    {
                       $('#lbljobFeed').text(data.d[i]["JobNumber"]);
                       html += '<tr>';
                       html += "<td width='20%' height='30px' align='center'>" + data.d[i]["JobNumber"] +"</td>"; 
                       html += "<td width='25%' height='30px' align='center'>" + data.d[i]["From"] +"</td>";
                       html += "<td width='25%' height='30px' align='center'>" + data.d[i]["To"] +"</td>";
                       html += "<td width='25%' height='30px' align='center'>"+'<input type="button" value="Engage me" onclick="Engage(\''+data.d[i]["JobNumber"]+'\')"/>'+"</td>";
                    }
               html +='</tbody>';
               html +='</table>';
            $('#msg').append(html);
     }
    else
    {
        alert("No Job found");
        window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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

function logout()
{                
         $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
          $.cookie("remember", false);
          //$.cookie("userName", 'null');
          //$.cookie("userPassword", 'null');
          window.location = "index.html";  
}
function feedBack()
{
       window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
          window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function MyBookings(){
         window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 function myProfile()
{
         window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function myhome()
{
           window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}