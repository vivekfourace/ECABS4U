 function getRole()
            {
                var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/getRole"
                $.ajax(url, {
                    data:"",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var len = data.d.length;
                        for(var i=0; i<len; i++)
                        {
                        //    $('#msg').append('<input type="text" id="' + data.d[i]["ID"] + '" value="' + data.d[i]["ID"] + '"/>' + '<input type="text" class="textbox" value="' + data.d[i]["RoleName"] + '"/> ' + '<input type="button" id="' + data.d[i]["ID"] + '" title="' + data.d[i]["ID"] + '" onclick="delete(data.d[i]["ID"]);" value="Delete"></input><br/>');
                        $('#msg').append("<table><tr><td>" + data.d[i]["ID"] + "</td><td>" + data.d[i]["RoleName"] +"</td></tr></table>");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
                
                alert(result);
            }
