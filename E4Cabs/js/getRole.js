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
                        $('#msg').append("<table><tr><td>" + data.d[i]["ID"] + "</td><td>" + data.d[i]["RoleName"] +"</td></tr></table>");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
                
                alert(result);
            }
