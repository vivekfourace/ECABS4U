function forgotPassword()
            {
                var pass=$('#txtEmail').val();
                
                var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
              //Email Verification
                if(pass.length > 0)
                    {
                        if(pass.match(regExpEmail))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else{
                            $('#lblMsg').text("Please enter a valid email address!");
                            $('#lblMsg').css("color","#D70007");
                            return false;
                        }
                    }
                else if(pass.length == 0)
                {
                    $('#lblMsg').text("Please enter email address!");
                    $('#lblMsg').css("color","#D70007");                    
                    return false;
                }
              
                $.ajax({
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"",
                   contentType: "application/json; charset=utf-8", 
                    success: CheckMsg,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                       }
                      });
                    }

function CheckMsg(data){
    if(data.d[0] == "false")
    {
        $('#lblMsg').text("Incorrect Email id");
        $('#lblMsg').css("color","#D70007");
        $('#lblMsg').css("font-size","13");
    }
    else{
        //diplay user after fetching from db.
            }
 }