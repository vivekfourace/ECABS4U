   var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backtoCustomerhome()
{
    window.location = 'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
}



//Pageload Function
window.onload=showlocation();

//Bind From And To location

function showlocation()
{
     $('#txtFrom').show();
     $('#txtTo').show();
    var url="http://115.115.159.126/ECabs/ECabs4U.asmx/GetBusinessCustomerrDetails";
    $.ajax(url,{
         type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
    contentType: "application/json; charset=utf-8",                     
    success: ShowData,
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    alert(errorThrown);
        }
 });
}
 
    function ShowData(data)
{
   // $('#txtFrom').text(data.d[0]["Address1"]);
  //$('#txtTo').text(data.d[0]["Address2"]);
    $('#txtFrom').val(data.d[0]["Address1"]);
    $('#txtTo').val(data.d[0]["Address2"]);
   
}

//Search Func

function searchResult()
{
    alert('hit');
            var fromloc=document.getElementById('txtFrom').value;
            var toloc=document.getElementById('txtTo').value;
            var distance=document.getElementById('txtDistance').value;
            var pickdate=document.getElementById('pickDate').value;
            var picktime=document.getElementById('pickTime').value;
            var passenger = document.getElementById("ddlpassenger");      
            var totalpassenger=passenger.options[passenger.selectedIndex].value;
            var lcase = document.getElementById("ddllargecase"); 
            var largecase=lcase.options[lcase.selectedIndex].value;
            var scase = document.getElementById("ddlsmallcase"); 
            var smallcase=scase.options[scase.selectedIndex].value;
             
             var returnDate = document.getElementById("datepickers").value;
             var returnTime = document.getElementById("timepickers").value;
    
    //add Location
           var secondLoc= "none" //document.getElementById("txt2location").value;
           var thirdLoc= "none"  //document.getElementById("txt3location").value;
    
    //special
    var weelchairPassangers=document.getElementById("ddlWheelchair");
    var WchairPassengers=weelchairPassangers.options[weelchairPassangers.selectedIndex].value;
    
    var childS=document.getElementById("ddlChidseats");
    var childSeats=childS.options[childS.selectedIndex].value; 
    
    var childB = document.getElementById("ddlChidbooster");
    var childBooster=childB.options[childB.selectedIndex].value;  
    
    var otherSpeRequirement = document.getElementById('txtothereSpecialRequirement').value;
    
    var IsReturnTrue = $('#chkReturnYes').attr('checked')?true:false;   
    
    //Return
    
   var returnfromloc=document.getElementById('txtReturFrom').value;
    var returntoloc=document.getElementById('txtReturTo').value;

    $.ajax({
     url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerRequest",
       type:"POST",
       dataType: "Json",
       data:"{'userID':'" +relatedId+"','frompost':'"+ fromloc +"','topost':'"+ toloc +"','pickDate':'"+ pickdate +"','pickTime':'"+ picktime +"','passenger':'"+ totalpassenger +"','lcase':'"+ largecase +"','scase':'"+ smallcase +"','distance':'"+ distance +"','secondL':'"+secondLoc+"','thirdLoc':'"+thirdLoc+"','WchairPassengers':'"+WchairPassengers+"','childSeats':'"+childSeats+"','childBooster':'"+childBooster+"','otherSpeRequirement':'"+otherSpeRequirement+"','IsReturnTrue':'"+IsReturnTrue+"','returnfromloc':'"+returnfromloc+"','returntoloc':'"+returntoloc+"','returnDate':'"+returnDate+"','returnTime':'"+returnTime+"'}",
       contentType: "application/json; charset=utf-8",  
       success: function (data) {
           var reqID = data.d;
           //window.location='RolePop.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
           window.location='customerSearchList.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId+'&reqid='+reqID;
    
       },
       error: function (XMLHttpRequest, textStatus, errorThrown) {
           alert(errorThrown);
       }
    });
}

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

 

    