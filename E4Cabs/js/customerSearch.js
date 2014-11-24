var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4];

var cancelledJOb = QString.split("=")[5];

//alert(cancelledJOb);
if(requestID !== undefined)
{
    
    if(cancelledJOb !== undefined)
    {
        
        requestID = QString.split("=")[4].split("&")[0];

        $.ajax({
        url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/JobDetail",
        type: "POST",
        dataType: "Json",
        data: "{'jobId':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: cancelldJobFillAllData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
       }
     });
    
    }
    else
    {
      requestID = QString.split("=")[4].split("&")[0];
      
      $.ajax({
        url: "http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/FillJobSearchDetail",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: FillAllData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
       }
     });
    }
    
  
}

$('#imgLoader').hide();



function FillAllData(data)
{
    
    var count = data.d.length;
    if(count > 0)
    {
        for(var i = 0; i < count; i++)
        {
            $('#txtFrom').val(data.d[i]["FromPostcode"]);            
            $('#txtTo').val(data.d[i]["ToPostcode"]);           
            $('#txt2location').val(data.d[i]["Location2"]);         
            $('#txt3location').val(data.d[i]["Location3"]);          
            $('#txt4location').val(data.d[i]["Location4"]);         
            $('#txt5location').val(data.d[i]["Location5"]);         
            $('#txt6location').val(data.d[i]["Location6"]);          
            $('#txt7location').val(data.d[i]["Location7"]);      
            $('#txt8location').val(data.d[i]["Location8"]);        
            $('#txtDistance').val(data.d[i]["DistanceInMile"]);
            
            var otherspecialrequirement=data.d[i]["OtherSpecReq"];
            $('#txtothereSpecialRequirement').val(otherspecialrequirement); 
          
            var selectedPassenger=data.d[i]["NumberOfPassenger"];
           // alert(selectedPassenger);
             $('#ddlpassenger option[value="' + selectedPassenger + '"]').prop('selected', true);
            $('#ddlpassenger').selectmenu('refresh');
          // $('#ddlpassenger').val(data.d[i]["NumberOfPassenger"]);
            
             var selectedLargeLuggage=data.d[i]["LargeLuggage"];
           // alert(selectedLargeLuggage);
             $('#ddllargecase option[value="' + selectedLargeLuggage + '"]').prop('selected', true);
            $('#ddllargecase').selectmenu('refresh');
            
             var selectedSmallLuggage=data.d[i]["SmallLuggage"];
           // alert(selectedSmallLuggage);
             $('#ddlsmallcase option[value="' + selectedSmallLuggage + '"]').prop('selected', true);
            $('#ddlsmallcase').selectmenu('refresh');
            
             var selectedWheelChairPassanger=data.d[i]["WheelChairPassenger"];
            //alert(selectedWheelChairPassanger);
             $('#ddlWheelchair option[value="' + selectedWheelChairPassanger + '"]').prop('selected', true);
            $('#ddlWheelchair').selectmenu('refresh');
            
             var selectedChildCarSeat=data.d[i]["ChildCarSeat"];
           // alert(selectedChildCarSeat);
             $('#ddlChidseats option[value="' + selectedChildCarSeat + '"]').prop('selected', true);
            $('#ddlChidseats').selectmenu('refresh');
            
             var selectedChildBooster=data.d[i]["ChildBooster"];
           // alert(selectedChildBooster);
             $('#ddlChidbooster option[value="' + selectedChildBooster + '"]').prop('selected', true);
            $('#ddlChidbooster').selectmenu('refresh');
            
            if(selectedWheelChairPassanger != 0 || selectedChildCarSeat != 0 || selectedChildBooster != 0 || otherspecialrequirement)
            {
                showReq();
            }
            
           
        }
    }
    
}

//For cancelled job binding
function cancelldJobFillAllData(data)
{   //console.log(data.d);
    //console.log(data.d.length);
    // alert("in canceled");
    //var count = data.d.length;
    // alert(data.d.length);
    // if(count > 0)
    //{
    //for(var i = 0; i < count; i++)
    // {
    //alert(data.d["FromLocation"]);
            
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
            
           //  var otherspecialrequirement=data.d[i].OtherSpecReq;
           //$('#txtothereSpecialRequirement').val(otherspecialrequirement); 
          
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
            
            
           
       // }
   // }  
    
    
    
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
                           
                            $('#txtCurrentFrom').val(results[0].formatted_address);
                        }
                    }
                    else {
                        navigator.notification.alert(
				        "No location found.",
  				      noLocationNotFound, 
 					   'ECABS4U',
 						"OK"
						);
                        function noLocationNotFound()
                        { }
                    }
                });
            });
        }
     
     $('#chkNo').click(function ()
     {
           document.getElementById("chkyes").checked = false;
         
         //Confirm
           document.getElementById("chkReturnYes").checked = false;
         document.getElementById("chkReturnYes2").checked = false;
           $('#returnJ').fadeIn("fast");
           $('#termCond').fadeIn("fast");
          $('#returnJ2').fadeOut("slow");

     });
     
     //confirm click fuction
      $('#chkReturnYes').click(function ()
     {
        navigator.notification.confirm(
        "Do you want to confirm this job?",
        onAbortCallback1,
        "Confirm",
        "Confirm,Cancel"   
        );
        function onAbortCallback1(buttonIndex)
        {
            if(buttonIndex === 1)
            {
                return false;
            }
            else if(buttonIndex === 2)
            {
               document.getElementById("chkyes").checked = false;
                document.getElementById("chkReturnYes").checked = false;
                 //document.getElementById("chkReturnYes2").checked = false;
                document.getElementById("chkNo").checked = false;
                 $('#returnJ').fadeOut("slow");
                   $('#termCond').fadeOut("slow");
            }
        }
     });   

     
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

