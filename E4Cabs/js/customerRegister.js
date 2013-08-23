function Registercustomer()
{
    var txt1 =$('#txt1').val();
    var txt2 =$('#txt2').val();
    var txt3 =$('#txt3').val();
    var txt4 =$('#txt4').val();
    var txt5 =$('#txt5').val();
    var txt6 =$('#txt6').val();
    var txt7 =$('#txt7').val();
    var txt8 =$('#txt8').val();
    var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    var phoneno =/^\d{12}$/;
    
               if(!txt1)
                 {
                     $('#lblWarning').text("*Please enter the first name");
                    return false;
                 }
               if(!txt2)
                 {
                     $('#lblWarning').text("*Please enter the last name");
                    return false;
                 }
                //validate Phone number.
               if(txt3.length > 0)
                    {
                        if(phoneno.test(txt3))
                        {
                            $('#lblWarning').text(" ");
                        }
                        else
                        {
                             $('#lblWarning').text("*Please enter valid phone number");
                            return false;
                        }
                    }
                else if(txt3.length == 0)
                {
                     $('#lblWarning').text("*Please enter the phone number");
                    return false;
                }
    
                //validate Email address
                if(txt4.length > 0)
                    {
                        if(txt4.match(regExpEmail))
                        {
                            $('#lblWarning').text(" ");
                        }
                        else{
                            $('#lblWarning').text("*Please enter a valid Email address");
                            return false;
                        }
                    }
                else if(txt4.length == 0)
                {
                    $('#lblWarning').text("*Please enter the Email Address");
                    return false;
                }
              if(txt5.length > 0)
                    {
                        $('#lblWarning').text(" ");
                    }
                else if(txt5.length == 0)
                 {
                     $('#lblWarning').text("*Please enter the User ID");
                    return false;
                 }
    
          if(!txt6)
                 {
                     $('#lblWarning').text("*Please enter the Postcode");
                    return false;
                 }
    
                if(txt7.length > 0)
                    {
                        $('#lblWarning').text(" ");
                    }
                else if(txt7.length == 0)
                 {
                     $('#lblWarning').text("*Please enter password");
                    return false;
                 }
    
                if(txt8.length > 0)
                    {
                        if(txt7 == txt8)
                        {
                            $('#lblWarning').text(" ");
                        }
                        else
                        {
                            $('#lblWarning').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(txt8.length == 0)
                    {
                        $('#lblWarning').text("*Please enter the confirmpassword");
                        return false;
                    }
    

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterCustomer",
    type: "POST",
    dataType: "json",
    data: "{ 'name': '" + txt1 + "','email': '" + txt2 + "','contactNumber': '" + txt3 + "','password': '" + txt4 + "','address1': '" + txt5 + "','address2': '" + txt6 + "','postcode': '" + txt7 + "'}",
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
