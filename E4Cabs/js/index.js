window.onload = loginUsingCookie();

function loginUsingCookie() {
    var name = $.cookie('userName');
    var password= $.cookie('userPassword');
    var remMe = $.cookie('remember');

    if (remMe == "true") {
        $('#txtUserName').val(name);
        $('#txtPassword').val(password);
        
        return true;
    }
    if (remMe == "false") {
        $('#txtUserName').val("");
        $('#txtPassword').val("");
       
        return true;
    }
}

var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        navigator.splashscreen.hide();
    },

};

function forgotPass()
{
    window.location ="forgotPassword.html";
}

function forgotUser()
{
    window.location ='forgotUsername.html';
}

function login() {
    //document.getElementById("txtUserName").focus();
    var name = document.getElementById('txtUserName').value;
    var password = document.getElementById('txtPassword').value;

    //$.cookie('userName', name);
    if (name.length > 0) {
        //$('#lblMsg').text("");

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
        complete: function () 
        {
            $('#imgLoader').hide();
        },
        type: "POST",
        datatype: "json",
        data: "{'username':'" + name + "','userpassword':'" + password + "'}",
        contentType: "application/json; charset=utf-8",
        success: CheckMsg,

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert(errorThrown);
        }
    });
}

function CheckMsg(data) {
    if (data.d == "false") {
        $('#imgLoader').hide();
        $('#lblMsg').text("Incorrect usename or password!");
        $('#lblMsg').css("color", "#D70007");
        $('#lblMsg').css("font-size", "13");
    }
    else {
        $('#imgLoader').show();
        var userID = data.d[0];
        var roleID = parseInt(data.d[1]);
        var relatedID = data.d[2];
        var name = document.getElementById('txtUserName').value;
        var password = document.getElementById('txtPassword').value;
        
        //creating Cookie
        var isChecked = $('#chkRem').attr('checked') ? true : false;
        if (isChecked == true) {
            $.cookie('userName', name);
            $.cookie('userPassword', password);
            $.cookie('remember', true);
        }
        else {
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

                //Role 6 --> Business Customer
           // case 6:
          //      window.location = 'businessCustomerSearch.html?id=' + userID + '&rid=' + roleID + '&rrid=' + relatedID;
         //       break;
        }
    }
}
