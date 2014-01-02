var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var locFrom, locTo;
var arrLoc = new Array();
var waypts = [];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function showMap()
{
    var locf = $('#locfrom').val();
    if(!locf)
    {
        $('#lblMessage').text("Please enter From location.");
        return false;
    }
    var loc2 = $('#locto').val();
    if(!loc2)
    {
        $('#lblMessage').text("Please enter To location.");
        return false;
    }
    $('#popup_box').show();
    $('#mapContainer').show();
    $('#transparent_div').show();
    console.log('setloc');
    locFrom   = $('#locfrom').val();
    arrLoc[0] = $('#locone').val();
    arrLoc[1] = $('#loctwo').val();
    arrLoc[2] = $('#locthree').val();
    arrLoc[3] = $('#locfour').val();
    arrLoc[4] = $('#locfive').val();
    arrLoc[5] = $('#locsix').val();
    arrLoc[6] = $('#locseven').val();
    locTo = $('#locto').val();
    for (var k = 0; k < arrLoc.length; k++)
    {
       console.log(arrLoc[k]);
    }
    InitializeWaypoints();    
}

 function InitializeWaypoints()
{
        console.log(arrLoc.length);
    
        for (var i = 0; i < arrLoc.length; i++)
        {
            if (arrLoc[i] != "") {
                waypts.push({
                    location: arrLoc[i],
                    stopover: true
                });
            }
        }
        console.log(waypts.length);
        if (waypts.length > 0)
        {
            console.log('In if part');
            ShowMapWithWaypoints();
        }
        else
         {
            console.log('In else part');
            initialize2();
         }
 }
        
      function ShowMapWithWaypoints() {
          console.log('In initialize');
            directionsDisplay = new google.maps.DirectionsRenderer();
            var geocoder = new google.maps.Geocoder();
              var address = locFrom;
              geocoder.geocode({ 'address': address }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else {
                      alert("No location found.")
                  }
                  directionsDisplay = new google.maps.DirectionsRenderer();
                  myLocation = new google.maps.LatLng(latitude, longitude);           

                    var mapOptions = {
                        zoom: 5,
                        panControl: true,
                        navigationControl: true,
                        draggable: true,
                        zoomControl: true,
                        scaleControl: true,
                        scrollwheel: true,
                        disableDoubleClickZoom: false,                   
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                                        
                    map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
                    directionsDisplay.setMap(map);
                    calcRoute();                    
                });
            }

      function initialize2() {
              directionsDisplay = new google.maps.DirectionsRenderer();
              var geocoder = new google.maps.Geocoder();
              var address = locFrom;
              geocoder.geocode({ 'address': address }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else {
                      alert("No location found!!")
                  }
            
              directionsDisplay = new google.maps.DirectionsRenderer();
              myLocation = new google.maps.LatLng(latitude, longitude);
                
              var mapOptions = {
                zoom:5,
                center: myLocation,
                panControl: true,
                navigationControl: true,
                draggable: true,
                zoomControl: true,
                scaleControl: true,
                scrollwheel: true,
                disableDoubleClickZoom: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              }
              map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
              directionsDisplay.setMap(map);
              calcRoute2();
            });
            }

      function calcRoute2() {
            console.log("in calcRoute2 part");
            var request = {
                origin: locFrom,
                destination: locTo,                
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }        
      
      function calcRoute() {
            console.log('In calc Route');
            var request = {
                origin: locFrom,
                destination: locTo,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }