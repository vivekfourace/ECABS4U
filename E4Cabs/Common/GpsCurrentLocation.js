setInterval(getCurrentPostCode, 10000); 

        function getCurrentPostCode() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    //alert('Capturing Driver Postcode through mobile GPS.');
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var geocoder = new google.maps.Geocoder();
                    var latLng = pos;
                    geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var postalCode = extractFromAdress(results[0].address_components, "postal_code");
                                alert("Your Postcode is: " + postalCode);
                                function extractFromAdress(components, type) {
                                    for (var i = 0; i < components.length; i++)
                                        for (var j = 0; j < components[i].types.length; j++)
                                            if (components[i].types[j] == type)
                                                return components[i].long_name;
                                    return "";
                                }
                                updatePostCode(postalCode);
                            }
                        }

                    });
                });
            }
        }

function updatePostCode(postalCode) {
            $.ajax({
                        url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/updateLocationMapping',
                        type: "post",
                        dataType: "json",
                        data: "{'postalCode':'" + postalCode + "','Id':'" + relatedId + "'}",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
            });
        }