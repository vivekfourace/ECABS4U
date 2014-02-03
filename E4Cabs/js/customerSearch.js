var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4];

console.log(requestID);

if(requestID !== undefined)
{
    requestID = QString.split("=")[4].split("&")[0];
    
    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/FillJobSearchDetail",
        type: "POST",
        dataType: "Json",
        data: "{'requestID':'" + requestID + "'}",
        contentType: "application/json; charset=utf-8",
        success: FillAllData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
       }
     });
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
            $('#txtothereSpecialRequirement').val(data.d[i]["OtherSpecReq"]);       
        }
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
                        alert("No location found!!")
                    }
                });
            });
        }
     
       $('#chkNo').click(function () {
           document.getElementById("chkyes").checked = false;
           $('#returnJ').fadeIn("fast");
           $('#termCond').fadeIn("fast");

       });
       $('#chkyes').click(function () {
           document.getElementById("chkNo").checked = false;
           $('#returnJ').fadeOut("slow");
           $('#termCond').fadeOut("slow");

       });

       $('#popupBoxClose').click(function () {
           $('#popup_box').fadeOut("slow");
           $('#transparent_div').fadeOut("slow");
       });
    });

function Duration()
{
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
        CalculateDuration(fromloc, toloc);
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
            total = parseInt(time / 60); //time in minutes
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
        
     CalculateDuration(fromloc, toloc);
    
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
        return false;
    }
    if (!toloc) {
        $('#lblMessage').text("Please enter To location.");
        return false;
    }
    var IsReturnTrue = $('#chkReturnYes').attr('checked') ? true : false;
    var isCheckedNo = $('#chkNo').attr('checked') ? true : false;
    var isRetJourAllOperator = $('#chkyes').attr('checked') ? true : false;    
    
    var laterpostcode = $('#locfrom_postcode').val();
    var latertopostcode = $('#locto_postcode').val();
    console.log(laterpostcode);
    
    if (isCheckedNo == true) {
        if (IsReturnTrue == false) {
            var pickD = returnDate;
            var pickT = returnTime;
            var fromL = returntoloc;
            var toL = returnfromloc;
            var retunD = "";
            var retunT = "";
            var returnFL = "";
            var returnTL = "";
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
                data: "{'userID':'" + relatedId + "','frompost':'" + toL + "','topost':'" + fromL + "','pickDate':'" + pickD + "','pickTime':'" + pickT + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnFL + "','returntoloc':'" + returnTL + "','returnDate':'" + retunD + "','returnTime':'" + retunT + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"'}",
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
                data: "{'userID':'" + relatedId + "','frompost':'" + fromloc + "','topost':'" + toloc + "','pickDate':'" + pickdate + "','pickTime':'" + picktime + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnfromloc + "','returntoloc':'" + returntoloc + "','returnDate':'" + returnDate + "','returnTime':'" + returnTime + "','travelTime':'" + travelTime + "','isCabNow':'" + isCabNow + "','fourthLoc':'" + fourthLoc + "','fifthLoc':'" + fifthLoc + "','sixthLoc':'" + sixthLoc + "','seventhLoc':'" + seventhLoc + "','eightLoc':'" + eightLoc + "', 'laterpostcode':'"+laterpostcode+"', 'isCreditCard':'"+isCreditCard+"', 'latertopostcode':'"+latertopostcode+"'}",
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
                        console.log(data.d[1]);
                        alert(data.d[1]);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown){
                }
            });
        }
    }

 function homeSearch() {
     window.location = 'customerProfile.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
 }

