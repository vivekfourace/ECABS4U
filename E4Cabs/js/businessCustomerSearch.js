   var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backtoCustomerhome()
{
    
    
       
    window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
}


//Search Available
//function availabledriver()
//{
  //  window.location='driverNextToCustomers.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
//}


//My Profile Button
 function myProfile()
            {
                window.location =  'businessCustomerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            }



//Logout Button
function logout()
    {
        $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";        
    }



//Cab Now Button
function cabNow()
{ 
  
   window.location ='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Customer Feedback 
function feedBack()
{
    window.location='businessCustomerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}




//Booked History
function bookedHistory()
{
 //alert(relatedId);
 
  window.location='businessCustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}




//Home
function Home()
{
   window.location='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//window.onload = backFun();

/*$(document).ready(function() {
                  $('#timepicker').timepicker({
                    showPeriod: true,
                    showLeadingZero: true
                });
            });
            $(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: 0, 
	  maxDate: "+5D" 
    });
                 $('#timepickers').timepicker({
                    showPeriod: true,
                    showLeadingZero: true
                });
            });
            $(function() {
    $( "#datepickers" ).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: 0, 
	  maxDate: "+5D" 
    });
});*/

 

    