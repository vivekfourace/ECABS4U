    var parameters = location.search.substring().split("&");
    var UserID = parameters[0].split("=");
    var rolID= parameters[1].split("=");
    var reletedID=parameters[2].split("=");
    var relID= unescape(reletedID[1]);
    var UID = unescape(UserID[1]);
    var roleID=unescape(rolID[1]);
    alert(UID);
    alert(roleID);
    alert(relID);

 var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetOperatorDetails";
                $.ajax(url,{                      
                     type:"POST",
                     datatype:"json",
                     data:"{'userID':'" +relID+ "'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: Welcome,                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(errorThrown);
                }
             });

function Welcome(data)
{
    alert(data.d[0]["OperatorName"]);
    $('#txtName').text(data.d[0]["OperatorName"]);
}
