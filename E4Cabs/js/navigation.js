var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var locFrom, loc2, loc3, loc4, loc5, loc6, loc7, loc8, locTo;
var arrLoc = new Array();
var waypts = [];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

window.onload = getLocation();
function getLocation()
{
 console.log('getloc');
 $.ajax({
        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetLocations",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: setLocation,               
        error: function (XMLHttpRequest, textStatus, errorThrown) {},
 });
}
function setLocation(data)
    {
       console.log('setloc');
       locFrom   = data.d[0];
       arrLoc[0] = data.d[1];
       arrLoc[1] = data.d[2];
       arrLoc[2] = data.d[3];
       arrLoc[3] = data.d[4];
       arrLoc[4] = data.d[5];
       arrLoc[5] = data.d[6];
       arrLoc[6] = data.d[7];
       locTo = data.d[8];
    }

 window.setTimeout(function(){
        console.log(arrLoc.length);
        for (var i = 0; i < arrLoc.length; i++)
        {
            if (arrLoc[i] != null) {
                waypts.push({
                    location: arrLoc[i],
                    stopover: true
                });
            }
        }
        console.log(waypts.length);    
        initialize();
 },2000);
        
      function initialize() {
            for (var j = 0; j < waypts.length; j++)
            {
                console.log(waypts[j]);
            }
            directionsDisplay = new google.maps.DirectionsRenderer();
            if (navigator.geolocation) {
                alert('hi1');
                navigator.geolocation.getCurrentPosition(function (position) {
                     alert('hi2');
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
                                        
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    directionsDisplay.setMap(map);

                    marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP
                    });
                    google.maps.event.addListener(marker, 'click', toggleBounce);
                    map.setCenter(pos);
                    calcRoute();                    
                });
            }
        }

        function toggleBounce() {
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        function calcRoute() {
            alert('calrout');
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

function backToMap()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}