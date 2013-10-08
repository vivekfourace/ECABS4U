 var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


function backtoCustomerhome()
{
    window.location =  'businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}




//cab Now
function cabNow()
{
  window.location='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}


//Home
function Home()
{
   window.location='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//Booked History
function bookedHistory()
{
 //alert(relatedId);
 
  window.location='businessCustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}




//My Profile Button
 function myProfile()
            {
                window.location =  'businessCustomerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            }
  






//Logout
function logout()
    {                
        $.cookie("remember", false);
        $.cookie("userName", 'null');
        window.location = "index.html";  
    }




//Customer Feedback 
function feedBack()
{
    window.location='businessCustomerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
