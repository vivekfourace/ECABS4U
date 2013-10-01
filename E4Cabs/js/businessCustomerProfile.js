var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


window.onload = getProfile();

function changepassword()
{
   window.location='changePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}



//get customer profile
function getProfile()
{
   
var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetBusinessCustomerrDetails";
$.ajax(url,{
    type:"POST",
    dataType: "Json",
    data:"{'userID':'" +relatedId+"'}",
    contentType: "application/json; charset=utf-8",                     
    success: ShowData,
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //alert(errorThrown);
        }
 });
}


function ShowData(data)
{ 
   
   $('#lblBusinessNam').text(data.d[0])
   $('#lblname').text(data.d[1] +"  "+ data.d[2]);
   // $('#lbllastname').text(data.d[0]["CustomerLastName"]);
   $('#lblLocation').text(data.d[3]);
   $('#lblLocation2').text(data.d[4]);
   $('#lblMobileNo').text(data.d[5]);
   $('#lblEmailID').text(data.d[6]);
    
    $('#txtname').hide();
    $('#txtlastname').hide();    
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
    $('#txtBusinessNam').hide();
    
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
    $('#lblBusinessNam').show();
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
    $('#txtBusinessNam').show();
    $('#txtname').show(); 
    $('#txtlastname').show();
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
    $('#lblBusinessNam').hide();
    
  
   // $("#btnEdit").hide();
    
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetBusinessCustomerrDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data){
            $('#txtBusinessNam').val(data.d[0])
            $('#txtname').val(data.d[1]);
            $('#txtlastname').val(data.d[2]);
            $('#txtLocation').val(data.d[3])
            $('#txtLocation2').val(data.d[4])
            $('#txtMobileno').val(data.d[5]);    
            $('#txtEmailID').val(data.d[6]);
            },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(errorThrown);
        }
 });
}




//upadate customer Profile

function UpdateProfile()
{
   
      var businessNam = $('#txtBusinessNam').val();
      var name = $('#txtname').val();
      var lastname = $('#txtlastname').val();
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var email = $('#txtEmailID').val();
      var phoneno = $('#txtMobileno').val();
     var phoneno2 =/^\d{12}$/;
     var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
     //alert("insidw");
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
      
     var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateBusinessCustomerDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "json",
            data:"{'userID':'"+relatedId+"','businessName':'"+businessNam+"','name':'"+name+"','lname':'"+lastname+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
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
 
  window.location='businessCustomerHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
   
}





//My Profile Button
 function myProfile()
            {
                window.location =  'businessCustomerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            }



//Location Button
//function Location()
//{
   // window.location = "Location.html";
//}


//Cab Now Button
function cabNow()
{ 
   //alert(relatedId);
   window.location ='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Logout button

function logout()
{
        $.cookie("remember", 'null');
        $.cookie("userName", 'null');
        $.cookie("pass", 'null');
        window.location = "index.html";
}


//Home
function Home()
{
    window.location='businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}





//Customer Feedback 
function feedBack()
{
    window.location='businessCustomerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//Change Password
function changepassword()
{
   window.location='changePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}

// Back Button
function backtostart()
{
   window.location =  'businessCustomerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
//Back to customer Afterlogin
//function backtoCustomerhome()
//{
    
    // window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
//}



//Home
//function backtostart()
//{
    //window.location="index.html";
//}
