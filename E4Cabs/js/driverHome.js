var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
setTimeout(function(){
    $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ChangeDriverStatus",
            type:"POST",
            dataType: "Json",
            data:"",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
    },1000); 

setInterval(getCurrentPostCode, 60000); 

        function getCurrentPostCode() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    alert('Capturing Driver Postcode through mobile GPS.');
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
           // alert(postalCode)
           // alert(relatedId)
           // alert('hi');
            $.ajax({
                url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/updateLocationMapping',
                type: "post",
                dataType: "json",
                data: "{'postalCode':'" + postalCode + "','Id':'" + relatedId + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //alert(data.d);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert(errorThrown);
                }
            });
        }
function Check(){
    //getCurrentPostCode();
   // $("body").css({visibility:'none '})
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/userStatus";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function (data) {
                        
                        var status=data.d;
                         if(status==true)
                         {
                         $('#driverStatusupdate').text("Available");
                             
                              $.ajax({
                                           url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CheckNewJob', 
                                           type:"POST",
                                           datatype:"json",
                                           data:"{'userID':'" +relatedId+ "'}",
                                           contentType: "application/json; charset=utf-8",                     
                                           success: function (data) 
                                              {
                                                  if(data.d=="True")
                                                  {
                                                     $('#popup_box').show();
                                                     $('#divDealStart').show();
                                                     //$('#beep').Play(); //for playing beep sound
                                                  }
                                                 if(data.d=="False")
                                                  {
                                                     $('#popup_box').hide();
                                                     $('#divDealStart').hide();  
                                                  }
                                             },
                                           error: function (XMLHttpRequest, textStatus, errorThrown)
                                              {
                                                       $('#popup_box').hide();
                                                     $('#divDealStart').hide(); 
                                               }
                                     });
                             }
                         else
                         {
                           $('#driverStatusupdate').text("Soon to clear");   
                         }
                     },
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     //alert(errorThrown);
                }
             });
    
}
setInterval(Check, 1000);

function Available()
{
    
}


//Driver status 
 function DriverStatus(){
   window.location = 'driverStatusUpdate.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//diver Profile
function DriverProfile()
{
    
    window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//Driver Jobs
function Jobs()
{
    //window.location = 'pop.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//diver Profile from menu
function myProfile()

{
    
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Driver Jobs from menu
function MyBookings(){
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function logout(){
          
        $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
        $.cookie("remember", false);
        $.cookie("userName", 'null');
        $.cookie("userPassword", 'null');
        window.location = "index.html";  
}

function soonToclear()
{
    //alert("hi");
     $('#lblCurrentStatus').text("Soon To Clear");
    $('#driverStatusupdate').text("Soon To Clear");
    $('#lblCurrentStatus').css("color","#639ECD");
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/clearStatus";
                $.ajax(url,{
                    cache: false,
                    beforeSend: function(){
                         $('#imgLoader').show();
                     },
                     complete: function(){
                         $('#imgLoader').hide();
                     },

                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success:{},
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
             });
    }

//Driver Status
function myhome(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//Driver Feedback
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//History
function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

 //Accepting the Request.    
          function seeRequest()
          {
              window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
          }
          
          
          //cancel the Request.
          function closeRequest()
          {
               $.ajax({
                        url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                        type:"POST",
                        datatype:"json",
                        data:"{'userID':'" +relatedId+ "'}",
                        contentType: "application/json; charset=utf-8",                     
                        success: function (data) 
                           {
                               $('#popup_box').hide();
                                $('#divDealStart').hide();
                          },
                        error: function (XMLHttpRequest, textStatus, errorThrown)
                           {
                                  $('#popup_box').hide();
                                $('#divDealStart').hide(); 
                            }
                  });
              
          }

