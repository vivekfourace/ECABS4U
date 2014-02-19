function Registercustomer()
{
    console.log("I am in Register");
    var txt1 =$('#txtFirstName').val();
    var txt2 =$('#txtLastName').val();
    var txt3 =$('#txtPhone').val();
    var txt4 =$('#txtEmail').val();
    //var txt5 =$('#txtPost').val();
    var txt6 =$('#txtUserName').val();
    var txt7 =$('#txtPassword').val();
    var txt8 =$('#txtConfirmPassword').val();
    var phoneno =/^\d{11}$/;
    var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    //var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    
      if(!txt1)
       {
                     $('#lblMsg').text("Please enter your first name.");
                     $('#txtFirstName').focus();                        
                     return false;
       }
       if(!txt2)
        {
                     $('#lblMsg').text("Please enter your last name.");
                     $('#txtLastName').focus();                     
                    return false;
         }
        if(txt3.length > 0)
         {
                    if(phoneno.test(txt3))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                    {
                            $('#lblMsg').text("Please enter a valid contact number.");
                            $('#txtPhone').focus();
                            return false;
                    }
         }
        else if(txt3.length == 0)
         {
                           $('#lblMsg').text("Please enter a contact number.");
                           $('#txtPhone').focus();
                           return false;
         }
    
        if(txt4.length > 0)
         {
                  if(txt4.match(regExpEmail))
                     {
                           $('#lblMsg').text(" ");
                     }
                  else
                     {
                            $('#lblMsg').text("Please enter a valid email address.");
                            $('#txtEmail').focus();
                            return false;
                     }
        }
       else if(txt4.length == 0)
        {
                    $('#lblMsg').text("Please enter a email address.");
                    $('#txtEmail').focus();
                    return false;
       }
      if(!txt6)
       {
                     $('#lblMsg').text("Please enter username.");
                     $('#txtUserName').focus();
                    return false;
       }
     if(txt7.length > 0)
       {
           if(txt7.length >= 8 && txt7.length <= 20)
           {
              return true;
           }
           else
           {
               $('#lblMsg').text("Password must be in between 8 to 20 characters.");
               $('#txt7').focus();
               return false;
           }                        
       }
     else
       {
           $('#lblMsg').text("Please enter your password.");
           $('#txtPassword').focus();
           return false;
       }
     if(txt8.length > 0)
      {
           if(txt7 == txt8)
           {
               $('#lblMsg').text(" ");
           }
           else
           {
               $('#lblMsg').text("Password mismatch.");
               $('#txtPassword').focus();
               $('#txtPassword').val("");
               $('#txtConfirmPassword').val("");
               return false;
           }
     }
    else if(txt8.length == 0)
    {
                        $('#lblMsg').text("Please enter confirm password.");
                        $('#txtConfirmPassword').focus();
                        return false;
    }
    $.ajax({
             cache: false,
             beforeSend: function(){
                  $('#imgLoader').show();
              },
              complete: function(){
                  $('#imgLoader').hide();
              },
             url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterCustomer",
             type: "POST",
             dataType: "json",
             data: "{ 'fname': '" + txt1 + "','lname': '" + txt2 + "','email': '" + txt4 + "','userID': '" + txt6 + "','password': '" + txt7 + "','contactNumber': '" + txt3 + "'}",
             contentType: "application/json; charset=utf-8",
             success: CheckData,
             error: function (XMLHttpRequest, textStatus, errorThrown) 
             {
           }
     });    
}

function CheckData(data)
{    
    if(data.d == "true")
    {
       var timeOut = 5;
       setInterval(function() {  
           $('#divcustomerreg').hide();
            document.getElementById('divSucessfulcustomer').innerHTML= "Registration successful.";
           document.getElementById('divMsgcustomer').innerHTML=  "Please wait " + --timeOut + "s for login screen.";  
           if(timeOut <= 0)
           {
               window.location = "index.html";
           }
       }, 1000);
    }    
    else
    {
       $('#lblMsg').text(data.d);
       $('#lblMsg').css("color","#D70007");
       $('#lblMsg').css("font-size","13");
    }
}
function backToIndex()
{
    window.location="index.html";
}
