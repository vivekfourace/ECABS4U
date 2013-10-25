var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

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