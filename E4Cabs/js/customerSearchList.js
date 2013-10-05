var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var requestID = QString.split("=")[4].split("&")[0];

function backtosearch()
{
    window.location = 'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

 $.ajax({
   cache: false,
   beforeSend: function(){
        $('#imgLoader').show();
    },
    complete: function(){
        $('#imgLoader').hide();
    },  
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetResponseData",
    type:"POST",
    dataType: "Json",
    data:"{'requestID':'" +requestID+"'}",
    contentType: "application/json; charset=utf-8",  
    success: getData,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
     }
  });

function getData(data)
{
    
    var count = data.d.length;
    if(count > 0)
    {
            $('#divDriverList').show();    
            var html = '<table width="120%" style="border-collapse:collapse">';
            html += '<div style="background-color:yellow;"><i style="font:bold;font-size:16px;color:Blue;"><i></div>'
            html += '<thead style="background-color:#D8DCBB;color:darkblue;">';
            html += '<tr>';
            html += '<th >Fare</th>';
            html += '<th >Date</th>';
            html += '<th >Time</th>';
            html += '<th >Job</th>';
            html += '<th >Specs</th>';
            html += '<th >ETA</th>';
            html += '<th ></th>';
            html += '</tr>';
            html += '</thead>';
                           html +='<tbody class="body-style">';  
                                for(var i=0; i<count; i++)
                                {
                                   var driverID = data.d[i]["DriverID"];
                                   var customerReqId = data.d[i]["CustomerRequestID"];
                                   var driverName=data.d[i]["DriverName"];
                                   var spec=data.d[i]["OtherSpecReq"];
                                   var searchTime=data.d[i]["SearchTime"]; 
                                   
                                   var tm=searchTime.split(" ");
                                   alert(tm[1]);
                                   var min=tm[1].split(":");
                                   var sh=min[0];
                                   var sm=min[1];
                                    var a=10;
                                    
                                   var em=parseInt(sm)+a;
                                    alert(em);
                                   var ss=min[2];
                                    
                                   $('#lblsearch').text(tm[1]);
                                    $('#lblexp').text(sh+":"+ em +":"+ss);
                                  // var expTime=searchTime+10;
                                   var bidTime=data.d[i]["BidTime"]; 
                                     var bid=bidTime.split(" ");
                                    $('#lblbid').text(bid[1]);
                                    $('#lblpick').text(bid[1]);
                                    alert(bid[1]);
                                    
                                    //var pickTime=bidTime+3;lblsearch,lblexp,lblbid,lblpick
                                    if(spec!=null)
                                    {
                                           html += '<tr>';
                                           html += "<td width='20%' align='center'>" +'<img src="img/euro.png"width="5" height="5" style="padding-left:3%;"/>' + data.d[i]["Comments"] +"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["StartDate"] +'<a href="#" class="pulse" style="color:blue;" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>'+"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["StartTime"] +"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] +"</td>";
                                           html += "<td width='20%' align='center'>" + '<img src="img/spec.png" class="pulse" width="15" height="15" style="color:grey;" onclick="SpecShow()"/>' +"</td>"; 
                                           html += "<td width='20%' align='center'>" + tm[1]+"</td>";
                                           html += "<td width='20%' align='center'>" + '<input type="button"  value="Hire" id= "'+ driverID +'" onclick = "Hireme(\''+driverID+'\',\''+customerReqId+'\');" title= "Hire me" />' + "</td>";
                                           html += '</tr>';
                                        $('#txtothereSpecialReq').text(spec);
                                    }
                                   if(spec==null)
                                    {
                                            html += '<tr>';
                                           html += "<td width='30%' align='center'>" +'<img src="img/euro.png"width="5" height="10" style="padding-left:2%;"/>' + data.d[i]["Comments"] +"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["StartDate"] +'<a href="#" style="color:blue;" class="pulse" onclick="showExpiry()">(Exp)</a>' + '<a href="#" style="color:blue;" class="pulse" onclick="showBid()">(Bid)</a>'+"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["StartTime"] +"</td>";
                                           html += "<td width='20%' align='center'>" + data.d[i]["CustomerRequestID"] +"</td>";
                                           html += "<td width='20%' align='center'>" + '<img src="img/spec.png" width="15" height="15" style="color:grey;" onclick="SpecShow()"/>' +"</td>"; 
                                           html += "<td width='20%' align='center'>" + bid[1] +"</td>";
                                           html += "<td width='20%' align='center'>" + '<input type="button"  value="Hire" id= "'+ driverID +'" onclick = "Hireme(\''+driverID+'\',\''+customerReqId+'\');" title= "Hire me" />' + "</td>";
                                           html += '</tr>'; 
                                         $('#txtothereSpecialReq').text("Not Available");
                                    }
                                  
                                }
                           html +='</tbody>';
               html +='</table>';
               $('#msg').append(html);
     }
    else
    {
      $('#divDriverList').hide();  
    }
}

