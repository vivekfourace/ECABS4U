var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function ChangePaswords()
 {
                var currentPass=document.getElementById('curentpswd').value;
                var newPass=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
     
                if(currentPass.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(currentPass.length==0)
                {
                $('#lblMsg').text("Please enter current password.");
                $('#curentpswd').focus();
                 return false;
                }
                
                if(newPass.length > 0)
                {
                    if(newPass.match(pass))
                    {
                      $('#lblMsg').text(" ");  
                    }
                    else
                    {
                      $('#lblMsg').text("Password must be in between 8 to 16 characters which contain at least one numeric digit, one uppercase and one lowercase letter.");
                      $('#newPass').focus();
                      return false;
                    }
                }
                else if(newPass.length==0)
                {
                $('#lblMsg').text("Please enter new password.");
                $('#txtNew').focus();
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
                            $('#lblMsg').text("Password mismatch.");
                            return false;
                        }
                    }
                else if(confirm.length == 0)
                    {
                        $('#lblMsg').text("Please re-enter confirm password.");
                        return false;
                    }
              
                var  url = "http://115.115.159.126/ECabs/ECabs4U.asmx/ChangePassword";
                 $.ajax(url,{
                     beforeSend: function(){
                        $('#imgLoader').show();
                     },
                     complete: function(){
                        $('#imgLoader').hide();
                     },
                     datatype:"JSON",
                     type:"POST",
                     data:"{'userid':'"+userId+"','oldpassword':'"+currentPass+"','newpassword':'"+newPass+"'}",
                     contentType:"application/json; charset=utf-8",                     
                     success: ShowStatus,                     
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
 }

 function ShowStatus(data)
{
            console.log(data.d);            
            if(data.d === "False")
            {
                $('#lblMsg').text("Incorrect current password.");
                $('#lblMsg').css("color", "#FE2E2E");
                $('#lblMsg').css("font-size", "13");
                $('#curentpswd').val("");
                $('#txtNew').val("");
                $('#txtConform').val(""); 
            }
            else if(data.d === "Error")
            {
                $('#lblMsg').text("Error occurs, please try again.");
                $('#lblMsg').css("color", "#FE2E2E");
                $('#lblMsg').css("font-size", "13");
                $('#curentpswd').val("");
                $('#txtNew').val("");
                $('#txtConform').val("");                
            }
            else
            {
                $('#lblMsg').text(data.d);
                $('#lblMsg').css("color", "#0B610B");
                $('#lblMsg').css("font-size", "13");
                $('#txtConform').val("");
                $('#curentpswd').val("");
                $('#txtNew').val(""); 
            }
 }