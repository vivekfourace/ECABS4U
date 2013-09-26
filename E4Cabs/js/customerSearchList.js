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
        
         ////Ajax loader--start
         //     $('#imgLoader').bind('ajaxStart', function(){
         //         $(this).show();
         //         showDisableLayer();
         //      }).bind('ajaxStop', function(){
         //         $(this).hide();
         //          hideDisableLayer();
         //     });
         //     
         //       showDisableLayer = function() {
         //       $('<div id="loading" style="position:fixed; z-index: 2147483647; top:0; left:0; background-color: #E6E6E6; opacity:0.4;filter:alpha(opacity=0);"></div>').appendTo(document.body);
         //       $("#loading").height($(document).height());
         //       $("#loading").width($(document).width());
         //     };

         //         hideDisableLayer = function() {
         //         $("#loading").remove();
         //     };
         //   //Ajax loader--ends


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
    alert(count);
    $('#msg').append('<table style="width:100%" cellspacing="1" border="1px solid cyan">')
    .append('<thead style="background-color:LightGray;" valign="left">')
    .append('<tr>')
    .append('<th style="width:25%;height:25px">Name</th>')
    .append('<th style="width:15%">Fare</th>')
    .append('<th style="width:20%">Date</th>')
    .append('<th style="width:20%">Time</th>')
    .append('<th style="width:20%"></th>')
    .append('</tr>')
    .append('</thead>')
                   .append('<tbody>')     
                        for(var i=0; i<count; i++)
                        {
                            var driverID = data.d[i]["DriverID"];
                            var customerReqId = data.d[i]["CustomerRequestID"];
                            $('#msg').append('<tr>')
                            .append("<td width='25%' align='center'>" + data.d[i]["DriverName"] + "</td>")
                            .append("<td width='25%' align='left'>" + data.d[i]["DriverName"] +"</td>")
                            .append("<td width='25%' align='left'>" + data.d[i]["StartDate"] +"</td>")
                            .append("<td width='25%' align='left'>" + data.d[i]["StartTime"] +"</td>")
                            .append("<td width='25%' align='center'>" + '<input type="button" value="Hire" id= "'+ driverID +'" onclick = "Hireme(\''+driverID+'\',\''+customerReqId+'\'); return false;" title= "'+driverID+'" />' + "</td>")
                            .append('</tr>')
                        }
                   $('#msg').append('</tbody>')
   $('#msg').append('</table>');
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
}



