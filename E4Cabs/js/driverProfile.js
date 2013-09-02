var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
 var mobno =/^\d{12}$/;

window.onload = getProfile();

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
    alert(errorThrown);
        }
 });
}

function ShowData(data)
{ 
   $('#lblname').text(data.d[0]["DriverName"]);
   $('#lblLastname').text(data.d[0]["DriverLastName"]);    
   $('#lblLocation').text(data.d[0]["Address1"]);
   $('#lblLocation2').text(data.d[0]["Address2"]);
   $('#lblMobileNo').text(data.d[0]["MobileNumber"]);
   $('#lblEmailID').text(data.d[0]["Email"]);
    
    $('#lblWarning').text("");
    $('#txtname').hide(); 
    $('#txtLastname').hide();
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
    $('#btnUpdate').hide();
    $('#btnCancel').hide();
    
    
    $('#lblname').show();
    $('#lblLastname').show();
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    $('#btnEdit').show();
    $('#btnBack').show();
 }

function EditProfile()
{
    $('#txtname').show();
    $('#lblWarning').show();
    $('#txtLastname').show();
    $('#txtLocation').show();    
    $('#txtLocation2').show();    
    $('#txtMobileno').show();    
    $('#txtEmailID').show();
    $('#btnBack').hide();
    $('#lblname').hide();
    $('#lblLastname').hide();
    $('#lblLocation').hide();
    $('#lblLocation2').hide();
    $('#lblMobileNo').hide();
    $('#lblEmailID').hide();
    $('#btnUpdate').show();
    $('#btnCancel').show();
    $('#btnEdit').hide();
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDriverDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data){
            $('#txtname').val(data.d[0]["DriverName"]);
            $('#txtLastname').val(data.d[0]["DriverLastName"]);
            $('#txtLocation').val(data.d[0]["Address1"])
            $('#txtLocation2').val(data.d[0]["Address2"])
            $('#txtMobileno').val(data.d[0]["MobileNumber"]);    
            $('#txtEmailID').val(data.d[0]["Email"]);
            
            },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
        }
 });
}

function UpdateProfile()
{
      var name = $('#txtname').val();
      var Lastname = $('#txtLastname').val();
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var email = $('#txtEmailID').val();
      var phoneno = $('#txtMobileno').val();
 
    
    //Name validation
    
     if(name.length > 0)
                    {
                        $('#txtname').text(" ");
                    }
                else if(name.length == 0)
                 {
                     $('#lblWarning').text("*Please enter the First name");
                    return false;
                 }
               if(Lastname.length > 0)
                    {
                        $('#txtLastname').text(" ");
                    }
                else if(Lastname.length == 0)
                 {
                     $('#lblWarning').text("*Please enter the Last name");
                    return false;
                 }
    
    //Address Validation
     if(address1.length > 0)
                    {
                        $('#txtLocation').text(" ");
                    }
                else if(address1.length == 0)
                 {
                     $('#lblWarning').text("*Please enter the Address1");
                    return false;
                 }
    
               if(address2.length > 0)
                    {
                        $('#txtLocation2').text(" ");
                    }
                else if(address2.length == 0)
                 {
                     $('#lblWarning').text("*Please enter the Address2");
                    return false;
                 }
    
    // Email Validation
    
     if(email.length > 0)
                    {
                        if(email.match(regExpEmail))
                        {
                            $('#txtEmailID').text(" ");
                        }
                        else{
                            $('#lblWarning').text("*Please enter a valid Email");
                            return false;
                        }
                    }
                else if(email.length == 0)
                {
                    $('#lblWarning').text("*Please enter the Email");
                    return false;
                }
    
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateDriverDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','name':'" +name+"','lname':'" +Lastname+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"','postcode':'" +address2+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
 });
}

function CancelProfile()
{
    getProfile();
}

function BackToProfile()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

