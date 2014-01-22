document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   navigator.splashscreen.hide();
   console.log('device is ready');
   document.addEventListener("backbutton",confirmExit, false);
    var devicename = device.name;
    var platform = device.platform
    var deviceuuid = device.uuid    
    var model = device.model   
    var version = device.version 
    
       $.ajax({
           url:"http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterDevice",
           type:"post",
           datatype: "json",
           data:"{'devicename':'"+devicename+"', 'platform':'"+platform+"', 'deviceuuid':'"+deviceuuid+"', 'model':'"+model+"', 'version':'"+version+"'}",
           contentType: "application/json; charset=utf-8",
       });
    loginUsingCookie();
}

function confirmExit()
{
    navigator.notification.confirm(
      'Do you want to close the app?',
      onCallback,
      'Confirm exit from Ecabs4u',
      'No, Yes'    
    );
}
function onCallback(buttonIndex)
{
    if(buttonIndex == 1)
    {
        return false   
    }
    else if(buttonIndex == 2)
    {
        navigator.app.exitApp();
    }
}

//window.onload = loginUsingCookie();

function loginUsingCookie() {
    var name = $.cookie('userName');
    var password= $.cookie('userPassword');
    var remMe = $.cookie('remember');
    console.log(remMe);
    
    if (remMe === "true") {
        $('#txtUserName').val(name);
        $('#txtPassword').val(password);        
    }
    else
    {
        $('#txtUserName').val("");
        $('#txtPassword').val("");
        return true;
    }
}

function forgotPass()
{
    window.location ="forgotPassword.html";
}

function forgotUser()
{
    window.location ='forgotUsername.html';
}

function login() {
    var name = $('#txtUserName').val();
    var password = $('#txtPassword').val();

    if (name.length > 0) {
        $('#lblMsg').text("");
    }
    else if (name.length == 0) {
        $('#lblMsg').text("Please enter username.");
        $('#txtUserName').focus();
        return false;
    }
    if (password.length > 0) {
        $('#lblMsg').text("");
    }
    else if (password.length == 0) {
        $('#lblMsg').text("Please enter password.");
        $('#txtPassword').focus();
        return false;
    }
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UserLogin";
    $.ajax(url, {
        cache: true,
        beforeSend: function() 
        {
            $('#imgLoader').show();
        },
        type: "POST",
        datatype: "json",
        data: "{'username':'" + name + "','userpassword':'" + password + "'}",
        contentType: "application/json; charset=utf-8",
        success: CheckMsg,

        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

 function CheckMsg(data) {
      var isloggedin = data.d[4];
      var userID = data.d[1];
      var isChecked = $('#chkRem').prop('checked') ? true : false;
      if (isloggedin == "True") {
          window.location = 'SessionError.html?id=' + userID;
      }
      else {
          if (data.d[0] == "true") {
              $('#imgLoader').show();

              var roleID = parseInt(data.d[2]);
              var relatedID = data.d[3];

              var name = $('#txtUserName').val();
              var password = $('#txtPassword').val();

              //creating Cookie       
              
              if (isChecked == true) {
                  $.cookie('userName', name);
                  $.cookie('userPassword', password);
                  $.cookie('remember', true);
              }
              else {
                  $.cookie('userName', '');
                  $.cookie('userPassword', '');
                  $.cookie('remember', false);
              }

              switch (roleID) {
                  //Role 3 --> Driver
                  case 3:
                      window.location = 'driverHome.html?id=' + userID + '&rid=' + roleID + '&rrid=' + relatedID;
                      break;
                      //Role 4 --> Customer
                  case 4:
                      window.location = 'customerSearch.html?id=' + userID + '&rid=' + roleID + '&rrid=' + relatedID;
                      break;
              }
          }
          else {
              $('#imgLoader').hide();
              $('#lblMsg').text(data.d);
              $('#lblMsg').css("color", "#D70007");
              $('#lblMsg').css("font-size", "13");
              $('#txtPassword').val("");
          }
      }
 }



