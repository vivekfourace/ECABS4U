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
   
    
    //var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerHistoryDetails";
                $.ajax(url, {
                    
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        //var len = data.d.length;
                     
                        $('#msg').append("<table style='width:100%'>")
                       
                         $('#msg').append("<tr>")
                            
                            .append("<th width='35%' align='center' height='35px' style='background-color:#888888;font-size:13px;color:white'>" +"Date"+"</th>")
                            .append("<th width='25%' align='center' height='35px' style='background-color:#888888;font-size:13px;color:white'>" +"From"+"</th>")
                             .append("<th width='25%' align='center' height='35px' style='background-color:#888888;font-size:13px;color:white'>" +"To"+"</th>")
                            .append('</tr>');
                       
                            
                       
                            //var id = data.d[i]["ID"];
                           
                            $('#msg').append('<tr>')
                            
                            .append("<td width='35%' align='center' height='25px' style='background-color:#DADADA;'>" + data.d[0]+"</td>")
                            .append("<td width='25%' align='center' height='25px' style='background-color:#DADADA;'>" + data.d[1]+"</td>")
                             .append("<td width='25%' align='center' height='25px' style='background-color:#DADADA;'>" + data.d[2]+"</td>")
                            .append("</tr>");
                      
                        $('#msg').append("</table>")
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

    
    
    
