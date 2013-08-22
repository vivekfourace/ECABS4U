function Registeroperator()
{
    var Name =$('#txtName').val();
    var Email =$('#txtEmail').val();
    var UserID =$('#txtUserID').val();
    var Password =$('#txtPassword').val();
    var Confirm =$('#txtConfirmPass').val();
    var Contact =$('#txtContact').val();
    var Address1 =$('#txtAddress1').val();
    var Address2 =$('#txtAddress2').val();
   // var regExpEmail = "^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$";
   // var  regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9]+\.)+([a-zA-Z]{2,3})$/;
    var  regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    var phoneno =/^\d{12}$/;
    
               
                if(Name.length > 0)
                    {
                        $('#lblName').text(" ");
                    }
                else if(Name.length == 0)
                 {
                     $('#lblName').text("*please enter the Name");
                    return false;
                 }
    if(UserID.length > 0)
    {
         $('#lblUserID').text(" ");
    }
    else if(UserID == 0)
    {
          $('#lblUserID').text("*please enter the Name");
                    return false;
    }
                
              if(Address1.length > 0)
                    {
                        $('#lblAddress1').text(" ");
                    }
                else if(Address1.length == 0)
                 {
                     $('#lblAddress1').text("*please enter the Address1");
                    return false;
                 }
    
    
                   
    
                if(Address2.length > 0)
                    {
                        $('#lblAddress2').text(" ");
                    }
                else if(Address2.length == 0)
                 {
                     $('#lblAddress2').text("*please enter the Address2");
                    return false;
                 }
    
    
    
               
        if(Email.length > 0)
                    {
                        if(Email.match(regExpEmail))
                        {
                            $('#lblEmail').text(" ");
                        }
                        else
                        {
                            $('#lblEmail').text("*please enter a valid Email address");
                             return false;
                        }
                    }
                else if(Email.length == 0)
                {
                    $('#lblEmail').text("*please enter the Email Address");
                    return false;
                }
    
    
    
    
    
     //validate Phone number.
               if(Contact.length > 0)
                    {
                        if(phoneno.test(Contact))
                        {
                            $('#lblPhoneNo').text(" ");
                        }
                        else
                        {
                             $('#lblPhoneNo').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(Contact.length == 0)
                {
                     $('#lblPhoneNo').text("*please enter the phone number");
                    return false;
                }               
                 if(Password.length > 0)
                    {
                        $('#lblPassword').text(" ");
                    }
                else if(Password.length == 0)
                 {
                     $('#lblPassword').text("*please enter password");
                    return false;
                 }
                
 
                    if(Confirm.length > 0)
                    {
                        if(Password == Confirm)
                        {
                            $('#lblConfirmPassword').text(" ");
                        }
                        else
                        {
                            $('#lblConfirmPassword').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(Confirm.length == 0)
                    {
                        $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                        return false;
                    }
    
                
    

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterOperator",
    type: "POST",
    dataType: "json",
    data: "{ 'name': '" + Name + "','email': '" + Email + "','userID': '" + UserID + "','password': '" + Password + "','address1': '" + Address1 + "','address2': '" + Address2 + "','contactNumber': '" + Contact + "'}",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        alert('Registration successfull');
       // $('#Name').val('');
      //  $('#Email').val('');
       // $('#UserID').val('');
      //  $('#Password').val('');
       // $('#Confirm').val('');
       // $('#Contact').val('');
       // $('#Address1').val('');
       // $('#Address2').val('');
       
    },
    
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    {
        alert(errorThrown);
           }
       });    
}
