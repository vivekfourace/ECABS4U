//query string
var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
$(document).ready(function ()
 {
        if (navigator.geolocation)
        {
                navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var geocoder = new google.maps.Geocoder();
                var latLng = pos;
                geocoder.geocode({ 'latLng': latLng }, function (results, status) 
                    {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert(results[1].formatted_address);
                            $('#txtCurrentFrom').val(results[0].formatted_address);
                        }
                    }
                    else {
                        alert("No location found.")
                    }
                });
            });
        }
        $('.expand').live({
            focus: function () {
                $(this).animate({ height: "70" }, 500);
            },
            blur: function () {
                $(this).animate({ height: "50" }, 500);
            },
        });

        $('#chkNo').click(function ()
     {
           document.getElementById("chkyes").checked = false;
         document.getElementById("chkReturnYes2").checked = false;
           document.getElementById("chkReturnYes").checked = false;
           $('#returnJ').fadeIn("fast");
           $('#termCond').fadeIn("fast");
         $('#returnJ2').fadeOut("slow");

       });
     
     
      //confirm click fuction
      $('#chkReturnYes').click(function ()
     {
         
          navigator.notification.confirm(
          "Do you want to confirm this job?",
           onconfirm2,
           "Confirm",
           "Confirm,Cancel" 
    );
   });      
         
 function onconfirm2(buttonIndex)
{
    if(buttonIndex === 1)
    {
        return false;
    }
    else if(buttonIndex === 2)
    {
       document.getElementById("chkyes").checked = false;
        document.getElementById("chkReturnYes").checked = false;
        document.getElementById("chkNo").checked = false;
         $('#returnJ').fadeOut("slow");
           $('#termCond').fadeOut("slow");
    }
}
         
         
     
       $('#chkyes').click(function () {
           document.getElementById("chkNo").checked = false;
            document.getElementById("chkReturnYes").checked = false;
           $('#returnJ').fadeOut("slow");
           $('#termCond').fadeOut("slow");
           $('#returnJ2').fadeIn("fast");

       });

       $('#popupBoxClose').click(function () {
           $('#popup_box').fadeOut("slow");
           $('#transparent_div').fadeOut("slow");
           
       });
       
    
    });
//finding duration between two distance
function Duration()
{
        var fromloc;
        var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
        if (isChecked == false) {
            fromloc = document.getElementById('txtFrom').value;
        }
        else if (isChecked == true) {
            fromloc = document.getElementById('txtCurrentFrom').value;
        }
        var toloc = document.getElementById('txtTo').value;
        CalculateDuration(fromloc, toloc);
        
        window.setTimeout(availabledriverLater, 500);
}