function showExpiry()
{
    $('#popup_box').fadeIn("slow");
    $('#popupBoxClose').show();
    $('#divBiding').hide();
    $('#divExpiry').show(); 
    $('#lblsearch').text();
    $('#lblexp').text();
    $('#divDealConfirmed').hide();
    $('#divspec').hide();
}
function showBid()
{
    $('#popup_box').fadeIn("slow");
    $('#popupBoxClose').show();
    $('#divBiding').show();
    $('#divExpiry').hide(); 
    $('#lblbid').text();
    $('#lblpick').text();
    $('#divDealConfirmed').hide();
    $('#divspec').hide();
}
function closeExpiry()
{
   $('#popup_box').fadeOut("slow");
   $('#divExpiry').hide(); 
}
function closeBid()
{
    $('#popup_box').fadeOut("slow");
    $('#divBiding').hide();
}
//specia req pop up divExpiry divBiding closeExpiry closeBid
function SpecShow()
{
    $('#popup_box').fadeIn("slow");
    $('#popupBoxClose').show();
    $('#divDealConfirmed').hide();
    $('#divspec').show();
    
}
//close the pop up spec 
function specClose()
{
    
                     
                    $('#popup_box').fadeOut("slow");
                    $('#divspec').hide();
 }              
// hire me response send to driver 
function Hireme(driID, reqID)
{
    $('#driID').attr('disabled', true);
    
    //this.disabled=true;
    var driverId = driID;
    var requestId = reqID;
    $.ajax({
       cache: false,
       beforeSend: function(){
            $('#imgLoader').show();
        },
        complete: function(){
            $('#imgLoader').hide();
        }, 
       url: "http://115.115.159.126/ECabs/ECabs4U.asmx/HireDriverResponse",
       type:"POST",
       dataType: "Json",
       data:"{'driverId':'" +driverId+"','requestId':'"+ requestId +"'}",
       contentType: "application/json; charset=utf-8",  
       success:getResponseFromDriver ,
       error: function (XMLHttpRequest, textStatus, errorThrown)
                {
               }
   });
}

function getResponseFromDriver(data)
{
    window.setInterval(function(){
        $.ajax({
                                cache: false,
                       beforeSend: function(){
                            $('#imgLoader').show();
                        },
                        complete: function(){
                            $('#imgLoader').hide();
                        }, 
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
                                                        cache: false,
                                                        beforeSend: function(){
                                                             $('#imgLoader').show();
                                                         },
                                                         complete: function(){
                                                             $('#imgLoader').hide();
                                                         }, 
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
                                                            }
                                                       
                                                       });  
                                         }
                                         else
                                         {
                                             $('#divDeal').hide();
                                         }
                                     },
                         error: function (XMLHttpRequest, textStatus, errorThrown)
                                  {
                                 }
                     });  
        
    },60000);
}

function VehicleStatus()
{
    
}
function ShowMap()
{
    var from = $('#lblconfirmfrom').val();
    var to = $('#lblconfirmto').val();
    //var loc2=$('#txt2location').val();
    var loc2 = "";
    //var dis = "none";
    window.location =  'Location.html?id='+from+'&rid='+to+'&rrid='+loc2; 
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
       cache: false,
       beforeSend: function(){
            $('#imgLoader').show();
        },
        complete: function(){
            $('#imgLoader').hide();
        }, 
       url: "http://115.115.159.126/ECabs/ECabs4U.asmx/SaveData",
       type:"POST",
       dataType: "Json",
       data:"{'driverId':'" +driverId+"','requestId':'"+ requestId +"'}",
       contentType: "application/json; charset=utf-8",  
       success:function(data)
          {
              
          },
       error: function (XMLHttpRequest, textStatus, errorThrown)
                {
               }
   });
  }  












//From Menu 

//Logout Button
function logout()
    {
        $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";
    }

//cab Now Button
function cabNow()
{ 
   window.location ='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Customer Feedback 
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Booked History
function bookedHistory()
{
 //alert(relatedId);
  window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//from Menu
//Home Button
function preCab()
{
   window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
} 



//My Profile Button
 function myProfile()
            {
                
                window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            } 
