function Reset()
             {
                 
                var UserID=document.getElementById('curentpswd').value;
                  var newPass=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                 
                 if(UserID.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(UserID.length==0)
                {
                $('#lblMsg').text("Please enter Current password!.");
                $('#curentpswd').focus();
                 return false;
                }
                
           if(newPass.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(newPass.length==0)
                {
                $('#lblMsg').text("Please enter New password!.");
                $('#txtNew').focus();
                 return false;
                }
                 
                 //validate Password
    if(newPass.length > 0)
                    {
                        $('#lblMsg').text(" ");
                    }
                else if(newPass.length == 0)
                 {
                     $('#lblMsg').text("Please enter News password");
                    return false;
                 }
    
                if(confirm.length > 0)
                    {
                        if(newPass == confirm)
                        {
                            $('#lblMsg').text(" ");
                        }
                        else
                        {
                            $('#lblMsg').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(confirm.length == 0)
                    {
                        $('#lblMsg').text("Please enter the ConfirmPassword");
                        return false;
                    }
                
                
                 $.ajax({
                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ChangePassword",
                     datatype:"POST",
                     type:"json",
                     data:"{'userid':'"+UserID+"','currentPswd':'"+currentpwd+"','newpassword':'"+newPass+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         
                         alert("password changed successfully.");
                     }
                 });
                 
             }



//Back button
function backToIndex()
{
    window.location = "index.html";
}
