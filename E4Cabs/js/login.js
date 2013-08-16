         
            function call()
            {
               var name=document.getElementById('txtUserID1').value;
                var Password=document.getElementById('txtPassword').value;
              
               if(!name)
                 {
                    $('#lblName').text("*Please Fill the Username.");
                     return false;
                 }
                if(!Password)
                 {
                    $('#lblPassword').text("*Please Fill the Password.");
                     return false;
                 }
              
                  
         
                $.ajax({                      
                    url :"http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin",
                     type:"POST",
                     datatype:"json",
                     data:"{'username':'"+name+"','userpassword':'"+Password+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         $('#txtPassword').val('');
                         $('#txtUserID1').val('');
                        window.location="OperatorRegister.html";
                     },
                   error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
               
                 });
                }
           
