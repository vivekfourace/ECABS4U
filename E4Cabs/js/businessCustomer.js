function businessRegistercustomer()
{
    var business=$('#txtBusinessName').val();
    var txt1 =$('#txtFirstName').val();
    var txt2 =$('#txtLastName').val();
   var txt3 =$('#txtPhone').val();
    var txt4 =$('#txtEmail').val();
    //var txt5 =$('#txtPost').val();
    var txt6 =$('#txtUserName').val();
    var txt7 =$('#txtPassword').val();
    var txt8 =$('#txtConfirmPassword').val();
    var address1=$('#txtAddress1').val();
    var address2=$('#txtAddress2').val();
    var address3=$('#txtAddress3').val();
    var address4=$('#txtAddress4').val();
    var address5=$('#txtAddress5').val();
    var address6=$('#txtAddress6').val();
    var postcode=$('#txtPostalCode').val();
    
    var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
   var phoneno =/^\d{11}$/;
    
    //Business customer
     if(!business)
                 {
                     $('#lblMsg').text("Please enter name of business!");
                     $('#txtBusinessName').focus();                        
                     return false;
                 }
               if(!txt1)
                 {
                     $('#lblMsg').text("Please enter first name!");
                     $('#txtFirstName').focus();                        
                     return false;
                 }
               if(!txt2)
                 {
                     $('#lblMsg').text("Please enter last name!");
                     $('#txtLastName').focus();                     
                    return false;
                 }
    
                 //validate Phone number.
               if(txt3.length > 0)
                    {
                        if(phoneno.test(txt3))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                        {
                             $('#lblMsg').text("Please enter valid phone number!");
                            $('#txtPhone').focus();
                            return false;
                        }
                    }
                else if(txt3.length == 0)
                {
                     $('#lblMsg').text("Please enter phone number!");
                    $('#txtPhone').focus();
                    return false;
                }
    
                //validate Email address
                if(txt4.length > 0)
                    {
                        if(txt4.match(regExpEmail))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else{
                            $('#lblMsg').text("Please enter valid email address!");
                            $('#txtEmail').focus();
                            return false;
                        }
                    }
                else if(txt4.length == 0)
                {
                    $('#lblMsg').text("Please enter email address!");
                    $('#txtEmail').focus();
                    return false;
                }
    
          if(!txt6)
                 {
                     $('#lblMsg').text("Please enter Username!");
                     $('#txtUserName').focus();
                    return false;
                 }
    
                if(txt7.length > 0)
                    {
                        $('#lblPassword').text(" ");
                    }
                else if(txt7.length == 0)
                 {
                     $('#lblMsg').text("Please enter password!");
                     $('#txtPassword').focus();
                    return false;
                 }
    
                if(txt8.length > 0)
                    {
                        if(txt7 == txt8)
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                        {
                            $('#lblMsg').text("Password mismatch!");
                            $('#txtPassword').focus();
                            $('#txtPassword').val("");
                            $('#txtConfirmPassword').val("");
                            return false;
                        }
                    }
                else if(txt8.length == 0)
                    {
                        $('#lblMsg').text("Please enter confirm password!");
                        $('#txtConfirmPassword').focus();
                        return false;
                    }
    
    
    
    //Address 1
    
    if(!address1)
                 {
                     $('#lblMsg').text("Please enter Address1!");
                     $('#txtAddress1').focus();                        
                     return false;
                 }
    //Address 2
     if(!address2)
                 {
                     $('#lblMsg').text("Please enter Address2!");
                     $('#txtAddress2').focus();                        
                     return false;
                 }
    //Postcode
     if(!postcode)
                 {
                     $('#lblMsg').text("Please enter Postcode!");
                     $('#txtPostalCode').focus();                        
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

    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterBusinessCustomer",
    type: "POST",
    dataType: "json",
    data: "{'nameofbusiness':'"+business+"', 'fname': '" + txt1 + "','lname': '" + txt2 + "','add1':'"+address1+"','add2':'"+address2+"','add3':'"+address3+"','add4':'"+address4+"','add5':'"+address5+"','add6':'"+address6+"', 'email': '" + txt4 + "','userID': '" + txt6 + "','password': '" + txt7 + "','contactNumber': '" + txt3 + "','postcode':'"+postcode+"'}",
    contentType: "application/json; charset=utf-8",
    success: CheckData,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
       // alert(errorThrown);
           }
       });    
}

function CheckData(data){
    if(data.d == "false")
    {
        $('#lblMsg').text("Username already exist!");
        $('#lblMsg').css("color","#D70007");
        $('#lblMsg').css("font-size","13");
        $('#txtUserName').val(" ");
        $('#txtUserName').focus();
    }
    else if(data.d =="true"){
        var timeOut = 6;
        setInterval(function() {  
            $('#divBusinessreg').hide();
            document.getElementById('divSucessfulBusiness').innerHTML= "Registration successful.";
            document.getElementById('divMsgBusiness').innerHTML=  "Please wait " + --timeOut + "s for login screen.";  
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
