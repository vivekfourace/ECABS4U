//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//change password
function ChangePaswords()
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

                var  url = "http://115.115.159.126/ECabs/ECabs4U.asmx/ChangePassword";
                 $.ajax(url,{
                     datatype:"JSON",
                     type:"POST",
                     data:"{'userid':'"+userId+"','oldpassword':'"+currentPass+"','newpassword':'"+newPass+"'}",
                     contentType: "application/json; charset=utf-8",
                     
                     success: ShowStatus,
                     
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
                 });
                 
 }
//status after submitting you emailid
 function ShowStatus(data)
{
            if(data.d == "Incorrect current password!")
            {
                $('#lblMsg').text("Incorrect current password!");
                $('#lblMsg').css("color","#D70007");
                $('#lblMsg').css("font-size","13");
                $('#curentpswd').val("");
                
                
            }
            else if (data.d == "Error occurs!") {
                $('#lblMsg').text("Oops!! error occurs, please try again.");
                $('#lblMsg').css("color", "#D70007");
                $('#lblMsg').css("font-size", "13");
                $('#curentpswd').val("");
                $('#txtNew').val("");
                $('#txtConform').val("");
                
            }
            else {
                $('#lblMsg').text("Password changed successfully.");
                $('#lblMsg').css("color", "#237F0C");
                $('#lblMsg').css("font-size", "13");
                $('#txtConform').val("");
                $('#curentpswd').val("");
                $('#txtNew').val("");
                
                
            }
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
