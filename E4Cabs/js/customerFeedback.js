 var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


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

//cab Now
function cabNow()
{
  window.location= 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}


//Pre Cab
function preCab()
{
   window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
