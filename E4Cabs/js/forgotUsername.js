function forgotPassword()
            {
                var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
                var email=$('#txtEmail').val();
                var usertype;
                var ischkdri = $('#typedriver').attr('checked') ? true : false;
                var ischkcust = $('#customerdriver').attr('checked') ? true : false;
                var len = $('.user:checked').length;
                
                if(len == 0)
                {
                    $('#lblMsg').text("Please select user type.");
                    $('#lblMsg').css("color","#D70007");
                    return false;
                }
                if(email.length > 0)
                    {
                        if(email.match(regExpEmail))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else{
                            $('#lblMsg').text("Please enter a valid email address.");
                            $('#lblMsg').css("color","#D70007");
                            return false;
                        }
                    }
                else if(email.length == 0)
                {
                    $('#lblMsg').text("Please enter email address.");
                    $('#lblMsg').css("color","#D70007");                    
                    return false;
                }
                if(ischkdri)
                {
                    usertype = 3;
                }
                else if(ischkcust)
                {
                    usertype = 4;
                }
               console.log(usertype);
                $.ajax({
                    cache: false,
                    beforeSend: function(){
                         $('#imgLoader').show();
                     },
                     complete: function(){
                         $('#imgLoader').hide();
                     },
                    url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ForgotUsername",
                    datatype:"json",
                    type:"POST",
                    data:"{'emailid':'"+email+"', 'usertype':'"+usertype+"'}",
                   contentType: "application/json; charset=utf-8", 
                    success: CheckMsg,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //alert(errorThrown);
                       }
                    });
                  }

        function CheckMsg(data){
            if(data.d == "false")
            {
                $('#lblMsg').text("Incorrect email id or user type.");
                $('#lblMsg').css("color","#D70007");
                $('#lblMsg').css("font-size","13");
                $('#txtEmail').val("");
                
            }
            else if (data.d == "false2") {
                $('#lblMsg').text("Oops!! error occurs, please try again.");
                $('#lblMsg').css("color", "#D70007");
                $('#lblMsg').css("font-size", "13");
                $('#txtEmail').val("");
            }
            else {
                $('#lblMsg').text("Username recovered, please check your mail.");
                $('#lblMsg').css("color", "#237F0C");
                $('#lblMsg').css("font-size", "13");
                $('#txtEmail').val("");
            }
 }

function backToIndex()
{
    window.location="index.html";
}

