function backToLogin()
{
    window.location = "index.html";
}

function forgotPassword()
            {
                var pass=$('#txtEmail').val();
                
                var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
              //Email Verification
                if(pass.length > 0)
                    {
                        if(pass.match(regExpEmail))
                        {
                            $('#lblMsg').text(" ");
                        }
                        else{
                            $('#lblMsg').text("Please enter a valid email address!");
                            $('#lblMsg').css("color","#D70007");
                            return false;
                        }
                    }
                else if(pass.length == 0)
                {
                    $('#lblMsg').text("Please enter email address!");
                    $('#lblMsg').css("color","#D70007");                    
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
                $.ajax({
                    url:"http://115.115.159.126/ECabs/ECabs4U.asmx/forgotMyPwd",
                    datatype:"json",
                    type:"POST",
                    data:"{'emailid':'"+pass+"'}",
                   contentType: "application/json; charset=utf-8", 
                    success: CheckMsg,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                       }
                      });
                    }

        function CheckMsg(data){
            if(data.d == "false")
            {
                $('#lblMsg').text("Incorrect Email id");
                $('#lblMsg').css("color","#D70007");
                $('#lblMsg').css("font-size","13");
                $('#txtEmail').val("");
                
            }
            else if (data.d == "false2") {
                $('#lblMsg').text("Oops!! error occurs, please try again.");
                $('#lblMsg').css("color", "#D70007");
                $('#lblMsg').css("font-size", "13");
                $('#txtEmail').val("");
            }
            else {
                $('#lblMsg').text("Password recovered, please check your mail.");
                $('#lblMsg').css("color", "#237F0C");
                $('#lblMsg').css("font-size", "13");
                $('#txtEmail').val("");
            }
 }

//function backtologin()
//{
  //window.location="login.html";  
//} 


function backToIndex()
{
    window.location="index.html";
}