function Duration()
{
    //alert('duration');
        console.log('duration called');
        var fromloc;
        var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
        if (isChecked === false) {
            fromloc = document.getElementById('txtFrom').value;
        }
        else if (isChecked === true) {
            fromloc = document.getElementById('txtCurrentFrom').value;
        }
        var toloc = document.getElementById('txtTo').value;
        console.log(fromloc+toloc);
        CalculateDuration(fromloc, toloc);
    
        //availabledriver();
    
        window.setTimeout(availabledriver, 500);
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
                if (status === google.maps.DirectionsStatus.OK) {
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
            var total = parseInt(time / 60); //time in minutes
            return total;          
        }
}

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


function availabledriver() {
    var fromloc;
    var toloc = document.getElementById('txtTo').value;
    var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
    if (isChecked === false) {
        fromloc = document.getElementById('txtFrom').value;      
    }
    else if (isChecked === true) {
        fromloc = document.getElementById('txtCurrentFrom').value;
    }
         
    var isCreditCard = null;
    if($('#radCrditcard:checked').val() == 1)
    {
        isCreditCard = true;
    }
    else if($('#radcash:checked').val() == 2)
    {
        isCreditCard = false;
    }
    
    var distance = document.getElementById('txtDistance').value; 
    var pickdate = document.getElementById('pickUpDate').value;
    var picktime = document.getElementById('pickUpTime').value;
    
    var passenger = document.getElementById("ddlpassenger");
    var totalpassenger = passenger.options[passenger.selectedIndex].value;
    var lcase = document.getElementById("ddllargecase");
    var largecase = lcase.options[lcase.selectedIndex].value;
    var scase = document.getElementById("ddlsmallcase");
    var smallcase = scase.options[scase.selectedIndex].value;

    var returnDate = document.getElementById("datepickers").value;
    var returnTime = document.getElementById("timepickers").value;
    
   
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

    var otherSpeRequirement = $("#txtothereSpecialRequirement").val();
    var returnfromloc = $("#txtReturFrom").val();
    var returntoloc = $("#txtReturTo").val();
    
    var isCabNow = $('#RBcabNOW').attr('checked') ? true : false;
    
    var travelTime = $('#TravelTime').val();
    
    if (!fromloc) {
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
    else if (!toloc) {
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
    else if($('#TravelTime').val() === '') {
        $('#lblMessage').text("Please select proper locations so as to calculate distance between them.");
        return false;
    }
     else
    {
      $('#lblMessage').text("");
       
    }
    
    var IsReturnTrue = $('#chkReturnYes').attr('checked') ? true : false;
    var isCheckedNo = $('#chkNo').attr('checked') ? true : false;
    var isRetJourAllOperator = $('#chkyes').attr('checked') ? true : false;  
    var IsReturnTrue2 = $('#chkReturnYes2').attr('checked') ? true : false;
    
    var laterpostcode = $('#locfrom_postcode').val();
    var latertopostcode = $('#locto_postcode').val();
    console.log(laterpostcode);
    
    
    //alert(pickdate+picktime);
   // alert(returnDate+returnTime);
    //alert(picktime);
    //alert(returnTime);
    
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
    
    
  //compare return datetime 
    
    if(isCheckedNo == true || isRetJourAllOperator == true)
    {
        var pickdate2 = $.datepicker.parseDate('dd/mm/yy', $('#pickUpDate').val());
       var retundate2 = $.datepicker.parseDate('dd/mm/yy', $('#datepickers').val());
    
        if(pickdate2>retundate2)
        {
            navigator.notification.alert(
            'Please select a date/time in the future.',
            futureDate,
            'ECABS4U',
            "OK"
            );
            function futureDate()
            { }
            return false; 
        }
        else if(pickdate==returnDate)
        {
            if(picktime>=returnTime)
            {
                navigator.notification.alert(
                'Please Enter correct Return time. It should be greater than Pick Up time.',
                inCorrectReturnTime,
                'ECABS4U',
                "OK"
                );
                function inCorrectReturnTime()
                { }
                return false;  
            }
        }
     }
    
    
    //With same driver and want to return
    if (isCheckedNo == true)
    {
        
        if (IsReturnTrue == true) 
        {
           // alert('samedriver Cabnow');
            
            var pickD = pickdate;
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
                data: "{'userID':'" + relatedId + "','frompost':'" +fromL  + "','topost':'" + toL + "','pickDate':'" + pickD + "','pickTime':'" + pickT + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnFL + "','returntoloc':'" + returnTL + "','returnDate':'" + retunD + "','returnTime':'" + retunT + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"', 'samedriver':' "+isCheckedNo+"'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d[0] != "Error")
                    {   
                        var reqID = data.d[0];
                        console.log(data.d[2]);
                        window.location = 'customerSearchList.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId + '&reqid=' + reqID;
                    }
                    else
                    {
                       // alert(data.d[1]);
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
                data: "{'userID':'" + relatedId + "','frompost':'" + fromloc + "','topost':'" + toloc + "','pickDate':'" + pickdate + "','pickTime':'" + picktime + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnfromloc + "','returntoloc':'" + returntoloc + "','returnDate':'" + returnDate + "','returnTime':'" + returnTime + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"', 'samedriver':'"+isCheckedNo+"'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d[0] !== "Error")
                    {   
                        var reqID = data.d[0];
                        console.log(data.d[2]);
                        window.location = 'customerSearchList.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId + '&reqid=' + reqID;
                    }
                    else
                    {
                        //alert(data.d[1]);
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
                error: function (XMLHttpRequest, textStatus, errorThrown){
                }
            });
        }
    }

 function homeSearch() {
   window.location = 'customerProfile.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
     //window.location = 'customerSearchList.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
 }

