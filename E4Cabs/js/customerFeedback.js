var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//Back Button In Header Redirect To Customer Search Page.
function backtostart()
    {
       window.location=  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    }

//Poast Comment Button.
function PostComment()
    {
        $('#divPostComment').fadeIn("slow");
    }

//Cancel Comment Button.
function CancelComment()
    {
        $('#txtPostComment').val("");
        $('#divPostComment').fadeOut("slow");  
    }


//Footer Section 
//Cabsearch Button.
function cabNow()
   {
     window.location= 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
       
   }

//Home Button.
function preCab()
    {
       window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    }

//Booked History Button
function bookedHistory()
    {
    
      window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
       
    }


//Profile Button
 function myProfile()
    {
        window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    }

//Logout Button
function logout()
    {   
        
       $.cookie("remember", false);
       $.cookie("userName", 'null');
       $.cookie("userPassword", 'null');
       window.location = "index.html";  
    }

//Customer Feedback Button
function feedBack()
    {
        window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    }
