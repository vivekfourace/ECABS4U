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
    var  regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    var phoneno =/^\d{12}$/;
    
               
                if(Name.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Name.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Name");
                    return false;
                 }
    
    if(Email.length > 0)
                    {
                        if(Email.match(regExpEmail))
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else
                        {
                            $('#lblRequiredField').text("*Please enter a valid Email address");
                             return false;
                        }
                    }
                else if(Email.length == 0)
                {
                    $('#lblRequiredField').text("*Please enter the Email Address");
                    return false;
                }
    
    if(UserID.length > 0)
    {
         $('#lblRequiredField').text(" ");
    }
    else if(UserID == 0)
    {
          $('#lblRequiredField').text("*Please enter the User Id");
                    return false;
    }
    if(Password.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Password.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter password");
                    return false;
                 }
                
 
                    if(Confirm.length > 0)
                    {
                        if(Password == Confirm)
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else
                        {
                            $('#lblRequiredField').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(Confirm.length == 0)
                    {
                        $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                        return false;
                    }
    
    
    
    if(Contact.length > 0)
                    {
                        if(phoneno.test(Contact))
                        {
                            $('#lblRequiredField').text(" ");
                        }
                        else
                        {
                             $('#lblRequiredField').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(Contact.length == 0)
                {
                     $('#lblRequiredField').text("*Please enter the phone number");
                    return false;
                }
                
    
    
              if(Address1.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Address1.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Address1");
                    return false;
                 }
    
    
                   
    
                if(Address2.length > 0)
                    {
                        $('#lblRequiredField').text(" ");
                    }
                else if(Address2.length == 0)
                 {
                     $('#lblRequiredField').text("*Please enter the Address2");
                    return false;
                 }
    
    
    
               
        
    
    
    
    
     //validate Phone number.
                              
                 
    
                
    

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterOperator",
    type: "POST",
    dataType: "json",
    data: "{ 'name': '" + Name + "','email': '" + Email + "','userID': '" + UserID + "','password': '" + Password + "','address1': '" + Address1 + "','address2': '" + Address2 + "','contactNumber': '" + Contact + "'}",
    contentType: "application/json; charset=utf-8",
    
        success: OnValidate,
        
       // $('#Name').val('');
      //  $('#Email').val('');
       // $('#UserID').val('');
      //  $('#Password').val('');
       // $('#Confirm').val('');
       // $('#Contact').val('');
       // $('#Address1').val('');
       // $('#Address2').val('');
       
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
         $('#txtName').val('');
       $('#txtEmail').val('');
       $('#txtPassword').val('');
       $('#txtUserID').val('');
       $('#txtConfirmPass').val('');
       $('#txtContact').val('');
        $('#txtAddress1').val('');
       $('#txtAddress2').val('');
        
        $("#link2").show();
        $('#lblMessage').text("Registration successful,");
        $('#lblMessage').css("color","green");
        $("#link1").show();
        
       
    }
}
function backtoadmin()
{
    window.location="Admin.html";
}