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
            if (arrLoc[i] !== null) {
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
            initialize();
        }
        else
         {
            console.log('In else part');
            initialize2();
         }
 },1000);
        
      function initialize() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var geocoder = new google.maps.Geocoder();
              var address = locFrom;
              geocoder.geocode({ 'address': address }, function (results, status) {
                  if (status === google.maps.GeocoderStatus.OK) 
                  {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else
                  {
                      alert("No location found.")
                  }
                  directionsDisplay = new google.maps.DirectionsRenderer();
                  myLocation = new google.maps.LatLng(latitude, longitude);  
                   //alert(myLocation);
                  //console.log(myLocation);

                    var mapOptions = {
                        zoom: 8,
                        //navigationControl: true,
                        //draggable: true,
                        //zoomControl: true,
                        //scaleControl: true,
                        //scrollwheel: true,
                        //disableDoubleClickZoom: false,  
                         mapTypeId: google.maps.MapTypeId.ROADMAP
                        //unitSystem: google.maps.UnitSystem.IMPERIAL
                       
                    };
                                        
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    directionsDisplay.setMap(map);
                  // var checkdist=document.getElementById('directions-panel').value;
                  //alert(checkdist);
                  //console.log(checkdist);
                    directionsDisplay.setPanel(document.getElementById('directions-panel'));
                    calcRoute();                    
                });
            }

      function initialize2() {
              directionsDisplay = new google.maps.DirectionsRenderer();
              var geocoder = new google.maps.Geocoder();
              var address = locFrom;
              geocoder.geocode({ 'address': address }, function (results, status)
         		 {
                  if (status === google.maps.GeocoderStatus.OK) {
                      latitude = results[0].geometry.location.lat();
                      longitude = results[0].geometry.location.lng();
                  }
                  else
              	{
                      alert("No location found!!")
                  }
            
              directionsDisplay = new google.maps.DirectionsRenderer();
              //myLocation = new google.maps.LatLng(latitude, longitude);
                      myLocation = new google.maps.LatLng(latitude, longitude);
                    
                       //alert(myLocation);
                      // console.log(myLocation);
              var mapOptions = {
                zoom:8,
                center: myLocation,
                //panControl: true,
                //navigationControl: true,
                //draggable: true,
                //zoomControl: true,
                //scaleControl: true,
                //scrollwheel: true,
                //disableDoubleClickZoom: false,
                  
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                  //unitSystem: google.maps.UnitSystem.IMPERIAL
                  
               
              }
              map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
              directionsDisplay.setMap(map);
                      //var cc=document.getElementById('directions-panel');
                     // alert(cc);
                     //console.log(cc);
              directionsDisplay.setPanel(document.getElementById('directions-panel'));
              calcRoute2();
            });
            }
      function toggleBounce() {
            if (marker.getAnimation() !== null) 
          {
                marker.setAnimation(null);
           } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

      function calcRoute2() {
            console.log("in calcRoute2 part");
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
            console.log('In calc Route');
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

function backToMap()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}