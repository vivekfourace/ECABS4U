var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function logout(){
    navigator.notification.confirm(
    "Do you want to logout?",
    onLogoutCallback,
    "Confirm",
    "Yes, No"
    );
}

function onLogoutCallback(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
        $.ajax({url:"http://ecabs4uservice.azurewebsites.net/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(){
                window.localStorage.setItem('remember',false);
                window.localStorage.clear();
                window.location = "index.html";
            },
         });         
    }
}