var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var btnArray = ['Yes','No'];
var requestID;
var btnArray2 = ['Search','Alter','Cancel'];

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
        var count=data.d.length;
          if(count > 0)
            {
                for(var i=0; i<count; i++)
                {
                    requestID = data.d[i]["JobNumber"];
                 
                }
               
              
                if(roleId == 4)//customer
                {
                     navigator.notification.confirm(
                   "Cab search has failed for an unknown reason. Would you like to",
                    onCallbackCustomer,
                   "Failed job notification",
                   btnArray2
                  );  
                }
                else if(roleId == 3)//driver
                {
                   navigator.notification.confirm(
                   "You have some failed jobs. Do you want to re-initiate them?",
                    onCallback,
                   "Failed job notification",
                   btnArray
                  );
                }
            }
        }
  });
},1000);

//customer
function onCallbackCustomer(buttonIndex)
{
   if(buttonIndex == 1)
    {
        
        window.location='CustomerFailedBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    } 
    else if(buttonIndex == 2)
    {
        
        window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId+ '&rid=' + requestID;
        
    }
    else if(buttonIndex == 3)
    {
       
     return false;   
    }
}

//Driver
function onCallback(buttonIndex)
{
    if(buttonIndex == 2)
    {
        return false;
    }
    else if(buttonIndex == 1)
    {
       // if(roleId == 4) //Customer page
       // {
       //     window.location='CustomerFailedBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
       // }
       if(roleId == 3) //Driver page
        {
            window.location='DriverFailedBookings.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
        
    }
}