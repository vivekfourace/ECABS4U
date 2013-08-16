 function create1()
             {
                 var name=document.getElementById('txtName2').value;
                  var Add1=document.getElementById('txtAddress1').value;
                  var Add2=document.getElementById('txtAddress2').value;
                  var postcode=document.getElementById('txtPostcode').value;
                  var mobNo=document.getElementById('txtMno2').value;
                  var email=document.getElementById('txtEmail2').value;
                  var pass=document.getElementById('txtpassword').value;
                  var Conpass=document.getElementById('txtCpassword').value;
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
                     $('#lblAddress1').text("*Please Fill the Address");
                     return false;
                 }
                 
                 
                 if(!Add2)
                 {
                     $('#lblAddress2').text("*Please Fill the Address2");
                     return false;
                 }
                 
                 if(!postcode)
                 {
                     $('#lblPostcode').text("*Please Fill the Postcode");
                     return false;
                 }
                 
                  if(!mobNo)
                 {
                    $('#lblMobileNo').text("*Please Fill the Mobile NO.");
                     return false;
                 }
                 
                  if(phoneno.test(mobNo))
                {
                 
                }
                else
                {
                    $('#lblMobileVeification').text("***Not a valid Mobile No.***");
                    return false; 
                }
                 if(!email)
                 {
                     $('#lblEmail').text("*Please Fill the Email Id");
                     return false;
                 }
                 if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
                      {
                         $('#lblEmailidVerification').text("Not a valid e-mail address");
                         return false;
                       }
                 if(!pass)
                 {
                    $('#lblPassword').text("*Please Fill the Password.");
                     return false;
                 }
                 
                 
                 if(!Conpass)
                 {
                    $('#lblCpassword').text("*Please Fill the Confirm Password.");
                     return false;
                 }
                 
                 if(pass!=Conpass)
                 {
                    $('#lblPasswordVerification').text("*Your Password Is Not Matching!");
                      return false;
                 }
                 
                 
                 $.ajax({
                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterDriver",
                      type:"POST",
                     datatype:"json",
                     data:"{'name':'"+name+"','email':'"+email+"','contactNumber':'"+mobNo+"','password':'"+pass+"','address1':'"+Add1+"','address2':'"+Add2+"','postcode':'"+postcode+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         alert("WELCOME!");
                         
                          $('#txtName2').val('');
                           $('#txtAddress1').val('');
                           $('#txtAddress2').val('');
                           $('#txtPostcode').val('');
                           $('#txtMno2').val('');
                           $('#txtEmail2').val('');
                           $('#txtpassword').val('');
                          $('#txtCpassword').val('');
                         
                     }
                    
                     
                 });
             }