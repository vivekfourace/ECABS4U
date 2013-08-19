function forgotPassword()
            {
                var pass=document.getElementById('txtEmail').value;
                
                var atpos=pass.indexOf("@");
                var dotpos=pass.lastIndexOf(".");
               if(!pass)
                 {
                    $('#lblEmailid').text("*Please Fill the EmailID.");
                     return false;
                 }
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=pass.length)
          {
           $('#lblVerification').text("Not a valid e-mail address");
           return false;
          }
                
              
                $.ajax({
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"",
                   contentType: "application/json; charset=utf-8", 
                    success: function(data)
                     {
                         alert("WELCOME!");
                         $('#txtEmail').val('');
                     }
                   
                });
             }