 function login()
            {
                var name=document.getElementById('txtUserName').value;
                var password=document.getElementById('txtPassword').value;
                if(name.length > 0)
                {
                    $('#lblName').text("");
                    
                }
                else if(name.length==0)
                {
                $('#lblName').text("Please enter username.");
                 return false;
                }
              if(password.length>0)
                {
                    $('#lblPassword').text("");
                   
                    
                }
                 else if(password.length==0) 
                {
                    $('#lblPassword').text("Please enter password.");
                     return false;
                }
                
                 var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'username':'"+name+"','userpassword':'"+password+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data)
                     {
                         alert("vikas");
                         //need to take the id of that user which has loged in....
                        window.location="OperatorProfile.html";
                         
                     },
                   error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
               
                 });
               
                }