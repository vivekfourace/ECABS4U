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
    success: ShowData,
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
   // alert(errorThrown);
        }
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
    
    $('#lblWarning').text("");
    $('#txtname').hide(); 
    $('#txtLastname').hide();
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
     document.getElementById("trBtnUpdate").style.display = 'none';
     document.getElementById("trCancel").style.display = 'none';
     document.getElementById("tredit").style.display = 'table-row';
    
    $('#divMarquee').show();
    $('#lblname').show();
    $('#lblLastname').show();
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    $('#btnEdit').show();
    $('#btnBack').show();
  $('hr').show();
    //$('#mobno').show();
 }
//Edit The Driver Profile. It Will convert Label To text Box.
function EditProfile()
{
    $('#txtname').hide();
    $('#lblWarning').hide();
    $('#txtLastname').hide();
    $('#txtLocation').show();    
    $('#txtLocation2').show();    
    $('#txtMobileno').show();    
    $('#txtEmailID').hide();
    $('#btnBack').show();
    $('#lblname').show();
    $('#lblLastname').show();
    $('#lblLocation').hide();
    $('#lblLocation2').hide();
    $('#lblMobileNo').hide();
    $('#lblEmailID').show();
    $('#divMarquee').hide();
    $('hr').hide();
    //$('#mobno').hide();
    document.getElementById("trBtnUpdate").style.display = 'table-row';
     document.getElementById("trCancel").style.display = 'table-row';
     document.getElementById("tredit").style.display = 'none';
    //$('#btnUpdate').show();
    //$('#btnCancel').show();
    $('#btnEdit').hide();
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data){
            $('#txtname').val(data.d[0]);
            $('#txtLastname').val(data.d[1]);
            $('#txtLocation').val(data.d[2])
            $('#txtLocation2').val(data.d[3])
            $('#txtMobileno').val(data.d[4]);    
            $('#txtEmailID').val(data.d[5]);
            
            },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(errorThrown);
        }
 });
}
//Upadate the Driver profile and converted it into Label.
function UpdateProfile()
{
      var name = $('#txtname').val();
      var Lastname = $('#txtLastname').val();
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var email = $('#txtEmailID').val();
      var phoneno = $('#txtMobileno').val();
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"','name':'" +name+"','lname':'" +Lastname+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"','postcode':'" +address2+"'}",
        contentType: "application/json; charset=utf-8",
        success: ShowData,
        error: function (XMLHttpRequest, textStatus, errorThrown){
        }
    });
}
//Cancel The Edit Profile Of Driver
function CancelProfile()
{
    getProfile();
}
//Back button From Header Back to Driver Home Page.
function backToIndex()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Home Button In Footer 
function HomePage(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//My Job Button In footer Redirect To Driver Job Page.
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
//Logout From button in Footer.
function logout()
{
       $.cookie("remember", false);
       //$.cookie("userName", 'null');
       //$.cookie("userPassword", 'null');
        window.location = "index.html";  
}
//Profile Button In Footer Redirect To Driver Profile.
function MyProfilePage(){
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//History button in Footer Redirect to Driver History.
function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

//Feedback Button in  Footer Redirect to Driver Feedback.
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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

