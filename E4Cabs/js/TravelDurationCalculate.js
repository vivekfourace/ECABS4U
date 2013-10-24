var rendererOptions = {
            draggable: true
        };
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        var directionsService = new google.maps.DirectionsService();

        function initialize() {
            google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {
                computeTotalDistance(directionsDisplay.directions);
            });
            calcRoute();
        }
        function calcRoute() {
            var start = "560102";
            var end = "560001";
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }

        function computeTotalDistance(result) {
            var total = 0;
            var time = 0;
            var from = 0;
            var to = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
                time += myroute.legs[i].duration.text;
                from = myroute.legs[i].start_address;
                to = myroute.legs[i].end_address;
            }
            time = time.replace('hours', 'H');
            time = time.replace('mins', 'M');
            time = time.replace('saat', 'Saat');
            time = time.replace('dakika', 'dk');
            total = total / 1000;
            alert(total);
        }
