
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
    var atpos=txt4.indexOf("@");
    var dotpos=txt4.lastIndexOf(".");
    var phoneno =/^\d{12}$/;
    
               if(!txt1)
                 {
                     $('#lblFirstName').text("*please enter the First Name");
                    return false;
                 }
               if(!txt2)
                 {
                     $('#lblLastName').text("*please enter the Last Name");
                    return false;
                 }
             if(!txt3)
                 {
                     $('#lblPhoneNo').text("*please enter the Phone Number");
                    return false;
                 }
               if(phoneno.test(txt3))
                {
                 
                }
                else
                {
                    $('#lblphoneVerification').text("***Not a valid Mobile No.***");
                    return false; 
                }
                if(!txt4)
                 {
                     $('#lblEmail').text("*please enter the Email Address");
                    return false;
                 }
                 if (atpos<1 || dotpos<atpos+2 || dotpos+2>=txt4.length)
                      {
                         $('#lblEmailVerification').text("Not a valid e-mail address");
                         return false;
                       }
            if(!txt5)
                 {
                     $('#lblUserID').text("*please enter the User ID");
                    return false;
                 }
          if(!txt6)
                 {
                     $('#lblPostcode').text("*please enter the Postcode");
                    return false;
                 }
           if(!txt7)
                 {
                     $('#lblPassword').text("*please enter the Password");
                    return false;
                 }
            if(!txt8)
                 {
                     $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                    return false;
                 }
    
    if(txt7!=txt8)
                 {
                    $('#lblVerification').text("*Your Password Is Not Matching!");
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
       
    },
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
           }
       });    
}