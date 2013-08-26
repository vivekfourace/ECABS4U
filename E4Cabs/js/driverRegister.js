function UploadImage()
{
     if (raghu.PostedFile != null) {
         
             raghu.PostedFile.SaveAs("C:\Users\Anil.Muchenthula\Desktop\Uploads");
             
          
         }
  var img2=document.getElementById('raghu');   
 var imginKB= Math.ceil(img2.files[0].size/1024);
      // alert(raghu.value);
    alert(imginKB);
    
    
   //\\uploadedfile.txt
}
function RegisterDriver()
{
    var name =$('#txtname').val();
    var name2 =$('#txt9').val();
    var email =$('#txtemail').val();
    var mobNo =$('#txtmobile').val();
    var Add1 =$('#txtaddress1').val();
    var Add2 =$('#txtaddress2').val();
    var post =$('#txtpostcode').val();
    var password =$('#txtpassword').val();
    var Cpassword =$('#txtCpass').val();
    var User =$('#txtusername').val();
     var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    var phoneno =/^\d{12}$/;
      var img2=document.getElementById('raghu').value; 
    //var validate=document.getElementById('MAX_FILE_SIZE').value;
    
                 
   //validate Name
                if(name.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(name.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the First name");
                    return false;
                 }
               if(name2.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(name2.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Last name");
                    return false;
                 }
    
  //validate Email address
               if(email.length > 0)
                    {
                        if(email.match(regExpEmail))
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else{
                            $('#lblRequiredField').text("*Please enter a valid Email address");
                            return false;
                        }
                    }
                else if(email.length == 0)
                {
                    $('#lblRequiredField').text("*Please enter the Email Address");
                    return false;
                }
    //validate User ID
     if(User.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(User.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the User ID");
                    return false;
                 }

 //validate Password
    if(password.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(password.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter password");
                    return false;
                 }
    
                if(Cpassword.length > 0)
                    {
                        if(password == Cpassword)
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else
                        {
                            $('#lblRequiredField').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(Cpassword.length == 0)
                    {
                        $('#lblRequiredField').text("*Please enter the ConfirmPassword");
                        return false;
                    }
    
    //validate Phone number.
               if(mobNo.length > 0)
                    {
                        if(phoneno.test(mobNo))
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else
                        {
                             $('#lblRequiredField').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(mobNo.length == 0)
                {
                     $('#lblRequiredField').text("*Please enter the phone number");
                    return false;
                }
    
    //Validate Address.
               if(Add1.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Add1.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Address1");
                    return false;
                 }
                 
                 
                 
                if(Add2.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Add2.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Address2");
                    return false;
                 }
            
     //Validate Postcode
               
                 if(post.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(post.length == 0)
                 {
                     $('#lblRequiredField').text("*Please Fill the Postcode");
                    return false;
                 }
    
                 
                 $.ajax({
                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterDriver",
                      type:"POST",
                     datatype:"json",
                     //data:"{'fname':'"+name+"','lname':'"+name2+"''email':'"+email+"','contactNumber':'"+mobNo+"','password':'"+password+"','address1':'"+Add1+"','address2':'"+Add2+"','postcode':'"+post+"'}",
                     data:"{'fname':'"+name+"','lname':'"+name2+"','email':'"+email+"','userID':'"+User+"','password':'"+password+"','contactNumber':'"+mobNo+"','address1':'"+Add1+"','address2':'"+Add2+"','postcode':'"+post+"','image':'"+img2+"'}",
                     contentType: "application/json; charset=utf-8",
                      success: OnValidate,
                     
                     
                    //success: function(data)
                     //{
                         //alert("WELCOME!");
                         
                          // $('#txt1').val('');
                         //  $('#txt2').val('');
                          // $('#txt3').val('');
                          // $('#txt4').val('');
                          // $('#txt5').val('');
                           //$('#txt6').val('');
                           //$('#txt7').val('');
                           //$('#txt8').val('');
                         
                     //},
                     error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                 alert(errorThrown);
                     }
                     
                 });
             }
function OnValidate(data)
{
    if(data.d =="false")
    {
        $("#link2").show();
        $('#lblMessage').text("Username already exist, enter another name!");
        $('#lblMessage').css("color","red");
    }
    else
    {
        $("#link2").show();
        $('#lblMessage').text("Registration successful,");
        $('#lblMessage').css("color","green");
        $("#link1").show();
                       $('#txtname').val('');
                          $('#txt9').val('');
                          $('#txtemail').val('');
                         $('#txtmobile').val('');
                          $('#txtaddress1').val('');
                         $('#txtaddress2').val('');
                           $('#txtpostcode').val('');
                           $('#txtpassword').val('');
                           $('#txtCpass').val('');
                            $('#txtusername').val('');
    }
}
function Backtoadmin()
{
    window.location="Admin.html";
}
    