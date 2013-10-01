window.onload = loginUsingCookie();

function loginUsingCookie()
{
    var name = $.cookie('userName');
    var password = $.cookie('pass');
    //alert(name + password);
    if(name != "null" && password != "null")
    {
        var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'username':'" +name+ "','userpassword':'" +password+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: CheckMsg,
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
             });
        }
    }

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
};
//window.onload = login(); {
 // document.getElementById("txtUserName").focus();
//}

function login()
            {
                
                //document.getElementById("txtUserName").focus();
                var name=document.getElementById('txtUserName').value;
                var password=document.getElementById('txtPassword').value;
                
                //$.cookie('userName', name);
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
                    // alert(errorThrown);
                }
             });
           }

function CheckMsg(data)
{
    if(data.d == "false")
    {
        var name=document.getElementById('txtUserName').value;
        var password=document.getElementById('txtPassword').value;
        
        var userNam = $.cookie('userName');
        if(userNam == undefined || userNam == 'null')
        {
            if( (name.length && password.length) > 0)
            {
                $('#lblMsg').text("Incorrect usename or password!");
                $('#lblMsg').css("color","#D70007");
                $('#lblMsg').css("font-size","13");
            }
        }
        else
        {
            $('#lblMsg').text("Incorrect usename or password!");
            $('#lblMsg').css("color","#D70007");
            $('#lblMsg').css("font-size","13");
        }
    }
    else
    {
        var userID = data.d[0];
        var roleID = parseInt(data.d[1]);
        var relatedID = data.d[2];
        var passwd=document.getElementById('txtPassword').value;
        var name=document.getElementById('txtUserName').value;
        //creating Cookie        
        var isChecked = $('#chkRem').attr('checked')?true:false;
        if(isChecked == true)
        {
            
            $.cookie('userName', name);
            $.cookie('pass', passwd);
            $.cookie('remember', 'true');
        }
        
        
        
        switch(roleID)
        {
            //Role 1 --> Admin
           // case 1: 
           // window.location= "Admin.html";
           // break;
           // 
           // 
           // //Role 2 --> Operator
           // case 2:            
           //window.location = 'OperatorProfile.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
           // break;
            
            
            //Role 3 --> Driver
            case 3:

            window.location= 'driverHome.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            
            //Role 4 --> Customer
            case 4:
            window.location = 'customerSearch.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
            
            //Role 6 --> Business Customer
            case 6:
            window.location = 'businessCustomerSearch.html?id='+userID+'&rid='+roleID+'&rrid='+relatedID;
            break;
            
        }
    }
}


//Back button
function backtostartpage()
{
     window.location= "index.html";
}

function backtostart()
{
    window.location="index.html";
}
 




