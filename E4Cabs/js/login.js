 function login()
            {
                var name=document.getElementById('txtUserName').value;
                var password=document.getElementById('txtPassword').value;
                if(name.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(name.length==0)
                {
                $('#lblMsg').text("Please enter username.");
                 return false;
                }
              if(password.length>0)
                {
                    $('#lblMsg').text("");
                }
                 else if(password.length == 0) 
                {
                    $('#lblMsg').text("Please enter password.");
                     return false;
                }
                
                 var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'username':'" +name+ "','userpassword':'" +password+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: CheckMsg,
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(errorThrown);
                }
             });
           }

function CheckMsg(data)
{
    if(data.d[0] == "false")
    {
        $('#lblDisplay').show();
        $('#lblMsg').text("Incorrect usename or password!");
        $('#lblMsg').css("color","#D70007");
        $('#lblMsg').css("font-size","13");
    }
    else{
        var userID = data.d[0];
        var roleID = parseInt(data.d[1]);
        var relatedID = parseInt(data.d[2]);
        
      
        
        switch(roleID)
        {
            //Role 1 --> Admin
            case 1: 
            window.location = "Admin.html";
            break;
            //Role 2 --> Operator
             case 2:
            window.location = 'OperatorProfile.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            //Role 3 --> Driver
            case 3:
            window.location= 'driverStatusUpdate.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            //Role 4 --> Customer
            case 4:
            window.location = "customerSearch.html";
            break;
        }
    }
}