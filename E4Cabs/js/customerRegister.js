function Registercustomer()
{
    var N1 =$('#txt1').val();
    var N2 =$('#txt2').val();
    var txt3 =$('#txt3').val();
    var txt4 =$('#txt4').val();
    var txt5 =$('#txt5').val();
    var PO =$('#txt6').val();
    var txt7 =$('#txt7').val();
    var txt8 =$('#txt8').val();
    //var regExpEmail = "^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$";
     var  regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
   var phoneno =/^\d{12}$/;
    
               
               if(N1.length > 0)
                    {
                        $('#lblFirstName').text(" ");
                    }
                else if(N1.length == 0)
                 {
                     $('#lblFirstName').text("*please enter the first name");
                    return false;
                 }
              
                if(N2.length > 0)
                    {
                        $('#lblLastName').text(" ");
                    }
                else if(N2.length == 0)
                 {
                     $('#lblLastName').text("*please enter the last name");
                    return false;
                 }
                //validate Phone number.
               if(txt3.length > 0)
                    {
                        if(phoneno.test(txt3))
                        {
                            $('#lblPhoneNo').text(" ");
                        }
                        else
                        {
                             $('#lblPhoneNo').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(txt3.length == 0)
                {
                     $('#lblPhoneNo').text("*please enter the phone number");
                    return false;
                }
    
                //validate Email address
                if(txt4.length > 0)
                    {
                        if(txt4.match(regExpEmail))
                        {
                            $('#lblEmail').text(" ");
                        }
                        else{
                            $('#lblEmail').text("*please enter a valid Email address");
                            return false;
                        }
                    }
                else if(txt4.length == 0)
                {
                    $('#lblEmail').text("*please enter the Email Address");
                    return false;
                }
              
          
               if(PO.length > 0)
                    {
                        $('#lblPostcode').text(" ");
                    }
                else if(PO.length == 0)
                 {
                     $('#lblPostcode').text("*please enter the Postcode");
                    return false;
                 }
    
                if(txt5.length > 0)
                    {
                        $('#lblUserID').text(" ");
                    }
                else if(txt5.length == 0)
                 {
                     $('#lblUserID').text("*please enter the User ID");
                    return false;
                 }
    
                if(txt7.length > 0)
                    {
                        $('#lblPassword').text(" ");
                    }
                else if(txt7.length == 0)
                 {
                     $('#lblPassword').text("*please enter password");
                    return false;
                 }
    
                if(txt8.length > 0)
                    {
                        if(txt7 == txt8)
                        {
                            $('#lblConfirmPassword').text(" ");
                        }
                        else
                        {
                            $('#lblConfirmPassword').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(txt8.length == 0)
                    {
                        $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                        return false;
                    }
    

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterCustomer",
    type: "POST",
    dataType: "json",
    data: "{ 'name': '" + N1 + "','email': '" + N2 + "','contactNumber': '" + txt3 + "','password': '" + txt4 + "','address1': '" + txt5 + "','address2': '" + PO + "','postcode': '" + txt7 + "'}",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        alert('Registration successfull');
        $('#txt1').val('');
        $('#txt2').val('');
        $('#txt3').val('');
        $('#txt4').val('');
        $('#txt5').val('');
        $('#txt6').val('');
        $('#txt7').val('');
        $('#txt8').val('');
       
       
    },
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
           }
       });    
}