 function login()
            {
               
                var name=document.getElementById('txtUserName').value;
                var Password=document.getElementById('txtPassword').value;
                if(name.length > 0)
                {
                    $('#lblName').text("");
                   
                }
                else if(name.length==0)
                {
                $('#lblName').text("Please enter username.");
                 return false;
                }
              if(Password.length>0)
                {
                    $('#lblPassword').text("");
                    
                    
                }
                 else if(Password.length==0) 
                {
                    $('#lblPassword').text("Please enter password.");
                     return false;
                }
                
                 var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data: "{'username':'" + name + "','userpassword':'" + Password + "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data)
                     {
                         alert("data");
                        window.location="driverStatusUpdate.html";
                     }
               
                 });
                }