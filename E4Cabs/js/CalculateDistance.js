    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer();

    //Distance Calculation
    var dis1, dis2, dis3, dis4, dis5, dis6;

    function calcRoute() {
        
        var start = document.getElementById("txtFrom").value;
        var loc2 = document.getElementById("txt2location").value;
        var loc3 = document.getElementById("txt3location").value;
        var loc4 = document.getElementById("txt4location").value;
        var loc5 = document.getElementById("txt5location").value;
        var loc6 = document.getElementById("txt6location").value;
        var loc7 = document.getElementById("txt7location").value;
        var loc8 = document.getElementById("txt8location").value;
        var end = document.getElementById("txtTo").value;
        var distanceInput = document.getElementById("txtDistance");
        
        if(end == "" || end == " ")
        {
            distanceInput.value = "0.0";
        }

        //2nd and 3rd Location is Empty        
        if (loc2 == 0 && loc3 == 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0)
        {
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis4 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    distanceInput.value = (dis4 + " miles");
                }
                //alert(dis4);

            });
        }

            //3rd Location is Empty      
        else if (loc2 != 0 && loc3 == 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0)
        {
            var request1 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request1, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis5 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute4();
            });

            function calcRoute4() {
                //alert('3in');

                var loc3 = document.getElementById("txt3location").value;
                var end = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                    // alert(dis6);

                    var dis = parseFloat(dis5, 10) + parseFloat(dis6, 10);
                    distanceInput.value = (dis + " miles");
                });
            }
        }

            //4 th Location is Empty
        else if (loc2 != 0 && loc3 != 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0)
        {
            var request2 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request2, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute5();
            });

            function calcRoute5() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                  //  alert(dis7);

                    var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute6(dist7);
                });
            }
            function calcRoute6(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dis = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    distanceInput.value = (dis + " miles");
                });
            }
        }
            //5th location empty
        else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0)
        {
            var request3 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request3, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute7();
            });

            function calcRoute7() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                        //alert(dis7);
                    }
                  //  alert(dis7);

                     var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute8(dist7);
                });
            }
            function calcRoute8(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                     calcRoute9(dist8);
                });
            }
            function calcRoute9(dist8) {
                //alert('3in');
                
                //var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc4,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis9 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       // alert(dis9)
                    }
                     //alert(dis8);

                    var dis = (parseFloat(dist8, 10) + parseFloat(dis9, 10)).toFixed(2);
                    distanceInput.value = (dis + " miles");
                });
            }
        }
            //6th location empty
         else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 == 0 && loc7 == 0 && loc8 == 0)
        {
            var request4 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request4, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute10();
            });

            function calcRoute10() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                        //alert(dis7);
                    }
                  //  alert(dis7);

                     var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute11(dist7);
                });
            }
            function calcRoute11(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                     calcRoute12(dist8);
                });
            }
            function calcRoute12(dist8) {
                //alert('3in');
                
                
                var loc4 = document.getElementById("txt4location").value;
                var loc5 = document.getElementById("txt5location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc4,
                    destination: loc5,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis9 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                        //alert(dis9)
                    }
                     //alert(dis8);

                    var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                    //distanceInput.value = (dis + " miles");
                    calcRoute13(dist10);
                });
            }
            function calcRoute13(dist10) {
                //alert('3in');
                
                
                //var loc4 = document.getElementById("txt4location").value;
                var loc5 = document.getElementById("txt5location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc5,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis11 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dis = (parseFloat(dist10, 10) + parseFloat(dis11, 10)).toFixed(2);
                    distanceInput.value = (dis + " miles");
                });
            }
        }
            //7th location empty
      else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 == 0 && loc8 == 0)
        {
            var request5 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request5, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute14();
            });

            function calcRoute14() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                        //alert(dis7);
                    }
                  //  alert(dis7);

                     var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute15(dist7);
                });
            }
            function calcRoute15(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                     calcRoute16(dist8);
                });
            }
            function calcRoute16(dist8) {
                //alert('3in');
                
                
                var loc4 = document.getElementById("txt4location").value;
                var loc5 = document.getElementById("txt5location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc4,
                    destination: loc5,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis9 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       // alert(dis9)
                    }
                     //alert(dis8);

                    var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                    //distanceInput.value = (dis + " miles");
                    calcRoute17(dist10);
                });
            }
            function calcRoute17(dist10) {
                //alert('3in');
                var loc5 = document.getElementById("txt5location").value;
                var loc6 = document.getElementById("txt6location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc5,
                    destination: loc6,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis11 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                    calcRoute18(dist12)
                });
            }
             function calcRoute18(dist12) {
                //alert('3in');
               // var loc5 = document.getElementById("txt5location").value;
                var loc6 = document.getElementById("txt6location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc6,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis13 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dis = (parseFloat(dist12, 10) + parseFloat(dis13, 10)).toFixed(2);
                    distanceInput.value = (dis + " miles");
                });
            }
        }
           //8th location empty 
        else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 != 0 && loc8 == 0)
        {
            var request6 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request6, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute19();
            });

            function calcRoute19() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                  //  alert(dis7);

                     var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute20(dist7);
                });
            }
            function calcRoute20(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                     calcRoute21(dist8);
                });
            }
            function calcRoute21(dist8) {
                //alert('3in');
                
                
                var loc4 = document.getElementById("txt4location").value;
                var loc5 = document.getElementById("txt5location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc4,
                    destination: loc5,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis9 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                    //distanceInput.value = (dis + " miles");
                    calcRoute22(dist10);
                });
            }
            function calcRoute22(dist10) {
                //alert('3in');
                var loc5 = document.getElementById("txt5location").value;
                var loc6 = document.getElementById("txt6location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc5,
                    destination: loc6,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis11 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                    calcRoute23(dist12)
                });
            }
             function calcRoute23(dist12) {
                //alert('3in');
                var loc6 = document.getElementById("txt6location").value;
                var loc7 = document.getElementById("txt7location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc6,
                    destination: loc7,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis13 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist13 = (parseFloat(dist12, 10) + parseFloat(dis13, 10)).toFixed(2);
                   calcRoute24(dist13);
                });
            }
            function calcRoute24(dist13) {
                //alert('3in');
                //var loc6 = document.getElementById("txt6location").value;
                var loc7 = document.getElementById("txt7location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc7,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis14 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dis = (parseFloat(dist13, 10) + parseFloat(dis14, 10)).toFixed(2);
                    distanceInput.value = (dis + " miles");
                });
            }
        }
            //9th location empty
         else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 != 0 && loc8 != 0)
        {
            var request7 = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request7, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    //distanceInput.value = (dis5 + " miles");
                }
                //alert(dis5);
                calcRoute25();
            });

            function calcRoute25() {
                //alert('3in');
                var loc2 = document.getElementById("txt2location").value;
                var loc3 = document.getElementById("txt3location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc2,
                    destination: loc3,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis7 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                  //  alert(dis7);

                     var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                     calcRoute26(dist7);
                });
            }
            function calcRoute26(dist7) {
                //alert('3in');
                
                var loc3 = document.getElementById("txt3location").value;
                var loc4 = document.getElementById("txt4location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                    }
                     //alert(dis8);

                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                     calcRoute27(dist8);
                });
            }
            function calcRoute27(dist8) {
                //alert('3in');
                
                
                var loc4 = document.getElementById("txt4location").value;
                var loc5 = document.getElementById("txt5location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc4,
                    destination: loc5,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis9 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       // alert(dis9)
                    }
                     //alert(dis8);

                    var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                    //distanceInput.value = (dis + " miles");
                    calcRoute28(dist10);
                });
            }
            function calcRoute28(dist10) {
                //alert('3in');
                var loc5 = document.getElementById("txt5location").value;
                var loc6 = document.getElementById("txt6location").value;
               // var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc5,
                    destination: loc6,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis11 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                    calcRoute29(dist12)
                });
            }
             function calcRoute29(dist12) {
                //alert('3in');
                var loc6 = document.getElementById("txt6location").value;
                var loc7 = document.getElementById("txt7location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc6,
                    destination: loc7,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis13 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist13 = (parseFloat(dist12, 10) + parseFloat(dis13, 10)).toFixed(2);
                   calcRoute30(dist13);
                });
            }
            function calcRoute30(dist13) {
                //alert('3in');
                var loc7 = document.getElementById("txt7location").value;
                var loc8 = document.getElementById("txt8location").value;
                //var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                //var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc7,
                    destination: loc8,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis14 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dist14 = parseFloat(dist13, 10) + parseFloat(dis14, 10);
                    calcRoute31(dist14);
                    //distanceInput.value = (dis + " miles");
                });
            }
            function calcRoute31(dist14) {
                //alert('3in');
                //var loc7 = document.getElementById("txt7location").value;
                var loc8 = document.getElementById("txt8location").value;
                var end = document.getElementById("txtTo").value;
                //var loc3 = document.getElementById("txt3location").value;
                //var loc3 = document.getElementById("txtTo").value;
                var distanceInput = document.getElementById("txtDistance");

                var request = {
                    origin: loc8,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis15 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                       
                    }
                     //alert(dis8);

                    var dis = (parseFloat(dist14, 10) + parseFloat(dis15, 10)).toFixed(2);
                    distanceInput.value = (dis + " miles");
                });
            }
        }

            //All Location is Filled          
        else {
            var request = {
                origin: start,
                destination: loc2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis1 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
                }
                calcRoute2();
            });
        }
    }

    function calcRoute2() {
        var loc2 = document.getElementById("txt2location").value;
        var loc3 = document.getElementById("txt3location").value;
        var distanceInput = document.getElementById("txtDistance");

        var request = {
            origin: loc2,
            destination: loc3,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis2 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
            }
            calcRoute3();
        });
    }

    function calcRoute3() {
        var loc3 = document.getElementById("txt3location").value;
        var end = document.getElementById("txtTo").value;
        var distanceInput = document.getElementById("txtDistance");

        var request = {
            origin: loc3,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis3 = (response.routes[0].legs[0].distance.value / 1609.34).toFixed(2);
            }
            var dis = parseFloat(dis1, 10) + parseFloat(dis2, 10) + parseFloat(dis3, 10);
            distanceInput.value = (dis + " miles");
        });
    }