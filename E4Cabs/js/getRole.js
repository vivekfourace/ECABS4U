 function getRole()
            {
                var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/getRole"
                $.ajax(url, {
                    data:"",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var len = data.d.length;
                       $('#msg').append('<table>')
                        for(var i=0; i<len; i++)
                        {
                            var id = data.d[i]["ID"];
                            $('#msg').append('<tr>')
                            .append("<td width='25%' align='center'>" + data.d[i]["ID"] + "</td>")
                            .append("<td width='25%' align='left'>" + data.d[i]["RoleName"]+"</td>")
                            .append("<td width='25%' align='center'>" + '<input type="button" value="Delete" id= "'+ data.d[i]["ID"] +'" onclick = "deleteFunc('+id+'); return false;" title= "'+data.d[i]["ID"]+'" />' + "</td>")
                            .append("<td width='25%' align='right'>" + '<input type="button" value="Edit" id= "'+ data.d[i]["ID"] +'" onclick = "editFunc('+id+'); return false;" title= "'+data.d[i]["ID"]+'" />' + "</td>")
                            .append('</tr>');
                        }
                        $('#msg').append('</table>')
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
function editFunc(id)
{
    alert(id);
}