var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


function Reset()
             {
                 
                var currentPass=document.getElementById('curentpswd').value;
                  var newPass=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                 
                 if(currentPass.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(currentPass.length==0)
                {
                $('#lblMsg').text("Please enter current password!");
                $('#curentpswd').focus();
                 return false;
                }
                
           if(newPass.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(newPass.length==0)
                {
                $('#lblMsg').text("Please enter new password!");
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
                            $('#lblMsg').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(confirm.length == 0)
                    {
                        $('#lblMsg').text("Please re-enter confirm password!");
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
        if(roleId == 4)
        {
            window.location ='customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
        else if(roleId == 3)
        {
            window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
        
        else if(roleId == 6)
        {
            window.location = 'businessCustomerProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        }
 }
