//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = getProfile();
//get customer profile
function getProfile()
{
        var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCustomerrDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) { }
         });
}

function ShowData(data)
{ 
          $('#lblname').text(data.d[0] +" "+ data.d[1]);    
          $('#lblMobileNo').text(data.d[2]);
          $('#lblEmailID').text(data.d[3]);
    
          $('#txtname').hide();
          $('#txtlastname').hide();            
          $('#txtMobileno').hide();   
          $('#txtEmailID').hide();          
          document.getElementById("trBtnUpdate").style.display = 'none';
          
          $('#lblname').show();         
          $('#lblMobileNo').show();
          $('#lblEmailID').show();
          $('#btnEdit').show();
 }

function EditProfile()
{
          var fullname = $('#lblname').text();
          var namearray = fullname.split(" ");
    
          var name = namearray[0];
          var lastname = namearray[1];         
          var mobile = $('#lblMobileNo').text();
          var email = $('#lblEmailID').text();

          $('#txtname' ).val(name);
          $('#txtlastname' ).val(lastname);    
          $('#txtMobileno').val(mobile)
          $('#txtEmailID').val(email);

          $('#txtname' ).show();         
          $('#txtMobileno').show();    
          $('#txtEmailID').show();
          $('#txtlastname').show();
    
          $('#btnEdit').hide();
          document.getElementById("trBtnUpdate").style.display = 'table-row';     
     
          $('#lblname').hide();    
          $('#lblMobileNo').hide();
          $('#lblEmailID').hide(); 
}

//update customer Profile
function UpdateProfile()
{
    var name = $('#txtname').val();    
    var lastname = $('#txtlastname').val();
    var email = $('#txtEmailID').val();
    var phoneno = $('#txtMobileno').val();
    var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
     
    if(name.length == 0)
    {  jAlert('Please enter your name.', 'ECabs4U-Alert');
        return false;
    }
    var phoneno2 =/^\d{11}$/;
    
    if(phoneno.length > 0)
    {
        if(phoneno2.test(phoneno))
        { }
        else
        {
        jAlert('Please enter a valid Mobile number.', 'ECabs4U-Alert');
         return false;
        }
    }
    else if(phoneno.length === 0)
    {
        jAlert('Please enter contact number.', 'ECabs4U-Alert');
        return false;
    }
    if(phoneno.length === 0)
    {
        jAlert('Please enter contact number.', 'ECabs4U-Alert');
        return false;
    }
    else if(phoneno.length < 11)
    {
        jAlert('Please enter a valid contact number.', 'ECabs4U-Alert');
        return false;
    }
    
    if(email.length > 0)
    {
        if(email.match(regExpEmail))
        {
           
        }
        else
        {
            jAlert('Please enter a valid email address.', 'ECabs4U-Alert');
            return false;
        }
    }
    else if(email.length == 0)
    {
        jAlert('Please enter email address.', 'ECabs4U-Alert');
        return false;
    }
    $.ajax({
        url:"http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateCustomerDetails",
        type:"post",
        dataType:"Json",
        data:"{'relatedId':'" +relatedId+"','name':'"+name+"','lastname':'"+lastname+"','email':'" +email+"','phoneno':'" +phoneno+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: ShowData,            
        error: function (XMLHttpRequest, textStatus, errorThrown) { }
   });
}

function CancelProfile()
{
    var name = $('#txtname' ).val();
    var lastname = $('#txtlastname' ).val()
    var contact = $('#txtMobileno').val()
    var email = $('#txtEmailID').val();
    $('#lblname').val(name+lastname);   
    $('#lblMobileNo').val(contact);
    $('#lblEmailID').val(email);
    
    $('#lblname').show();    
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    
    $('#txtname' ).hide();         
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
    $('#txtlastname').hide();
    
    $('#btnEdit').show();    
    $("#trBtnUpdate").hide();
}
function backToIndex()
{   
   window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}
function changepassword()
{
   window.location='CustomerChangePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


function searchpage()
{
    window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function myProfile()
 {
     window.location = 'customerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }
function myBooking()
{ 
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function bookedHistory()
{
  window.location = 'CustomerHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}