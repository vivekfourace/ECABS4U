var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function Check(){
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/userStatus";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +userId+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function (data) {
                        
                        var status = data.d;
                         if(status == true)
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
                                                  var isTrue = data.d[0];                                                  
                                                  if(isTrue == "True")
                                                  {
                                                     var jobType = data.d[1];
                                                     if(jobType == "True")
                                                      {
                                                          $('#strJobTypeTitle').html("New 'Cab Now' Job Notification");
                                                          $('#strJobTypeTitle').css('color','#FFFFFF');
                                                          $('#popup_box').show();
                                                          $('#divDealStart').show();
                                                      }
                                                      else if(jobType == "False")
                                                      {
                                                          $('#strJobTypeTitle').html("New 'Cab Later' Job Notification");
                                                          $('#strJobTypeTitle').css('color','#FFFFFF');
                                                          $('#popup_box').show();
                                                          $('#divDealStart').show();
                                                      }                                                
                                                  }
                                                else if(isTrue == "False")
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
setInterval(Check, 10000);
  //cancel the Request.
          function closeRequest()
          {
              //alert("del");
              var getResponse=confirm("Cancel job ?")
              if( getResponse==true)
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
              else
              {
                  return false;
              }
               
              
          }
