//var QString = window.location.search.substring(1);

//var relatedId = QString.split("=")[1].split("&")[0];

var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backToIndex()
{
    
       
   window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}
window.onload = gethistory();

function gethistory()
{
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerHistoryDetails";
                $.ajax(url, {
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: function (data) {                   
                        var count = data.d.length;
                        //alert(count);
                        if(count > 0)
                        {
                                var html = '<table width="100%" style="border-collapse:collapse">';
                                html += '<thead style="background-color:#D8DCBB;color:darkblue;">';
                                html += '<tr>';
                                html += '<th class="th4 font">JobNo</th>';
                                html += '<th class="th4 font">Date</th>';
                                html += '<th class="th4 font">Time</th>';
                                html += '<th class="th4 font">From</th>';
                                html += '<th class="th4 font">To</th>';
                                
                                html += '</tr>';
                                html += '</thead>';
                                               html +='<tbody class="body-style">';  
                                                    for(var i=0; i<count; i++)
                                                    {
                                                       html += '<tr>';
                                                       html += "<td width='25%' align='center'>" +'<a href="#" onclick="">'+ data.d[i]["JobNo"]+'</a>' + "</td>"; 
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
function preCab()
{
   window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}




//Booked History
function bookedHistory()
{
 //alert(relatedId);
 
  window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}




//My Profile Button
 function myProfile()
            {
                window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            }
  


//Logout
function logout()
    {
                
       $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";  
    }




//Customer Feedback 
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


function backtostart()
{
    window.location="index.html";
}

    
    
    
