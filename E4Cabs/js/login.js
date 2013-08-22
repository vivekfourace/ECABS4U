 function login()
            {
                var name=document.getElementById('txtUserID1').value;
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
                 else if(password.length == 0) 
                {
                    $('#lblPassword').text("Please enter password.");
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
       // var userID = data.d[0];
        var roleID = parseInt(data.d[1]);
        alert(data.d[1]);
       var relatedID = parseInt(data.d[2]);
        
       // Session["UserID"] = userID;
      //  Session["RoleID"] = roleID;
       // Session["RelatedID"] = relatedID;
        
        switch(roleID)
        {
            //Role 1 --> Admin
            case 1: alert('admin dash');
            
            break;
            //Role 2 --> Operator
            case 2: alert('operator dash');
            
            window.location = "OperatorProfile.html";
            break;
            
            //Role 3 --> Driver
            case 3:
            window.location = "driverStatusUpdate.html";
            break;
            
            //Role 4 --> Customer
            case 4:
            window.location.href = "customerSearch.html";
            break;
            default:
            break;
        }
    }
}
