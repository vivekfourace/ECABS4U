var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var btnArray = ['Yes','NO'];

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   console.log('device ready in failed booking');
}
window.setTimeout(function(){
    console.log('in ajax');
$.ajax({    
    url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetFailedJobs",
    datatype:"JSON",
    type:"POST",
    data:"{'relatedId':'"+relatedId+"','role':'"+roleId+"'}",
    contentType:"application/json; charset=utf-8",                    
    success:function (data) {
          if(data.d.length > 0)
            {
                navigator.notification.confirm(
                "You have some failed jobs. Do you want to re-initiate them?",
                 onCallback,
                "Failed job notification",
                btnArray
               );
            }
        }
  });
},1000);

function onCallback(buttonIndex)
{
    if(buttonIndex == 2)
    {
        return false;
    }
    else if(buttonIndex == 1)
    {
        if(roleId == 4) //Customer page
        {
            window.location='CustomerFailedBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
        else if(roleId == 3) //Driver page
        {
            window.location='DriverFailedBookings.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
        
    }
}