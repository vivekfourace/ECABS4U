var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
window.onload = getProfile();

document.addEventListener("deviceready",onDeviceReady, false);
function onDeviceReady()
{
    console.log("device is ready");
}

function changepassword()
{
   console.log('dddd');
   window.location='DriverChangePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function getProfile()
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json", 
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: ShowData   
       
     });
}
var myVehicles ="";
function ShowData(data)
{ 
    var RegistrationNo="", PlateNo ="", Capacity ="", vehImgUrl ="", vehAllocatedID ="", isAuthorised = "false";
    $('#vehiclecount').text(data.d.length);
    
    myVehicles += "<table  id='trallvehicle' width='100%'>";
    for ( var i = 0; i < data.d.length; i++ ) 
    {
        $('#lblname').text(data.d[0][0] + " " + data.d[0][1]);
        $('#lblLocation').text(data.d[0][2]);
        $('#lblLocation2').text(data.d[0][3]);
        $('#lblMobileNo').text(data.d[0][4]);
        $('#lblEmailID').text(data.d[0][5]);
        $('#lblPostcode').text(data.d[0][6]);
        var driverImgUrl = data.d[0][7];
        $('#imgDriver').attr("src",driverImgUrl);
  
        
        if(data.d[i][8] !== undefined || data.d[i][9] !== undefined)
    		{
               RegistrationNo = data.d[i][8];
               PlateNo = data.d[i][9];
               Capacity = data.d[i][10];
    		   vehImgUrl = data.d[i][11];
               vehAllocatedID = data.d[i][12];
               isAuthorised = data.d[i][13]; 
                
               myVehicles += "<tr>";
               myVehicles += "<td style='text-align:center;width:7%;'>" + (i+1) + "</td>";
               myVehicles += "<td style='width:20%;text-align:center;height:20px;color:black'><img style='height:45px;width:40px;border-radius:4px' alt='vehImage' src='" + vehImgUrl + "' /></td>";
               myVehicles += "<td style='width:20%;text-align:left;height:20px;color:black'>" + RegistrationNo + "</td>";
               myVehicles += "<td style='width:20%;text-align:center;height:20px;color:black'>" + PlateNo + "</td>";
               myVehicles += "<td style='width:8%;text-align:center;height:20px;color:black'>" + Capacity + "</td>";
               myVehicles += "<td style='width:25%;text-align:center;height:20px;color:black'> ";
               if(isAuthorised === "false" || isAuthorised === "False")
               {
                  
                 myVehicles += '<input type="button"  value="Select"  style="float:right; background-color:#0E8BB3;color:white;height:25px;width:100%;font-size:17px!important;border: 1px solid #088A29;font-family:Calibri;border-radius:1px!important;outline:none!important;" onclick="SelectVehicle(\''+vehAllocatedID+'\')"/></td>';  
               } 
                else
                {
                    
                }
               myVehicles += "</tr>"; 
            }
        else
    		{
    			myVehicles += "<tr><td><br/>No Vehicle Allocated.</td></tr>";
    		}
       
	}
    myVehicles += "</table>";
    $('#trallvehicle').append(myVehicles) ;
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtpostcode').hide();   
    
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    $('#lblPostcode').show();
   
    $("#trBtnUpdate").hide();
    $('#btnEdit').show();
   
 }

function SelectVehicle(vehAllocatedID)
{
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/SelectVehicleABC";
    $.ajax(url,{
        type:"POST",
        dataType: "Json", 
        data:"{'vehAllocatedID':'" +vehAllocatedID+"','relatedId':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
            if(data.d !== ""){
                var selectedVehicleName = data.d;
                navigator.notification.alert(
                "You have selected " + selectedVehicleName + " to drive.",
                confirmVehicle,
                'ECABS4U',
                "OK"
                );
                function confirmVehicle()
                {
                   window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;	      
                }                
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
     });
}

function EditProfile()
{   
    var location =$('#lblLocation').text();
    var loc2 = $('#lblLocation2').text();
    var mobile = $('#lblMobileNo').text();
    var post  = $('#lblPostcode').text();
    
    $('#txtLocation').show();    
    $('#txtLocation2').show();    
    $('#txtMobileno').show();
    $('#txtpostcode').show();
    
    $('#txtLocation').val(location);
    $('#txtLocation2').val(loc2);
    $('#txtMobileno').val(mobile);
    $('#txtpostcode').val(post);
  
    $('#lblLocation').hide();
    $('#lblLocation2').hide();
    $('#lblMobileNo').hide();
    $('#lblPostcode').hide();
  
    $("#trBtnUpdate").show();
    $('#btnEdit').hide();
}

function UpdateProfile()
{
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var phoneno = $('#txtMobileno').val();
      var postcode = $('#txtpostcode').val();    
      var phonenoval =/^\d{11}$/;

     if(!address1)
       {
           		 jAlert('Please enter address line1.', 'ECABS4U');
                     $('#txtLocation').focus();                        
                     return false;
       }
       if(!address2)
        {
            		jAlert('Please enter address line2.', 'ECABS4U');
                     $('#txtLocation2').focus();                     
                    return false;
         }
    if(phoneno.length > 0)
         {
                    if(phonenoval.test(phoneno))
                        {
                            
                        }
                        else
                    {
                         jAlert('Please enter a valid Mobile number.', 'ECABS4U');
                             return false;
        
                           
                    }
         }
        else if(phoneno.length == 0)
         {
               		 jAlert('Please enter contact number.', 'ECABS4U');
                           $('#txtMobileno').focus();
                           return false;
         }
    if(!postcode)
    {
        jAlert('Please enter postcode.', 'ECABS4U');
        $('#txtpostcode').focus();
        return false;
    }
    
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'" +relatedId+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','postcode':'" +postcode+"'}",
        contentType: "application/json; charset=utf-8",
        success: ShowData2,
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
        }
    });
}


function ShowData2(data)
{
    getProfile();
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


function CancelProfile()
{
    var location =$('#txtLocation').val();
    var loc2 = $('#txtLocation2').val();
    var mobile = $('#txtMobileno').val();
    var post  = $('#txtpostcode').val();
    
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();
    $('#txtpostcode').hide();
    
    $('#lblLocation').val(location);
    $('#lblLocation2').val(loc2);
    $('#lblMobileNo').val(mobile);
    $('#lblPostcode').val(post);
  
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblPostcode').show();
  
    $("#trBtnUpdate").hide();
    $('#btnEdit').show();
}
function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function HomePage(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function MyProfilePage(){
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
} 
