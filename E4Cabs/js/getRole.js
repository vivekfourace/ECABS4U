 function getRole()
            {
                var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/getRole"
                $.ajax(url, {
                    data:"",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var len = data.d.length;
                        
                        $('#msg').append('<table style="">')
                        for(var i=0; i<len; i++)
                        {
                            var id = data.d[i]["ID"];
                            $('#msg').append('<tr>')
                            $('#msg').append("<td>" + data.d[i]["ID"] + "</td>")
                            .append("<td>" + data.d[i]["RoleName"]+"</td>")
                            .append("<td>" + '<input type="button" value="delete" id= "'+ data.d[i]["ID"] +'" onclick = "deleteFunc('+id+'); return false;" title= "'+data.d[i]["ID"]+'" />' + "</td>")
                            .append('</tr>');
                        }
                        $('#msg').append('</tr></table>')
                        $('#role-temp').css("color","red")
                        
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
                
            }
function deleteFunc(id)
{
    alert(id);
}