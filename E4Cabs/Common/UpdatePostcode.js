var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0]; 

$.ajax({
   url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetPostcodeFetchTime",
   type: "POST",
   dataType: "Json",
   data: "",
   contentType: "application/json; charset=utf-8",
   success: DeviationTime,
   error: function (XMLHttpRequest, textStatus, errorThrown) {
   }
});

function DeviationTime(data)
{
  var deviationTime = (data.d)*1000;
  alert(deviationTime);
  window.setInterval(UpdateCurrentDistrictCode, deviationTime);    
}

function UpdateCurrentDistrictCode()
 {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function (position) {
           var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           var geocoder = new google.maps.Geocoder();
           var latLng = pos;
           geocoder.geocode({ 'latLng': latLng }, function (results, status) {
               if (status === google.maps.GeocoderStatus.OK) {
                   if (results[0]) {
                       var postalCode = extractFromAdress(results[0].address_components, "postal_code");                                                          
                       function extractFromAdress(components, type) {
                           for (var i = 0; i < components.length; i++)
                               for (var j = 0; j < components[i].types.length; j++)
                                   if (components[i].types[j] === type)
                                       return components[i].long_name;
                           return "";
                       }
                       UpdateThis(postalCode);
                   }
               }

           });
       });
   }
}

function UpdateThis(postalCode) {
     console.log('Updating district post');
     $.ajax({
             url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateDistrictCode',
             type: "post",
             dataType: "json",
             data: "{'postalCode':'" + postalCode + "','relatedId':'"+relatedId+"'}",
             contentType: "application/json; charset=utf-8",
             success: function (data) {
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
             }
     });
 }