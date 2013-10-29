//query string 

var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
//back to index
function backToIndex()
{
     window.location =  'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

window.onload = gethistory();
function gethistory()
{
   
    
                        var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/DriverHistoryDetails";
                        $.ajax(url, 
                        {
                            
                            type:"POST",
                            datatype:"json",
                            data:"{'relatedId':'"+relatedId+"'}",
                           contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                var count = data.d.length;
                                //alert(count);
                                if(count > 0)
                                {
                                        var html = '<table cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                                        html += '<thead style="background-color:#0A0A2A;color:#fff;">';
                                        html += '<tr>';
                                        html += '<th class="th4 font">JobNo</th>';
                                        html += '<th class="th4 font">Date</th>';
                                        html += '<th class="th4 font">Time</th>';
                                        html += '<th class="th4 font">From</th>';
                                        html += '<th class="th4 font">To</th>';
                                        html += '</tr>';
                                        html += '</thead>';
                                                       html +='<tbody class="body-style altColor"  style="font-size:14px;">';  
                                                            for(var i=0; i<count; i++)
                                                            {
                                                               html += '<tr>';
                                                               html += "<td width='25%' align='center'>" +'<a href="#" style="color:blue;" onclick="">'+ data.d[i]["JobNo"]+'</a>' + "</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["StartDate"] + "</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["StartTime"] +"</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["FromLoc"] +"</td>";
                                                               html += "<td width='25%' align='center'>" + data.d[i]["ToLoc"] +"</td>";
                                                               html += '</tr>';
                                                            }
                                                       html +='</tbody>';
                                           html +='</table>';
                                        $('#msg').append(html);
                                 }
                                else
                                {
                                    alert("No history found");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) 
                            {
                                alert(errorThrown);
                            }
                        });
                
}
//cab Now
function cabNow()
{
              window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}
//Pre Cab
function myhome()
{
           window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Booked History
function bookedHistory()
{
          window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 
}
//Driver Jobs from menu
function MyBookings(){
         window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//My Profile Button
 function myProfile()
{
         window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//Logout
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
          $.cookie("userName", 'null');
          $.cookie("userPassword", 'null');
          window.location = "index.html";  
}
//Customer Feedback 
function feedBack()
{
       window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//back to index
function backtostart()
{
        window.location="index.html";
}

//Accepting the Request.    
function seeRequest()
{
        window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 //cancel the Request.
function closeRequest()
{
         $.ajax({
                  url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                  type:"POST",
                  datatype:"json",
                  data:"{'userID':'" +relatedId+ "'}",
                  contentType: "application/json; charset=utf-8",                     
                  success: function (data) 
                     {
                         $('#popup_box').hide();
                          $('#divDealStart').hide();
                    },
                  error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                            $('#popup_box').hide();
                          $('#divDealStart').hide(); 
                      }
            });
    
}


    
    
    
