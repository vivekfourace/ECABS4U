//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//back to home
function backtoCustomerhome()
{
     window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//redirect to driver next to customer page
function availabledriver()
{
    window.location='driverNextToCustomers.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//My Profile Button
 function myProfile()
{
   window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Logout Button
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
        //$.cookie("userName", 'null');
        //$.cookie("userPassword", 'null');        
        window.location="login.html";
}
//Cab Now Button
function cabNow()
{ 
  
       window.location ='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Customer Feedback 
function feedBack()
{
        window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Booked History
function bookedHistory()
{
       window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//from Menu
function preCab()
{
       window.location='customerPreBook.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}