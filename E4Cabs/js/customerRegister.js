function Registercustomer()
{
    var txt1 =$('#txtFirstName').val();
    var txt2 =$('#txtLastName').val();
    var txt3 =$('#txtPhone').val();
    var txt4 =$('#txtEmail').val();
    //var txt5 =$('#txtPost').val();
    var txt6 =$('#txtUserName').val();
    var txt7 =$('#txtPassword').val();
    var txt8 =$('#txtConfirmPassword').val();
    var regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
    var phoneno =/^\d{11}$/;
    
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
    
    
    

$.ajax({
    cache: false,
                    beforeSend: function(){
                         $('#imgLoader').show();
                     },
                     complete: function(){
                         $('#imgLoader').hide();
                     },
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterCustomer",
    type: "POST",
    dataType: "json",
    data: "{ 'fname': '" + txt1 + "','lname': '" + txt2 + "','email': '" + txt4 + "','userID': '" + txt6 + "','password': '" + txt7 + "','contactNumber': '" + txt3 + "'}",
    contentType: "application/json; charset=utf-8",
    success: CheckData,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(errorThrown);
           }
       });    
}

function CheckData(data){
    if(data.d == "false")
    {
        $('#lblMsg').text("Username already exist!");
        $('#lblMsg').css("color","#D70007");
        $('#lblMsg').css("font-size","13");
        $('#txtUserName').val("");
        $('#txtUserName').focus();
    }
    else if(data.d =="true"){
        var timeOut = 6;
        setInterval(function() {  
            document.getElementById('lblMsg').innerHTML = "Registration success, wait " + --timeOut + "s for login screen.";
            $('#lblMsg').css("color","green");  
            $('#lblMsg').css("font-size","14px");  
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
