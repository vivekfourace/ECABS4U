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
    var atpos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    var phoneno =/^\d{12}$/;
                  
                 
                 if(!name)
                 {
                     $('#lblName').text("*please enter the name");
                    return false;
                 }
    
                  if(!Add1)
                 {
                     $('#lblAddress1').text("*Please Fill the Address1");
                     return false;
                 }
                 
                 
                 if(!Add2)
                 {
                     $('#lblAddress2').text("*Please Fill the Address2");
                     return false;
                 }
    
    
                if(!email)
                 {
                     $('#lblEmail').text("*Please Fill the Email Id");
                     return false;
                 }
                 if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
                      {
                         $('#lblEmailVerification').text("Not a valid e-mail address");
                         return false;
                       }
    
               if(!mobNo)
                 {
                    $('#lblPhoneNo').text("*Please Fill the Contact No.");
                     return false;
                 }
                 
                  if(phoneno.test(mobNo))
                {
                 
                }
                else
                {
                    $('#lblphoneVerification').text("***Not a valid Mobile No.***");
                    return false; 
                }
    
                 
                 if(!post)
                 {
                     $('#lblPostcode').text("*Please Fill the Postcode");
                     return false;
                 }
                 
                  
                 
                 if(!password)
                 {
                    $('#lblPassword').text("*Please Fill the Password.");
                     return false;
                 }
                 
    
                 
                 if(!Cpassword)
                 {
                    $('#lblConfirmPassword').text("*Please Fill the Confirm Password.");
                     return false;
                 }
                 
    
                 if(password!=Cpassword)
                 {
                    $('#lblPasswordVerification').text("*Your Password Is Not Matching!");
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