function CalculateDuration(fromLocation, toLocation)
{
        var rendererOptions = {
            draggable: true
        };
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        var directionsService = new google.maps.DirectionsService();

        
            google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {
               var time =   computeTotalDistance(directionsDisplay.directions);
                $('#TravelTime').val(time);
            });
    
            calcRoute();
      
        function calcRoute() {
            var start = fromLocation;
            var end = toLocation;
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                   directionsDisplay.setDirections(response);
                }
            });
        }

        function computeTotalDistance(result) {
            var time = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                time += myroute.legs[i].duration.value;
            }
            var total = parseInt(time / 60); //time in min
            return total;
        }
}
//getting location basis of postcode
function loc() {
    var from = $('#txtFrom').val();
    var to = $('#txtTo').val();
    var loc2 = $('#txt2location').val();
    window.location = 'Location.html?id=' + from + '&rid=' + to + '&rrid=' + loc2;
}
function backtoCustomerhome() 
{
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//current Location
function currentlocation() {
    //window.location =  'Location.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

//Search Available
function availabledriverLater() {
    var fromloc;
    var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
    if (isChecked == false) {
        fromloc = document.getElementById('txtFrom').value;
    }
    else if (isChecked == true) {
        fromloc = document.getElementById('txtCurrentFrom').value;
    }
    var toloc = document.getElementById('txtTo').value;
    //CalculateDuration(fromloc, toloc);  
    var distance = document.getElementById('txtDistance').value;
    
    var pickdateP = document.getElementById('pickDate').value;    
    
    var picktime = document.getElementById('pickTime').value;
    
    var passenger = document.getElementById("ddlpassenger");
    var totalpassenger = passenger.options[passenger.selectedIndex].value;
    var lcase = document.getElementById("ddllargecase");
    var largecase = lcase.options[lcase.selectedIndex].value;
    var scase = document.getElementById("ddlsmallcase");
    var smallcase = scase.options[scase.selectedIndex].value;

    var returnDate = document.getElementById("datepickers").value;
    var returnTime = document.getElementById("timepickers").value;
    
    
    
   

    var isCreditCard = null;
    if($('#radCrditcard:checked').val() == 1)
    {
        isCreditCard = true;
    }
    else if($('#radcash:checked').val() == 2)
    {
        isCreditCard = false;
    }
    
    //add Location    
    var secondLoc = $('#txt2location').val();
    var thirdLoc =  $('#txt3location').val();
    var fourthLoc = $('#txt4location').val();
    var fifthLoc =  $('#txt5location').val();
    var sixthLoc =  $('#txt6location').val();
    var seventhLoc= $('#txt7location').val();
    var eightLoc =  $('#txt8location').val();

    //special
    var weelchairPassangers = document.getElementById("ddlWheelchair");
    var WchairPassengers = weelchairPassangers.options[weelchairPassangers.selectedIndex].value;

    var childS = document.getElementById("ddlChidseats");
    var childSeats = childS.options[childS.selectedIndex].value;

    var childB = document.getElementById("ddlChidbooster");
    var childBooster = childB.options[childB.selectedIndex].value;

    var otherSpeRequirement = document.getElementById('txtothereSpecialRequirement').value;
    var returnfromloc = document.getElementById('txtReturFrom').value;
    var returntoloc = document.getElementById('txtReturTo').value;
    
    //check Job type(cabnow or cablater)    
    var isCabNow = $('#RBcabNOW').attr('checked') ? true : false;
    
    var travelTime = $('#TravelTime').val();
    if (!fromloc) {
        $('#lblMessage').text("Please enter From location.");
        return false;
    }
    if (!toloc) {
        $('#lblMessage').text("Please enter To location.");
        return false;
    }
   // var IsReturnTrue = $('#chkReturnYes').attr('checked') ? true : false;
   // var isCheckedNo = $('#chkNo').attr('checked') ? true : false;
   // var laterpostcode = $('#locfrom_postcode').val();
   // var latertopostcode = $('#locto_postcode').val();
    //alert(latertopostcode);
    
     var IsReturnTrue = $('#chkReturnYes').attr('checked') ? true : false;
    var isCheckedNo = $('#chkNo').attr('checked') ? true : false;
    var isRetJourAllOperator = $('#chkyes').attr('checked') ? true : false; 
    var IsReturnTrue2 = $('#chkReturnYes2').attr('checked') ? true : false;
    
    
    
    
    if(isCheckedNo == true)
    {
     //confirm checkbox validation
        
        if(IsReturnTrue == false)
        {
            alert("Please check confirm box.");
            return false; 
        }  
       
    }
    if(isRetJourAllOperator == true)
    {
     //confirm checkbox validation
        
       if(IsReturnTrue2 == false)
        {
           alert("Please check confirm box.");
            return false; 
       }  
       
   }
    
    //compare present datetime  
    
     var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        if (minutes < 10)
            minutes = "0" + minutes
        if (hours >= 24) {
            hours = hours - 24;
        }
        if (hours == 0) {
            hours = 0;
        }
        $('#pickcurrenttime').val(hours + ":" + minutes);
    
    
    var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
   
        $('#pickcurrentdate').val(day + "/" + month + "/" + year);
    
        var picktimecurrentTIME = document.getElementById('pickcurrenttime').value;
        var picktimecurrentDate = document.getElementById('pickcurrentdate').value;
    
      
    
      if(pickdateP < picktimecurrentDate)
      {
        alert("Please Enter correct Pick Up Date.");
          return false;
      }
    
    if(picktime < picktimecurrentTIME)
      {
        alert("Please Enter correct Pick Up time,Pick Up time should be greater than Current time. ");
          return false;
      }
    
     //compare datetime 
    
    if(isCheckedNo == true || isRetJourAllOperator == true)
    {
       
        if(pickdateP>returnDate)
    {
        alert("Please Enter correct Return Pick Up Date.");
        return false; 
    }
        else if(pickdateP==returnDate)
        {
    
         if(picktime>returnTime)
          {
        alert("Please Enter correct Return Pick Up time,Pick Up time should be greater than Current time.");
        return false;  
          }
       }
   
     }
    else
    {
    
    }
    
    var laterpostcode = $('#locfrom_postcode').val();
    var latertopostcode = $('#locto_postcode').val();
    console.log(laterpostcode);
     if (isCheckedNo == true)
    {
        
        if (IsReturnTrue == true) 
        {
           // alert(IsReturnTrue);
           // alert('samedriver Cabnow');
            var pickD = pickdateP;
            var pickT = picktime;
            var fromL = fromloc;
            var toL = toloc;
            
            var retunD = returnDate;
            var retunT = returnTime;
            var returnFL = returnfromloc;
            var returnTL =returntoloc;
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerSearchRequest",
                cache: false,
                beforeSend: function(){
                     $('#imgLoader').show();
                 },
                 complete: function(){
                     $('#imgLoader').hide();
                 },
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','frompost':'" + fromL + "','topost':'" + toL + "','pickDate':'" + pickD + "','pickTime':'" + pickT + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnFL + "','returntoloc':'" + returnTL + "','returnDate':'" + retunD + "','returnTime':'" + retunT + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"', 'samedriver':' "+isCheckedNo+"'}",
                contentType: "application/json; charset=utf-8",
                success:function (data) {
                    if(data.d[0] != "Error")
                    {
                        alert('Booking in progress. Please check later.');
                        window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                    else
                    {
                        console.log(data.d[1]);
                        alert(data.d[1]);
                    }                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        }
        else
        {
            moveSearch();
        }
    }
    else
    {
        moveSearch();
    }
        function moveSearch()
        {
           IsReturnTrue = isRetJourAllOperator;
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerSearchRequest",
                cache: false,
                beforeSend: function(){
                     $('#imgLoader').show();
                 },
                 complete: function(){
                     $('#imgLoader').hide();
                 },
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','frompost':'" + fromloc + "','topost':'" + toloc + "','pickDate':'" + pickdateP + "','pickTime':'" + picktime + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnfromloc + "','returntoloc':'" + returntoloc + "','returnDate':'" + returnDate + "','returnTime':'" + returnTime + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"', 'samedriver':'"+isCheckedNo+"'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d[0] != "Error")
                    {
                        alert('Booking in progress. Please check later.');
                        window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                    else
                    {
                        console.log(data.d[1]);
                        alert(data.d[1]);
                    }
                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        }
    }

    function homeSearch() {
        window.location = 'customerProfile.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
    }
