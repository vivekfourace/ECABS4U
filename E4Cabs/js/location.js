var QString = window.location.search.substring(1);
var fromLocation =  QString.split("=")[1].split("&")[0];
var toLocation = QString.split("=")[2].split("&")[0];
var dis = QString.split("=")[3].split("&")[0];

var userId =  QString.split("=")[4].split("&")[0];
var roleId = QString.split("=")[5].split("&")[0];
var relatedId = QString.split("=")[6].split("&")[0];

fromLocation = fromLocation.replace('%20',' ');
toLocation = toLocation.replace('%20',' ');

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var geocoder = new google.maps.Geocoder();
  var address = fromLocation;
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
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  calcRoute();
});
}
function calcRoute() {
  var request = {
      origin:fromLocation,
      destination:toLocation,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

function backToMap()
{
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}