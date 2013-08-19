
function Registeroperator()
{
    var txt1 =$('#txt1').val();
    var txt2 =$('#txt2').val();
    var txt3 =$('#txt3').val();
    var txt4 =$('#txt4').val();
    var txt5 =$('#txt5').val();
    var txt6 =$('#txt6').val();
    var txt7 =$('#txt7').val();
    var txt8 =$('#txt8').val();
     var atpos=txt2.indexOf("@");
    var dotpos=txt2.lastIndexOf(".");
    var phoneno =/^\d{12}$/;
    
                if(!txt1)
                 {
                     $('#lblName').text("*please enter the Name");
                    return false;
                 }
    
                if(!txt4)
                 {
                     $('#lblAddress1').text("*please enter the Address1");
                    return false;
                 }
    
                   if(!txt5)
                 {
                     $('#lblAddress2').text("*please enter the Address2");
                    return false;
                 }
                if(!txt2)
                 {
                     $('#lblEmail').text("*please enter the Email Address");
                    return false;
                 }
                 if (atpos<1 || dotpos<atpos+2 || dotpos+2>=txt2.length)
                      {
                         $('#lblEmailVerification').text("Not a valid e-mail address");
                         return false;
                       }
    
    
               if(!txt3)
                 {
                     $('#lblPhoneNo').text("*please enter the Contact Number");
                    return false;
                 }
                 if(phoneno.test(txt3))
                {
                 
                }
                else
                {
                    $('#lblphoneVerification').text("***Not a valid Contact No.***");
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
                    $('#lblPasswordVerification').text("*Your Password Is Not Matching!");
                      return false;
                 }
    

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterOperator",
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
    
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    {
        alert(errorThrown);
           }
       });    
}