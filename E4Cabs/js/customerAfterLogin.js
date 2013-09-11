var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];



function CabNow()
{
  window.location="customerSearch.html";
    
}

function PreCab()
{
   window.location=""; 
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



//Logout Button
function logout()
    {
                
       window.location="login.html";
    }



//Cab Now Button
function cabNow()
{ 
  
   window.location ='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}