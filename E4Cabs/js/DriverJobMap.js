

var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var arrLoc = new Array();
var waypts;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;    

function showMapDriver()
{
    waypts = [];
 
    $('#popup_box22').show();
    $('#mapContainer').show();    
    $('#transparent_div').show();
    
    locFrom = $('#lblFromLoc').text();
    var loc1 = $('#lblLoc1').text();
    var loc2 = $('#lblLoc2').text();
    var loc3 = $('#lblLoc3').text();
    var loc4 = $('#lblLoc4').text();
    var loc5 = $('#lblLoc5').text();
    var loc6 = $('#lblLoc6').text();
    var loc7 = $('#lblLoc7').text();
    
    if(loc1.length > 0)
    {
        arrLoc[0] = $('#lblLoc1').text();        
    }
    if(loc2.lenth > 0)
    {
        arrLoc[1] = $('#lblLoc2').text();
    }
    if(loc3.lenth > 0)
    {
        arrLoc[2] = $('#lblLoc3').text();
    }
    if(loc4.lenth > 0)
    {
        arrLoc[3] = $('#lblLoc4').text();
    }
    if(loc5.lenth > 0)
    {
        arrLoc[4] = $('#lblLoc5').text();
    }
    if(loc6.lenth > 0)
    {
        arrLoc[5] = $('#lblLoc6').text();
    }
    if(loc7.lenth > 0)
    {
        arrLoc[6] = $('#lblLoc7').text();
    }
    
    locTo = $('#lblToLoc').text();
    
    console.log(locFrom+" "+locTo);
    for (var k = 0; k < arrLoc.length; k++)
    {       
       console.log("Array content "+arrLoc[k]);
    }
    
    InitializeWaypoints();    
}

 function InitializeWaypoints()
{
        console.log("ArrayList = "+arrLoc.length);    
        for (var i = 0; i < arrLoc.length; i++)
        {
            if (arrLoc[i] !== "") {
                waypts.push({
                    location: arrLoc[i],
                    stopover: true
                });
            }
        }
        console.log("Waypoints = "+waypts.length);
        if (waypts.length > 0)
        {
            ShowMapWithWaypoints();
        }
        else
         {
            initialize2();
         }
 }
        
      function ShowMapWithWaypoints() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var geocoder = new google.maps.Geocoder();
              var address = locFrom;
              geocoder.geocode({ 'address': address }, function (results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else 
                  {
                        navigator.notification.alert(
                        "No location found.",
                        noLocationNotFound3,
                        'ECABS4U',
                        "OK"
                        );
                         function noLocationNotFound3()
                         { }
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
                  if (status === google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else {
                       navigator.notification.alert(
    			          "No location found.",
      	               noLocationNotFound4, // Specify a function to be called 
     				    'ECABS4U',
     					"OK"
    					 );
                         function noLocationNotFound4()
                         { }
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
            var request = {
                origin: locFrom,
                destination: locTo,                
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }        
      
      function calcRoute() {
            var request = {
                origin: locFrom,
                destination: locTo,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
function hideMap()
{
    $('#popup_box22').hide();
    $('#mapContainer').hide();    
    $('#transparent_div').hide();
}