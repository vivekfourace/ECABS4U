var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
directionsDisplay = new google.maps.DirectionsRenderer();

var dis1, dis2, dis3, dis4, dis5, dis6, dis8,dis9, dis11, dis13, dis14, dis15;

function CalculateTotalDistance() {
    console.log('Inside the calculate dis');
    var start;
    var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
    if (isChecked == false) {
        start = $('#locfrom').val();
    }
    else if (isChecked == true) {
        start = document.getElementById('txtCurrentFrom').value;
    }

    var loc2 = $("#locone").val();
    var loc3 = $("#loctwo").val();
    var loc4 = $("#locthree").val();
    var loc5 = $("#locfour").val();
    var loc6 = $("#locfive").val();
    var loc7 = $("#locsix").val();
    var loc8 = $("#locseven").val();
    var end =  $("#locto").val();
    
    console.log(start);
    console.log(loc2);
    console.log(loc3);
    console.log(loc4);
    console.log(loc5);
    console.log(loc6);
    console.log(loc7);
    console.log(loc8);
    console.log(end);
    
    var distanceInput = document.getElementById("txtDistance");
        
    if (loc2 == 0 && loc3 == 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0) {
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis4 = (response.routes[0].legs[0].distance.value / 1609.34);
                distanceInput.value = (dis4.toFixed(2) + " miles");
            }
        });
    }
    //if only from, 1st and to location are present
    else if (loc2 != 0 && loc3 == 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0) {
        var request1 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request1, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis5 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute4();
        });

        function calcRoute4() {
            var request = {
                origin: loc2,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dis = parseFloat(dis5, 10) + parseFloat(dis6, 10);
                distanceInput.value = (dis.toFixed(2) + " miles");
            });
        }
    }

        //upto 4th Location is Empty
    else if (loc2 != 0 && loc3 != 0 && loc4 == 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0) {
        var request2 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request2, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute5();
        });

        function calcRoute5() {
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute6(dist7);
            });

            function calcRoute6(dist7) {

                var request = {
                    origin: loc3,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dis = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    distanceInput.value = (dis.toFixed(2) + " miles");
                });
            }
        }
    }
        //upto 5th location empty
    else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 == 0 && loc6 == 0 && loc7 == 0 && loc8 == 0) {
        var request3 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request3, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute7();
        });

        function calcRoute7() {
           
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute8(dist7);
            });

            function calcRoute8(dist7) {
                
                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    calcRoute9(dist8);
                });

                function calcRoute9(dist8) {

                    var request = {
                        origin: loc4,
                        destination: end,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            dis9 = (response.routes[0].legs[0].distance.value / 1609.34);
                        }
                        var dis = (parseFloat(dist8, 10) + parseFloat(dis9, 10));
                        distanceInput.value = (dis.toFixed(2) + " miles");
                    });
                }
            }
        }
    }
        //6th location empty
    else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 == 0 && loc7 == 0 && loc8 == 0) {
        var request4 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request4, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute10();
        });

        function calcRoute10() {
           
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute11(dist7);
            });

            function calcRoute11(dist7) {
                
                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    calcRoute12(dist8);
                });

                function calcRoute12(dist8) {
                    var request = {
                        origin: loc4,
                        destination: loc5,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            dis9 = (response.routes[0].legs[0].distance.value / 1609.34);
                        }
                        var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                        calcRoute13(dist10);
                    });

                    function calcRoute13(dist10) {
                        
                        var request = {
                            origin: loc5,
                            destination: end,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                dis11 = (response.routes[0].legs[0].distance.value / 1609.34);

                            }
                            var dis = (parseFloat(dist10, 10) + parseFloat(dis11, 10));
                            distanceInput.value = (dis.toFixed(2) + " miles");
                        });
                    }
                }
            }
        }
    }
        //7th location empty
    else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 == 0 && loc8 == 0) {
        var request5 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request5, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute14();
        });

        function calcRoute14() {
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute15(dist7);
            });

            function calcRoute15(dist7) {
                
                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    calcRoute16(dist8);
                });

                function calcRoute16(dist8) {
                    
                    var request = {
                        origin: loc4,
                        destination: loc5,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            dis9 = (response.routes[0].legs[0].distance.value / 1609.34);
                        }
                        var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                        calcRoute17(dist10);
                    });

                    function calcRoute17(dist10) {
                       
                        var request = {
                            origin: loc5,
                            destination: loc6,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                dis11 = (response.routes[0].legs[0].distance.value / 1609.34);

                            }
                            var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                            calcRoute18(dist12)
                        });

                        function calcRoute18(dist12) {
                            

                            var request = {
                                origin: loc6,
                                destination: end,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };

                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    dis13 = (response.routes[0].legs[0].distance.value / 1609.34);

                                }
                                var dis = (parseFloat(dist12, 10) + parseFloat(dis13, 10));
                                distanceInput.value = (dis.toFixed(2) + " miles");
                            });
                        }
                    }
                }
            }
        }
    }
        //8th location empty 
    else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 != 0 && loc8 == 0) {
        var request6 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request6, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute19();
        });

        function calcRoute19() {
            
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute20(dist7);
            });

            function calcRoute20(dist7) {
                
                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    calcRoute21(dist8);
                });

                function calcRoute21(dist8) {
                    
                    var request = {
                        origin: loc4,
                        destination: loc5,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            dis9 = (response.routes[0].legs[0].distance.value / 1609.34);
                        }
                        var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                        calcRoute22(dist10);
                    });

                    function calcRoute22(dist10) {
                        
                        var request = {
                            origin: loc5,
                            destination: loc6,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                dis11 = (response.routes[0].legs[0].distance.value / 1609.34);

                            }
                            var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                            calcRoute23(dist12)
                        });

                        function calcRoute23(dist12) {

                            var request = {
                                origin: loc6,
                                destination: loc7,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };

                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    dis13 = (response.routes[0].legs[0].distance.value / 1609.34);

                                }
                                var dist13 = (parseFloat(dist12, 10) + parseFloat(dis13, 10));
                                calcRoute24(dist13);
                            });

                            function calcRoute24(dist13) {
                                var request = {
                                    origin: loc7,
                                    destination: end,
                                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                                };

                                directionsService.route(request, function (response, status) {
                                    if (status == google.maps.DirectionsStatus.OK) {
                                        directionsDisplay.setDirections(response);
                                        dis14 = (response.routes[0].legs[0].distance.value / 1609.34);

                                    }
                                    var dis = (parseFloat(dist13, 10) + parseFloat(dis14, 10))
                                    distanceInput.value = (dis.toFixed(2) + " miles");
                                });
                            }
                        }
                    }
                }
            }
        }
    }
        //9th location empty
    else if (loc2 != 0 && loc3 != 0 && loc4 != 0 && loc5 != 0 && loc6 != 0 && loc7 != 0 && loc8 != 0) {
        var request7 = {
            origin: start,
            destination: loc2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request7, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dis6 = (response.routes[0].legs[0].distance.value / 1609.34);
            }
            calcRoute25();
        });

        function calcRoute25() {
            
            var request = {
                origin: loc2,
                destination: loc3,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    dis7 = (response.routes[0].legs[0].distance.value / 1609.34);
                }
                var dist7 = parseFloat(dis6, 10) + parseFloat(dis7, 10);
                calcRoute26(dist7);
            });

            function calcRoute26(dist7) {
                var request = {
                    origin: loc3,
                    destination: loc4,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        dis8 = (response.routes[0].legs[0].distance.value / 1609.34);
                    }
                    var dist8 = parseFloat(dist7, 10) + parseFloat(dis8, 10);
                    calcRoute27(dist8);
                });

                function calcRoute27(dist8) {

                    var request = {
                        origin: loc4,
                        destination: loc5,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            dis9 = (response.routes[0].legs[0].distance.value / 1609.34);
                        }
                        var dist10 = parseFloat(dist8, 10) + parseFloat(dis9, 10);
                        calcRoute28(dist10);
                    });

                    function calcRoute28(dist10) {
                        var request = {
                            origin: loc5,
                            destination: loc6,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                                dis11 = (response.routes[0].legs[0].distance.value / 1609.34);

                            }
                            var dist12 = parseFloat(dist10, 10) + parseFloat(dis11, 10);
                            calcRoute29(dist12)
                        });

                        function calcRoute29(dist12) {
                            var request = {
                                origin: loc6,
                                destination: loc7,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };
                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    dis13 = (response.routes[0].legs[0].distance.value / 1609.34);

                                }
                                var dist13 = (parseFloat(dist12, 10) + parseFloat(dis13, 10));
                                calcRoute30(dist13);
                            });

                            function calcRoute30(dist13) {
                                var request = {
                                    origin: loc7,
                                    destination: loc8,
                                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                                };

                                directionsService.route(request, function (response, status) {
                                    if (status == google.maps.DirectionsStatus.OK) {
                                        directionsDisplay.setDirections(response);
                                        dis14 = (response.routes[0].legs[0].distance.value / 1609.34);
                                    }
                                    var dist14 = parseFloat(dist13, 10) + parseFloat(dis14, 10);
                                    calcRoute31(dist14);
                                });

                                function calcRoute31(dist14) {
                                    var request = {
                                        origin: loc8,
                                        destination: end,
                                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                                    };

                                    directionsService.route(request, function (response, status) {
                                        if (status == google.maps.DirectionsStatus.OK) {
                                            directionsDisplay.setDirections(response);
                                            dis15 = (response.routes[0].legs[0].distance.value / 1609.34);

                                        }
                                        var dist15 = (parseFloat(dist14, 10) + parseFloat(dis15, 10));
                                        distanceInput.value = (dist15.toFixed(2) + " miles");
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }    
}

