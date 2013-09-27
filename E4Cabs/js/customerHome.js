var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = getProfile();
//get customer profile
function getProfile()
{
   //alert(relatedId);
    //alert(userId);
    //alert(roleId);
var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCustomerrDetails";
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
   $('#lblname').text(data.d[0]["CustomerName"] +"  "+ data.d[0]["CustomerLastName"]);
   // $('#lbllastname').text(data.d[0]["CustomerLastName"]);
   $('#lblLocation').text(data.d[0]["Address1"]);
   $('#lblLocation2').text(data.d[0]["Address2"]);
   $('#lblMobileNo').text(data.d[0]["MobileNumber"]);
   $('#lblEmailID').text(data.d[0]["Email"]);
    
    $('#txtname').hide();
    $('#txtlastname').hide();    
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
    
     document.getElementById("trBtnUpdate").style.display = 'none';
     document.getElementById("trCancel").style.display = 'none';
     document.getElementById("tredit").style.display = 'table-row';
  //   $('#btnUpdate').hide();
  // $('#btnCancel').hide();
    
   // {
       // $("#btnCancel").button("disable")
        
//}
    
   //$('#btnUpdate').hide();
      //$('#btnhistory').show();
    
    $('#lblname').show();
     $('#lbllastname').show();
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    $('#btnEdit').show();
    
 }







//Edit Customer Profile
function EditProfile()
{
    $('#txtname' ).show(); 
     //$('#txtlastname').show();
    $('#txtLocation').show();    
    $('#txtLocation2').show();    
    $('#txtMobileno').show();    
    $('#txtEmailID').show();
    
   //  $('#btnUpdate').show();
   // $('#btnCancel').show();
    
    document.getElementById("trBtnUpdate").style.display = 'table-row';
     document.getElementById("trCancel").style.display = 'table-row';
     document.getElementById("tredit").style.display = 'none';
    //$('#btnchangepassword').show();
    
    $('#lblname').hide();
    $('#lbllastname').hide();
    $('#lblLocation').hide();
    $('#lblLocation2').hide();
    $('#lblMobileNo').hide();
    $('#lblEmailID').hide();
  $('#btnhistory').hide();
  
   // $("#btnEdit").hide();


   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCustomerrDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data){
            $('#txtname').val(data.d[0]["CustomerName"] +"  "+ data.d[0]["CustomerLastName"]); 
          //$('#txtlastname').val(data.d[0]["CustomerLastName"]);
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









//upadate customer Profile

function UpdateProfile()
{
      var name = $('#txtname').val();
     var lastname = $('#txtlastname').val();
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var email = $('#txtEmailID').val();
      var phoneno = $('#txtMobileno').val();
     var phoneno2 =/^\d{12}$/;
     var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    
    
     //validate Email address
                if(email.length > 0)
                    {
                        if(email.match(regExpEmail))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else{
                            $('#lblMsg').text("Please enter valid email address!");
                            $('#txtEmail').focus();
                            return false;
                        }
                    }
    
    
    
    //validation of Phone No
    if(phoneno.length > 0)
                    {
                        if(phoneno2.test(phoneno))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                        {
                             $('#lblMsg').text("Please enter valid phone number!");
                            $('#txtPhone').focus();
                            return false;
                        }
                    }
      
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateCustomerDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','name':'" +name+"','lname':'"+lastname+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
 });
}





//Cancel update
function CancelProfile()
{
    
    getProfile();
}





//Booked history Button
function bookedHistory()
{
  //alert(relatedId);
 
  window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}





//My Profile Button
 function myProfile()
            {
                window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            }



//Location Button
//function Location()
//{
   // window.location = "Location.html";
//}


//Logout Button
function logout()
    {
        $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";
    }




//Cab Now Button
function cabNow()
{ 
   //alert(relatedId);
   window.location ='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}



//Home
function preCab()
{
    window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Back to customer Afterlogin
function backtoCustomerhome()
{
    
       
    window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
}



//Customer Feedback 
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}





//Change Password
function changepassword()
{
   window.location='changePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}








//Back button
function backToIndex()
{
    
       
   window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}


//Pre Book Button
//function prebook()
//{
 // window.location="";  
//}
//function getAllMenu()
//{
  //  window.location="AllMenu.html";
//}




//Home
//function backtostart()
//{
   // window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
//}