
function GetPostCode(address) {
    if (navigator.geolocation) {
            var address = address;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {

                        var lati = results[0].geometry.location.lat();
                        var longi = results[0].geometry.location.lng();
                        var latlng = new google.maps.LatLng(lati, longi);

                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    var postalCode = extractFromAdress(results[0].address_components, "postal_code");
                                    $('#locfrom_postcode').val(postalCode);
                                    console.log(postalCode);
                                }
                            }
                        });
                    }
                }
        });
    }
}

function GetPostCodeTo(address) {
    if (navigator.geolocation) {
            var address = address;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {

                        var lati = results[0].geometry.location.lat();
                        var longi = results[0].geometry.location.lng();
                        var latlng = new google.maps.LatLng(lati, longi);

                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    var postalCode = extractFromAdress(results[0].address_components, "postal_code");
                                    $('#locto_postcode').val(postalCode);
                                    console.log(postalCode);
                                }
                            }
                        });
                    }
                }
        });
    }
}

function extractFromAdress(components, type) {
    for (var i = 0; i < components.length; i++)
        for (var j = 0; j < components[i].types.length; j++)
            if (components[i].types[j] == type)
                return components[i].long_name;
    return "";
}
