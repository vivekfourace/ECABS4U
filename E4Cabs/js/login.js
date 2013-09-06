//window.onload = login(); {
 // document.getElementById("txtUserName").focus();
//}

function login()
            {
                //document.getElementById("txtUserName").focus();
                var name=document.getElementById('txtUserName').value;
                var password=document.getElementById('txtPassword').value;
                if(name.length > 0)
                {
                    $('#lblMsg').text("");
                }
                else if(name.length==0)
                {
                $('#lblMsg').text("Please enter username.");
                $('#txtUserName').focus();
                 return false;
                }
              if(password.length>0)
                {
                    $('#lblMsg').text("");
                }
                 else if(password.length == 0) 
                {
                    $('#lblMsg').text("Please enter password.");
                    $('#txtPassword').focus();
                     return false;
                }
                
                 //Ajax loader--start
                $('#imgLoader').bind('ajaxStart', function(){
                    $(this).show();
                    showDisableLayer();
                 }).bind('ajaxStop', function(){
                    $(this).hide();
                     hideDisableLayer();
                });
                
                  showDisableLayer = function() {
                  $('<div id="loading" style="position:fixed; z-index: 2147483647; top:0; left:0; background-color: #7B7F86; opacity:0.4;filter:alpha(opacity=0);"></div>').appendTo(document.body);
                  $("#loading").height($(document).height());
                  $("#loading").width($(document).width());
                };

                    hideDisableLayer = function() {
                    $("#loading").remove();
                };
              //Ajax loader--ends
                
                
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
    if(data.d == "false")
    {
        $('#lblMsg').text("Incorrect usename or password!");
        $('#lblMsg').css("color","#D70007");
        $('#lblMsg').css("font-size","13");
    }
    else
    {
        var userID = data.d[0];
        var roleID = parseInt(data.d[1]);
        var relatedID = data.d[2];      
        
        switch(roleID)
        {
            //Role 1 --> Admin
            case 1: 
            window.location= "Admin.html";
            
            break;
            
            //Role 2 --> Operator
            case 2:            
           window.location = 'OperatorProfile.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            //Role 3 --> Driver
            case 3:
            
            window.location= 'driverProfile.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            //Role 4 --> Customer
            case 4:
            window.location = 'customerHome.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
        }
    }
}
