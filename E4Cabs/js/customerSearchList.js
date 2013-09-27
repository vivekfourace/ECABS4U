var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4].split("&")[0];

function backtosearch()
{
    window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

        //alert(userId + roleId + relatedId + requestID);
        
         //Ajax loader--start
              $('#imgLoader').bind('ajaxStart', function(){
                  $(this).show();
                  showDisableLayer();
               }).bind('ajaxStop', function(){
                  $(this).hide();
                   hideDisableLayer();
              });
                showDisableLayer = function() {
                $('<div id="loading" style="position:fixed; z-index: 2147483647; top:0; left:0; background-color: #E6E6E6; opacity:0.4;filter:alpha(opacity=0);"></div>').appendTo(document.body);
                $("#loading").height($(document).height());
                $("#loading").width($(document).width());
              };
                  hideDisableLayer = function() {
                  $("#loading").remove();
              };
            //Ajax loader--ends


  $.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetResponseData",
     type:"POST",
     dataType: "Json",
     data:"{'requestID':'" +requestID+"'}",
     contentType: "application/json; charset=utf-8",  
     success: getData,
     error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(errorThrown);
      }
   });


function getData(data)
{
    var count = data.d.length;
    var html = '<table width="100%" class="table-style">';
    
    html += '<thead class="header-style">';
    html += '<tr>';
    html += '<th class="th1 font">Name</th>';
    html += '<th class="th2 font">Fare</th>';
    html += '<th class="th3 font">Date</th>';
    html += '<th class="th3 font">Time</th>';
    html += '<th class="th3"></th>';
    html += '</tr>';
    html += '</thead>';
                   html +='<tbody class="body-style">';  
                        for(var i=0; i<count; i++)
                        {
                            var driverID = data.d[i]["DriverID"];
                            
                            var customerReqId = data.d[i]["CustomerRequestID"];
                            html += '<tr>';
                            html += "<td width='25%' align='center'>" + data.d[i]["DriverName"] + "</td>";
                            html += "<td width='15%' align='center'>" + data.d[i]["DriverName"] +"</td>";
                            html += "<td width='20%' align='center'>" + data.d[i]["StartDate"] +"</td>";
                            html += "<td width='20%' align='center'>" + data.d[i]["StartTime"] +"</td>";
                            html += "<td width='20%' align='center'>" + '<input type="button" value="Hire" id= "'+ driverID +'" onclick = "Hireme(\''+driverID+'\',\''+customerReqId+'\'); return false;" title= "'+driverID+'" />' + "</td>";
                            html += '</tr>';
                        }
                   html +='</tbody>';
   html +='</table>';
   $('#msg').append(html);
 }

function Hireme(driID, reqID)
{
    var driverId = driID;
    var requestId = reqID;
    alert(driID);
    alert(reqID);
    $.ajax({
       url: "http://115.115.159.126/ECabs/ECabs4U.asmx/HireDriverResponse",
       type:"POST",
       dataType: "Json",
       data:"{'driverId':'" +driverId+"','requestId':'"+ requestId +"'}",
       contentType: "application/json; charset=utf-8",  
       success:getResponseFromDriver ,
       error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                   alert(errorThrown);
               }
   });
}

function getResponseFromDriver(data)
{
     window.setInterval(function () {
      $.ajax({
                                        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/checkdealResponse",
                                        type:"POST",
                                        dataType: "Json",
                                        data:"{'userID':'" + relatedId +"'}",
                                        contentType: "application/json; charset=utf-8",  
                                        success: function (data) 
                                                    {
                                                        var getDriverID=data.d[0];
                                                        var getResponse=data.d[1];
                                                        var getBooked=data.d[2];
                                                        if(getBooked="True")
                                                        {
                                                             $('#popup_box').fadeIn("slow");
                                                            $('#divDealConfirmed').show();
                                                            $.ajax({
                                                                       url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetConfirmData",
                                                                       type:"POST",
                                                                       dataType: "Json",
                                                                       data:"{'driverID':'"+ getDriverID +"','requestID':'" + getResponse + "'}",
                                                                       contentType: "application/json; charset=utf-8",                     
                                                                       success: function(data)
                                                                             {
                                                                                $('#lbldriverId').text(getDriverID);
                                                                                $('#lblconfirmjob').text(data.d[0]);
                                                                                $('#lblconfirmdrivername').text(data.d[1]);
                                                                                $('#lblconfirmfrom').text(data.d[2]);
                                                                                $('#lblconfirmto').text(data.d[3]);
                                                                                $('#lblconfirmdistance').text(data.d[4]);
                                                                                $('#lblconfirmdate').text(data.d[5]);
                                                                                $('#lblconfirmtime').text(data.d[6]);                                      
                                                                                $('#lblconfirmfare').text(data.d[7]);  
                                                                       },
                                                                       error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                                               alert(errorThrown);
                                                                           }
                                                                      
                                                                      });  
                                                        }
                                                       if(getBooked="Error")
                                                        {
                                                             $('#popup_box').hide();
                                                            $('#divDealConfirmed').hide();
                                                        }
                                                    },
                                        error: function (XMLHttpRequest, textStatus, errorThrown)
                                                 {
                                        alert(errorThrown);
                                                }
                                    });  
    
           },10000);     
}

function VehicleStatus()
{
    
}
function ShowMap()
{
    
}
function DriverRating()
{
    
}
function Complete()
{
    
}

function calOk()
  {
     $('#popup_box').fadeOut("slow");
      var requestId=$('#lblconfirmjob').text();
      var driverId=$('#lbldriverId').text();
      $.ajax({
       url: "http://115.115.159.126/ECabs/ECabs4U.asmx/SaveData",
       type:"POST",
       dataType: "Json",
       data:"{'driverId':'" +driverId+"','requestId':'"+ requestId +"'}",
       contentType: "application/json; charset=utf-8",  
       success:getResponseFromDriver ,
       error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                   alert(errorThrown);
               }
   });
  }    
   
         
    



