function Reset()
             {
                 var currentpwd = $('#curentpswd').val();
                var UserID=document.getElementById('lblUserID').value;
                  var newPass=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                 
                if(currentpwd.length > 0)
                 {
                   $('#lblcurrentpswd').text("");
                 }
                 else if(currentpwd.length == 0)
                 {
                     $('#lblcurrentpswd').text("*Enter current password.");
                     return false; 
                 }
                
                  if(newPass.length > 0)
                 {
                    $('#lblPassword').text("");
                    
                 }
                 else if(newPass.length == 0)
                 {
                     $('#lblPassword').text("*Enter new password.");
                     return false;
                 }
                
                 if(confirm.length > 0)
                 {
                     if(newPass.match(confirm))
                         {
                             $('#lblConfirm').text("");
                         }
                     else
                     {
                     $('#lblConfirm').text("*Password mismatch!");
                         return false;
                     }
                 }
                 else if(confirm.length == 0)
                 {
                     $('#lblConfirm').text("*Enter confirm password.");
                     return false;
                 }
                 alert(newPass);
                 $.ajax({
                     url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ChangePassword",
                     datatype:"POST",
                     type:"json",
                     data:"{'userid':'"+UserID+"','newpassword':'"+new1+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         
                         alert("WELCOME!");
                         $('#txtNew').val('');
                         $('#txtConform').val('');
                     }
                 });
                 
             }