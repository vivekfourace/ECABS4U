 function RegisterDriver()
{
    var name =$('#txt1').val();
    var email =$('#txt2').val();
    var mobNo =$('#txt3').val();
    var Add1 =$('#txt4').val();
    var Add2 =$('#txt5').val();
    var post =$('#txt6').val();
    var password =$('#txt7').val();
    var Cpassword =$('#txt8').val();
    var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
    var phoneno =/^\d{12}$/;
                  
                 
          
                if(name.length > 0)
                    {
                        $('#lblName').text(" ");
                    }
                else if(name.length == 0)
                 {
                     $('#lblName').text("*please enter the name");
                    return false;
                 }
    
               if(Add1.length > 0)
                    {
                        $('#lblAddress1').text(" ");
                    }
                else if(Add1.length == 0)
                 {
                     $('#lblAddress1').text("*please enter the Address1");
                    return false;
                 }
                 
                 
                 
                if(Add2.length > 0)
                    {
                        $('#lblAddress2').text(" ");
                    }
                else if(Add2.length == 0)
                 {
                     $('#lblAddress2').text("*please enter the Address2");
                    return false;
                 }
    
                //validate Email address
               if(email.length > 0)
                    {
                        if(email.match(regExpEmail))
                        {
                            $('#lblEmail').text(" ");
                        }
                        else{
                            $('#lblEmail').text("*please enter a valid Email address");
                            return false;
                        }
                    }
                else if(email.length == 0)
                {
                    $('#lblEmail').text("*please enter the Email Address");
                    return false;
                }
    
               
            //validate Phone number.
               if(mobNo.length > 0)
                    {
                        if(phoneno.test(mobNo))
                        {
                            $('#lblPhoneNo').text(" ");
                        }
                        else
                        {
                             $('#lblPhoneNo').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(mobNo.length == 0)
                {
                     $('#lblPhoneNo').text("*please enter the phone number");
                    return false;
                }
                 
               
                 if(post.length > 0)
                    {
                        $('#lblPostcode').text(" ");
                    }
                else if(post.length == 0)
                 {
                     $('#lblPostcode').text("*Please Fill the Postcode");
                    return false;
                 }
                 
    
                 if(password.length > 0)
                    {
                        $('#lblPassword').text(" ");
                    }
                else if(password.length == 0)
                 {
                     $('#lblPassword').text("*please enter password");
                    return false;
                 }
    
                if(Cpassword.length > 0)
                    {
                        if(password == Cpassword)
                        {
                            $('#lblConfirmPassword').text(" ");
                        }
                        else
                        {
                            $('#lblConfirmPassword').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(Cpassword.length == 0)
                    {
                        $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                        return false;
                    }
    
                 
                 $.ajax({
                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterDriver",
                      type:"POST",
                     datatype:"json",
                     data:"{'name':'"+name+"','email':'"+email+"','contactNumber':'"+mobNo+"','password':'"+password+"','address1':'"+Add1+"','address2':'"+Add2+"','postcode':'"+post+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         alert("WELCOME!");
                         
                           $('#txt1').val('');
                           $('#txt2').val('');
                           $('#txt3').val('');
                           $('#txt4').val('');
                           $('#txt5').val('');
                           $('#txt6').val('');
                           $('#txt7').val('');
                           $('#txt8').val('');
                         
                     },
                     error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                 alert(errorThrown);
                     }
                     
                 });
             }