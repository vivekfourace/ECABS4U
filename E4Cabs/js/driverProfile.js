var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
window.onload = getProfile();

function changepassword()
{console.log('dddd');
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
    var nameis = data.d[0]+" "+data.d[1];
    $('#lblname').text(nameis);
    $('#lblLocation').text(data.d[2]);
    $('#lblLocation2').text(data.d[3]);
    $('#lblMobileNo').text(data.d[4]);
    $('#lblEmailID').text(data.d[5]);
    $('#lblPostcode').text(data.d[6]);
    
    console.log(data.d[7]);
    if(data.d[7] != undefined)
    {
       $('#vehi-regis').html(":  "+data.d[7]); 
    }
    else
    {
        $('#vehi-regis').html(":  Not allocated");
    }
    if(data.d[8] != undefined)
    {
        $('#vehi-plate').html(":  "+data.d[8]);
    }
    else
    {
        console.log('not');
        $('#vehi-plate').html(":  Not allocated");
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
                     alert("Please enter address line1.");
                     $('#txtLocation').focus();                        
                     return false;
       }
       if(!address2)
        {
                    alert("Please enter address line2.");
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
                           alert("Please enter a valid contact number.");
                            $('#txtMobileno').focus();
                            return false;
                    }
         }
        else if(phoneno.length == 0)
         {
                           alert("Please enter contact number.");
                           $('#txtMobileno').focus();
                           return false;
         }
    if(!postcode)
    {
        alert('Please enter postcode.');
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
function logout()
{
       $.cookie("remember", false);
       //$.cookie("userName", 'null');
       //$.cookie("userPassword", 'null');
        window.location = "index.html";  
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
          function seeRequest()
          {
              window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
          }
          
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
                        error: function ()
                           {
                                $('#popup_box').hide();
                                $('#divDealStart').hide(); 
                            }
                  });
              
          }

