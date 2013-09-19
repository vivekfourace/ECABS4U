   var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backtoCustomerhome()
{
    
    
       
    window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
}


//Search Available
function availabledriver()
{
   // window.location='customerSearchList.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
    
    var fromloc=document.getElementById('txtFrom').value;
             alert(fromloc);
            var toloc=document.getElementById('txtTo').value;
    //alert(toloc);
            var distance=document.getElementById('txtDistance').value;
   // alert(distance);
            var pickdate=document.getElementById('pickDate').value;
    //alert(pickdate);
            var picktime=document.getElementById('pickTime').value;
    //alert(picktime);
            var passenger = document.getElementById("ddlpassenger");      
            var totalpassenger=passenger.options[passenger.selectedIndex].value;
   // alert(totalpassenger);
            var lcase = document.getElementById("ddllargecase"); 
            var largecase=lcase.options[lcase.selectedIndex].value;
    //alert(largecase);
            var scase = document.getElementById("ddlsmallcase"); 
            var smallcase=scase.options[scase.selectedIndex].value;
    //alert(smallcase);
          
            $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerRequest",
                    type:"POST",
                    dataType: "Json",
                    data:"{'userID':'" +relatedId+"','frompost':'"+ fromloc +"','topost':'"+ toloc +"','pickDate':'"+ pickdate +"','pickTime':'"+ picktime +"','passenger':'"+ totalpassenger +"','lcase':'"+ largecase +"','scase':'"+ smallcase +"','distance':'"+ distance +"'}",
                    contentType: "application/json; charset=utf-8",  
                    success: function (data) {
                        alert("inside");
                         window.location='customerSearchList.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
}


//My Profile Button
 function myProfile()
            {
                window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
 //alert(relatedId);
 
  window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}




//from Menu
function preCab()
{
   window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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

 

    