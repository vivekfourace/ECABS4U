function forgotPassword()
            {
                var pass=document.getElementById('txtEmail').value;
                
                //var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
                 var  regExpEmail=/^([_a-zA-Z0-9_]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+(\.[a-zA-Z0-9-]+)*([a-zA-Z]{2,4})$/;
              //Email Verification
                
                if(pass.length > 0)
                    {
                        if(pass.match(regExpEmail))
                        {
                            $('#lblVerification').text(" ");
                        }
                        else{
                            $('#lblVerification').text("*please enter a valid Email address");
                            return false;
                        }
                    }
                else if(pass.length == 0)
                {
                    $('#lblVerification').text("*please enter the Email Address");
                    return false;
                }
                
              
                $.ajax({
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"{'emaiID':'"+pass+"'}",
                   contentType: "application/json; charset=utf-8", 
                    success: function(data)
                     {
                         alert("WELCOME!");
                         $('#txtEmail').val('');
                     },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
        alert(errorThrown);
           }
                   
                });
             }