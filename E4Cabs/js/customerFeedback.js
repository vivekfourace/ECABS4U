var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = UploadFeedBack();

function UploadFeedBack()
{
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerFeedBackDetail";
                $.ajax(url, {
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: function (data) {                   
                        var count = data.d.length;
                        if(count > 0)
                        {
                            var html = '<table border="0" id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                            html +='<tbody class="body-style" style="font-size:14px;">'; 
                            for(var i=0; i<count; i++)
                            {
                                var comment = data.d[i]["Comment"];
                                var rating = data.d[i]["Rating"];
                                if(comment != null)
                                {
                                    html += "<tr>";
                                    html += "<td style='width:30%;text-align:center;height:50px'>" + '<img src="img/TaxiDriver_Male_Dark.png" style="color:grey;height:50px;width:50px;padding-top:5px"/>' + "</td>";
                                    html += "<td rowspan='2' style='height:80px;width:70%;border-bottom:1px solid black;word-break:break-all'>"+'<b><u>' + data.d[i]["Name"] + '</u></b>'+'<br/>'
                                    html += '<span margin-top:"12px">'+ data.d[i]["Comment"] +'</span>';
                                    html += '</td>';
                                    html +="</tr>";
                                     html += "<tr>";
                                    if(rating == 1)
                                    {
                                        html += "<td style='width:30%;height:30px;text-align:center;border-bottom:1px solid black;'><img src='img/1star.PNG' style='width:18%'/></td>";
                                    }
                                    else if(rating == 2)
                                    {
                                        html += "<td style='width:30%;height:30px;text-align:center;border-bottom:1px solid black;'><img src='img/2star.PNG' style='width:32%'/></td>";
                                    }
                                    else if(rating == 3)
                                    {
                                        html += "<td style='width:30%;height:30px;text-align:center;border-bottom:1px solid black;'><img src='img/3star.PNG' style='width:45%'/></td>";
                                    }
                                    else if(rating == 4)
                                    {
                                        html += "<td style='width:30%;height:30px;text-align:center;border-bottom:1px solid black;'><img src='img/4star.PNG' style='width:58%'/></td>";
                                    }
                                    else if(rating == 5)
                                    {
                                        html += "<td style='width:30%;height:30px;text-align:center;border-bottom:1px solid black;'><img src='img/5star.PNG' style='width:100%'/></td>";
                                    }
                                    
                                    html += "</tr>";                                    
                                }
                                else
                                {                                    
                                }
                            }
                            html +='</tbody>';
                            html +='</table>';
                            $('#msg').append(html);
                        }
                        else
                        {
                            alert("No feedback found.");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                    }
                });
}

function backtostart()
{
   window.location=  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function PostComment()
{
    $('#divPostComment').fadeIn("slow");
}
function CancelComment()
{
    $('#txtPostComment').val("");
    $('#divPostComment').fadeOut("slow");  
}
function cabNow()
{
      window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

function preCab()
{
       window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
      window.location='CustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

 function myProfile()
{
     window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
            
            error: function (XMLHttpRequest, textStatus, errorThrown) 
             {
              }
         }); 
        $.cookie("remember", false);
        //$.cookie("userName", 'null');
        //$.cookie("userPassword", 'null');
        window.location = "index.html";  
 }
function backtostart()
{
     window.location='customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function feedBack()
{
      window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
