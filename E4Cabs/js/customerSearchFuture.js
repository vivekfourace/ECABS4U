//query string
var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


//reinitiate Job OR Re-Search

var requestID = QString.split("=")[4];
var cancelledJObFuture = QString.split("=")[5];

if(requestID !== undefined && cancelledJObFuture !== undefined)
{

        requestID = QString.split("=")[4].split("&")[0];

        $.ajax({
        url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/JobDetail",
        type: "POST",
        dataType: "Json",
        data: "{'jobId':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: cancelledJobFillAllData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
       }
     });
    
    
}


$('#imgLoader').hide();

function cancelledJobFillAllData(data)
{   
            
            $('#txtFrom').val(data.d["FromLocation"]);            
            $('#txtTo').val(data.d["ToLocation"]);           
            $('#txt2location').val(data.d["Location2"]);         
            $('#txt3location').val(data.d["Location3"]);          
            $('#txt4location').val(data.d["Location4"]);         
            $('#txt5location').val(data.d["Location5"]);         
            $('#txt6location').val(data.d["Location6"]);          
            $('#txt7location').val(data.d["Location7"]);      
            $('#txt8location').val(data.d["Location8"]);        
            $('#txtDistance').val(data.d["TravelDistance"]);
            
            //     var PickupDate=data.d["StartDate"];
            //      $('#pickDate').val(PickupDate); 
            //
            //   var PickupTime=data.d["StartTime"];
            //      $('#pickTime').val(PickupTime); 
            //   
            var selectedPassenger=data.d["NumberOfPassenger"];
           // alert(selectedPassenger);
             $('#ddlpassenger option[value="' + selectedPassenger + '"]').prop('selected', true);
            $('#ddlpassenger').selectmenu('refresh');
          // $('#ddlpassenger').val(data.d[i]["NumberOfPassenger"]);
            
             var selectedLargeLuggage=data.d["LargeLuggage"];
           // alert(selectedLargeLuggage);
             $('#ddllargecase option[value="' + selectedLargeLuggage + '"]').prop('selected', true);
            $('#ddllargecase').selectmenu('refresh');
            
             var selectedSmallLuggage=data.d["SmallLuggage"];
           // alert(selectedSmallLuggage);
             $('#ddlsmallcase option[value="' + selectedSmallLuggage + '"]').prop('selected', true);
            $('#ddlsmallcase').selectmenu('refresh');
            
             var selectedWheelChairPassanger=data.d["WheelChairPassenger"];
            //alert(selectedWheelChairPassanger);
             $('#ddlWheelchair option[value="' + selectedWheelChairPassanger + '"]').prop('selected', true);
            $('#ddlWheelchair').selectmenu('refresh');
            
             var selectedChildCarSeat=data.d["ChildCarSesats"];
           // alert(selectedChildCarSeat);
             $('#ddlChidseats option[value="' + selectedChildCarSeat + '"]').prop('selected', true);
            $('#ddlChidseats').selectmenu('refresh');
            
             var selectedChildBooster=data.d["ChildBoosterSeats"];
           // alert(selectedChildBooster);
             $('#ddlChidbooster option[value="' + selectedChildBooster + '"]').prop('selected', true);
            $('#ddlChidbooster').selectmenu('refresh');
            
            if(selectedWheelChairPassanger != 0 || selectedChildCarSeat != 0 || selectedChildBooster != 0)
            {
                showReq();
            }
  
    
    //For Return Journey
    
          var ReturnFrom=data.d["ReturnFrom"];
            // $('#txtReturFrom').val(ReturnFrom);
        
    
             var ReturnTo=data.d["ReturnTo"];
            // $('#txtReturTo').val(ReturnTo); 
    
    
            // var ReturnDate=data.d["ReturnDate"];
            // $('#datepickers').val(ReturnDate); 
            // var ReturnTime=data.d["ReturnTime"];
            // $('#timepickers').val(ReturnTime); 
            
            if(ReturnFrom && ReturnTo)
                {
                   //$('#txtReturFrom').show();
                   // $('#txtReturTo').show();
                   // $('#cancelreturn').show();
                   // $('#bookreturn').hide();
                   // document.getElementById("chkNo").checked = false;
                   // document.getElementById("chkyes").checked = false;
                   // document.getElementById("trfrom").style.display = 'table-row';
                   // document.getElementById("trto").style.display = 'table-row';
                   //  document.getElementById("trDate").style.display = 'table-row';
                   //  document.getElementById("trTime").style.display = 'table-row';
                   //  document.getElementById("trRequrementReturn").style.display = 'table-row';
                   //  $('#returnJ').fadeIn("fast");
                   //  $('#termCond').show();
                   //  document.getElementById("chkNo").checked = true;
                
                    bookReturn();
                    $('#returnJ').fadeIn("fast");
                    $('#termCond').show();
                    document.getElementById("chkNo").checked = true;
                    document.getElementById("chkyes").checked = false;
                    $('#returnJ2').hide();
                }
    
}














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
                        navigator.notification.alert(
				        "No location found.",
  				      noLocationNotFoundLater,
 					   'ECABS4U',
 						"OK"
						);
                        function noLocationNotFoundLater()
                        { }
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
function availabledriverLater() 
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
    if (!fromloc)    
    {
        $('#lblMessage').text("Please enter From location.");
        navigator.notification.alert(
       'Please enter From location.',
        noFromLoc,
        'ECABS4U',
        "OK"
        );
        function noFromLoc()
        { }
        return false;
    }
   else if (!toloc) 
    {
        $('#lblMessage').text("Please enter Final destination.");
        navigator.notification.alert(
       'Please enter Final destination.',
        noToLoc,
        'ECABS4U',
        "OK"
        );
        function noToLoc()
        { }
        return false;
    }
    else
    {
        $('#lblMessage').text("");        
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
   // alert(isRetJourAllOperator);
    
    
    
    
    if(isCheckedNo == true)
    {
     //confirm checkbox validation
        
        if(IsReturnTrue == false)
        {
            navigator.notification.alert(
            'Please check confirm box.',
            noCheckConfirm,
            'ECABS4U',
            "OK"
            );
            function noCheckConfirm()
            { }
            return false; 
        }  
       
    }
   if(isRetJourAllOperator == true)
   {
        //confirm checkbox validation        
        if(IsReturnTrue2 == false)
        {
            navigator.notification.alert(
            'Please check confirm box.',
            noCheckConfirmOnReturn,
            'ECABS4U',
            "OK"
            );
            function noCheckConfirmOnReturn()
            { }
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
   // var picktimecurrentDate = document.getElementById('pickcurrentdate').value;



   var begD = $.datepicker.parseDate('dd/mm/yy', $('#pickcurrentdate').val());
   var endD = $.datepicker.parseDate('dd/mm/yy', $('#pickDate').val());
   var retun = $.datepicker.parseDate('dd/mm/yy', $('#datepickers').val());
    if (begD > endD) 
    {
        navigator.notification.alert(
        'Please enter the required pick-up date and time. This should be later than the current time.',
        inCorrectPickDate,
        'ECABS4U',
        "OK"
        );
        function inCorrectPickDate()
        { }
        return false;
    }   
    else
    {
        var a = picktimecurrentTIME.split(":");
        var b = picktime.split(":");
        begD.setHours(a[0]);
        endD.setHours(b[0]);
        begD.setMinutes(a[1]);
        endD.setMinutes(b[1]);
        if(begD > endD)
        {
            navigator.notification.alert(
            'Please enter the required pick-up date and time. This should be later than the current time.',
            inCorrectPickDate1,
            'ECABS4U',
            "OK"
            );
            function inCorrectPickDate1()
            { }
            return false; 
        } 
    }
   
    if(isCheckedNo == true || isRetJourAllOperator == true)
    { 
        var pickdate2 = $.datepicker.parseDate('dd/mm/yy', $('#pickDate').val());
        var retundate2 = $.datepicker.parseDate('dd/mm/yy', $('#datepickers').val());
        
        if(pickdate2>retundate2)
        {
            navigator.notification.alert(
            'Please select a date/time after the pickup date/time.',
            inCorrectReturnDate,
            'ECABS4U',
            "OK"
            );
            function inCorrectReturnDate()
            { }
            return false; 
        }
        else if(pickdateP == returnDate)
        {   
         if(picktime>=returnTime)
          {
            navigator.notification.alert(
            'Please Enter correct Return time. It should be greater than Pick Up time.',
            inCorrectReturnDate1,
            'ECABS4U',
            "OK"
            );
            function inCorrectReturnDate1()
            { }
            return false;  
          }
        }
   
    }
    
    var laterpostcode = $('#locfrom_postcode').val();
    var latertopostcode = $('#locto_postcode').val();
    console.log(laterpostcode);
     if (isCheckedNo == true)
    {
        
        if (IsReturnTrue == true) 
        {
            var pickD = pickdateP;
            var pickT = picktime;
            var fromL = fromloc;
            var toL = toloc;
            
            var retunD = returnDate;
            var retunT = returnTime;
            var returnFL = returnfromloc;
            var returnTL =returntoloc;
            $.ajax({
                url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CustomerSearchRequest",
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
                    if(data.d[0] !== "Error")
                    {
                        navigator.notification.alert(
                        "Awaiting bids. Please check later.",
                        searchFuture, 
                        'ECABS4U',
                        "OK"
                        );
                        function searchFuture()
                        {
                            window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                        }
                       
                        
                    }
                    else
                    {                        
                        navigator.notification.alert(
				        data.d[1],
  				      searchError, 
 					   'ECABS4U',
 						"OK"
						);
                        function searchError()
                        { }
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
       console.log( "{'userID':'" + relatedId + "','frompost':'" + fromloc + "','topost':'" + toloc + "','pickDate':'" + pickdateP + "','pickTime':'" + picktime + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnfromloc + "','returntoloc':'" + returntoloc + "','returnDate':'" + returnDate + "','returnTime':'" + returnTime + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"', 'samedriver':'"+isCheckedNo+"'}");
        $.ajax({
            url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/CustomerSearchRequest",
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
                if(data.d[0] !== "Error")
                {
                     navigator.notification.alert(
                    "Awaiting bids. Please check later.",
				 	  searchFuture, 
					   'ECABS4U',
						"OK"
					);
                    function searchFuture()
                    {
                        window.location =  'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                    }
                }
                else
                {
                    navigator.notification.alert(
			        data.d[1],
				      searchError,
					   'ECABS4U',
						"OK"
					);
                    function searchError()
                    { }
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
