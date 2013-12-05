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
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
           //alert(errorThrown.message);
                }
         });
}


function ShowData(data)
{ 
         $('#lblname').text(data.d[0] +"  "+ data.d[1]);
         // $('#lbllastname').text(data.d[0]["CustomerLastName"]);
         $('#lblLocation').text(data.d[2]);
         $('#lblLocation2').text(data.d[3]);
         $('#lblMobileNo').text(data.d[4]);
         $('#lblEmailID').text(data.d[5]);
          
          $('#txtname').hide();
          $('#txtlastname').hide();    
          $('#txtLocation').hide();    
          $('#txtLocation2').hide();    
          $('#txtMobileno').hide();    
          $('#txtEmailID').hide();
          
          document.getElementById("trBtnUpdate").style.display = 'none';
          document.getElementById("trCancel").style.display = 'none';
          document.getElementById("tredit").style.display = 'table-row';
          
          $('#lblname').show();
          $('#lbllastname').show();
          $('#lblLocation').show();
          $('#lblLocation2').show();
          $('#lblMobileNo').show();
          $('#lblEmailID').show();
          $('#btnEdit').show();
          $('hr').show();
 }

//Edit Customer Profile
function EditProfile()
{
          $('#txtname' ).show(); 
          $('#txtLocation').show();    
          $('#txtLocation2').show();    
          $('#txtMobileno').show();    
          $('#txtEmailID').show();
          $('hr').hide();
          document.getElementById("trBtnUpdate").style.display = 'table-row';
          document.getElementById("trCancel").style.display = 'table-row';
          document.getElementById("tredit").style.display = 'none';
          $('#lblname').hide();
          $('#lbllastname').hide();
          $('#lblLocation').hide();
          $('#lblLocation2').hide();
          $('#lblMobileNo').hide();
          $('#lblEmailID').hide();
          $('#btnhistory').hide();
          var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetCustomerrDetails";
          $.ajax(url,{
              type:"POST",
              dataType: "Json",
              data:"{'userID':'" +relatedId+"'}",
              contentType: "application/json; charset=utf-8",                     
              success: function(data){
                  $('#txtname').val(data.d[0] +"  "+ data.d[1]); 
                  $('#txtLocation').val(data.d[2])
                  $('#txtLocation2').val(data.d[3])
                  $('#txtMobileno').val(data.d[4]);    
                  $('#txtEmailID').val(data.d[5]);
                  
                  },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
             
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
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateCustomerDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','name':'" +name+"','lname':'"+lastname+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
           
        }
     });
}

function CancelProfile()
{
    
    getProfile();
}

function bookedHistory()
{
  window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
 function myProfile()
 {
     window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }

function logout()
    {
       $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
     }); 
        $.cookie("remember", false);
        //$.cookie("userName", 'null');
        //$.cookie("userPassword", 'null');
        window.location = "index.html";  
    }

function cabNow()
{ 
   window.location='CustomerCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function preCab()
{
    window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function backtoCustomerhome()
{
    window.location =  'customerAfterLogin.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
function changepassword()
{
   window.location='CustomerChangePassword.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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