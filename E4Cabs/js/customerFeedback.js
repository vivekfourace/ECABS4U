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
                                console.log(rating);
                                var driverImgUrl = data.d[i]["ImageUrl"];
                                if(comment != null)
                                {
                                    html += "<tr>";
                                    html += "<td rowspan='2' style='width:25%;border-bottom:1px solid black;'>"+'<img src="'+driverImgUrl+'" style="width:70px;height:65px;border-radius:4px"/>'+ "</td>";
                                    html += "<td style='width:75%;word-break:break-all;vertical-align:top;text-align:left'>"
                                         +  '<b><u>' + data.d[i]["Name"] + '</u></b>'+'<br/>'
                                         +  '<span margin-top:"12px">'+ data.d[i]["Comment"] +'</span>'+'<br/>'; 
                                    html += '</td>'; 
                                    html += '<tr>';
                                    html += '<td style="border-bottom:1px solid black;text-overflow:ellipsis">';
                                    if(rating == 1)
                                    {
                                        html += "<img src='img/1star.PNG' style='width:6%'/>";
                                    }
                                    else if(rating == 2)
                                    {
                                        html += "<img src='img/2star.PNG' style='width:10%'/>";
                                    }
                                    else if(rating == 3)
                                    {
                                        html += "<img src='img/3star.PNG' style='width:15%'/>";
                                    }
                                    else if(rating == 4)
                                    {
                                        html += "<img src='img/4star.PNG' style='width:19%'/>";
                                    }
                                    else if(rating == 5)
                                    {
                                        html += "<img src='img/5star.PNG' style='width:25%'/>";
                                    }                                                                        
                                    html +="</tr>";                                                                       
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
                            $('#bookingmsg').show();
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
function searchpage()
{
    window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function myProfile()
 {
     window.location = 'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }
function myBooking()
{ 
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
  window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function logout(){
    navigator.notification.confirm(
    "Do you want to logout?",
    onLogoutCallback,
    "Confirm",
    "No, Yes"
    );
}

function onLogoutCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false;
    }
    else if(buttonIndex == 2)
    {
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
}
