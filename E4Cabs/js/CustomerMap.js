var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var locFrom, locTo;
var arrLoc = new Array();
var waypts;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function showMap()
{
    
  //  $( "#popup_box").live({
                   //   popupbeforeposition: function(event, ui) {
               //         $("body").on("touchmove", false);
                  //    }
//});
    document.body.style.overflow = "hidden";
    
    waypts = [];
    var locf;
    var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
    if (isChecked == false) {
        locf = $('#locfrom').val();      
    }
    else if (isChecked == true) {
        locf = $('#txtCurrentFrom').val();
    }
    
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
    
    locFrom   = locf;
    arrLoc[0] = $('#locone').val();
    arrLoc[1] = $('#loctwo').val();
    arrLoc[2] = $('#locthree').val();
    arrLoc[3] = $('#locfour').val();
    arrLoc[4] = $('#locfive').val();
    arrLoc[5] = $('#locsix').val();
    arrLoc[6] = $('#locseven').val();
    locTo = loc2;
    for (var k = 0; k < arrLoc.length; k++)
    {
       console.log(arrLoc[k]);
    }
    for (var kk = 0; kk < waypts.length; kk++)
    {
       console.log(waypts[kk]);
    }
    InitializeWaypoints();  
    
    

}

 function InitializeWaypoints()
{
        console.log("ArrayList = "+arrLoc.length);    
        for (var i = 0; i < arrLoc.length; i++)
        {
            if (arrLoc[i] != "") 
            {
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
                  if (status == google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                     // alert(latitude);
                     // alert(longitude);
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
                      //alert(latitude);
                      //alert(longitude);
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
function hideMap()
{
    console.log('hit');
    $('#popup_box').hide();
    $('#mapContainer').hide();
    $('#transparent_div').hide();
}