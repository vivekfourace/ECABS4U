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
                            //html += '<thead class="thead-grid">';
                            //html +='<tr>';
                            //html +='<th colspan="3" class="th4 font">Driver FeedBack To You</th>';
                            //html +='</tr>';
                            //html += '</thead>';
                            html +='<tbody class="body-style" style="font-size:14px;">'; 
                            for(var i=0; i<count; i++)
                            {
                                var comment = data.d[i]["Comment"];
                                var rating = data.d[i]["Rating"];
                                if(comment != null)
                                {
                                    html += "<tr>";
                                    html += "<td  width='30%' style='padding-top:10px' align='center'>" + '<img src="img/TaxiDriver_Male_Dark.png"  width="30px" height="30px" style="color:grey;"/>' + "</td>";
                                    html += "<td width='70%'  style='font-weight:bold;text-decoration:underline' align='left'>" + data.d[i]["Name"] + "</td>";
                                    html +="</tr>";
                                    html += "<tr>";
                                    html +="<td>"+"</td>";
                                    html += "<td rowspan='2' width='70%' align='left' style='padding-left:8px;top:0px'>"+ data.d[i]["Comment"] + "</td>"    
                                    html +="</tr>";
                                    html += "<tr>";
                                    if(rating == 1)
                                    {
                                        html += "<td width='30%' align='center'><img src='img/1star.PNG' style='width:18%'/></td>";
                                    }
                                    else if(rating == 2)
                                    {
                                        html += "<td width='30%' align='center'><img src='img/2star.PNG' style='width:32%'/></td>";
                                    }
                                    else if(rating == 3)
                                    {
                                        html += "<td width='30%' align='center'><img src='img/3star.PNG' style='width:45%'/></td>";
                                    }
                                    else if(rating == 4)
                                    {
                                        html += "<td width='30%' align='center'><img src='img/4star.PNG' style='width:58%'/></td>";
                                    }
                                    else if(rating == 5)
                                    {
                                        html += "<td width='30%' align='center'><img src='img/5star.PNG' style='width:70%'/></td>";
                                    }
                                    html += "</tr>";
                                    html += "<tr>";
                                    html += "<td colspan='2'>"+'<hr>'+ "</td>";
                                    html += "</tr>";
                                }
                                else
                                {
                                    
                                }
                              }
                            html +='</tbody>';
                            html +='</table>';
                            $('#Comments').append(html);
                        }
                        else
                        {
                            alert("No history found");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                    }
                });
}

function backtoCustomerhome()
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
