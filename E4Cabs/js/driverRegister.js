function UploadImage()
{
    
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
    var phoneno =/^\d{11}$/;
    var img2="a";
      //var img2=document.getElementById('raghu').value; 
    //var validate=document.getElementById('MAX_FILE_SIZE').value;
    
                 
   //validate Name
                if(name.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(name.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter the first name.");
                    return false;
                 }
               if(name2.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(name2.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter the fast name.");
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
                            $('#lblRequiredField').text("Please enter a valid email address.");
                            return false;
                        }
                    }
                else if(email.length == 0)
                {
                    $('#lblRequiredField').text("Please enter the email address.");
                    return false;
                }
    //validate User ID
     if(User.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(User.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter the user id.");
                    return false;
                 }

 //validate Password
    if(password.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(password.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter password.");
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
                            $('#lblRequiredField').text("Password mismatch.");
                            return false;
                        }
                    }
                else if(Cpassword.length == 0)
                    {
                        $('#lblRequiredField').text("Please enter the confirmPassword.");
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
                             $('#lblRequiredField').text("Please enter valid phone number.");
                            return false;
                        }
                    }
                else if(mobNo.length == 0)
                {
                     $('#lblRequiredField').text("Please enter the phone number.");
                    return false;
                }
    
    //Validate Address.
               if(Add1.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Add1.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter the address1.");
                    return false;
                 }
                 
                 
                 
                if(Add2.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Add2.length == 0)
                 {
                     $('#lblRequiredField').text("Please enter the address2.");
                    return false;
                 }
            
     //Validate Postcode
               
                 if(post.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(post.length == 0)
                 {
                     $('#lblRequiredField').text("Please fill the postcode.");
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

                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterDriver",
                      type:"POST",
                     datatype:"json",
                     data:"{'fname':'"+name+"','lname':'"+name2+"','email':'"+email+"','userID':'"+User+"','password':'"+password+"','contactNumber':'"+mobNo+"','address1':'"+Add1+"','address2':'"+Add2+"','postcode':'"+post+"','image':'"+img2+"'}",
                     contentType: "application/json; charset=utf-8",
                      success: OnValidate,
                     error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                     }
                     
                 });
             }
function OnValidate(data)
{
    if(data.d =="false")
    {
        $("#link2").show();
        $('#lblRequiredField').text("Username already exist, enter another name.");
        $('#lblRequiredField').css("color","red");
    }
    else if(data.d =="true")
    {
        $("#link2").show();
        $('#lblRequiredField').text("Registration successful.");
        $('#lblRequiredField').css("color","green");
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
       var timeOut = 6;
        setInterval(function() {  
            $('#container').hide();
             document.getElementById('divSucessfulDriver').innerHTML= "Registration successful.";
            document.getElementById('divMsgDriver').innerHTML=  "Please wait " + --timeOut + "s for login screen.";  
            if(timeOut <= 0)
            {
                window.location = "index.html";
            }




        }, 1000);
    }    
}
function backToIndex()
{
    window.location="index.html";
}
    
