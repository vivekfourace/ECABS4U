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
function ShowData(data)
{ 
    $('#vehiclecount').text(data.d.length);
    $('#trallvehicle').replaceWith("<table  id='trallvehicle' width='100%'></table>");
  for ( var i = 0; i < data.d.length; i++ ) {
    $('#lblname').text(data.d[0][0] + " " + data.d[0][1]);
    $('#lblLocation').text(data.d[0][2]);
    $('#lblLocation2').text(data.d[0][3]);
    $('#lblMobileNo').text(data.d[0][4]);
    $('#lblEmailID').text(data.d[0][5]);
    $('#lblPostcode').text(data.d[0][6]);
    var driverImgUrl = data.d[0][7];
    $('#imgDriver').attr("src",driverImgUrl);
     // var check=data.d[i][8];
      //appendString = "<option value=''>"+data.d[i][9]+"</option>";
      //$("#ddlselectedvehicle").append(appendString);
     
      //$('#ddlselectedvehicle').text(data.d[i][9]);
    if(data.d[i][8] !== undefined || data.d[i][9] !== undefined)
		{
		   $('#trallvehicle').append("<tr><td style='text-align:center;width:20%;'>" + (i+1) + "</td><td style='width:30%;text-align:left;height:20px;color:black'>" + data.d[i][8] + "</td><td style='width:25%;text-align:left;height:20px;color:black'>" + data.d[i][9] + "</td><td style='width:25%;text-align:center;height:20px;color:black'>" + data.d[i][10] + "</td></tr>"); 
		}
    else
		{
			$('#trallvehicle').html("<br/>No Vehicle Allocated.");
		}
	}
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
           		 jAlert('Please enter address line1.', 'ECabs4U-Alert');
                    // alert("Please enter address line1.");
                     $('#txtLocation').focus();                        
                     return false;
       }
       if(!address2)
        {
            		jAlert('Please enter address line2.', 'ECabs4U-Alert');
                    //alert("Please enter address line2.");
                     $('#txtLocation2').focus();                     
                    return false;
         }
     if(phoneno.length > 0)
         {
                    if(phonenoval.test(phoneno))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                    {
                        jAlert('Please enter address line2.', 'ECabs4U-Alert');
                          // alert("Please enter a valid contact number.");
                            $('#txtMobileno').focus();
                            return false;
                    }
         }
        else if(phoneno.length == 0)
         {
               		 jAlert('Please enter contact number.', 'ECabs4U-Alert');
                          // alert("Please enter contact number.");
                           $('#txtMobileno').focus();
                           return false;
         }
    if(!postcode)
    {
        jAlert('Please enter postcode.', 'ECabs4U-Alert');
        //alert('Please enter postcode.');
        $('#txtpostcode').focus();
        return false;
    }
    
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'" +relatedId+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','postcode':'" +postcode+"'}",
        contentType: "application/json; charset=utf-8",
        success: ShowData,
        error: function (XMLHttpRequest, textStatus, errorThrown){
        }
    });
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
